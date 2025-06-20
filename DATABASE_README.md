# KWSG Project Database Documentation

## Overview

This PostgreSQL database is designed to handle comprehensive real estate project data for the KWSG (KW Singapore) platform. It includes support for project details, unit availability, AI MOAT analysis, agent information, and related data structures.

## Database Schema

### Core Tables

#### 1. **projects** - Main project information
- `id` (UUID) - Primary key
- `name`, `project_name`, `title` - Project names
- `slug` - URL-friendly identifier
- `location`, `address` - Location details
- `price`, `price_from`, `price_per_sqft` - Pricing information
- `bedrooms`, `bathrooms`, `size` - Unit specifications
- `developer_id` - Reference to developers table
- `completion` - Expected completion date
- `description` - Detailed project description
- `district` - Singapore district number
- `tenure` - Property tenure (Freehold/Leasehold)
- `total_units`, `total_floors`, `site_area` - Project specifications
- `latitude`, `longitude` - GPS coordinates
- `agent_id` - Reference to assigned agent

#### 2. **agents** - Property agent information
- `name`, `role` - Agent details
- `phone`, `whatsapp`, `email` - Contact information
- `image_url` - Agent photo
- `company`, `license` - Professional details
- `experience` - Years of experience
- `languages[]` - Array of spoken languages
- `specialties[]` - Array of specializations

#### 3. **unit_availability** - Detailed unit pricing and availability
- `unit_type` - Type of unit (1 Bedroom, 2 Bedroom, etc.)
- `subtype` - Specific subtype (e.g., "1 BEDROOM+STUDY")
- `size` - Unit size range
- `price` - Price range
- `total_units` - Total units of this type
- `available_units` - Currently available units
- `status_percentage` - Availability percentage

#### 4. **moat_data** - AI MOAT analysis scores
- `exit_audience` - Exit audience score (1-5)
- `district_disparity_effect` - District disparity effect
- `mrt_proximity` - MRT proximity score
- `parents_attraction_effect` - Parents attraction effect
- `quantum_effect` - Quantum effect score
- `rental_demand` - Rental demand score
- `region_disparity_effect` - Region disparity effect
- `volume_effect` - Volume effect score
- `balas_curve_effect` - Balas curve effect
- `landsize_density` - Land size density score

### Supporting Tables

- **developers** - Developer companies
- **property_types** - Property types (Condominium, Mixed Development, etc.)
- **project_statuses** - Project statuses (Launching Soon, New Launch, etc.)
- **features** - Project features (Freehold, Luxury finishes, etc.)
- **facilities** - Project facilities (Gym, Pool, etc.)
- **project_images** - Project gallery images
- **unit_types** - Basic unit type information
- **floor_plans** - Detailed floor plan data
- **location_points** - Nearby amenities (MRT, schools, etc.)
- **media_reviews** - Media reviews and ratings
- **similar_projects** - Similar project relationships

## Setup Instructions

### 1. Install PostgreSQL
```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS (using Homebrew)
brew install postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

### 2. Create Database
```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE kwsg_projects;

# Create user (optional)
CREATE USER kwsg_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE kwsg_projects TO kwsg_user;

# Exit
\q
```

### 3. Run Schema
```bash
# Connect to the database
psql -U kwsg_user -d kwsg_projects -f schema.sql
```

### 4. Verify Setup
```bash
# Connect to database
psql -U kwsg_user -d kwsg_projects

# Check tables
\dt

# Check sample data
SELECT name, slug, location, price FROM projects LIMIT 5;
```

## Usage Examples

### Basic Project Queries

#### Get project by slug
```sql
SELECT * FROM projects WHERE slug = '10-evelyn';
```

#### Get project with all related data
```sql
SELECT 
    p.*,
    d.name as developer_name,
    a.name as agent_name,
    a.phone as agent_phone
FROM projects p
LEFT JOIN developers d ON p.developer_id = d.id
LEFT JOIN agents a ON p.agent_id = a.id
WHERE p.slug = '10-evelyn';
```

#### Get project images
```sql
SELECT image_url, display_order 
FROM project_images 
WHERE project_id = (SELECT id FROM projects WHERE slug = '10-evelyn')
ORDER BY display_order;
```

### Unit Availability Queries

#### Get available units
```sql
SELECT 
    unit_type,
    subtype,
    size,
    price,
    available_units,
    ROUND((available_units::DECIMAL / total_units * 100), 1) as availability_percentage
