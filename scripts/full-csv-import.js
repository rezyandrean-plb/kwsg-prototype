#!/usr/bin/env node

/**
 * Full CSV Import Script
 * 
 * This script imports ALL projects from CSV using the existing sync API endpoints.
 */

const https = require('https');
const http = require('http');

class FullCSVImporter {
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

  async triggerFullSync() {
    console.log('🚀 Triggering full CSV sync...\n');
    
    try {
      // Use the existing sync API endpoint
      const response = await this.makeRequest('GET', '/api/test-sync');
      
      if (response.success) {
        console.log('✅ Full sync triggered successfully!');
        console.log(`📊 Results:`);
        console.log(`  Projects: ${response.results.projects}`);
        console.log(`  Units: ${response.results.units}`);
        console.log(`  Floor Plans: ${response.results.floorPlans}`);
        console.log(`  Site Plans: ${response.results.sitePlans}`);
        console.log(`  Errors: ${response.errors.length}`);
        
        if (response.errors.length > 0) {
          console.log(`\n❌ Errors encountered:`);
          response.errors.forEach((error, index) => {
            console.log(`  ${index + 1}. ${error}`);
          });
        }
        
        return response;
      } else {
        console.log('❌ Sync failed:', response.message);
        return null;
      }
    } catch (error) {
      console.error('❌ Sync request failed:', error.message);
      return null;
    }
  }

  async triggerProjectSync() {
    console.log('🚀 Triggering project-specific sync...\n');
    
    try {
      // Use the project sync API endpoint
      const response = await this.makeRequest('POST', '/api/sync/projects');
      
      if (response.success) {
        console.log('✅ Project sync completed successfully!');
        console.log(`📊 Results:`);
        console.log(`  Message: ${response.message}`);
        if (response.stats) {
          console.log(`  Created: ${response.stats.created}`);
          console.log(`  Updated: ${response.stats.updated}`);
          console.log(`  Deleted: ${response.stats.deleted}`);
        }
        return response;
      } else {
        console.log('❌ Project sync failed:', response.message);
        return null;
      }
    } catch (error) {
      console.error('❌ Project sync request failed:', error.message);
      return null;
    }
  }

  async checkSyncStatus() {
    console.log('📊 Checking current sync status...\n');
    
    try {
      // Check current database count
      const dbResponse = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1');
      const dbCount = dbResponse.meta?.pagination?.total || 0;
      
      // Check CSV data
      const csvResponse = await this.makeRequest('GET', '/api/inspect-csv');
      const csvCount = csvResponse.files?.[0]?.rowCount || 0;
      
      console.log(`📊 Current Status:`);
      console.log(`  Database projects: ${dbCount}`);
      console.log(`  CSV projects: ${csvCount}`);
      console.log(`  Difference: ${csvCount - dbCount}`);
      
      if (csvCount > dbCount) {
        console.log(`\n💡 ${csvCount - dbCount} projects need to be imported from CSV`);
      } else if (dbCount > csvCount) {
        console.log(`\n💡 ${dbCount - csvCount} extra projects in database`);
      } else {
        console.log(`\n✅ Database and CSV are in sync!`);
      }
      
      return { dbCount, csvCount, difference: csvCount - dbCount };
    } catch (error) {
      console.error('❌ Status check failed:', error.message);
      return null;
    }
  }

  async run() {
    const args = process.argv.slice(2);
    const checkStatus = args.includes('--status');
    const fullSync = args.includes('--full-sync');
    const projectSync = args.includes('--project-sync');

    if (checkStatus) {
      await this.checkSyncStatus();
      return;
    }

    if (fullSync) {
      console.log('🚀 Running full CSV sync (all data types)...\n');
      const result = await this.triggerFullSync();
      
      if (result) {
        console.log('\n✅ Full sync completed!');
        console.log('📊 All CSV data has been imported to database');
      }
      return;
    }

    if (projectSync) {
      console.log('🚀 Running project-specific sync...\n');
      const result = await this.triggerProjectSync();
      
      if (result) {
        console.log('\n✅ Project sync completed!');
        console.log('📊 All projects from CSV have been imported');
      }
      return;
    }

    // Default: show options
    console.log('🔧 CSV Import Options:');
    console.log('='.repeat(40));
    console.log('1. Check current status:');
    console.log('   node scripts/full-csv-import.js --status');
    console.log('');
    console.log('2. Import all projects from CSV:');
    console.log('   node scripts/full-csv-import.js --project-sync');
    console.log('');
    console.log('3. Full sync (projects + units + floor plans + site plans):');
    console.log('   node scripts/full-csv-import.js --full-sync');
    console.log('');
    console.log('💡 Recommended: Start with --status to check current state');
  }
}

// Run import
if (require.main === module) {
  const importer = new FullCSVImporter();
  importer.run().catch(console.error);
}

module.exports = { FullCSVImporter };
