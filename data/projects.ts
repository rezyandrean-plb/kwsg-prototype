export interface Project {
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

export const projects: Project[] = [
  {
    slug: "marina-bay-residences",
    name: "Marina Bay Residences",
    location: "Marina Bay, District 1",
    price: "From $2.5M",
    priceRange: "$2.5M - $4.8M",
    pricePerSqFt: "$2,200 - $2,600 psf",
    type: "Luxury Condominium",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    coordinates: {
      lat: 1.2833,
      lng: 103.8517
    },
    units: "376 Units",
    unitsAvailable: "376 Units",
    propertySizeRange: "614 - 1,862 sqft",
    developer: "Hong Leong Group",
    completion: "2025",
    description: "Iconic waterfront living in the heart of Marina Bay",
    features: ["Freehold", "Private Pool", "Sky Garden"],
    status: "ongoing"
  },
  {
    slug: "orchard-residences",
    name: "Orchard Residences",
    location: "Orchard Road, District 9",
    price: "From $3.2M",
    priceRange: "$3.2M - $5.8M",
    pricePerSqFt: "$2,800 - $3,200 psf",
    type: "Luxury Condominium",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    coordinates: {
      lat: 1.3047,
      lng: 103.8317
    },
    units: "396 Units",
    unitsAvailable: "396 Units",
    propertySizeRange: "904 - 2,583 sqft",
    developer: "Far East Organization",
    completion: "2025",
    description: "Premium living in the heart of Orchard",
    features: ["Freehold", "Private Lift", "Smart Home"],
    status: "ongoing"
  },
  {
    slug: "sentosa-cove-villas",
    name: "Sentosa Cove Villas",
    location: "Sentosa Cove, District 4",
    price: "From $5.8M",
    priceRange: "$5.8M - $12M",
    pricePerSqFt: "$3,200 - $3,600 psf",
    type: "Luxury Villa",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80",
    coordinates: {
      lat: 1.2458,
      lng: 103.8303
    },
    units: "120 Units",
    unitsAvailable: "120 Units",
    propertySizeRange: "1,076 - 2,885 sqft",
    developer: "M+S Pte Ltd",
    completion: "2025",
    description: "Exclusive waterfront living in Sentosa Cove",
    features: ["Freehold", "Private Pool", "Marina Access"],
    status: "upcoming"
  },
  {
    slug: "holland-village-residences",
    name: "Holland Village Residences",
    location: "Holland Village, District 10",
    price: "From $1.8M",
    priceRange: "$1.8M - $3.2M",
    pricePerSqFt: "$1,800 - $2,200 psf",
    type: "Condominium",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    coordinates: {
      lat: 1.3117,
      lng: 103.7958
    },
    units: "120 Units",
    unitsAvailable: "120 Units",
    propertySizeRange: "527 - 1,302 sqft",
    developer: "Amara Holdings",
    completion: "2025",
    description: "Modern living in the heart of Holland Village",
    features: ["Freehold", "Smart Home", "Rooftop Garden"],
    status: "upcoming"
  }
] 