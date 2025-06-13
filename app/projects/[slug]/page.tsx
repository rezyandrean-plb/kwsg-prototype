"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  MapPin,
  Calendar,
  Home,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  BarChart2,
  Layout,
  FileText,
  Info,
  Clock,
  Train,
  School,
  ShoppingBag,
  Utensils,
  ShoppingCart,
  Trees,
  MapPinned,
  BadgeDollarSign,
  Phone,
  Mail,
} from "lucide-react"
import dynamic from "next/dynamic"

const MoatRadarChart = dynamic(() => import("../../components/ai-moat"), { ssr: false })
const NearbyAmenitiesMap = dynamic(() => import("../../components/NearbyAmenitiesMap"), { ssr: false })

interface ProjectPageProps {
  params: {
    slug: string
  }
}

interface Project {
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

interface UnitType {
  type: string
  size: string
  price: string
}

interface FloorPlan {
  type: string
  image: string
}

interface LocationAnalytics {
  mrt: LocationItem[]
  schools: LocationItem[]
  amenities: LocationItem[]
  parks: LocationItem[]
}

interface LocationItem {
  name: string
  distance: string
}

interface MediaReview {
  source: string
  date: string
  title: string
  excerpt: string
  rating: number
}

interface SimilarProject {
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

interface GooglePlace {
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

export default function ProjectPage({ params }: ProjectPageProps) {
  // Mock project data
  const project: Project = {
    id: 1,
    name: "10 Evelyn",
    project_name: "10 Evelyn",
    slug: "10-evelyn",
    title: "10 Evelyn",
    location: "Newton, District 11",
    address: "10 Evelyn Road, Singapore 308318",
    type: "Condominium",
    price: "From $1.2M",
    priceFrom: "1200000",
    pricePerSqFt: "$2,100 - $2,400 psf",
    bedrooms: "1-4",
    bathrooms: "1-3",
    size: "484 - 1,636 sq ft",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
    ],
    units: "56 Units",
    developer: "Amara Holdings",
    completion: "2025",
    description:
      "Luxury freehold development in the heart of Newton, offering exclusive living spaces with premium finishes.",
    features: ["Freehold", "Luxury finishes", "Prime location", "Full facilities"],
    district: "11",
    tenure: "Freehold",
    propertyType: "Condominium",
    status: "Launching Soon",
    totalUnits: "56 Units",
    totalFloors: "24 Floors",
    siteArea: "12,000 sq ft",
    latitude: 1.2834,
    longitude: 103.8598,
    unitTypes: [
      { type: "1 Bedroom", size: "484 - 527 sq ft", price: "From $1.2M" },
      { type: "2 Bedroom", size: "678 - 753 sq ft", price: "From $1.8M" },
      { type: "3 Bedroom", size: "1,076 - 1,184 sq ft", price: "From $2.8M" },
      { type: "4 Bedroom", size: "1,518 - 1,636 sq ft", price: "From $4.2M" },
    ],
    floorPlans: [
      { type: "1 Bedroom", image: "/placeholder.svg?height=400&width=600&text=1+Bedroom+Floor+Plan" },
      { type: "2 Bedroom", image: "/placeholder.svg?height=400&width=600&text=2+Bedroom+Floor+Plan" },
      { type: "3 Bedroom", image: "/placeholder.svg?height=400&width=600&text=3+Bedroom+Floor+Plan" },
      { type: "4 Bedroom", image: "/placeholder.svg?height=400&width=600&text=4+Bedroom+Floor+Plan" },
    ],
    locationAnalytics: {
      mrt: [
        { name: "Newton MRT", distance: "300m" },
        { name: "Orchard MRT", distance: "800m" },
      ],
      schools: [
        { name: "Anglo-Chinese School (Junior)", distance: "400m" },
        { name: "St. Margaret's Primary School", distance: "600m" },
      ],
      amenities: [
        { name: "United Square", distance: "250m" },
        { name: "Goldhill Plaza", distance: "400m" },
      ],
      parks: [{ name: "Newton Green", distance: "150m" }],
    },
    mediaReviews: [
      {
        source: "The Edge Property",
        date: "2024-02-15",
        title: "10 Evelyn: A Rare Freehold Gem in Newton",
        excerpt: "The development offers a unique opportunity for investors and homeowners alike...",
        rating: 4.5,
      },
      {
        source: "PropertyGuru",
        date: "2024-02-10",
        title: "Why 10 Evelyn is the Talk of Newton",
        excerpt: "With its prime location and luxury finishes, 10 Evelyn stands out...",
        rating: 4.8,
      },
    ],
    similarProjects: [
      {
        name: "The Avenir",
        location: "River Valley",
        price: "From $2.5M",
        priceRange: "$2.5M - $4.8M",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
        units: "376 Units",
        unitsAvailable: "376 Units",
        propertySizeRange: "614 - 1,862 sqft",
        developer: "Hong Leong Group",
        completion: "2025",
        slug: "the-avenir",
        type: "Luxury Condominium",
        coordinates: { lat: 1.3521, lng: 103.8198 },
      },
      {
        name: "Midtown Modern",
        location: "Bugis",
        price: "From $1.8M",
        priceRange: "$1.8M - $3.8M",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
        units: "558 Units",
        unitsAvailable: "558 Units",
        propertySizeRange: "678 - 1,862 sqft",
        developer: "GuocoLand",
        completion: "2024",
        slug: "midtown-modern",
        type: "Mixed Development",
        coordinates: { lat: 1.3521, lng: 103.8198 },
      },
    ],
  }

