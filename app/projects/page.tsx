"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ArrowRight, X, MapPin, Building2, Calendar, DollarSign, LayoutGrid, Map, Bed, SlidersHorizontal, Check } from "lucide-react"
import ProjectCard from "@/components/project-card"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { Clock } from "lucide-react"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Add type definition for Project
type Project = {
  slug: string
  name: string
  location: string
  price: string
  type?: string
  image: string
  coordinates?: {
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
  district?: number
  tenure?: string
  propertyType?: string
  bedrooms?: string[]
}

// Project data
const projects: Project[] = [
  {
    name: "Lentor Modern",
    location: "Lentor",
    price: "From $1.28M",
    priceRange: "$1.28M - $2.88M",
    pricePerSqFt: "$1,800 - $2,100 psf",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    units: "605 Units",
    unitsAvailable: "605 Units",
    propertySizeRange: "527 - 1,302 sqft",
    developer: "GuocoLand & Hong Leong",
    completion: "2026",
    slug: "lentor-modern",
    description: "Integrated development featuring residential units, retail spaces, and direct MRT connectivity at Lentor Station.",
    features: ["99-year leasehold", "Integrated development", "Direct MRT access", "Full facilities"],
    type: "Mixed Development",
    status: "upcoming",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "The Landmark",
    location: "Changi",
    price: "From $1.15M",
    priceRange: "$1.15M - $2.45M",
    pricePerSqFt: "$1,600 - $1,900 psf",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    units: "396 Units",
    unitsAvailable: "396 Units",
    propertySizeRange: "484 - 1,259 sqft",
    developer: "Hong Leong Group",
    completion: "2026",
    slug: "the-landmark",
    description: "Waterfront living with panoramic sea views and exclusive marina access in the upcoming Changi Bay area.",
    features: ["99-year leasehold", "Waterfront living", "Marina access", "Full facilities"],
    type: "Waterfront Condominium",
    status: "ongoing",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "The Reserve Residences",
    location: "Bukit Timah",
    price: "From $1.88M",
    priceRange: "$1.88M - $4.28M",
    pricePerSqFt: "$2,200 - $2,600 psf",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
    units: "732 Units",
    unitsAvailable: "732 Units",
    propertySizeRange: "614 - 1,862 sqft",
    developer: "Far East Organization",
    completion: "2026",
    slug: "the-reserve-residences",
    description: "Luxury integrated development in the prestigious Bukit Timah area, offering exclusive living spaces with premium finishes.",
    features: ["99-year leasehold", "Integrated development", "Luxury finishes", "Full facilities"],
    district: 21,
    tenure: "99-year Leasehold",
    propertyType: "Luxury Condominium",
    status: "completed",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms"],
    type: "Luxury Condominium",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "Tembusu Grand",
    location: "Tembusu",
    price: "From $1.48M",
    priceRange: "$1.48M - $3.28M",
    pricePerSqFt: "$1,900 - $2,200 psf",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80",
    units: "638 Units",
    unitsAvailable: "638 Units",
    propertySizeRange: "527 - 1,485 sqft",
    developer: "CDL & MCL Land",
    completion: "2026",
    slug: "tembusu-grand",
    description: "Family-friendly development in the established Tembusu neighborhood with excellent connectivity and amenities.",
    features: ["99-year leasehold", "Family-oriented", "Near MRT", "Good schools"],
    district: 14,
    tenure: "99-year Leasehold",
    propertyType: "Mass Market Condominium",
    status: "upcoming",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms"],
    type: "Mass Market Condominium",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "Sceneca Residence",
    location: "Tanah Merah",
    price: "From $1.18M",
    priceRange: "$1.18M - $2.68M",
    pricePerSqFt: "$1,700 - $2,000 psf",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
    units: "268 Units",
    unitsAvailable: "268 Units",
    propertySizeRange: "484 - 1,259 sqft",
    developer: "MCC Land",
    completion: "2026",
    slug: "sceneca-residence",
    description: "Integrated development offering a perfect blend of residential comfort and retail convenience in the heart of Tanah Merah.",
    features: ["99-year leasehold", "Integrated development", "Near MRT", "Shopping mall"],
    district: 16,
    tenure: "99-year Leasehold",
    propertyType: "Mixed Development",
    status: "ongoing",
    bedrooms: ["1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4 Bedrooms"],
    type: "Mixed Development",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "Pinetree Hill",
    location: "Dunearn",
    price: "From $1.98M",
    priceRange: "$1.98M - $4.58M",
    pricePerSqFt: "$2,300 - $2,700 psf",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80",
    units: "520 Units",
    unitsAvailable: "520 Units",
    propertySizeRange: "678 - 1,862 sqft",
    developer: "Hong Leong Group",
    completion: "2026",
    slug: "pinetree-hill",
    description: "Luxury freehold development in the prestigious Dunearn area, offering exclusive living spaces with premium finishes.",
    features: ["Freehold", "Luxury finishes", "Prime location", "Full facilities"],
    district: 21,
    tenure: "Freehold",
    propertyType: "Luxury Condominium",
    status: "completed",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms"],
    type: "Luxury Condominium",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "The Continuum",
    location: "Thiam Siew",
    price: "From $1.68M",
    priceRange: "$1.68M - $3.88M",
    pricePerSqFt: "$2,000 - $2,400 psf",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    units: "816 Units",
    unitsAvailable: "816 Units",
    propertySizeRange: "592 - 1,722 sqft",
    developer: "Hoi Hup & Sunway",
    completion: "2027",
    slug: "the-continuum",
    description: "Premium development in the heart of District 15, offering sophisticated living spaces with panoramic city views.",
    features: ["99-year leasehold", "City views", "Premium finishes", "Full facilities"],
    district: 15,
    tenure: "99-year Leasehold",
    propertyType: "Premium Condominium",
    status: "upcoming",
    bedrooms: ["1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms"],
    type: "Premium Condominium",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "Lentor Hills Residences",
    location: "Lentor",
    price: "From $1.38M",
    priceRange: "$1.38M - $2.98M",
    pricePerSqFt: "$1,900 - $2,200 psf",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    units: "598 Units",
    unitsAvailable: "598 Units",
    propertySizeRange: "538 - 1,335 sqft",
    developer: "GuocoLand",
    completion: "2026",
    slug: "lentor-hills-residences",
    description: "Family-oriented development in the upcoming Lentor Hills precinct, offering modern living spaces with nature-inspired amenities.",
    features: ["99-year leasehold", "Nature-inspired", "Family-friendly", "Full facilities"],
    district: 26,
    tenure: "99-year Leasehold",
    propertyType: "Mass Market Condominium",
    status: "ongoing",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms"],
    type: "Mass Market Condominium",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "Marina View Residences",
    location: "Marina Bay",
    price: "From $2.88M",
    priceRange: "$2.88M - $5.88M",
    pricePerSqFt: "$3,200 - $3,800 psf",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80",
    units: "450 Units",
    unitsAvailable: "450 Units",
    propertySizeRange: "678 - 2,152 sqft",
    developer: "CapitaLand",
    completion: "2027",
    slug: "marina-view-residences",
    description: "Luxury waterfront living in the heart of Marina Bay, offering panoramic views of the city skyline and waterfront.",
    features: ["99-year leasehold", "Waterfront living", "City views", "Premium facilities"],
    district: 1,
    tenure: "99-year Leasehold",
    propertyType: "Luxury Waterfront Condominium",
    status: "upcoming",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms", "Penthouse"],
    type: "Luxury Waterfront Condominium",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "Orchard Residences",
    location: "Orchard",
    price: "From $3.28M",
    priceRange: "$3.28M - $6.88M",
    pricePerSqFt: "$3,500 - $4,000 psf",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    units: "380 Units",
    unitsAvailable: "380 Units",
    propertySizeRange: "592 - 2,152 sqft",
    developer: "Far East Organization",
    completion: "2027",
    slug: "orchard-residences",
    description: "Ultra-luxury living in the heart of Orchard Road, Singapore's premier shopping and lifestyle district.",
    features: ["Freehold", "Prime location", "Luxury finishes", "Full facilities"],
    district: 9,
    tenure: "Freehold",
    propertyType: "Luxury Condominium",
    status: "upcoming",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms", "Penthouse"],
    type: "Luxury Condominium",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "Sentosa Cove Villas",
    location: "Sentosa Cove",
    price: "From $4.88M",
    priceRange: "$4.88M - $8.88M",
    pricePerSqFt: "$4,200 - $4,800 psf",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    units: "120 Units",
    unitsAvailable: "120 Units",
    propertySizeRange: "1,200 - 3,000 sqft",
    developer: "CDL",
    completion: "2027",
    slug: "sentosa-cove-villas",
    description: "Exclusive waterfront living in Sentosa Cove, offering private marina access and luxury amenities.",
    features: ["Freehold", "Waterfront living", "Marina access", "Private facilities"],
    district: 4,
    tenure: "Freehold",
    propertyType: "Luxury Waterfront Villas",
    status: "upcoming",
    bedrooms: ["4 Bedrooms", "5 Bedrooms", "6 Bedrooms", "Penthouse"],
    type: "Luxury Waterfront Villas",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "Newton Edge",
    location: "Newton",
    price: "From $2.18M",
    priceRange: "$2.18M - $4.18M",
    pricePerSqFt: "$2,800 - $3,200 psf",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
    units: "280 Units",
    unitsAvailable: "280 Units",
    propertySizeRange: "592 - 1,722 sqft",
    developer: "Hong Leong Group",
    completion: "2027",
    slug: "newton-edge",
    description: "Sophisticated living in the prestigious Newton area, offering modern luxury with excellent connectivity.",
    features: ["99-year leasehold", "Prime location", "Luxury finishes", "Full facilities"],
    district: 11,
    tenure: "99-year Leasehold",
    propertyType: "Luxury Condominium",
    status: "upcoming",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms"],
    type: "Luxury Condominium",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "Holland Village Residences",
    location: "Holland Village",
    price: "From $2.48M",
    priceRange: "$2.48M - $4.88M",
    pricePerSqFt: "$2,900 - $3,400 psf",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80",
    units: "320 Units",
    unitsAvailable: "320 Units",
    propertySizeRange: "592 - 1,862 sqft",
    developer: "GuocoLand",
    completion: "2027",
    slug: "holland-village-residences",
    description: "Contemporary living in the vibrant Holland Village area, offering a perfect blend of lifestyle and convenience.",
    features: ["99-year leasehold", "Lifestyle location", "Modern design", "Full facilities"],
    district: 10,
    tenure: "99-year Leasehold",
    propertyType: "Luxury Condominium",
    status: "upcoming",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms"],
    type: "Luxury Condominium",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "East Coast Residences",
    location: "East Coast",
    price: "From $1.88M",
    priceRange: "$1.88M - $3.88M",
    pricePerSqFt: "$2,200 - $2,600 psf",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
    units: "420 Units",
    unitsAvailable: "420 Units",
    propertySizeRange: "592 - 1,722 sqft",
    developer: "MCC Land",
    completion: "2027",
    slug: "east-coast-residences",
    description: "Seaside living in the popular East Coast area, offering a relaxed lifestyle with excellent amenities.",
    features: ["99-year leasehold", "Seaside living", "Family-friendly", "Full facilities"],
    district: 15,
    tenure: "99-year Leasehold",
    propertyType: "Mass Market Condominium",
    status: "upcoming",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms"],
    type: "Mass Market Condominium",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  },
  {
    name: "Jurong Lake Residences",
    location: "Jurong Lake",
    price: "From $1.28M",
    priceRange: "$1.28M - $2.88M",
    pricePerSqFt: "$1,800 - $2,200 psf",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80",
    units: "580 Units",
    unitsAvailable: "580 Units",
    propertySizeRange: "527 - 1,302 sqft",
    developer: "CDL",
    completion: "2027",
    slug: "jurong-lake-residences",
    description: "Lakeside living in the upcoming Jurong Lake District, offering modern comfort with nature-inspired amenities.",
    features: ["99-year leasehold", "Lakeside living", "Nature-inspired", "Full facilities"],
    district: 22,
    tenure: "99-year Leasehold",
    propertyType: "Mass Market Condominium",
    status: "upcoming",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms"],
    type: "Mass Market Condominium",
    coordinates: { lat: 1.3521, lng: 103.8198 }
  }
]

export default function NewLaunchDirectory() {
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [selectedDistricts, setSelectedDistricts] = useState<number[]>([])
  const [selectedTenures, setSelectedTenures] = useState<string[]>([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<("upcoming" | "ongoing" | "completed")[]>([])
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 8
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(0)

  // Price range options
  const priceRanges = [
    "Under $1M",
    "$1M - $1.5M",
    "$1.5M - $2M",
    "$2M - $3M",
    "$3M - $4M",
    "$4M - $5M",
    "Above $5M"
  ]

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.developer?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      
      const matchesDistrict = selectedDistricts.length === 0 || (project.district && selectedDistricts.includes(project.district))
      const matchesTenure = selectedTenures.length === 0 || (project.tenure && selectedTenures.includes(project.tenure))
      const matchesPropertyType = selectedPropertyTypes.length === 0 || (project.propertyType && selectedPropertyTypes.includes(project.propertyType))
      const matchesStatus = selectedStatus.length === 0 || (project.status && selectedStatus.includes(project.status))
      const matchesBedrooms = selectedBedrooms.length === 0 || (project.bedrooms && selectedBedrooms.some(bedroom => project.bedrooms?.includes(bedroom)))
      
      // Price range filter (use priceMin and priceMax)
      const [projectMin, projectMax] = (project.priceRange || '').split(" - ").map(price => parseInt(price.replace(/[^0-9]/g, "")))
      const matchesPriceRange = (priceMin === 0 && priceMax === 0) ||
        (projectMax >= priceMin && projectMin <= priceMax)

      return matchesSearch && matchesDistrict && matchesTenure && matchesPropertyType && matchesStatus && matchesBedrooms && matchesPriceRange
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, ""))
        case "price-high-low":
          return parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, ""))
        case "completion":
          return new Date(a.completion || '').getTime() - new Date(b.completion || '').getTime()
        default:
          return 0
      }
    })

  // Get featured projects (first 3 projects)
  const featuredProjects = [
    projects[0], // Lentor Modern
    projects[2], // The Reserve Residences
    projects[3], // Tembusu Grand
    projects[6], // The Continuum
  ]

  // Update all filter arrays to handle undefined values
  const districts = Array.from(new Set(projects.map(p => p.district).filter((d): d is number => d !== undefined))).sort((a, b) => a - b)
  const tenures = Array.from(new Set(projects.map(p => p.tenure).filter((t): t is string => t !== undefined)))
  const propertyTypes = Array.from(new Set(projects.map(p => p.propertyType).filter((t): t is string => t !== undefined)))
  const statuses: ("upcoming" | "ongoing" | "completed")[] = ["upcoming", "ongoing", "completed"]
  const bedrooms = Array.from(new Set(projects.flatMap(p => p.bedrooms || [])))

  // Calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  const handleDistrictChange = (district: number) => {
    setSelectedDistricts(prev => 
      prev.includes(district) 
        ? prev.filter(d => d !== district)
        : [...prev, district]
    )
  }

  const handleTenureChange = (tenure?: string) => {
    if (tenure === undefined) return
    setSelectedTenures(prev => 
      prev.includes(tenure) 
        ? prev.filter(t => t !== tenure)
        : [...prev, tenure]
    )
  }

  const handlePropertyTypeChange = (type?: string) => {
    if (type === undefined) return
    setSelectedPropertyTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const handleStatusChange = (status?: 'upcoming' | 'ongoing' | 'completed') => {
    if (status === undefined) return
    setSelectedStatus(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
  }

  const handleBedroomChange = (bedroom?: string) => {
    if (bedroom === undefined) return
    setSelectedBedrooms(prev => 
      prev.includes(bedroom) 
        ? prev.filter(b => b !== bedroom)
        : [...prev, bedroom]
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
            alt="New Launch Condos"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            New Launch Condo
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl max-w-3xl mx-auto mb-12 text-gray-200"
          >
            Discover Singapore's most exclusive new property launches with KW Singapore's comprehensive directory
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto bg-black/90 rounded-lg overflow-hidden flex backdrop-blur-sm"
          >
            <Input
              type="text"
              placeholder="Search by project name, location, or developer..."
              className="flex-1 border-0 bg-white text-black placeholder:text-gray-500 focus-visible:ring-0"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearchQuery(searchInput)
                }
              }}
            />
            <Button 
              className="rounded-none bg-primary-red hover:bg-primary-red/90"
              onClick={() => setSearchQuery(searchInput)}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && !searchQuery && !searchInput && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 bg-gray-900"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured New Launches</h2>
              <p className="text-xl text-gray-300">Exclusive preview of our most anticipated developments</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard
                    name={project.name}
                    location={project.location}
                    price={project.price}
                    priceRange={project.priceRange || ''}
                    image={project.image}
                    units={project.units || ''}
                    unitsAvailable={project.unitsAvailable || ''}
                    propertySizeRange={project.propertySizeRange || ''}
                    developer={project.developer || ''}
                    completion={project.completion || ''}
                    slug={project.slug}
                    description={project.description || ''}
                    pricePerSqFt={project.pricePerSqFt || ''}
                    features={project.features || []}
                    status={project.status || 'upcoming'}
                    type={project.type || project.propertyType || ''}
                    coordinates={project.coordinates || { lat: 1.3521, lng: 103.8198 }}
                    className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Main Content Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12"
      >
        <div className="container mx-auto px-4">
          {/* Header with Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <Building2 className="h-8 w-8 text-primary-red mx-auto mb-2" />
              <div className="text-2xl font-bold">{projects.length}</div>
              <div className="text-gray-400">Active Projects</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <MapPin className="h-8 w-8 text-primary-red mx-auto mb-2" />
              <div className="text-2xl font-bold">{districts.length}</div>
              <div className="text-gray-400">Districts</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <Calendar className="h-8 w-8 text-primary-red mx-auto mb-2" />
              <div className="text-2xl font-bold">2024</div>
              <div className="text-gray-400">Launch Year</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 text-center">
              <DollarSign className="h-8 w-8 text-primary-red mx-auto mb-2" />
              <div className="text-2xl font-bold">$1.2M+</div>
              <div className="text-gray-400">Starting Price</div>
            </div>
          </motion.div>

          {/* Filters and Sort */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-y-2 gap-x-4"
          >
            <div className="flex flex-col min-w-0">
               <h2 className="text-2xl font-bold text-white whitespace-nowrap">All New Launches</h2>
               <p className="text-gray-300 whitespace-nowrap">Showing {filteredProjects.length} projects</p>
            </div>
            {/* New Filter Bar */}
            <div className="w-full flex flex-row flex-wrap gap-x-2 gap-y-2 items-center bg-transparent py-2 justify-end md:flex-nowrap md:gap-y-0 scrollbar-hide">
              {/* District */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="min-w-[80px] h-8 px-2 text-xs md:min-w-[100px] md:h-9 md:px-3 md:text-sm bg-white text-blue-900 border-none rounded-full shadow-sm flex items-center gap-2 focus:ring-2 focus:ring-blue-200">
                    <MapPin className="h-4 w-4 text-blue-900 mr-1" />
                    {selectedDistricts.length === 0 ? 'District' : selectedDistricts.length === 1 ? `D${selectedDistricts[0]}` : `${selectedDistricts.length} selected`}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="bottom" className="w-[40rem] p-4">
                  <div className={`grid gap-x-4 gap-y-2 ${districts.length > 8 ? 'grid-cols-6' : 'grid-cols-4'}`}>
                    {districts.map(d => (
                      <DropdownMenuCheckboxItem
                        key={d}
                        checked={selectedDistricts.includes(d)}
                        onCheckedChange={checked => {
                          if (checked) {
                            handleDistrictChange(d)
                          }
                        }}
                        className="px-2 py-1 flex items-center gap-2"
                      >
                        <span className="relative flex items-center">
                          <span className={`inline-block w-4 h-4 border border-blue-900 rounded-none mr-2 bg-white ${selectedDistricts.includes(d) ? 'bg-blue-100' : ''}`}>
                            {selectedDistricts.includes(d) && (
                              <Check className="w-3 h-3 text-blue-900 absolute left-0.5 top-0.5" strokeWidth={3} />
                            )}
                          </span>
                        </span>
                        District {d}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <button className="w-full text-left text-xs text-blue-900 py-1 hover:underline" onClick={() => setSelectedDistricts([])}>Clear</button>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Property Type */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="min-w-[80px] h-8 px-2 text-xs md:min-w-[100px] md:h-9 md:px-3 md:text-sm bg-white text-blue-900 border-none rounded-full shadow-sm flex items-center gap-2 focus:ring-2 focus:ring-blue-200">
                    <Building2 className="h-4 w-4 text-blue-900 mr-1" />
                    {selectedPropertyTypes.length === 0 ? 'Type' : selectedPropertyTypes.length === 1 ? selectedPropertyTypes[0] : `${selectedPropertyTypes.length} selected`}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="bottom" className="w-[40rem] p-4">
                  <div className={`grid gap-x-4 gap-y-2 ${propertyTypes.length > 8 ? 'grid-cols-6' : 'grid-cols-4'}`}>
                    {propertyTypes.map(type => (
                      <DropdownMenuCheckboxItem
                        key={type}
                        checked={selectedPropertyTypes.includes(type)}
                        onCheckedChange={checked => {
                          if (checked) {
                            handlePropertyTypeChange(type)
                          }
                        }}
                        className="px-2 py-1 flex items-center gap-2"
                      >
                        <span className="relative flex items-center">
                          <span className={`inline-block w-4 h-4 border border-blue-900 rounded-none mr-2 bg-white ${selectedPropertyTypes.includes(type) ? 'bg-blue-100' : ''}`}>
                            {selectedPropertyTypes.includes(type) && (
                              <Check className="w-3 h-3 text-blue-900 absolute left-0.5 top-0.5" strokeWidth={3} />
                            )}
                          </span>
                        </span>
                        {type}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <button className="w-full text-left text-xs text-blue-900 py-1 hover:underline" onClick={() => setSelectedPropertyTypes([])}>Clear</button>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Bedrooms */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="min-w-[80px] h-8 px-2 text-xs md:min-w-[100px] md:h-9 md:px-3 md:text-sm bg-white text-blue-900 border-none rounded-full shadow-sm flex items-center gap-2 focus:ring-2 focus:ring-blue-200">
                    <Bed className="h-4 w-4 text-blue-900 mr-1" />
                    {selectedBedrooms.length === 0 ? 'Beds' : selectedBedrooms.length === 1 ? selectedBedrooms[0] : `${selectedBedrooms.length} selected`}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="bottom" className="w-[40rem] p-4">
                  <div className={`grid gap-x-4 gap-y-2 ${bedrooms.length > 8 ? 'grid-cols-6' : 'grid-cols-4'}`}>
                    {bedrooms.map(bed => (
                      <DropdownMenuCheckboxItem
                        key={bed}
                        checked={selectedBedrooms.includes(bed)}
                        onCheckedChange={checked => {
                          if (checked) {
                            handleBedroomChange(bed)
                          }
                        }}
                        className="px-2 py-1 flex items-center gap-2"
                      >
                        <span className="relative flex items-center">
                          <span className={`inline-block w-4 h-4 border border-blue-900 rounded-none mr-2 bg-white ${selectedBedrooms.includes(bed) ? 'bg-blue-100' : ''}`}>
                            {selectedBedrooms.includes(bed) && (
                              <Check className="w-3 h-3 text-blue-900 absolute left-0.5 top-0.5" strokeWidth={3} />
                            )}
                          </span>
                        </span>
                        {bed}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <button className="w-full text-left text-xs text-blue-900 py-1 hover:underline" onClick={() => setSelectedBedrooms([])}>Clear</button>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Price */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="min-w-[80px] h-8 px-2 text-xs md:min-w-[100px] md:h-9 md:px-3 md:text-sm bg-white text-blue-900 border-none rounded-full shadow-sm flex items-center gap-2 focus:ring-2 focus:ring-blue-200">
                    <DollarSign className="h-4 w-4 text-blue-900 mr-1" />
                    {priceMin === 0 && priceMax === 0 ? 'Price' : `$${priceMin.toLocaleString()} - $${priceMax.toLocaleString()}`}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="bottom" className="w-80 p-4">
                  <div className="flex flex-col gap-3">
                    <Slider
                      min={0}
                      max={10000000}
                      step={10000}
                      value={[priceMin, priceMax === 0 ? 10000000 : priceMax]}
                      onValueChange={([min, max]) => {
                        setPriceMin(min)
                        setPriceMax(max === 10000000 ? 0 : max)
                      }}
                      className="mb-2"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-blue-900">Min</span>
                      <input
                        type="number"
                        className="w-24 px-2 py-1 border border-blue-200 rounded"
                        placeholder="Min"
                        value={priceMin === 0 ? '' : priceMin}
                        min={0}
                        max={priceMax || 10000000}
                        step={10000}
                        onChange={e => setPriceMin(Number(e.target.value))}
                      />
                      <span className="text-xs text-blue-900">Max</span>
                      <input
                        type="number"
                        className="w-24 px-2 py-1 border border-blue-200 rounded"
                        placeholder="Max"
                        value={priceMax === 0 ? '' : priceMax}
                        min={priceMin}
                        max={10000000}
                        step={10000}
                        onChange={e => setPriceMax(Number(e.target.value))}
                      />
                    </div>
                    <button className="w-full text-left text-xs text-blue-900 py-1 hover:underline" onClick={() => { setPriceMin(0); setPriceMax(0); }}>Clear</button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Filters Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="min-w-[80px] h-8 px-2 text-xs md:min-w-[100px] md:h-9 md:px-3 md:text-sm flex items-center justify-center gap-2 bg-white text-blue-900 border-none rounded-full shadow-sm font-medium hover:bg-blue-50 transition">
                    <SlidersHorizontal className="h-4 w-4 text-blue-900" />
                    Filters
                  </button>
                </SheetTrigger>
                <SheetContent className="bg-gray-900 text-white border-gray-800">
                  <SheetHeader>
                    <SheetTitle className="text-white">Filter Projects</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-white">Price Range</h3>
                      <div className="flex flex-wrap gap-2">
                        {priceRanges.map((range) => (
                          <Badge
                            key={range}
                            variant={selectedPriceRange.includes(range) ? "default" : "outline"}
                            className={`cursor-pointer border-gray-600 hover:bg-gray-800 ${
                              selectedPriceRange.includes(range)
                                ? "bg-white text-black hover:bg-gray-100"
                                : "text-white"
                            }`}
                            onClick={() => {
                              setSelectedPriceRange(prev =>
                                prev.includes(range)
                                  ? prev.filter(r => r !== range)
                                  : [...prev, range]
                              )
                            }}
                          >
                            {range}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 text-white">Status</h3>
                      <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                          <Badge
                            key={status}
                            variant={selectedStatus.includes(status) ? "default" : "outline"}
                            className={`cursor-pointer border-gray-600 hover:bg-gray-800 ${
                              selectedStatus.includes(status)
                                ? "bg-white text-black hover:bg-gray-100"
                                : "text-white"
                            }`}
                            onClick={() => handleStatusChange(status)}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 text-white">District</h3>
                      <div className="flex flex-wrap gap-2">
                        {districts.map((district) => (
                          <Badge
                            key={district}
                            variant={selectedDistricts.includes(district) ? "default" : "outline"}
                            className={`cursor-pointer border-gray-600 hover:bg-gray-800 ${
                              selectedDistricts.includes(district)
                                ? "bg-white text-black hover:bg-gray-100"
                                : "text-white"
                            }`}
                            onClick={() => handleDistrictChange(district)}
                          >
                            District {district}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 text-white">Tenure</h3>
                      <div className="flex flex-wrap gap-2">
                        {tenures.map((tenure) => (
                          <Badge
                            key={tenure}
                            variant={selectedTenures.includes(tenure) ? "default" : "outline"}
                            className={`cursor-pointer border-gray-600 hover:bg-gray-800 ${
                              selectedTenures.includes(tenure)
                                ? "bg-white text-black hover:bg-gray-100"
                                : "text-white"
                            }`}
                            onClick={() => handleTenureChange(tenure)}
                          >
                            {tenure}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 text-white">Property Type</h3>
                      <div className="flex flex-wrap gap-2">
                        {propertyTypes.map((type) => (
                          <Badge
                            key={type}
                            variant={selectedPropertyTypes.includes(type) ? "default" : "outline"}
                            className={`cursor-pointer border-gray-600 hover:bg-gray-800 ${
                              selectedPropertyTypes.includes(type)
                                ? "bg-white text-black hover:bg-gray-100"
                                : "text-white"
                            }`}
                            onClick={() => handlePropertyTypeChange(type)}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 text-white">Bedrooms</h3>
                      <div className="flex flex-wrap gap-2">
                        {bedrooms.map((bedroom) => (
                          <Badge
                            key={bedroom}
                            variant={selectedBedrooms.includes(bedroom) ? "default" : "outline"}
                            className={`cursor-pointer border-gray-600 hover:bg-gray-800 ${
                              selectedBedrooms.includes(bedroom)
                                ? "bg-white text-black hover:bg-gray-100"
                                : "text-white"
                            }`}
                            onClick={() => handleBedroomChange(bedroom)}
                          >
                            {bedroom}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        className="text-white hover:text-white hover:bg-gray-800"
                        onClick={() => {
                          setSelectedDistricts([])
                          setSelectedTenures([])
                          setSelectedPropertyTypes([])
                          setSelectedStatus([])
                          setSelectedBedrooms([])
                          setSelectedPriceRange([])
                        }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear All
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </motion.div>

          {/* Projects Display */}
          {viewMode === "grid" ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard
                      name={project.name}
                      location={project.location}
                      price={project.price}
                      priceRange={project.priceRange || ''}
                      image={project.image}
                      units={project.units || ''}
                      unitsAvailable={project.unitsAvailable || ''}
                      propertySizeRange={project.propertySizeRange || ''}
                      developer={project.developer || ''}
                      completion={project.completion || ''}
                      slug={project.slug}
                      description={project.description || ''}
                      pricePerSqFt={project.pricePerSqFt || ''}
                      features={project.features || []}
                      status={project.status || 'upcoming'}
                      type={project.type || project.propertyType || ''}
                      coordinates={project.coordinates || { lat: 1.3521, lng: 103.8198 }}
                      className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="flex justify-center items-center gap-3 mt-12"
                >
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-gray-700 text-black hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-300 font-medium"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className={`font-medium ${
                          currentPage === page 
                            ? "bg-primary-red text-white hover:bg-primary-red/90" 
                            : "border-gray-700 text-black hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="border-gray-700 text-black hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-300 font-medium"
                  >
                    Next
                  </Button>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-[600px] bg-gray-900 rounded-lg overflow-hidden"
            >
              {/* Map component would go here */}
              <div className="h-full flex items-center justify-center text-gray-400">
                Map view coming soon
              </div>
            </motion.div>
          )}

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center py-12"
            >
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects found</h3>
              <p className="text-gray-400">Try adjusting your filters or search terms</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Latest Articles Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-white">Latest Articles</h2>
            <p className="text-lg text-gray-300 mb-12">Stay updated with the newest insights and trends in real estate</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Article 1 */}
            <motion.div 
              className="bg-black rounded-lg overflow-hidden shadow-md border border-gray-800"
              variants={fadeInUp}
            >
              <div className="relative h-48">
                <Image src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80" alt="Luxury Condominium Trends" fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-primary-red text-white px-3 py-1 rounded-full text-xs font-medium">
                  Market Trends
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">5 Luxury Condominium Trends to Watch in 2024</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  From smart home integration to wellness-focused amenities, discover the top trends shaping luxury
                  condominiums this year.
                </p>
                <div className="flex items-center text-gray-400 mb-4 text-xs">
                  <div className="flex items-center mr-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Apr 28, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>5 min read</span>
                  </div>
                </div>
                <Link href="#" className="text-primary-red font-medium hover:underline text-sm inline-flex items-center">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </motion.div>

            {/* Article 2 */}
            <motion.div 
              className="bg-black rounded-lg overflow-hidden shadow-md border border-gray-800"
              variants={fadeInUp}
            >
              <div className="relative h-48">
                <Image src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80" alt="Investment Strategies" fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-primary-red text-white px-3 py-1 rounded-full text-xs font-medium">
                  Investment
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">Investment Strategies for New Launch Properties</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  Expert advice on how to maximize returns when investing in pre-construction properties, including
                  timing, location selection, and negotiation tactics.
                </p>
                <div className="flex items-center text-gray-400 mb-4 text-xs">
                  <div className="flex items-center mr-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Apr 22, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>7 min read</span>
                  </div>
                </div>
                <Link href="#" className="text-primary-red font-medium hover:underline text-sm inline-flex items-center">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </motion.div>

            {/* Article 3 */}
            <motion.div 
              className="bg-black rounded-lg overflow-hidden shadow-md border border-gray-800"
              variants={fadeInUp}
            >
              <div className="relative h-48">
                <Image src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80" alt="Sustainable Development" fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-primary-red text-white px-3 py-1 rounded-full text-xs font-medium">
                  Sustainability
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">The Rise of Sustainable New Developments</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  How eco-friendly features are becoming standard in new launches and why buyers are willing to pay a
                  premium for sustainable living spaces.
                </p>
                <div className="flex items-center text-gray-400 mb-4 text-xs">
                  <div className="flex items-center mr-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Apr 15, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>6 min read</span>
                  </div>
                </div>
                <Link href="#" className="text-primary-red font-medium hover:underline text-sm inline-flex items-center">
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Button variant="outline" className="border-primary-red text-primary-red hover:bg-primary-red hover:text-white">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}
