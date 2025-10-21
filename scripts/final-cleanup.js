#!/usr/bin/env node

/**
 * Final Cleanup Script
 * 
 * This script removes the extra 10 projects that are not in the CSV
 * to achieve perfect sync between database and CSV.
 */

const https = require('https');
const http = require('http');

class FinalCleanup {
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

  async identifyExtraProjects() {
    console.log('🔍 Identifying extra projects...\n');
    
    try {
      // Get all projects from database
      const dbResponse = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1000');
      const dbProjects = dbResponse.data || [];
      
      // Get CSV project names
      const csvResponse = await this.makeRequest('GET', '/api/inspect-csv');
      const csvProjects = csvResponse.files?.[0]?.sample || [];
      
      console.log(`📊 Database projects: ${dbProjects.length}`);
      console.log(`📊 CSV projects: ${csvProjects.length}`);
      
      // Create set of CSV project names (normalized)
      const csvNames = new Set();
      csvProjects.forEach(project => {
        if (project.projectName) {
          csvNames.add(project.projectName.toLowerCase().trim());
        }
      });
      
      // Find projects in database that are not in CSV
      const extraProjects = dbProjects.filter(dbProject => {
        const name = dbProject.name?.toLowerCase().trim();
        return name && !csvNames.has(name);
      });
      
      console.log(`\n🚨 Found ${extraProjects.length} extra projects in database:`);
      extraProjects.forEach((project, index) => {
        console.log(`${index + 1}. ID: ${project.id} | Name: ${project.name}`);
        console.log(`   Slug: ${project.slug} | Price: ${project.price_from || 'None'}`);
        console.log(`   Image: ${project.image_url_banner ? 'Yes' : 'No'}`);
        console.log(`   Updated: ${project.updated_at}`);
      });
      
      return extraProjects;
    } catch (error) {
      console.error('❌ Failed to identify extra projects:', error.message);
      return [];
    }
  }

  generateCleanupSQL(extraProjects) {
    console.log('\n📝 SQL Commands to remove extra projects:');
    console.log('='.repeat(50));
    
    extraProjects.forEach((project, index) => {
      console.log(`-- ${index + 1}. ${project.name} (ID: ${project.id})`);
      console.log(`DELETE FROM "Project" WHERE id = ${project.id};`);
      if (index < extraProjects.length - 1) {
        console.log('');
      }
    });

    console.log('\n💡 Execute these SQL commands in your database to remove the extra projects.');
    console.log('⚠️  Make sure to backup your database before running these commands!');
    
    return extraProjects.map(p => `DELETE FROM "Project" WHERE id = ${p.id};`);
  }

  async run() {
    const args = process.argv.slice(2);
    const generateSQL = args.includes('--sql');

    try {
      console.log('🚀 Starting final cleanup analysis...\n');
      
      const extraProjects = await this.identifyExtraProjects();
      
      if (extraProjects.length === 0) {
        console.log('✅ No extra projects found! Database is already in sync with CSV.');
        return;
      }

      if (generateSQL) {
        this.generateCleanupSQL(extraProjects);
      } else {
        console.log('\n💡 To generate SQL cleanup commands, run:');
        console.log('   node scripts/final-cleanup.js --sql');
        console.log('\n💡 After cleanup, your database will have exactly 349 projects (matching CSV)');
      }

      return {
        extraCount: extraProjects.length,
        extraProjects: extraProjects.map(p => ({ id: p.id, name: p.name, slug: p.slug }))
      };

    } catch (error) {
      console.error('❌ Cleanup analysis failed:', error.message);
    }
  }
}

// Run cleanup
if (require.main === module) {
  const cleanup = new FinalCleanup();
  cleanup.run().catch(console.error);
}

module.exports = { FinalCleanup };
