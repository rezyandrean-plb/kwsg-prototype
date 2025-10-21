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
import { useToast } from "@/components/ui/use-toast"
import {
  Building2,
  MapPin,
  Calendar,
  Home,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
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
  MessageSquare,
  Dumbbell,
  Flame,
  Flower,
  DoorOpen,
  Users,
  Martini,
  Sliders,
  ChevronDown,
  Search,
  CheckCircle,
  Download,
  Bath,
  Droplets,
  Heart,
  Thermometer,
  Baby,
  Car,
  Shield,
  UserCheck,
  Coffee,
  BookOpen,
  Briefcase,
  Activity,
  Zap,
  Images,
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
import { MortgageLoanCalculator } from "@/app/components/calculators/mortgage-loan-calculator"

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

interface ImageGalleryItem {
  id: number
  project_name: string
  image_title: string
  image_url: string
  image_description: string
  image_category: string
  display_order: number
  is_featured: boolean
  alt_text: string
  image_size: string
  is_active: boolean
  created_at: string | null
  updated_at: string | null
  document_id: number | null
  published_at: string | null
  created_by_id: number | null
  updated_by_id: number | null
  locale: string | null
}

interface ProjectPageClientProps {
  slug: string
}

interface Agent {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  email: string;
  image: string;
  company: string;
  license: string;
  experience: string;
  languages: string[];
  specialties: string[];
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
  image_url_banner?: string | null
  imageGallery?: ImageGalleryItem[]
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
  // New API data fields
  unitPricing?: UnitPricing[]
  facilities?: Facility[]
  brochures?: Brochure[]
  sitePlans?: SitePlan[]
  apiFloorPlans?: any[]
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
  agent?: Agent;  // Optional agent property
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

// New interfaces for API data (matching Strapi response format)
interface UnitPricing {
  id: number
  project_id: number
  project_name: string
  unit_type: string
  price_from: string | number | null
  price_to: string | number | null
  available_unit: string | number
  total_unit: string | number
  bedrooms: string
  bathrooms: string
  size_sqft: number
  price_per_sqft: number | null
  currency: string
  payment_terms: string
  discount_info: string
  price: string | null
  price_range: string | null
  floor_plan_image: string | null
  floor_plan_id: number | null
  floor_plan_name: string | null
  is_available?: boolean
}

interface Facility {
  id: number
  name: string
  description: string
  icon: string | null
}

interface Brochure {
  id: number
  brochure_url: string
  brochure_title: string
  description: string
  file_type: string
  file_size: number | null
  is_active: boolean
  file_url: string
}

interface SitePlan {
  id: number
  project_id: number
  project_name: string
  site_plan_id: string
  site_plan_name: string
  image_url: string
  description: string
  layout_info: string | null
  is_primary: boolean
}

// Unit mix data structure
interface UnitMixData {
  bedroomType: string
  count: number
  percentage: number
  unitTypes: string[]
}

// Utility function to process unit mix data from API
const processUnitMixData = (unitPricing: UnitPricing[]): UnitMixData[] => {
  if (!unitPricing || unitPricing.length === 0) {
    return []
  }

  // Group units by bedroom count
  const bedroomGroups = unitPricing.reduce((acc, unit) => {
    // Parse bedrooms safely, handle both string and number
    const bedroomCount = typeof unit.bedrooms === 'string' 
      ? parseInt(unit.bedrooms) || 0 
      : unit.bedrooms || 0
    
    if (bedroomCount > 0) {
      if (!acc[bedroomCount]) {
        acc[bedroomCount] = {
          bedroomType: `${bedroomCount}-Bedroom`,
          count: 0,
          percentage: 0,
          unitTypes: []
        }
      }
      
      // Count units based on total_unit field if available, otherwise count as 1
      const unitCount = typeof unit.total_unit === 'number' 
        ? unit.total_unit 
        : typeof unit.total_unit === 'string' 
          ? parseInt(unit.total_unit) || 1 
          : 1
      
      acc[bedroomCount].count += unitCount
      
      // Add unique unit types
      if (unit.unit_type && !acc[bedroomCount].unitTypes.includes(unit.unit_type)) {
        acc[bedroomCount].unitTypes.push(unit.unit_type)
      }
    }
    return acc
  }, {} as Record<number, UnitMixData>)

  // Convert to array and calculate percentages
  const totalUnits = Object.values(bedroomGroups).reduce((sum, group) => sum + group.count, 0)
  
  return Object.values(bedroomGroups)
    .map(group => ({
      ...group,
      percentage: totalUnits > 0 ? Math.round((group.count / totalUnits) * 100) : 0
    }))
    .sort((a, b) => {
      const aBedrooms = parseInt(a.bedroomType.split('-')[0])
      const bBedrooms = parseInt(b.bedroomType.split('-')[0])
      return aBedrooms - bBedrooms
    })
}

// Utility function to format completion date to show only month and year
const formatCompletionDate = (completion: string | undefined): string => {
  if (!completion) return 'N/A'
  
  try {
    // Handle different date formats
    let date: Date
    
    if (completion.includes('-')) {
      // Handle YYYY-MM-DD or YYYY-MM format
      const parts = completion.split('-')
      if (parts.length >= 2) {
        const year = parseInt(parts[0])
        const month = parseInt(parts[1])
        date = new Date(year, month - 1) // month is 0-indexed in Date constructor
      } else {
        return completion
      }
    } else {
      // Try to parse as a date string
      date = new Date(completion)
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return completion
    }
    
    // Format as "Month YYYY"
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    })
  } catch (error) {
    return completion
  }
}

// Utility function to process unit availability data from API
const processUnitAvailabilityData = (unitPricing: any[]) => {
  if (!unitPricing || unitPricing.length === 0) {
    return [] // Return empty array if no data
  }

  // Group units by unit_type (Strapi format)
  const unitGroups = unitPricing.reduce((acc, unit) => {
    const unitType = unit.unit_type
    if (!unitType) return acc

    if (!acc[unitType]) {
      acc[unitType] = {
        unitType: unitType,
        subtypes: []
      }
    }
    
    // Format price range based on Strapi data
    let priceDisplay = 'Price on request'
    if (unit.price_from) {
      const fromPrice = parseInt(unit.price_from.toString().replace(/[^0-9]/g, ''))
      if (unit.price_to && unit.price_to > unit.price_from) {
        const toPrice = parseInt(unit.price_to.toString().replace(/[^0-9]/g, ''))
        priceDisplay = `$${fromPrice.toLocaleString()} - $${toPrice.toLocaleString()}`
      } else {
        priceDisplay = `$${fromPrice.toLocaleString()}`
      }
    } else if (unit.price_range) {
      priceDisplay = unit.price_range
    }

    // Format size range
    const sizeDisplay = unit.size_sqft ? `${unit.size_sqft.toLocaleString()} sqft` : 'Size N/A'

    // Calculate availability
    const totalUnits = parseInt(unit.total_unit) || 0
    const availableUnits = parseInt(unit.available_unit) || 0

    acc[unitType].subtypes.push({
      subtype: unit.unit_type,
      size: sizeDisplay,
      price: priceDisplay,
      price_from: unit.price_from,
      price_to: unit.price_to,
      price_per_sqft: unit.price_per_sqft,
      total: totalUnits,
      available: availableUnits,
      status: totalUnits > 0 ? Math.round((availableUnits / totalUnits) * 100) : 0,
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms,
      currency: unit.currency || 'SGD',
      payment_terms: unit.payment_terms,
      discount_info: unit.discount_info,
      floor_plan_image: unit.floor_plan_image
    })

    return acc
  }, {} as Record<string, any>)

  // Sort by unit type name for consistent ordering
  return Object.values(unitGroups).sort((a: any, b: any) => {
    // Extract bedroom count for sorting if possible
    const aBedrooms = parseInt(a.unitType.match(/(\d+)/)?.[1] || '0')
    const bBedrooms = parseInt(b.unitType.match(/(\d+)/)?.[1] || '0')
    return aBedrooms - bBedrooms
  })
}

// Helper function to find floor plan image for a unit type
const findFloorPlanImage = (unitType: string, apiFloorPlans: any[] = []): string | null => {
  if (!apiFloorPlans || apiFloorPlans.length === 0) {
    return null
  }

  // Extract bedroom count from unit type (e.g., "1 Bedroom Units" -> "1")
  const bedroomMatch = unitType.match(/(\d+)\s+Bedroom/)
  if (!bedroomMatch) {
    return null
  }

  const bedroomCount = bedroomMatch[1]
  
  // Try to find a floor plan that matches the bedroom count
  // First try exact match with bedroom count
  const exactMatch = apiFloorPlans.find(fp => fp.type === bedroomCount)
  if (exactMatch) {
    return exactMatch.image_url || exactMatch.image
  }

  // If no exact match, try to find any floor plan that might be related
  // This is a fallback for when floor plan types don't exactly match
  const fallbackMatch = apiFloorPlans.find(fp => 
    fp.type && fp.type.toLowerCase().includes(bedroomCount)
  )
  if (fallbackMatch) {
    return fallbackMatch.image_url || fallbackMatch.image
  }

  // If still no match, return the first available floor plan as a general fallback
  if (apiFloorPlans.length > 0) {
    return apiFloorPlans[0].image_url || apiFloorPlans[0].image
  }

  return null
}

