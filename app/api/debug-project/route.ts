import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get all projects
    const projects = await prisma.project.findMany({
      take: 5,
      orderBy: [{ id: 'asc' }],
    });

    // Get count
    const count = await prisma.project.count();

    return NextResponse.json({
      count,
      projects,
    });
  } catch (error) {
    console.error('Debug project error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}