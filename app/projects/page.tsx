"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ArrowRight, X } from "lucide-react"
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
    image: "/placeholder.svg?key=gabjg",
    units: "56 Units",
    developer: "Amara Holdings",
    completion: "2025",
    slug: "10-evelyn",
    description: "Luxury freehold development in the heart of Newton, offering exclusive living spaces with premium finishes.",
    features: ["Freehold", "Luxury finishes", "Prime location", "Full facilities"],
    district: 11,
    tenure: "Freehold",
    propertyType: "Condominium"
  },
  {
    title: "The Avenir",
    location: "River Valley, District 9",
    price: "From $2.5M",
    pricePerSqFt: "$2,800 - $3,200 psf",
    image: "/placeholder.svg?key=1wce3",
    units: "376 Units",
    developer: "Hong Leong Group",
    completion: "2025",
    slug: "the-avenir",
    description: "Luxury living in the heart of River Valley with stunning city views and world-class amenities.",
    features: ["Freehold", "Luxury finishes", "City views", "Full facilities"],
    district: 9,
    tenure: "Freehold",
    propertyType: "Condominium"
  },
  {
    title: "Midtown Modern",
    location: "Bugis, District 7",
    price: "From $1.8M",
    pricePerSqFt: "$2,400 - $2,800 psf",
    image: "/placeholder.svg?key=7233g",
    units: "558 Units",
    developer: "GuocoLand",
    completion: "2024",
    slug: "midtown-modern",
    description: "Contemporary urban living in the vibrant Bugis district, combining modern design with convenience.",
    features: ["99-year leasehold", "Smart home features", "Urban lifestyle", "Integrated development"],
    district: 7,
    tenure: "99-year Leasehold",
    propertyType: "Condominium"
  },
  {
    title: "Clavon",
    location: "Clementi, District 5",
    price: "From $1.5M",
    pricePerSqFt: "$1,800 - $2,200 psf",
    image: "/placeholder.svg?key=5j2ou",
    units: "640 Units",
    developer: "UOL Group",
    completion: "2024",
    slug: "clavon",
    description: "Family-friendly development in the established Clementi neighborhood with excellent connectivity.",
    features: ["99-year leasehold", "Family-oriented", "Near MRT", "Good schools"],
    district: 5,
    tenure: "99-year Leasehold",
    propertyType: "Condominium"
  },
  {
    title: "Normanton Park",
    location: "Kent Ridge, District 5",
    price: "From $1.1M",
    pricePerSqFt: "$1,600 - $1,900 psf",
    image: "/placeholder.svg?key=normanton",
    units: "1862 Units",
    developer: "Kingsford Development",
    completion: "2023",
    slug: "normanton-park",
    description: "Large-scale development offering a wide range of unit types in a well-established neighborhood.",
    features: ["99-year leasehold", "Large development", "Family-friendly", "Near NUS"],
    district: 5,
    tenure: "99-year Leasehold",
    propertyType: "Condominium"
  },
  {
    title: "The Reef at King's Dock",
    location: "HarbourFront, District 4",
    price: "From $2.0M",
    pricePerSqFt: "$2,500 - $2,900 psf",
    image: "/placeholder.svg?key=reef",
    units: "429 Units",
    developer: "Mapletree/Keppel Land",
    completion: "2025",
    slug: "the-reef",
    description: "Waterfront living with stunning sea views and exclusive marina access.",
    features: ["99-year leasehold", "Waterfront", "Marina access", "Luxury living"],
    district: 4,
    tenure: "99-year Leasehold",
    propertyType: "Condominium"
  }
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [selectedDistricts, setSelectedDistricts] = useState<number[]>([])
  const [selectedTenures, setSelectedTenures] = useState<string[]>([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.developer.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesDistrict = selectedDistricts.length === 0 || selectedDistricts.includes(project.district)
      const matchesTenure = selectedTenures.length === 0 || selectedTenures.includes(project.tenure)
      const matchesPropertyType = selectedPropertyTypes.length === 0 || selectedPropertyTypes.includes(project.propertyType)

      return matchesSearch && matchesDistrict && matchesTenure && matchesPropertyType
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

  const districts = Array.from(new Set(projects.map(p => p.district))).sort()
  const tenures = Array.from(new Set(projects.map(p => p.tenure)))
  const propertyTypes = Array.from(new Set(projects.map(p => p.propertyType)))

  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-black text-white h-screen flex items-center">
        <div className="relative w-full h-full">
          <Image
            src="/placeholder.svg?key=hero"
            alt="New Launch Projects"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 flex items-center bg-black/40">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">New Launch Projects</h1>
              <p className="text-xl max-w-3xl mx-auto mb-12 text-gray-100">
                Discover the most exclusive new property launches in prime locations
              </p>
              <div className="max-w-3xl mx-auto bg-black/90 rounded-lg overflow-hidden flex backdrop-blur-sm">
                <Input
                  type="text"
                  placeholder="Search by project name, location, or developer..."
                  className="flex-1 border-0 bg-gray-900 text-white placeholder:text-gray-400 focus-visible:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="rounded-none bg-primary hover:bg-primary/90">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">All Projects</h2>
              <p className="text-gray-300">Showing {filteredProjects.length} new launch projects</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center border-gray-700 text-gray-300 hover:bg-gray-800">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    {(selectedDistricts.length > 0 || selectedTenures.length > 0 || selectedPropertyTypes.length > 0) && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedDistricts.length + selectedTenures.length + selectedPropertyTypes.length}
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

                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                      onClick={() => {
                        setSelectedDistricts([])
                        setSelectedTenures([])
                        setSelectedPropertyTypes([])
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-gray-300">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 text-gray-300">
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="price-low-high">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high-low">Price (High to Low)</SelectItem>
                  <SelectItem value="completion">Completion Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                location={project.location}
                price={project.price}
                image={project.image}
                units={project.units}
                developer={project.developer}
                completion={project.completion}
                slug={project.slug}
                description={project.description}
                pricePerSqFt={project.pricePerSqFt}
                features={project.features}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No projects found matching your criteria</p>
              <Button
                variant="outline"
                className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedDistricts([])
                  setSelectedTenures([])
                  setSelectedPropertyTypes([])
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}

          <div className="flex justify-center mt-12">
            <Button variant="outline" className="mx-1 px-4 border-gray-700 text-gray-300 hover:bg-gray-800">
              1
            </Button>
            <Button variant="outline" className="mx-1 px-4 border-gray-700 text-gray-300 hover:bg-gray-800">
              2
            </Button>
            <Button variant="outline" className="mx-1 px-4 border-gray-700 text-gray-300 hover:bg-gray-800">
              3
            </Button>
            <Button variant="outline" className="mx-1 border-gray-700 text-gray-300 hover:bg-gray-800">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Why Choose Us for New Launches?</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
            We specialize exclusively in new property launches, giving you the edge in this competitive market
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">First Access</h3>
              <p className="text-gray-300">Get priority access to new launches before they hit the market</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Expert Guidance</h3>
              <p className="text-gray-300">Our specialists have in-depth knowledge of every new launch project</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Exclusive Deals</h3>
              <p className="text-gray-300">
                Access to developer discounts and special packages not available elsewhere
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
