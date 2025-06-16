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
  Dumbbell,
  Flame,
  Flower,
  DoorOpen,
  Users,
  Martini,
  Sliders,
  ChevronDown,
  Search,
} from "lucide-react"
import dynamic from "next/dynamic"
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"

// Import components
import MoatRadarChart from "@/app/components/MoatRadarChart"
import TdsrCalculator from "@/app/components/TdsrCalculator"

// TODO: Create these components
interface MoatRadarChartProps {
  moat: {
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
}

// import dynamic and set up dynamic import for NearbyAmenitiesMap
const NearbyAmenitiesMap = dynamic(() => import('@/app/components/NearbyAmenitiesMap'), { ssr: false });

interface ProjectPageClientProps {
  slug: string
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
  moat?: {
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

// Icon mapping for facilities
const facilityIconMap: Record<string, React.ReactNode> = {
  "Gym": <Dumbbell className="h-6 w-6 text-red-500" />,
  "BBQ Pavilion": <Flame className="h-6 w-6 text-red-500" />,
  "Playground": <Sliders className="h-6 w-6 text-red-500" />,
  "Pool Lounge": <Martini className="h-6 w-6 text-red-500" />,
  "Garden": <Flower className="h-6 w-6 text-red-500" />,
  "Arrival Lobby": <DoorOpen className="h-6 w-6 text-red-500" />,
  "Function Room": <Users className="h-6 w-6 text-red-500" />,
}

// Mock data for unit types & pricing table
const unitAvailabilityData = [
  {
    unitType: '1 Bedroom Units',
    subtypes: [
      { subtype: '1 BEDROOM+STUDY', size: '560 sqft', price: '$1,510,000 - $1,721,000', total: 68, available: 56, status: 82 },
    ],
  },
  {
    unitType: '2 Bedroom Units',
    subtypes: [
      { subtype: '2 BEDROOM', size: '646 sqft - 807 sqft', price: '$1,993,000 - $2,210,000', total: 170, available: 2, status: 1 },
      { subtype: '2 BEDROOM+STUDY', size: '700 sqft - 721 sqft', price: 'Not Applicable', total: 136, available: 0, status: 0 },
    ],
  },
  {
    unitType: '3 Bedroom Units',
    subtypes: [
      { subtype: '3 BEDROOM', size: '872 sqft - 1,141 sqft', price: '$2,966,000 - $3,120,000', total: 102, available: 6, status: 6 },
      { subtype: '3 BEDROOM PREMIER', size: '1,066 sqft - 1,302 sqft', price: '$3,047,000 - $3,735,000', total: 136, available: 33, status: 24 },
      { subtype: '3 BEDROOM+STUDY', size: '1,227 sqft - 1,464 sqft', price: '$3,452,000 - $4,336,000', total: 72, available: 60, status: 83 },
    ],
  },
  {
    unitType: '4 Bedroom Units',
    subtypes: [
      { subtype: '4 BEDROOM', size: '1,227 sqft - 1,518 sqft', price: '$3,593,000 - $4,209,000', total: 68, available: 10, status: 15 },
      { subtype: '4 BEDROOM PREMIER', size: '1,690 sqft - 2,034 sqft', price: '$4,759,000 - $5,879,000', total: 32, available: 29, status: 91 },
    ],
  },
  {
    unitType: '5 Bedroom Units',
    subtypes: [
      { subtype: '5 BEDROOM', size: '1,905 sqft - 2,260 sqft', price: '$5,567,000 - $6,669,000', total: 32, available: 29, status: 91 },
    ],
  },
]

// Dummy floor plan data based on unitTypes
const floorPlans = [
  {
    id: 'E4',
    label: 'E4',
    size: '1,722 sqft / 160 sqm',
    beds: 5,
    baths: 3,
    image: '/placeholder.svg?height=400&width=600&text=E4+Floor+Plan',
  },
  {
    id: 'E3',
    label: 'E3',
    size: '1,711 sqft / 159 sqm',
    beds: 5,
    baths: 3,
    image: '/placeholder.svg?height=400&width=600&text=E3+Floor+Plan',
  },
  {
    id: 'E2',
    label: 'E2',
    size: '1,690 sqft / 157 sqm',
    beds: 5,
    baths: 3,
    image: '/placeholder.svg?height=400&width=600&text=E2+Floor+Plan',
  },
  {
    id: 'E1',
    label: 'E1',
    size: '1,668 sqft / 155 sqm',
    beds: 5,
    baths: 3,
    image: '/placeholder.svg?height=400&width=600&text=E1+Floor+Plan',
  },
  {
    id: 'D9P',
    label: 'D9P',
    size: '1,335 sqft / 124 sqm',
    beds: 4,
    baths: 3,
    image: '/placeholder.svg?height=400&width=600&text=D9P+Floor+Plan',
  },
]

// Floor plan tabs
const floorPlanTabs = [
  { key: 'all', label: 'All' },
  { key: '1', label: '1' },
  { key: '2', label: '2' },
  { key: '3', label: '3' },
  { key: '4', label: '4' },
  { key: '5', label: '5+' },
]

// Dummy data for new floor plan UI
const floorPlanBedroomTabs = [
  { key: '1', label: '1 Bedroom' },
  { key: '2', label: '2 Bedroom' },
  { key: '3', label: '3 Bedroom' },
  { key: '4', label: '4 Bedroom' },
  { key: '5', label: '5 Bedroom' },
]
const floorPlanSubtypes = {
  '1': ['1 Bedroom'],
  '2': ['2 Bedroom'],
  '3': ['3 Bedroom', '3 Bedroom Premier'],
  '4': ['4 Bedroom', '4 Bedroom Premier'],
  '5': ['5 Bedroom'],
}
const floorPlanCodes = {
  '1 Bedroom': ['A', 'A-G'],
  '2 Bedroom': ['B', 'B-G'],
  '3 Bedroom': ['D'],
  '3 Bedroom Premier': ['E'],
  '4 Bedroom': ['G'],
  '4 Bedroom Premier': ['H'],
  '5 Bedroom': ['I'],
}
const floorPlanImages = {
  'A': '/floorplan-dummy.png',
  'A-G': '/floorplan-dummy.png',
  'B': '/floorplan-dummy.png',
  'B-G': '/floorplan-dummy.png',
  'C': '/floorplan-dummy.png',
  'D': '/floorplan-dummy.png',
  'E': '/floorplan-dummy.png',
  'F': '/floorplan-dummy.png',
  'G': '/floorplan-dummy.png',
  'H': '/floorplan-dummy.png',
  'I': '/floorplan-dummy.png',
}

// Floor Plan Section state and handlers
type BedroomTabKey = '1' | '2' | '3' | '4' | '5';
const bedroomTabKeys: BedroomTabKey[] = ['1', '2', '3', '4', '5'];

// Move this above its usage
const facilities: string[] = [
  "Arrival Lobby",
  "Pool Lounge",
  "Gym",
  "BBQ Pavilion",
  "Playground",
  "Function Room",
  "Garden",
];

export function ProjectPageClient({ slug }: ProjectPageClientProps) {
  // State management
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIdx, setGalleryIdx] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPlan, setSelectedPlan] = useState<{ type: string; image: string } | null>(null)
  const [selectedAmenityType, setSelectedAmenityType] = useState("schools")
  const [selectedAmenity, setSelectedAmenity] = useState<GooglePlace | null>(null)
  const [realAmenitiesData, setRealAmenitiesData] = useState<Record<string, GooglePlace[]>>({})
  const [isLoadingAmenities, setIsLoadingAmenities] = useState(false)

