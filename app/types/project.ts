export interface UnitType {
  type: string
  size: string
  price: string
}

export interface FloorPlan {
  type: string
  image: string
}

export interface LocationAnalytics {
  mrt: Array<{ name: string; distance: string }>
  schools: Array<{ name: string; distance: string }>
  amenities: Array<{ name: string; distance: string }>
  parks: Array<{ name: string; distance: string }>
}

export interface MediaReview {
  source: string
  date: string
  title: string
  excerpt: string
  rating: number
}

export interface SimilarProject {
  id: string
  slug: string
  title: string
  location: string
  price: string
  image: string
  beds: number
  baths: number
  size: string
}

export interface Project {
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
} 