#!/usr/bin/env tsx

import { DatabaseSyncService } from '../lib/database-sync';

/**
 * Script to sync database with CSV from S3
 * Usage: tsx scripts/sync-database.ts <bucketName> <csvKey>
 */

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: tsx scripts/sync-database.ts <bucketName> <csvKey>');
    console.error('Example: tsx scripts/sync-database.ts my-bucket projects.csv');
    process.exit(1);
  }

  const [bucketName, csvKey] = args;

  console.log(`Starting database sync...`);
  console.log(`Bucket: ${bucketName}`);
  console.log(`CSV Key: ${csvKey}`);
  console.log('');

  try {
    const syncService = new DatabaseSyncService(bucketName, csvKey);
    const result = await syncService.syncWithS3();
    
    if (result.success) {
      console.log('✅ SYNC COMPLETED!');
      console.log(`Message: ${result.message}`);
      console.log(`Created: ${result.stats.created}`);
      console.log(`Updated: ${result.stats.updated}`);
      console.log(`Deleted: ${result.stats.deleted}`);
    } else {
      console.error('❌ SYNC FAILED!');
      console.error(`Error: ${result.message}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ SYNC FAILED!');
    console.error('Error:', error);
    process.exit(1);
  }
}

main().catch(console.error);






