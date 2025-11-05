import { S3Service } from './s3-service';
import { PrismaClient } from '@prisma/client';
import csv from 'csv-parser';
import { Readable } from 'stream';

const prisma = new PrismaClient({
  log: ['error'],
});

export interface KWProjectCSVData {
  id?: string;
  name?: string;
  project_name?: string;
  slug?: string;
  title?: string;
  location?: string;
  address?: string;
  type?: string;
  price?: string;
  price_from?: string;
  price_per_sqft?: string;
  bedrooms?: string;
  bathrooms?: string;
  size?: string;
  units?: string;
  developer?: string;
  completion?: string;
  description?: string;
  district?: string;
  tenure?: string;
  property_type?: string;
  status?: string;
  total_units?: string;
  total_floors?: string;
  site_area?: string;
  image_url_banner?: string;
  latitude?: string;
  longitude?: string;
  features?: string;
  overview_quote?: string;
  facilities?: string;
  images?: string;
  nearbyAmenities?: string;
  similarProjects?: string;
  floorPlans?: string;
  unitAvailability?: string;
  unitTypes?: string;
  brochures?: string;
  imageGallery?: string;
  sitePlans?: string;
  unitPricing?: string;
}

export interface KWUnitCSVData {
  id?: string;
  project_id?: string;
  project_name?: string;
  unit_type?: string;
  bedrooms?: string;
  bathrooms?: string;
  size_sqft?: string;
  price_from?: string;
  price_to?: string;
  price_per_sqft?: string;
  currency?: string;
  payment_terms?: string;
  discount_info?: string;
  is_available?: string;
  available_unit?: string;
  total_unit?: string;
}

export interface KWFloorPlanCSVData {
  id?: string;
  project_id?: string;
  project_name?: string;
  floor_plan_id?: string;
  floor_plan_type?: string;
  floor_plan_name?: string;
  bedrooms?: string;
  bathrooms?: string;
  size_sqft?: string;
  price?: string;
  img?: string;
  floor_plan_image?: string;
  unit_type?: string;
  description?: string;
}

export interface KWSitePlanCSVData {
  id?: string;
  project_id?: string;
  project_name?: string;
  site_plan_id?: string;
  site_plan_name?: string;
  image_url?: string;
  description?: string;
  is_primary?: string;
  layout_info?: string;
}

export class KWS3SyncService {
  private s3Service: S3Service;
  private bucketName: string = 'kwsingapore';
  private basePath: string = 'new_launch_data';

  constructor() {
    this.s3Service = new S3Service(this.bucketName);
  }

  async syncSampleData(): Promise<{
    success: boolean;
    results: {
      projects: number;
      units: number;
      floorPlans: number;
      sitePlans: number;
    };
    errors: string[];
  }> {
    const errors: string[] = [];
    const results = {
      projects: 0,
      units: 0,
      floorPlans: 0,
      sitePlans: 0,
    };

    try {
      console.log('Starting KW S3 sample data sync...');

      // Sync first 10 projects only
      try {
        results.projects = await this.syncProjectsSample();
        console.log(`Synced ${results.projects} sample projects`);
      } catch (error) {
        errors.push(`Projects sync failed: ${error}`);
        console.error('Projects sync error:', error);
      }

      // Sync units for those projects
      try {
        results.units = await this.syncUnitsSample();
        console.log(`Synced ${results.units} sample units`);
      } catch (error) {
        errors.push(`Units sync failed: ${error}`);
        console.error('Units sync error:', error);
      }

      // Sync floor plans for those projects
      try {
        results.floorPlans = await this.syncFloorPlansSample();
        console.log(`Synced ${results.floorPlans} sample floor plans`);
      } catch (error) {
        errors.push(`Floor plans sync failed: ${error}`);
        console.error('Floor plans sync error:', error);
      }

      // Sync site plans for those projects
      try {
        results.sitePlans = await this.syncSitePlansSample();
        console.log(`Synced ${results.sitePlans} sample site plans`);
      } catch (error) {
        errors.push(`Site plans sync failed: ${error}`);
        console.error('Site plans sync error:', error);
      }

      console.log('KW S3 sample sync completed');
      return {
        success: errors.length === 0,
        results,
        errors,
      };
    } catch (error) {
      console.error('KW S3 sample sync failed:', error);
      return {
        success: false,
        results,
        errors: [...errors, `General sync error: ${error}`],
      };
    }
  }

