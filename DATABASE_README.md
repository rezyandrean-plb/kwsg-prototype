# KWSG Property Projects Database

This PostgreSQL database is designed specifically for the KWSG property projects platform, based on the actual TypeScript interfaces from the Next.js project. The schema accurately reflects the data structures used in the frontend components.

## Database Overview

The database contains comprehensive information about property developments in Singapore, including project details, unit types, floor plans, location analytics, media reviews, AI MOAT analysis, agents, and nearby amenities.

## Schema Structure

### Core Tables

#### `projects` - Main project information
- **Primary key**: `id` (SERIAL)
- **Key fields**: 
  - `slug` (UNIQUE) - URL-friendly identifier
  - `title`, `location`, `address` - Basic project info
  - `price_from`, `price_per_sqft` - Pricing information
  - `latitude`, `longitude` - Geographic coordinates
  - `features` (TEXT[]) - Array of project features
  - `status` - Project status (Launching Soon, Available, etc.)

#### `project_images` - Project image gallery
- Links to `projects` via `project_id`
- Supports multiple images per project with display order
- Includes alt text for accessibility

#### `unit_types` - Available unit configurations
- Links to `projects` via `project_id`
- Contains type, size range, and pricing information
- Matches the `UnitType` interface from the frontend

#### `floor_plans` - Floor plan images
- Links to `projects` via `project_id`
- Organized by unit type with display order
- Matches the `FloorPlan` interface from the frontend

#### `location_analytics` - Location-based information
- Links to `projects` via `project_id`
- Categorized by type: 'mrt', 'schools', 'amenities', 'parks'
- Contains name and distance information
- Matches the `LocationAnalytics` interface from the frontend

#### `media_reviews` - Media coverage and reviews
- Links to `projects` via `project_id`
- Includes source, date, title, excerpt, and rating
- Matches the `MediaReview` interface from the frontend

#### `similar_projects` - Related project recommendations
- Links to `projects` via `project_id`
- Contains comprehensive project comparison data
- Includes coordinates for mapping
- Matches the `SimilarProject` interface from the frontend

#### `ai_moat_analysis` - AI-powered market analysis
- Links to `projects` via `project_id`
- Contains 11 different MOAT metrics (0-5 scale)
- Used for the radar chart visualization
- Matches the `moat` object from the `Project` interface

#### `agents` - Property agent information
- Contains comprehensive agent profiles
- Includes contact details, experience, languages, and specialties
- Matches the `Agent` interface from the frontend

#### `project_agents` - Project-agent relationships
- Many-to-many relationship between projects and agents
- Supports primary and secondary agent assignments

#### `unit_availability` - Detailed unit availability data
- Links to `projects` via `project_id`
- Contains unit subtypes, availability counts, and status percentages
- Matches the `unitAvailabilityData` structure from the frontend

#### `nearby_amenities` - Google Places integration
- Links to `projects` via `project_id`
- Contains place details, distances, and transport information
- Supports multiple amenity types (schools, transport, shopping, etc.)
- Matches the `GooglePlace` interface from the frontend

#### `contact_submissions` - Contact form data
- Stores user inquiries about projects
- Includes project title for tracking
- Captures IP address and user agent for analytics

## Data Types and Constraints

### Enums
- `property_type_enum`: Condominium, Apartment, Mixed Development, Luxury Condominium
- `tenure_enum`: Freehold, 99-year Leasehold, 999-year Leasehold
- `status_enum`: Launching Soon, Available, Sold Out, Under Construction, Completed
- `transport_mode_enum`: walking, driving, transit

### Arrays
- `features` (TEXT[]) - Project features
- `languages` (TEXT[]) - Agent languages
- `specialties` (TEXT[]) - Agent specialties

### Constraints
- Rating values: 0-5 scale for reviews and MOAT analysis
- Status percentages: 0-100 for unit availability
- Geographic coordinates: Proper decimal precision for lat/lng

## Sample Data

The database includes comprehensive sample data for 4 projects:

1. **10 Evelyn** - Newton, District 11 (Freehold Condominium)
2. **The Avenir** - River Valley, District 9 (Luxury Condominium)
3. **Midtown Modern** - Bugis, District 7 (Mixed Development)
4. **Marina One Residences** - Marina Bay, District 1 (Luxury Condominium)

Each project includes:
- Multiple high-quality images
- Complete unit type information
- Floor plans for all unit types
- Location analytics (MRT, schools, amenities, parks)
- Media reviews with ratings
- AI MOAT analysis scores
- Similar project recommendations
- Unit availability data
- Assigned agents
- Nearby amenities from Google Places
- Sample contact submissions

