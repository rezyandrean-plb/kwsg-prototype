"use client"

import { useState, useRef } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    preferences: "",
    consent: false
  })
  const [isOpen, setIsOpen] = useState(false)
  const searchSectionRef = useRef<HTMLDivElement>(null)

  const scrollToSearch = () => {
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
    setIsOpen(false)
  }

  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <Image
          src="/images/new-launch/new-launch-section.webp"
          alt="New Launch Properties"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20 flex items-center justify-center">
          <motion.div 
            className="container mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
              style={{ contentVisibility: 'auto' }}
            >
              New Launch Properties
            </h1>
            <p 
              className="text-lg sm:text-xl max-w-3xl mx-auto mb-12 text-gray-200"
              style={{ contentVisibility: 'auto' }}
            >
              Discover Singapore's most exclusive new launch condos and properties. From luxury waterfront residences to family-friendly developments, find your perfect home with our curated selection of premium real estate opportunities.
            </p>
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <Button 
                className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg"
                onClick={scrollToSearch}
              >
                Find Your Dream
                <Search className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Listing Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          {/* Search and Filter Bar */}
          <div ref={searchSectionRef} className="bg-white/5 rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search by project name, location, or developer..."
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setSearchQuery(searchInput)
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 border-white/10 text-white hover:bg-white/10">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[300px] sm:w-[400px] bg-black border-white/10">
                    <SheetHeader>
                      <SheetTitle className="text-white">Filter Projects</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      {/* District Filter */}
                      <div>
                        <h3 className="font-medium mb-3 text-white">District</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {districts.map((district) => (
                            <Button
                              key={district}
                              variant={selectedDistricts.includes(district) ? "default" : "outline"}
                              className="w-full justify-start border-white/10 text-white hover:bg-white/10"
                              onClick={() => handleDistrictChange(district)}
                            >
                              {selectedDistricts.includes(district) && <Check className="mr-2 h-4 w-4" />}
                              District {district}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Tenure Filter */}
                      <div>
                        <h3 className="font-medium mb-3 text-white">Tenure</h3>
                        <div className="space-y-2">
                          {tenures.map((tenure) => (
                            <Button
                              key={tenure}
                              variant={selectedTenures.includes(tenure) ? "default" : "outline"}
                              className="w-full justify-start border-white/10 text-white hover:bg-white/10"
                              onClick={() => handleTenureChange(tenure)}
                            >
                              {selectedTenures.includes(tenure) && <Check className="mr-2 h-4 w-4" />}
                              {tenure}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Property Type Filter */}
                      <div>
                        <h3 className="font-medium mb-3 text-white">Property Type</h3>
                        <div className="space-y-2">
                          {propertyTypes.map((type) => (
                            <Button
                              key={type}
                              variant={selectedPropertyTypes.includes(type) ? "default" : "outline"}
                              className="w-full justify-start border-white/10 text-white hover:bg-white/10"
                              onClick={() => handlePropertyTypeChange(type)}
                            >
                              {selectedPropertyTypes.includes(type) && <Check className="mr-2 h-4 w-4" />}
                              {type}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Status Filter */}
                      <div>
                        <h3 className="font-medium mb-3 text-white">Status</h3>
                        <div className="space-y-2">
                          {statuses.map((status) => (
                            <Button
                              key={status}
                              variant={selectedStatus.includes(status) ? "default" : "outline"}
                              className="w-full justify-start border-white/10 text-white hover:bg-white/10 capitalize"
                              onClick={() => handleStatusChange(status)}
                            >
                              {selectedStatus.includes(status) && <Check className="mr-2 h-4 w-4" />}
                              {status}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Bedroom Filter */}
                      <div>
                        <h3 className="font-medium mb-3 text-white">Bedrooms</h3>
                        <div className="space-y-2">
                          {bedrooms.map((bedroom) => (
                            <Button
                              key={bedroom}
                              variant={selectedBedrooms.includes(bedroom) ? "default" : "outline"}
                              className="w-full justify-start border-white/10 text-white hover:bg-white/10"
                              onClick={() => handleBedroomChange(bedroom)}
                            >
                              {selectedBedrooms.includes(bedroom) && <Check className="mr-2 h-4 w-4" />}
                              {bedroom}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Price Range Filter */}
                      <div>
                        <h3 className="font-medium mb-3 text-white">Price Range</h3>
                        <div className="px-2">
                          <Slider
                            defaultValue={[priceMin, priceMax]}
                            max={5000000}
                            step={100000}
                            onValueChange={(value) => {
                              setPriceMin(value[0])
                              setPriceMax(value[1])
                            }}
                            className="mb-4"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>${priceMin.toLocaleString()}</span>
                            <span>${priceMax.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/10">
                    <SelectItem value="latest" className="text-white">Latest</SelectItem>
                    <SelectItem value="price-low-high" className="text-white">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low" className="text-white">Price: High to Low</SelectItem>
                    <SelectItem value="completion" className="text-white">Completion Date</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-white text-black hover:bg-white/90" : "border-white/10 text-white hover:bg-white/10"}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  onClick={() => setViewMode("map")}
                  className={viewMode === "map" ? "bg-white text-black hover:bg-white/90" : "border-white/10 text-white hover:bg-white/10"}
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedDistricts.length > 0 || selectedTenures.length > 0 || selectedPropertyTypes.length > 0 || 
            selectedStatus.length > 0 || selectedBedrooms.length > 0 || priceMin > 0 || priceMax < 5000000) && (
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedDistricts.map((district) => (
                <Badge key={district} variant="secondary" className="gap-1 bg-white/10 text-white hover:bg-white/20">
                  District {district}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleDistrictChange(district)} />
                </Badge>
              ))}
              {selectedTenures.map((tenure) => (
                <Badge key={tenure} variant="secondary" className="gap-1 bg-white/10 text-white hover:bg-white/20">
                  {tenure}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleTenureChange(tenure)} />
                </Badge>
              ))}
              {selectedPropertyTypes.map((type) => (
                <Badge key={type} variant="secondary" className="gap-1 bg-white/10 text-white hover:bg-white/20">
                  {type}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handlePropertyTypeChange(type)} />
                </Badge>
              ))}
              {selectedStatus.map((status) => (
                <Badge key={status} variant="secondary" className="gap-1 bg-white/10 text-white hover:bg-white/20 capitalize">
                  {status}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleStatusChange(status)} />
                </Badge>
              ))}
              {selectedBedrooms.map((bedroom) => (
                <Badge key={bedroom} variant="secondary" className="gap-1 bg-white/10 text-white hover:bg-white/20">
                  {bedroom}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleBedroomChange(bedroom)} />
                </Badge>
              ))}
              {(priceMin > 0 || priceMax < 5000000) && (
                <Badge variant="secondary" className="gap-1 bg-white/10 text-white hover:bg-white/20">
                  ${priceMin.toLocaleString()} - ${priceMax.toLocaleString()}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => {
                    setPriceMin(0)
                    setPriceMax(5000000)
                  }} />
                </Badge>
              )}
            </div>
          )}

          {/* Projects Grid */}
          {viewMode === "grid" ? (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {currentProjects.map((project) => (
                <motion.div key={project.slug} variants={fadeInUp}>
                  <ProjectCard 
                    {...project}
                    type={project.type || 'Mixed Development'}
                    coordinates={project.coordinates || { lat: 1.3521, lng: 103.8198 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="h-[600px] bg-white/5 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Map view coming soon</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border-white/10 text-white hover:bg-white/10"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-white text-black hover:bg-white/90" : "border-white/10 text-white hover:bg-white/10"}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="border-white/10 text-white hover:bg-white/10"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
