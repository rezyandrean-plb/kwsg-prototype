import { NextRequest, NextResponse } from 'next/server';
import { DatabaseSyncService } from '@/lib/database-sync';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bucketName = searchParams.get('bucketName');
    const csvKey = searchParams.get('csvKey');
    
    if (!bucketName || !csvKey) {
      return NextResponse.json(
        { error: 'bucketName and csvKey are required' },
        { status: 400 }
      );
    }

    const syncService = new DatabaseSyncService(bucketName, csvKey);
    const status = await syncService.getSyncStatus();

    return NextResponse.json({
      success: true,
      status,
    });
  } catch (error) {
    console.error('Error in status endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}