  async syncAllData(): Promise<{
    success: boolean;
    results: {
      projects: number;
      units: number;
      floorPlans: number;
      sitePlans: number;
    };
    details: {
      projects: { created: number; updated: number };
      units: { created: number; replaced: boolean };
      floorPlans: { created: number; replaced: boolean };
      sitePlans: { created: number; replaced: boolean };
    };
    errors: string[];
  }> {
    const errors: string[] = [];
    const results = {
      projects: 0,
      units: 0,
      floorPlans: 0,
      sitePlans: 0,
    };
    const details = {
      projects: { created: 0, updated: 0 },
      units: { created: 0, replaced: false },
      floorPlans: { created: 0, replaced: false },
      sitePlans: { created: 0, replaced: false },
    };

    try {
      console.log('Starting KW S3 data sync...');

      // Sync projects
      try {
        const p = await this.syncProjectsWithDetails();
        results.projects = p.total;
        details.projects = { created: p.created, updated: p.updated };
        console.log(`Synced ${results.projects} projects (created: ${p.created}, updated: ${p.updated})`);
      } catch (error) {
        errors.push(`Projects sync failed: ${error}`);
        console.error('Projects sync error:', error);
      }

      // Sync units (unit pricing)
      try {
        const unitsCreated = await this.syncUnits();
        results.units = unitsCreated;
        details.units = { created: unitsCreated, replaced: true };
        console.log(`Synced ${results.units} units (replaced existing records)`);
      } catch (error) {
        errors.push(`Units sync failed: ${error}`);
        console.error('Units sync error:', error);
      }

      // Sync floor plans
      try {
        const fpCreated = await this.syncFloorPlans();
        results.floorPlans = fpCreated;
        details.floorPlans = { created: fpCreated, replaced: true };
        console.log(`Synced ${results.floorPlans} floor plans (replaced existing records)`);
      } catch (error) {
        errors.push(`Floor plans sync failed: ${error}`);
        console.error('Floor plans sync error:', error);
      }

      // Sync site plans
      try {
        const spCreated = await this.syncSitePlans();
        results.sitePlans = spCreated;
        details.sitePlans = { created: spCreated, replaced: true };
        console.log(`Synced ${results.sitePlans} site plans (replaced existing records)`);
      } catch (error) {
        errors.push(`Site plans sync failed: ${error}`);
        console.error('Site plans sync error:', error);
      }

      console.log('KW S3 sync completed');
      return {
        success: errors.length === 0,
        results,
        details,
        errors,
      };
    } catch (error) {
      console.error('KW S3 sync failed:', error);
      return {
        success: false,
        results,
        details,
        errors: [...errors, `General sync error: ${error}`],
      };
    }
  }