  // State management
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIdx, setGalleryIdx] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPlan, setSelectedPlan] = useState<{ type: string; image: string } | null>(null)
  const [selectedAmenityType, setSelectedAmenityType] = useState("schools")
  const [selectedAmenity, setSelectedAmenity] = useState<GooglePlace | null>(null)
  const [realAmenitiesData, setRealAmenitiesData] = useState<Record<string, GooglePlace[]>>({})
  const [isLoadingAmenities, setIsLoadingAmenities] = useState(false)

  // Calculate units left percentage
  const totalUnits = Number.parseInt((project.totalUnits || "0").replace(/[^0-9]/g, ""))
  const unitsAvailable = Number.parseInt((project.units || "0").replace(/[^0-9]/g, ""))
  const unitsLeftPercent = totalUnits > 0 ? Math.round((unitsAvailable / totalUnits) * 100) : 0

  // Navigation functions
  const nextImage = () => {
    setGalleryIdx((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setGalleryIdx((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
    setActiveTab(sectionId)
  }

  // Tab configuration
  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "pricing", label: "Unit Types & Pricing", icon: BarChart2 },
    { id: "floor-plans", label: "Floor Plans", icon: Layout },
    { id: "location", label: "Location", icon: MapPin },
    { id: "site-plan", label: "Site Plan", icon: FileText },
    { id: "about", label: "About", icon: Home },
  ]

  // Amenity tabs configuration
  const amenityTabs = [
    { key: "all", label: "All", icon: MapPinned },
    { key: "schools", label: "Schools", icon: School },
    { key: "transport", label: "Transport", icon: Train },
    { key: "shopping", label: "Shopping Mall", icon: ShoppingBag },
    { key: "food", label: "Food Centre", icon: Utensils },
    { key: "groceries", label: "Groceries", icon: ShoppingCart },
    { key: "recreation", label: "Recreation", icon: Trees },
  ]

  // Mock amenities data
  const mockAmenitiesData: Record<string, GooglePlace[]> = {
    schools: [
      {
        placeId: "school1",
        name: "White Sands Primary School",
        address: "2 Pasir Ris Street 11, Singapore 519075",
        location: { lat: 1.2834, lng: 103.8598 },
        type: "Primary School",
        distance: "3.5 km",
        duration: "11 mins",
        transportMode: "Driving",
        isNearest: true,
      },
      {
        placeId: "school2",
        name: "Pasir Ris Primary School",
        address: "5 Pasir Ris Street 21, Singapore 518968",
        location: { lat: 1.2834, lng: 103.8598 },
        type: "Primary School",
        distance: "3.7 km",
        duration: "12 mins",
        transportMode: "Driving",
      },
    ],
    transport: [
      {
        placeId: "transport1",
        name: "Pasir Ris MRT (EW1)",
        address: "Pasir Ris Central, Singapore 519634",
        location: { lat: 1.2834, lng: 103.8598 },
        type: "MRT Station",
        distance: "3.2 km",
        duration: "10 mins",
        transportMode: "Driving",
        isNearest: true,
      },
    ],
    shopping: [
      {
        placeId: "shopping1",
        name: "White Sands Mall",
        address: "1 Pasir Ris Central Street 3, Singapore 518457",
        location: { lat: 1.2834, lng: 103.8598 },
        type: "Shopping Mall",
        distance: "3.3 km",
        duration: "10 mins",
        transportMode: "Driving",
        isNearest: true,
      },
    ],
    food: [
      {
        placeId: "food1",
        name: "Pasir Ris Central Hawker Centre",
        address: "110 Pasir Ris Central, Singapore 519641",
        location: { lat: 1.2834, lng: 103.8598 },
        type: "Food Centre",
        distance: "3.4 km",
        duration: "10 mins",
        transportMode: "Driving",
        isNearest: true,
      },
    ],
    groceries: [
      {
        placeId: "groceries1",
        name: "Giant Supermarket",
        address: "1 Pasir Ris Close, Singapore 519599",
        location: { lat: 1.2834, lng: 103.8598 },
        type: "Supermarket",
        distance: "3.8 km",
        duration: "12 mins",
        transportMode: "Driving",
        isNearest: true,
      },
    ],
    recreation: [
      {
        placeId: "recreation1",
        name: "Pasir Ris Park",
        address: "Pasir Ris Green, Singapore 510534",
        location: { lat: 1.2834, lng: 103.8598 },
        type: "Park",
        distance: "4.1 km",
        duration: "13 mins",
        transportMode: "Driving",
        isNearest: true,
      },
    ],
  }

  const facilities = ["Arrival Lobby", "Pool Lounge", "Gym", "BBQ Pavilion", "Playground", "Function Room", "Garden"]

  // Load amenities data
  useEffect(() => {
    setIsLoadingAmenities(true)
    setTimeout(() => {
      setRealAmenitiesData(mockAmenitiesData)
      setIsLoadingAmenities(false)
    }, 1000)
  }, [])

  const amenitiesArray =
    selectedAmenityType === "all"
      ? Object.values(realAmenitiesData).flat()
      : realAmenitiesData[selectedAmenityType] || []

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1c1c1d] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <p className="text-gray-400">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#1c1c1d] text-white">
      {/* Header Spacing */}
      <div className="w-full bg-[#1c1c1d] h-16" />

      {/* Breadcrumbs */}
      <nav className="bg-[#242728] py-3 px-4 text-sm text-gray-300">
        <div className="container mx-auto">
          <ol className="flex space-x-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/condos" className="hover:underline">
                Condos & Apartments
              </Link>
            </li>
            <li>/</li>
            <li className="text-red-500 font-semibold">{project.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-black">
        <div className="relative w-full h-[500px] overflow-hidden">
          <Image
            src={project.images[galleryIdx] || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover cursor-zoom-in"
            priority
            onClick={() => setGalleryOpen(true)}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Navigation Controls */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              setGalleryOpen(true)
            }}
            aria-label="Enlarge image"
          >
            <Maximize2 className="w-6 h-6 text-white" />
          </button>

          {/* Project Info Overlay */}
          <div className="absolute left-0 bottom-0 p-8 text-white z-10 w-full">
            <div className="container mx-auto">
              <div className="uppercase text-sm font-medium mb-2 text-gray-200">
                {project.propertyType} • {project.tenure}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>

              {/* Address and Key Info */}
              <div className="flex items-center gap-2 text-gray-200 mb-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <span className="text-lg">{project.address}</span>
              </div>

              <div className="flex flex-wrap gap-4 text-gray-200 text-base">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-red-500" />
                  {project.developer}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-red-500" />
                  TOP {project.completion}
                </div>
                <div className="flex items-center">
                  <Home className="h-5 w-5 mr-2 text-red-500" />
                  {project.totalUnits}
                </div>
                <div className="flex items-center bg-black/60 px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-white">
                    Units Left: {unitsAvailable}/{totalUnits} ({unitsLeftPercent}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Modal */}
        <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
          <DialogContent className="max-w-4xl bg-black p-0">
            <DialogTitle>
              <span className="sr-only">Gallery for {project.title}</span>
            </DialogTitle>
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={project.images[galleryIdx] || "/placeholder.svg"}
                alt={`${project.title} enlarged image`}
                fill
                className="object-contain rounded"
              />
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Tabs Navigation */}
      <div className="sticky top-16 z-50 bg-[#1c1c1d] border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="overflow-x-auto flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-red-500 text-red-500"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                  onClick={() => scrollToSection(tab.id)}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button className="bg-red-500 hover:bg-red-600 text-white">Sale listings</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#1c1c1d] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Column */}
            <div className="lg:w-8/12">
              {/* Overview Section */}
              <div id="overview" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-white">OVERVIEW</h2>

