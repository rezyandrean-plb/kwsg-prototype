import { NextRequest, NextResponse } from 'next/server';
import { DatabaseSyncService } from '@/lib/database-sync';

export async function GET(request: NextRequest) {
  try {
    // Verify this is a cron request (Vercel sets this header)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bucketName = process.env.S3_BUCKET_NAME;
    const csvKey = process.env.S3_CSV_KEY;

    if (!bucketName || !csvKey) {
      console.error('Missing S3 configuration');
      return NextResponse.json(
        { error: 'Missing S3 configuration' },
        { status: 500 }
      );
    }

    console.log('Starting daily sync...');
    const syncService = new DatabaseSyncService(bucketName, csvKey);
    const result = await syncService.syncWithS3();

    if (result.success) {
      console.log('Daily sync completed successfully:', result.stats);
      return NextResponse.json({
        success: true,
        message: result.message,
        stats: result.stats,
        timestamp: new Date().toISOString(),
      });
    } else {
      console.error('Daily sync failed:', result.message);
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in daily sync cron job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}