  private async syncProjectsSample(): Promise<number> {
    const csvKey = `${this.basePath}/projects.csv`;
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<KWProjectCSVData>(csvContent);
    
    // Only process first 10 projects
    const sampleData = data.slice(0, 10);

    let syncedCount = 0;
    for (const item of sampleData) {
      try {
        // Map S3 columns to DB fields
        const projectName = (item as any).projectName as string | undefined
        const projectIdStr = (item as any).projectId as string | undefined
        const launchDate = (item as any).launchDate as string | undefined
        const unitsNum = (item as any).unitsNum as string | undefined
        const tenure = (item as any).tenure as string | undefined
        const projectArea = (item as any).projectArea as string | undefined
        const streetAddress = (item as any).streetAddress as string | undefined
        const district = (item as any).district as string | undefined
        const completionDate = (item as any).completionDate as string | undefined
        const developer = (item as any).developer as string | undefined
        const mainImage = (item as any).mainImage as string | undefined
        const latitude = (item as any).latitude as string | undefined
        const longitude = (item as any).longitude as string | undefined
        const facilitiesRaw = (item as any).facilities as string | undefined

        const slug = projectName ? this.slugify(projectName) : undefined
        const facilitiesArr = facilitiesRaw
          ? facilitiesRaw
              .split('\n')
              .map((s) => s.replace(/\r/g, '').trim())
              .filter(Boolean)
          : []

        // Find existing project by document_id (S3 projectId) or slug/name
        const existing = await prisma.project.findFirst({
          where: {
            OR: [
              projectIdStr ? { document_id: projectIdStr } : undefined,
              slug ? { slug } : undefined,
              projectName ? { project_name: projectName } : undefined,
            ].filter(Boolean) as any,
          },
        })

        if (existing) {
          await prisma.project.update({
            where: { id: existing.id },
            data: {
              document_id: projectIdStr ?? existing.document_id,
              name: projectName ?? existing.name,
              project_name: projectName ?? existing.project_name,
              slug: slug ?? existing.slug,
              title: projectName ?? existing.title,
              location: projectArea ?? existing.location,
              address: streetAddress ?? existing.address,
              type: existing.type,
              price: existing.price,
              price_from: existing.price_from,
              price_per_sqft: existing.price_per_sqft,
              bedrooms: existing.bedrooms,
              bathrooms: existing.bathrooms,
              size: existing.size,
              units: unitsNum ?? existing.units,
              developer: developer ?? existing.developer,
              completion: completionDate ?? launchDate ?? existing.completion,
              description: existing.description,
              district: district ?? existing.district,
              tenure: tenure ?? existing.tenure,
              property_type: existing.property_type,
              status: existing.status,
              total_units: unitsNum ?? existing.total_units,
              total_floors: existing.total_floors,
              site_area: existing.site_area,
              image_url_banner: mainImage ?? existing.image_url_banner,
              latitude: latitude ?? existing.latitude,
              longitude: longitude ?? existing.longitude,
              features: Array.isArray(existing.features) ? existing.features : [],
              facilities: facilitiesArr.length ? (facilitiesArr as unknown as any) : existing.facilities,
              images: existing.images,
              updated_at: new Date(),
            },
          })
        } else {
          await prisma.project.create({
            data: {
              document_id: projectIdStr ?? null,
              name: projectName ?? null,
              project_name: projectName ?? null,
              slug: slug ?? null,
              title: projectName ?? null,
              location: projectArea ?? null,
              address: streetAddress ?? null,
              type: null,
              price: null,
              price_from: null,
              price_per_sqft: null,
              bedrooms: null,
              bathrooms: null,
              size: null,
              units: unitsNum ?? null,
              developer: developer ?? null,
              completion: completionDate ?? launchDate ?? null,
              description: null,
              district: district ?? null,
              tenure: tenure ?? null,
              property_type: null,
              status: null,
              total_units: unitsNum ?? null,
              total_floors: null,
              site_area: null,
              image_url_banner: mainImage ?? null,
              latitude: latitude ?? null,
              longitude: longitude ?? null,
              features: [],
              facilities: facilitiesArr as unknown as any,
              images: [],
              created_at: new Date(),
              updated_at: new Date(),
            },
          })
        }
        syncedCount++;
      } catch (error) {
        console.error(`Error syncing project ${item.id}:`, error);
      }
    }
    return syncedCount;
  }