## Common Queries

### Get Project by Slug
```sql
SELECT p.*, 
       array_agg(DISTINCT pi.image_url) as images,
       array_agg(DISTINCT ut.type) as unit_types
FROM projects p
LEFT JOIN project_images pi ON p.id = pi.project_id
LEFT JOIN unit_types ut ON p.id = ut.project_id
WHERE p.slug = '10-evelyn'
GROUP BY p.id;
```

### Get Project with All Related Data
```sql
SELECT 
    p.*,
    json_agg(DISTINCT jsonb_build_object(
        'type', ut.type,
        'size', ut.size,
        'price', ut.price
    )) as unit_types,
    json_agg(DISTINCT jsonb_build_object(
        'category', la.category,
        'name', la.name,
        'distance', la.distance
    )) as location_analytics,
    json_agg(DISTINCT jsonb_build_object(
        'source', mr.source,
        'title', mr.title,
        'rating', mr.rating
    )) as media_reviews
FROM projects p
LEFT JOIN unit_types ut ON p.id = ut.project_id
LEFT JOIN location_analytics la ON p.id = la.project_id
LEFT JOIN media_reviews mr ON p.id = mr.project_id
WHERE p.slug = '10-evelyn'
GROUP BY p.id;
```

### Get AI MOAT Analysis
```sql
SELECT * FROM ai_moat_analysis 
WHERE project_id = (SELECT id FROM projects WHERE slug = '10-evelyn');
```

### Get Nearby Amenities by Type
```sql
SELECT * FROM nearby_amenities 
WHERE project_id = (SELECT id FROM projects WHERE slug = '10-evelyn')
AND type = 'transit_station'
ORDER BY distance;
```

### Get Unit Availability
```sql
SELECT * FROM unit_availability 
WHERE project_id = (SELECT id FROM projects WHERE slug = '10-evelyn')
ORDER BY unit_type, subtype;
```

### Get Project Agents
```sql
SELECT a.*, pa.is_primary
FROM agents a
JOIN project_agents pa ON a.id = pa.agent_id
WHERE pa.project_id = (SELECT id FROM projects WHERE slug = '10-evelyn')
ORDER BY pa.is_primary DESC;
```

## API Integration

The database schema is designed to work seamlessly with the Next.js API routes:

### `/api/projects/[slug]`
Returns complete project data including all related information.

### `/api/places`
Returns nearby amenities based on project coordinates and amenity type.

### `/api/contact-form`
Stores contact form submissions with project association.

## Performance Optimization

### Indexes
- Primary keys on all tables
- Foreign key indexes for all relationships
- Slug index for fast project lookups
- Geographic indexes for location-based queries
- Full-text search index on project descriptions

### Query Optimization
- Use appropriate JOINs for related data
- Leverage array operations for features and languages
- Utilize geographic functions for distance calculations
- Implement pagination for large result sets

## Maintenance

### Regular Tasks
1. **Data Updates**: Keep project information current
2. **Image Management**: Ensure image URLs are valid
3. **Amenity Updates**: Refresh nearby amenities data
4. **Contact Cleanup**: Archive old contact submissions
5. **Performance Monitoring**: Monitor query performance

### Backup Strategy
- Daily automated backups
- Point-in-time recovery capability
- Test restore procedures regularly

## Troubleshooting

### Common Issues

1. **Missing Project Data**
   - Check if project exists in `projects` table
   - Verify slug format matches frontend expectations
   - Ensure all required fields are populated

2. **Image Loading Issues**
   - Verify image URLs in `project_images` table
   - Check image accessibility and permissions
   - Ensure proper alt text for accessibility

3. **Location Data Problems**
   - Verify coordinate accuracy in `projects` table
   - Check `nearby_amenities` data freshness
   - Validate distance calculations

4. **Performance Issues**
   - Review query execution plans
   - Check index usage
   - Monitor database connection pool

### Support

For database-related issues:
1. Check the application logs for error messages
2. Verify database connectivity
3. Review query performance with EXPLAIN ANALYZE
4. Contact the development team with specific error details

## Future Enhancements

### Planned Features
1. **Real-time Updates**: WebSocket integration for live data
2. **Advanced Analytics**: Enhanced reporting and insights
3. **Multi-language Support**: Internationalization for project data
4. **Image Optimization**: Automated image processing and optimization
5. **Search Enhancement**: Advanced full-text search capabilities

### Schema Evolution
The database schema is designed to be extensible for future requirements while maintaining backward compatibility with existing applications. 