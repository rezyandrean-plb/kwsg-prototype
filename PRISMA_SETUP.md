# Prisma Database Setup

This guide will help you set up Prisma with PostgreSQL to replace the Strapi API for the projects data.

## Prerequisites

1. PostgreSQL database access (already configured)
2. Node.js and bun installed

## Setup Steps

### 1. Install Prisma Dependencies

Since bun has issues with Prisma installation, you can try these alternatives:

**Option A: Use npm for Prisma only**
```bash
npm install prisma @prisma/client
```

**Option B: Use yarn**
```bash
yarn add prisma @prisma/client
```

**Option C: Install tsx for running TypeScript scripts**
```bash
bun add -D tsx
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with:

```env
# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=kw-1.cspkrkicfu7p.ap-southeast-1.rds.amazonaws.com
DATABASE_PORT=5432
DATABASE_NAME=kwsg
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=kwpostgres
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false

# Prisma
DATABASE_URL="postgresql://postgres:kwpostgres@kw-1.cspkrkicfu7p.ap-southeast-1.rds.amazonaws.com:5432/kwsg-gigeconomy?sslmode=require"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Push Database Schema

```bash
npx prisma db push
```

### 5. Migrate Data from Strapi

```bash
# If using npm
npm run db:seed

# If using bun with tsx
bun run db:seed
```

### 6. Test the New API

Start your development server:

```bash
bun dev
```

The new API endpoint will be available at:
- `http://localhost:3000/api/projects-prisma`

## API Endpoints

### GET /api/projects-prisma

Query parameters:
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 8)
- `search` - Search query
- `sort` - Sort order (created_at:desc, price:asc, price:desc, completion:asc)
- `districts[]` - Filter by districts
- `tenures[]` - Filter by tenures
- `propertyTypes[]` - Filter by property types
- `statuses[]` - Filter by status
- `bedrooms[]` - Filter by bedrooms
- `priceMin` - Minimum price
- `priceMax` - Maximum price

Example:
```
GET /api/projects-prisma?page=1&pageSize=8&search=marina&districts[]=1&districts[]=2
```

## Database Schema

The `projects` table includes all the fields from the Strapi API:

- Basic info: `id`, `name`, `project_name`, `slug`, `title`
- Location: `location`, `address`, `district`, `latitude`, `longitude`
- Property details: `type`, `property_type`, `bedrooms`, `bathrooms`, `size`
- Pricing: `price`, `price_from`, `display_price`, `price_per_sqft`
- Development: `developer`, `completion`, `status`, `units`, `total_units`
- Additional: `description`, `features`, `tenure`, `image_url_banner`, etc.

## Performance Benefits

1. **Direct Database Access**: No external API calls
2. **Better Query Performance**: Optimized PostgreSQL queries
3. **Reduced Latency**: Local database connection
4. **Better Caching**: Can implement Redis caching if needed
5. **Type Safety**: Full TypeScript support with Prisma

## Troubleshooting

### Prisma Installation Issues

If bun continues to have issues with Prisma:

1. Use npm for Prisma installation only:
   ```bash
   npm install prisma @prisma/client
   ```

2. Use bun for everything else:
   ```bash
   bun install
   ```

### Database Connection Issues

1. Verify your database credentials
2. Check if the database is accessible from your network
3. Ensure SSL is properly configured

### Migration Issues

1. Check the Strapi API is accessible
2. Verify the database schema matches the Prisma schema
3. Check for any data type mismatches

## Next Steps

1. Test the new API thoroughly
2. Update any other components that use the old Strapi API
3. Consider adding Redis caching for better performance
4. Set up database backups
5. Monitor query performance and add indexes as needed