  private async syncProjectsWithDetails(): Promise<{ total: number; created: number; updated: number }> {
    const csvKey = `${this.basePath}/projects.csv`;
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<KWProjectCSVData>(csvContent);

    let syncedCount = 0;
    let createdCount = 0;
    let updatedCount = 0;
    for (const item of data) {
      try {
        // Map S3 columns to DB fields
        const projectName = (item as any).projectName as string | undefined
        const projectIdStr = (item as any).projectId as string | undefined
        const launchDate = (item as any).launchDate as string | undefined
        const unitsNum = (item as any).unitsNum as string | undefined
        const tenure = (item as any).tenure as string | undefined
        const projectArea = (item as any).projectArea as string | undefined
        const streetAddress = (item as any).streetAddress as string | undefined
        const district = (item as any).district as string | undefined
        const completionDate = (item as any).completionDate as string | undefined
        const developer = (item as any).developer as string | undefined
        const mainImage = (item as any).mainImage as string | undefined
        const latitude = (item as any).latitude as string | undefined
        const longitude = (item as any).longitude as string | undefined
        const facilitiesRaw = (item as any).facilities as string | undefined

        const slug = projectName ? this.slugify(projectName) : undefined
        const facilitiesArr = facilitiesRaw
          ? facilitiesRaw
              .split('\n')
              .map((s) => s.replace(/\r/g, '').trim())
              .filter(Boolean)
          : []

        // Find existing project by document_id (S3 projectId) or slug/name
        const existing = await prisma.project.findFirst({
          where: {
            OR: [
              projectIdStr ? { document_id: projectIdStr } : undefined,
              slug ? { slug } : undefined,
              projectName ? { project_name: projectName } : undefined,
            ].filter(Boolean) as any,
          },
        })

        if (existing) {
          await prisma.project.update({
            where: { id: existing.id },
            data: {
              document_id: projectIdStr ?? existing.document_id,
              name: projectName ?? existing.name,
              project_name: projectName ?? existing.project_name,
              slug: slug ?? existing.slug,
              title: projectName ?? existing.title,
              location: projectArea ?? existing.location,
              address: streetAddress ?? existing.address,
              type: existing.type,
              price: existing.price,
              price_from: existing.price_from,
              price_per_sqft: existing.price_per_sqft,
              bedrooms: existing.bedrooms,
              bathrooms: existing.bathrooms,
              size: existing.size,
              units: unitsNum ?? existing.units,
              developer: developer ?? existing.developer,
              completion: completionDate ?? launchDate ?? existing.completion,
              description: existing.description,
              district: district ?? existing.district,
              tenure: tenure ?? existing.tenure,
              property_type: existing.property_type,
              status: existing.status,
              total_units: unitsNum ?? existing.total_units,
              total_floors: existing.total_floors,
              site_area: existing.site_area,
              image_url_banner: mainImage ?? existing.image_url_banner,
              latitude: latitude ?? existing.latitude,
              longitude: longitude ?? existing.longitude,
              features: Array.isArray(existing.features) ? existing.features : [],
              facilities: facilitiesArr.length ? (facilitiesArr as unknown as any) : existing.facilities,
              images: existing.images,
              updated_at: new Date(),
            },
          })
          updatedCount++;
        } else {
          await prisma.project.create({
            data: {
              document_id: projectIdStr ?? null,
              name: projectName ?? null,
              project_name: projectName ?? null,
              slug: slug ?? null,
              title: projectName ?? null,
              location: projectArea ?? null,
              address: streetAddress ?? null,
              type: null,
              price: null,
              price_from: null,
              price_per_sqft: null,
              bedrooms: null,
              bathrooms: null,
              size: null,
              units: unitsNum ?? null,
              developer: developer ?? null,
              completion: completionDate ?? launchDate ?? null,
              description: null,
              district: district ?? null,
              tenure: tenure ?? null,
              property_type: null,
              status: null,
              total_units: unitsNum ?? null,
              total_floors: null,
              site_area: null,
              image_url_banner: mainImage ?? null,
              latitude: latitude ?? null,
              longitude: longitude ?? null,
              features: [],
              facilities: facilitiesArr as unknown as any,
              images: [],
              created_at: new Date(),
              updated_at: new Date(),
            },
          })
          createdCount++;
        }
        syncedCount++;
      } catch (error) {
        console.error(`Error syncing project ${item.id}:`, error);
      }
    }
    return { total: syncedCount, created: createdCount, updated: updatedCount };
  }

