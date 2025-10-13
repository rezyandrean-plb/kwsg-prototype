#!/usr/bin/env tsx

import { DatabaseSyncService } from '../lib/database-sync';

/**
 * Script to replace all database data with CSV from S3
 * Usage: tsx scripts/replace-database.ts <bucketName> <csvKey>
 */

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: tsx scripts/replace-database.ts <bucketName> <csvKey>');
    console.error('Example: tsx scripts/replace-database.ts my-bucket projects.csv');
    process.exit(1);
  }

  const [bucketName, csvKey] = args;

  console.log(`Starting database replacement...`);
  console.log(`Bucket: ${bucketName}`);
  console.log(`CSV Key: ${csvKey}`);
  console.log('');

  try {
    const syncService = new DatabaseSyncService(bucketName, csvKey);
    
    console.log('⚠️  WARNING: This will DELETE ALL existing data and replace it with CSV data!');
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...');
    
    // Wait 5 seconds for user to cancel
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const result = await syncService.replaceAllDataFromS3();
    
    if (result.success) {
      console.log('✅ SUCCESS!');
      console.log(`Message: ${result.message}`);
      console.log(`Projects processed: ${result.count}`);
    } else {
      console.error('❌ FAILED!');
      console.error(`Error: ${result.message}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ FAILED!');
    console.error('Error:', error);
    process.exit(1);
  }
}

main().catch(console.error);






