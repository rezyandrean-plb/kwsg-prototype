# Project Details API Documentation

## Overview
This documentation covers the API endpoints and payload structures for the project details system, including project information, analytics, and related data.

## Base URL
```
https://api.kwsg.com/v1
```

## Authentication
All endpoints require authentication using Bearer token:
```
Authorization: Bearer <your-token>
```

---

## 1. Get Project Details

### Endpoint
```
GET /projects/{slug}
```

### Response Schema
```typescript
{
  success: boolean
  data: Project
  message?: string
}
```

### Project Object Schema
```typescript
{
  id: number
  name: string
  project_name: string
  slug: string
  title: string
  location: string
  address: string
  type: string
  price: string
  priceFrom: string
  pricePerSqFt: string
  bedrooms: string
  bathrooms: string
  size: string
  images: string[]
  units: string
  developer: string
  completion: string
  description: string
  features: string[]
  district: string
  tenure: string
  propertyType: string
  status: string
  totalUnits: string
  totalFloors: string
  siteArea: string
  latitude: number
  longitude: number
  unitTypes: UnitType[]
  floorPlans: FloorPlan[]
  locationAnalytics: LocationAnalytics
  mediaReviews: MediaReview[]
  similarProjects: SimilarProject[]
  moat?: MoatData
  agent?: Agent
}
```

