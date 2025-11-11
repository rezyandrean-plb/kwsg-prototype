import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Debug: Check environment variables
    console.log('Environment check:', {
      DATABASE_URL: !!process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      prismaExists: !!prisma
    })

    // Debug: Check if prisma is properly initialized
    if (!prisma) {
      console.error('Prisma client is not initialized')
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    
    // Query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || searchParams.get('pageSize') || '20'), 2000) // Max 2000 items
    const search = searchParams.get('search') || ''
    const location = searchParams.get('location') || ''
    const type = searchParams.get('type') || ''
    const status = searchParams.get('status') || ''
    const sortBy = searchParams.get('sort') || 'updated_at:desc'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    
    // Filter parameters
    const districts = searchParams.getAll('districts').map(d => parseInt(d)).filter(d => !isNaN(d))
    const tenures = searchParams.getAll('tenures')
    const propertyTypes = searchParams.getAll('propertyTypes')
    const statuses = searchParams.getAll('statuses')
    const bedrooms = searchParams.getAll('bedrooms')
    const priceMin = parseFloat(searchParams.get('priceMin') || '0')
    const priceMax = parseFloat(searchParams.get('priceMax') || '5000000')
    
    // Calculate offset
    const offset = (page - 1) * limit

    // Build where clause
    const where: any = {}
    const andConditions: any[] = []
    
    if (search) {
      andConditions.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { project_name: { contains: search, mode: 'insensitive' } },
          { title: { contains: search, mode: 'insensitive' } },
          { location: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
          { developer: { contains: search, mode: 'insensitive' } },
        ]
      })
    }
    
    if (location) {
      andConditions.push({ location: { contains: location, mode: 'insensitive' } })
    }
    
    if (type) {
      andConditions.push({ type: { contains: type, mode: 'insensitive' } })
    }
    
    if (status) {
      andConditions.push({ status: { contains: status, mode: 'insensitive' } })
    }
    
    // District filter - handle both string (D19) and numeric (19) formats
    if (districts.length > 0) {
      const districtConditions = districts.map(district => ({
        OR: [
          { district: { equals: `D${district.toString().padStart(2, '0')}` } },
          { district: { equals: district.toString() } },
          { district: { equals: `D${district}` } }
        ]
      }))
      andConditions.push({ OR: districtConditions })
    }
    
    // Tenure filter
    if (tenures.length > 0) {
      andConditions.push({ tenure: { in: tenures } })
    }
    
    // Property type filter
    if (propertyTypes.length > 0) {
      andConditions.push({ property_type: { in: propertyTypes } })
    }
    
    // Status filter (multiple statuses)
    // Map frontend status values to database status patterns
    if (statuses.length > 0) {
      const statusConditions: any[] = []
      statuses.forEach(status => {
        switch (status.toLowerCase()) {
          case 'upcoming':
            statusConditions.push({ status: { contains: 'launching soon', mode: 'insensitive' } })
            statusConditions.push({ status: { contains: 'coming soon', mode: 'insensitive' } })
            statusConditions.push({ status: { contains: 'upcoming', mode: 'insensitive' } })
            break
          case 'ongoing':
            statusConditions.push({ status: { contains: 'under construction', mode: 'insensitive' } })
            statusConditions.push({ status: { contains: 'ongoing', mode: 'insensitive' } })
            break
          case 'completed':
            statusConditions.push({ status: { contains: 'completed', mode: 'insensitive' } })
            break
          default:
            // Fallback to exact match for any other status values
            statusConditions.push({ status: { contains: status, mode: 'insensitive' } })
        }
      })
      if (statusConditions.length > 0) {
        andConditions.push({ OR: statusConditions })
      }
    }
    
    // Bedrooms filter - this might need special handling depending on how bedrooms are stored
    if (bedrooms.length > 0) {
      // For now, we'll search in the bedrooms field as a string
      andConditions.push({ bedrooms: { in: bedrooms } })
    }
    
    // Price range filter
    if (priceMin > 0 || priceMax < 5000000) {
      // This will need to be implemented based on how prices are stored
      // For now, we'll skip this as it might require joining with unit pricing tables
    }
    
    // Apply all conditions with AND logic
    if (andConditions.length > 0) {
      where.AND = andConditions
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

    // Get unit pricing summary for each project (using safer approach)
    const projectIds = projects.map(p => p.id)
    let unitPricingSummary = []
    
    // Skip unit pricing for now to avoid the groupBy issue
    console.log('Skipping unit pricing summary to avoid groupBy issue')

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