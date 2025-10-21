# S3 CSV Sync Setup Guide

This guide explains how to set up automated daily sync of project data from S3 CSV files to your PostgreSQL database.

## Overview

The system automatically syncs the following data types from S3 CSV files to your database:

1. **Projects** - Main project information
2. **Unit Pricing** - Unit pricing and availability data
3. **Floor Plans** - Floor plan images and details
4. **Facilities** - Project facilities and amenities
5. **Project Facilities** - Project-facility relationships
6. **Image Galleries** - Project image galleries
7. **Site Plans** - Site plan images and layouts

## S3 Bucket Structure

Your S3 bucket should contain the following CSV files:

```
your-bucket-name/
├── projects.csv
├── unit-pricing.csv
├── floor-plans.csv
├── facilities.csv
├── project-facilities.csv
├── image-galleries.csv
└── site-plans.csv
```

## Environment Variables

Add these environment variables to your `.env.local`:

```bash
# Database Configuration
DATABASE_URL="postgresql://postgres:kwpostgres@kw-1.cspkrkicfu7p.ap-southeast-1.rds.amazonaws.com:5432/postgres?sslmode=require"

# S3 Configuration (for KW Singapore bucket)
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# Cron Security (optional)
CRON_SECRET=your-secret-key-for-cron-authentication
```

**Note:** The S3 bucket name (`kwsingapore`) and CSV file paths are hardcoded in the service to match your specific setup:
- Projects: `new_launch_data/projects.csv`
- Units: `new_launch_data/units.csv`
- Floor Plans: `new_launch_data/floor_plans.csv`
- Site Plans: `new_launch_data/site_plans.csv`

## CSV File Formats

### 1. projects.csv
```csv
id,name,project_name,slug,title,location,address,type,price,price_from,price_per_sqft,bedrooms,bathrooms,size,units,developer,completion,description,district,tenure,property_type,status,total_units,total_floors,site_area,image_url_banner,latitude,longitude,features
394,Normanton Park,Normanton Park,normanton-park,Normanton Park,D05,Normanton Park,Residential,$805,860 - $3,362,615,$805,860,,,20,Kingsford Huray Development Pte Ltd,2023-12-30,Project located in D05. d,D05,99 Years,Residential,Active,1862,,,https://img.singmap.com/upload/...,1.287544,103.792922,"[""feature1"",""feature2""]"
```

### 2. unit-pricing.csv
```csv
id,project_id,project_name,unit_type,bedrooms,bathrooms,size_sqft,price_from,price_to,price_per_sqft,currency,payment_terms,discount_info,is_available,available_unit,total_unit
1,394,Normanton Park,1 Bedroom,1,1,500,805860,1200000,1611.72,SGD,Early Bird Discount,5% off for first 50 units,true,45,50
2,394,Normanton Park,2 Bedroom,2,2,800,1200000,1800000,2250.00,SGD,Early Bird Discount,5% off for first 50 units,true,38,45
```

### 3. floor-plans.csv
```csv
id,project_id,project_name,floor_plan_id,floor_plan_type,floor_plan_name,bedrooms,bathrooms,size_sqft,price,img,floor_plan_image,unit_type,description
1,394,Normanton Park,26835e67a63f48aeb31750a3e8385a17,1 Bedroom,1BR-a,1,1,500,,https://img.singmap.com/upload/...,,1 Bedroom,Compact 1 bedroom unit
2,394,Normanton Park,26835e67a63f48aeb31750a3e8385a17,2 Bedroom,2BR-Cb,2,2,800,,https://img.singmap.com/upload/...,,2 Bedroom,Spacious 2 bedroom unit
```

### 4. facilities.csv
```csv
id,name,description,icon
1,Swimming Pool,50m Olympic size swimming pool,pool-icon.svg
2,Gymnasium,24/7 fitness center with modern equipment,gym-icon.svg
3,BBQ Area,Outdoor BBQ facilities for residents,bbq-icon.svg
```

### 5. project-facilities.csv
```csv
id,project_id,facility_id
1,394,1
2,394,2
3,394,3
```