  private async syncUnitsSample(): Promise<number> {
    const csvKey = `${this.basePath}/units.csv`;
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<KWUnitCSVData>(csvContent);

    // Get first 10 project IDs from projects table
    const sampleProjects = await prisma.project.findMany({
      take: 10,
      select: { id: true, document_id: true }
    })
    const sampleProjectIds = sampleProjects.map(p => p.document_id).filter(Boolean)
    
    // Filter units for sample projects only
    const sampleData = data.filter(item => 
      sampleProjectIds.includes((item as any).projectId)
    )

    if (sampleData.length === 0) return 0

    // Get all unique project IDs and batch resolve them
    const projectIds = [...new Set(sampleData.map(item => (item as any).projectId).filter(Boolean))]
    const projectMap = new Map<string, number>()
    
    if (projectIds.length > 0) {
      const projects = await prisma.project.findMany({
        where: { document_id: { in: projectIds } },
        select: { id: true, document_id: true }
      })
      projects.forEach(p => {
        if (p.document_id) projectMap.set(p.document_id, p.id)
      })
    }

    // Clear existing unit pricing data for sample projects
    await prisma.unit_pricing.deleteMany({
      where: { project_id: { in: sampleProjects.map(p => p.id) } }
    })

    // Batch create unit pricing records
    const unitPricingData = sampleData.map(item => {
      const projectIdStr = (item as any).projectId as string | undefined
      const projectName = (item as any).projectName as string | undefined
      const type = (item as any).type as string | undefined
      const minArea = (item as any).minArea as string | undefined
      const maxArea = (item as any).maxArea as string | undefined
      const minPrice = (item as any).minPrice as string | undefined
      const maxPrice = (item as any).maxPrice as string | undefined
      const unitNum = (item as any).unitNum as string | undefined
      const availableNum = (item as any).availableNum as string | undefined

      return {
        project_name: projectName ?? null,
        unit_type: type ?? null,
        bedrooms: null,
        bathrooms: null,
        size_sqft: maxArea ? parseFloat(maxArea) : minArea ? parseFloat(minArea) : null,
        price_from: minPrice ? parseFloat(minPrice) : null,
        price_to: maxPrice ? parseFloat(maxPrice) : null,
        price_per_sqft: null,
        currency: 'SGD',
        payment_terms: null,
        discount_info: null,
        available_unit: availableNum ?? null,
        total_unit: unitNum ?? null,
      }
    })

    // Batch insert in chunks of 50
    const chunkSize = 50
    for (let i = 0; i < unitPricingData.length; i += chunkSize) {
      const chunk = unitPricingData.slice(i, i + chunkSize)
      await prisma.unit_pricing.createMany({ data: chunk })
    }

    return unitPricingData.length
  }

  private async syncUnits(): Promise<number> {
    const csvKey = `${this.basePath}/units.csv`;
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<KWUnitCSVData>(csvContent);

    // Get all unique project IDs and batch resolve them
    const projectIds = [...new Set(data.map(item => (item as any).projectId).filter(Boolean))]
    const projectMap = new Map<string, number>()
    
    if (projectIds.length > 0) {
      const projects = await prisma.project.findMany({
        where: { document_id: { in: projectIds } },
        select: { id: true, document_id: true }
      })
      projects.forEach(p => {
        if (p.document_id) projectMap.set(p.document_id, p.id)
      })
    }

    // Clear existing unit pricing data
    await prisma.unit_pricing.deleteMany({})

    // Batch create unit pricing records
    const unitPricingData = data.map(item => {
      const projectIdStr = (item as any).projectId as string | undefined
      const projectName = (item as any).projectName as string | undefined
      const type = (item as any).type as string | undefined
      const minArea = (item as any).minArea as string | undefined
      const maxArea = (item as any).maxArea as string | undefined
      const minPrice = (item as any).minPrice as string | undefined
      const maxPrice = (item as any).maxPrice as string | undefined
      const unitNum = (item as any).unitNum as string | undefined
      const availableNum = (item as any).availableNum as string | undefined

      return {
        project_name: projectName ?? null,
        unit_type: type ?? null,
        bedrooms: null,
        bathrooms: null,
        size_sqft: maxArea ? parseFloat(maxArea) : minArea ? parseFloat(minArea) : null,
        price_from: minPrice ? parseFloat(minPrice) : null,
        price_to: maxPrice ? parseFloat(maxPrice) : null,
        price_per_sqft: null,
        currency: 'SGD',
        payment_terms: null,
        discount_info: null,
        available_unit: availableNum ?? null,
        total_unit: unitNum ?? null,
      }
    })

    // Batch insert in chunks of 100
    const chunkSize = 100
    for (let i = 0; i < unitPricingData.length; i += chunkSize) {
      const chunk = unitPricingData.slice(i, i + chunkSize)
      await prisma.unit_pricing.createMany({ data: chunk })
    }

    return unitPricingData.length
  }

