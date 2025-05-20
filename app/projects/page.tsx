"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ArrowRight, X, MapPin, Building2, Calendar, DollarSign, LayoutGrid, Map } from "lucide-react"
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

// Add type definition for Project
type Project = {
  title: string
  location: string
  price: string
  priceRange: string
  pricePerSqFt: string
  image: string
  units: string
  unitsAvailable: string
  propertySizeRange: string
  developer: string
  completion: string
  slug: string
  description: string
  features: string[]
  district: number
  tenure: string
  propertyType: string
  status: string
  bedrooms: string[]
}

// Project data
const projects = [
  {
    title: "Lentor Modern",
    location: "Lentor, District 26",
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
    district: 26,
    tenure: "99-year Leasehold",
    propertyType: "Mixed Development",
    status: "Launching Soon",
    bedrooms: ["1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4 Bedrooms"]
  },
  {
    title: "The Landmark",
    location: "Changi, District 17",
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
    district: 17,
    tenure: "99-year Leasehold",
    propertyType: "Waterfront Condominium",
    status: "Launching Soon",
    bedrooms: ["1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4 Bedrooms"]
  },
  {
    title: "The Reserve Residences",
    location: "Bukit Timah, District 21",
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
    status: "Launching Soon",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms"]
  },
  {
    title: "Tembusu Grand",
    location: "Tembusu, District 14",
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
    status: "Launching Soon",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms"]
  },
  {
    title: "Sceneca Residence",
    location: "Tanah Merah, District 16",
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
    status: "Launching Soon",
    bedrooms: ["1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4 Bedrooms"]
  },
  {
    title: "Pinetree Hill",
    location: "Dunearn, District 21",
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
    status: "Launching Soon",
    bedrooms: ["2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5 Bedrooms"]
  }
]

export default function NewLaunchDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [selectedDistricts, setSelectedDistricts] = useState<number[]>([])
  const [selectedTenures, setSelectedTenures] = useState<string[]>([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")

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
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.developer.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesDistrict = selectedDistricts.length === 0 || selectedDistricts.includes(project.district)
      const matchesTenure = selectedTenures.length === 0 || selectedTenures.includes(project.tenure)
      const matchesPropertyType = selectedPropertyTypes.length === 0 || selectedPropertyTypes.includes(project.propertyType)
      const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(project.status)
      const matchesBedrooms = selectedBedrooms.length === 0 || selectedBedrooms.some(bedroom => project.bedrooms.includes(bedroom))
      
      // Price range filter
      const matchesPriceRange = selectedPriceRange.length === 0 || selectedPriceRange.some(range => {
        const [min, max] = range.split(" - ").map(price => parseInt(price.replace(/[^0-9]/g, "")))
        const projectMin = parseInt(project.priceRange.split(" - ")[0].replace(/[^0-9]/g, ""))
        const projectMax = parseInt(project.priceRange.split(" - ")[1].replace(/[^0-9]/g, ""))
        return projectMin >= min && projectMax <= max
      })

      return matchesSearch && matchesDistrict && matchesTenure && matchesPropertyType && matchesStatus && matchesBedrooms && matchesPriceRange
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, ""))
        case "price-high-low":
          return parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, ""))
        case "completion":
          return new Date(a.completion).getTime() - new Date(b.completion).getTime()
        default:
          return 0
      }
    })

  // Get featured projects (first 3 projects)
  const featuredProjects = filteredProjects.slice(0, 3)

  const districts = Array.from(new Set(projects.map(p => p.district))).sort()
  const tenures = Array.from(new Set(projects.map(p => p.tenure)))
  const propertyTypes = Array.from(new Set(projects.map(p => p.propertyType)))
  const statuses = Array.from(new Set(projects.map(p => p.status)))
  const bedrooms = Array.from(new Set(projects.flatMap(p => p.bedrooms)))

  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
            alt="New Launch Projects"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            New Launch Directory
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-12 text-gray-200">
            Discover Singapore's most exclusive new property launches with KW Singapore's comprehensive directory
          </p>
          <div className="max-w-3xl mx-auto bg-black/90 rounded-lg overflow-hidden flex backdrop-blur-sm">
            <Input
              type="text"
              placeholder="Search by project name, location, or developer..."
              className="flex-1 border-0 bg-gray-900 text-white placeholder:text-gray-400 focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="rounded-none bg-primary-red hover:bg-primary-red/90">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured New Launches</h2>
              <p className="text-xl text-gray-300">Exclusive preview of our most anticipated developments</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  {...project}
                  className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header with Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
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
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">All New Launches</h2>
              <p className="text-gray-300">Showing {filteredProjects.length} projects</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="text-white"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className="text-white"
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="completion">Completion Date</SelectItem>
                </SelectContent>
              </Select>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center border-gray-700 text-black hover:bg-gray-100">
                    <Filter className="h-4 w-4 mr-2 text-black" />
                    Filter
                    {(selectedDistricts.length > 0 || selectedTenures.length > 0 || selectedPropertyTypes.length > 0 || selectedStatus.length > 0 || selectedBedrooms.length > 0 || selectedPriceRange.length > 0) && (
                      <Badge variant="secondary" className="ml-2 bg-gray-200 text-black">
                        {selectedDistricts.length + selectedTenures.length + selectedPropertyTypes.length + selectedStatus.length + selectedBedrooms.length + selectedPriceRange.length}
                      </Badge>
                    )}
                  </Button>
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
                            onClick={() => {
                              setSelectedStatus(prev =>
                                prev.includes(status)
                                  ? prev.filter(s => s !== status)
                                  : [...prev, status]
                              )
                            }}
                          >
                            {status}
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
                            onClick={() => {
                              setSelectedDistricts(prev =>
                                prev.includes(district)
                                  ? prev.filter(d => d !== district)
                                  : [...prev, district]
                              )
                            }}
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
                            onClick={() => {
                              setSelectedTenures(prev =>
                                prev.includes(tenure)
                                  ? prev.filter(t => t !== tenure)
                                  : [...prev, tenure]
                              )
                            }}
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
                            onClick={() => {
                              setSelectedPropertyTypes(prev =>
                                prev.includes(type)
                                  ? prev.filter(t => t !== type)
                                  : [...prev, type]
                              )
                            }}
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
                            onClick={() => {
                              setSelectedBedrooms(prev =>
                                prev.includes(bedroom)
                                  ? prev.filter(b => b !== bedroom)
                                  : [...prev, bedroom]
                              )
                            }}
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
          </div>

          {/* Projects Display */}
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  {...project}
                  className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                />
              ))}
            </div>
          ) : (
            <div className="h-[600px] bg-gray-900 rounded-lg overflow-hidden">
              {/* Map component would go here */}
              <div className="h-full flex items-center justify-center text-gray-400">
                Map view coming soon
              </div>
            </div>
          )}

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects found</h3>
              <p className="text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
