#!/usr/bin/env node

/**
 * Remove Test Project API Script
 * 
 * This script generates the specific SQL command to remove
 * only the "Test Project API" project (ID: 700).
 */

const https = require('https');
const http = require('http');

class TestProjectAPIRemover {
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

  async findTestProjectAPI() {
    console.log('🔍 Looking for "Test Project API"...\n');
    
    try {
      // Get all projects from database
      const response = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1000');
      const projects = response.data || [];
      
      const testProjectAPI = projects.find(project => 
        project.name === 'Test Project API' || 
        project.name?.toLowerCase().includes('test project api')
      );
      
      if (testProjectAPI) {
        console.log('✅ Found "Test Project API":');
        console.log(`  ID: ${testProjectAPI.id}`);
        console.log(`  Name: ${testProjectAPI.name}`);
        console.log(`  Slug: ${testProjectAPI.slug}`);
        console.log(`  Price: ${testProjectAPI.price_from || 'None'}`);
        console.log(`  Image: ${testProjectAPI.image_url_banner ? 'Yes' : 'No'}`);
        console.log(`  Location: ${testProjectAPI.location || 'None'}`);
        console.log(`  Created: ${testProjectAPI.created_at || 'Unknown'}`);
        console.log(`  Updated: ${testProjectAPI.updated_at || 'Unknown'}`);
        
        return testProjectAPI;
      } else {
        console.log('❌ "Test Project API" not found in database');
        return null;
      }
    } catch (error) {
      console.error('❌ Failed to find "Test Project API":', error.message);
      return null;
    }
  }

  generateSQLCommand(project) {
    if (!project) {
      console.log('❌ No project found to generate SQL for');
      return null;
    }

    console.log('\n📝 SQL Command to remove "Test Project API":');
    console.log('='.repeat(60));
    console.log(`-- Remove "Test Project API" (ID: ${project.id})`);
    console.log(`DELETE FROM "Project" WHERE id = ${project.id};`);
    console.log('');
    console.log('💡 Execute this SQL command in your database to remove the test project.');
    console.log('⚠️  Make sure to backup your database before running this command!');
    console.log('');
    console.log('🔍 To verify removal, you can run:');
    console.log('   SELECT * FROM "Project" WHERE name = \'Test Project API\';');
    console.log('   (Should return 0 rows after deletion)');

    return `DELETE FROM "Project" WHERE id = ${project.id};`;
  }

  async checkStatusAfterRemoval() {
    console.log('\n📊 Expected status after removing "Test Project API":');
    console.log('='.repeat(60));
    
    try {
      // Get current database count
      const dbResponse = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1');
      const currentDbCount = dbResponse.meta?.pagination?.total || 0;
      
      // Get CSV count
      const csvResponse = await this.makeRequest('GET', '/api/inspect-csv');
      const csvCount = csvResponse.files?.[0]?.rowCount || 0;
      
      console.log(`  Current database projects: ${currentDbCount}`);
      console.log(`  CSV projects: ${csvCount}`);
      console.log(`  Current difference: ${currentDbCount - csvCount}`);
      console.log(`  After removing "Test Project API": ${currentDbCount - 1 - csvCount}`);
      
      if (currentDbCount - 1 === csvCount) {
        console.log(`  🎉 Perfect sync will be achieved!`);
      } else if (currentDbCount - 1 > csvCount) {
        console.log(`  ⚠️  Still ${currentDbCount - 1 - csvCount} extra projects will remain`);
      } else {
        console.log(`  ⚠️  ${csvCount - (currentDbCount - 1)} projects will be missing`);
      }
      
      return {
        currentDbCount,
        csvCount,
        expectedAfterRemoval: currentDbCount - 1,
        willBeSynced: (currentDbCount - 1) === csvCount
      };
    } catch (error) {
      console.error('❌ Status check failed:', error.message);
      return null;
    }
  }

  async run() {
    console.log('🚀 Test Project API Removal Script');
    console.log('='.repeat(50));
    
    try {
      const testProject = await this.findTestProjectAPI();
      
      if (testProject) {
        const sqlCommand = this.generateSQLCommand(testProject);
        await this.checkStatusAfterRemoval();
        
        console.log('\n🎯 Summary:');
        console.log('  ✅ "Test Project API" found and ready for removal');
        console.log('  📝 SQL command generated');
        console.log('  📊 Status analysis completed');
        console.log('\n💡 Next step: Execute the SQL command in your database');
        
        return {
          found: true,
          project: testProject,
          sqlCommand: sqlCommand
        };
      } else {
        console.log('\n🎯 Summary:');
        console.log('  ❌ "Test Project API" not found');
        console.log('  💡 The project may have already been removed');
        
        return {
          found: false,
          project: null,
          sqlCommand: null
        };
      }
    } catch (error) {
      console.error('❌ Script execution failed:', error.message);
      return { found: false, project: null, sqlCommand: null, error: error.message };
    }
  }
}

// Run script
if (require.main === module) {
  const remover = new TestProjectAPIRemover();
  remover.run().catch(console.error);
}

module.exports = { TestProjectAPIRemover };
