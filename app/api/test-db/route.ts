import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['error'],
});

export async function GET(request: NextRequest) {
  try {
    // Simple test query
    const count = await prisma.project.count();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection working',
      projectCount: count,
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database test failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}