### 6. image-galleries.csv
```csv
id,project_id,project_name,image_url,display_order,is_active,alt_text,image_category,is_featured
1,394,Normanton Park,https://img.singmap.com/upload/...,1,true,Project exterior view,exterior,true
2,394,Normanton Park,https://img.singmap.com/upload/...,2,true,Swimming pool area,amenities,false
```

### 7. site-plans.csv
```csv
id,project_id,project_name,site_plan_id,site_plan_name,image_url,description,is_primary,layout_info
1,394,Normanton Park,26835e67a63f48aeb31750a3e8385a17,14b4c05e3aa04e4b9911cd0ba0f85df7,https://img.singmap.com/upload/...,Main site plan,true,Residential towers with amenities
```

## API Endpoints

### Manual Sync
```bash
# Trigger manual sync
curl -X POST http://localhost:3000/api/sync/projects

# Or GET request
curl http://localhost:3000/api/sync/projects
```

### Test Sync
```bash
# Test sync with detailed output
curl http://localhost:3000/api/test-sync
```

### Cron Sync
```bash
# Cron endpoint (runs daily at 2 AM UTC)
curl -X GET http://localhost:3000/api/cron/sync-projects
```

### Optimized API Endpoints

#### Projects List (Prisma-based)
```bash
# Get all projects with pagination
curl "http://localhost:3000/api/projects-prisma?page=1&limit=20"

# Search projects
curl "http://localhost:3000/api/projects-prisma?search=normanton&location=D05"

# Filter by type and status
curl "http://localhost:3000/api/projects-prisma?type=Residential&status=Active"

# Sort by price
curl "http://localhost:3000/api/projects-prisma?sortBy=price_from&sortOrder=asc"
```

#### Individual Project (Prisma-based)
```bash
# Get project by ID
curl http://localhost:3000/api/projects-prisma/394

# Get project by slug
curl http://localhost:3000/api/projects-prisma/normanton-park
```

## Automated Scheduling

The system is configured to run daily at 2 AM UTC via Vercel Cron. The schedule is defined in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/sync-projects",
      "schedule": "0 2 * * *"
    }
  ]
}
```

## Data Sync Process

1. **Download CSV files** from S3 bucket
2. **Parse CSV data** using csv-parser
3. **Upsert data** to PostgreSQL database (insert new, update existing)
4. **Handle errors** gracefully with detailed logging
5. **Return sync results** with counts and error details

## Error Handling

The sync process includes comprehensive error handling:

- Individual record errors don't stop the entire sync
- Detailed error logging for debugging
- Fallback to cached data if S3 is unavailable
- Graceful degradation if specific tables don't exist

## Monitoring

Monitor sync results by checking:

1. **API response** - Returns detailed sync results
2. **Server logs** - Detailed logging of sync process
3. **Database records** - Verify data is being updated
4. **Vercel Cron logs** - Check scheduled execution

## Testing

Test the sync process:

```bash
# Test manual sync
curl -X POST http://localhost:3000/api/sync/projects

# Check sync results
curl http://localhost:3000/api/projects-prisma/normanton-park | jq '.data.unitPricing | length'
```

## Troubleshooting

### Common Issues

1. **S3 Access Denied**
   - Check AWS credentials
   - Verify bucket permissions
   - Ensure CSV files exist

2. **CSV Parse Errors**
   - Check CSV format
   - Verify column headers
   - Ensure proper encoding (UTF-8)

3. **Database Errors**
   - Check database connection
   - Verify table schemas
   - Check data types match

4. **Cron Not Running**
   - Check Vercel deployment
   - Verify cron configuration
   - Check environment variables

### Debug Commands

```bash
# Check environment variables
echo $S3_BUCKET_NAME
echo $AWS_ACCESS_KEY_ID

# Test S3 access
aws s3 ls s3://your-bucket-name/

# Check database connection
npx prisma db pull
```

## Security

- Use environment variables for sensitive data
- Set up proper S3 bucket policies
- Use CRON_SECRET for cron authentication
- Limit AWS IAM permissions to required actions only

## Performance

- CSV files are cached for 5 minutes
- Batch processing for large datasets
- Efficient upsert operations
- Minimal memory usage with streaming CSV parsing
