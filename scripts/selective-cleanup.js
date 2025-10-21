#!/usr/bin/env node

/**
 * Selective Cleanup Script
 * 
 * This script removes only projects with 'Test' in the name,
 * but preserves 'Test Project Ecoprop' and other legitimate test projects.
 */

const https = require('https');
const http = require('http');

class SelectiveCleanup {
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

  async getTestProjectsToRemove() {
    console.log('🔍 Identifying test projects to remove (excluding Ecoprop)...\n');
    
    try {
      // Get all projects from database
      const response = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1000');
      const projects = response.data || [];
      
      const testProjectsToRemove = [];
      const preservedProjects = [];
      
      projects.forEach(project => {
        const name = project.name?.toLowerCase() || '';
        
        // Check if project name contains 'test'
        if (name.includes('test')) {
          // Preserve 'Test Project Ecoprop' and other legitimate test projects
          if (name.includes('ecoprop') || 
              name.includes('legitimate') ||
              name.includes('real')) {
            preservedProjects.push(project);
            console.log(`  🛡️  PRESERVING: ${project.name} (ID: ${project.id}) - Legitimate test project`);
          } else {
            testProjectsToRemove.push(project);
            console.log(`  🗑️  TO REMOVE: ${project.name} (ID: ${project.id}) - Test project`);
          }
        }
      });
      
      console.log(`\n📊 Summary:`);
      console.log(`  Projects to remove: ${testProjectsToRemove.length}`);
      console.log(`  Projects to preserve: ${preservedProjects.length}`);
      
      if (testProjectsToRemove.length > 0) {
        console.log(`\n🗑️  Projects that will be removed:`);
        testProjectsToRemove.forEach((project, index) => {
          console.log(`  ${index + 1}. ${project.name} (ID: ${project.id})`);
        });
      }
      
      if (preservedProjects.length > 0) {
        console.log(`\n🛡️  Projects that will be preserved:`);
        preservedProjects.forEach((project, index) => {
          console.log(`  ${index + 1}. ${project.name} (ID: ${project.id})`);
        });
      }
      
      return {
        toRemove: testProjectsToRemove,
        toPreserve: preservedProjects
      };
    } catch (error) {
      console.error('❌ Failed to identify test projects:', error.message);
      return { toRemove: [], toPreserve: [] };
    }
  }

  async executeSelectiveCleanup() {
    console.log('🚀 Starting selective test project cleanup...\n');
    
    try {
      const { toRemove, toPreserve } = await this.getTestProjectsToRemove();
      
      if (toRemove.length === 0) {
        console.log('✅ No test projects found to remove!');
        return { success: true, removed: 0 };
      }

      console.log(`\n🗑️  Removing ${toRemove.length} test projects...`);
      
      let successCount = 0;
      let errorCount = 0;
      const errors = [];

      // Remove projects one by one
      for (let i = 0; i < toRemove.length; i++) {
        const project = toRemove[i];
        
        try {
          // Use the existing API endpoint to delete projects
          const deleteResponse = await this.makeRequest('DELETE', `/api/projects-prisma/${project.id}`);
          
          if (deleteResponse.success !== false) {
            console.log(`  ✅ Removed: ${project.name} (ID: ${project.id})`);
            successCount++;
          } else {
            console.log(`  ❌ Failed to remove: ${project.name} (ID: ${project.id}) - ${deleteResponse.message || 'Unknown error'}`);
            errorCount++;
            errors.push({ id: project.id, name: project.name, error: deleteResponse.message || 'Unknown error' });
          }
        } catch (error) {
          console.log(`  ❌ Error removing: ${project.name} (ID: ${project.id}) - ${error.message}`);
          errorCount++;
          errors.push({ id: project.id, name: project.name, error: error.message });
        }
      }

      console.log(`\n📊 Cleanup Summary:`);
      console.log(`  Total processed: ${toRemove.length}`);
      console.log(`  Successfully removed: ${successCount}`);
      console.log(`  Errors: ${errorCount}`);
      console.log(`  Preserved: ${toPreserve.length}`);
      
      if (errors.length > 0) {
        console.log(`\n❌ Errors encountered:`);
        errors.forEach((err, index) => {
          console.log(`  ${index + 1}. ${err.name} (ID: ${err.id}): ${err.error}`);
        });
      }

      return {
        success: errorCount === 0,
        total: toRemove.length,
        removed: successCount,
        errors: errorCount,
        preserved: toPreserve.length,
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
      
      const { toRemove, toPreserve } = await this.getTestProjectsToRemove();
      console.log(`\n💡 Would remove ${toRemove.length} test projects`);
      console.log(`💡 Would preserve ${toPreserve.length} legitimate test projects`);
      console.log('💡 To execute cleanup, run: node scripts/selective-cleanup.js --execute');
      return;
    }

    console.log('🚀 EXECUTING SELECTIVE CLEANUP - Test projects will be permanently removed!\n');
    
    const result = await this.executeSelectiveCleanup();
    
    if (result.success) {
      console.log('\n✅ Selective cleanup completed successfully!');
      console.log(`📊 Removed ${result.removed} test projects`);
      console.log(`📊 Preserved ${result.preserved} legitimate test projects`);
      
      // Check final status
      await this.checkFinalStatus();
    } else {
      console.log('\n❌ Cleanup completed with errors');
      console.log(`📊 Removed ${result.removed} projects, ${result.errors} errors`);
      console.log(`📊 Preserved ${result.preserved} legitimate test projects`);
    }
  }
}

// Run cleanup
if (require.main === module) {
  const cleanup = new SelectiveCleanup();
  cleanup.run().catch(console.error);
}

module.exports = { SelectiveCleanup };
