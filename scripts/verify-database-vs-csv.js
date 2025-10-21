#!/usr/bin/env node

/**
 * Verify Database vs CSV Script
 * 
 * This script compares the database projects with the live CSV data from S3
 * to ensure they are perfectly synchronized.
 */

const https = require('https');
const http = require('http');

class DatabaseCSVVerifier {
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

  async getDatabaseProjects() {
    console.log('📊 Fetching all projects from database...\n');
    
    try {
      const response = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1000');
      const projects = response.data || [];
      const totalCount = response.meta?.pagination?.total || 0;
      
      console.log(`✅ Retrieved ${projects.length} projects from database (Total: ${totalCount})`);
      
      return {
        projects: projects,
        totalCount: totalCount,
        success: true
      };
    } catch (error) {
      console.error('❌ Failed to fetch database projects:', error.message);
      return { projects: [], totalCount: 0, success: false, error: error.message };
    }
  }

  async getCSVProjects() {
    console.log('📊 Fetching CSV data from S3...\n');
    
    try {
      const response = await this.makeRequest('GET', '/api/inspect-csv');
      
      if (response.files && response.files.length > 0) {
        const projectsFile = response.files.find(f => f.key.includes('projects.csv'));
        if (projectsFile) {
          console.log(`✅ Retrieved CSV data: ${projectsFile.rowCount} projects`);
          console.log(`   File: ${projectsFile.key}`);
          console.log(`   Headers: ${projectsFile.headers.join(', ')}`);
          
          return {
            projects: projectsFile.sample,
            totalCount: projectsFile.rowCount,
            headers: projectsFile.headers,
            success: true
          };
        }
      }
      
      console.log('❌ No projects CSV found in S3');
      return { projects: [], totalCount: 0, success: false, error: 'No projects CSV found' };
    } catch (error) {
      console.error('❌ Failed to fetch CSV data:', error.message);
      return { projects: [], totalCount: 0, success: false, error: error.message };
    }
  }

  normalizeProjectName(name) {
    if (!name) return '';
    return name.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ');
  }

  compareProjects(dbProjects, csvProjects) {
    console.log('🔍 Comparing database projects with CSV projects...\n');
    
    // Normalize project names for comparison
    const dbProjectNames = new Set();
    const csvProjectNames = new Set();
    
    dbProjects.forEach(project => {
      const normalizedName = this.normalizeProjectName(project.name);
      if (normalizedName) {
        dbProjectNames.add(normalizedName);
      }
    });
    
    csvProjects.forEach(project => {
      const normalizedName = this.normalizeProjectName(project.projectName);
      if (normalizedName) {
        csvProjectNames.add(normalizedName);
      }
    });
    
    // Find projects in database but not in CSV
    const extraInDatabase = [];
    dbProjectNames.forEach(name => {
      if (!csvProjectNames.has(name)) {
        const originalProject = dbProjects.find(p => 
          this.normalizeProjectName(p.name) === name
        );
        if (originalProject) {
          extraInDatabase.push(originalProject);
        }
      }
    });
    
    // Find projects in CSV but not in database
    const missingInDatabase = [];
    csvProjectNames.forEach(name => {
      if (!dbProjectNames.has(name)) {
        const originalProject = csvProjects.find(p => 
          this.normalizeProjectName(p.projectName) === name
        );
        if (originalProject) {
          missingInDatabase.push(originalProject);
        }
      }
    });
    
    // Find common projects
    const commonProjects = [];
    dbProjectNames.forEach(name => {
      if (csvProjectNames.has(name)) {
        const dbProject = dbProjects.find(p => 
          this.normalizeProjectName(p.name) === name
        );
        const csvProject = csvProjects.find(p => 
          this.normalizeProjectName(p.projectName) === name
        );
        if (dbProject && csvProject) {
          commonProjects.push({ db: dbProject, csv: csvProject });
        }
      }
    });
    
    return {
      extraInDatabase,
      missingInDatabase,
      commonProjects,
      dbCount: dbProjectNames.size,
      csvCount: csvProjectNames.size,
      commonCount: commonProjects.length
    };
  }

