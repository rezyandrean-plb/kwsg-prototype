import { NextRequest, NextResponse } from 'next/server'

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
  developer?: string | { name?: string }
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
}

type MinimalProject = {
  id: number
  slug: string
  name: string
  location: string
  address?: string
  price: string
  priceRange?: string
  lowerPrice?: string
  pricePerSqFt?: string
  type?: string
  units?: string
  developer?: string
  completion?: string
  description?: string
  features?: string[]
  district?: number
  tenure?: string
  propertyType?: string
  status?: 'upcoming' | 'ongoing' | 'completed'
  image: string
  image_url_banner?: string | null
  coordinates?: { lat: number; lng: number }
  unitPricing?: any[]
  facilities?: any[]
}

function mapStatus(status?: string | null): 'upcoming' | 'ongoing' | 'completed' {
  if (!status) return 'upcoming'
  const s = status.toLowerCase()
  if (s.includes('launching soon') || s.includes('coming soon') || s.includes('upcoming')) return 'upcoming'
  if (s.includes('under construction') || s.includes('ongoing')) return 'ongoing'
  return 'completed'
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '8')

    // Validate parameters
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 })
    }

    // Set up timeout for the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, 10000)

    try {
      // Fetch projects from Strapi with pagination - try Strapi v4 format
      const response = await fetch(`https://striking-hug-052e89dfad.strapiapp.com/api/projects/?pagination[page]=${page}&pagination[pageSize]=${pageSize}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        // Add caching for better performance
        cache: 'force-cache',
        next: { revalidate: 300 } // Revalidate every 5 minutes
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const apiProjects: ApiProject[] = data.data || []

      // Transform API data to minimal format (faster loading)
      const minimalProjects: MinimalProject[] = apiProjects.map((apiProject): MinimalProject => {
        // Extract district number from district string (e.g., "D05" -> 5)
        const districtNumber = apiProject.district ? 
          (() => {
            const match = apiProject.district.match(/D(\d+)/)
            return match ? parseInt(match[1]) : undefined
          })() : undefined

        // Map status to our enum

        // Generate price display
        let price = 'Price on request'
        let lowerPrice: string | undefined = undefined

        if (apiProject.price_from && apiProject.price_from !== '0') {
          lowerPrice = apiProject.price_from
          price = `From $${apiProject.price_from}M`
        } else if (apiProject.price_from === '0') {
          price = 'Price per request'
          lowerPrice = undefined
        } else if (apiProject.display_price) {
          const priceMatch = apiProject.display_price.match(/From\s+\$?([\d,]+\.?\d*)M?/i)
          if (priceMatch) {
            lowerPrice = priceMatch[1]
            if (lowerPrice === '0') {
              price = 'Price per request'
              lowerPrice = undefined
            } else {
              price = `From $${lowerPrice}M`
            }
          } else {
            price = apiProject.display_price
          }
        }

        // Generate coordinates
        const coordinates = apiProject.latitude && apiProject.longitude ? 
          { lat: apiProject.latitude, lng: apiProject.longitude } : 
          { lat: 1.3521, lng: 103.8198 }

        // Generate bedrooms array
        const bedrooms = apiProject.bedrooms ? 
          apiProject.bedrooms.split(',').map(b => b.trim()).filter(b => b && b !== 'N/A') : 
          undefined

        // Generate image URL: prefer API banner URL (supports both keys), else fallback
        const bannerFromApi = (apiProject.image_url_banner ?? apiProject.image_banner_url ?? '').trim()
        const image = bannerFromApi !== ''
          ? bannerFromApi
          : `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80`

        return {
          id: apiProject.id,
          slug: apiProject.slug,
          name: apiProject.name || apiProject.project_name || 'Unnamed Project',
          location: apiProject.location || 'Location not specified',
          address: apiProject.address,
          price, // calculated price
          pricePerSqFt: apiProject.price_per_sqft,
          image, // now includes the actual image URL
          units: apiProject.units ? `${apiProject.units} Units` : undefined,
          developer: typeof apiProject.developer === 'string' ? apiProject.developer :
                    (apiProject.developer && typeof apiProject.developer === 'object' && 'name' in apiProject.developer) ? (apiProject.developer as any).name :
                    apiProject.developer || 'Developer not specified',
          completion: apiProject.completion || '',
          type: apiProject.type || apiProject.property_type || '',
          status: mapStatus(apiProject.status),
          district: districtNumber,
          tenure: apiProject.tenure,
          propertyType: apiProject.property_type,
          coordinates,
          lowerPrice
        }
      })

      return NextResponse.json({
        data: minimalProjects,
        meta: {
          pagination: {
            page: data.meta?.pagination?.page || page,
            pageSize: data.meta?.pagination?.pageSize || pageSize,
            pageCount: data.meta?.pagination?.pageCount || 1,
            total: data.meta?.pagination?.total || minimalProjects.length
          }
        }
      })
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  } catch (error) {
    console.error('Error in minimal projects API:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch projects',
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
