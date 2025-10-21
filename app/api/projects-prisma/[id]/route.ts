import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['error'],
})

type Developer = {
  name: string | null
  description: string | null
  logo_url: string | null
  website: string | null
  contact_email: string | null
  contact_phone: string | null
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = 'then' in (ctx.params as any)
      ? await (ctx.params as Promise<{ id: string }>)
      : (ctx.params as { id: string })
    const idOrSlug = resolvedParams.id

    if (!idOrSlug) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    // Fetch base project by numeric id or by slug
    const project = await (async () => {
      const numericId = Number(idOrSlug)
      console.log('Looking for project with idOrSlug:', idOrSlug, 'numericId:', numericId)
      if (Number.isFinite(numericId)) {
        const result = await prisma.project.findFirst({ where: { id: numericId as number } })
        console.log('Found project by ID:', result)
        return result
      }
      const result = await prisma.project.findFirst({ where: { slug: idOrSlug } })
      console.log('Found project by slug:', result)
      return result
    })()

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Developer
    let developer: Developer = {
      name: project.developer || null,
      description: null,
      logo_url: null,
      website: null,
      contact_email: null,
      contact_phone: null,
    }
    if (project.developer) {
      const dev = await prisma.developers.findFirst({ where: { name: project.developer } })
      if (dev) {
        developer = {
          name: dev.name || null,
          description: dev.description || null,
          logo_url: dev.logo_url || null,
          website: dev.website || null,
          contact_email: dev.contact_email || null,
          contact_phone: dev.contact_phone || null,
        }
      }
    }

    // Facilities via join table
    const projectFacilities = await prisma.project_facilities.findMany({
      where: { project_id: project.id },
      include: { facilities: true },
    })
    const facilities = projectFacilities
      .map((pf) => pf.facilities)
      .filter((f): f is NonNullable<typeof f> => Boolean(f))
      .map((f) => ({
        id: f.id,
        name: f.name,
        description: f.description,
        icon: f.icon,
      }))

    // Floor plans (by project_name due to schema)
    const floorPlans = await prisma.floor_plans.findMany({
      where: { project_name: project.project_name || project.name || undefined },
      orderBy: [{ id: 'asc' }],
    })
    const mappedFloorPlans = floorPlans.map((fp) => ({
      id: fp.id,
      project_name: fp.project_name,
      floor_plan_id: fp.floor_plan_id,
      floor_plan_type: fp.floor_plan_type,
      floor_plan_name: fp.floor_plan_name,
      bedrooms: fp.bedrooms,
      bathrooms: fp.bathrooms,
      size_sqft: fp.size_sqft ? Number(fp.size_sqft) : null,
      price: null,
      img: fp.img,
      floor_plan_image: fp.floor_plan_image,
      unit_type: fp.unit_type,
      description: fp.description,
      image_url: fp.floor_plan_image || fp.img || null,
    }))

    // Image gallery (by project_name)
    const imageGallery = await prisma.image_galleries.findMany({
      where: { project_name: project.project_name || project.name || undefined },
      orderBy: [{ display_order: 'asc' }],
    })
    const mappedImageGallery = imageGallery.map((img) => ({
      id: img.display_order ?? img.id,
      project_name: img.project_name,
      image_url: img.image_url,
      display_order: img.display_order ?? undefined,
      is_active: img.is_active ?? true,
      created_at: img.created_at,
    }))

    // Site plans (by project_id or project_name if id not linked)
    const sitePlans = await prisma.site_plans.findMany({
      where: {
        OR: [
          { project_id: project.id },
          { project_name: project.project_name || project.name || undefined },
        ],
      },
      orderBy: [{ id: 'asc' }],
    })
    const mappedSitePlans = sitePlans.map((sp) => ({
      id: sp.id,
      project_id: sp.project_id ?? project.id,
      project_name: sp.project_name ?? project.project_name ?? project.name ?? '',
      site_plan_id: sp.site_plan_id,
      site_plan_name: sp.site_plan_name,
      image_url: sp.image_url,
      description: sp.description,
      is_primary: Boolean(sp.is_primary),
      layout_info: sp.layout_info,
    }))

    // Unit pricing from synced database
    let rawUnitPricing: any[] = []
    try {
      rawUnitPricing = await prisma.unit_pricing.findMany({
        where: {
          project_name: project.project_name || project.name || undefined,
        },
        orderBy: [{ id: 'asc' }],
      })
    } catch (error) {
      console.log('Unit pricing table not available:', error)
      rawUnitPricing = []
    }
    
    // Unit availability data
    let unitAvailabilityData: any[] = []
    try {
      unitAvailabilityData = await prisma.unit_availability.findMany({
        where: { project_id: project.id },
        orderBy: [{ id: 'asc' }],
      })
    } catch (error) {
      console.log('Unit availability table not available:', error)
      unitAvailabilityData = []
    }
    // Create a mapping of unit_type to floor plan image
    const floorPlanImageMap = new Map<string, string>()
    floorPlans.forEach((fp) => {
      if (fp.unit_type && fp.img) {
        floorPlanImageMap.set(fp.unit_type, fp.img)
      }
    })

    const unitPricing = rawUnitPricing.map((u) => {
      const priceFrom = u.price_from ? parseFloat(u.price_from.toString()) : null
      const priceTo = u.price_to ? parseFloat(u.price_to.toString()) : null
      const priceRange = priceFrom && priceTo ? `${priceFrom} - ${priceTo}` : null
      
      // Find matching floor plan image
      const floorPlanImage = floorPlanImageMap.get(u.unit_type) || null
      
      return {
        id: u.id,
        project_name: u.project_name ?? project.project_name ?? project.name ?? '',
        unit_type: u.unit_type,
        price_from: priceFrom,
        price_to: priceTo,
        available_unit: u.available_unit,
        total_unit: u.total_unit,
        bedrooms: u.bedrooms,
        bathrooms: u.bathrooms,
        size_sqft: u.size_sqft ? parseFloat(u.size_sqft.toString()) : null,
        price_per_sqft: u.price_per_sqft ? parseFloat(u.price_per_sqft.toString()) : null,
        currency: u.currency,
        payment_terms: u.payment_terms,
        discount_info: u.discount_info,
        price: priceFrom,
        price_range: priceRange,
        floor_plan_image: floorPlanImage,
        floor_plan_id: null,
        floor_plan_name: null,
        is_available: u.available_unit ? u.available_unit !== '0' : true,
        created_at: u.created_at,
        updated_at: u.updated_at,
      }
    })
    const unitAvailability = unitAvailabilityData.map((ua) => ({
      id: ua.id,
      project_id: ua.project_id ?? project.id,
      unit_type: ua.unit_type,
      subtype: ua.subtype,
      available_count: ua.available_count,
      total_count: ua.total_count,
      status_percentage: ua.status_percentage,
    }))
    const unitTypes: any[] = []

    // Compose response similar to current individual project API
    // Calculate price range from unit pricing
    const priceRange = unitPricing.length > 0 ? {
      min: Math.min(...unitPricing.filter(u => u.price_from).map(u => parseFloat(u.price_from))),
      max: Math.max(...unitPricing.filter(u => u.price_to).map(u => parseFloat(u.price_to)))
    } : null

    const responseData = {
      id: project.id,
      document_id: project.document_id ?? null,
      name: project.name || project.project_name || project.title || String(project.id),
      project_name: project.project_name || project.name || null,
      slug: project.slug || String(project.id),
      title: project.title || project.name || null,
      location: project.location || null,
      address: project.address || null,
      type: project.type || project.property_type || 'Residential',
      price: priceRange ? `$${priceRange.min.toLocaleString()} - $${priceRange.max.toLocaleString()}` : project.price || '',
      price_from: priceRange ? `$${priceRange.min.toLocaleString()}` : project.price_from || '',
      price_per_sqft: project.price_per_sqft || '',
      bedrooms: project.bedrooms || '',
      bathrooms: project.bathrooms || '',
      size: project.size || '',
      units: project.units || '0',
      developer,
      completion: project.completion || '',
      description: project.description || null,
      district: project.district || null,
      tenure: project.tenure || null,
      property_type: project.property_type || 'Residential',
      status: project.status || 'Active',
      total_units: project.total_units || null,
      total_floors: project.total_floors || null,
      site_area: project.site_area || null,
      created_at: project.created_at,
      updated_at: project.updated_at,
      published_at: project.published_at,
      created_by_id: project.created_by_id,
      updated_by_id: project.updated_by_id,
      locale: project.locale,
      image_url_banner: project.image_url_banner || null,
      latitude: project.latitude || null,
      longitude: project.longitude || null,
      features: Array.isArray(project.features as any) ? (project.features as any) : [],
      overview_quote: null,
      facilities,
      images: [],
      nearbyAmenities: [],
      similarProjects: [],
      floorPlans: mappedFloorPlans,
      unitAvailability,
      unitTypes,
      brochures: [],
      imageGallery: mappedImageGallery,
      sitePlans: mappedSitePlans,
      unitPricing,
    }

    return NextResponse.json({ data: responseData })
  } catch (err: any) {
    console.error('Error in projects-prisma by id API:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}


