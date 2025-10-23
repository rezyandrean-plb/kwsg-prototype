import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idOrSlug = searchParams.get('id');

    if (!idOrSlug) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    // Test project lookup
    const numericId = Number(idOrSlug);
    let project;
    
    if (Number.isFinite(numericId)) {
      project = await prisma.project.findFirst({ where: { id: numericId } });
    } else {
      project = await prisma.project.findFirst({ where: { slug: idOrSlug } });
    }

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        project_name: project.project_name,
        title: project.title,
        slug: project.slug,
      }
    });
  } catch (error) {
    console.error('Test project lookup error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}




