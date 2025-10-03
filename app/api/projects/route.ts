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

type Project = {
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
  coordinates?: { lat: number; lng: number }
  bedrooms?: string[]
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
    
    // Search
    const searchQuery = searchParams.get('search') || ''
    
    // Sorting
    const sortBy = searchParams.get('sort') || 'created_at:desc'
    
    // Filters
    const districts = searchParams.getAll('districts').map(d => parseInt(d)).filter(d => !isNaN(d))
    const tenures = searchParams.getAll('tenures')
    const propertyTypes = searchParams.getAll('propertyTypes')
    const statuses = searchParams.getAll('statuses')
    const bedrooms = searchParams.getAll('bedrooms')
    const priceMin = parseFloat(searchParams.get('priceMin') || '0')
    const priceMax = parseFloat(searchParams.get('priceMax') || '5000000')

    // Validate parameters
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 })
    }

    // Set up timeout for the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, 15000) // Increased timeout for complex queries

    try {
      // Build Strapi query parameters
      const strapiParams = new URLSearchParams()
      
      // Pagination
      strapiParams.set('pagination[page]', String(page))
      strapiParams.set('pagination[pageSize]', String(pageSize))
      
      // Sorting
      strapiParams.set('sort', sortBy)
      
      // Populate developer
      strapiParams.set('populate', 'developer')

      // Build filters array for Strapi v4
      const filters: any = {}

      // Search filter - search across multiple fields
      if (searchQuery.trim()) {
        const searchTerm = searchQuery.trim()
        filters['$or'] = [
          { name: { $containsi: searchTerm } },
          { project_name: { $containsi: searchTerm } },
          { location: { $containsi: searchTerm } },
          { address: { $containsi: searchTerm } },
          { developer: { $containsi: searchTerm } }
        ]
      }

      // District filter
      if (districts.length > 0) {
        const districtStrings = districts.map(d => `D${d.toString().padStart(2, '0')}`)
        filters.district = { $in: districtStrings }
      }

      // Tenure filter
      if (tenures.length > 0) {
        filters.tenure = { $in: tenures }
      }

      // Property type filter
      if (propertyTypes.length > 0) {
        filters.property_type = { $in: propertyTypes }
      }

      // Status filter
      if (statuses.length > 0) {
        const statusConditions: any[] = []
        statuses.forEach(status => {
          switch (status) {
            case 'upcoming':
              statusConditions.push({ status: { $containsi: 'launching soon' } })
              statusConditions.push({ status: { $containsi: 'coming soon' } })
              statusConditions.push({ status: { $containsi: 'upcoming' } })
              break
            case 'ongoing':
              statusConditions.push({ status: { $containsi: 'under construction' } })
              statusConditions.push({ status: { $containsi: 'ongoing' } })
              break
            case 'completed':
              statusConditions.push({ status: { $containsi: 'completed' } })
              break
          }
        })
        if (statusConditions.length > 0) {
          filters['$or'] = filters['$or'] ? [...filters['$or'], ...statusConditions] : statusConditions
        }
      }

      // Bedroom filter
      if (bedrooms.length > 0) {
        const bedroomConditions: any[] = []
        bedrooms.forEach(bedroom => {
          if (bedroom === 'Studio') {
            bedroomConditions.push({ bedrooms: { $containsi: 'Studio' } })
            bedroomConditions.push({ bedrooms: { $containsi: '0' } })
          } else if (bedroom === '5 or more') {
            // This is complex in Strapi, we'll handle it client-side for now
            bedroomConditions.push({ bedrooms: { $containsi: '5' } })
            bedroomConditions.push({ bedrooms: { $containsi: '6' } })
            bedroomConditions.push({ bedrooms: { $containsi: '7' } })
          } else {
            bedroomConditions.push({ bedrooms: { $containsi: bedroom } })
          }
        })
        if (bedroomConditions.length > 0) {
          filters['$or'] = filters['$or'] ? [...filters['$or'], ...bedroomConditions] : bedroomConditions
        }
      }

      // Add filters to query if any exist
      if (Object.keys(filters).length > 0) {
        strapiParams.set('filters', JSON.stringify(filters))
      }

      const strapiUrl = `https://striking-hug-052e89dfad.strapiapp.com/api/projects?${strapiParams.toString()}`
      
      const response = await fetch(strapiUrl, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Don't cache filtered results
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const apiProjects: ApiProject[] = data.data || []

      // Transform API data to our format
      const projects: Project[] = apiProjects.map((apiProject): Project => {
        // Extract district number from district string (e.g., "D05" -> 5)
        const districtNumber = apiProject.district ? 
          (() => {
            const match = apiProject.district.match(/D(\d+)/)
            return match ? parseInt(match[1]) : undefined
          })() : undefined

        // Generate price display
        let price = 'Price on request'
        let lowerPrice: string | undefined = undefined

        if (apiProject.price_from && apiProject.price_from !== '0') {
          const priceFromMillions = asMillions(apiProject.price_from)
          if (priceFromMillions) {
            lowerPrice = priceFromMillions
            price = `From $${priceFromMillions}M`
          }
        } else if (apiProject.display_price) {
          const match = apiProject.display_price.match(/([\$]?[0-9,]+(\.[0-9]+)?)/)
          if (match) {
            const m = asMillions(match[1])
            if (m && m !== '0') {
              lowerPrice = m
              price = `From $${m}M`
            } else {
              price = apiProject.display_price
            }
          } else {
            price = apiProject.display_price
          }
        } else if (apiProject.price) {
          price = apiProject.price
        }

        // Generate coordinates
        const coordinates = apiProject.latitude && apiProject.longitude ? 
          { lat: apiProject.latitude, lng: apiProject.longitude } : 
          { lat: 1.3521, lng: 103.8198 }

        // Generate bedrooms array
        const bedrooms = apiProject.bedrooms ? 
          apiProject.bedrooms.split(',').map(b => b.trim()).filter(b => b && b !== 'N/A') : 
          undefined

        // Generate image URL
        const bannerFromApi = (apiProject.image_url_banner ?? apiProject.image_banner_url ?? '').trim()
        const image = bannerFromApi !== ''
          ? bannerFromApi
          : `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80`

        // Developer name
        const developerName = typeof apiProject.developer === 'string'
          ? apiProject.developer
          : (apiProject.developer && typeof apiProject.developer === 'object' && 'name' in apiProject.developer)
            ? (apiProject.developer as any).name
            : ''

        return {
          id: apiProject.id,
          slug: apiProject.slug,
          name: apiProject.name || apiProject.project_name || 'Unnamed Project',
          location: apiProject.location || 'Location not specified',
          address: apiProject.address,
          price,
          priceRange: apiProject.display_price || undefined,
          pricePerSqFt: apiProject.price_per_sqft,
          image,
          units: apiProject.units ? `${apiProject.units} Units` : undefined,
          developer: developerName,
          completion: apiProject.completion || '',
          type: apiProject.type || apiProject.property_type || '',
          status: mapStatus(apiProject.status),
          district: districtNumber,
          tenure: apiProject.tenure,
          propertyType: apiProject.property_type,
          coordinates,
          lowerPrice,
          bedrooms,
          features: apiProject.features || [],
          description: apiProject.description
        }
      })

      // Apply client-side price filtering (since Strapi price filtering is complex)
      const filteredProjects = projects.filter(project => {
        if (priceMin === 0 && priceMax === 5000000) return true
        
        if (!project.lowerPrice) return true // Include projects without price in range
        
        const projectPrice = parseFloat(project.lowerPrice) * 1000000 // Convert millions to actual price
        return projectPrice >= priceMin && projectPrice <= priceMax
      })

      // Apply client-side bedroom filtering for complex cases
      const finalProjects = filteredProjects.filter(project => {
        if (bedrooms.length === 0) return true
        
        if (!project.bedrooms || project.bedrooms.length === 0) return false
        
        return bedrooms.some(selectedBedroom => {
          if (selectedBedroom === 'Studio') {
            return project.bedrooms?.includes('Studio') || project.bedrooms?.includes('0')
          } else if (selectedBedroom === '5 or more') {
            return project.bedrooms?.some(bedroom => {
              const num = parseInt(bedroom)
              return !isNaN(num) && num >= 5
            })
          } else {
            return project.bedrooms?.includes(selectedBedroom)
          }
        })
      })

      return NextResponse.json({
        data: finalProjects,
        meta: {
          pagination: {
            page: data.meta?.pagination?.page || page,
            pageSize: data.meta?.pagination?.pageSize || pageSize,
            pageCount: data.meta?.pagination?.pageCount || 1,
            total: data.meta?.pagination?.total || finalProjects.length
          }
        }
      })
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  } catch (error) {
    console.error('Error in projects API:', error)
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
