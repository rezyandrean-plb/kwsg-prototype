import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['error'],
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || searchParams.get('pageSize') || '20'), 100) // Max 100 items
    const search = searchParams.get('search') || ''
    const location = searchParams.get('location') || ''
    const type = searchParams.get('type') || ''
    const status = searchParams.get('status') || ''
    const sortBy = searchParams.get('sort') || 'updated_at:desc'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    
    // Calculate offset
    const offset = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { project_name: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { developer: { contains: search, mode: 'insensitive' } },
      ]
    }
    
    if (location) {
      where.location = { contains: location, mode: 'insensitive' }
    }
    
    if (type) {
      where.type = { contains: type, mode: 'insensitive' }
    }
    
    if (status) {
      where.status = { contains: status, mode: 'insensitive' }
    }

    // Build orderBy clause
    const orderBy: any = {}
    
    // Parse sort parameter (format: "field:direction")
    const [sortField, sortDirection] = sortBy.split(':')
    const direction = sortDirection === 'asc' ? 'asc' : 'desc'
    
    
    if (sortField === 'price_from') {
      orderBy.price_from = direction
    } else if (sortField === 'name') {
      orderBy.name = direction
    } else if (sortField === 'location') {
      orderBy.location = direction
    } else if (sortField === 'created_at') {
      orderBy.created_at = direction
    } else if (sortField === 'updated_at') {
      orderBy.updated_at = direction
    } else if (sortField === 'price') {
      orderBy.price_from = direction
    } else if (sortField === 'completion') {
      orderBy.completion = direction
    } else {
      // Default to updated_at desc for latest entries first
      orderBy.updated_at = 'desc'
    }
    

    // Execute queries in parallel
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit,
        select: {
          id: true,
          name: true,
          project_name: true,
          slug: true,
          title: true,
          location: true,
          address: true,
          type: true,
          price: true,
          price_from: true,
          price_per_sqft: true,
          bedrooms: true,
          bathrooms: true,
          size: true,
          units: true,
          developer: true,
          completion: true,
          description: true,
          district: true,
          tenure: true,
          property_type: true,
          status: true,
          total_units: true,
          total_floors: true,
          site_area: true,
          latitude: true,
          longitude: true,
          image_url_banner: true,
          features: true,
          created_at: true,
          updated_at: true,
        },
      }),
      prisma.project.count({ where }),
    ])

    // Get unit pricing summary for each project
    const projectIds = projects.map(p => p.id)
    const unitPricingSummary = await prisma.unit_pricing.groupBy({
      by: ['project_id'],
      where: {
        project_id: { in: projectIds },
      },
      _count: {
        id: true,
      },
      _min: {
        price_from: true,
      },
      _max: {
        price_to: true,
      },
    })

    // Create a map for quick lookup
    const pricingMap = new Map()
    unitPricingSummary.forEach(pricing => {
      if (pricing.project_id) {
        pricingMap.set(pricing.project_id, {
          unit_count: pricing._count.id,
          min_price: pricing._min.price_from,
          max_price: pricing._max.price_to,
        })
      }
    })

    
    // Transform projects with pricing summary
    const transformedProjects = projects.map(project => {
      const pricing = pricingMap.get(project.id)
      
      
      return {
        id: project.id,
        name: project.name || project.project_name || project.title || `Project ${project.id}`,
        project_name: project.project_name || project.name,
        slug: project.slug || `project-${project.id}`,
        title: project.title || project.name,
        location: project.location,
        address: project.address,
        type: project.type || project.property_type,
        price: project.price,
        price_from: project.price_from,
        price_per_sqft: project.price_per_sqft,
        bedrooms: project.bedrooms,
        bathrooms: project.bathrooms,
        size: project.size,
        units: project.units,
        developer: project.developer,
        completion: project.completion,
        description: project.description,
        district: project.district,
        tenure: project.tenure,
        property_type: project.property_type,
        status: project.status,
        total_units: project.total_units,
        total_floors: project.total_floors,
        site_area: project.site_area,
        latitude: project.latitude ? parseFloat(project.latitude) : null,
        longitude: project.longitude ? parseFloat(project.longitude) : null,
        image_url_banner: project.image_url_banner,
        features: Array.isArray(project.features) ? project.features : [],
        unit_pricing_summary: pricing ? {
          unit_count: pricing.unit_count,
          price_range: pricing.min_price && pricing.max_price 
            ? `${pricing.min_price} - ${pricing.max_price}`
            : pricing.min_price || pricing.max_price || null,
        } : null,
        created_at: project.created_at,
        updated_at: project.updated_at,
      }
    })

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return NextResponse.json({
      data: transformedProjects,
      meta: {
        pagination: {
          page,
          pageSize: limit,
          pageCount: totalPages,
          total: totalCount,
          hasNextPage,
          hasPrevPage,
        },
        search,
        location,
        type,
        status,
        sortBy,
        sortOrder,
      },
    })
  } catch (error) {
    console.error('Error in projects-prisma API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}