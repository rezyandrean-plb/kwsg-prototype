import { S3Service } from './s3-service';
import csv from 'csv-parser';
import { Readable } from 'stream';

export interface UnitPricingData {
  id: string;
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
  created_at?: string;
  updated_at?: string;
}

export class UnitPricingService {
  private s3Service: S3Service;
  private bucketName: string;
  private csvKey: string;
  private cache: UnitPricingData[] | null = null;
  private lastFetch: number = 0;
  private cacheTimeout: number = 5 * 60 * 1000; // 5 minutes

  constructor(bucketName: string, csvKey: string) {
    this.bucketName = bucketName;
    this.csvKey = csvKey;
    this.s3Service = new S3Service(bucketName);
  }

  async getUnitPricingData(forceRefresh: boolean = false): Promise<UnitPricingData[]> {
    const now = Date.now();
    
    // Return cached data if it's still fresh and not forcing refresh
    if (!forceRefresh && this.cache && (now - this.lastFetch) < this.cacheTimeout) {
      return this.cache;
    }

    try {
      console.log('Fetching unit pricing data from S3...');
      const csvContent = await this.s3Service.downloadCSV(this.csvKey);
      const data = await this.parseCSV(csvContent);
      
      // Update cache
      this.cache = data;
      this.lastFetch = now;
      
      console.log(`Loaded ${data.length} unit pricing records from S3`);
      return data;
    } catch (error) {
      console.error('Error fetching unit pricing data from S3:', error);
      
      // Return cached data if available, even if stale
      if (this.cache) {
        console.log('Returning stale cached data due to S3 error');
        return this.cache;
      }
      
      throw error;
    }
  }

  async getUnitPricingByProject(projectId: string | number, projectName?: string): Promise<UnitPricingData[]> {
    const allData = await this.getUnitPricingData();
    
    return allData.filter(item => {
      // Match by project_id if available
      if (item.project_id && item.project_id === String(projectId)) {
        return true;
      }
      
      // Match by project_name if available
      if (projectName && item.project_name) {
        return item.project_name.toLowerCase() === projectName.toLowerCase();
      }
      
      return false;
    });
  }

  private async parseCSV(csvContent: string): Promise<UnitPricingData[]> {
    return new Promise((resolve, reject) => {
      const results: UnitPricingData[] = [];
      const stream = Readable.from([csvContent]);

      stream
        .pipe(csv())
        .on('data', (data) => {
          // Clean and normalize the data
          const cleanedData: UnitPricingData = {
            id: data.id || data.ID || '',
            project_id: data.project_id || data.project_ID || data.projectId || '',
            project_name: data.project_name || data.projectName || data.project_name || '',
            unit_type: data.unit_type || data.unitType || data.unit_type || '',
            bedrooms: data.bedrooms || data.bedroom || '',
            bathrooms: data.bathrooms || data.bathroom || '',
            size_sqft: data.size_sqft || data.sizeSqft || data.size || '',
            price_from: data.price_from || data.priceFrom || data.price_from || '',
            price_to: data.price_to || data.priceTo || data.price_to || '',
            price_per_sqft: data.price_per_sqft || data.pricePerSqft || data.price_per_sqft || '',
            currency: data.currency || 'SGD',
            payment_terms: data.payment_terms || data.paymentTerms || '',
            discount_info: data.discount_info || data.discountInfo || '',
            is_available: data.is_available || data.isAvailable || data.available || 'true',
            available_unit: data.available_unit || data.availableUnit || '',
            total_unit: data.total_unit || data.totalUnit || '',
            created_at: data.created_at || data.createdAt || '',
            updated_at: data.updated_at || data.updatedAt || '',
          };
          
          results.push(cleanedData);
        })
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }

  // Method to refresh cache manually
  async refreshCache(): Promise<void> {
    await this.getUnitPricingData(true);
  }

  // Method to clear cache
  clearCache(): void {
    this.cache = null;
    this.lastFetch = 0;
  }
}




