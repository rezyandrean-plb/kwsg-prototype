import { NextRequest, NextResponse } from 'next/server';
import { KWS3SyncService } from '@/lib/kw-s3-sync-service';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing KW S3 sync...');
    
    const syncService = new KWS3SyncService();
    const result = await syncService.syncAllData();

    return NextResponse.json({
      success: result.success,
      message: 'Test sync completed',
      timestamp: new Date().toISOString(),
      results: result.results,
      errors: result.errors,
    });
  } catch (error) {
    console.error('Test sync failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Test sync failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}





