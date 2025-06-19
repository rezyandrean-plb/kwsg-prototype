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

// Icon mapping for facilities
const facilityIconMap: Record<string, React.ReactNode> = {
  "Gym": <Dumbbell className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "BBQ Pavilion": <Flame className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Playground": <Sliders className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Pool Lounge": <Martini className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Garden": <Flower className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Arrival Lobby": <DoorOpen className="h-6 w-6" style={{ color: '#ce001f' }} />,
  "Function Room": <Users className="h-6 w-6" style={{ color: '#ce001f' }} />,
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
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedBedroom, setSelectedBedroom] = useState<BedroomTabKey>('1')
  const [selectedSubtype, setSelectedSubtype] = useState<string>('')
  const [amenities, setAmenities] = useState<GooglePlace[]>([])
  const [isLayoutHorizontal, setIsLayoutHorizontal] = useState(false)
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

  // Handle responsive layout with JavaScript fallback
  useEffect(() => {
    const handleResize = () => {
      setIsLayoutHorizontal(window.innerWidth >= 1280) // xl breakpoint
    }
    
    handleResize() // Set initial state
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // State management
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIdx, setGalleryIdx] = useState(0)
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
  const mockProject: Project = {
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
      "10 Evelyn is a prestigious freehold development nestled in the heart of Newton, Singapore's prime District 11. This exclusive residential project offers a collection of meticulously designed living spaces ranging from 1 to 5 bedrooms, each crafted with premium finishes and thoughtful layouts. Residents will enjoy a sophisticated lifestyle with a comprehensive suite of facilities including a 50-meter lap pool, state-of-the-art fitness center, and beautifully landscaped gardens. The development's prime location provides unparalleled connectivity, with Newton MRT Station just a 3-minute walk away, and easy access to Orchard Road's shopping and dining precinct. Families will appreciate the proximity to prestigious educational institutions such as Anglo-Chinese School (Junior) and St. Margaret's Primary School. The development's strategic position also offers convenient access to medical facilities, including Mount Elizabeth Hospital, and is surrounded by an array of dining options, shopping centers, and recreational facilities. With its combination of luxury living, prime location, and excellent connectivity, 10 Evelyn represents an exceptional investment opportunity in one of Singapore's most sought-after residential districts.",
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

  // Set project data on component mount
  useEffect(() => {
    setProject(mockProject)
    setLoading(false)
  }, [])

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
    setActiveTab(sectionId)
  }

  // Tab configuration
  const tabs = [
    { id: "overview", label: "Project Overview", icon: Info },
    { id: "details", label: "Project Details", icon: FileText },
    { id: "site-plan", label: "Site Plan", icon: Layout },
    { id: "facilities", label: "Facilities", icon: Home },
    { id: "location", label: "Location", icon: MapPin },
    { id: "ai-moat", label: "AI MOAT", icon: BarChart2 },
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

  const amenitiesArray =
    selectedAmenityType === "all"
      ? Object.values(realAmenitiesData).flat()
      : realAmenitiesData[selectedAmenityType] || []

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
            <li className="text-[#ce001f] font-semibold">{project.title}</li>
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
                <MapPin className="h-5 w-5" style={{ color: '#ce001f' }} />
                <span className="text-lg">{project.address.replace(/,?\s*\d{6}$/, '')}</span>
              </div>

              <div className="flex flex-wrap gap-4 text-gray-200 text-base">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" style={{ color: '#ce001f' }} />
                  {project.developer}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" style={{ color: '#ce001f' }} />
                  TOP {project.completion}
                </div>
                <div className="flex items-center">
                  <Home className="h-5 w-5 mr-2" style={{ color: '#ce001f' }} />
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
                      ? "border-[#ce001f] text-[#ce001f]"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                  onClick={() => scrollToSection(tab.id)}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <section id="overview" className="w-full bg-[#1c1c1d] py-8">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <h2 className="text-3xl font-light mb-3 text-white text-center tracking-wide">Project Overview</h2>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-[#ce001f] rounded" />
          </div>
          <div 
            className="flex flex-col xl:flex-row gap-8 items-stretch min-h-[400px]"
            style={{
              display: 'flex',
              flexDirection: isLayoutHorizontal ? 'row' : 'column',
              gap: '2rem',
              alignItems: 'stretch',
              minHeight: '400px'
            }}
          >
            
            {/* Left Section */}
            <div 
              className="w-full xl:w-1/2 min-w-0 flex flex-col gap-6 min-h-[400px]"
              style={{
                width: isLayoutHorizontal ? '50%' : '100%',
                minWidth: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                minHeight: '400px'
              }}
            >
              <div className="text-2xl font-semibold text-[#ce001f] mb-2">{project?.title}</div>
              <div className="text-gray-200 text-sm md:text-base leading-relaxed">
                <div 
                  className={`whitespace-pre-line ${
                    !showFullDescription ? 'max-h-[120px] overflow-hidden' : ''
                  }`}
                  style={{
                    display: !showFullDescription ? '-webkit-box' : 'block',
                    WebkitLineClamp: !showFullDescription ? '5' : 'unset',
                    WebkitBoxOrient: !showFullDescription ? 'vertical' : 'unset',
                    overflow: !showFullDescription ? 'hidden' : 'visible'
                  }}
                >
                  {project?.description}
                </div>
                {project?.description && project.description.length > 300 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-[#ce001f] hover:text-[#b3001a] font-medium mt-2 transition-colors"
                  >
                    {showFullDescription ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>
              <div className="bg-[#ce001f]/10 border border-[#ce001f]/20 rounded-lg p-6 mt-4">
                <span className="text-[#ce001f] italic text-lg">
                  {"Where modern architecture meets timeless elegance, creating homes that inspire and endure."}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div 
              className="w-full xl:w-1/2 min-w-0 flex flex-col items-center gap-4 min-h-[400px]"
              style={{
                width: isLayoutHorizontal ? '50%' : '100%',
                minWidth: '0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                minHeight: '400px'
              }}
            >
              <div className="relative w-full aspect-[4/3] bg-[#e5e5e5] rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={project?.images[0] || '/placeholder.svg'}
                  alt={project?.title || 'Project Image'}
                  className="object-cover w-full max-w-full rounded-xl"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 bg-black/70 rounded-lg px-6 py-3 border border-gray-700 backdrop-blur-sm">
                  <div className="flex flex-col items-center min-w-[100px]">
                    <span className="text-2xl font-bold text-[#ce001f]">{project?.totalUnits.replace(/[^0-9]/g, '') || '0'}</span>
                    <span className="text-xs text-gray-300 mt-1">Total Units</span>
                  </div>
                  <div className="flex flex-col items-center min-w-[100px]">
                    <span className="text-2xl font-bold text-[#ce001f]">{project?.completion || 'N/A'}</span>
                    <span className="text-xs text-gray-300 mt-1">Expected TOP</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Project Details Section */}
      <section id="details" className="w-full py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-light mb-3 text-white text-center tracking-wide">Project Details</h2>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-[#ce001f] rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Address */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-2 border border-gray-700">
              <MapPin className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Address</div>
                <div className="text-white font-light">{project.address.replace(/,?\s*\d{6}$/, '')}</div>
              </div>
            </div>
            {/* Site Area */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-2 border border-gray-700">
              <Layout className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Site Area</div>
                <div className="text-white font-light">{project.siteArea}</div>
              </div>
            </div>
            {/* Developer */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <Building2 className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Developer</div>
                <div className="text-white font-light">{project.developer}</div>
              </div>
            </div>
            {/* District */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <MapPin className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">District</div>
                <div className="text-white font-light">District {project.district}</div>
              </div>
            </div>
            {/* Tenure */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <Calendar className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Tenure</div>
                <div className="text-white font-light">{project.tenure}</div>
              </div>
            </div>
            {/* Nearest MRT */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <Train className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Nearest MRT</div>
                <div className="text-white font-light">{project.locationAnalytics.mrt[0]?.name} ({project.locationAnalytics.mrt[0]?.distance})</div>
              </div>
            </div>
            {/* Total Units */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <Home className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Total Units</div>
                <div className="text-white font-light">{project.totalUnits}</div>
              </div>
            </div>
            {/* Bedrooms */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <Home className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Bedrooms</div>
                <div className="text-white font-light">{project.bedrooms} bedrooms</div>
              </div>
            </div>
            {/* Expected TOP */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <Calendar className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Expected TOP</div>
                <div className="text-white font-light">Q{project.completion?.slice(0,1) === '2' ? '2' : '1'} {project.completion}</div>
              </div>
            </div>
            {/* Property Type */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <Building2 className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Property Type</div>
                <div className="text-white font-light">{project.propertyType}</div>
              </div>
            </div>
            {/* Floor Size */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <Layout className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Floor Size</div>
                <div className="text-white font-light">{project.size}</div>
              </div>
            </div>
            {/* Average PSF */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <BadgeDollarSign className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Average PSF</div>
                <div className="text-white font-light">{project.pricePerSqFt ? `From ${project.pricePerSqFt}` : '-'}</div>
              </div>
            </div>
            {/* Blocks */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <Building2 className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Blocks</div>
                <div className="text-white font-light">{project.totalUnits ? Math.ceil(Number(project.totalUnits.replace(/[^0-9]/g, '')) / 7) + ' blocks' : '-'}</div>
              </div>
            </div>
            {/* Floors */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <Building2 className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Floors</div>
                <div className="text-white font-light">{project.totalFloors}</div>
              </div>
            </div>
            {/* Car Park Lots */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <Home className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Car Park Lots</div>
                <div className="text-white font-light">{project.totalUnits ? project.totalUnits.replace(/[^0-9]/g, '') + ' lots' : '-'}</div>
              </div>
            </div>
            {/* Zoning */}
            <div className="bg-[#18191b] rounded-lg p-6 flex items-center gap-4 border border-gray-700">
              <Building2 className="h-7 w-7" style={{ color: '#ce001f' }} />
              <div>
                <div className="text-gray-400 text-sm">Zoning</div>
                <div className="text-white font-light">Residential</div>
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

          {/* Two Column Flex Container - Always Side by Side */}
          <div className="flex flex-row gap-8 min-h-[400px]">
            {/* Site Plan Left */}
            <div className="flex-1 bg-[#242728] rounded-lg flex flex-col items-center justify-center min-h-[400px]">
              <img
                src="/siteplan-dummy.jpg"
                alt="Site Plan"
                className="w-full h-auto max-w-full rounded-lg object-contain"
              />
            </div>
            {/* Legend Right */}
            <div className="w-80 bg-[#242728] border border-gray-700 rounded-lg p-6 flex flex-col justify-between min-h-[400px]">
              <div>
                <h4 className="text-xl font-light text-left text-[#ce001f] mb-4">Map Legend</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-[#ce001f] mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-white font-light">Main Entrance</span>
                      <div className="text-xs text-gray-400">North Gate</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-white font-light">Clubhouse</span>
                      <div className="text-xs text-gray-400">Central</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-white font-light">Swimming Pool</span>
                      <div className="text-xs text-gray-400">South Wing</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-white font-light">Tennis Court</span>
                      <div className="text-xs text-gray-400">East Side</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-white font-light">Children's Playground</span>
                      <div className="text-xs text-gray-400">West Garden</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-white font-light">Parking Entrance</span>
                      <div className="text-xs text-gray-400">Underground</div>
                    </div>
                  </li>
                </ul>
              </div>
              <button className="mt-8 w-full bg-[#ce001f] hover:bg-[#b3001a] text-white font-light py-3 rounded-full text-lg transition-colors" onClick={handleDownloadSitePlan}>
                Download Site Plan
              </button>
              <button className="mt-4 w-full bg-[#b3001a] hover:bg-[#ce001f] text-white font-light py-3 rounded-full text-lg transition-colors" onClick={handleDownloadBrochure}>
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="w-full py-16 mb-2 bg-[#1c1c1d]">
        <div className="max-w-4xl mx-auto px-4">
          {/* Title and Subtitle */}
          <h2 className="text-3xl font-light mb-3 text-white text-center tracking-wide">Facilities</h2>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-[#ce001f] rounded" />
          </div>
          <p className="text-center font-light text-gray-400 mb-10">
            Premium amenities designed for modern luxury living
          </p>
          {/* Facilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {facilities.map((facility: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-[#232324] rounded-lg px-4 py-4 shadow-sm"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ce001f]/20">
                  {facilityIconMap[facility] || (
                    <Layout className="h-5 w-5" style={{ color: '#ce001f' }} />
                  )}
                </span>
                <span className="text-white font-light">{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="w-full py-16 mb-2 bg-[#1c1c1d]">
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
              <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent" style={{ WebkitOverflowScrolling: 'touch' }}>
                {amenityTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedAmenityType(tab.key)}
                    className={`px-4 py-2 rounded-full font-light flex items-center gap-2 text-sm transition-colors border focus:outline-none whitespace-nowrap ${selectedAmenityType === tab.key ? 'bg-gray-800 border-[#ce001f] text-white' : 'bg-[#18191b] border-gray-700 text-gray-300 hover:bg-[#ce001f]/10 hover:text-[#ce001f]'}`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Two-column layout below tabs */}
            <div className="w-full flex flex-row gap-8 min-h-[500px]">
              {/* Left: Amenity List */}
              <div className="w-4/12 min-w-0 p-6 flex flex-col h-[500px]">
                {/* Amenity List */}
                <div className="flex-1 overflow-y-auto pr-2">
                  <div className="space-y-4">
                    {isLoadingAmenities ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-gray-400">Loading amenities...</div>
                      </div>
                    ) : amenitiesArray.length > 0 ? (
                      amenitiesArray.map((place) => (
                        <div
                          key={place.placeId}
                          className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedAmenity?.placeId === place.placeId ? "bg-[#ce001f]/10 border border-[#ce001f]/20" : "bg-gray-800/50 border border-gray-700 hover:bg-gray-800"}`}
                          onClick={() => setSelectedAmenity(place)}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-light text-white mb-1">{place.name}</h4>
                              <p className="text-sm text-gray-400 mb-2">{place.address}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-300 flex items-center gap-1">
                                  <MapPin className="h-4 w-4" style={{ color: '#ce001f' }} />
                                  {place.distance}
                                </span>
                                <span className="text-gray-300 flex items-center gap-1">
                                  <Clock className="h-4 w-4" style={{ color: '#ce001f' }} />
                                  {place.duration}
                                </span>
                                <span className="text-gray-300 flex items-center gap-1">
                                  <Train className="h-4 w-4" style={{ color: '#ce001f' }} />
                                  {place.transportMode}
                                </span>
                              </div>
                            </div>
                            {place.isNearest && (
                              <Badge className="bg-[#ce001f]/10 text-[#ce001f] border border-[#ce001f]/20">Nearest</Badge>
                            )}
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
              <div className="w-8/12 min-w-0 flex flex-col h-[500px]">
                <div className="flex-1 w-full h-full min-h-[500px]">
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
            <div className="max-w-3xl w-full bg-[#18191b] rounded-xl p-8 border border-gray-800 text-center mt-2">
              <div className="text-lg text-[#ce001f] font-light mb-2 tracking-wide">Prime Connectivity</div>
              <div className="text-gray-300 text-light font-light">
                Experience unparalleled connectivity with direct access to Newton MRT station, major expressways including the Central Expressway (CTE) and Pan Island Expressway (PIE), and seamless connections to Orchard Road, Marina Bay, and Changi Airport within 30 minutes.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI MOAT Section */}
      <section id="ai-moat" className="w-full py-8 mb-2">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-light text-white mb-3 tracking-wide">AI MOAT Analysis</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
          <div className="flex flex-col items-center md:items-center md:justify-center">
            {/* AI MOAT */}
            <div className="w-full md:w-7/12 min-w-0 mx-auto">
              <div className="bg-[#242728] border border-gray-700 rounded-lg text-center">
                <MoatRadarChart moat={project.moat} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unit Mix Section */}
      <div className="w-full flex flex-col items-center py-8">
        <div className="max-w-7xl w-full bg-[#18191b] rounded-2xl py-10 px-4 flex flex-col items-center">
          <h3 className="text-xl font-light text-red-400 mb-8 text-center tracking-wide">Unit Mix</h3>
          <div className="w-full flex flex-row gap-6 overflow-x-auto sm:overflow-x-visible scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent px-2" style={{ WebkitOverflowScrolling: 'touch' }}>
            {/* 1-Bedroom */}
            <div className="flex-1 bg-[#232324] rounded-xl py-8 flex flex-col items-center justify-center">
              <span className="text-3xl font-light text-white mb-2">85</span>
              <span className="text-gray-400 font-light">1-Bedroom</span>
            </div>
            {/* 2-Bedroom */}
            <div className="flex-1 bg-[#232324] rounded-xl py-8 flex flex-col items-center justify-center">
              <span className="text-3xl font-light text-white mb-2">180</span>
              <span className="text-gray-400 font-light">2-Bedroom</span>
            </div>
            {/* 3-Bedroom */}
            <div className="flex-1 bg-[#232324] rounded-xl py-8 flex flex-col items-center justify-center">
              <span className="text-3xl font-light text-white mb-2">220</span>
              <span className="text-gray-400 font-light">3-Bedroom</span>
            </div>
            {/* 4-Bedroom */}
            <div className="flex-1 bg-[#232324] rounded-xl py-8 flex flex-col items-center justify-center">
              <span className="text-3xl font-light text-white mb-2">95</span>
              <span className="text-gray-400 font-light">4-Bedroom</span>
            </div>
            {/* 5-Bedroom */}
            <div className="flex-1 bg-[#232324] rounded-xl py-8 flex flex-col items-center justify-center">
              <span className="text-3xl font-light text-white mb-2">25</span>
              <span className="text-gray-400 font-light">5-Bedroom</span>
            </div>
          </div>
        </div>
      </div>

      {/* Units & Pricing Section */}
      <section id="pricing" className="w-full py-8 mb-4">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-light mb-3 text-white text-center tracking-wide">Unit & Pricing</h2>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-[#ce001f] rounded" />
          </div>
          <p className="text-gray-400 text-base font-light text-center mb-2">Discover your perfect home from our collection of meticulously designed residences</p>

          {/* Tabs for unit types */}
          <div className="w-full px-6 pt-6 pb-2 border-b border-gray-700 mb-8">
            <div className="flex flex-nowrap gap-2 justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent" style={{ WebkitOverflowScrolling: 'touch' }}>
              {unitAvailabilityData.map((unit, idx) => (
                <button
                  key={unit.unitType}
                  onClick={() => setUnitsActiveTab(idx)}
                  className={`px-4 py-2 rounded-full font-light flex items-center gap-2 text-sm transition-colors border focus:outline-none whitespace-nowrap ${unitsActiveTab === idx ? 'bg-gray-800 border-[#ce001f] text-white' : 'bg-[#18191b] border-gray-700 text-gray-300 hover:bg-[#ce001f]/10 hover:text-[#ce001f]'}`}
                >
                  {unit.unitType.replace(' Units', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Card layout for selected unit type */}
          <div className="flex flex-row gap-8 justify-center items-stretch bg-[#111] rounded-xl p-8 max-w-5xl mx-auto shadow-lg">
            {/* Left: Floor plan image */}
            <div className="flex-1 flex flex-col items-center justify-center min-w-[280px] max-w-[420px]">
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                {/* Placeholder image icon */}
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V8.25A2.25 2.25 0 0 1 5.25 6h13.5A2.25 2.25 0 0 1 21 8.25v8.25M3 16.5l3.72-3.72a2.25 2.25 0 0 1 3.18 0l2.4 2.4m-9.3 1.32 3.72-3.72a2.25 2.25 0 0 1 3.18 0l2.4 2.4m0 0 2.4-2.4a2.25 2.25 0 0 1 3.18 0l3.72 3.72M12 11.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                </svg>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="bg-[#232324] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                  <Search className="h-4 w-4 text-red-400" />
                  View
                </button>
                <button className="bg-[#232324] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                  <ChevronDown className="h-4 w-4 text-red-400" />
                  Download
                </button>
              </div>
            </div>
            {/* Right: Unit details */}
            <div className="flex-1 flex flex-col justify-between min-w-[280px] text-left">
              {/* Top: Unit type and availability */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-semibold text-white">{unitAvailabilityData[unitsActiveTab].unitType.replace(' Units', '')}</span>
                <span className="text-green-400 font-semibold text-sm">Available {unitAvailabilityData[unitsActiveTab].subtypes[0].available} of {unitAvailabilityData[unitsActiveTab].subtypes[0].total}</span>
              </div>
              {/* Description */}
              <div className="text-gray-300 text-sm mb-4">Perfect for young professionals and couples seeking modern urban living with premium finishes and thoughtful design.</div>
              {/* Features row */}
              <div className="flex gap-8 mb-4">
                <div className="flex flex-col items-center">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-900/60">
                    <Home className="h-5 w-5 text-red-400" />
                  </span>
                  <span className="text-white text-sm mt-1">1 Bedrooms</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-900/60">
                    <Home className="h-5 w-5 text-red-400" />
                  </span>
                  <span className="text-white text-sm mt-1">1 Bathrooms</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-red-900/60">
                    <Layout className="h-5 w-5 text-red-400" />
                  </span>
                  <span className="text-white text-sm mt-1">{unitAvailabilityData[unitsActiveTab].subtypes[0].size}</span>
                </div>
              </div>
              {/* Price range */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-400 text-lg font-medium">$</span>
                <span className="text-white text-lg font-medium">Price Range</span>
                <span className="text-white text-lg font-medium">{unitAvailabilityData[unitsActiveTab].subtypes[0].price}</span>
              </div>
              {/* Key Features */}
              <div className="mb-4">
                <div className="text-red-400 font-semibold mb-1">Key Features</div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-white">Open Concept Kitchen</span>
                  <span className="text-white">City Views</span>
                  <span className="text-white">Premium Fixtures</span>
                  <span className="text-white">Built-in Storage</span>
                </div>
              </div>
              {/* CTA Button */}
              <div className="flex justify-end mt-6">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-red-500 hover:bg-red-600 text-white font-light py-3 px-8 rounded-full text-md transition-colors"
                >
                  Enquire About This Unit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mortage Calculator - Full Width */}
      <div className="w-full py-8 mb-8">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-light text-white mb-3 tracking-wide">Mortage Calculator</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
          <div className="flex flex-col items-center md:items-center md:justify-center">
            {/* Mortage Calculator */}
            <div className="w-full md:w-3/4 min-w-0 mx-auto">
              <div className="bg-[#23232a] rounded-lg p-6">
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

      {/* Contact Agent Section */}
      <section id="contact" className="w-full py-16 mb-8 bg-[#18191b]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-light text-white text-center mb-3 tracking-wide">Contact Our Expert Agents</h2>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-[#ce001f] rounded" />
          </div>
          <p className="text-gray-400 text-base font-light text-center mb-12">Get personalized assistance from our experienced property consultants</p>
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
                      <span className="text-white font-bold">{project?.completion}</span>
                      <span className="text-xs text-gray-400">TOP</span>
                    </div>
                    <div className="bg-[#18191b] rounded-lg px-4 py-2 flex flex-col items-center min-w-[80px]">
                      <span className="text-white font-bold">{project?.priceFrom ? `$${(parseInt(project.priceFrom.replace(/[^0-9]/g, '')) / 1000000).toFixed(1)}M` : 'N/A'}</span>
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
                  
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="rounded-lg bg-[#18191b] text-white px-4 py-3 text-sm border border-gray-700 focus:border-[#ce001f] focus:outline-none transition-colors" 
                    placeholder="Full Name" 
                    required 
                    disabled={isSubmitting}
                  />
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="rounded-lg bg-[#18191b] text-white px-4 py-3 text-sm border border-gray-700 focus:border-[#ce001f] focus:outline-none transition-colors" 
                    placeholder="Email Address" 
                    type="email" 
                    required 
                    disabled={isSubmitting}
                  />
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="rounded-lg bg-[#18191b] text-white px-4 py-3 text-sm border border-gray-700 focus:border-[#ce001f] focus:outline-none transition-colors" 
                    placeholder="Phone Number" 
                    type="tel" 
                    required 
                    disabled={isSubmitting}
                  />
                  <textarea 
                    name="message"
                    value={formData.message || `I'm interested in ${project?.title}. Please provide more information about unit availability and pricing.`}
                    onChange={handleFormChange}
                    className="rounded-lg bg-[#18191b] text-white px-4 py-3 text-sm border border-gray-700 focus:border-[#ce001f] focus:outline-none transition-colors min-h-[100px] resize-none" 
                    placeholder="Message"
                    disabled={isSubmitting}
                  />
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
                  <div className="text-xs text-gray-500 text-center mt-2">By submitting this form, you agree to our <a href="#" className="underline text-red-400">Privacy Policy</a></div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 