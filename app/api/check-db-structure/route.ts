import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Test if we can query the site_plans table
    const sitePlans = await prisma.site_plans.findMany({
      take: 1,
    });

    return NextResponse.json({
      success: true,
      sitePlansCount: sitePlans.length,
      sampleSitePlan: sitePlans[0] || null,
    });
  } catch (error) {
    console.error('Check DB structure error:', error);
    return NextResponse.json({ 
      error: 'Database structure check failed', 
      details: (error as Error).message 
    }, { status: 500 });
  }
}



