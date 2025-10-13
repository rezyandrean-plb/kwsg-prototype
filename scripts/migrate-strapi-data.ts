import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type StrapiProject = {
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
  created_at: string
  updated_at: string
}

async function migrateStrapiData() {
  try {
    console.log('Starting migration from Strapi to PostgreSQL...')
    
    // Fetch all projects from Strapi
    const strapiUrl = 'https://striking-hug-052e89dfad.strapiapp.com/api/projects?pagination[pageSize]=1000&populate=developer'
    const response = await fetch(strapiUrl)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from Strapi: ${response.status}`)
    }
    
    const strapiData = await response.json()
    const strapiProjects: StrapiProject[] = strapiData.data || []
    
    console.log(`Found ${strapiProjects.length} projects in Strapi`)
    
    // Clear existing data
    await prisma.project.deleteMany({})
    console.log('Cleared existing projects')
    
    // Transform and insert data
    for (const strapiProject of strapiProjects) {
      try {
        // Extract developer name
        const developerName = typeof strapiProject.developer === 'string'
          ? strapiProject.developer
          : (strapiProject.developer && typeof strapiProject.developer === 'object' && 'name' in strapiProject.developer)
            ? (strapiProject.developer as any).name
            : ''

        // Transform coordinates
        const latitude = typeof strapiProject.latitude === 'number' 
          ? strapiProject.latitude 
          : strapiProject.latitude ? Number(strapiProject.latitude) : null
        const longitude = typeof strapiProject.longitude === 'number' 
          ? strapiProject.longitude 
          : strapiProject.longitude ? Number(strapiProject.longitude) : null

        await prisma.project.create({
          data: {
            id: strapiProject.id,
            name: strapiProject.name,
            project_name: strapiProject.project_name,
            slug: strapiProject.slug,
            title: strapiProject.title,
            location: strapiProject.location,
            address: strapiProject.address,
            type: strapiProject.type,
            price: strapiProject.price,
            price_from: strapiProject.price_from,
            display_price: strapiProject.display_price,
            price_per_sqft: strapiProject.price_per_sqft,
            bedrooms: strapiProject.bedrooms,
            bathrooms: strapiProject.bathrooms,
            size: strapiProject.size,
            units: strapiProject.units,
            developer: developerName,
            completion: strapiProject.completion,
            description: strapiProject.description,
            features: strapiProject.features || [],
            district: strapiProject.district,
            tenure: strapiProject.tenure,
            property_type: strapiProject.property_type,
            status: strapiProject.status,
            total_units: strapiProject.total_units,
            total_floors: strapiProject.total_floors,
            site_area: strapiProject.site_area,
            latitude,
            longitude,
            image_url_banner: strapiProject.image_url_banner,
            image_banner_url: strapiProject.image_banner_url,
            gallery_images: strapiProject.gallery_images || [],
            unit_pricing: strapiProject.unit_pricing,
            facilities: strapiProject.facilities,
            floor_plans: strapiProject.floor_plans,
            created_at: new Date(strapiProject.created_at),
            updated_at: new Date(strapiProject.updated_at),
          }
        })
        
        console.log(`Migrated project: ${strapiProject.name || strapiProject.project_name || strapiProject.slug}`)
      } catch (error) {
        console.error(`Error migrating project ${strapiProject.slug}:`, error)
      }
    }
    
    console.log('Migration completed successfully!')
    
    // Verify migration
    const count = await prisma.project.count()
    console.log(`Total projects in database: ${count}`)
    
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateStrapiData()
}

export { migrateStrapiData }