### Example Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "10 Evelyn",
    "project_name": "10 Evelyn",
    "slug": "10-evelyn",
    "title": "10 Evelyn",
    "location": "Newton, District 11",
    "address": "10 Evelyn Road, Singapore 308318",
    "type": "Condominium",
    "price": "From $1.2M",
    "priceFrom": "1200000",
    "pricePerSqFt": "$2,100 - $2,400 psf",
    "bedrooms": "1-4",
    "bathrooms": "1-3",
    "size": "484 - 1,636 sq ft",
    "images": [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
    ],
    "units": "56 Units",
    "developer": "Amara Holdings",
    "completion": "2025",
    "description": "10 Evelyn is a prestigious freehold development...",
    "features": ["Freehold", "Luxury finishes", "Prime location", "Full facilities"],
    "district": "11",
    "tenure": "Freehold",
    "propertyType": "Condominium",
    "status": "Launching Soon",
    "totalUnits": "56 Units",
    "totalFloors": "24 Floors",
    "siteArea": "12,000 sq ft",
    "latitude": 1.2834,
    "longitude": 103.8598,
    "unitTypes": [
      {
        "type": "1 Bedroom",
        "size": "484 - 527 sq ft",
        "price": "From $1.2M"
      }
    ],
    "floorPlans": [
      {
        "type": "1 Bedroom",
        "image": "/placeholder.svg?height=400&width=600&text=1+Bedroom+Floor+Plan"
      }
    ],
    "locationAnalytics": {
      "mrt": [
        {
          "name": "Newton MRT",
          "distance": "300m"
        }
      ],
      "schools": [
        {
          "name": "Anglo-Chinese School (Junior)",
          "distance": "400m"
        }
      ],
      "amenities": [
        {
          "name": "United Square",
          "distance": "250m"
        }
      ],
      "parks": [
        {
          "name": "Newton Green",
          "distance": "150m"
        }
      ]
    },
    "mediaReviews": [
      {
        "source": "The Edge Property",
        "date": "2024-02-15",
        "title": "10 Evelyn: A Rare Freehold Gem in Newton",
        "excerpt": "The development offers a unique opportunity...",
        "rating": 4.5
      }
    ],
    "similarProjects": [
      {
        "name": "The Avenir",
        "location": "River Valley",
        "price": "From $2.5M",
        "priceRange": "$2.5M - $4.8M",
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
        "units": "376 Units",
        "unitsAvailable": "376 Units",
        "propertySizeRange": "614 - 1,862 sqft",
        "developer": "Hong Leong Group",
        "completion": "2025",
        "slug": "the-avenir",
        "type": "Luxury Condominium",
        "coordinates": {
          "lat": 1.3521,
          "lng": 103.8198
        }
      }
    ],
    "moat": {
      "project": "10 Evelyn",
      "exitAudience": 4.2,
      "districtDisparityEffect": 3.8,
      "mrtProximity": 4.5,
      "parentsAttractionEffect": 3.9,
      "quantumEffect": 4.1,
      "rentalDemand": 4.3,
      "regionDisparityEffect": 4.0,
      "volumeEffect": 3.7,
      "balasCurveEffect": 4.4,
      "landsizeDensity": 3.6
    },
    "agent": {
      "name": "John Smith",
      "role": "Senior Property Consultant",
      "phone": "+65 9123 4567",
      "whatsapp": "+65 9123 4567",
      "email": "john.smith@kwsg.com",
      "image": "/images/agents/john-smith.jpg",
      "company": "KW Singapore",
      "license": "R123456A",
      "experience": "8 years",
      "languages": ["English", "Mandarin", "Malay"],
      "specialties": ["Luxury Condominiums", "District 11", "Freehold Properties"]
    }
  }
}
```

---

## 2. Get Projects List

### Endpoint
```
GET /projects
```

### Query Parameters
```typescript
{
  page?: number          // Default: 1
  limit?: number         // Default: 20, Max: 100
  district?: string      // Filter by district
  type?: string          // Filter by property type
  status?: string        // Filter by status: 'upcoming' | 'ongoing' | 'completed'
  priceMin?: number      // Minimum price
  priceMax?: number      // Maximum price
  search?: string        // Search by name or location
}
```

### Response Schema
```typescript
{
  success: boolean
  data: {
    projects: ProjectOverview[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }
  message?: string
}
```

### ProjectOverview Schema
```typescript
{
  slug: string
  name: string
  location: string
  price: string
  type: string
  image: string
  coordinates: {
    lat: number
    lng: number
  }
  priceRange?: string
  units?: string
  unitsAvailable?: string
  propertySizeRange?: string
  developer?: string
  completion?: string
  description?: string
  pricePerSqFt?: string
  features?: string[]
  status?: 'upcoming' | 'ongoing' | 'completed'
}
```

---

## 3. Get Nearby Amenities

### Endpoint
```
GET /projects/{slug}/amenities
```

### Query Parameters
```typescript
{
  type?: string          // 'mrt' | 'schools' | 'amenities' | 'parks'
  radius?: number        // Search radius in meters (default: 1000)
  limit?: number         // Number of results (default: 10)
}
```

### Response Schema
```typescript
{
  success: boolean
  data: {
    amenities: GooglePlace[]
  }
  message?: string
}
```

### GooglePlace Schema
```typescript
{
  placeId: string
  name: string
  address: string
  location: {
    lat: number
    lng: number
  }
  type: string
  distance: string
  duration: string
  transportMode: string
  isNearest?: boolean
}
```

---

## 4. Submit Contact Form

### Endpoint
```
POST /contact-form
```

### Request Schema
```typescript
{
  name: string
  email: string
  phone: string
  message: string
  projectTitle?: string
  projectSlug?: string
}
```

### Response Schema
```typescript
{
  success: boolean
  message: string
  data?: {
    id: string
    submittedAt: string
  }
}
```

---

## 5. Get Project Analytics (Moat Data)

### Endpoint
```
GET /projects/{slug}/analytics
```

### Response Schema
```typescript
{
  success: boolean
  data: MoatData
  message?: string
}
```

### MoatData Schema
```typescript
{
  project: string
  exitAudience: number
  districtDisparityEffect: number
  mrtProximity: number
  parentsAttractionEffect: number
  quantumEffect: number
  rentalDemand: number
  regionDisparityEffect: number
  volumeEffect: number
  balasCurveEffect: number
  landsizeDensity: number
}
```

---

## 6. Get Similar Projects

### Endpoint
```
GET /projects/{slug}/similar
```

### Query Parameters
```typescript
{
  limit?: number         // Number of similar projects (default: 5)
  radius?: number        // Search radius in km (default: 5)
}
```

### Response Schema
```typescript
{
  success: boolean
  data: {
    similarProjects: SimilarProject[]
  }
  message?: string
}
```

---

## 7. Upload Project Images

### Endpoint
```
POST /projects/{slug}/images
```

### Request Schema (Multipart Form Data)
```typescript
{
  images: File[]          // Array of image files
  type?: string           // 'gallery' | 'floorplan' | 'siteplan'
  description?: string    // Image description
}
```

### Response Schema
```typescript
{
  success: boolean
  data: {
    uploadedImages: {
      id: string
      url: string
      filename: string
      size: number
      type: string
    }[]
  }
  message?: string
}
```

---

## 8. Update Project Details

### Endpoint
```
PUT /projects/{slug}
```

### Request Schema
```typescript
{
  name?: string
  title?: string
  location?: string
  address?: string
  type?: string
  price?: string
  priceFrom?: string
  pricePerSqFt?: string
  bedrooms?: string
  bathrooms?: string
  size?: string
  developer?: string
  completion?: string
  description?: string
  features?: string[]
  district?: string
  tenure?: string
  propertyType?: string
  status?: string
  totalUnits?: string
  totalFloors?: string
  siteArea?: string
  latitude?: number
  longitude?: number
  unitTypes?: UnitType[]
  floorPlans?: FloorPlan[]
  locationAnalytics?: LocationAnalytics
  mediaReviews?: MediaReview[]
  moat?: MoatData
  agent?: Agent
}
```

### Response Schema
```typescript
{
  success: boolean
  data: Project
  message?: string
}
```

---

## Error Responses

### Standard Error Format
```typescript
{
  success: false
  error: {
    code: string
    message: string
    details?: any
  }
}
```

### Common Error Codes
- `400` - Bad Request (Invalid input)
- `401` - Unauthorized (Missing or invalid token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Project not found)
- `422` - Validation Error (Invalid data format)
- `500` - Internal Server Error

### Example Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid project data provided",
    "details": {
      "field": "price",
      "issue": "Price must be a positive number"
    }
  }
}
```

---

## Rate Limiting

- **Standard endpoints**: 100 requests per minute
- **Image upload**: 10 requests per minute
- **Contact form**: 5 requests per minute

Rate limit headers included in response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

---

## Webhooks

### Contact Form Submission Webhook
```typescript
POST /webhooks/contact-form
{
  event: "contact_form.submitted"
  data: {
    id: string
    name: string
    email: string
    phone: string
    message: string
    projectTitle?: string
    projectSlug?: string
    submittedAt: string
  }
}
```

---

## SDK Examples

### JavaScript/TypeScript
```typescript
import { KWAPI } from '@kwsg/api-client'

const api = new KWAPI({
  baseURL: 'https://api.kwsg.com/v1',
  token: 'your-api-token'
})

// Get project details
const project = await api.projects.getBySlug('10-evelyn')

// Get projects list
const projects = await api.projects.list({
  district: '11',
  status: 'ongoing',
  limit: 20
})

// Submit contact form
const contact = await api.contact.submit({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+65 9123 4567',
  message: 'Interested in this project',
  projectSlug: '10-evelyn'
})
```

### cURL Examples
```bash
# Get project details
curl -X GET "https://api.kwsg.com/v1/projects/10-evelyn" \
  -H "Authorization: Bearer your-token"

# Submit contact form
curl -X POST "https://api.kwsg.com/v1/contact-form" \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+65 9123 4567",
    "message": "Interested in this project",
    "projectSlug": "10-evelyn"
  }'
``` 