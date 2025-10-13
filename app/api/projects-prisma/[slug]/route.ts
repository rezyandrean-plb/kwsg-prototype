import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type ProjectDetails = {
  id: number
  document_id: string | null
  name: string
  project_name: string
  slug: string
  title: string
  location: string
  address: string
  type: string
  price: string
  price_from: string
  price_per_sqft: string
  bedrooms: string
  bathrooms: string
  size: string
  units: string
  developer: {
    name: string | null
    description: string | null
    logo_url: string | null
    website: string | null
    contact_email: string | null
    contact_phone: string | null
  }
  completion: string
  description: string
  district: string
  tenure: string
  property_type: string
  status: string
  total_units: string
  total_floors: string
  site_area: string
  created_at: Date | null
  updated_at: Date | null
  published_at: Date | null
  created_by_id: number | null
  updated_by_id: number | null
  locale: string | null
  image_url_banner: string | null
  latitude: string | null
  longitude: string | null
  features: any[]
  overview_quote: string | null
  facilities: Array<{
    id: number
    name: string | null
    description: string | null
    icon: string | null
  }>
  images: any[]
  nearbyAmenities: any[]
  similarProjects: any[]
  floorPlans: Array<{
    id: number
    project_name: string | null
    floor_plan_id: string | null
    floor_plan_type: string | null
    floor_plan_name: string | null
    bedrooms: string | null
    bathrooms: string | null
    size_sqft: number | null
    price: string | null
    img: string | null
    floor_plan_image: string | null
    unit_type: string | null
    description: string | null
    image_url: string | null
  }>
  unitAvailability: any[]
  unitTypes: any[]
  brochures: any[]
  imageGallery: Array<{
    id: number
    project_name: string | null
    image_url: string | null
    display_order: number | null
    is_active: boolean | null
    created_at: Date | null
  }>
  sitePlans: Array<{
    id: number
    project_id: number | null
    project_name: string | null
    site_plan_id: string | null
    site_plan_name: string | null
    image_url: string | null
    description: string | null
    is_primary: boolean | null
    layout_info: string | null
  }>
  unitPricing: any[]
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const resolvedParams = 'then' in (ctx.params as any)
      ? await (ctx.params as Promise<{ slug: string }>)
      : (ctx.params as { slug: string })
    const slug = resolvedParams.slug

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    // Fetch project by slug
    const dbProject = await prisma.project.findUnique({
      where: { slug }
    })

    if (!dbProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Fetch developer information
    const developer = await prisma.developers.findFirst({
      where: { name: dbProject.developer }
    })

    // Fetch facilities
    const projectFacilities = await prisma.project_facilities.findMany({
      where: { project_id: dbProject.id },
      include: { facilities: true }
    })

    // Fetch floor plans
    const floorPlans = await prisma.floor_plans.findMany({
      where: { project_name: dbProject.name }
    })

    // Fetch image gallery
    const imageGallery = await prisma.image_galleries.findMany({
      where: { 
        project_name: dbProject.name,
        is_active: true 
      },
      orderBy: { display_order: 'asc' }
    })

    // Fetch site plans
    const sitePlans = await prisma.site_plans.findMany({
      where: { project_id: dbProject.id }
    })

    // Format price
    let price = 'Price on request'
    let priceFrom = '0'
    
    if (dbProject.price && dbProject.price !== '0' && dbProject.price !== '') {
      price = dbProject.price
      priceFrom = dbProject.price_from || dbProject.price
    }

    // Format developer object
    const developerData = developer ? {
      name: developer.name,
      description: developer.description,
      logo_url: developer.logo_url,
      website: developer.website,
      contact_email: developer.contact_email,
      contact_phone: developer.contact_phone
    } : {
      name: dbProject.developer,
      description: null,
      logo_url: null,
      website: null,
      contact_email: null,
      contact_phone: null
    }

    // Format facilities
    const facilities = projectFacilities.map(pf => ({
      id: pf.facilities?.id || 0,
      name: pf.facilities?.name || null,
      description: pf.facilities?.description || null,
      icon: pf.facilities?.icon || null
    }))

    // Format floor plans
    const formattedFloorPlans = floorPlans.map(fp => ({
      id: fp.id,
      project_name: fp.project_name,
      floor_plan_id: fp.floor_plan_id,
      floor_plan_type: fp.floor_plan_type,
      floor_plan_name: fp.floor_plan_name,
      bedrooms: fp.bedrooms,
      bathrooms: fp.bathrooms,
      size_sqft: fp.size_sqft ? Number(fp.size_sqft) : null,
      price: fp.price,
      img: fp.img,
      floor_plan_image: fp.floor_plan_image,
      unit_type: fp.unit_type,
      description: fp.description,
      image_url: fp.img || fp.floor_plan_image
    }))

    // Format image gallery
    const formattedImageGallery = imageGallery.map(img => ({
      id: img.id,
      project_name: img.project_name,
      image_url: img.image_url,
      display_order: img.display_order,
      is_active: img.is_active,
      created_at: img.created_at
    }))

    // Format site plans
    const formattedSitePlans = sitePlans.map(sp => ({
      id: sp.id,
      project_id: sp.project_id,
      project_name: sp.project_name,
      site_plan_id: sp.site_plan_id,
      site_plan_name: sp.site_plan_name,
      image_url: sp.image_url,
      description: sp.description,
      is_primary: sp.is_primary,
      layout_info: sp.layout_info
    }))

    // Revert: keep unitPricing empty for now
    const unitPricing: any[] = []

    const projectDetails: ProjectDetails = {
      id: dbProject.id,
      document_id: dbProject.document_id,
      name: dbProject.name || dbProject.project_name || 'Unnamed Project',
      project_name: dbProject.project_name || dbProject.name || 'Unnamed Project',
      slug: dbProject.slug || '',
      title: dbProject.title || dbProject.name || 'Unnamed Project',
      location: dbProject.location || 'Location not specified',
      address: dbProject.address || '',
      type: dbProject.type || dbProject.property_type || '',
      price,
      price_from: priceFrom,
      price_per_sqft: dbProject.price_per_sqft || '',
      bedrooms: dbProject.bedrooms || '',
      bathrooms: dbProject.bathrooms || '',
      size: dbProject.size || '',
      units: dbProject.units || '0',
      developer: developerData,
      completion: dbProject.completion || '',
      description: dbProject.description || '',
      district: dbProject.district || '',
      tenure: dbProject.tenure || '',
      property_type: dbProject.property_type || dbProject.type || '',
      status: dbProject.status || 'Active',
      total_units: dbProject.total_units || dbProject.units || '0',
      total_floors: dbProject.total_floors || '',
      site_area: dbProject.site_area || '',
      created_at: dbProject.created_at,
      updated_at: dbProject.updated_at,
      published_at: dbProject.published_at,
      created_by_id: dbProject.created_by_id,
      updated_by_id: dbProject.updated_by_id,
      locale: dbProject.locale,
      image_url_banner: dbProject.image_url_banner,
      latitude: dbProject.latitude,
      longitude: dbProject.longitude,
      features: Array.isArray(dbProject.features) ? dbProject.features : [],
      overview_quote: null,
      facilities,
      images: [],
      nearbyAmenities: [],
      similarProjects: [],
      floorPlans: formattedFloorPlans,
      unitAvailability: [],
      unitTypes: [],
      brochures: [],
      imageGallery: formattedImageGallery,
      sitePlans: formattedSitePlans,
      unitPricing
    }

    return NextResponse.json({ data: projectDetails })

  } catch (error) {
    console.error('Error in project details API:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch project details',
      errorDetails: error.message 
    }, { status: 500 })
  }
}




