import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectIds = searchParams.get('ids')
    
    if (!projectIds) {
      return NextResponse.json({ error: 'Project IDs are required' }, { status: 400 })
    }
    
    // Parse the IDs
    const ids = projectIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
    
    if (ids.length === 0) {
      return NextResponse.json({ error: 'No valid project IDs provided' }, { status: 400 })
    }
    
    console.log('🔍 Checking if projects exist...')
    
    // First, let's check which projects exist
    const existingProjects = await prisma.project.findMany({
      where: {
        id: {
          in: ids
        }
      },
      select: {
        id: true,
        name: true,
        project_name: true,
        slug: true
      }
    })
    
    console.log(`Found ${existingProjects.length} projects to delete:`)
    existingProjects.forEach(project => {
      console.log(`- ID: ${project.id}, Name: ${project.name || project.project_name}, Slug: ${project.slug}`)
    })
    
    if (existingProjects.length === 0) {
      return NextResponse.json({ 
        message: 'No projects found with the specified IDs.',
        deletedCount: 0,
        projects: []
      })
    }
    
    // Show related data that will be cascade deleted
    console.log('🔍 Checking related data that will be deleted...')
    
    const relatedDataSummary = []
    for (const project of existingProjects) {
      const [projectDetails, projectFacilities, sitePlans, unitPricing, unitAvailability] = await Promise.all([
        prisma.project_details.count({ where: { project_id: project.id } }),
        prisma.project_facilities.count({ where: { project_id: project.id } }),
        prisma.site_plans.count({ where: { project_id: project.id } }),
        prisma.unit_pricing.count({ where: { project_id: project.id } }),
        prisma.unit_availability.count({ where: { project_id: project.id } })
      ])
      
      relatedDataSummary.push({
        project_id: project.id,
        project_name: project.name || project.project_name,
        project_details: projectDetails,
        project_facilities: projectFacilities,
        site_plans: sitePlans,
        unit_pricing: unitPricing,
        unit_availability: unitAvailability
      })
    }
    
    console.log('🗑️ Deleting projects...')
    
    // Delete the projects (cascade will handle related data)
    const deleteResult = await prisma.project.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
    
    console.log(`✅ Successfully deleted ${deleteResult.count} projects and all related data.`)
    
    // Verify deletion
    const remainingProjects = await prisma.project.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })
    
    const verification = remainingProjects.length === 0 ? 'All specified projects have been successfully deleted.' : 'Some projects may still exist.'
    
    return NextResponse.json({
      message: `Successfully deleted ${deleteResult.count} projects and all related data.`,
      deletedCount: deleteResult.count,
      projects: existingProjects,
      relatedDataSummary,
      verification
    })
    
  } catch (error) {
    console.error('❌ Error deleting projects:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}


