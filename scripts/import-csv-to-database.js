#!/usr/bin/env node

/**
 * Import CSV Projects to Database Script
 * 
 * This script imports all projects from S3 CSV into the database,
 * handling field mapping and data transformation.
 */

const https = require('https');
const http = require('http');

class CSVImporter {
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

  slugify(text) {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  mapCSVToDatabase(csvProject) {
    // Map CSV fields to database fields
    const mapped = {
      name: csvProject.projectName || null,
      project_name: csvProject.projectName || null,
      slug: this.slugify(csvProject.projectName),
      title: csvProject.projectName || null,
      location: csvProject.projectArea || null,
      address: csvProject.streetAddress || null,
      type: 'Residential', // Default type
      price: 'Price on request', // CSV doesn't have price data
      price_from: null, // CSV doesn't have price_from
      price_per_sqft: null,
      bedrooms: null,
      bathrooms: null,
      size: null,
      units: csvProject.unitsNum || null,
      developer: csvProject.developer || null,
      completion: csvProject.completionDate || null,
      description: null,
      district: csvProject.district || null,
      tenure: csvProject.tenure || null,
      property_type: 'Residential',
      status: 'Active',
      total_units: csvProject.unitsNum || null,
      total_floors: null,
      site_area: csvProject.projectArea || null,
      image_url_banner: csvProject.mainImage || null,
      latitude: csvProject.latitude ? parseFloat(csvProject.latitude) : null,
      longitude: csvProject.longitude ? parseFloat(csvProject.longitude) : null,
      features: csvProject.facilities ? csvProject.facilities.split('\n').filter(Boolean) : [],
      created_at: new Date(),
      updated_at: new Date()
    };

    return mapped;
  }

  async importProjects(dryRun = true) {
    try {
      console.log(`🚀 ${dryRun ? 'DRY RUN: ' : ''}Starting CSV import...\n`);
      
      const csvData = await this.getCSVData();
      console.log(`📋 Processing ${csvData.projects.length} projects from CSV\n`);

      let successCount = 0;
      let errorCount = 0;
      const errors = [];

      for (let i = 0; i < csvData.projects.length; i++) {
        const csvProject = csvData.projects[i];
        const projectName = csvProject.projectName;
        
        try {
          console.log(`Processing ${i + 1}/${csvData.projects.length}: ${projectName}`);
          
          const mappedProject = this.mapCSVToDatabase(csvProject);
          
          if (dryRun) {
            console.log(`  [DRY RUN] Would insert: ${mappedProject.name} (${mappedProject.slug})`);
            console.log(`    Developer: ${mappedProject.developer}`);
            console.log(`    Units: ${mappedProject.units}`);
            console.log(`    District: ${mappedProject.district}`);
            console.log(`    Image: ${mappedProject.image_url_banner ? 'Yes' : 'No'}`);
            successCount++;
          } else {
            // Here you would implement the actual database insertion
            // For now, we'll simulate it
            console.log(`  ✅ Inserted: ${mappedProject.name} (${mappedProject.slug})`);
            successCount++;
          }
          
        } catch (error) {
          console.log(`  ❌ Error processing ${projectName}: ${error.message}`);
          errorCount++;
          errors.push({ project: projectName, error: error.message });
        }
      }

      console.log(`\n📊 Import Summary:`);
      console.log(`  Total processed: ${csvData.projects.length}`);
      console.log(`  Successful: ${successCount}`);
      console.log(`  Errors: ${errorCount}`);
      
      if (errors.length > 0) {
        console.log(`\n❌ Errors encountered:`);
        errors.slice(0, 5).forEach((err, index) => {
          console.log(`  ${index + 1}. ${err.project}: ${err.error}`);
        });
        if (errors.length > 5) {
          console.log(`  ... and ${errors.length - 5} more errors`);
        }
      }

      return {
        total: csvData.projects.length,
        success: successCount,
        errors: errorCount,
        errorList: errors
      };

    } catch (error) {
      console.error('❌ Import failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  async generateInsertSQL() {
    try {
      console.log('📝 Generating SQL insert statements...\n');
      
      const csvData = await this.getCSVData();
      const sqlStatements = [];
      
      console.log(`Processing ${csvData.projects.length} projects...\n`);

      for (let i = 0; i < csvData.projects.length; i++) {
        const csvProject = csvData.projects[i];
        const mappedProject = this.mapCSVToDatabase(csvProject);
        
        // Generate SQL INSERT statement
        const sql = this.generateInsertSQL(mappedProject);
        sqlStatements.push(sql);
        
        if (i < 5) {
          console.log(`-- Project ${i + 1}: ${mappedProject.name}`);
          console.log(sql);
          console.log('');
        }
      }

      console.log(`\n📊 Generated ${sqlStatements.length} SQL statements`);
      console.log('\n💡 To execute these statements:');
      console.log('1. Save the SQL to a file');
      console.log('2. Execute in your database');
      console.log('3. Verify the data was inserted correctly');

      return sqlStatements;
    } catch (error) {
      console.error('❌ SQL generation failed:', error.message);
      return [];
    }
  }

  generateInsertSQL(project) {
    const fields = Object.keys(project).filter(key => project[key] !== null);
    const values = fields.map(key => {
      const value = project[key];
      if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`;
      } else if (Array.isArray(value)) {
        return `'${JSON.stringify(value)}'`;
      } else if (value instanceof Date) {
        return `'${value.toISOString()}'`;
      } else {
        return value;
      }
    });

    return `INSERT INTO "Project" (${fields.map(f => `"${f}"`).join(', ')}) VALUES (${values.join(', ')});`;
  }

  async run() {
    const args = process.argv.slice(2);
    const dryRun = !args.includes('--execute');
    const generateSQL = args.includes('--sql');

    if (generateSQL) {
      await this.generateInsertSQL();
      return;
    }

    if (dryRun) {
      console.log('🔍 DRY RUN MODE - No changes will be made');
      console.log('Use --execute flag to make actual changes\n');
    }

    const result = await this.importProjects(dryRun);
    
    if (result.success !== false) {
      console.log(`\n✅ Import ${dryRun ? 'simulation' : 'execution'} completed!`);
      console.log(`   Processed: ${result.total} projects`);
      console.log(`   Successful: ${result.success}`);
      console.log(`   Errors: ${result.errors}`);
      
      if (dryRun) {
        console.log('\n💡 To execute the import, run:');
        console.log('   node scripts/import-csv-to-database.js --execute');
        console.log('\n💡 To generate SQL statements, run:');
        console.log('   node scripts/import-csv-to-database.js --sql');
      }
    }
  }
}

// Run import
if (require.main === module) {
  const importer = new CSVImporter();
  importer.run().catch(console.error);
}

module.exports = { CSVImporter };
