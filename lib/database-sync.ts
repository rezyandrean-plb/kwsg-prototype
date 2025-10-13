import { prisma } from './prisma';
import { S3Service } from './s3-service';
import { CSVUtils, CSVProject } from './csv-utils';
import { Project } from '@prisma/client';

export class DatabaseSyncService {
  private s3Service: S3Service;
  private bucketName: string;
  private csvKey: string;

  constructor(bucketName: string, csvKey: string) {
    this.bucketName = bucketName;
    this.csvKey = csvKey;
    this.s3Service = new S3Service(bucketName);
  }

  /**
   * Replace all data in the database with data from S3 CSV
   */
  async replaceAllDataFromS3(): Promise<{ success: boolean; message: string; count: number }> {
    try {
      console.log('Starting database replacement from S3 CSV...');
      
      // Download CSV from S3
      const csvContent = await this.s3Service.downloadCSV(this.csvKey);
      console.log('CSV downloaded from S3');
      
      // Parse CSV
      const csvProjects = await CSVUtils.parseCSV(csvContent);
      console.log(`Parsed ${csvProjects.length} projects from CSV`);
      
      // Start transaction
      const result = await prisma.$transaction(async (tx) => {
        // Delete all existing projects
        const deletedCount = await tx.project.deleteMany({});
        console.log(`Deleted ${deletedCount.count} existing projects`);
        
        // Convert CSV data to Project format
        const projects = csvProjects.map(csvProject => {
          const project = CSVUtils.convertCSVToProject(csvProject);
          return {
            ...project,
            created_at: new Date(),
            updated_at: new Date(),
            published_at: new Date(),
          };
        });
        
        // Insert new projects
        const insertedProjects = await tx.project.createMany({
          data: projects,
          skipDuplicates: true,
        });
        
        console.log(`Inserted ${insertedProjects.count} new projects`);
        return insertedProjects.count;
      });
      
      return {
        success: true,
        message: `Successfully replaced database with ${result} projects from S3 CSV`,
        count: result,
      };
    } catch (error) {
      console.error('Error replacing database data:', error);
      return {
        success: false,
        message: `Failed to replace database data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        count: 0,
      };
    }
  }

  /**
   * Sync database with S3 CSV (upsert based on slug)
   */
  async syncWithS3(): Promise<{ success: boolean; message: string; stats: { created: number; updated: number; deleted: number } }> {
    try {
      console.log('Starting database sync with S3 CSV...');
      
      // Download CSV from S3
      const csvContent = await this.s3Service.downloadCSV(this.csvKey);
      console.log('CSV downloaded from S3');
      
      // Parse CSV
      const csvProjects = await CSVUtils.parseCSV(csvContent);
      console.log(`Parsed ${csvProjects.length} projects from CSV`);
      
      // Get existing projects from database
      const existingProjects = await prisma.project.findMany({
        select: { id: true, slug: true },
      });
      const existingSlugs = new Set(existingProjects.map(p => p.slug).filter(Boolean));
      
      // Get CSV slugs
      const csvSlugs = new Set(csvProjects.map(p => p.slug).filter(Boolean));
      
      let created = 0;
      let updated = 0;
      let deleted = 0;
      
      // Start transaction
      await prisma.$transaction(async (tx) => {
        // Process each CSV project
        for (const csvProject of csvProjects) {
          if (!csvProject.slug) continue;
          
          const projectData = CSVUtils.convertCSVToProject(csvProject);
          const now = new Date();
          
          if (existingSlugs.has(csvProject.slug)) {
            // Update existing project
            await tx.project.updateMany({
              where: { slug: csvProject.slug },
              data: {
                ...projectData,
                updated_at: now,
              },
            });
            updated++;
          } else {
            // Create new project
            await tx.project.create({
              data: {
                ...projectData,
                created_at: now,
                updated_at: now,
                published_at: now,
              },
            });
            created++;
          }
        }
        
        // Delete projects that are no longer in CSV
        const slugsToDelete = Array.from(existingSlugs).filter(slug => !csvSlugs.has(slug));
        if (slugsToDelete.length > 0) {
          const deleteResult = await tx.project.deleteMany({
            where: {
              slug: {
                in: slugsToDelete,
              },
            },
          });
          deleted = deleteResult.count;
        }
      });
      
      console.log(`Sync completed: ${created} created, ${updated} updated, ${deleted} deleted`);
      
      return {
        success: true,
        message: `Sync completed successfully`,
        stats: { created, updated, deleted },
      };
    } catch (error) {
      console.error('Error syncing database with S3:', error);
      return {
        success: false,
        message: `Failed to sync database: ${error instanceof Error ? error.message : 'Unknown error'}`,
        stats: { created: 0, updated: 0, deleted: 0 },
      };
    }
  }

  /**
   * Export current database to CSV and upload to S3
   */
  async exportToS3(): Promise<{ success: boolean; message: string; count: number }> {
    try {
      console.log('Starting database export to S3...');
      
      // Get all projects from database
      const projects = await prisma.project.findMany({
        orderBy: { id: 'asc' },
      });
      console.log(`Retrieved ${projects.length} projects from database`);
      
      // Generate CSV
      const csvContent = await CSVUtils.generateCSV(projects);
      console.log('CSV generated');
      
      // Upload to S3
      await this.s3Service.uploadCSV(this.csvKey, csvContent);
      console.log('CSV uploaded to S3');
      
      return {
        success: true,
        message: `Successfully exported ${projects.length} projects to S3`,
        count: projects.length,
      };
    } catch (error) {
      console.error('Error exporting database to S3:', error);
      return {
        success: false,
        message: `Failed to export database: ${error instanceof Error ? error.message : 'Unknown error'}`,
        count: 0,
      };
    }
  }

  /**
   * Get sync status and statistics
   */
  async getSyncStatus(): Promise<{
    databaseCount: number;
    lastSync?: Date;
    s3LastModified?: Date;
  }> {
    try {
      const databaseCount = await prisma.project.count();
      
      // You might want to store last sync time in a separate table
      // For now, we'll return basic info
      return {
        databaseCount,
      };
    } catch (error) {
      console.error('Error getting sync status:', error);
      return {
        databaseCount: 0,
      };
    }
  }
}