FROM unit_availability
WHERE project_id = (SELECT id FROM projects WHERE slug = '10-evelyn')
AND available_units > 0
ORDER BY unit_type;
```

#### Get unit mix summary
```sql
SELECT 
    unit_type,
    SUM(total_units) as total_units,
    SUM(available_units) as available_units,
    ROUND((SUM(available_units)::DECIMAL / SUM(total_units) * 100), 1) as availability_percentage
FROM unit_availability
WHERE project_id = (SELECT id FROM projects WHERE slug = '10-evelyn')
GROUP BY unit_type
ORDER BY unit_type;
```

### AI MOAT Analysis Queries

#### Get MOAT scores
```sql
SELECT 
    project_name,
    exit_audience,
    mrt_proximity,
    rental_demand,
    ROUND((exit_audience + district_disparity_effect + mrt_proximity + 
           parents_attraction_effect + quantum_effect + rental_demand + 
           region_disparity_effect + volume_effect + balas_curve_effect + 
           landsize_density) / 10, 2) as overall_moat_score
FROM moat_data
WHERE project_id = (SELECT id FROM projects WHERE slug = '10-evelyn');
```

#### Get projects with high MOAT scores
```sql
SELECT 
    p.name,
    p.slug,
    p.location,
    ROUND((md.exit_audience + md.district_disparity_effect + md.mrt_proximity + 
           md.parents_attraction_effect + md.quantum_effect + md.rental_demand + 
           md.region_disparity_effect + md.volume_effect + md.balas_curve_effect + 
           md.landsize_density) / 10, 2) as overall_moat_score
FROM projects p
JOIN moat_data md ON p.id = md.project_id
WHERE (md.exit_audience + md.district_disparity_effect + md.mrt_proximity + 
       md.parents_attraction_effect + md.quantum_effect + md.rental_demand + 
       md.region_disparity_effect + md.volume_effect + md.balas_curve_effect + 
       md.landsize_density) / 10 >= 4.0
ORDER BY overall_moat_score DESC;
```

### Location and Amenity Queries

#### Get nearby amenities
```sql
SELECT 
    name,
    distance,
    type,
    CASE type
        WHEN 'mrt' THEN '🚇'
        WHEN 'school' THEN '🏫'
        WHEN 'amenity' THEN '🏪'
        WHEN 'park' THEN '🌳'
        ELSE '📍'
    END as icon
FROM location_points
WHERE project_id = (SELECT id FROM projects WHERE slug = '10-evelyn')
ORDER BY type, name;
```

#### Get projects near MRT
```sql
SELECT 
    p.name,
    p.slug,
    p.location,
    lp.name as nearest_mrt,
    lp.distance
FROM projects p
JOIN location_points lp ON p.id = lp.project_id
WHERE lp.type = 'mrt' 
AND (lp.distance LIKE '%300m%' OR lp.distance LIKE '%400m%' OR lp.distance LIKE '%500m%')
ORDER BY p.name;
```

### Search and Filter Queries

#### Search by price range
```sql
SELECT 
    name,
    slug,
    location,
    price,
    price_per_sqft
FROM projects
WHERE CAST(REPLACE(REPLACE(price_from, ',', ''), '$', '') AS INTEGER) 
BETWEEN 1000000 AND 3000000
ORDER BY CAST(REPLACE(REPLACE(price_from, ',', ''), '$', '') AS INTEGER);
```

#### Search by district
```sql
SELECT 
    name,
    slug,
    location,
    price,
    total_units
FROM projects
WHERE district = '11'
ORDER BY name;
```

#### Search by property type
```sql
SELECT 
    p.name,
    p.slug,
    p.location,
    p.price,
    pt.name as property_type
FROM projects p
JOIN property_types pt ON p.property_type_id = pt.id
WHERE pt.name = 'Condominium'
ORDER BY p.name;
```

### Agent and Contact Queries

#### Get agent details
```sql
SELECT 
    a.name,
    a.role,
    a.phone,
    a.email,
    a.whatsapp,
    a.company,
    a.languages,
    a.specialties,
    COUNT(p.id) as assigned_projects
FROM agents a
LEFT JOIN projects p ON a.id = p.agent_id
GROUP BY a.id, a.name, a.role, a.phone, a.email, a.whatsapp, a.company, a.languages, a.specialties
ORDER BY a.name;
```

#### Get projects by agent
```sql
SELECT 
    p.name,
    p.slug,
    p.location,
    p.price,
    a.name as agent_name,
    a.phone as agent_phone
