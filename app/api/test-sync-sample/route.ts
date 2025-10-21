import { NextRequest, NextResponse } from 'next/server';
import { KWS3SyncService } from '@/lib/kw-s3-sync-service';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing KW S3 sync with sample data...');
    
    const syncService = new KWS3SyncService();
    
    // Only sync first 10 projects and their related data
    const result = await syncService.syncSampleData();

    return NextResponse.json({
      success: result.success,
      message: 'Sample sync completed',
      timestamp: new Date().toISOString(),
      results: result.results,
      errors: result.errors,
    });
  } catch (error) {
    console.error('Sample sync failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Sample sync failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