                {/* Price Ranges */}
                <div className="bg-[#242728] border border-gray-700 rounded-lg p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-gray-400 mb-2">Sale Range</h3>
                      <div className="text-2xl font-bold mb-1 text-white">{project.price}</div>
                      <div className="text-sm text-gray-400">{project.pricePerSqFt}</div>
                    </div>

                    <div>
                      <h3 className="text-gray-400 mb-2">Unit Sizes</h3>
                      <div className="text-2xl font-bold mb-1 text-white">{project.size}</div>
                      <div className="text-sm text-gray-400">
                        {project.bedrooms} bedrooms • {project.bathrooms} bathrooms
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="bg-[#242728] border border-gray-700 rounded-lg p-6 mb-8">
                  <h3 className="font-bold text-lg mb-4 text-white">{project.title} Highlights</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>

                  <div className="space-y-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="flex-shrink-0 mt-1 text-red-500">▶</div>
                        <div>
                          <p className="text-gray-300">{feature}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="bg-[#242728] border border-gray-700 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-white">Facilities</h3>
                  <div className="flex flex-wrap gap-4">
                    {facilities.map((facility, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm font-medium text-gray-300"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Investment Analysis */}
                <div className="bg-[#242728] border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">Investment Analysis</h3>
                  <MoatRadarChart
                    moat={{
                      project: project.title,
                      exitAudience: 4.2,
                      districtDisparityEffect: 3.8,
                      mrtProximity: 4.5,
                      parentsAttractionEffect: 3.9,
                      quantumEffect: 4.1,
                      rentalDemand: 4.3,
                      regionDisparityEffect: 3.7,
                      volumeEffect: 4.0,
                      balasCurveEffect: 4.4,
                      landsizeDensity: 3.6,
                    }}
                  />
                </div>
              </div>

              {/* Floor Plans Section */}
              <div id="floor-plans" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-white">FLOOR PLANS</h2>

                <div className="bg-[#242728] border border-gray-700 rounded-lg p-6">
                  <Tabs defaultValue={project.floorPlans[0]?.type || ""} className="w-full">
                    <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-800">
                      {project.floorPlans.map((plan) => (
                        <TabsTrigger
                          key={plan.type}
                          value={plan.type}
                          className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-300"
                        >
                          {plan.type}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {project.floorPlans.map((plan) => (
                      <TabsContent key={plan.type} value={plan.type}>
                        <div className="relative aspect-[4/3] cursor-pointer" onClick={() => setSelectedPlan(plan)}>
                          <Image
                            src={plan.image || "/placeholder.svg"}
                            alt={`${plan.type} floor plan`}
                            fill
                            className="object-contain border border-gray-600 rounded-lg"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/20 transition-opacity">
                            <span className="bg-black/80 text-white px-4 py-2 rounded-lg shadow-sm">
                              Click to enlarge
                            </span>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>

                <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
                  <DialogContent className="max-w-4xl p-0 bg-black">
                    <DialogTitle>
                      <span className="sr-only">Floor plan for {selectedPlan?.type}</span>
                    </DialogTitle>
                    {selectedPlan && (
                      <div className="relative w-full aspect-[4/3]">
                        <Image
                          src={selectedPlan.image || "/placeholder.svg"}
                          alt={`${selectedPlan.type} floor plan`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>

              {/* Location Section */}
              <div id="location" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-white">LOCATION</h2>

                {/* Map and Amenities Section */}
                <div className="bg-[#242728] border border-gray-700 rounded-lg p-6 mb-8">
                  <div className="mb-6">
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-600">
                      <NearbyAmenitiesMap project={project} />
                    </div>
                  </div>

                  <Tabs value={selectedAmenityType} onValueChange={setSelectedAmenityType} className="w-full">
                    <TabsList className="mb-6 overflow-x-auto flex flex-wrap bg-gray-800">
                      {amenityTabs.map((tab) => (
                        <TabsTrigger
                          key={tab.key}
                          value={tab.key}
                          className="data-[state=active]:bg-red-500 data-[state=active]:text-white px-4 py-2 flex items-center gap-2 whitespace-nowrap text-gray-300"
                        >
                          <tab.icon className="h-4 w-4" />
                          <span>{tab.label}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {amenityTabs.map((tab) => (
                      <TabsContent key={tab.key} value={tab.key}>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                          {isLoadingAmenities ? (
                            <div className="flex items-center justify-center h-full">
                              <div className="text-gray-400">Loading amenities...</div>
                            </div>
                          ) : amenitiesArray.length > 0 ? (
                            amenitiesArray.map((place) => (
                              <div
                                key={place.placeId}
                                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                                  selectedAmenity?.placeId === place.placeId
                                    ? "bg-red-500/10 border border-red-500/20"
                                    : "bg-gray-800/50 border border-gray-700 hover:bg-gray-800"
                                }`}
                                onClick={() => setSelectedAmenity(place)}
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-medium text-white mb-1">{place.name}</h4>
                                    <p className="text-sm text-gray-400 mb-2">{place.address}</p>
                                    <div className="flex items-center gap-4 text-sm">
                                      <span className="text-gray-300 flex items-center gap-1">
                                        <MapPin className="h-4 w-4 text-red-500" />
                                        {place.distance}
                                      </span>
                                      <span className="text-gray-300 flex items-center gap-1">
                                        <Clock className="h-4 w-4 text-red-500" />
                                        {place.duration}
                                      </span>
                                      <span className="text-gray-300 flex items-center gap-1">
                                        <Train className="h-4 w-4 text-red-500" />
                                        {place.transportMode}
                                      </span>
                                    </div>
                                  </div>
                                  {place.isNearest && (
                                    <Badge className="bg-red-500/10 text-red-500 border border-red-500/20">
                                      Nearest
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center text-gray-400 py-8">No amenities found in this category</div>
                          )}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>

                {/* Location Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(project.locationAnalytics).map(([category, items]) => (
                    <Card key={category} className="bg-[#242728] border-gray-700">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white mb-3 capitalize">{category}</h3>
                        <ul className="space-y-2">
                          {items.map((item: LocationItem, idx: number) => (
                            <li key={idx} className="flex items-center justify-between text-sm">
                              <span className="text-gray-300">{item.name}</span>
                              <span className="text-gray-400">{item.distance}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* About Section */}
              <div id="about" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-white">ABOUT</h2>

                <div className="bg-[#242728] border border-gray-700 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4 text-white">Project Details</h3>
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 text-gray-400">Developer</td>
                            <td className="py-2 font-medium text-white">{project.developer}</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 text-gray-400">Tenure</td>
                            <td className="py-2 font-medium text-white">{project.tenure}</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 text-gray-400">TOP</td>
                            <td className="py-2 font-medium text-white">{project.completion}</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 text-gray-400">Total Units</td>
                            <td className="py-2 font-medium text-white">{project.totalUnits}</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 text-gray-400">Total Floors</td>
                            <td className="py-2 font-medium text-white">{project.totalFloors}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4 text-white">Unit Mix</h3>
                      <table className="w-full">
                        <tbody>
                          {project.unitTypes.map((unit, index) => (
                            <tr key={index} className="border-b border-gray-700">
                              <td className="py-2 text-gray-400">{unit.type}</td>
                              <td className="py-2 font-medium text-white">{unit.size}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-4/12">
              <div className="space-y-6 sticky top-[120px]">
                {/* Price Guide Widget */}
                <div className="bg-[#242728] border border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-red-500/10 border-b border-red-500/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BadgeDollarSign className="h-5 w-5 text-red-500" />
                      <h3 className="text-lg font-bold text-red-500">Find out your home worth now!</h3>
                    </div>
                    <p className="text-sm text-gray-300">Estimate your home's market price in seconds!</p>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <Input
                        placeholder="Enter your postal code"
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      />
                    </div>
                    <Button className="w-full bg-red-500 hover:bg-red-600">Calculate value</Button>
                  </div>
                </div>

                {/* Listings Tabs */}
                <div className="bg-[#242728] border border-gray-700 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <h3 className="font-bold mb-4 text-white">For Sale</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="border-b border-gray-700 pb-4">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium text-white">
                              {project.unitTypes[item % project.unitTypes.length].type}
                            </span>
                            <span className="text-red-500 font-bold">
                              {project.unitTypes[item % project.unitTypes.length].price}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">
                            {project.unitTypes[item % project.unitTypes.length].size} • High Floor • North Facing
                          </p>
                          <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-500/10">
                            View Details
                          </Button>
                        </div>
                      ))}
                      <Button className="w-full bg-red-500 hover:bg-red-600">View All Sale Listings</Button>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-[#242728] border border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold mb-4 text-white">Interested in {project.title}?</h3>
                  <form className="space-y-4">
                    <Input
                      placeholder="Your name"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />
                    <Input
                      placeholder="Your email"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />
                    <Input
                      placeholder="Your phone"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />

                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select unit type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        {project.unitTypes.map((unit, index) => (
                          <SelectItem key={index} value={unit.type} className="text-gray-300 hover:bg-gray-800">
                            {unit.type} - {unit.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <textarea
                      rows={4}
                      placeholder="I'm interested in this project..."
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    />

                    <Button className="w-full bg-red-500 hover:bg-red-600">Get in touch</Button>
                  </form>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mr-3">
                        <Phone className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Call</div>
                        <div className="font-medium text-white">+65 8123 4567</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mr-3">
                        <Mail className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Email</div>
                        <div className="font-medium text-white">newlaunches@example.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
