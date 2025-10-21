#!/usr/bin/env node

/**
 * Cleanup Test Projects Script
 * 
 * This script removes obvious test projects and incomplete entries
 * that should not be in the production database.
 */

const https = require('https');
const http = require('http');

class TestProjectCleanup {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}${path}`;
      const client = this.baseUrl.startsWith('https') ? https : http;
      
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        }
      };

      if (data) {
        options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
      }

      const req = client.request(url, options, (res) => {
        let responseData = '';
        res.on('data', chunk => responseData += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(responseData);
            resolve(json);
          } catch (error) {
            resolve({ success: false, error: 'Invalid JSON response' });
          }
        });
      });

      req.on('error', reject);

      if (data) {
        req.write(JSON.stringify(data));
      }
      
      req.end();
    });
  }

  identifyTestProjects(projects) {
    const testProjects = [];
    
    projects.forEach(project => {
      const name = project.name?.toLowerCase() || '';
      const slug = project.slug?.toLowerCase() || '';
      
      // Test project patterns
      if (name.includes('test') || 
          name.includes('api') || 
          name.includes('debug') ||
          name.includes('sample') ||
          name.includes('dummy') ||
          name.includes('example') ||
          slug.includes('test') ||
          slug.includes('project-') ||
          slug.includes('debug') ||
          slug.includes('sample')) {
        testProjects.push({
          ...project,
          reason: 'Test/Debug project'
        });
      }
      
      // Incomplete projects (no price, no image, no location)
      else if ((!project.price_from || project.price_from === '0' || project.price_from === 'Price on request') &&
               !project.image_url_banner &&
               !project.location) {
        testProjects.push({
          ...project,
          reason: 'Incomplete project (no price, image, or location)'
        });
      }
      
      // Projects with suspicious names
      else if (name.includes('gls') || 
               name.includes('plot') ||
               name.includes('st ') ||
               name.includes('@') ||
               name.includes('road') ||
               name.includes('drive') ||
               name.includes('avenue')) {
        testProjects.push({
          ...project,
          reason: 'Suspicious project name (GLS/Plot/Address)'
        });
      }
    });
    
    return testProjects;
  }

  async analyzeTestProjects() {
    console.log('🔍 Analyzing projects for test/incomplete entries...\n');
    
    try {
      // Get all projects from database
      const response = await this.makeRequest('GET', '/api/projects-prisma?page=1&pageSize=1000');
      const projects = response.data || [];
      
      console.log(`📊 Total projects in database: ${projects.length}`);
      
      const testProjects = this.identifyTestProjects(projects);
      
      console.log(`\n🚨 Found ${testProjects.length} test/incomplete projects:`);
      console.log('='.repeat(60));
      
      testProjects.forEach((project, index) => {
        console.log(`${index + 1}. ID: ${project.id} | Name: ${project.name}`);
        console.log(`   Slug: ${project.slug}`);
        console.log(`   Price: ${project.price_from || 'None'}`);
        console.log(`   Image: ${project.image_url_banner ? 'Yes' : 'No'}`);
        console.log(`   Location: ${project.location || 'None'}`);
        console.log(`   Reason: ${project.reason}`);
        console.log('');
      });
      
      return testProjects;
    } catch (error) {
      console.error('❌ Analysis failed:', error.message);
      return [];
    }
  }

  generateCleanupSQL(testProjects) {
    console.log('📝 SQL Commands to remove test/incomplete projects:');
    console.log('='.repeat(60));
    
    testProjects.forEach((project, index) => {
      console.log(`-- ${index + 1}. ${project.name} (ID: ${project.id}) - ${project.reason}`);
      console.log(`DELETE FROM "Project" WHERE id = ${project.id};`);
      if (index < testProjects.length - 1) {
        console.log('');
      }
    });

    console.log('\n💡 Execute these SQL commands in your database to remove test projects.');
    console.log('⚠️  Make sure to backup your database before running these commands!');
    
    return testProjects.map(p => `DELETE FROM "Project" WHERE id = ${p.id};`);
  }

  async run() {
    const args = process.argv.slice(2);
    const generateSQL = args.includes('--sql');

    try {
      console.log('🚀 Starting test project cleanup analysis...\n');
      
      const testProjects = await this.analyzeTestProjects();
      
      if (testProjects.length === 0) {
        console.log('✅ No test projects found! Database is clean.');
        return;
      }

      if (generateSQL) {
        this.generateCleanupSQL(testProjects);
      } else {
        console.log('\n💡 To generate SQL cleanup commands, run:');
        console.log('   node scripts/cleanup-test-projects.js --sql');
        console.log('\n💡 This will remove test projects and incomplete entries');
      }

      return {
        testCount: testProjects.length,
        testProjects: testProjects.map(p => ({ 
          id: p.id, 
          name: p.name, 
          slug: p.slug, 
          reason: p.reason 
        }))
      };

    } catch (error) {
      console.error('❌ Cleanup analysis failed:', error.message);
    }
  }
}

// Run cleanup
if (require.main === module) {
  const cleanup = new TestProjectCleanup();
  cleanup.run().catch(console.error);
}

module.exports = { TestProjectCleanup };