FROM projects p
JOIN agents a ON p.agent_id = a.id
WHERE a.name = 'Sarah Chen'
ORDER BY p.name;
```

## API Integration

### Example Node.js/Express Integration

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'kwsg_user',
  host: 'localhost',
  database: 'kwsg_projects',
  password: 'your_password',
  port: 5432,
});

// Get project by slug
async function getProjectBySlug(slug) {
  const query = `
    SELECT 
      p.*,
      d.name as developer_name,
      pt.name as property_type,
      ps.name as status,
      a.name as agent_name,
      a.phone as agent_phone,
      a.email as agent_email
    FROM projects p
    LEFT JOIN developers d ON p.developer_id = d.id
    LEFT JOIN property_types pt ON p.property_type_id = pt.id
    LEFT JOIN project_statuses ps ON p.status_id = ps.id
    LEFT JOIN agents a ON p.agent_id = a.id
    WHERE p.slug = $1
  `;
  
  const result = await pool.query(query, [slug]);
  return result.rows[0];
}

// Get unit availability
async function getUnitAvailability(projectId) {
  const query = `
    SELECT 
      unit_type,
      subtype,
      size,
      price,
      total_units,
      available_units,
      status_percentage
    FROM unit_availability
    WHERE project_id = $1
    ORDER BY unit_type
  `;
  
  const result = await pool.query(query, [projectId]);
  return result.rows;
}

// Get MOAT data
async function getMoatData(projectId) {
  const query = `
    SELECT * FROM moat_data WHERE project_id = $1
  `;
  
  const result = await pool.query(query, [projectId]);
  return result.rows[0];
}
```

## Data Maintenance

### Adding New Projects

```sql
-- Insert new project
INSERT INTO projects (
    name, project_name, slug, title, location, address, type,
    price, price_from, price_per_sqft, bedrooms, bathrooms, size,
    units, developer_id, completion, description, district,
    tenure, property_type_id, status_id, total_units, total_floors,
    site_area, latitude, longitude, agent_id
) VALUES (
    'New Project', 'New Project', 'new-project', 'New Project',
    'District 9', '123 New Street, Singapore 123456', 'Condominium',
    'From $2.0M', '2000000', '$2,500 - $3,000 psf', '1-4', '1-3',
    '500 - 1,500 sq ft', '200 Units', 1, '2026',
    'New luxury development...', '9', 'Freehold', 1, 1,
    '200 Units', '25 Floors', '15,000 sq ft', 1.3000, 103.8000, 1
);
```

### Updating Project Data

```sql
-- Update project price
UPDATE projects 
SET price = 'From $2.2M', price_from = '2200000'
WHERE slug = '10-evelyn';

-- Update unit availability
UPDATE unit_availability 
SET available_units = 45, status_percentage = 66
WHERE project_id = (SELECT id FROM projects WHERE slug = '10-evelyn')
AND unit_type = '1 Bedroom Units';
```

### Backup and Restore

```bash
# Create backup
pg_dump -U kwsg_user -d kwsg_projects > kwsg_backup.sql

# Restore from backup
psql -U kwsg_user -d kwsg_projects < kwsg_backup.sql
```

## Performance Optimization

### Indexes
The database includes indexes on frequently queried columns:
- `projects.slug` - For project lookups
- `projects.location` - For location-based searches
- `projects.district` - For district filtering
- `unit_availability.project_id` - For unit availability queries
- `moat_data.project_id` - For MOAT analysis queries

### Query Optimization Tips

1. **Use indexes**: Always query on indexed columns when possible
2. **Limit results**: Use `LIMIT` for large result sets
3. **Select specific columns**: Avoid `SELECT *` for large tables
4. **Use JOINs efficiently**: Ensure proper foreign key relationships
5. **Monitor query performance**: Use `EXPLAIN ANALYZE` for slow queries

## Troubleshooting

### Common Issues

1. **Connection refused**: Check if PostgreSQL service is running
2. **Permission denied**: Verify user permissions and database access
3. **UUID extension missing**: Ensure `uuid-ossp` extension is installed
4. **Foreign key violations**: Check referential integrity when inserting data

### Useful Commands

```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('kwsg_projects'));

-- Check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

## Support

For database-related issues or questions:
1. Check the PostgreSQL documentation
2. Review the query examples in `database_queries.sql`
3. Monitor database logs for errors
4. Use `EXPLAIN ANALYZE` for query performance analysis 