  // Floor Plan state
  const [bedroomTab, setBedroomTab] = useState<BedroomTabKey>('1')
  const [subtype, setSubtype] = useState<string>(floorPlanSubtypes['1'][0])
  const [code, setCode] = useState<string>(floorPlanCodes[floorPlanSubtypes['1'][0] as keyof typeof floorPlanCodes][0])

  // Update subtypes and code when bedroomTab changes
  const handleBedroomTab = (key: BedroomTabKey) => {
    setBedroomTab(key)
    const firstSubtype = floorPlanSubtypes[key as keyof typeof floorPlanSubtypes][0]
    setSubtype(firstSubtype)
    setCode(floorPlanCodes[firstSubtype as keyof typeof floorPlanCodes][0])
  }
  // Update code when subtype changes
  const handleSubtype = (st: string) => {
    setSubtype(st)
    setCode(floorPlanCodes[st as keyof typeof floorPlanCodes][0])
  }

  // Mock project data - replace with actual data fetching based on slug
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
    moat: {
      project: "10 Evelyn",
      exitAudience: 4.2,
      districtDisparityEffect: 3.8,
      mrtProximity: 4.5,
      parentsAttractionEffect: 3.9,
      quantumEffect: 4.1,
      rentalDemand: 4.3,
      regionDisparityEffect: 4.0,
      volumeEffect: 3.7,
      balasCurveEffect: 4.4,
      landsizeDensity: 3.6
    }
  }

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

