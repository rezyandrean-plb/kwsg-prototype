import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Create a new Prisma client instance
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

type ApiProject = {
  id: number
  name?: string
  project_name?: string
  slug: string
  title?: string
  location?: string
  address?: string
  type?: string
  price?: string
  price_from?: string
  display_price?: string
  price_per_sqft?: string
  bedrooms?: string
  bathrooms?: string
  size?: string
  units?: string
  developer?: string
  completion?: string
  description?: string
  features?: string[]
  district?: string
  tenure?: string
  property_type?: string
  status?: string
  total_units?: string
  total_floors?: string
  site_area?: string
  latitude?: number | null
  longitude?: number | null
  image_url_banner?: string | null
  image_banner_url?: string | null
  gallery_images?: string[]
  unit_pricing?: any[]
  facilities?: any[]
  created_at: string
  updated_at: string
}

type Project = {
  id: number
  name: string
  location: string
  address?: string
  price: string
  price_from: string
  lowerPrice?: string
  pricePerSqFt?: string
  developer: {
    name: string | null
    description: string | null
    logo_url: string | null
    website: string | null
    contact_email: string | null
    contact_phone: string | null
  }
  completion: string
  status: string
  image_url_banner: string | null
  created_at: Date | null
  updated_at: Date | null
  description: string | null
  type: string
  bedrooms: string
  bathrooms: string
  slug: string
  tenure: string
  units: string
}

function mapStatus(status?: string | null): 'upcoming' | 'ongoing' | 'completed' {
  if (!status) return 'upcoming'
  const s = status.toLowerCase()
  if (s.includes('launching soon') || s.includes('coming soon') || s.includes('upcoming')) return 'upcoming'
  if (s.includes('under construction') || s.includes('ongoing')) return 'ongoing'
  return 'completed'
}

function normalizeMoney(s?: string) {
  return (s || '').replace(/[\$,]/g, '').trim()
}

