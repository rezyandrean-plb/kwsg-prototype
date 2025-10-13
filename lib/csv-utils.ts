import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import { Readable } from 'stream';
import { Project } from '@prisma/client';

export interface CSVProject {
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
  document_id?: string;
  locale?: string;
  features?: string; // JSON string
}

export class CSVUtils {
  static async parseCSV(csvContent: string): Promise<CSVProject[]> {
    return new Promise((resolve, reject) => {
      const results: CSVProject[] = [];
      const stream = Readable.from([csvContent]);

      stream
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  static async generateCSV(projects: Project[]): Promise<string> {
    const csvWriter = createObjectCsvWriter({
      path: '', // We'll use the string output
      header: [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'project_name', title: 'project_name' },
        { id: 'slug', title: 'slug' },
        { id: 'title', title: 'title' },
        { id: 'location', title: 'location' },
        { id: 'address', title: 'address' },
        { id: 'type', title: 'type' },
        { id: 'price', title: 'price' },
        { id: 'price_from', title: 'price_from' },
        { id: 'price_per_sqft', title: 'price_per_sqft' },
        { id: 'bedrooms', title: 'bedrooms' },
        { id: 'bathrooms', title: 'bathrooms' },
        { id: 'size', title: 'size' },
        { id: 'units', title: 'units' },
        { id: 'developer', title: 'developer' },
        { id: 'completion', title: 'completion' },
        { id: 'description', title: 'description' },
        { id: 'district', title: 'district' },
        { id: 'tenure', title: 'tenure' },
        { id: 'property_type', title: 'property_type' },
        { id: 'status', title: 'status' },
        { id: 'total_units', title: 'total_units' },
        { id: 'total_floors', title: 'total_floors' },
        { id: 'site_area', title: 'site_area' },
        { id: 'image_url_banner', title: 'image_url_banner' },
        { id: 'latitude', title: 'latitude' },
        { id: 'longitude', title: 'longitude' },
        { id: 'document_id', title: 'document_id' },
        { id: 'locale', title: 'locale' },
        { id: 'features', title: 'features' },
      ],
    });

    // Convert projects to CSV format
    const csvData = projects.map(project => ({
      id: project.id?.toString() || '',
      name: project.name || '',
      project_name: project.project_name || '',
      slug: project.slug || '',
      title: project.title || '',
      location: project.location || '',
      address: project.address || '',
      type: project.type || '',
      price: project.price || '',
      price_from: project.price_from || '',
      price_per_sqft: project.price_per_sqft || '',
      bedrooms: project.bedrooms || '',
      bathrooms: project.bathrooms || '',
      size: project.size || '',
      units: project.units || '',
      developer: project.developer || '',
      completion: project.completion || '',
      description: project.description || '',
      district: project.district || '',
      tenure: project.tenure || '',
      property_type: project.property_type || '',
      status: project.status || '',
      total_units: project.total_units || '',
      total_floors: project.total_floors || '',
      site_area: project.site_area || '',
      image_url_banner: project.image_url_banner || '',
      latitude: project.latitude || '',
      longitude: project.longitude || '',
      document_id: project.document_id || '',
      locale: project.locale || '',
      features: project.features ? JSON.stringify(project.features) : '',
    }));

    // Generate CSV string
    const header = csvWriter.getHeaderString();
    const records = csvData.map(record => 
      Object.values(record).map(value => 
        typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      ).join(',')
    );
    
    return [header, ...records].join('\n');
  }

  static convertCSVToProject(csvProject: CSVProject): Omit<Project, 'created_at' | 'updated_at' | 'published_at'> {
    return {
      id: csvProject.id ? parseInt(csvProject.id) : undefined,
      name: csvProject.name || null,
      project_name: csvProject.project_name || null,
      slug: csvProject.slug || null,
      title: csvProject.title || null,
      location: csvProject.location || null,
      address: csvProject.address || null,
      type: csvProject.type || null,
      price: csvProject.price || null,
      price_from: csvProject.price_from || null,
      price_per_sqft: csvProject.price_per_sqft || null,
      bedrooms: csvProject.bedrooms || null,
      bathrooms: csvProject.bathrooms || null,
      size: csvProject.size || null,
      units: csvProject.units || null,
      developer: csvProject.developer || null,
      completion: csvProject.completion || null,
      description: csvProject.description || null,
      district: csvProject.district || null,
      tenure: csvProject.tenure || null,
      property_type: csvProject.property_type || null,
      status: csvProject.status || null,
      total_units: csvProject.total_units || null,
      total_floors: csvProject.total_floors || null,
      site_area: csvProject.site_area || null,
      image_url_banner: csvProject.image_url_banner || null,
      latitude: csvProject.latitude || null,
      longitude: csvProject.longitude || null,
      document_id: csvProject.document_id || null,
      created_by_id: null,
      updated_by_id: null,
      locale: csvProject.locale || null,
      features: csvProject.features ? JSON.parse(csvProject.features) : [],
    };
  }
}





