import { NextRequest, NextResponse } from 'next/server';
import { KWS3SyncService } from '@/lib/kw-s3-sync-service';

export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Starting scheduled KW S3 project data sync...');
    
    const syncService = new KWS3SyncService();
    const result = await syncService.syncAllData();

    console.log('Scheduled sync completed:', result);

    return NextResponse.json({
      success: result.success,
      message: 'Project data sync completed',
      timestamp: new Date().toISOString(),
      results: result.results,
      errors: result.errors,
    });
  } catch (error) {
    console.error('Scheduled sync failed:', error);
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

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request);
}
