#!/usr/bin/env node

/**
 * Identify Extra Projects Script
 * 
 * This script uses the existing API to identify projects that might be
 * extra (not in CSV) or duplicates.
 */

const https = require('https');
const http = require('http');

class ProjectAnalyzer {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async fetchProjects() {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}/api/projects-prisma?page=1&pageSize=1000`;
      const client = this.baseUrl.startsWith('https') ? https : http;
      
      client.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(json.data || []);
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', reject);
    });
  }

  async analyzeProjects() {
    try {
      console.log('🔍 Fetching projects from API...');
      const projects = await this.fetchProjects();
      console.log(`✅ Found ${projects.length} projects\n`);

      // Analyze projects
      const analysis = {
        total: projects.length,
        testProjects: [],
        noPriceNoImage: [],
        duplicates: {},
        suspicious: []
      };

      // Group by name for duplicate detection
      const nameGroups = {};
      
      projects.forEach(project => {
        const name = project.name?.toLowerCase();
        if (name) {
          if (!nameGroups[name]) {
            nameGroups[name] = [];
          }
          nameGroups[name].push(project);
        }

        // Check for test projects
        if (name && (name.includes('test') || name.includes('api'))) {
          analysis.testProjects.push(project);
        }

        // Check for projects with no meaningful data
        if ((!project.price_from || project.price_from === '0') && !project.image_url_banner) {
          analysis.noPriceNoImage.push(project);
        }

        // Check for suspicious projects
        if (this.isSuspicious(project)) {
          analysis.suspicious.push(project);
        }
      });

      // Find duplicates
      Object.entries(nameGroups).forEach(([name, projects]) => {
        if (projects.length > 1) {
          analysis.duplicates[name] = projects;
        }
      });

      return { projects, analysis };
    } catch (error) {
      console.error('❌ Analysis failed:', error.message);
      return null;
    }
  }

  isSuspicious(project) {
    const name = project.name?.toLowerCase() || '';
    const slug = project.slug?.toLowerCase() || '';
    
    // Test projects
    if (name.includes('test') || slug.includes('test')) return true;
    
    // Projects with no meaningful data
    if ((!project.price_from || project.price_from === '0') && !project.image_url_banner) return true;
    
    // Projects with very recent creation (might be test data)
    if (project.created_at && new Date(project.created_at) > new Date('2025-10-01')) return true;
    
    return false;
  }

  generateReport(projects, analysis) {
    console.log('📋 PROJECT ANALYSIS REPORT');
    console.log('='.repeat(50));
    console.log(`Total projects: ${analysis.total}`);
    console.log(`Test projects: ${analysis.testProjects.length}`);
    console.log(`No price/image: ${analysis.noPriceNoImage.length}`);
    console.log(`Suspicious: ${analysis.suspicious.length}`);
    console.log(`Duplicate groups: ${Object.keys(analysis.duplicates).length}`);

    if (analysis.testProjects.length > 0) {
      console.log('\n🧪 TEST PROJECTS:');
      analysis.testProjects.forEach((project, index) => {
        console.log(`${index + 1}. ID: ${project.id} | Name: ${project.name}`);
        console.log(`   Slug: ${project.slug} | Price: ${project.price_from || 'None'}`);
        console.log(`   Image: ${project.image_url_banner ? 'Yes' : 'No'}`);
      });
    }

    if (analysis.noPriceNoImage.length > 0) {
      console.log('\n📊 PROJECTS WITH NO PRICE AND NO IMAGE:');
      analysis.noPriceNoImage.slice(0, 10).forEach((project, index) => {
        console.log(`${index + 1}. ID: ${project.id} | Name: ${project.name}`);
        console.log(`   Slug: ${project.slug} | Updated: ${project.updated_at}`);
      });
      if (analysis.noPriceNoImage.length > 10) {
        console.log(`   ... and ${analysis.noPriceNoImage.length - 10} more`);
      }
    }

    if (Object.keys(analysis.duplicates).length > 0) {
      console.log('\n🔄 DUPLICATE PROJECTS:');
      Object.entries(analysis.duplicates).forEach(([name, projects], index) => {
        console.log(`${index + 1}. "${name}" (${projects.length} entries):`);
        projects.forEach((project, pIndex) => {
          console.log(`   ${pIndex + 1}. ID: ${project.id} | Slug: ${project.slug}`);
          console.log(`      Price: ${project.price_from || 'None'} | Image: ${project.image_url_banner ? 'Yes' : 'No'}`);
        });
      });
    }

    if (analysis.suspicious.length > 0) {
      console.log('\n🚨 SUSPICIOUS PROJECTS:');
      analysis.suspicious.slice(0, 10).forEach((project, index) => {
        console.log(`${index + 1}. ID: ${project.id} | Name: ${project.name}`);
        console.log(`   Slug: ${project.slug} | Price: ${project.price_from || 'None'}`);
        console.log(`   Image: ${project.image_url_banner ? 'Yes' : 'No'}`);
        console.log(`   Created: ${project.created_at}`);
      });
      if (analysis.suspicious.length > 10) {
        console.log(`   ... and ${analysis.suspicious.length - 10} more`);
      }
    }

    // Recommendations
    console.log('\n💡 RECOMMENDATIONS:');
    console.log('='.repeat(40));
    
    const totalExtra = analysis.testProjects.length + 
                      analysis.noPriceNoImage.length + 
                      Object.values(analysis.duplicates).reduce((sum, projects) => sum + projects.length - 1, 0);

    if (totalExtra > 0) {
      console.log(`1. Remove ${totalExtra} extra/suspicious projects:`);
      if (analysis.testProjects.length > 0) {
        console.log(`   - ${analysis.testProjects.length} test projects`);
      }
      if (analysis.noPriceNoImage.length > 0) {
        console.log(`   - ${analysis.noPriceNoImage.length} projects with no price/image`);
      }
      if (Object.keys(analysis.duplicates).length > 0) {
        const duplicateCount = Object.values(analysis.duplicates).reduce((sum, projects) => sum + projects.length - 1, 0);
        console.log(`   - ${duplicateCount} duplicate entries`);
      }
    }

    console.log('\n2. Run CSV sync to ensure data consistency');
    console.log('3. Implement data validation to prevent future duplicates');

    return {
      totalExtra,
      breakdown: {
        testProjects: analysis.testProjects.length,
        noPriceNoImage: analysis.noPriceNoImage.length,
        duplicates: Object.keys(analysis.duplicates).length,
        duplicateEntries: Object.values(analysis.duplicates).reduce((sum, projects) => sum + projects.length - 1, 0)
      }
    };
  }

  async run() {
    try {
      console.log('🚀 Starting project analysis...\n');
      
      const result = await this.analyzeProjects();
      if (!result) return;

      const { projects, analysis } = result;
      const summary = this.generateReport(projects, analysis);

      console.log('\n📊 FINAL SUMMARY:');
      console.log('='.repeat(30));
      console.log(`Total projects: ${analysis.total}`);
      console.log(`Extra/suspicious: ${summary.totalExtra}`);
      console.log(`Breakdown:`, summary.breakdown);

      return summary;
    } catch (error) {
      console.error('❌ Analysis failed:', error);
    }
  }
}

// Run analysis
if (require.main === module) {
  const analyzer = new ProjectAnalyzer();
  analyzer.run().catch(console.error);
}

module.exports = { ProjectAnalyzer };
