# CSV Database Sync Setup

This document explains how to set up CSV import/export and daily sync with S3 for your database.

## Features

- **Replace All Data**: Completely replace database with CSV data from S3
- **Smart Sync**: Sync database with S3 CSV (create, update, delete based on slug)
- **Export**: Export current database to CSV and upload to S3
- **Daily Automation**: Automatic daily sync using Vercel Cron Jobs
- **API Endpoints**: RESTful API for all sync operations

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# AWS S3 Configuration
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key-id"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"

# S3 Bucket and CSV Configuration
S3_BUCKET_NAME="your-bucket-name"
S3_CSV_KEY="projects.csv"

# Cron Job Security
CRON_SECRET="your-secure-random-string"

# Cron Notifications (comma-separated list)
CRON_NOTIFICATION_EMAILS="team@example.com,ops@example.com"
```

## Installation

1. Install dependencies:
```bash
npm install
# or
bun install
```

2. Set up your environment variables

3. Deploy to Vercel (for cron jobs to work)

## Usage

### API Endpoints

#### 1. Replace All Data
```bash
POST /api/sync/replace
Content-Type: application/json

{
  "bucketName": "your-bucket",
  "csvKey": "projects.csv"
}
```

#### 2. Sync Database (Smart Update)
```bash
POST /api/sync/sync
Content-Type: application/json

{
  "bucketName": "your-bucket",
  "csvKey": "projects.csv"
}
```

#### 3. Export Database to S3
```bash
POST /api/sync/export
Content-Type: application/json

{
  "bucketName": "your-bucket",
  "csvKey": "projects.csv"
}
```

#### 4. Get Sync Status
```bash
GET /api/sync/status?bucketName=your-bucket&csvKey=projects.csv
```

### Command Line Scripts

#### Replace All Data
```bash
tsx scripts/replace-database.ts your-bucket projects.csv
```

#### Sync Database
```bash
tsx scripts/sync-database.ts your-bucket projects.csv
```

### Daily Automation

The system automatically syncs daily at 2:00 AM UTC using Vercel Cron Jobs. The cron job calls `/api/cron/sync-daily` endpoint.

## CSV Format

Your CSV should have the following columns (all optional):

```csv
id,name,project_name,slug,title,location,address,type,price,price_from,price_per_sqft,bedrooms,bathrooms,size,units,developer,completion,description,district,tenure,property_type,status,total_units,total_floors,site_area,image_url_banner,latitude,longitude,document_id,locale,features
```

### Important Notes:

1. **slug** is used as the unique identifier for sync operations
2. **features** should be a JSON string if provided
3. **id** is optional - if not provided, auto-increment will be used
4. All fields are optional except for the sync identifier

## Sync Behavior

### Replace All Data
- Deletes ALL existing projects
- Inserts all projects from CSV
- Use with caution!

### Smart Sync
- Creates new projects not in database
- Updates existing projects (matched by slug)
- Deletes projects not in CSV
- Preserves created_at timestamps for existing projects

## Security

- Cron jobs are protected with `CRON_SECRET` environment variable
- API endpoints should be protected with authentication in production
- S3 credentials should have minimal required permissions

## Monitoring

Check the sync status using the status endpoint or monitor Vercel function logs for cron job execution.

## Troubleshooting

1. **S3 Access Issues**: Verify AWS credentials and bucket permissions
2. **CSV Parsing Errors**: Check CSV format and encoding
3. **Database Errors**: Ensure database connection and schema are correct
4. **Cron Job Not Running**: Verify Vercel deployment and cron configuration

## Example CSV

```csv
id,name,project_name,slug,title,location,address,type,price,price_from,price_per_sqft,bedrooms,bathrooms,size,units,developer,completion,description,district,tenure,property_type,status,total_units,total_floors,site_area,image_url_banner,latitude,longitude,document_id,locale,features
1,Marina Bay Residences,Marina Bay Residences,marina-bay-residences,Marina Bay Residences,Marina Bay,1 Marina Bay,Residential,2000000,1800000,2500,3,2,1200,500,Marina Development,2025,Luxury waterfront living,01,Freehold,Condominium,Launch,500,30,50000,https://example.com/image.jpg,1.2795,103.8545,doc123,en,"[""Pool"",""Gym"",""Parking""]"
```






