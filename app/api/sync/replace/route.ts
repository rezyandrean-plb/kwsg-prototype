import { NextRequest, NextResponse } from 'next/server';
import { DatabaseSyncService } from '@/lib/database-sync';

export async function POST(request: NextRequest) {
  try {
    const { bucketName, csvKey } = await request.json();
    
    if (!bucketName || !csvKey) {
      return NextResponse.json(
        { error: 'bucketName and csvKey are required' },
        { status: 400 }
      );
    }

    const syncService = new DatabaseSyncService(bucketName, csvKey);
    const result = await syncService.replaceAllDataFromS3();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        count: result.count,
      });
    } else {
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in replace endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}






