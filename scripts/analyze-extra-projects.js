#!/usr/bin/env node

/**
 * Quick Analysis Script - Identify Extra Projects
 * 
 * This script quickly identifies which projects are in the database
 * but not in the CSV data.
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function analyzeExtraProjects() {
  try {
    console.log('🔍 Analyzing extra projects in database...\n');
    
    // Get all projects from database
    const dbProjects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        project_name: true,
        price_from: true,
        image_url_banner: true,
        updated_at: true,
        created_at: true
      },
      orderBy: { updated_at: 'desc' }
    });

    console.log(`📊 Total projects in database: ${dbProjects.length}`);

    // Get projects that might be duplicates or test data
    const suspiciousProjects = dbProjects.filter(project => {
      const name = project.name?.toLowerCase() || '';
      const slug = project.slug?.toLowerCase() || '';
      
      // Check for test projects
      if (name.includes('test') || slug.includes('test')) {
        return true;
      }
      
      // Check for projects with no meaningful data
      if (!project.price_from || project.price_from === '0') {
        if (!project.image_url_banner) {
          return true;
        }
      }
      
      return false;
    });

    console.log(`\n🚨 Suspicious/Extra projects found: ${suspiciousProjects.length}`);
    
    if (suspiciousProjects.length > 0) {
      console.log('\n📋 DETAILED ANALYSIS:');
      console.log('='.repeat(60));
      
      suspiciousProjects.forEach((project, index) => {
        console.log(`\n${index + 1}. ID: ${project.id}`);
        console.log(`   Name: ${project.name}`);
        console.log(`   Slug: ${project.slug}`);
        console.log(`   Price: ${project.price_from || 'None'}`);
        console.log(`   Image: ${project.image_url_banner ? 'Yes' : 'No'}`);
        console.log(`   Updated: ${project.updated_at}`);
        console.log(`   Created: ${project.created_at}`);
        
        // Determine why it's suspicious
        const reasons = [];
        if (project.name?.toLowerCase().includes('test')) reasons.push('Test project');
        if (!project.price_from || project.price_from === '0') reasons.push('No price data');
        if (!project.image_url_banner) reasons.push('No image');
        if (reasons.length > 1) reasons.push('Multiple issues');
        
        console.log(`   Issues: ${reasons.join(', ')}`);
      });
    }

    // Check for exact duplicates by name
    const nameGroups = {};
    dbProjects.forEach(project => {
      if (project.name) {
        const name = project.name.toLowerCase();
        if (!nameGroups[name]) {
          nameGroups[name] = [];
        }
        nameGroups[name].push(project);
      }
    });

    const duplicates = Object.entries(nameGroups).filter(([name, projects]) => projects.length > 1);
    
    if (duplicates.length > 0) {
      console.log(`\n🔄 DUPLICATE PROJECTS BY NAME: ${duplicates.length}`);
      console.log('='.repeat(60));
      
      duplicates.forEach(([name, projects]) => {
        console.log(`\n"${name}" (${projects.length} entries):`);
        projects.forEach((project, index) => {
          console.log(`  ${index + 1}. ID: ${project.id} | Slug: ${project.slug}`);
          console.log(`     Price: ${project.price_from || 'None'} | Image: ${project.image_url_banner ? 'Yes' : 'No'}`);
          console.log(`     Updated: ${project.updated_at}`);
        });
      });
    }

    // Summary
    console.log('\n📊 SUMMARY:');
    console.log('='.repeat(40));
    console.log(`Total projects: ${dbProjects.length}`);
    console.log(`Suspicious projects: ${suspiciousProjects.length}`);
    console.log(`Duplicate groups: ${duplicates.length}`);
    console.log(`Total duplicate entries: ${duplicates.reduce((sum, [, projects]) => sum + projects.length - 1, 0)}`);

    // Recommendations
    console.log('\n💡 RECOMMENDATIONS:');
    console.log('='.repeat(40));
    
    if (suspiciousProjects.length > 0) {
      console.log(`1. Review and potentially remove ${suspiciousProjects.length} suspicious projects`);
      console.log('   - Test projects');
      console.log('   - Projects with no price and no image');
    }
    
    if (duplicates.length > 0) {
      console.log(`2. Clean up ${duplicates.length} duplicate project groups`);
      console.log('   - Keep the entry with most complete data');
      console.log('   - Remove incomplete duplicates');
    }

    console.log('\n3. Run full sync with CSV to ensure data consistency');
    console.log('   - Use the main sync script for comprehensive analysis');

    return {
      total: dbProjects.length,
      suspicious: suspiciousProjects.length,
      duplicates: duplicates.length,
      duplicateEntries: duplicates.reduce((sum, [, projects]) => sum + projects.length - 1, 0)
    };

  } catch (error) {
    console.error('❌ Analysis failed:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

// Run analysis
if (require.main === module) {
  analyzeExtraProjects().catch(console.error);
}

module.exports = { analyzeExtraProjects };
