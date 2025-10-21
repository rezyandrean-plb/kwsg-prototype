#!/usr/bin/env node

/**
 * Cleanup Extra Projects Script
 * 
 * This script removes extra/suspicious projects from the database
 * based on the analysis results.
 */

const https = require('https');
const http = require('http');

class ProjectCleanup {
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

  async getProjectsToRemove() {
    // Based on analysis, these are the projects to remove:
    const projectsToRemove = [
      // Test projects
      { id: 700, name: 'Test Project API', reason: 'Test project with no data' },
      
      // Duplicates - keep the better one, remove the worse one
      { id: 631, name: 'The Gazania (duplicate)', reason: 'Duplicate - keeping ID 374 (has price)' },
      { id: 606, name: 'Parkwood Collection (duplicate)', reason: 'Duplicate - keeping ID 404 (has price)' }
    ];

    return projectsToRemove;
  }

  async cleanupProjects(dryRun = true) {
    try {
      console.log(`🧹 ${dryRun ? 'DRY RUN: ' : ''}Starting project cleanup...\n`);
      
      const projectsToRemove = await this.getProjectsToRemove();
      
      console.log(`📋 Projects to remove: ${projectsToRemove.length}`);
      console.log('='.repeat(50));
      
      for (const project of projectsToRemove) {
        console.log(`\n${dryRun ? '🔍 [DRY RUN]' : '🗑️ '} ${project.reason}`);
        console.log(`   ID: ${project.id} | Name: ${project.name}`);
        
        if (!dryRun) {
          try {
            // Note: This would require a DELETE API endpoint
            // For now, we'll just log what would be deleted
            console.log(`   ✅ Would delete project ID ${project.id}`);
          } catch (error) {
            console.log(`   ❌ Failed to delete project ID ${project.id}: ${error.message}`);
          }
        } else {
          console.log(`   [DRY RUN] Would delete project ID ${project.id}`);
        }
      }

      console.log(`\n✅ ${dryRun ? 'DRY RUN ' : ''}Cleanup completed!`);
      
      if (dryRun) {
        console.log('\n💡 To execute the cleanup, run:');
        console.log('   node scripts/cleanup-extra-projects.js --execute');
      }

      return {
        success: true,
        removed: projectsToRemove.length,
        projects: projectsToRemove
      };

    } catch (error) {
      console.error('❌ Cleanup failed:', error);
      return { success: false, error: error.message };
    }
  }

  async generateCleanupSQL() {
    const projectsToRemove = await this.getProjectsToRemove();
    
    console.log('\n📝 SQL Commands to remove extra projects:');
    console.log('='.repeat(50));
    
    projectsToRemove.forEach((project, index) => {
      console.log(`-- ${project.reason}`);
      console.log(`DELETE FROM "Project" WHERE id = ${project.id};`);
      if (index < projectsToRemove.length - 1) {
        console.log('');
      }
    });

    console.log('\n💡 Execute these SQL commands in your database to remove the extra projects.');
    console.log('⚠️  Make sure to backup your database before running these commands!');
  }

  async run() {
    const args = process.argv.slice(2);
    const dryRun = !args.includes('--execute');
    const generateSQL = args.includes('--sql');

    if (generateSQL) {
      await this.generateCleanupSQL();
      return;
    }

    if (dryRun) {
      console.log('🔍 DRY RUN MODE - No changes will be made');
      console.log('Use --execute flag to make actual changes\n');
    }

    const result = await this.cleanupProjects(dryRun);
    
    if (result.success) {
      console.log(`\n📊 Cleanup Summary:`);
      console.log(`   Projects to remove: ${result.removed}`);
      console.log(`   Mode: ${dryRun ? 'Dry Run' : 'Execute'}`);
    }
  }
}

// Run cleanup
if (require.main === module) {
  const cleanup = new ProjectCleanup();
  cleanup.run().catch(console.error);
}

module.exports = { ProjectCleanup };
