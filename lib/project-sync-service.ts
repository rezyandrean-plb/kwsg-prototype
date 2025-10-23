import { S3Service } from './s3-service';
import { PrismaClient } from '@prisma/client';
import csv from 'csv-parser';
import { Readable } from 'stream';

const prisma = new PrismaClient({
  log: ['error'],
});

export interface ProjectCSVData {
  // Basic project info
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
  features?: string; // JSON string
}

export interface UnitPricingCSVData {
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

export interface FloorPlanCSVData {
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

export interface FacilityCSVData {
  id?: string;
  name?: string;
  description?: string;
  icon?: string;
}

export interface ProjectFacilityCSVData {
  id?: string;
  project_id?: string;
  facility_id?: string;
}

export interface ImageGalleryCSVData {
  id?: string;
  project_id?: string;
  project_name?: string;
  image_url?: string;
  display_order?: string;
  is_active?: string;
  alt_text?: string;
  image_category?: string;
  is_featured?: string;
}

export interface SitePlanCSVData {
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

export class ProjectSyncService {
  private s3Service: S3Service;
  private bucketName: string;

  constructor(bucketName: string) {
    this.bucketName = bucketName;
    this.s3Service = new S3Service(bucketName);
  }

  async syncAllData(): Promise<{
    success: boolean;
    results: {
      projects: number;
      unitPricing: number;
      floorPlans: number;
      facilities: number;
      projectFacilities: number;
      imageGalleries: number;
      sitePlans: number;
    };
    errors: string[];
  }> {
    const errors: string[] = [];
    const results = {
      projects: 0,
      unitPricing: 0,
      floorPlans: 0,
      facilities: 0,
      projectFacilities: 0,
      imageGalleries: 0,
      sitePlans: 0,
    };

    try {
      console.log('Starting comprehensive project data sync...');

      // Sync projects
      try {
        results.projects = await this.syncProjects();
        console.log(`Synced ${results.projects} projects`);
      } catch (error) {
        errors.push(`Projects sync failed: ${error}`);
        console.error('Projects sync error:', error);
      }

      // Sync unit pricing
      try {
        results.unitPricing = await this.syncUnitPricing();
        console.log(`Synced ${results.unitPricing} unit pricing records`);
      } catch (error) {
        errors.push(`Unit pricing sync failed: ${error}`);
        console.error('Unit pricing sync error:', error);
      }

      // Sync floor plans
      try {
        results.floorPlans = await this.syncFloorPlans();
        console.log(`Synced ${results.floorPlans} floor plans`);
      } catch (error) {
        errors.push(`Floor plans sync failed: ${error}`);
        console.error('Floor plans sync error:', error);
      }

      // Sync facilities
      try {
        results.facilities = await this.syncFacilities();
        console.log(`Synced ${results.facilities} facilities`);
      } catch (error) {
        errors.push(`Facilities sync failed: ${error}`);
        console.error('Facilities sync error:', error);
      }

      // Sync project facilities
      try {
        results.projectFacilities = await this.syncProjectFacilities();
        console.log(`Synced ${results.projectFacilities} project facilities`);
      } catch (error) {
        errors.push(`Project facilities sync failed: ${error}`);
        console.error('Project facilities sync error:', error);
      }

      // Sync image galleries
      try {
        results.imageGalleries = await this.syncImageGalleries();
        console.log(`Synced ${results.imageGalleries} image galleries`);
      } catch (error) {
        errors.push(`Image galleries sync failed: ${error}`);
        console.error('Image galleries sync error:', error);
      }

      // Sync site plans
      try {
        results.sitePlans = await this.syncSitePlans();
        console.log(`Synced ${results.sitePlans} site plans`);
      } catch (error) {
        errors.push(`Site plans sync failed: ${error}`);
        console.error('Site plans sync error:', error);
      }

      console.log('Comprehensive sync completed');
      return {
        success: errors.length === 0,
        results,
        errors,
      };
    } catch (error) {
      console.error('Sync failed:', error);
      return {
        success: false,
        results,
        errors: [...errors, `General sync error: ${error}`],
      };
    }
  }

