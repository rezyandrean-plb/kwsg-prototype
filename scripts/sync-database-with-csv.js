#!/usr/bin/env node

/**
 * Database-CSV Sync Script
 * 
 * This script compares the database with S3 CSV data and provides:
 * 1. Analysis of differences
 * 2. Identification of extra/missing projects
 * 3. Data cleanup recommendations
 * 4. Sync operations
 */

const { PrismaClient } = require('@prisma/client');
const { S3Service } = require('../lib/s3-service');

const prisma = new PrismaClient();

class DatabaseCSVSync {
  constructor() {
    this.s3Service = new S3Service('kwsingapore');
    this.csvKey = 'new_launch_data/projects.csv';
  }

  /**
   * Get all projects from database
   */
  async getDatabaseProjects() {
    console.log('📊 Fetching projects from database...');
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        project_name: true,
        price_from: true,
        image_url_banner: true,
        updated_at: true,
        created_at: true
      }
    });
    console.log(`✅ Found ${projects.length} projects in database`);
    return projects;
  }

  /**
   * Get all projects from CSV
   */
  async getCSVProjects() {
    console.log('📊 Fetching projects from S3 CSV...');
    const csvContent = await this.s3Service.downloadCSV(this.csvKey);
    const csvData = await this.parseCSV(csvContent);
    console.log(`✅ Found ${csvData.length} projects in CSV`);
    return csvData;
  }

  /**
   * Parse CSV content
   */
  async parseCSV(content) {
    const lines = content.split('\n');
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',');
        const row = {};
        headers.forEach((header, index) => {
          row[header.trim()] = values[index]?.trim() || '';
        });
        data.push(row);
      }
    }
    
    return data;
  }

  /**
   * Analyze differences between database and CSV
   */
  async analyzeDifferences() {
    console.log('\n🔍 Analyzing differences between database and CSV...\n');
    
    const [dbProjects, csvProjects] = await Promise.all([
      this.getDatabaseProjects(),
      this.getCSVProjects()
    ]);

    // Create maps for comparison
    const dbMap = new Map();
    const csvMap = new Map();

    // Map database projects by name and slug
    dbProjects.forEach(project => {
      if (project.name) dbMap.set(project.name.toLowerCase(), project);
      if (project.slug) dbMap.set(project.slug, project);
    });

    // Map CSV projects by name
    csvProjects.forEach(project => {
      if (project.projectName) {
        csvMap.set(project.projectName.toLowerCase(), project);
      }
    });

    // Find projects in database but not in CSV
    const extraInDB = [];
    const missingInDB = [];
    const duplicates = [];

    // Check for extra projects in database
    for (const [key, project] of dbMap) {
      if (!csvMap.has(key) && !csvMap.has(project.name?.toLowerCase())) {
        extraInDB.push(project);
      }
    }

    // Check for missing projects in database
    for (const [key, csvProject] of csvMap) {
      if (!dbMap.has(key)) {
        missingInDB.push(csvProject);
      }
    }

    // Find duplicates in database
    const nameCounts = new Map();
    dbProjects.forEach(project => {
      const name = project.name?.toLowerCase();
      if (name) {
        if (!nameCounts.has(name)) {
          nameCounts.set(name, []);
        }
        nameCounts.get(name).push(project);
      }
    });

    for (const [name, projects] of nameCounts) {
      if (projects.length > 1) {
        duplicates.push({ name, projects });
      }
    }

    return {
      dbProjects,
      csvProjects,
      extraInDB,
      missingInDB,
      duplicates,
      stats: {
        dbCount: dbProjects.length,
        csvCount: csvProjects.length,
        extraCount: extraInDB.length,
        missingCount: missingInDB.length,
        duplicateCount: duplicates.length
      }
    };
  }

  /**
   * Generate detailed report
   */
  generateReport(analysis) {
    const { extraInDB, missingInDB, duplicates, stats } = analysis;
    
    console.log('\n📋 SYNC ANALYSIS REPORT');
    console.log('='.repeat(50));
    console.log(`Database Projects: ${stats.dbCount}`);
    console.log(`CSV Projects: ${stats.csvCount}`);
    console.log(`Extra in DB: ${stats.extraCount}`);
    console.log(`Missing in DB: ${stats.missingCount}`);
    console.log(`Duplicates in DB: ${stats.duplicateCount}`);

    if (extraInDB.length > 0) {
      console.log('\n🚨 EXTRA PROJECTS IN DATABASE (not in CSV):');
      extraInDB.forEach((project, index) => {
        console.log(`${index + 1}. ID: ${project.id} | Name: ${project.name} | Slug: ${project.slug}`);
        console.log(`   Price: ${project.price_from} | Image: ${project.image_url_banner ? 'Yes' : 'No'}`);
        console.log(`   Updated: ${project.updated_at}`);
      });
    }

    if (duplicates.length > 0) {
      console.log('\n🔄 DUPLICATE PROJECTS IN DATABASE:');
      duplicates.forEach(({ name, projects }, index) => {
        console.log(`${index + 1}. "${name}" (${projects.length} entries):`);
        projects.forEach((project, pIndex) => {
          console.log(`   ${pIndex + 1}. ID: ${project.id} | Slug: ${project.slug}`);
          console.log(`      Price: ${project.price_from} | Image: ${project.image_url_banner ? 'Yes' : 'No'}`);
          console.log(`      Updated: ${project.updated_at}`);
        });
      });
    }

    if (missingInDB.length > 0) {
      console.log('\n❌ MISSING PROJECTS IN DATABASE (in CSV but not DB):');
      missingInDB.slice(0, 10).forEach((project, index) => {
        console.log(`${index + 1}. ${project.projectName} (${project.projectId})`);
      });
      if (missingInDB.length > 10) {
        console.log(`   ... and ${missingInDB.length - 10} more`);
      }
    }
  }

  /**
   * Clean up duplicates (keep the best entry)
   */
  async cleanupDuplicates(duplicates) {
    console.log('\n🧹 CLEANING UP DUPLICATES...');
    
    for (const { name, projects } of duplicates) {
      console.log(`\nProcessing duplicates for "${name}":`);
      
      // Sort by quality (has price, has image, most recent)
      const sorted = projects.sort((a, b) => {
        // Priority: has price_from, has image, most recent
        const scoreA = (a.price_from && a.price_from !== '0' ? 4 : 0) +
                      (a.image_url_banner ? 2 : 0) +
                      (new Date(a.updated_at).getTime() / 1000000);
        const scoreB = (b.price_from && b.price_from !== '0' ? 4 : 0) +
                      (b.image_url_banner ? 2 : 0) +
                      (new Date(b.updated_at).getTime() / 1000000);
        return scoreB - scoreA;
      });

      const keep = sorted[0];
      const remove = sorted.slice(1);

      console.log(`  ✅ Keeping ID ${keep.id} (best quality)`);
      console.log(`  🗑️  Removing IDs: ${remove.map(p => p.id).join(', ')}`);

      // Remove duplicates
      for (const project of remove) {
        try {
          await prisma.project.delete({
            where: { id: project.id }
          });
          console.log(`  ✅ Deleted project ID ${project.id}`);
        } catch (error) {
          console.log(`  ❌ Failed to delete project ID ${project.id}: ${error.message}`);
        }
      }
    }
  }

  /**
   * Remove extra projects from database
   */
  async removeExtraProjects(extraProjects, dryRun = true) {
    console.log(`\n🗑️  ${dryRun ? 'DRY RUN: ' : ''}REMOVING EXTRA PROJECTS...`);
    
    for (const project of extraProjects) {
      if (dryRun) {
        console.log(`  [DRY RUN] Would delete: ID ${project.id} - ${project.name}`);
      } else {
        try {
          await prisma.project.delete({
            where: { id: project.id }
          });
          console.log(`  ✅ Deleted: ID ${project.id} - ${project.name}`);
        } catch (error) {
          console.log(`  ❌ Failed to delete ID ${project.id}: ${error.message}`);
        }
      }
    }
  }

  /**
   * Main sync function
   */
  async sync(options = {}) {
    const {
      dryRun = true,
      cleanupDuplicates = false,
      removeExtra = false
    } = options;

    try {
      console.log('🚀 Starting Database-CSV Sync Analysis...\n');
      
      const analysis = await this.analyzeDifferences();
      this.generateReport(analysis);

      if (cleanupDuplicates && analysis.duplicates.length > 0) {
        if (dryRun) {
          console.log('\n🔍 DRY RUN: Would clean up duplicates');
        } else {
          await this.cleanupDuplicates(analysis.duplicates);
        }
      }

      if (removeExtra && analysis.extraInDB.length > 0) {
        await this.removeExtraProjects(analysis.extraInDB, dryRun);
      }

      console.log('\n✅ Sync analysis completed!');
      
      return {
        success: true,
        analysis,
        recommendations: this.getRecommendations(analysis)
      };

    } catch (error) {
      console.error('❌ Sync failed:', error);
      return { success: false, error: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  /**
   * Get recommendations based on analysis
   */
  getRecommendations(analysis) {
    const recommendations = [];
    
    if (analysis.duplicates.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        action: 'Clean up duplicates',
        description: `Remove ${analysis.duplicates.length} duplicate project groups`,
        command: 'node scripts/sync-database-with-csv.js --cleanup-duplicates'
      });
    }

    if (analysis.extraInDB.length > 0) {
      recommendations.push({
        priority: 'MEDIUM',
        action: 'Remove extra projects',
        description: `Remove ${analysis.extraInDB.length} projects not in CSV`,
        command: 'node scripts/sync-database-with-csv.js --remove-extra'
      });
    }

    if (analysis.missingInDB.length > 0) {
      recommendations.push({
        priority: 'LOW',
        action: 'Add missing projects',
        description: `Add ${analysis.missingInDB.length} projects from CSV to database`,
        command: 'Run full sync from CSV'
      });
    }

    return recommendations;
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--execute');
  const cleanupDuplicates = args.includes('--cleanup-duplicates');
  const removeExtra = args.includes('--remove-extra');

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made');
    console.log('Use --execute flag to make actual changes\n');
  }

  const sync = new DatabaseCSVSync();
  const result = await sync.sync({
    dryRun,
    cleanupDuplicates,
    removeExtra
  });

  if (result.success && result.recommendations.length > 0) {
    console.log('\n💡 RECOMMENDATIONS:');
    result.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. [${rec.priority}] ${rec.action}`);
      console.log(`   ${rec.description}`);
      console.log(`   Command: ${rec.command}\n`);
    });
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { DatabaseCSVSync };
