import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get all unit pricing data
    const unitPricing = await prisma.unit_pricing.findMany({
      take: 5,
      orderBy: [{ id: 'asc' }],
    });

    // Get count
    const count = await prisma.unit_pricing.count();

    // Get unique project names
    const projectNames = await prisma.unit_pricing.findMany({
      select: { project_name: true },
      distinct: ['project_name'],
      take: 10,
    });

    return NextResponse.json({
      count,
      sample: unitPricing,
      projectNames: projectNames.map(p => p.project_name),
    });
  } catch (error) {
    console.error('Debug unit pricing error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}

