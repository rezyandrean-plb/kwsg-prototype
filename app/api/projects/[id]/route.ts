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
  floor_plans?: any[]
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
  image_url_banner?: string | null
  coordinates?: { lat: number; lng: number }
  unitPricing?: any[]
  facilities?: any[]
  galleryImages?: string[]
  floorPlans?: any[]
}

function mapStatus(status?: string | null): 'upcoming' | 'ongoing' | 'completed' {
  if (!status) return 'upcoming'
  const s = status.toLowerCase()
  if (s.includes('launching soon') || s.includes('coming soon') || s.includes('upcoming')) return 'upcoming'
  if (s.includes('under construction') || s.includes('ongoing')) return 'ongoing'
  return 'completed'
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = 'then' in (ctx.params as any)
      ? await (ctx.params as Promise<{ id: string }>)
      : (ctx.params as { id: string })
    const id = resolvedParams.id
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    // Determine if it's an ID or a slug
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://striking-hug-052e89dfad.strapiapp.com'
    // This Strapi instance supports direct slug access at /api/projects/:slug
    const strapiUrl = `${API_BASE}/api/projects/${encodeURIComponent(id)}?populate=unit_pricing,unitPricing,facilities,brochures,sitePlans,site_plans,floor_plans,floorPlans,gallery_images,imageGallery`

    const response = await fetch(strapiUrl, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (!response.ok) {
      return NextResponse.json({ error: `Strapi error: ${response.status}` }, { status: response.status })
    }
    const json = await response.json()
    // This API returns the project directly under data for both id and slug
    const apiProject: any = json?.data

    if (!apiProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const districtNumber = apiProject.district ? (() => {
      const m = apiProject.district.match(/D(\d+)/)
      return m ? parseInt(m[1]) : undefined
    })() : undefined

    const banner = (apiProject.image_url_banner ?? apiProject.image_banner_url ?? '').trim()
    const image = banner !== '' ? banner : '/images/new-launch/new-launch-preview.webp'

    let displayPrice = 'Price per request'
    let lowerPrice: string | undefined = undefined
    const display = apiProject.display_price || ''
    if (apiProject.price_from && apiProject.price_from !== '0') {
      lowerPrice = apiProject.price_from
      displayPrice = `From $${apiProject.price_from}M`
    } else if (display) {
      const pm = display.match(/From\s+\$?([\d,]+\.?\d*)M?/i)
      if (pm) {
        lowerPrice = pm[1]
        if (lowerPrice !== '0') displayPrice = `From $${lowerPrice}M`
      } else {
        displayPrice = display
      }
    }

    const project: Project = {
      id: apiProject.id,
      slug: apiProject.slug,
      name: apiProject.name || apiProject.project_name || apiProject.title || String(apiProject.id),
      location: apiProject.location || '',
      address: apiProject.address,
      price: displayPrice,
      priceRange: display || undefined,
      lowerPrice,
      pricePerSqFt: apiProject.price_per_sqft,
      type: apiProject.type || apiProject.property_type,
      units: apiProject.units ? `${apiProject.units} Units` : undefined,
      developer: typeof apiProject.developer === 'string' ? apiProject.developer : (apiProject.developer && (apiProject.developer as any).name) || undefined,
      completion: apiProject.completion,
      description: apiProject.description,
      features: apiProject.features || [],
      district: districtNumber,
      tenure: apiProject.tenure,
      propertyType: apiProject.property_type,
      status: mapStatus(apiProject.status),
      image,
      image_url_banner: banner || null,
      coordinates: (apiProject.latitude && apiProject.longitude) ? { lat: Number(apiProject.latitude), lng: Number(apiProject.longitude) } : undefined,
      unitPricing: Array.isArray(apiProject.unit_pricing) ? apiProject.unit_pricing : (Array.isArray(apiProject.unitPricing) ? apiProject.unitPricing : []),
      facilities: Array.isArray(apiProject.facilities) ? apiProject.facilities : [],
      galleryImages: Array.isArray(apiProject.gallery_images) ? apiProject.gallery_images : (Array.isArray(apiProject.imageGallery) ? apiProject.imageGallery : []),
      floorPlans: Array.isArray(apiProject.floor_plans) ? apiProject.floor_plans : (Array.isArray(apiProject.floorPlans) ? apiProject.floorPlans : []),
    }

    return NextResponse.json({ data: project })
  } catch (err) {
    console.error('Error in project by id API:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
