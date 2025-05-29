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
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
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
            The Launchpad for Smart Buyers
          </motion.h1>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg text-gray-300 mb-12">
              We're building a better way to discover Singapore's latest new launch condos — clear, consultant-led, and built around your buying goals. Stay tuned for a launch experience designed to inform and empower your next move.
            </p>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg"
                >
                  Get Notified When We Go Live
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-white border-gray-200">
                <DialogHeader>
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/images/kwsg-logo.png"
                      alt="KW Singapore"
                      width={200}
                      height={60}
                      className="h-12 w-auto"
                      priority
                    />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-center text-gray-900">Get Early Access to New Launch Projects</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-900 mb-2 block">
                      Full Name <span className="text-primary-red">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      required
                      className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                      placeholder="We'd like to address you properly"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-900 mb-2 block">
                      Email Address <span className="text-primary-red">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                      placeholder="For exclusive updates and launch alerts"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      We'll send you one update when the page launches. That's it.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="mobile" className="text-gray-900 mb-2 block">
                      Mobile Number
                    </Label>
                    <Input
                      id="mobile"
                      type="tel"
                      className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                      placeholder="Only if you'd like a KW consultant to reach out directly"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="preferences" className="text-gray-900 mb-2 block">
                      Preferred Districts or Projects
                    </Label>
                    <Textarea
                      id="preferences"
                      className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                      placeholder="Let us know if there are areas you're watching"
                      value={formData.preferences}
                      onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      required
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                      className="border-gray-400 data-[state=checked]:bg-primary-red data-[state=checked]:border-primary-red"
                    />
                    <Label htmlFor="consent" className="text-sm text-gray-900">
                      I agree to be contacted by KW Singapore regarding new launch projects and updates.
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary-red hover:bg-primary-red/90 text-white"
                  >
                    Notify Me First
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
