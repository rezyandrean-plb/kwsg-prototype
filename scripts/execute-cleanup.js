#!/usr/bin/env node

/**
 * Execute Cleanup Script
 * 
 * This script executes the cleanup by removing test projects from the database.
 */

const https = require('https');
const http = require('http');

class CleanupExecutor {
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

  async getTestProjectIds() {
    console.log('🔍 Identifying test projects to remove...\n');
    
    try {
      // Get all projects from database
      const response = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1000');
      const projects = response.data || [];
      
      const testProjectIds = [];
      
      projects.forEach(project => {
        const name = project.name?.toLowerCase() || '';
        const slug = project.slug?.toLowerCase() || '';
        
        // Test project patterns
        if (name.includes('test') || 
            name.includes('api') || 
            name.includes('debug') ||
            name.includes('sample') ||
            name.includes('dummy') ||
            name.includes('example') ||
            slug.includes('test') ||
            slug.includes('project-') ||
            slug.includes('debug') ||
            slug.includes('sample')) {
          testProjectIds.push(project.id);
        }
        
        // Incomplete projects (no price, no image, no location)
        else if ((!project.price_from || project.price_from === '0' || project.price_from === 'Price on request') &&
                 !project.image_url_banner &&
                 !project.location) {
          testProjectIds.push(project.id);
        }
        
        // Projects with suspicious names
        else if (name.includes('gls') || 
                 name.includes('plot') ||
                 name.includes('st ') ||
                 name.includes('@') ||
                 name.includes('road') ||
                 name.includes('drive') ||
                 name.includes('avenue')) {
          testProjectIds.push(project.id);
        }
      });
      
      console.log(`📊 Found ${testProjectIds.length} test projects to remove:`);
      testProjectIds.forEach((id, index) => {
        const project = projects.find(p => p.id === id);
        console.log(`  ${index + 1}. ID: ${id} | Name: ${project?.name || 'Unknown'}`);
      });
      
      return testProjectIds;
    } catch (error) {
      console.error('❌ Failed to identify test projects:', error.message);
      return [];
    }
  }

  async executeCleanup() {
    console.log('🚀 Starting test project cleanup...\n');
    
    try {
      const testProjectIds = await this.getTestProjectIds();
      
      if (testProjectIds.length === 0) {
        console.log('✅ No test projects found to remove!');
        return { success: true, removed: 0 };
      }

      console.log(`\n🗑️  Removing ${testProjectIds.length} test projects...`);
      
      let successCount = 0;
      let errorCount = 0;
      const errors = [];

      // Remove projects one by one
      for (let i = 0; i < testProjectIds.length; i++) {
        const projectId = testProjectIds[i];
        
        try {
          // Use the existing API endpoint to delete projects
          const deleteResponse = await this.makeRequest('DELETE', `/api/projects-prisma/${projectId}`);
          
          if (deleteResponse.success !== false) {
            console.log(`  ✅ Removed project ID: ${projectId}`);
            successCount++;
          } else {
            console.log(`  ❌ Failed to remove project ID: ${projectId} - ${deleteResponse.message || 'Unknown error'}`);
            errorCount++;
            errors.push({ id: projectId, error: deleteResponse.message || 'Unknown error' });
          }
        } catch (error) {
          console.log(`  ❌ Error removing project ID: ${projectId} - ${error.message}`);
          errorCount++;
          errors.push({ id: projectId, error: error.message });
        }
      }

      console.log(`\n📊 Cleanup Summary:`);
      console.log(`  Total processed: ${testProjectIds.length}`);
      console.log(`  Successfully removed: ${successCount}`);
      console.log(`  Errors: ${errorCount}`);
      
      if (errors.length > 0) {
        console.log(`\n❌ Errors encountered:`);
        errors.forEach((err, index) => {
          console.log(`  ${index + 1}. Project ID ${err.id}: ${err.error}`);
        });
      }

      return {
        success: errorCount === 0,
        total: testProjectIds.length,
        removed: successCount,
        errors: errorCount,
        errorList: errors
      };

    } catch (error) {
      console.error('❌ Cleanup execution failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  async checkFinalStatus() {
    console.log('\n📊 Checking final status...\n');
    
    try {
      // Check database count
      const dbResponse = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1');
      const dbCount = dbResponse.meta?.pagination?.total || 0;
      
      // Check CSV count
      const csvResponse = await this.makeRequest('GET', '/api/inspect-csv');
      const csvCount = csvResponse.files?.[0]?.rowCount || 0;
      
      console.log(`📈 Final Status:`);
      console.log(`  Database projects: ${dbCount}`);
      console.log(`  CSV projects: ${csvCount}`);
      console.log(`  Difference: ${dbCount - csvCount}`);
      
      if (dbCount === csvCount) {
        console.log(`\n🎉 Perfect sync achieved! Database and CSV are now aligned.`);
      } else if (dbCount > csvCount) {
        console.log(`\n⚠️  Still ${dbCount - csvCount} extra projects in database`);
      } else {
        console.log(`\n⚠️  ${csvCount - dbCount} projects missing from database`);
      }
      
      return { dbCount, csvCount, synced: dbCount === csvCount };
    } catch (error) {
      console.error('❌ Status check failed:', error.message);
      return { dbCount: 0, csvCount: 0, synced: false };
    }
  }

  async run() {
    const args = process.argv.slice(2);
    const dryRun = !args.includes('--execute');
    const checkStatus = args.includes('--status');

    if (checkStatus) {
      await this.checkFinalStatus();
      return;
    }

    if (dryRun) {
      console.log('🔍 DRY RUN MODE - No changes will be made');
      console.log('Use --execute flag to actually remove test projects\n');
      
      const testProjectIds = await this.getTestProjectIds();
      console.log(`\n💡 Would remove ${testProjectIds.length} test projects`);
      console.log('💡 To execute cleanup, run: node scripts/execute-cleanup.js --execute');
      return;
    }

    console.log('🚀 EXECUTING CLEANUP - Test projects will be permanently removed!\n');
    
    const result = await this.executeCleanup();
    
    if (result.success) {
      console.log('\n✅ Cleanup completed successfully!');
      console.log(`📊 Removed ${result.removed} test projects`);
      
      // Check final status
      await this.checkFinalStatus();
    } else {
      console.log('\n❌ Cleanup completed with errors');
      console.log(`📊 Removed ${result.removed} projects, ${result.errors} errors`);
    }
  }
}

// Run cleanup
if (require.main === module) {
  const executor = new CleanupExecutor();
  executor.run().catch(console.error);
}

module.exports = { CleanupExecutor };
