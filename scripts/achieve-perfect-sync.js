#!/usr/bin/env node

/**
 * Achieve Perfect Sync Script
 * 
 * This script identifies and removes extra projects to achieve perfect synchronization
 * between database and CSV (349 projects exactly).
 */

const https = require('https');
const http = require('http');

class PerfectSyncAchiever {
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

  async getCurrentStatus() {
    console.log('📊 Checking current synchronization status...\n');
    
    try {
      // Get database count
      const dbResponse = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1');
      const dbCount = dbResponse.meta?.pagination?.total || 0;
      
      // Get CSV count
      const csvResponse = await this.makeRequest('GET', '/api/inspect-csv');
      const csvCount = csvResponse.files?.[0]?.rowCount || 0;
      
      console.log(`📈 Current Status:`);
      console.log(`  Database projects: ${dbCount}`);
      console.log(`  CSV projects: ${csvCount}`);
      console.log(`  Difference: ${dbCount - csvCount}`);
      
      return { dbCount, csvCount, difference: dbCount - csvCount };
    } catch (error) {
      console.error('❌ Status check failed:', error.message);
      return { dbCount: 0, csvCount: 0, difference: 0 };
    }
  }

  async identifyExtraProjects() {
    console.log('🔍 Identifying extra projects in database...\n');
    
    try {
      // Get all database projects
      const dbResponse = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1000');
      const dbProjects = dbResponse.data || [];
      
      // Get CSV projects
      const csvResponse = await this.makeRequest('GET', '/api/inspect-csv');
      const csvProjects = csvResponse.files?.[0]?.sample || [];
      
      console.log(`📊 Analysis:`);
      console.log(`  Database projects: ${dbProjects.length}`);
      console.log(`  CSV projects: ${csvProjects.length}`);
      
      // Create set of CSV project names (normalized)
      const csvNames = new Set();
      csvProjects.forEach(project => {
        if (project.projectName) {
          const normalizedName = project.projectName.toLowerCase().trim();
          csvNames.add(normalizedName);
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
        console.log(`   Location: ${project.location || 'None'}`);
        console.log('');
      });
      
      return extraProjects;
    } catch (error) {
      console.error('❌ Failed to identify extra projects:', error.message);
      return [];
    }
  }

  generateCleanupSQL(extraProjects) {
    console.log('📝 SQL Commands to achieve perfect sync:');
    console.log('='.repeat(60));
    
    extraProjects.forEach((project, index) => {
      console.log(`-- ${index + 1}. ${project.name} (ID: ${project.id})`);
      console.log(`DELETE FROM "Project" WHERE id = ${project.id};`);
      if (index < extraProjects.length - 1) {
        console.log('');
      }
    });

    console.log('\n💡 Execute these SQL commands in your database to achieve perfect sync.');
    console.log('⚠️  Make sure to backup your database before running these commands!');
    console.log('\n🔍 After cleanup, verify with:');
    console.log('   node scripts/simple-database-sync.js --status');
    
    return extraProjects.map(p => `DELETE FROM "Project" WHERE id = ${p.id};`);
  }

  async run() {
    const args = process.argv.slice(2);
    const generateSQL = args.includes('--sql');
    const checkStatus = args.includes('--status');

    console.log('🚀 Achieve Perfect Sync');
    console.log('='.repeat(40));
    
    try {
      if (checkStatus) {
        await this.getCurrentStatus();
        return;
      }

      const status = await this.getCurrentStatus();
      
      if (status.difference === 0) {
        console.log('🎉 Database is already perfectly synchronized with CSV!');
        return;
      }
      
      if (status.difference < 0) {
        console.log('⚠️  Database has fewer projects than CSV - this needs investigation');
        return;
      }
      
      console.log(`\n🎯 Goal: Remove ${status.difference} extra projects to achieve perfect sync`);
      
      const extraProjects = await this.identifyExtraProjects();
      
      if (extraProjects.length === 0) {
        console.log('✅ No extra projects found! Database is already in sync with CSV.');
        return;
      }

      if (generateSQL) {
        this.generateCleanupSQL(extraProjects);
      } else {
        console.log('\n💡 To generate SQL cleanup commands, run:');
        console.log('   node scripts/achieve-perfect-sync.js --sql');
        console.log('\n💡 To check status after cleanup, run:');
        console.log('   node scripts/achieve-perfect-sync.js --status');
      }

      return {
        extraCount: extraProjects.length,
        extraProjects: extraProjects.map(p => ({ id: p.id, name: p.name, slug: p.slug }))
      };

    } catch (error) {
      console.error('❌ Perfect sync analysis failed:', error.message);
    }
  }
}

// Run script
if (require.main === module) {
  const achiever = new PerfectSyncAchiever();
  achiever.run().catch(console.error);
}

module.exports = { PerfectSyncAchiever };
