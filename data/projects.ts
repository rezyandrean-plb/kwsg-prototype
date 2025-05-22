export interface Project {
  title: string
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
  description?: string
  pricePerSqFt?: string
  features?: string[]
  status: 'upcoming' | 'ongoing' | 'completed'
}

export const projects: Project[] = [
  {
    title: "10 Evelyn",
    location: "Newton, District 11",
    price: "From $1.2M",
    priceRange: "$1.2M - $2.8M",
    pricePerSqFt: "$1,800 - $2,200 psf",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    units: "120 Units",
    unitsAvailable: "120 Units",
    propertySizeRange: "527 - 1,302 sqft",
    developer: "Amara Holdings",
    completion: "2025",
    slug: "10-evelyn",
    description: "Luxury living in the heart of Newton",
    features: ["Freehold", "Smart Home"],
    status: "upcoming"
  },
  {
    title: "The Avenir",
    location: "River Valley, District 9",
    price: "From $2.5M",
    priceRange: "$2.5M - $4.8M",
    pricePerSqFt: "$2,200 - $2,600 psf",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    units: "376 Units",
    unitsAvailable: "376 Units",
    propertySizeRange: "614 - 1,862 sqft",
    developer: "Hong Leong Group",
    completion: "2025",
    slug: "the-avenir",
    description: "Exclusive living in River Valley",
    features: ["Freehold", "Private Pool"],
    status: "ongoing"
  },
  {
    title: "Marina One Residences",
    location: "Marina Bay, District 1",
    price: "From $3.8M",
    priceRange: "$3.8M - $6.5M",
    pricePerSqFt: "$2,800 - $3,200 psf",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80",
    units: "1,042 Units",
    unitsAvailable: "1,042 Units",
    propertySizeRange: "904 - 2,583 sqft",
    developer: "M+S Pte Ltd",
    completion: "2025",
    slug: "marina-one-residences",
    description: "Iconic waterfront living",
    features: ["99-year Leasehold", "Sky Garden"],
    status: "ongoing"
  },
  {
    title: "The Landmark",
    location: "Orchard, District 9",
    price: "From $4.2M",
    priceRange: "$4.2M - $7.8M",
    pricePerSqFt: "$3,200 - $3,600 psf",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80",
    units: "396 Units",
    unitsAvailable: "396 Units",
    propertySizeRange: "1,076 - 2,885 sqft",
    developer: "Far East Organization",
    completion: "2025",
    slug: "the-landmark",
    description: "Premium living in Orchard",
    features: ["Freehold", "Private Lift"],
    status: "completed"
  }
] 