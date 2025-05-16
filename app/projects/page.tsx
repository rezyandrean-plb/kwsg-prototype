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

// Project data
const projects = [
  {
    title: "10 Evelyn",
    location: "Newton, District 11",
    price: "From $1.2M",
    pricePerSqFt: "$2,100 - $2,400 psf",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    units: "56 Units",
    developer: "Amara Holdings",
    completion: "2025",
    slug: "10-evelyn",
    description: "Luxury freehold development in the heart of Newton, offering exclusive living spaces with premium finishes.",
    features: ["Freehold", "Luxury finishes", "Prime location", "Full facilities"],
    district: 11,
    tenure: "Freehold",
    propertyType: "Condominium",
    status: "Launching Soon"
  },
  {
    title: "The Avenir",
    location: "River Valley, District 9",
    price: "From $2.5M",
    pricePerSqFt: "$2,800 - $3,200 psf",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
    units: "376 Units",
    developer: "Hong Leong Group",
    completion: "2025",
    slug: "the-avenir",
    description: "Luxury living in the heart of River Valley with stunning city views and world-class amenities.",
    features: ["Freehold", "Luxury finishes", "City views", "Full facilities"],
    district: 9,
    tenure: "Freehold",
    propertyType: "Condominium",
    status: "Now Selling"
  },
  {
    title: "Midtown Modern",
    location: "Bugis, District 7",
    price: "From $1.8M",
    pricePerSqFt: "$2,400 - $2,800 psf",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
    units: "558 Units",
    developer: "GuocoLand",
    completion: "2024",
    slug: "midtown-modern",
    description: "Contemporary urban living in the vibrant Bugis district, combining modern design with convenience.",
    features: ["99-year leasehold", "Smart home features", "Urban lifestyle", "Integrated development"],
    district: 7,
    tenure: "99-year Leasehold",
    propertyType: "Condominium",
    status: "Now Selling"
  },
  {
    title: "Clavon",
    location: "Clementi, District 5",
    price: "From $1.5M",
    pricePerSqFt: "$1,800 - $2,200 psf",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80",
    units: "640 Units",
    developer: "UOL Group",
    completion: "2024",
    slug: "clavon",
    description: "Family-friendly development in the established Clementi neighborhood with excellent connectivity.",
    features: ["99-year leasehold", "Family-oriented", "Near MRT", "Good schools"],
    district: 5,
    tenure: "99-year Leasehold",
    propertyType: "Condominium",
    status: "Now Selling"
  },
  {
    title: "Normanton Park",
    location: "Kent Ridge, District 5",
    price: "From $1.1M",
    pricePerSqFt: "$1,600 - $1,900 psf",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80",
    units: "1862 Units",
    developer: "Kingsford Development",
    completion: "2023",
    slug: "normanton-park",
    description: "Large-scale development offering a wide range of unit types in a well-established neighborhood.",
    features: ["99-year leasehold", "Large development", "Family-friendly", "Near NUS"],
    district: 5,
    tenure: "99-year Leasehold",
    propertyType: "Condominium",
    status: "Now Selling"
  },
  {
    title: "The Reef at King's Dock",
    location: "HarbourFront, District 4",
    price: "From $2.0M",
    pricePerSqFt: "$2,500 - $2,900 psf",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80",
    units: "429 Units",
    developer: "Mapletree/Keppel Land",
    completion: "2025",
    slug: "the-reef",
    description: "Waterfront living with stunning sea views and exclusive marina access.",
    features: ["99-year leasehold", "Waterfront", "Marina access", "Luxury living"],
    district: 4,
    tenure: "99-year Leasehold",
    propertyType: "Condominium",
    status: "Launching Soon"
  }
]

// Add type definition for Project
type Project = {
  title: string
  location: string
  price: string
  pricePerSqFt: string
  image: string
  units: string
  developer: string
  completion: string
  slug: string
  description: string
  features: string[]
  district: number
  tenure: string
  propertyType: string
  status: string
}

export default function NewLaunchDirectory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [selectedDistricts, setSelectedDistricts] = useState<number[]>([])
  const [selectedTenures, setSelectedTenures] = useState<string[]>([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project: Project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.developer.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesDistrict = selectedDistricts.length === 0 || selectedDistricts.includes(project.district)
      const matchesTenure = selectedTenures.length === 0 || selectedTenures.includes(project.tenure)
      const matchesPropertyType = selectedPropertyTypes.length === 0 || selectedPropertyTypes.includes(project.propertyType)
      const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(project.status)

      return matchesSearch && matchesDistrict && matchesTenure && matchesPropertyType && matchesStatus
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
                  <Button variant="outline" className="flex items-center border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    {(selectedDistricts.length > 0 || selectedTenures.length > 0 || selectedPropertyTypes.length > 0 || selectedStatus.length > 0) && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedDistricts.length + selectedTenures.length + selectedPropertyTypes.length + selectedStatus.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-gray-900 text-white border-gray-800">
                  <SheetHeader>
                    <SheetTitle>Filter Projects</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Status</h3>
                      <div className="flex flex-wrap gap-2">
                        {statuses.map((status) => (
                          <Badge
                            key={status}
                            variant={selectedStatus.includes(status) ? "default" : "outline"}
                            className="cursor-pointer"
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
                      <h3 className="font-semibold mb-3">District</h3>
                      <div className="flex flex-wrap gap-2">
                        {districts.map((district) => (
                          <Badge
                            key={district}
                            variant={selectedDistricts.includes(district) ? "default" : "outline"}
                            className="cursor-pointer"
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
                      <h3 className="font-semibold mb-3">Tenure</h3>
                      <div className="flex flex-wrap gap-2">
                        {tenures.map((tenure) => (
                          <Badge
                            key={tenure}
                            variant={selectedTenures.includes(tenure) ? "default" : "outline"}
                            className="cursor-pointer"
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
                      <h3 className="font-semibold mb-3">Property Type</h3>
                      <div className="flex flex-wrap gap-2">
                        {propertyTypes.map((type) => (
                          <Badge
                            key={type}
                            variant={selectedPropertyTypes.includes(type) ? "default" : "outline"}
                            className="cursor-pointer"
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

                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                        onClick={() => {
                          setSelectedDistricts([])
                          setSelectedTenures([])
                          setSelectedPropertyTypes([])
                          setSelectedStatus([])
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