  private async syncFloorPlansSample(): Promise<number> {
    const csvKey = `${this.basePath}/floor_plans.csv`;
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<KWFloorPlanCSVData>(csvContent);

    // Get first 10 project IDs from projects table
    const sampleProjects = await prisma.project.findMany({
      take: 10,
      select: { id: true, document_id: true }
    })
    const sampleProjectIds = sampleProjects.map(p => p.document_id).filter(Boolean)
    
    // Filter floor plans for sample projects only
    const sampleData = data.filter(item => 
      sampleProjectIds.includes((item as any).projectId)
    )

    if (sampleData.length === 0) return 0

    // Get all unique project IDs and batch resolve them
    const projectIds = [...new Set(sampleData.map(item => (item as any).projectId).filter(Boolean))]
    const projectMap = new Map<string, number>()
    
    if (projectIds.length > 0) {
      const projects = await prisma.project.findMany({
        where: { document_id: { in: projectIds } },
        select: { id: true, document_id: true }
      })
      projects.forEach(p => {
        if (p.document_id) projectMap.set(p.document_id, p.id)
      })
    }

    // Clear existing floor plans data for sample projects
    const sampleProjectNames = sampleProjects.map(p => p.project_name).filter(Boolean)
    if (sampleProjectNames.length > 0) {
      await prisma.floor_plans.deleteMany({
        where: { project_name: { in: sampleProjectNames } }
      })
    }

    // Batch create floor plan records
    const floorPlanData = sampleData.map(item => {
      const projectIdStr = (item as any).projectId as string | undefined
      const projectName = (item as any).projectName as string | undefined
      const img = (item as any).img as string | undefined
      const floorPlanId = (item as any).floorPlanId as string | undefined
      const floorPlanType = (item as any).floorPlanType as string | undefined
      const floorPlanName = (item as any).floorPlanName as string | undefined

      return {
        project_name: projectName ?? null,
        floor_plan_id: floorPlanId ?? null,
        floor_plan_type: floorPlanType ?? null,
        floor_plan_name: floorPlanName ?? null,
        bedrooms: null,
        bathrooms: null,
        size_sqft: null,
        price: null,
        img: img ?? null,
        floor_plan_image: null,
        unit_type: floorPlanType ?? null,
        description: null,
        created_at: new Date(),
        updated_at: new Date(),
      }
    })

    // Batch insert in chunks of 50
    const chunkSize = 50
    for (let i = 0; i < floorPlanData.length; i += chunkSize) {
      const chunk = floorPlanData.slice(i, i + chunkSize)
      await prisma.floor_plans.createMany({ data: chunk })
    }

    return floorPlanData.length
  }

  private async syncFloorPlans(): Promise<number> {
    const csvKey = `${this.basePath}/floor_plans.csv`;
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<KWFloorPlanCSVData>(csvContent);

    // Get all unique project IDs and batch resolve them
    const projectIds = [...new Set(data.map(item => (item as any).projectId).filter(Boolean))]
    const projectMap = new Map<string, number>()
    
    if (projectIds.length > 0) {
      const projects = await prisma.project.findMany({
        where: { document_id: { in: projectIds } },
        select: { id: true, document_id: true }
      })
      projects.forEach(p => {
        if (p.document_id) projectMap.set(p.document_id, p.id)
      })
    }

    // Clear existing floor plans data
    await prisma.floor_plans.deleteMany({})

    // Batch create floor plan records
    const floorPlanData = data.map(item => {
      const projectIdStr = (item as any).projectId as string | undefined
      const projectName = (item as any).projectName as string | undefined
      const img = (item as any).img as string | undefined
      const floorPlanId = (item as any).floorPlanId as string | undefined
      const floorPlanType = (item as any).floorPlanType as string | undefined
      const floorPlanName = (item as any).floorPlanName as string | undefined

      return {
        project_name: projectName ?? null,
        floor_plan_id: floorPlanId ?? null,
        floor_plan_type: floorPlanType ?? null,
        floor_plan_name: floorPlanName ?? null,
        bedrooms: null,
        bathrooms: null,
        size_sqft: null,
        price: null,
        img: img ?? null,
        floor_plan_image: null,
        unit_type: floorPlanType ?? null,
        description: null,
        created_at: new Date(),
        updated_at: new Date(),
      }
    })

    // Batch insert in chunks of 100
    const chunkSize = 100
    for (let i = 0; i < floorPlanData.length; i += chunkSize) {
      const chunk = floorPlanData.slice(i, i + chunkSize)
      await prisma.floor_plans.createMany({ data: chunk })
    }

    return floorPlanData.length
  }

