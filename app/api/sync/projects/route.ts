import { NextRequest, NextResponse } from 'next/server';
import { KWS3SyncService } from '@/lib/kw-s3-sync-service';

export async function POST(request: NextRequest) {
  try {
    console.log('Starting manual KW S3 project data sync...');
    
    const syncService = new KWS3SyncService();
    const result = await syncService.syncAllData();

    console.log('Manual sync completed:', result);

    return NextResponse.json({
      success: result.success,
      message: 'Project data sync completed',
      timestamp: new Date().toISOString(),
      results: result.results,
      errors: result.errors,
    });
  } catch (error) {
    console.error('Manual sync failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Project data sync failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
