#!/usr/bin/env node

/**
 * CSV-Database Sync Script
 * 
 * This script syncs the database with CSV data from S3,
 * handling field mapping and data consistency.
 */

const https = require('https');
const http = require('http');

class CSVDatabaseSync {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}${path}`;
      const client = this.baseUrl.startsWith('https') ? https : http;
      
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        }
      };

      if (data) {
        options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
      }

      const req = client.request(url, options, (res) => {
        let responseData = '';
        res.on('data', chunk => responseData += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(responseData);
            resolve(json);
          } catch (error) {
            resolve({ success: false, error: 'Invalid JSON response' });
          }
        });
      });

      req.on('error', reject);

      if (data) {
        req.write(JSON.stringify(data));
      }
      
      req.end();
    });
  }

  async getCSVData() {
    console.log('📊 Fetching CSV data from S3...');
    const response = await this.makeRequest('GET', '/api/inspect-csv');
    
    if (response.files && response.files.length > 0) {
      const projectsFile = response.files.find(f => f.key.includes('projects.csv'));
      if (projectsFile) {
        console.log(`✅ Found ${projectsFile.rowCount} projects in CSV`);
        return {
          projects: projectsFile.sample,
          totalCount: projectsFile.rowCount,
          headers: projectsFile.headers
        };
      }
    }
    
    throw new Error('No projects CSV found');
  }

  async getDatabaseData() {
    console.log('📊 Fetching database data...');
    const response = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1000');
    
    if (response.data) {
      console.log(`✅ Found ${response.data.length} projects in database`);
      return response.data;
    }
    
    throw new Error('No database data found');
  }

  mapCSVToDatabase(csvProject) {
    // Map CSV fields to database fields
    return {
      name: csvProject.projectName,
      project_name: csvProject.projectName,
      slug: this.slugify(csvProject.projectName),
      title: csvProject.projectName,
      location: csvProject.projectArea,
      address: csvProject.streetAddress,
      type: 'Residential', // Default type
      price: 'Price on request', // CSV doesn't have price data
      price_from: null, // CSV doesn't have price_from
      units: csvProject.unitsNum,
      developer: csvProject.developer,
      completion: csvProject.completionDate,
      district: csvProject.district,
      tenure: csvProject.tenure,
      property_type: 'Residential',
      status: 'Active',
      total_units: csvProject.unitsNum,
      image_url_banner: csvProject.mainImage,
      latitude: parseFloat(csvProject.latitude) || null,
      longitude: parseFloat(csvProject.longitude) || null,
      features: csvProject.facilities ? csvProject.facilities.split('\n').filter(Boolean) : []
    };
  }

  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  async analyzeSync() {
    try {
      console.log('🔍 Analyzing sync requirements...\n');
      
      const [csvData, dbData] = await Promise.all([
        this.getCSVData(),
        this.getDatabaseData()
      ]);

      // Create maps for comparison
      const csvMap = new Map();
      const dbMap = new Map();

      // Map CSV projects
      csvData.projects.forEach(project => {
        const slug = this.slugify(project.projectName);
        csvMap.set(slug, project);
      });

      // Map database projects
      dbData.forEach(project => {
        if (project.slug) {
          dbMap.set(project.slug, project);
        }
      });

      // Find differences
      const inCSVNotInDB = [];
      const inDBNotInCSV = [];
      const inBoth = [];

      // Check CSV projects
      for (const [slug, csvProject] of csvMap) {
        if (dbMap.has(slug)) {
          inBoth.push({ slug, csv: csvProject, db: dbMap.get(slug) });
        } else {
          inCSVNotInDB.push({ slug, csv: csvProject });
        }
      }

      // Check database projects
      for (const [slug, dbProject] of dbMap) {
        if (!csvMap.has(slug)) {
          inDBNotInCSV.push({ slug, db: dbProject });
        }
      }

      return {
        csvData,
        dbData,
        inCSVNotInDB,
        inDBNotInCSV,
        inBoth,
        stats: {
          csvCount: csvData.totalCount,
          dbCount: dbData.length,
          missingInDB: inCSVNotInDB.length,
          extraInDB: inDBNotInCSV.length,
          inBoth: inBoth.length
        }
      };
    } catch (error) {
      console.error('❌ Analysis failed:', error.message);
      return null;
    }
  }

  generateSyncReport(analysis) {
    const { stats, inCSVNotInDB, inDBNotInCSV, inBoth } = analysis;
    
    console.log('\n📋 SYNC ANALYSIS REPORT');
    console.log('='.repeat(50));
    console.log(`CSV Projects: ${stats.csvCount}`);
    console.log(`Database Projects: ${stats.dbCount}`);
    console.log(`Missing in DB: ${stats.missingInDB}`);
    console.log(`Extra in DB: ${stats.extraInDB}`);
    console.log(`In Both: ${stats.inBoth}`);

    if (inCSVNotInDB.length > 0) {
      console.log('\n❌ PROJECTS IN CSV BUT NOT IN DATABASE:');
      inCSVNotInDB.slice(0, 10).forEach((item, index) => {
        console.log(`${index + 1}. ${item.csv.projectName} (${item.slug})`);
      });
      if (inCSVNotInDB.length > 10) {
        console.log(`   ... and ${inCSVNotInDB.length - 10} more`);
      }
    }

    if (inDBNotInCSV.length > 0) {
      console.log('\n🚨 PROJECTS IN DATABASE BUT NOT IN CSV:');
      inDBNotInCSV.slice(0, 10).forEach((item, index) => {
        console.log(`${index + 1}. ${item.db.name} (${item.slug})`);
        console.log(`   ID: ${item.db.id} | Price: ${item.db.price_from || 'None'}`);
      });
      if (inDBNotInCSV.length > 10) {
        console.log(`   ... and ${inDBNotInCSV.length - 10} more`);
      }
    }

    // Recommendations
    console.log('\n💡 SYNC RECOMMENDATIONS:');
    console.log('='.repeat(40));
    
    if (stats.extraInDB > 0) {
      console.log(`1. Remove ${stats.extraInDB} extra projects from database`);
      console.log('   - These projects exist in DB but not in CSV');
      console.log('   - Run: node scripts/cleanup-extra-projects.js --execute');
    }

    if (stats.missingInDB > 0) {
      console.log(`2. Add ${stats.missingInDB} missing projects to database`);
      console.log('   - These projects exist in CSV but not in DB');
      console.log('   - Run: node scripts/sync-with-csv.js --add-missing');
    }

    console.log('\n3. Field mapping issues:');
    console.log('   - CSV uses different field names than database');
    console.log('   - CSV doesn\'t have price_from field');
    console.log('   - Need to implement proper field mapping');

    console.log('\n4. Data consistency:');
    console.log('   - Implement regular sync process');
    console.log('   - Add data validation');
    console.log('   - Monitor for duplicates');

    return {
      totalExtra: stats.extraInDB,
      totalMissing: stats.missingInDB,
      needsCleanup: stats.extraInDB > 0,
      needsSync: stats.missingInDB > 0
    };
  }

  async run() {
    try {
      console.log('🚀 Starting CSV-Database Sync Analysis...\n');
      
      const analysis = await this.analyzeSync();
      if (!analysis) return;

      const summary = this.generateSyncReport(analysis);

      console.log('\n📊 FINAL SUMMARY:');
      console.log('='.repeat(30));
      console.log(`Extra projects to remove: ${summary.totalExtra}`);
      console.log(`Missing projects to add: ${summary.totalMissing}`);
      console.log(`Needs cleanup: ${summary.needsCleanup ? 'Yes' : 'No'}`);
      console.log(`Needs sync: ${summary.needsSync ? 'Yes' : 'No'}`);

      if (summary.needsCleanup) {
        console.log('\n🔧 NEXT STEPS:');
        console.log('1. Run cleanup script: node scripts/cleanup-extra-projects.js --execute');
        console.log('2. Review the SQL commands before executing');
        console.log('3. Backup your database first!');
      }

      return summary;
    } catch (error) {
      console.error('❌ Sync analysis failed:', error);
    }
  }
}

// Run sync analysis
if (require.main === module) {
  const sync = new CSVDatabaseSync();
  sync.run().catch(console.error);
}

module.exports = { CSVDatabaseSync };