  // Replace mock amenities data loading with real data fetching
  useEffect(() => {
    async function fetchAmenities() {
      if (!project.latitude || !project.longitude) return;
      setIsLoadingAmenities(true);
      const categories = [
        { key: 'schools', type: 'school' },
        { key: 'transport', type: 'transit_station' },
        { key: 'shopping', type: 'shopping_mall' },
        { key: 'food', type: 'restaurant' },
        { key: 'groceries', type: 'supermarket' },
        { key: 'recreation', type: 'park' },
      ];
      const results: Record<string, GooglePlace[]> = {};
      await Promise.all(categories.map(async (cat) => {
        try {
          const res = await fetch(`/api/places?lat=${project.latitude}&lng=${project.longitude}&type=${cat.type}`);
          if (res.ok) {
            const data = await res.json();
            results[cat.key] = data;
          } else {
            results[cat.key] = [];
          }
        } catch {
          results[cat.key] = [];
        }
      }));
      setRealAmenitiesData(results);
      setIsLoadingAmenities(false);
    }
    fetchAmenities();
  }, [project.latitude, project.longitude]);

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
                  {project.totalUnits} (50% SOLD)
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
          <div className="flex flex-row gap-6">
            {/* Main Content Column */}
            <div className="lg:w-8/12">
              {/* Project Overview Section (Revamped) */}
              <div id="overview" className="mb-8">
                {/* Section Title with horizontal line */}
                <h2 className="text-3xl font-bold text-left text-white mb-2">Project Overview</h2>
                <div className="border-b border-gray-600 mb-6 w-full" />