// Icon mapping for facilities
const facilityIconMap: Record<string, React.ReactNode> = {
  "Gym": <Dumbbell className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "BBQ Pavilion": <Flame className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "BBQ Corner": <Flame className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Playground": <Sliders className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Pool Lounge": <Martini className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Garden": <Flower className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Arrival Lobby": <DoorOpen className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Function Room": <Users className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Club house": <Users className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Clubhouse": <Users className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Swimming Pool": <Droplets className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Pool": <Droplets className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Tennis Court": <Activity className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Basketball Court": <Activity className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Fitness Center": <Dumbbell className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Spa": <Heart className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Sauna": <Thermometer className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Steam Room": <Thermometer className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Children's Playground": <Baby className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Kids Playground": <Baby className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Parking": <Car className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Car Park": <Car className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Security": <Shield className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Concierge": <UserCheck className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Lounge": <Coffee className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Library": <BookOpen className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Business Center": <Briefcase className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Meeting Room": <Users className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Yoga Studio": <Activity className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Meditation Room": <Zap className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Rooftop Garden": <Flower className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Sky Garden": <Flower className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Outdoor Dining": <Utensils className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Al Fresco Dining": <Utensils className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Barbecue Area": <Flame className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "BBQ Area": <Flame className="h-6 w-6" style={{ color: '#ce001f' }} />,
}


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
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedBedroom, setSelectedBedroom] = useState<BedroomTabKey>('1')
  const [selectedSubtype, setSelectedSubtype] = useState<string>('')
  const [amenities, setAmenities] = useState<GooglePlace[]>([])
  const [unitsActiveTab, setUnitsActiveTab] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)
  
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  const { toast } = useToast()

  // State management
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [allImagesGalleryOpen, setAllImagesGalleryOpen] = useState(false)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<number>(0)
  
  // Debug log for gallery state
  useEffect(() => {
    console.log('Gallery state changed:', galleryOpen)
  }, [galleryOpen])
  const [galleryIdx, setGalleryIdx] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<{ type: string; image: string } | null>(null)
  const [selectedAmenityType, setSelectedAmenityType] = useState("schools")
  const [selectedAmenity, setSelectedAmenity] = useState<GooglePlace | null>(null)
  const [realAmenitiesData, setRealAmenitiesData] = useState<Record<string, GooglePlace[]>>({})
  const [isLoadingAmenities, setIsLoadingAmenities] = useState(false)
  const [showAllFacilities, setShowAllFacilities] = useState(false)

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

  // Intersection Observer for scroll-based active tab detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top and 70% from bottom
      threshold: 0
    }

    let scrollTimeout: NodeJS.Timeout

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          // Add a small delay to prevent rapid tab switching during smooth scrolling
          clearTimeout(scrollTimeout)
          scrollTimeout = setTimeout(() => {
            setActiveTab(sectionId)
          }, 100)
        }
      })
    }, observerOptions)

    // Observe all section elements
    const sections = tabs.map(tab => document.getElementById(tab.id)).filter(Boolean)
    sections.forEach(section => {
      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      clearTimeout(scrollTimeout)
      sections.forEach(section => {
        if (section) {
          observer.unobserve(section)
        }
      })
    }
  }, [project]) // Re-run when project loads

  // Function to fetch project data
  const fetchProject = async (projectSlug: string): Promise<Project | null> => {
    try {
      // 1) Try local proxy API first (handles slug/id and field mapping)
      const proxyRes = await fetch(`/api/projects-prisma/${encodeURIComponent(projectSlug)}`, { cache: 'no-store' })
      if (proxyRes.ok) {
        const proxyJson = await proxyRes.json()
        const p = proxyJson?.data
        if (p) {
          const banner = (p.image_url_banner ?? '').trim()
          const images = banner ? [banner] : [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
          ]
          const transformedFromProxy: Project = {
            id: p.id,
            name: p.name || p.project_name || '',
            project_name: p.project_name || p.name || '',
            slug: p.slug || projectSlug,
            title: p.name || p.project_name || '',
            location: p.location || '',
            address: p.address || '',
            type: p.type || p.propertyType || '',
            price: p.price || 'Price on request',
            priceFrom: p.price_from || '',
            pricePerSqFt: p.price_per_sqft || '',
            bedrooms: Array.isArray(p.bedrooms) ? p.bedrooms.join(', ') : (p.bedrooms || ''),
            bathrooms: p.bathrooms || '',
            size: p.size || '',
            images,
            image_url_banner: p.image_url_banner || null,
            imageGallery: p.imageGallery || [],
            units: p.units || '',
            developer: typeof p.developer === 'object' ? p.developer?.name || 'Developer not specified' : p.developer || 'Developer not specified',
            completion: p.completion || '',
            description: p.description || '',
            features: p.features || [],
            district: (p.district as any) || '',
            tenure: p.tenure || '',
            propertyType: p.propertyType || p.type || '',
            status: (p.status as any) || '',
            totalUnits: p.units || '',
            totalFloors: p.totalFloors || '',
            siteArea: p.siteArea || '',
            latitude: p.coordinates?.lat || p.latitude || 1.2834,
            longitude: p.coordinates?.lng || p.longitude || 103.8598,
            unitTypes: [
              { type: "1 Bedroom", size: "484 - 527 sq ft", price: "From $1.2M" },
              { type: "2 Bedroom", size: "678 - 753 sq ft", price: "From $1.8M" },
              { type: "3 Bedroom", size: "1,076 - 1,184 sq ft", price: "From $2.8M" },
              { type: "4 Bedroom", size: "1,518 - 1,636 sq ft", price: "From $4.2M" },
            ],
            floorPlans: p.floorPlans || [],
            locationAnalytics: {
              mrt: [ { name: "Nearest MRT", distance: "n/a" } ],
              schools: [ { name: "Nearby School", distance: "n/a" } ],
              amenities: [ { name: "Nearby Mall", distance: "n/a" } ],
              parks: [ { name: "Nearby Park", distance: "n/a" } ],
            },
            mediaReviews: [],
            similarProjects: [],
            unitPricing: p.unitPricing || [],
            facilities: p.facilities || [],
            brochures: [],
            sitePlans: [],
            apiFloorPlans: p.floorPlans || [],
            moat: {
              project: p.name || p.project_name || '',
              exitAudience: 4.2,
              districtDisparityEffect: 3.8,
              mrtProximity: 4.5,
              parentsAttractionEffect: 3.9,
              quantumEffect: 4.1,
              rentalDemand: 4.3,
              regionDisparityEffect: 4.0,
              volumeEffect: 3.7,
              balasCurveEffect: 4.4,
              landsizeDensity: 3.6,
            },
          }
          return transformedFromProxy
        }
      }

      // 2) Fallback: direct Strapi by slug (as before)
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://striking-hug-052e89dfad.strapiapp.com'
      const url = `${API_BASE}/api/projects?filters[slug][$eq]=${encodeURIComponent(projectSlug)}&populate=unitPricing,facilities,brochures,sitePlans`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch project by slug: ${response.status}`)
      }
      const data = await response.json()
      const item = Array.isArray(data?.data) ? data.data[0] : null
      if (!item) {
        return null
      }
      // Support both Strapi v4 (attributes) and flat payloads
      const attributes = (item as any).attributes ? (item as any).attributes : (item as any)
      const apiProject = { id: (item as any).id, ...attributes }

      const transformedProject: Project = {
        id: apiProject.id,
        name: apiProject.name || apiProject.project_name || '',
        project_name: apiProject.project_name || apiProject.name || '',
        slug: apiProject.slug || '',
        title: apiProject.name || apiProject.project_name || '',
        location: apiProject.location || '',
        address: apiProject.address || '',
        type: apiProject.type || apiProject.property_type || '',
        price: apiProject.price_from ? `From $${apiProject.price_from}M` : 'Price on request',
        priceFrom: apiProject.price_from || '',
        pricePerSqFt: apiProject.price_per_sqft || '',
        bedrooms: apiProject.bedrooms || '',
        bathrooms: apiProject.bathrooms || '',
        size: apiProject.size || '',
        images: apiProject.image_url_banner && apiProject.image_url_banner.trim() !== '' 
          ? [apiProject.image_url_banner]
          : [
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
            ],
        image_url_banner: apiProject.image_url_banner || null,
        imageGallery: apiProject.imageGallery || [],
        units: apiProject.units ? `${apiProject.units} Units` : '',
        developer: apiProject.developer?.name || apiProject.developer || 'Developer not specified',
        completion: apiProject.completion || '',
        description: apiProject.description || '',
        features: apiProject.features || [],
        district: apiProject.district || '',
        tenure: apiProject.tenure || '',
        propertyType: apiProject.property_type || apiProject.type || '',
        status: apiProject.status || '',
        totalUnits: apiProject.total_units ? `${apiProject.total_units} Units` : '',
        totalFloors: apiProject.total_floors ? `${apiProject.total_floors} Floors` : '',
        siteArea: apiProject.site_area || '',
        latitude: apiProject.latitude || 1.2834,
        longitude: apiProject.longitude || 103.8598,
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
          mrt: [ { name: "Nearest MRT", distance: "n/a" } ],
          schools: [ { name: "Nearby School", distance: "n/a" } ],
          amenities: [ { name: "Nearby Mall", distance: "n/a" } ],
          parks: [ { name: "Nearby Park", distance: "n/a" } ],
        },
        mediaReviews: [],
        similarProjects: [],
        unitPricing: apiProject.unitPricing?.data || apiProject.unitPricing || [],
        facilities: apiProject.facilities?.data || apiProject.facilities || [],
        brochures: apiProject.brochures?.data || apiProject.brochures || [],
        sitePlans: apiProject.sitePlans?.data || apiProject.sitePlans || [],
        apiFloorPlans: apiProject.floorPlans?.data || apiProject.floorPlans || [],
        moat: {
          project: apiProject.name || apiProject.project_name || '',
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

      return transformedProject
    } catch (error) {
      console.error('Error fetching project:', error)
      return null
    }
  }

  // Helper function to display "n/a" for empty values
  const displayValue = (value: unknown): string => {
    if (value === undefined || value === null) return 'n/a'
    const s = String(value).trim()
    if (s === '') return 'n/a'
    return s
  }

  // Helper function to check if a value should be displayed (not 'n/a')
  const shouldDisplayValue = (value: unknown): boolean => {
    if (value === undefined || value === null) return false
    const s = String(value).trim()
    return s !== '' && s.toLowerCase() !== 'n/a'
  }

  // Helper function to get display value for complex cases
  const getDisplayValue = (value: unknown, prefix?: string, suffix?: string): string => {
    if (value === undefined || value === null) return 'n/a'
    const s = String(value).trim()
    if (s === '') return 'n/a'
    return prefix ? `${prefix} ${s}${suffix || ''}` : s
  }


  // Fetch project data on component mount
  useEffect(() => {
    const loadProject = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const projectData = await fetchProject(slug)
        if (projectData) {
          console.log('Using API data for project')
          console.log('Project developer field:', projectData.developer)
          setProject(projectData)
        } else {
          console.log('API returned no data')
          setError('Project not found')
        }
      } catch (error) {
        console.error('Error loading project:', error)
        setError('Failed to load project data')
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [slug])

  // Calculate units left percentage
  const totalUnits = Number.parseInt((project?.totalUnits || "0").replace(/[^0-9]/g, ""))
  const unitsAvailable = Number.parseInt((project?.units || "0").replace(/[^0-9]/g, ""))
  const unitsLeftPercent = totalUnits > 0 ? Math.round((unitsAvailable / totalUnits) * 100) : 0

  // Navigation functions
  const nextImage = () => {
    if (project) {
      setGalleryIdx((prev) => (prev + 1) % project.images.length)
    }
  }

  const prevImage = () => {
    if (project) {
      setGalleryIdx((prev) => (prev - 1 + project.images.length) % project.images.length)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
    // Don't set activeTab here - let the Intersection Observer handle it
  }

  // Tab configuration
  const tabs = [
    { id: "overview", label: "Project Overview", icon: Info },
    { id: "details", label: "Project Details", icon: FileText },
    { id: "site-plan", label: "Site Plan", icon: Layout },
    { id: "facilities", label: "Facilities", icon: Home },
    { id: "location", label: "Location", icon: MapPin },
    // { id: "ai-moat", label: "AI MOAT", icon: BarChart2 },
    { id: "pricing", label: "Unit & Pricing", icon: BadgeDollarSign },
    { id: "contact", label: "Contact Agent", icon: Phone },
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
      if (!project?.latitude || !project?.longitude) return;
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
    if (project) {
      fetchAmenities();
    }
  }, [project?.latitude, project?.longitude]);

  // Helper function to extract numeric distance for sorting
  const extractNumericDistance = (distanceStr: string): number => {
    const match = distanceStr.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : Number.MAX_VALUE;
  };

  const amenitiesArray = (() => {
    const rawArray = selectedAmenityType === "all"
      ? Object.values(realAmenitiesData).flat()
      : realAmenitiesData[selectedAmenityType] || [];
    
    // Sort by distance (nearest first)
    return rawArray.sort((a, b) => {
      const distanceA = extractNumericDistance(a.distance);
      const distanceB = extractNumericDistance(b.distance);
      return distanceA - distanceB;
    });
  })()

  // Handle download site plan
  const handleDownloadSitePlan = () => {
    toast({
      title: "Site Plan will be downloaded...",
      description: "Your site plan is being prepared for download.",
    })
  }

  // Handle download brochure
  const handleDownloadBrochure = () => {
    toast({
      title: "Brochure will be downloaded...",
      description: "Your project brochure is being prepared for download.",
    })
  }

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setSubmitError('Please fill in all required fields')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          projectTitle: project?.title || 'Project'
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitSuccess(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
        
        toast({
          title: "Message sent successfully!",
          description: result.message,
        })
        
        // Reset success state after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
      
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1c1c1d] text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#ce001f] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold mb-2">Loading project...</h1>
          <p className="text-gray-400">Please wait while we fetch the project details.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1c1c1d] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error loading project</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#ce001f] hover:bg-[#b3001a] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

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
      {/* 
        Responsive Breakpoint Strategy:
        - Mobile: < 1024px (lg) - Stacked layout
        - Desktop: >= 1024px (lg) - Side-by-side layout
        - Using lg: breakpoint (1024px) for consistent desktop experience
        - Added min-width constraints to prevent layout issues
      */}
      <style jsx>{`
        @media (min-width: 1024px) {
          .overview-container {
            flex-direction: row !important;
          }
          .overview-left {
            width: 50% !important;
            min-width: 400px !important;
          }
          .overview-right {
            width: 50% !important;
            min-width: 400px !important;
          }
        }
      `}</style>
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
              <Link href="/projects" className="hover:underline">
                New Launch
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#ce001f] font-semibold">{project.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-black">
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
            <Image
              src={project.image_url_banner && project.image_url_banner.trim() !== '' 
                ? project.image_url_banner 
                : project.images[galleryIdx] || "/placeholder.svg"}
              alt={project.title || "Project banner image"}
              fill
              className="object-cover cursor-zoom-in"
              priority
              onClick={() => setGalleryOpen(true)}
            />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <button
            className="absolute bottom-4 right-16 sm:right-20 bg-black/60 hover:bg-black/80 rounded-lg px-2 sm:px-3 py-2 transition-colors z-20 cursor-pointer flex items-center gap-1 sm:gap-2"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log('Show gallery button clicked')
              setAllImagesGalleryOpen(true)
            }}
            onMouseDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            aria-label="Show all gallery"
            type="button"
          >
            <Images className="w-3 h-3 sm:w-4 sm:h-4 text-white pointer-events-none" />
            <span className="text-white text-xs sm:text-sm font-medium hidden sm:inline">Show All Images</span>
            <span className="text-white text-xs font-medium sm:hidden">Gallery</span>
          </button>
          <button
            className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors z-20 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log('Enlarge button clicked, setting galleryOpen to true')
              setGalleryOpen(true)
            }}
            onMouseDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            aria-label="Enlarge image"
            type="button"
          >
            <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 text-white pointer-events-none" />
          </button>

          {/* Project Info Overlay */}
          <div className="absolute left-0 bottom-0 p-4 sm:p-6 md:p-8 text-white z-10 w-full">
            <div className="container mx-auto">
              <div className="uppercase text-xs sm:text-sm font-medium mb-2 text-gray-200">
                {project.propertyType} • {project.tenure}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">{project.title}</h1>

              {/* Address and Key Info */}
              <div className="flex items-center gap-2 text-gray-200 mb-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#ce001f' }} />
                <span className="text-sm sm:text-base md:text-lg">{project.address.replace(/,?\s*\d{6}$/, '')}</span>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-4 text-gray-200 text-sm sm:text-base">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" style={{ color: '#ce001f' }} />
                  <span className="truncate">{(() => {
                    console.log('Rendering developer field:', project.developer);
                    return project.developer || 'Developer not available';
                  })()}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" style={{ color: '#ce001f' }} />
                  <span className="whitespace-nowrap">TOP {project.completion ? new Date(project.completion).getFullYear() : 'TBD'}</span>
                </div>
                <div className="flex items-center">
                  <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" style={{ color: '#ce001f' }} />
                  <span className="whitespace-nowrap">{project.totalUnits}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Modal */}
        <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
          <DialogContent className="max-w-4xl w-[95vw] sm:w-full bg-black p-0">
            <DialogTitle>
              <span className="sr-only">Gallery for {project.title}</span>
            </DialogTitle>
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={project.image_url_banner && project.image_url_banner.trim() !== '' 
                  ? project.image_url_banner 
                  : project.images[galleryIdx] || "/placeholder.svg"}
                alt={`${project.title} enlarged image`}
                fill
                className="object-contain rounded"
              />
              <button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors z-10"
                onClick={() => setGalleryOpen(false)}
                aria-label="Close modal"
              >
                <span className="text-white text-lg sm:text-xl">&times;</span>
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* All Images Gallery Modal */}
        <Dialog open={allImagesGalleryOpen} onOpenChange={setAllImagesGalleryOpen}>
          <DialogContent className="max-w-6xl w-[95vw] sm:w-full bg-black p-0">
            <DialogTitle>
              <span className="sr-only">Image Gallery for {project.title}</span>
            </DialogTitle>
            <div className="relative w-full max-h-[80vh] overflow-hidden">
              {/* Main Image Display */}
              <div className="relative w-full aspect-[16/9]">
                {project.imageGallery && project.imageGallery.length > 0 ? (
                  <Image
                    src={project.imageGallery[selectedGalleryImage]?.image_url || "/placeholder.svg"}
                    alt={project.imageGallery[selectedGalleryImage]?.alt_text || project.title || "Project gallery image"}
                    fill
                    className="object-contain rounded"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <p>No images available</p>
                  </div>
                )}
                
                {/* Navigation Controls */}
                {project.imageGallery && project.imageGallery.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors z-10"
                      onClick={() => setSelectedGalleryImage(prev => 
                        prev === 0 ? project.imageGallery!.length - 1 : prev - 1
                      )}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </button>
                    <button
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors z-10"
                      onClick={() => setSelectedGalleryImage(prev => 
                        (prev + 1) % project.imageGallery!.length
                      )}
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </button>
                  </>
                )}
                
                {/* Close Button */}
                <button
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors z-10"
                  onClick={() => setAllImagesGalleryOpen(false)}
                  aria-label="Close modal"
                >
                  <span className="text-white text-lg sm:text-xl">&times;</span>
                </button>
              </div>
              


              {/* All Images Preview Strip */}
              {project.imageGallery && project.imageGallery.length > 0 ? (
                <div className="p-2 sm:p-4 bg-gray-800">
                  <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                    {project.imageGallery.map((image, index) => (
                      <div
                        key={image.id}
                        className={`flex-shrink-0 w-24 h-18 sm:w-32 sm:h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          selectedGalleryImage === index 
                            ? 'border-[#ce001f]' 
                            : 'border-gray-600 hover:border-gray-400'
                        }`}
                        onClick={() => setSelectedGalleryImage(index)}
                      >
                        <Image
                          src={image.image_url}
                          alt={image.alt_text || image.image_title || "Project thumbnail image"}
                          width={128}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-2 sm:p-4 bg-gray-800">
                  <div className="text-white text-center py-4">
                    <p className="text-sm sm:text-base">No additional images available</p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Tabs Navigation */}
      <div className="sticky top-16 z-50 bg-[#1c1c1d] border-b border-gray-800">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex justify-between items-center">
            <div className="w-full">
              {/* Mobile: 2 rows layout */}
              <div className="block lg:hidden">
                <div className="grid grid-cols-4 gap-1 py-3">
                  {tabs.slice(0, 4).map((tab) => (
                    <button
                      key={tab.id}
                      className={`flex flex-col items-center gap-1 px-1 sm:px-2 py-2 sm:py-3 border-b-2 transition-all duration-300 ease-in-out min-h-[60px] ${
                        activeTab === tab.id
                          ? "border-[#ce001f] text-[#ce001f]"
                          : "border-transparent text-gray-400 hover:text-white"
                      }`}
                      onClick={() => scrollToSection(tab.id)}
                    >
                      <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-xs sm:text-sm font-medium text-center leading-tight">{tab.label}</span>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-1 py-3">
                  {tabs.slice(4, 8).map((tab) => (
                    <button
                      key={tab.id}
                      className={`flex flex-col items-center gap-1 px-1 sm:px-2 py-2 sm:py-3 border-b-2 transition-all duration-300 ease-in-out min-h-[60px] ${
                        activeTab === tab.id
                          ? "border-[#ce001f] text-[#ce001f]"
                          : "border-transparent text-gray-400 hover:text-white"
                      }`}
                      onClick={() => scrollToSection(tab.id)}
                    >
                      <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-xs sm:text-sm font-medium text-center leading-tight">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Desktop: Single row with smaller font */}
              <div className="hidden lg:block">
                <div className="overflow-x-auto flex w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <div className="flex min-w-full">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition-all duration-300 ease-in-out flex-shrink-0 ${
                          activeTab === tab.id
                            ? "border-[#ce001f] text-[#ce001f]"
                            : "border-transparent text-gray-400 hover:text-white"
                        }`}
                        onClick={() => scrollToSection(tab.id)}
                      >
                        <tab.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <section id="overview" className="w-full bg-[#1c1c1d] py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-screen-xl">
          <h2 className="text-2xl sm:text-3xl font-light mb-3 text-white text-center tracking-wide">Project Overview</h2>
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 sm:w-16 h-1 bg-[#ce001f] rounded" />
          </div>
          <div 
            className="flex flex-col gap-6 sm:gap-8 items-stretch min-h-[300px] sm:min-h-[400px] overview-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              alignItems: 'stretch',
              minHeight: '300px'
            }}
          >
            
            {/* Left Section */}
            <div 
              className="w-full flex flex-col gap-4 sm:gap-6 min-h-[300px] sm:min-h-[400px] overview-left"
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                minHeight: '300px'
              }}
            >
              <div className="text-xl sm:text-2xl font-semibold text-[#ce001f] mb-2">{project?.title}</div>
              <div className="text-gray-200 text-sm sm:text-base leading-relaxed">
                <div 
                  className={`whitespace-pre-line ${
                    !showFullDescription ? 'max-h-[100px] sm:max-h-[120px] overflow-hidden' : ''
                  }`}
                  style={{
                    display: !showFullDescription ? '-webkit-box' : 'block',
                    WebkitLineClamp: !showFullDescription ? '4' : 'unset',
                    WebkitBoxOrient: !showFullDescription ? 'vertical' : 'unset',
                    overflow: !showFullDescription ? 'hidden' : 'visible'
                  }}
                >
                  {project?.description}
                </div>
                {project?.description && project.description.length > 300 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-[#ce001f] hover:text-[#b3001a] font-medium mt-2 transition-colors text-sm sm:text-base"
                  >
                    {showFullDescription ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>
              <div className="bg-[#ce001f]/10 border border-[#ce001f]/20 rounded-lg p-4 sm:p-6 mt-2 sm:mt-4">
                <span className="text-[#ce001f] italic text-base sm:text-lg">
                  {"Where modern architecture meets timeless elegance, creating homes that inspire and endure."}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div 
              className="w-full flex flex-col items-center gap-4 min-h-[250px] sm:min-h-[400px] overview-right"
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                minHeight: '250px'
              }}
            >
              <div className="relative w-full aspect-[4/3] bg-[#e5e5e5] rounded-xl overflow-hidden">
                <img
                  src={project?.images[0] || '/placeholder.svg'}
                  alt={project?.title || 'Project Image'}
                  className="object-cover w-full h-full rounded-xl"
                  style={{
                    objectPosition: 'center center'
                  }}
                />
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-4 bg-black/70 rounded-lg px-3 sm:px-6 py-2 sm:py-3 border border-gray-700 backdrop-blur-sm">
                  <div className="flex flex-col items-center min-w-[80px] sm:min-w-[100px]">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#ce001f]">{project?.totalUnits?.replace(/[^0-9]/g, '') || '0'}</span>
                    <span className="text-xs text-gray-300 mt-1">Total Units</span>
                  </div>
                  <div className="flex flex-col items-center min-w-[80px] sm:min-w-[100px]">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#ce001f]">
                      {formatCompletionDate(project?.completion)}
                    </span>
                    <span className="text-xs text-gray-300 mt-1">Expected TOP</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Project Details Section */}
      <section id="details" className="w-full py-6 sm:py-8 mb-6 sm:mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-light mb-3 text-white text-center tracking-wide">Project Details</h2>
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 sm:w-16 h-1 bg-[#ce001f] rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* HIGH PRIORITY - Location & Connectivity */}
            {/* Address */}
            {shouldDisplayValue(project?.address) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Address</div>
                  <div className="text-white font-light text-sm sm:text-base truncate">{displayValue(project?.address?.replace(/,?\s*\d{6}$/, ''))}</div>
                </div>
              </div>
            )}
            {/* District */}
            {shouldDisplayValue(project?.district) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">District</div>
                  <div className="text-white font-light text-sm sm:text-base">{`District ${displayValue(project.district)}`}</div>
                </div>
              </div>
            )}
            {/* Nearest MRT */}
            {project?.locationAnalytics?.mrt[0]?.name && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <Train className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Nearest MRT</div>
                  <div className="text-white font-light text-sm sm:text-base truncate">
                    {`${project.locationAnalytics.mrt[0].name} (${project.locationAnalytics.mrt[0].distance})`}
                  </div>
                </div>
              </div>
            )}
            {/* Tenure */}
            {shouldDisplayValue(project?.tenure) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Tenure</div>
                  <div className="text-white font-light text-sm sm:text-base">{displayValue(project?.tenure)}</div>
                </div>
              </div>
            )}

            {/* HIGH PRIORITY - Pricing & Investment */}
            {/* Average PSF */}
            {shouldDisplayValue(project?.pricePerSqFt) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <BadgeDollarSign className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Average PSF</div>
                  <div className="text-white font-light text-sm sm:text-base">{`From ${displayValue(project.pricePerSqFt)}`}</div>
                </div>
              </div>
            )}
            {/* Expected TOP */}
            {shouldDisplayValue(project?.completion) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Expected TOP</div>
                  <div className="text-white font-light text-sm sm:text-base">
                    {formatCompletionDate(project?.completion)}
                  </div>
                </div>
              </div>
            )}
            {/* Property Type */}
            {shouldDisplayValue(project?.propertyType) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Property Type</div>
                  <div className="text-white font-light text-sm sm:text-base">{displayValue(project?.propertyType)}</div>
                </div>
              </div>
            )}
            {/* Developer */}
            {shouldDisplayValue(project?.developer) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Developer</div>
                  <div className="text-white font-light text-sm sm:text-base truncate">{displayValue(project?.developer)}</div>
                </div>
              </div>
            )}

            {/* MEDIUM PRIORITY - Unit Configuration */}
            {/* Total Units */}
            {shouldDisplayValue(project?.totalUnits) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <Home className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Total Units</div>
                  <div className="text-white font-light text-sm sm:text-base">{displayValue(project?.totalUnits)}</div>
                </div>
              </div>
            )}
            {/* Bedrooms */}
            {shouldDisplayValue(project?.bedrooms) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <Home className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Bedrooms</div>
                  <div className="text-white font-light text-sm sm:text-base">{`${displayValue(project.bedrooms)} bedrooms`}</div>
                </div>
              </div>
            )}
            {/* Floor Size */}
            {shouldDisplayValue(project?.size) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <Layout className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Floor Size</div>
                  <div className="text-white font-light text-sm sm:text-base">{displayValue(project?.size)}</div>
                </div>
              </div>
            )}
            {/* Floors */}
            {shouldDisplayValue(project?.totalFloors) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Floors</div>
                  <div className="text-white font-light text-sm sm:text-base">{displayValue(project?.totalFloors)}</div>
                </div>
              </div>
            )}

            {/* LOWER PRIORITY - Technical Details */}
            {/* Site Area */}
            {shouldDisplayValue(project?.siteArea) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <Layout className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Site Area</div>
                  <div className="text-white font-light text-sm sm:text-base">{displayValue(project?.siteArea)}</div>
                </div>
              </div>
            )}
            {/* Blocks */}
            {shouldDisplayValue(project?.totalUnits) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Blocks</div>
                  <div className="text-white font-light text-sm sm:text-base">
                    {`${Math.ceil(Number(project.totalUnits.replace(/[^0-9]/g, '')) / 7)} blocks`}
                  </div>
                </div>
              </div>
            )}
            {/* Car Park Lots */}
            {shouldDisplayValue(project?.totalUnits) && (
              <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
                <Home className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-400 text-xs sm:text-sm">Car Park Lots</div>
                  <div className="text-white font-light text-sm sm:text-base">
                    {`${project.totalUnits.replace(/[^0-9]/g, '')} lots`}
                  </div>
                </div>
              </div>
            )}
            {/* Zoning */}
            <div className="bg-[#18191b] rounded-lg p-4 sm:p-6 flex items-center gap-2 sm:gap-3 border border-gray-700">
              <Building2 className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0" style={{ color: '#ce001f' }} />
              <div className="min-w-0 flex-1">
                <div className="text-gray-400 text-xs sm:text-sm">Zoning</div>
                <div className="text-white font-light text-sm sm:text-base">Residential</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Site Plan Section */}
      <section id="site-plan" className="w-full py-8 mb-2">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-light mb-3 text-white text-center tracking-wide">Site Plan</h2>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-[#ce001f] rounded" />
          </div>

          {/* Responsive Flex Container */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 min-h-[400px] site-plan-container">
            {/* Site Plan Left */}
            <div className="flex-1 bg-[#242728] rounded-lg flex flex-col items-center justify-center min-h-[300px] lg:min-h-[400px] site-plan-left">
              <img
                src={project?.sitePlans && project.sitePlans.length > 0 ? project.sitePlans[0].image_url : "/siteplan-dummy.jpg"}
                alt="Site Plan"
                className="w-full h-auto max-w-full rounded-lg object-contain"
              />
            </div>
            {/* Legend Right */}
            <div className="w-full lg:w-80 bg-[#242728] border border-gray-700 rounded-lg p-4 lg:p-6 flex flex-col justify-between min-h-[300px] lg:min-h-[400px] site-plan-right">
              <div>
                <h4 className="text-lg lg:text-xl font-light text-left text-[#ce001f] mb-4">Site Plan Details</h4>
                <div className="space-y-4">
                  {/* Project Info */}
                  <div className="border-b border-gray-700 pb-3">
                    <h5 className="text-white font-medium text-sm mb-2">Project Information</h5>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex justify-between">
                        <span>Developer:</span>
                        <span className="text-white">{project?.developer || 'TBA'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Units:</span>
                        <span className="text-white">{project?.totalUnits || 'TBA'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Site Area:</span>
                        <span className="text-white">{project?.siteArea || 'TBA'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completion:</span>
                        <span className="text-white">{formatCompletionDate(project?.completion) || 'TBA'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Unit Types */}
                  {project?.unitTypes && project.unitTypes.length > 0 && (
                    <div className="border-b border-gray-700 pb-3">
                      <h5 className="text-white font-medium text-sm mb-2">Unit Types</h5>
                      <div className="space-y-2">
                        {project.unitTypes.slice(0, 4).map((unitType, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className={`inline-block w-2 h-2 rounded-full ${index === 0 ? 'bg-[#ce001f]' : index === 1 ? 'bg-blue-500' : index === 2 ? 'bg-cyan-400' : 'bg-green-500'} flex-shrink-0`} />
                            <div className="text-xs text-gray-300">
                              <span className="text-white">{unitType.type}</span>
                              <div className="text-gray-400">{unitType.size}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Features */}
                  {project?.features && project.features.length > 0 && (
                    <div>
                      <h5 className="text-white font-medium text-sm mb-2">Key Features</h5>
                      <div className="space-y-2">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className={`inline-block w-2 h-2 rounded-full ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-purple-500' : 'bg-pink-400'} flex-shrink-0`} />
                            <span className="text-xs text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button className="mt-6 lg:mt-8 w-full bg-[#ce001f] hover:bg-[#b3001a] text-white font-light py-3 rounded-full text-base lg:text-lg transition-colors" onClick={handleDownloadSitePlan}>
                Download Site Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="w-full py-8 sm:py-12 lg:py-16 mb-2 bg-[#1c1c1d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Title and Subtitle */}
          <h2 className="text-2xl sm:text-3xl font-light mb-3 text-white text-center tracking-wide">Facilities</h2>
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 sm:w-16 h-1 bg-[#ce001f] rounded" />
          </div>
          <p className="text-center font-light text-gray-400 mb-6 sm:mb-8 lg:mb-10 text-sm sm:text-base">
            Premium amenities designed for modern luxury living
          </p>
          {/* Facilities Grid */}
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {(() => {
                // Use API facilities data if available
                const displayFacilities = project?.facilities && project.facilities.length > 0 
                  ? project.facilities 
                  : []
                
                // Filter out facilities with null, empty, or whitespace-only names (including invisible characters)
                const validFacilities = displayFacilities.filter((facility: any) => {
                  if (!facility.name) return false
                  
                  // Remove all whitespace and invisible characters
                  const cleanName = facility.name.replace(/\s/g, '').replace(/[\u200B-\u200D\uFEFF]/g, '')
                  
                  return cleanName.length > 0
                })
                
                // If no valid facilities, show a message
                if (validFacilities.length === 0) {
                  return (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-400">No facilities information available at the moment.</p>
                      <p className="text-sm text-gray-500 mt-2">Please check back later for updated facility information.</p>
                    </div>
                  )
                }
                
                // Show only first 9 facilities initially, or all if showAllFacilities is true
                const facilitiesToShow = showAllFacilities ? validFacilities : validFacilities.slice(0, 9)
                
                return facilitiesToShow.map((facility: any, idx: number) => (
                  <div
                    key={facility.id || idx}
                    className="flex items-center gap-2 sm:gap-3 bg-[#232324] rounded-lg px-3 sm:px-4 py-3 sm:py-4 shadow-sm"
                  >
                    <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#ce001f]/20 flex-shrink-0">
                      {facilityIconMap[facility.name] || (
                        <Layout className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#ce001f' }} />
                      )}
                    </span>
                    <span className="text-white font-light text-sm sm:text-base truncate">{facility.name}</span>
                  </div>
                ))
              })()}
            </div>
            
            {/* Show More/Less Button */}
            {(() => {
              const displayFacilities = project?.facilities && project.facilities.length > 0 
                ? project.facilities 
                : []
              
              const validFacilities = displayFacilities.filter((facility: any) => {
                if (!facility.name) return false
                const cleanName = facility.name.replace(/\s/g, '').replace(/[\u200B-\u200D\uFEFF]/g, '')
                return cleanName.length > 0
              })
              
              // Only show button if there are more than 9 facilities
              if (validFacilities.length > 9) {
                return (
                  <div className="flex justify-center mt-4 sm:mt-6">
                    <button
                      onClick={() => setShowAllFacilities(!showAllFacilities)}
                      className="bg-[#ce001f] hover:bg-[#b3001a] text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                    >
                      {showAllFacilities ? (
                        <>
                          <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Show Less</span>
                          <span className="sm:hidden">Less</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Show More ({validFacilities.length - 9} more)</span>
                          <span className="sm:hidden">More ({validFacilities.length - 9})</span>
                        </>
                      )}
                    </button>
                  </div>
                )
              }
              
              return null
            })()}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="w-full py-8 mb-2 bg-[#1c1c1d]">
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Title and Subtitle */}
          <div className="text-center mb-4">
            <h2 className="text-4xl font-light text-white mb-3 tracking-wide">Location & Connectivity</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-gray-400 text-base font-light">Premium living in Singapore's most connected district</p>
          </div>
          {/* Map and Amenities Section */}
          <div className="flex flex-col gap-0 overflow-hidden mb-4">
            {/* Tabs as Pills - Full width, above both columns */}
            <div className="w-full px-6 pt-6 pb-2 border-b border-gray-700 mb-4">
              <div className="flex flex-nowrap gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent" style={{ WebkitOverflowScrolling: 'touch' }}>
                {amenityTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedAmenityType(tab.key)}
                    className={`px-6 py-3 rounded-full font-medium flex items-center gap-2 text-sm transition-all duration-200 border-2 focus:outline-none whitespace-nowrap ${
                      selectedAmenityType === tab.key 
                        ? 'bg-[#ce001f] border-[#ce001f] text-white shadow-lg' 
                        : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover:text-white'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Two-column layout below tabs */}
            <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8 min-h-[500px] location-container">
              {/* Left: Amenity List */}
              <div className="w-full lg:w-4/12 min-w-0 p-4 lg:p-6 flex flex-col h-[300px] lg:h-[500px] location-left">
                {/* Amenity List */}
                <div className="flex-1 overflow-y-auto pr-2">
                  <div className="space-y-3 lg:space-y-4">
                    {isLoadingAmenities ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-gray-400">Loading amenities...</div>
                      </div>
                    ) : amenitiesArray.length > 0 ? (
                      amenitiesArray.map((place) => (
                        <div
                          key={place.placeId}
                          className={`p-3 lg:p-4 rounded-lg cursor-pointer transition-colors ${selectedAmenity?.placeId === place.placeId ? "bg-[#ce001f]/10 border border-[#ce001f]/20" : "bg-gray-800/50 border border-gray-700 hover:bg-gray-800"}`}
                          onClick={() => setSelectedAmenity(place)}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className="flex-shrink-0 mt-1">
                              {selectedAmenityType === 'schools' && <School className="h-4 w-4 lg:h-5 lg:w-5" style={{ color: '#ce001f' }} />}
                              {selectedAmenityType === 'transport' && <Train className="h-4 w-4 lg:h-5 lg:w-5" style={{ color: '#ce001f' }} />}
                              {selectedAmenityType === 'shopping' && <ShoppingBag className="h-4 w-4 lg:h-5 lg:w-5" style={{ color: '#ce001f' }} />}
                              {selectedAmenityType === 'food' && <Utensils className="h-4 w-4 lg:h-5 lg:w-5" style={{ color: '#ce001f' }} />}
                              {selectedAmenityType === 'groceries' && <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5" style={{ color: '#ce001f' }} />}
                              {selectedAmenityType === 'recreation' && <Trees className="h-4 w-4 lg:h-5 lg:w-5" style={{ color: '#ce001f' }} />}
                              {selectedAmenityType === 'all' && <MapPinned className="h-4 w-4 lg:h-5 lg:w-5" style={{ color: '#ce001f' }} />}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-light text-white mb-1 text-sm lg:text-base truncate">{place.name}</h4>
                                  <p className="text-xs lg:text-sm text-gray-400 mb-2 line-clamp-2">{place.address}</p>
                                </div>
                                {place.isNearest && (
                                  <Badge className="bg-[#ce001f]/10 text-[#ce001f] border border-[#ce001f]/20 text-xs lg:text-sm flex-shrink-0">Nearest</Badge>
                                )}
                              </div>
                              
                              {/* Distance and transport info in one row on desktop */}
                              <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 text-xs lg:text-sm amenity-distance-info">
                                <span className="text-gray-300 flex items-center gap-1">
                                  <MapPin className="h-3 w-3 lg:h-4 lg:w-4" style={{ color: '#ce001f' }} />
                                  {place.distance}
                                </span>
                                <span className="text-gray-300 flex items-center gap-1">
                                  <Clock className="h-3 w-3 lg:h-4 lg:w-4" style={{ color: '#ce001f' }} />
                                  {place.duration}
                                </span>
                                <span className="text-gray-300 flex items-center gap-1">
                                  <Train className="h-3 w-3 lg:h-4 lg:w-4" style={{ color: '#ce001f' }} />
                                  {place.transportMode}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-400 py-8">No amenities found in this category</div>
                    )}
                  </div>
                </div>
              </div>
              {/* Right: Map */}
              <div className="w-full lg:w-8/12 min-w-0 flex flex-col h-[300px] lg:h-[500px] location-right">
                <div className="flex-1 w-full h-full min-h-[300px] lg:min-h-[500px]">
                  <NearbyAmenitiesMap
                    project={project}
                    amenities={amenitiesArray}
                    selectedAmenity={selectedAmenity}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Prime Connectivity Section */}
          <div className="w-full flex justify-center">
            <div className="max-w-3xl w-full bg-[#18191b] rounded-xl p-2 border border-gray-800 text-center mt-2">
              <div className="text-lg text-[#ce001f] font-light mb-2 tracking-wide">Prime Connectivity</div>
              <div className="text-gray-300 text-light font-light">
                Experience unparalleled connectivity with direct access to Newton MRT station, major expressways including the Central Expressway (CTE) and Pan Island Expressway (PIE), and seamless connections to Orchard Road, Marina Bay, and Changi Airport within 30 minutes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI MOAT Section */}
      {/* <section id="ai-moat" className="w-full py-8 mb-2">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-light text-white mb-3 tracking-wide">AI MOAT Analysis</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
          <div className="flex flex-col items-center md:items-center md:justify-center">
            <div className="w-full md:w-7/12 min-w-0 mx-auto">
              <div className="bg-[#242728] border border-gray-700 rounded-lg text-center">
                <MoatRadarChart moat={project.moat} />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Unit Mix Section */}
      <div className="w-full flex flex-col items-center py-4">
        <div className="max-w-7xl w-full py-10 px-4 flex flex-col items-center">
          <h3 className="text-xl font-light text-red-400 mb-8 text-center tracking-wide">Unit Mix</h3>
          <div className={`w-full flex flex-row gap-6 px-2 ${(() => {
            const unitMixData = processUnitAvailabilityData(project?.unitPricing || [])
            return unitMixData.length > 6 
              ? 'overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent' 
              : 'overflow-x-visible'
          })()}`} style={{ WebkitOverflowScrolling: 'touch' }}>
            {(() => {
              // Process unit mix data from API using the same function as Units & Pricing Section
              const unitMixData = processUnitAvailabilityData(project?.unitPricing || [])
              
              // Show message if no data available
              if (unitMixData.length === 0) {
                return (
                  <div className="w-full text-center py-8">
                    <p className="text-gray-400 text-sm">Unit mix data not available</p>
                  </div>
                )
              }

              return unitMixData.map((unit: any, index: number) => {
                // Calculate total available units for this type
                const totalAvailable = unit.subtypes.reduce((sum: number, subtype: any) => sum + subtype.available, 0)
                const totalUnits = unit.subtypes.reduce((sum: number, subtype: any) => sum + subtype.total, 0)
                const percentage = totalUnits > 0 ? Math.round((totalAvailable / totalUnits) * 100) : 0
                
                return (
                  <div key={unit.unitType} className={`bg-[#232324] rounded-xl py-8 flex flex-col items-center justify-center hover:bg-[#2a2b2c] transition-colors duration-300 min-w-[120px] ${unitMixData.length > 6 ? 'flex-shrink-0' : 'flex-1'}`}>
                    <span className="text-3xl font-light text-white mb-2">{totalUnits}</span>
                    <span className="text-gray-400 font-light text-center">{unit.unitType.replace(' Units', '')}</span>
                    {percentage > 0 && (
                      <span className="text-xs text-gray-500 mt-1">({percentage}% available)</span>
                    )}
                    {unit.subtypes.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500 text-center">
                        <span className="block">{unit.subtypes.length} type{unit.subtypes.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                )
              })
            })()}
          </div>
          {/* Additional unit mix information */}
          {project?.unitPricing && project.unitPricing.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                {(() => {
                  // Use the same data processing as Units & Pricing Section
                  const unitMixData: any[] = processUnitAvailabilityData(project?.unitPricing || [])
                  
                  if (unitMixData.length === 0) {
                    return 'No unit information available'
                  }
                  
                  // Calculate totals across all unit types
                  const totalUnits = unitMixData.reduce((sum: number, unit: any) => 
                    sum + unit.subtypes.reduce((subSum: number, subtype: any) => subSum + subtype.total, 0), 0)
                  const totalAvailable = unitMixData.reduce((sum: number, unit: any) => 
                    sum + unit.subtypes.reduce((subSum: number, subtype: any) => subSum + subtype.available, 0), 0)
                  
                  // Calculate price range from all units
                  const priceRange = project.unitPricing.filter(u => u.price_from && u.price_from !== '0' && u.price_from !== 0)
                  
                  let priceInfo = 'Price on request'
                  if (priceRange.length > 0) {
                    const prices = priceRange.map(u => {
                      const price = typeof u.price_from === 'number' ? u.price_from : (u.price_from ? parseFloat(u.price_from.toString()) : 0)
                      return price
                    }).filter(p => p > 0)
                    
                    if (prices.length > 0) {
                      const minPrice = Math.min(...prices)
                      const maxPrice = Math.max(...prices)
                      priceInfo = `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`
                    }
                  }
                  
                  return `Total Units: ${totalUnits} | Available: ${totalAvailable} | Price Range: ${priceInfo}`
                })()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Units & Pricing Section */}
      <section id="pricing" className="w-full py-6 sm:py-8 mb-4">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-3 text-white text-center tracking-wide">Unit & Pricing</h2>
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 sm:w-16 h-1 bg-[#ce001f] rounded" />
          </div>
          <p className="text-gray-400 text-sm sm:text-base font-light text-center mb-4 sm:mb-6">Discover your perfect home from our collection of meticulously designed residences</p>

          {/* Tabs for unit types */}
          <div className="w-full px-2 sm:px-6 pt-4 sm:pt-6 pb-2 border-b border-gray-700 mb-6 sm:mb-8">
            <div className="flex flex-nowrap gap-1 sm:gap-2 justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent" style={{ WebkitOverflowScrolling: 'touch' }}>
              {(() => {
                const dynamicUnitData = processUnitAvailabilityData(project?.unitPricing || [])
                
                // If no API data, show message
                if (dynamicUnitData.length === 0) {
                  return (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-400">No unit information available at the moment.</p>
                      <p className="text-sm text-gray-500 mt-2">Please check back later or contact our agents for more details.</p>
                    </div>
                  )
                }
                
                return dynamicUnitData.map((unit: any, idx: number) => {
                  // Calculate total available units for this type
                  const totalAvailable = unit.subtypes.reduce((sum: number, subtype: any) => sum + subtype.available, 0)
                  const totalUnits = unit.subtypes.reduce((sum: number, subtype: any) => sum + subtype.total, 0)
                  
                  return (
                    <button
                      key={unit.unitType}
                      onClick={() => setUnitsActiveTab(idx)}
                      className={`px-2 sm:px-4 py-2 rounded-full font-light flex items-center gap-1 sm:gap-2 text-xs sm:text-sm transition-colors border focus:outline-none whitespace-nowrap ${unitsActiveTab === idx ? 'bg-gray-800 border-[#ce001f] text-white' : 'bg-[#18191b] border-gray-700 text-gray-300 hover:bg-[#ce001f]/10 hover:text-[#ce001f]'}`}
                    >
                      <span>{unit.unitType.replace(' Units', '')}</span>
                      {totalAvailable > 0 && (
                        <span className="bg-green-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full">
                          {totalAvailable}
                        </span>
                      )}
                    </button>
                  )
                })
              })()}
            </div>
          </div>
        </div>

        {/* Card layout for selected unit type - Full width section */}
        {(() => {
          const dynamicUnitData = processUnitAvailabilityData(project?.unitPricing || [])
          const currentUnit = dynamicUnitData[unitsActiveTab] || dynamicUnitData[0]
          
          // If no data available, show fallback
          if (!currentUnit) {
            return (
              <div className="w-full px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-center items-stretch bg-[#111] rounded-xl p-4 lg:p-8 shadow-lg pricing-container">
                    <div className="w-full text-center text-gray-400 py-8">
                      <p>No unit information available at the moment.</p>
                      <p className="text-sm mt-2">Please check back later or contact our agents for more details.</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          
          // Calculate total availability for this unit type
          const totalAvailable = (currentUnit as any).subtypes.reduce((sum: number, subtype: any) => sum + subtype.available, 0)
          const totalUnits = (currentUnit as any).subtypes.reduce((sum: number, subtype: any) => sum + subtype.total, 0)
          
          return (
            <div className="w-full">
              {/* Unit type header */}
              {/* <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{(currentUnit as any).unitType.replace(' Units', '')}</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <span className="text-gray-400">Total Units: <span className="text-white font-medium">{totalUnits}</span></span>
                  <span className="text-gray-400">Available: <span className="text-green-400 font-medium">{totalAvailable}</span></span>
                  <span className="text-gray-400">Availability: <span className="text-white font-medium">{totalUnits > 0 ? Math.round((totalAvailable / totalUnits) * 100) : 0}%</span></span>
                </div>
              </div> */}
              
              {/* Subtype cards - Constrained width container */}
              <div className="w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="w-full space-y-6">
                  {(currentUnit as any).subtypes.map((subtype: any, subtypeIndex: number) => (
                    <div key={subtypeIndex} className="w-full bg-[#111] rounded-xl shadow-lg border border-gray-800 overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
                        {/* Left Column - Floor Plan Image */}
                        <div className="order-1">
                          {(() => {
                            const floorPlanImage = subtype.floor_plan_image
                            return (
                              <div className="relative w-full h-80 md:h-full min-h-[400px]">
                                <Image
                                  src={floorPlanImage || `/placeholder.svg?height=400&width=600&text=${encodeURIComponent((currentUnit as any).unitType.replace(' Units', '') + ' Floor Plan')}`}
                                  alt={`${(currentUnit as any).unitType.replace(' Units', '')} Floor Plan`}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
                                  Floor Plan
                                </div>
                              </div>
                            )
                          })()}
                        </div>
                        
                        {/* Right Column - Content */}
                        <div className="p-6 sm:p-8 order-2 flex flex-col justify-between">
                          <div className="space-y-6">
                            {/* Subtype header */}
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg sm:text-xl font-semibold text-white">{subtype.subtype}</h4>
                              <div className="flex flex-col items-end">
                                <span className="text-green-400 font-semibold text-sm sm:text-lg">{subtype.available} of {subtype.total}</span>
                                <span className="text-gray-400 text-xs">Available</span>
                              </div>
                            </div>
                            
                            {/* Unit specifications */}
                            <div className="grid grid-cols-3 gap-4 sm:gap-6">
                              <div className="text-center">
                                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-900/60 mx-auto mb-3">
                                  <Home className="h-6 w-6 sm:h-7 sm:w-7 text-red-400" />
                                </div>
                                <span className="text-white text-sm font-medium">{subtype.bedrooms || 'N/A'} Bedrooms</span>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-900/60 mx-auto mb-3">
                                  <Bath className="h-6 w-6 sm:h-7 sm:w-7 text-red-400" />
                                </div>
                                <span className="text-white text-sm font-medium">{subtype.bathrooms || 'N/A'} Bathrooms</span>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-900/60 mx-auto mb-3">
                                  <Layout className="h-6 w-6 sm:h-7 sm:w-7 text-red-400" />
                                </div>
                                <span className="text-white text-sm font-medium">{subtype.size}</span>
                              </div>
                            </div>
                            
                            {/* Pricing information */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                <span className="text-gray-400 text-sm">Price Range:</span>
                                <span className="text-white font-medium">{subtype.price}</span>
                              </div>
                              {subtype.price_per_sqft && (
                                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                  <span className="text-gray-400 text-sm">Price per sqft:</span>
                                  <span className="text-white text-sm">
                                    ${subtype.price_per_sqft.toLocaleString()} {subtype.currency || 'SGD'}
                                  </span>
                                </div>
                              )}
                              {subtype.payment_terms && (
                                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                  <span className="text-gray-400 text-sm">Payment Terms:</span>
                                  <span className="text-white text-sm">{subtype.payment_terms}</span>
                                </div>
                              )}
                              {subtype.discount_info && (
                                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                                  <span className="text-green-400 text-sm">Special Offer:</span>
                                  <span className="text-white text-sm">{subtype.discount_info}</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Availability status */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Availability</span>
                                <span className="text-white font-medium">{subtype.status}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-3">
                                <div 
                                  className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                                  style={{ width: `${subtype.status}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          {/* CTA Button */}
                          <div className="mt-6">
                            <button 
                              onClick={() => scrollToSection('contact')}
                              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-full text-sm transition-colors duration-200"
                            >
                              Enquire About This Unit Type
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })()}
      </section>

      {/* Mortgage Loan Calculator - Full Width */}
      <div className="w-full py-6 sm:py-8 mb-6 sm:mb-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-3 tracking-wide">Mortgage Loan Calculator</h2>
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 sm:w-16 h-1 bg-[#ce001f] rounded" />
          </div>
          <p className="text-gray-400 text-sm sm:text-base font-light text-center mb-6 sm:mb-8">Calculate your monthly mortgage payments and view detailed amortization schedules</p>
          <div className="flex flex-col items-center md:items-center md:justify-center">
            {/* Mortgage Loan Calculator */}
            <div className="w-full max-w-7xl min-w-0 mx-auto">
              <div className="bg-[#23232a] rounded-lg p-4 sm:p-6">
                <MortgageLoanCalculator />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Agent Section */}
      <section id="contact" className="w-full py-8 sm:py-12 lg:py-16 mb-6 sm:mb-8 bg-[#18191b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white text-center mb-3 tracking-wide">Contact Our Expert Agents</h2>
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 sm:w-16 h-1 bg-[#ce001f] rounded" />
          </div>
          <p className="text-gray-400 text-sm sm:text-base font-light text-center mb-8 sm:mb-12">Get personalized assistance from our experienced property consultants</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Download Brochure Card */}
            <div className="flex flex-col items-center">
              <div className="bg-[#23232a] rounded-2xl p-8 flex flex-col items-center shadow-md h-full w-full">
                {/* Project Images Gallery */}
                <div className="w-full mb-6">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
                    <Image
                      src={project?.images[0] || "/placeholder.svg"}
                      alt={project?.title || "Project Image"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="text-sm font-light">{project?.title}</div>
                      <div className="text-xs text-gray-300">{project?.location}</div>
                    </div>
                  </div>
                  {/* Image indicators */}
                  <div className="flex justify-center gap-2">
                    {project?.images.slice(0, 3).map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          idx === 0 ? 'bg-[#ce001f]' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {/* Project Info */}
                <div className="text-center mb-6">
                  <div className="text-white text-xl font-semibold mb-2">{project?.title}</div>
                  <div className="text-red-400 text-sm font-medium mb-1">Project Brochure</div>
                  <div className="text-gray-400 text-xs mb-4 text-center">Complete project information and floor plans</div>
                  {/* Key Project Stats */}
                  <div className="flex gap-4 mb-4 w-full justify-center">
                    <div className="bg-[#18191b] rounded-lg px-4 py-2 flex flex-col items-center min-w-[80px]">
                      <span className="text-white font-bold">{project?.totalUnits}</span>
                      <span className="text-xs text-gray-400">Units</span>
                    </div>
                    <div className="bg-[#18191b] rounded-lg px-4 py-2 flex flex-col items-center min-w-[80px]">
                      <span className="text-white font-bold">{formatCompletionDate(project?.completion)}</span>
                      <span className="text-xs text-gray-400">TOP</span>
                    </div>
                    <div className="bg-[#18191b] rounded-lg px-4 py-2 flex flex-col items-center min-w-[80px]">
                      <span className="text-white font-bold">{project?.priceFrom ? `$${parseInt(project.priceFrom.replace(/[^0-9]/g, '')).toLocaleString()}` : 'N/A'}</span>
                      <span className="text-xs text-gray-400">From</span>
                    </div>
                  </div>
                </div>
                {/* Download Button */}
                <div className="w-full">
                  <button 
                    onClick={handleDownloadBrochure}
                    className="w-full bg-[#ce001f] hover:bg-[#b3001a] text-white font-semibold py-3 rounded-full text-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    Download Brochure
                  </button>
                </div>
                <div className="text-xs text-gray-500 w-full text-center mt-4">PDF format • 2.5MB • Updated weekly</div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="flex flex-col items-center">
              {submitSuccess ? (
                <div className="bg-[#23232a] rounded-2xl p-8 w-full shadow-md flex flex-col items-center justify-center h-full">
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-white text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Thank you for your enquiry. We have sent you a confirmation email and our team will get back to you within 24 business hours.
                    </p>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-[#ce001f] hover:bg-[#b3001a] text-white font-semibold py-3 px-6 rounded-full text-sm transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="bg-[#23232a] rounded-2xl p-8 w-full shadow-md flex flex-col gap-4 h-full">
                  <div className="text-white text-lg font-semibold mb-2">Send Us a Message</div>
                  <div className="text-gray-400 text-xs mb-4">Get personalized assistance for {project?.title}</div>
                  
                  {submitError && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-white text-sm font-medium">
                      Full Name *
                    </label>
                    <input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="rounded-lg bg-[#18191b] text-white px-4 py-3 text-sm border border-gray-700 focus:border-[#ce001f] focus:outline-none transition-colors" 
                      placeholder="Enter your full name" 
                      required 
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-white text-sm font-medium">
                      Email Address *
                    </label>
                    <input 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="rounded-lg bg-[#18191b] text-white px-4 py-3 text-sm border border-gray-700 focus:border-[#ce001f] focus:outline-none transition-colors" 
                      placeholder="Enter your email address" 
                      type="email" 
                      required 
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-white text-sm font-medium">
                      Phone Number *
                    </label>
                    <input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="rounded-lg bg-[#18191b] text-white px-4 py-3 text-sm border border-gray-700 focus:border-[#ce001f] focus:outline-none transition-colors" 
                      placeholder="Enter your phone number" 
                      type="tel" 
                      required 
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-white text-sm font-medium">
                      Message
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message || `I'm interested in ${project?.title}. Please provide more information about unit availability and pricing.`}
                      onChange={handleFormChange}
                      className="rounded-lg bg-[#18191b] text-white px-4 py-3 text-sm border border-gray-700 focus:border-[#ce001f] focus:outline-none transition-colors min-h-[100px] resize-none" 
                      placeholder="Tell us about your requirements"
                      disabled={isSubmitting}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-full text-lg transition-colors mt-2 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  <div className="text-xs text-gray-500 text-center mt-2">By submitting this form, you agree to our <a href="/privacy-policy" className="underline text-red-400">Privacy Policy</a></div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 