  private async syncProjects(): Promise<number> {
    const csvKey = process.env.PROJECTS_CSV_KEY || 'projects.csv';
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<ProjectCSVData>(csvContent);

    let syncedCount = 0;
    for (const item of data) {
      try {
        await prisma.project.upsert({
          where: { id: item.id ? parseInt(item.id) : undefined },
          update: {
            name: item.name || null,
            project_name: item.project_name || null,
            slug: item.slug || null,
            title: item.title || null,
            location: item.location || null,
            address: item.address || null,
            type: item.type || null,
            price: item.price || null,
            price_from: item.price_from || null,
            price_per_sqft: item.price_per_sqft || null,
            bedrooms: item.bedrooms || null,
            bathrooms: item.bathrooms || null,
            size: item.size || null,
            units: item.units || null,
            developer: item.developer || null,
            completion: item.completion || null,
            description: item.description || null,
            district: item.district || null,
            tenure: item.tenure || null,
            property_type: item.property_type || null,
            status: item.status || null,
            total_units: item.total_units || null,
            total_floors: item.total_floors || null,
            site_area: item.site_area || null,
            image_url_banner: item.image_url_banner || null,
            latitude: item.latitude || null,
            longitude: item.longitude || null,
            features: item.features ? JSON.parse(item.features) : null,
            updated_at: new Date(),
          },
          create: {
            name: item.name || null,
            project_name: item.project_name || null,
            slug: item.slug || null,
            title: item.title || null,
            location: item.location || null,
            address: item.address || null,
            type: item.type || null,
            price: item.price || null,
            price_from: item.price_from || null,
            price_per_sqft: item.price_per_sqft || null,
            bedrooms: item.bedrooms || null,
            bathrooms: item.bathrooms || null,
            size: item.size || null,
            units: item.units || null,
            developer: item.developer || null,
            completion: item.completion || null,
            description: item.description || null,
            district: item.district || null,
            tenure: item.tenure || null,
            property_type: item.property_type || null,
            status: item.status || null,
            total_units: item.total_units || null,
            total_floors: item.total_floors || null,
            site_area: item.site_area || null,
            image_url_banner: item.image_url_banner || null,
            latitude: item.latitude || null,
            longitude: item.longitude || null,
            features: item.features ? JSON.parse(item.features) : null,
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
        syncedCount++;
      } catch (error) {
        console.error(`Error syncing project ${item.id}:`, error);
      }
    }
    return syncedCount;
  }

  private async syncUnitPricing(): Promise<number> {
    const csvKey = process.env.UNIT_PRICING_CSV_KEY || 'unit-pricing.csv';
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<UnitPricingCSVData>(csvContent);

    let syncedCount = 0;
    for (const item of data) {
      try {
        await prisma.unit_pricing.upsert({
          where: { id: item.id ? parseInt(item.id) : undefined },
          update: {
            project_id: item.project_id ? parseInt(item.project_id) : null,
            project_name: item.project_name || null,
            unit_type: item.unit_type || null,
            bedrooms: item.bedrooms || null,
            bathrooms: item.bathrooms || null,
            size_sqft: item.size_sqft ? parseFloat(item.size_sqft) : null,
            price_from: item.price_from ? parseFloat(item.price_from) : null,
            price_to: item.price_to ? parseFloat(item.price_to) : null,
            price_per_sqft: item.price_per_sqft ? parseFloat(item.price_per_sqft) : null,
            currency: item.currency || 'SGD',
            payment_terms: item.payment_terms || null,
            discount_info: item.discount_info || null,
            is_available: item.is_available === 'true' || item.is_available === '1',
            available_unit: item.available_unit || null,
            total_unit: item.total_unit || null,
            updated_at: new Date(),
          },
          create: {
            project_id: item.project_id ? parseInt(item.project_id) : null,
            project_name: item.project_name || null,
            unit_type: item.unit_type || null,
            bedrooms: item.bedrooms || null,
            bathrooms: item.bathrooms || null,
            size_sqft: item.size_sqft ? parseFloat(item.size_sqft) : null,
            price_from: item.price_from ? parseFloat(item.price_from) : null,
            price_to: item.price_to ? parseFloat(item.price_to) : null,
            price_per_sqft: item.price_per_sqft ? parseFloat(item.price_per_sqft) : null,
            currency: item.currency || 'SGD',
            payment_terms: item.payment_terms || null,
            discount_info: item.discount_info || null,
            is_available: item.is_available === 'true' || item.is_available === '1',
            available_unit: item.available_unit || null,
            total_unit: item.total_unit || null,
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
        syncedCount++;
      } catch (error) {
        console.error(`Error syncing unit pricing ${item.id}:`, error);
      }
    }
    return syncedCount;
  }

  private async syncFloorPlans(): Promise<number> {
    const csvKey = process.env.FLOOR_PLANS_CSV_KEY || 'floor-plans.csv';
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<FloorPlanCSVData>(csvContent);

    let syncedCount = 0;
    for (const item of data) {
      try {
        await prisma.floor_plans.upsert({
          where: { id: item.id ? parseInt(item.id) : undefined },
          update: {
            project_id: item.project_id ? parseInt(item.project_id) : null,
            project_name: item.project_name || null,
            floor_plan_id: item.floor_plan_id || null,
            floor_plan_type: item.floor_plan_type || null,
            floor_plan_name: item.floor_plan_name || null,
            bedrooms: item.bedrooms || null,
            bathrooms: item.bathrooms || null,
            size_sqft: item.size_sqft ? parseFloat(item.size_sqft) : null,
            price: item.price || null,
            img: item.img || null,
            floor_plan_image: item.floor_plan_image || null,
            unit_type: item.unit_type || null,
            description: item.description || null,
            updated_at: new Date(),
          },
          create: {
            project_id: item.project_id ? parseInt(item.project_id) : null,
            project_name: item.project_name || null,
            floor_plan_id: item.floor_plan_id || null,
            floor_plan_type: item.floor_plan_type || null,
            floor_plan_name: item.floor_plan_name || null,
            bedrooms: item.bedrooms || null,
            bathrooms: item.bathrooms || null,
            size_sqft: item.size_sqft ? parseFloat(item.size_sqft) : null,
            price: item.price || null,
            img: item.img || null,
            floor_plan_image: item.floor_plan_image || null,
            unit_type: item.unit_type || null,
            description: item.description || null,
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
        syncedCount++;
      } catch (error) {
        console.error(`Error syncing floor plan ${item.id}:`, error);
      }
    }
    return syncedCount;
  }

  private async syncFacilities(): Promise<number> {
    const csvKey = process.env.FACILITIES_CSV_KEY || 'facilities.csv';
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<FacilityCSVData>(csvContent);

    let syncedCount = 0;
    for (const item of data) {
      try {
        await prisma.facilities.upsert({
          where: { id: item.id ? parseInt(item.id) : undefined },
          update: {
            name: item.name || null,
            description: item.description || null,
            icon: item.icon || null,
            updated_at: new Date(),
          },
          create: {
            name: item.name || null,
            description: item.description || null,
            icon: item.icon || null,
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
        syncedCount++;
      } catch (error) {
        console.error(`Error syncing facility ${item.id}:`, error);
      }
    }
    return syncedCount;
  }

  private async syncProjectFacilities(): Promise<number> {
    const csvKey = process.env.PROJECT_FACILITIES_CSV_KEY || 'project-facilities.csv';
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<ProjectFacilityCSVData>(csvContent);

    let syncedCount = 0;
    for (const item of data) {
      try {
        await prisma.project_facilities.upsert({
          where: { id: item.id ? parseInt(item.id) : undefined },
          update: {
            project_id: item.project_id ? parseInt(item.project_id) : null,
            facility_id: item.facility_id ? parseInt(item.facility_id) : null,
            updated_at: new Date(),
          },
          create: {
            project_id: item.project_id ? parseInt(item.project_id) : null,
            facility_id: item.facility_id ? parseInt(item.facility_id) : null,
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
        syncedCount++;
      } catch (error) {
        console.error(`Error syncing project facility ${item.id}:`, error);
      }
    }
    return syncedCount;
  }

  private async syncImageGalleries(): Promise<number> {
    const csvKey = process.env.IMAGE_GALLERIES_CSV_KEY || 'image-galleries.csv';
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<ImageGalleryCSVData>(csvContent);

    let syncedCount = 0;
    for (const item of data) {
      try {
        await prisma.image_galleries.upsert({
          where: { id: item.id ? parseInt(item.id) : undefined },
          update: {
            project_id: item.project_id ? parseInt(item.project_id) : null,
            project_name: item.project_name || null,
            image_url: item.image_url || null,
            display_order: item.display_order ? parseInt(item.display_order) : null,
            is_active: item.is_active === 'true' || item.is_active === '1',
            alt_text: item.alt_text || null,
            image_category: item.image_category || null,
            is_featured: item.is_featured === 'true' || item.is_featured === '1',
            updated_at: new Date(),
          },
          create: {
            project_id: item.project_id ? parseInt(item.project_id) : null,
            project_name: item.project_name || null,
            image_url: item.image_url || null,
            display_order: item.display_order ? parseInt(item.display_order) : null,
            is_active: item.is_active === 'true' || item.is_active === '1',
            alt_text: item.alt_text || null,
            image_category: item.image_category || null,
            is_featured: item.is_featured === 'true' || item.is_featured === '1',
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
        syncedCount++;
      } catch (error) {
        console.error(`Error syncing image gallery ${item.id}:`, error);
      }
    }
    return syncedCount;
  }

  private async syncSitePlans(): Promise<number> {
    const csvKey = process.env.SITE_PLANS_CSV_KEY || 'site-plans.csv';
    const csvContent = await this.s3Service.downloadCSV(csvKey);
    const data = await this.parseCSV<SitePlanCSVData>(csvContent);

    let syncedCount = 0;
    for (const item of data) {
      try {
        await prisma.site_plans.upsert({
          where: { id: item.id ? parseInt(item.id) : undefined },
          update: {
            project_id: item.project_id ? parseInt(item.project_id) : null,
            project_name: item.project_name || null,
            site_plan_id: item.site_plan_id || null,
            site_plan_name: item.site_plan_name || null,
            image_url: item.image_url || null,
            description: item.description || null,
            is_primary: item.is_primary === 'true' || item.is_primary === '1',
            layout_info: item.layout_info || null,
            updated_at: new Date(),
          },
          create: {
            project_id: item.project_id ? parseInt(item.project_id) : null,
            project_name: item.project_name || null,
            site_plan_id: item.site_plan_id || null,
            site_plan_name: item.site_plan_name || null,
            image_url: item.image_url || null,
            description: item.description || null,
            is_primary: item.is_primary === 'true' || item.is_primary === '1',
            layout_info: item.layout_info || null,
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
        syncedCount++;
      } catch (error) {
        console.error(`Error syncing site plan ${item.id}:`, error);
      }
    }
    return syncedCount;
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
}