                {/* Project Details Section (with icons, two-column grid) */}
                <div className="bg-[#242728] border border-gray-700 rounded-lg p-6 mb-6">
                  <h4 className="text-xl font-bold text-left text-white mb-4">Project Details</h4>
                  <div className="border-b border-gray-600 mb-4 w-full" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {/* Left column */}
                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <div className="font-semibold text-red-500">Address</div>
                          <div className="text-white">{project.address}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Building2 className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <div className="font-semibold text-red-500">Developer</div>
                          <div className="text-white">{project.developer}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <div className="font-semibold text-red-500">Tenure</div>
                          <div className="text-white">{project.tenure}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Home className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <div className="font-semibold text-red-500">Total Units</div>
                          <div className="text-white">{project.totalUnits}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <div className="font-semibold text-red-500">Expected TOP</div>
                          <div className="text-white">{project.completion}</div>
                        </div>
                      </div>
                    </div>
                    {/* Right column */}
                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <Layout className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <div className="font-semibold text-red-500">Site Area</div>
                          <div className="text-white">{project.siteArea}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPinned className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <div className="font-semibold text-red-500">District</div>
                          <div className="text-white">{project.district}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Train className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <div className="font-semibold text-red-500">Nearest MRT</div>
                          <div className="text-white">{project.locationAnalytics.mrt[0]?.name}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Home className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <div className="font-semibold text-red-500">Bedrooms</div>
                          <div className="text-white">{project.bedrooms}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FileText className="h-6 w-6 text-red-500 mt-1" />
                        <div>
                          <div className="font-semibold text-red-500">Property Type</div>
                          <div className="text-white">{project.propertyType}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* About Section inside card */}
                  <div className="mt-8">
                    <h4 className="text-xl font-bold text-left text-white mb-2">About {project.title}</h4>
                    <div className="border-b border-gray-600 mb-4 w-full" />
                    <p className="text-gray-300 leading-relaxed mb-0">{project.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-4/12 space-y-6 sticky top-[120px]">
              {/* Price Guide Widget */}
              <div className="bg-[#242728] border border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-red-500/10 border-b border-red-500/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeDollarSign className="h-5 w-5 text-red-500" />
                    <h3 className="text-lg font-bold text-red-500">Find out your home worth now!</h3>
                  </div>
                </div>
                <div className="p-4">
                  
                  <Button className="w-full bg-red-500 hover:bg-red-600">Download Brochure</Button>
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

      {/* Site Plan & Facilities Section - Full Width, Two Columns */}
      <div className="w-full py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-left text-white mb-2">Site Plan & Facilities</h2>
          <div className="border-b border-gray-600 mb-6 w-full" />
          <div className="flex flex-row gap-8">
            {/* Site Plan Left */}
            <div className="md:w-7/12 w-full">
              <div className="bg-[#242728] border border-gray-700 rounded-lg p-6 flex flex-col items-center">
                <h4 className="text-xl font-bold text-left text-white mb-4 w-full">Site Plan</h4>
                <img
                  src="/siteplan-dummy.jpg"
                  alt="Site Plan"
                  className="w-full max-w-2xl rounded-lg object-contain"
                />
              </div>
            </div>
            {/* Facilities Right */}
            <div className="md:w-5/12 w-full">
              <div className="bg-[#242728] border border-gray-700 rounded-lg p-6">
                <h4 className="text-xl font-bold text-left text-white mb-4 w-full">Facilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {facilities.map((facility: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-4">
                      <span>
                        {facilityIconMap[facility] || <Layout className="h-6 w-6 text-red-500" />}
                      </span>
                      <span className="text-white text-base">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unit Listing Section - Full Width */}
      <div id="unit-listing" className="w-full py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-white">Unit Types & Pricing</h2>
          <div className="border-b border-gray-600 mb-6 w-full" />
          <div className="text-gray-300 mb-4">Overview of unit types, sizes, and availability</div>
          {/* Tab-like header */}
          <div className="flex mb-4">
            <button className="flex-1 py-2 rounded-tl-lg rounded-bl-lg font-semibold border border-red-500 bg-[#242728] text-red-500">Unit Availability</button>
            <button className="flex-1 py-2 rounded-tr-lg rounded-br-lg font-semibold border border-gray-700 bg-[#18191b] text-gray-400">Unit Distribution Chart</button>
          </div>
          {/* Table using shadcn/ui Table components and project.unitTypes */}
          <div className="bg-[#242728] rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#18191b] text-white text-left">
                  <TableHead className="px-4 py-3 font-semibold text-white">Unit Type</TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-white">Size Range</TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-white">Price</TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-white">Total Units</TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-white">Units Available</TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.unitTypes.map((unit, idx) => {
                  // Dummy values for demo
                  const total = 20 + idx * 10;
                  const available = 5 + idx * 3;
                  const percent = Math.round((available / total) * 100);
                  return (
                    <TableRow key={unit.type} className="border-t border-gray-700 bg-[#1c1c1d]">
                      <TableCell className="px-4 py-3 align-top font-bold text-white">{unit.type}</TableCell>
                      <TableCell className="px-4 py-3 align-top text-gray-300">{unit.size}</TableCell>
                      <TableCell className="px-4 py-3 align-top text-red-400">{unit.price}</TableCell>
                      <TableCell className="px-4 py-3 align-top text-gray-300">{total}</TableCell>
                      <TableCell className="px-4 py-3 align-top text-gray-300">{available}</TableCell>
                      <TableCell className="px-4 py-3 align-top">
                        <span className={percent > 0 ? 'text-green-400 font-semibold' : 'text-gray-500 font-semibold'}>
                          {percent}% Available
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="text-xs text-gray-400 px-4 py-2 border-t border-gray-700">
              * Price ranges are only shown for available units<br />
              * Size ranges represent the smallest and largest units in each category
            </div>
          </div>
        </div>
      </div>

      {/* Floor Plan Section - Full Width (Revamped) */}
      <div id="floor-plan" className="w-full py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-white">Floor Plans</h2>
          <div className="border-b border-gray-600 mb-6 w-full" />
          {/* Bedroom Tabs (full width) */}
          <div className="flex gap-2 mb-4">
            {floorPlanBedroomTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => handleBedroomTab(tab.key as BedroomTabKey)}
                className={`flex-1 px-4 py-2 rounded font-semibold text-sm transition-colors border ${bedroomTab === tab.key ? 'bg-[#18191b] border-red-500 text-red-500' : 'bg-[#242728] border-gray-700 text-gray-300 hover:bg-red-500/10 hover:text-red-500'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Subtype Tabs (full width) */}
          <div className="flex gap-2 mb-6">
            {(floorPlanSubtypes[bedroomTab as keyof typeof floorPlanSubtypes] || []).map((st: string) => (
              <button
                key={st}
                onClick={() => handleSubtype(st)}
                className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${subtype === st ? 'bg-red-500 text-white' : 'bg-[#242728] text-gray-400 hover:bg-red-500/10 hover:text-red-500'}`}
              >
                {st}
              </button>
            ))}
          </div>
          {/* Full width floor plan image */}
          <div className="bg-[#18191b] rounded-lg flex flex-col items-center justify-center p-6">
            <img
              src={floorPlanImages[(floorPlanCodes[subtype as keyof typeof floorPlanCodes] || [])[0] as keyof typeof floorPlanImages]}
              alt={`Floor Plan for ${subtype}`}
              className="object-contain max-h-[500px] w-full rounded"
            />
          </div>
        </div>
      </div>

      {/* Location Section - Full Width */}
      <div id="location" className="w-full py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-white">Nearby Amenities</h2>
          {/* Map and Amenities Section */}
          <div className="bg-[#242728] border border-gray-700 rounded-lg p-6 mb-8">
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
                  <div className="flex flex-row gap-6">
                    {/* Left: Amenity List */}
                    <div className="md:w-5/12 w-full max-h-[400px] overflow-y-auto pr-2">
                      <div className="space-y-4">
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
                    </div>
                    {/* Right: Map */}
                    <div className="md:w-7/12 w-full h-[400px] rounded-lg overflow-hidden border border-gray-600">
                      <NearbyAmenitiesMap
                        project={project}
                        amenities={amenitiesArray}
                        selectedAmenity={selectedAmenity}
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>

      {/* AI MOAT, TDSR Calculator - Full Width, Two Columns */}
      <div className="w-full py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-left text-white mb-2">AI MOAT Analysis & TDSR Calculator</h2>
          <div className="border-b border-gray-600 mb-6 w-full" />
          <div className="flex flex-row gap-8">
            {/* Left: AI MOAT */}
            <div className="w-7/12">
              <div className="bg-[#242728] border border-gray-700 rounded-lg p-6">
                <MoatRadarChart moat={project.moat} />
              </div>
            </div>
            {/* Right: TDSR Calculator */}
            <div className="w-5/12">
              <div className="bg-[#242728] border border-gray-700 rounded-lg p-6">
                <TdsrCalculator 
                  propertyPrice={parseFloat(project.priceFrom.replace(/[^0-9]/g, ''))}
                  loanTenure={30}
                  interestRate={3.5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
} 