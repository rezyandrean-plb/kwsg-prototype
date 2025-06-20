export interface UnitType {
  type: string
  size: string
  price: string
}

export interface FloorPlan {
  type: string
  image: string
}

export interface LocationItem {
  name: string
  distance: string
}

export interface LocationAnalytics {
  mrt: LocationItem[]
  schools: LocationItem[]
  amenities: LocationItem[]
  parks: LocationItem[]
}

export interface MediaReview {
  source: string
  date: string
  title: string
  excerpt: string
  rating: number
}

export interface SimilarProject {
  name: string
  location: string
  price: string
  priceRange: string
  image: string
  units: string
  unitsAvailable: string
  propertySizeRange: string
  developer: string
  completion: string
  slug: string
  type: string
  coordinates: { lat: number; lng: number }
}

export interface Agent {
  name: string
  role: string
  phone: string
  whatsapp: string
  email: string
  image: string
  company: string
  license: string
  experience: string
  languages: string[]
  specialties: string[]
}

export interface MoatData {
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

export interface GooglePlace {
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
  moat?: MoatData
  agent?: Agent
}

// Additional types for project listing/overview
export interface ProjectOverview {
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