  private async syncSitePlansSample(): Promise<number> {
    const csvKey = `${this.basePath}/site_plans.csv`;
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<KWSitePlanCSVData>(csvContent);

    // Get first 10 project IDs from projects table
    const sampleProjects = await prisma.project.findMany({
      take: 10,
      select: { id: true, document_id: true }
    })
    const sampleProjectIds = sampleProjects.map(p => p.document_id).filter(Boolean)
    
    // Filter site plans for sample projects only
    const sampleData = data.filter(item => 
      sampleProjectIds.includes((item as any).projectId)
    )

    if (sampleData.length === 0) return 0

    // Get all unique project IDs and batch resolve them
    const projectIds = [...new Set(sampleData.map(item => (item as any).projectId).filter(Boolean))]
    const projectMap = new Map<string, number>()
    
    if (projectIds.length > 0) {
      const projects = await prisma.project.findMany({
        where: { document_id: { in: projectIds } },
        select: { id: true, document_id: true }
      })
      projects.forEach(p => {
        if (p.document_id) projectMap.set(p.document_id, p.id)
      })
    }

    // Clear existing site plans data for sample projects
    const sampleProjectNames = sampleProjects.map(p => p.project_name).filter(Boolean)
    if (sampleProjectNames.length > 0) {
      await prisma.site_plans.deleteMany({
        where: { project_name: { in: sampleProjectNames } }
      })
    }

    // Batch create site plan records
    const sitePlanData = sampleData.map(item => {
      const projectIdStr = (item as any).projectId as string | undefined
      const projectName = (item as any).projectName as string | undefined
      const img = (item as any).img as string | undefined

      return {
        project_name: projectName ?? null,
        site_plan_id: null,
        site_plan_name: null,
        image_url: img ?? null,
        description: null,
        is_primary: true,
        layout_info: null,
        created_at: new Date(),
        updated_at: new Date(),
      }
    })

    // Batch insert in chunks of 50
    const chunkSize = 50
    for (let i = 0; i < sitePlanData.length; i += chunkSize) {
      const chunk = sitePlanData.slice(i, i + chunkSize)
      await prisma.site_plans.createMany({ data: chunk })
    }

    return sitePlanData.length
  }

  private async syncSitePlans(): Promise<number> {
    const csvKey = `${this.basePath}/site_plans.csv`;
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<KWSitePlanCSVData>(csvContent);

    // Get all unique project IDs and batch resolve them
    const projectIds = [...new Set(data.map(item => (item as any).projectId).filter(Boolean))]
    const projectMap = new Map<string, number>()
    
    if (projectIds.length > 0) {
      const projects = await prisma.project.findMany({
        where: { document_id: { in: projectIds } },
        select: { id: true, document_id: true }
      })
      projects.forEach(p => {
        if (p.document_id) projectMap.set(p.document_id, p.id)
      })
    }

    // Clear existing site plans data
    await prisma.site_plans.deleteMany({})

    // Batch create site plan records
    const sitePlanData = data.map(item => {
      const projectIdStr = (item as any).projectId as string | undefined
      const projectName = (item as any).projectName as string | undefined
      const img = (item as any).img as string | undefined

      return {
        project_name: projectName ?? null,
        site_plan_id: null,
        site_plan_name: null,
        image_url: img ?? null,
        description: null,
        is_primary: true,
        layout_info: null,
        created_at: new Date(),
        updated_at: new Date(),
      }
    })

    // Batch insert in chunks of 100
    const chunkSize = 100
    for (let i = 0; i < sitePlanData.length; i += chunkSize) {
      const chunk = sitePlanData.slice(i, i + chunkSize)
      await prisma.site_plans.createMany({ data: chunk })
    }

    return sitePlanData.length
  }

  private async parseCSV<T>(csvContent: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const results: T[] = [];
      const stream = Readable.from([csvContent]);

      stream
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  private parseJSONField(field: string): any {
    try {
      return JSON.parse(field);
    } catch (error) {
      console.warn('Failed to parse JSON field:', field);
      return null;
    }
  }

  private slugify(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }
}
