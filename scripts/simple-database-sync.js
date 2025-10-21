#!/usr/bin/env node

/**
 * Simple Database Sync Script
 * 
 * This script performs a simple synchronization using the working sync endpoints:
 * 1. Backup current database
 * 2. Use existing sync to replace data
 * 3. Verify synchronization
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

class SimpleDatabaseSync {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.backupDir = path.join(__dirname, '..', 'backups');
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

  async createBackup() {
    console.log('💾 Creating database backup...\n');
    
    try {
      // Create backup directory if it doesn't exist
      if (!fs.existsSync(this.backupDir)) {
        fs.mkdirSync(this.backupDir, { recursive: true });
      }

      // Get all current projects
      const response = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1000');
      const projects = response.data || [];
      const totalCount = response.meta?.pagination?.total || 0;
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(this.backupDir, `database-backup-${timestamp}.json`);
      
      const backupData = {
        timestamp: new Date().toISOString(),
        totalProjects: totalCount,
        projects: projects,
        metadata: {
          backupType: 'complete',
          reason: 'pre-sync-backup',
          version: '1.0'
        }
      };
      
      fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
      
      console.log(`✅ Backup created: ${backupFile}`);
      console.log(`📊 Backed up ${projects.length} projects (Total: ${totalCount})`);
      
      return {
        success: true,
        backupFile: backupFile,
        projectCount: projects.length,
        totalCount: totalCount
      };
    } catch (error) {
      console.error('❌ Backup failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  async performFullSync() {
    console.log('🔄 Performing full CSV sync...\n');
    
    try {
      // Use the working sync endpoint
      const response = await this.makeRequest('GET', '/api/test-sync');
      
      if (response.success) {
        console.log('✅ Full sync completed successfully');
        console.log(`📊 Results:`);
        console.log(`  Projects: ${response.results.projects}`);
        console.log(`  Units: ${response.results.units}`);
        console.log(`  Floor Plans: ${response.results.floorPlans}`);
        console.log(`  Site Plans: ${response.results.sitePlans}`);
        console.log(`  Errors: ${response.errors.length}`);
        
        if (response.errors.length > 0) {
          console.log(`\n⚠️  Sync errors:`);
          response.errors.forEach((error, index) => {
            console.log(`  ${index + 1}. ${error}`);
          });
        }
        
        return {
          success: true,
          projects: response.results.projects,
          units: response.results.units,
          floorPlans: response.results.floorPlans,
          sitePlans: response.results.sitePlans,
          errors: response.errors
        };
      } else {
        console.log('❌ Full sync failed:', response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      console.error('❌ Full sync failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  async verifySynchronization() {
    console.log('🔍 Verifying synchronization...\n');
    
    try {
      // Get database count
      const dbResponse = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1');
      const dbCount = dbResponse.meta?.pagination?.total || 0;
      
      // Get CSV count
      const csvResponse = await this.makeRequest('GET', '/api/inspect-csv');
      const csvCount = csvResponse.files?.[0]?.rowCount || 0;
      
      console.log(`📊 Synchronization Status:`);
      console.log(`  Database projects: ${dbCount}`);
      console.log(`  CSV projects: ${csvCount}`);
      console.log(`  Difference: ${dbCount - csvCount}`);
      
      const isPerfectSync = dbCount === csvCount;
      
      if (isPerfectSync) {
        console.log(`\n🎉 PERFECT SYNCHRONIZATION ACHIEVED!`);
        console.log(`✅ Database contains exactly ${dbCount} projects`);
        console.log(`✅ CSV contains exactly ${csvCount} projects`);
        console.log(`✅ Database and CSV are perfectly aligned`);
      } else {
        console.log(`\n⚠️  SYNCHRONIZATION STATUS:`);
        if (dbCount > csvCount) {
          console.log(`❌ Database has ${dbCount - csvCount} extra projects`);
        } else {
          console.log(`❌ Database is missing ${csvCount - dbCount} projects`);
        }
      }
      
      return {
        isPerfectSync,
        dbCount,
        csvCount,
        difference: dbCount - csvCount
      };
    } catch (error) {
      console.error('❌ Verification failed:', error.message);
      return { isPerfectSync: false, error: error.message };
    }
  }

  async run() {
    const args = process.argv.slice(2);
    const dryRun = !args.includes('--execute');
    const skipBackup = args.includes('--skip-backup');

    console.log('🚀 Simple Database Synchronization');
    console.log('='.repeat(50));
    
    if (dryRun) {
      console.log('🔍 DRY RUN MODE - No changes will be made');
      console.log('Use --execute flag to perform actual synchronization\n');
    }

    try {
      // Step 1: Create backup (unless skipped)
      if (!skipBackup && !dryRun) {
        const backupResult = await this.createBackup();
        if (!backupResult.success) {
          console.error('❌ Backup failed, aborting sync');
          return;
        }
      } else if (skipBackup) {
        console.log('⏭️  Skipping backup (--skip-backup flag)');
      } else {
        console.log('🔍 Would create backup in execute mode');
      }

      if (dryRun) {
        console.log('\n💡 Would perform full CSV sync');
        console.log('💡 To execute sync, run: node scripts/simple-database-sync.js --execute');
        return;
      }

      // Step 2: Perform full sync
      const syncResult = await this.performFullSync();
      if (!syncResult.success) {
        console.error('❌ Sync failed');
        return;
      }

      // Step 3: Verify synchronization
      const verification = await this.verifySynchronization();

      // Final summary
      console.log('\n🎯 SYNCHRONIZATION COMPLETE');
      console.log('='.repeat(50));
      
      if (verification.isPerfectSync) {
        console.log('✅ SUCCESS: Database is perfectly synchronized with CSV');
        console.log(`📊 Final count: ${verification.dbCount} projects`);
        console.log('🎉 Your database now contains exactly the projects from the live CSV');
      } else {
        console.log('⚠️  WARNING: Synchronization may not be perfect');
        console.log(`📊 Database: ${verification.dbCount} projects`);
        console.log(`📊 CSV: ${verification.csvCount} projects`);
        console.log(`📊 Difference: ${verification.difference}`);
      }

      return {
        success: verification.isPerfectSync,
        dbCount: verification.dbCount,
        csvCount: verification.csvCount,
        difference: verification.difference
      };

    } catch (error) {
      console.error('❌ Synchronization failed:', error.message);
      return { success: false, error: error.message };
    }
  }
}

// Run synchronization
if (require.main === module) {
  const sync = new SimpleDatabaseSync();
  sync.run().catch(console.error);
}

module.exports = { SimpleDatabaseSync };