  async generateDetailedReport(comparison) {
    console.log('📋 Generating detailed comparison report...\n');
    
    console.log('📊 SUMMARY:');
    console.log('='.repeat(50));
    console.log(`  Database projects: ${comparison.dbCount}`);
    console.log(`  CSV projects: ${comparison.csvCount}`);
    console.log(`  Common projects: ${comparison.commonCount}`);
    console.log(`  Extra in database: ${comparison.extraInDatabase.length}`);
    console.log(`  Missing in database: ${comparison.missingInDatabase.length}`);
    
    if (comparison.extraInDatabase.length > 0) {
      console.log('\n🚨 PROJECTS IN DATABASE BUT NOT IN CSV:');
      console.log('='.repeat(50));
      comparison.extraInDatabase.forEach((project, index) => {
        console.log(`${index + 1}. ${project.name} (ID: ${project.id})`);
        console.log(`   Slug: ${project.slug}`);
        console.log(`   Price: ${project.price_from || 'None'}`);
        console.log(`   Image: ${project.image_url_banner ? 'Yes' : 'No'}`);
        console.log(`   Location: ${project.location || 'None'}`);
        console.log('');
      });
    }
    
    if (comparison.missingInDatabase.length > 0) {
      console.log('\n⚠️  PROJECTS IN CSV BUT NOT IN DATABASE:');
      console.log('='.repeat(50));
      comparison.missingInDatabase.forEach((project, index) => {
        console.log(`${index + 1}. ${project.projectName}`);
        console.log(`   Developer: ${project.developer || 'Unknown'}`);
        console.log(`   Units: ${project.unitsNum || 'Unknown'}`);
        console.log(`   District: ${project.district || 'Unknown'}`);
        console.log('');
      });
    }
    
    if (comparison.extraInDatabase.length === 0 && comparison.missingInDatabase.length === 0) {
      console.log('\n🎉 PERFECT SYNC! Database contains exactly the same projects as CSV.');
    } else {
      console.log('\n💡 RECOMMENDATIONS:');
      if (comparison.extraInDatabase.length > 0) {
        console.log(`  - Remove ${comparison.extraInDatabase.length} extra projects from database`);
      }
      if (comparison.missingInDatabase.length > 0) {
        console.log(`  - Import ${comparison.missingInDatabase.length} missing projects to database`);
      }
    }
    
    return {
      isPerfectSync: comparison.extraInDatabase.length === 0 && comparison.missingInDatabase.length === 0,
      extraCount: comparison.extraInDatabase.length,
      missingCount: comparison.missingInDatabase.length,
      commonCount: comparison.commonCount
    };
  }

  async run() {
    console.log('🚀 Database vs CSV Verification');
    console.log('='.repeat(50));
    
    try {
      // Get database projects
      const dbResult = await this.getDatabaseProjects();
      if (!dbResult.success) {
        console.error('❌ Failed to fetch database projects');
        return;
      }
      
      // Get CSV projects
      const csvResult = await this.getCSVProjects();
      if (!csvResult.success) {
        console.error('❌ Failed to fetch CSV projects');
        return;
      }
      
      // Compare projects
      const comparison = this.compareProjects(dbResult.projects, csvResult.projects);
      
      // Generate detailed report
      const report = await this.generateDetailedReport(comparison);
      
      console.log('\n🎯 FINAL VERIFICATION RESULT:');
      console.log('='.repeat(50));
      if (report.isPerfectSync) {
        console.log('✅ Database is perfectly synchronized with CSV');
        console.log('✅ All projects in database exist in CSV');
        console.log('✅ No extra or missing projects');
      } else {
        console.log('⚠️  Database is not perfectly synchronized with CSV');
        console.log(`❌ ${report.extraCount} extra projects in database`);
        console.log(`❌ ${report.missingCount} missing projects in database`);
      }
      
      return {
        isPerfectSync: report.isPerfectSync,
        dbCount: comparison.dbCount,
        csvCount: comparison.csvCount,
        extraCount: report.extraCount,
        missingCount: report.missingCount,
        commonCount: report.commonCount
      };
      
    } catch (error) {
      console.error('❌ Verification failed:', error.message);
      return { success: false, error: error.message };
    }
  }
}

// Run verification
if (require.main === module) {
  const verifier = new DatabaseCSVVerifier();
  verifier.run().catch(console.error);
}

module.exports = { DatabaseCSVVerifier };