function asMillions(raw?: string) {
  const n = Number(normalizeMoney(raw))
  if (!isFinite(n) || n <= 0) return undefined
  const inMillions = n >= 1000000 ? (n / 1_000_000).toFixed(2).replace(/\.00$/, '') : (n / 1_000_000).toFixed(2)
  return inMillions
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '8')
    const skip = (page - 1) * pageSize

    // Validate parameters
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 })
    }

    // Build where clause with search functionality
    const where: any = {}
    const orderBy: any = { created_at: 'desc' }

    // Handle search parameter
    const searchQuery = searchParams.get('search')
    if (searchQuery && searchQuery.trim()) {
      const searchTerm = searchQuery.trim()
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { project_name: { contains: searchTerm, mode: 'insensitive' } },
        { location: { contains: searchTerm, mode: 'insensitive' } },
        { address: { contains: searchTerm, mode: 'insensitive' } },
        { developer: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { type: { contains: searchTerm, mode: 'insensitive' } },
        { property_type: { contains: searchTerm, mode: 'insensitive' } }
      ]
    }

    // Handle filter parameters
    const districts = searchParams.getAll('districts').map(d => parseInt(d)).filter(d => !isNaN(d))
    if (districts.length > 0) {
      const districtFormats = districts.map(d => `D${d.toString().padStart(2, '0')}`)
      where.location = { in: districtFormats }
    }

    const tenures = searchParams.getAll('tenures')
    if (tenures.length > 0) {
      where.tenure = { in: tenures }
    }

    const propertyTypes = searchParams.getAll('propertyTypes')
    if (propertyTypes.length > 0) {
      where.OR = where.OR ? [
        ...where.OR,
        { type: { in: propertyTypes } },
        { property_type: { in: propertyTypes } }
      ] : [
        { type: { in: propertyTypes } },
        { property_type: { in: propertyTypes } }
      ]
    }

    const statuses = searchParams.getAll('statuses')
    if (statuses.length > 0) {
      where.status = { in: statuses }
    }

    const bedrooms = searchParams.getAll('bedrooms')
    if (bedrooms.length > 0) {
      where.bedrooms = { in: bedrooms }
    }

    const priceMin = parseInt(searchParams.get('priceMin') || '0')
    const priceMax = parseInt(searchParams.get('priceMax') || '5000000')
    if (priceMin > 0 || priceMax < 5000000) {
      where.AND = where.AND || []
      if (priceMin > 0) {
        where.AND.push({
          OR: [
            { price_from: { gte: priceMin.toString() } },
            { price: { gte: priceMin.toString() } }
          ]
        })
      }
      if (priceMax < 5000000) {
        where.AND.push({
          OR: [
            { price_from: { lte: priceMax.toString() } },
            { price: { lte: priceMax.toString() } }
          ]
        })
      }
    }

    // Get total count for pagination
    const totalCount = await prisma.project.count({ where })

    // Fetch projects from database with developer information
    const dbProjects = await prisma.project.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
    })

    // Get all unique developer names from the projects
    const developerNames = [...new Set(dbProjects.map(p => p.developer).filter(Boolean))]
    
    // Fetch developer details from developers table
    const developers = await prisma.developers.findMany({
      where: {
        name: {
          in: developerNames
        }
      }
    })

    // Create a map for quick developer lookup
    const developerMap = new Map(developers.map(d => [d.name, d]))

    // Transform database data to our format
    const projects: Project[] = dbProjects.map((dbProject): Project => {
      // Extract district number from district string (e.g., "D05" -> 5)
      const districtNumber = dbProject.district ? 
        (() => {
          const match = dbProject.district.match(/D(\d+)/)
          return match ? parseInt(match[1]) : undefined
        })() : undefined

      // Generate price display to match expected format
      let price = 'Price on request'
      let priceFrom = '0'
      let lowerPrice: string | undefined = undefined
      let pricePerSqFt: string | undefined = undefined

      if (dbProject.price_from && dbProject.price_from !== '0') {
        priceFrom = dbProject.price_from
        // If price_from is a number, format it properly
        if (!isNaN(Number(dbProject.price_from.replace(/[$,]/g, '')))) {
          const numPrice = Number(dbProject.price_from.replace(/[$,]/g, ''))
          if (numPrice > 0) {
            price = `$${numPrice.toLocaleString()}`
            // Store the full price value for lowerPrice
            lowerPrice = numPrice.toString()
          }
        } else {
          price = dbProject.price_from
        }
      } else if (dbProject.price) {
        price = dbProject.price
        // Extract the first price from range if it's a range
        const priceMatch = dbProject.price.match(/\$([0-9,]+)/)
        if (priceMatch) {
          priceFrom = priceMatch[1]
          const numPrice = Number(priceMatch[1].replace(/,/g, ''))
          if (numPrice > 0) {
            // Store the full price value for lowerPrice
            lowerPrice = numPrice.toString()
          }
        }
      }

      // Set price per sqft if available
      if (dbProject.price_per_sqft) {
        pricePerSqFt = dbProject.price_per_sqft
      }

        // Generate coordinates
        const lat = dbProject.latitude ? parseFloat(dbProject.latitude) : 1.3521
        const lng = dbProject.longitude ? parseFloat(dbProject.longitude) : 103.8198
        const coordinates = { lat, lng }

      // Generate bedrooms array
      const bedrooms = dbProject.bedrooms ? 
        dbProject.bedrooms.split(',').map(b => b.trim()).filter(b => b && b !== 'N/A') : 
        undefined

      // Generate image URL
      const bannerFromDb = (dbProject.image_url_banner ?? dbProject.image_banner_url ?? '').trim()
      const image = bannerFromDb !== ''
        ? bannerFromDb
        : `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80`

      // Get developer object
      const developerData = developerMap.get(dbProject.developer || '') || {
        name: dbProject.developer || null,
        description: null,
        logo_url: null,
        website: null,
        contact_email: null,
        contact_phone: null
      }

      return {
        id: dbProject.id,
        name: dbProject.name || dbProject.project_name || 'Unnamed Project',
        location: dbProject.location || 'Location not specified',
        address: dbProject.address,
        price,
        price_from: priceFrom,
        lowerPrice,
        pricePerSqFt,
        developer: developerData,
        completion: dbProject.completion || '',
        status: dbProject.status || 'Active',
        image_url_banner: dbProject.image_url_banner || image,
        created_at: dbProject.created_at,
        updated_at: dbProject.updated_at,
        description: dbProject.description,
        type: dbProject.type || dbProject.property_type || '',
        bedrooms: dbProject.bedrooms || '',
        bathrooms: dbProject.bathrooms || '',
        slug: dbProject.slug,
        tenure: dbProject.tenure,
        units: dbProject.units || '0'
      }
    })

    // For now, return all projects without additional filtering
    // TODO: Implement proper filtering based on the new response structure
    const finalProjects = projects

    const pageCount = Math.ceil(totalCount / pageSize)

    return NextResponse.json({
      data: finalProjects,
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount,
          total: totalCount
        }
      }
    })

  } catch (error) {
    console.error('Error in projects-prisma API:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json({ 
      error: 'Failed to fetch projects',
      errorDetails: error.message,
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 8,
          pageCount: 0,
          total: 0
        }
      }
    }, { status: 500 })
  }
}
