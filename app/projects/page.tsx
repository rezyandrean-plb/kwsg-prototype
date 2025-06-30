"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ArrowRight, X, MapPin, Building2, Calendar, DollarSign, Bed, SlidersHorizontal, Check } from "lucide-react"
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

// API Project type
type ApiProject = {
  id: number
  name: string
  project_name: string
  slug: string
  title: string
  location: string
  address: string
  type: string
  price: string
  price_from: string
  display_price: string
  price_per_sqft: string
  bedrooms: string
  bathrooms: string
  size: string
  units: string
  developer: string
  completion: string
  description: string
  features: string[]
  district: string
  tenure: string
  property_type: string
  status: string
  total_units: string
  total_floors: string
  site_area: string
  latitude: number | null
  longitude: number | null
  created_at: string
  updated_at: string
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
  lowerPrice?: string
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

// Function to fetch projects from API
const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch('https://striking-hug-052e89dfad.strapiapp.com/api/projects/')
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    
    const data = await response.json()
    const apiProjects: ApiProject[] = data.data || []
    
    // Transform API data to match our Project type
    return apiProjects.map((apiProject): Project => {
      // Extract district number from district string (e.g., "D05" -> 5)
      const districtNumber = apiProject.district ? parseInt(apiProject.district.replace('D', '')) : undefined
      
      // Map status to our enum
      const mapStatus = (status: string | null | undefined): 'upcoming' | 'ongoing' | 'completed' => {
        if (!status) return 'upcoming' // Default to upcoming if status is null/undefined
        
        const statusLower = status.toLowerCase()
        if (statusLower.includes('launching soon') || statusLower.includes('coming soon')) {
          return 'upcoming'
        } else if (statusLower.includes('under construction') || statusLower.includes('ongoing')) {
          return 'ongoing'
        } else {
          return 'completed'
        }
      }
      
      // Generate price range from display_price if available
      const priceRange = apiProject.display_price ? 
        apiProject.display_price : 
        undefined
      
      // Generate price display - prioritize lower price for better UX
      let price = 'Price on request'
      let lowerPrice: string | undefined = undefined
      
      if (apiProject.price_from) {
        // Use price_from as the primary lower price
        lowerPrice = apiProject.price_from
        price = `From $${apiProject.price_from}M`
      } else if (apiProject.display_price) {
        // Extract lower price from display_price if available
        const priceMatch = apiProject.display_price.match(/From\s+\$?([\d,]+\.?\d*)M?/i)
        if (priceMatch) {
          lowerPrice = priceMatch[1]
          price = `From $${lowerPrice}M`
        } else {
          // If display_price doesn't match expected format, use it as is
          price = apiProject.display_price
        }
      } else if (apiProject.price) {
        // Fallback to price field if available
        const priceMatch = apiProject.price.match(/From\s+\$?([\d,]+\.?\d*)M?/i)
        if (priceMatch) {
          lowerPrice = priceMatch[1]
          price = `From $${lowerPrice}M`
        } else {
          price = apiProject.price
        }
      }
      
      // Generate image URL (using placeholder for now since API doesn't provide images)
      const image = `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80`
      
      // Generate coordinates (using placeholder if not available)
      const coordinates = apiProject.latitude && apiProject.longitude ? 
        { lat: apiProject.latitude, lng: apiProject.longitude } : 
        { lat: 1.3521, lng: 103.8198 }
      
      // Generate bedrooms array from bedrooms string
      const bedrooms = apiProject.bedrooms ? 
        apiProject.bedrooms.split(',').map(b => b.trim()).filter(b => b) : 
        undefined
      
      return {
        slug: apiProject.slug,
        name: apiProject.name || apiProject.project_name,
        location: apiProject.location,
        price,
        priceRange,
        pricePerSqFt: apiProject.price_per_sqft,
        image,
        units: apiProject.units ? `${apiProject.units} Units` : undefined,
        unitsAvailable: apiProject.total_units ? `${apiProject.total_units} Units` : undefined,
        propertySizeRange: apiProject.size,
        developer: apiProject.developer,
        completion: apiProject.completion,
        description: apiProject.description,
        features: apiProject.features || [],
        type: apiProject.type || apiProject.property_type,
        status: mapStatus(apiProject.status),
        district: districtNumber,
        tenure: apiProject.tenure,
        propertyType: apiProject.property_type,
        bedrooms,
        coordinates,
        lowerPrice
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

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
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 8
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(5000000)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    preferences: "",
    consent: false
  })
  const [isOpen, setIsOpen] = useState(false)
  const searchSectionRef = useRef<HTMLDivElement>(null)
  
  // State for projects data
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Fetch projects on component mount (client-side only)
  useEffect(() => {
    if (!isClient) return
    
    const loadProjects = async () => {
      setIsLoading(true)
      const fetchedProjects = await fetchProjects()
      setProjects(fetchedProjects)
      setIsLoading(false)
    }
    
    loadProjects()
  }, [isClient])

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
  const filteredProjects = isClient ? projects
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
      const matchesPriceRange = (priceMin === 0 && priceMax === 5000000) ||
        (projectMax >= priceMin && projectMin <= priceMax)

      return matchesSearch && matchesDistrict && matchesTenure && matchesPropertyType && matchesStatus && matchesBedrooms && matchesPriceRange
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          // Use display_price (priceRange) for sorting, with fallbacks
          const getSortPrice = (project: Project): number => {
            if (project.priceRange) {
              // Extract numeric value from display_price
              const priceMatch = project.priceRange.match(/From\s+\$?([\d,]+\.?\d*)M?/i)
              if (priceMatch) {
                return parseFloat(priceMatch[1].replace(/,/g, ''))
              }
              // Try to extract any numeric value
              const anyPriceMatch = project.priceRange.match(/([\d,]+\.?\d*)/)
              if (anyPriceMatch) {
                return parseFloat(anyPriceMatch[1].replace(/,/g, ''))
              }
            }
            // Fallback to lowerPrice if available
            if (project.lowerPrice) {
              return parseFloat(project.lowerPrice)
            }
            // Fallback to pricePerSqFt if available
            if (project.pricePerSqFt) {
              return parseFloat(project.pricePerSqFt)
            }
            return 0
          }
          
          const priceALow = getSortPrice(a)
          const priceBLow = getSortPrice(b)
          return priceALow - priceBLow
          
        case "price-high-low":
          // Use display_price (priceRange) for sorting, with fallbacks
          const getSortPriceHigh = (project: Project): number => {
            if (project.priceRange) {
              // Extract numeric value from display_price
              const priceMatch = project.priceRange.match(/From\s+\$?([\d,]+\.?\d*)M?/i)
              if (priceMatch) {
                return parseFloat(priceMatch[1].replace(/,/g, ''))
              }
              // Try to extract any numeric value
              const anyPriceMatch = project.priceRange.match(/([\d,]+\.?\d*)/)
              if (anyPriceMatch) {
                return parseFloat(anyPriceMatch[1].replace(/,/g, ''))
              }
            }
            // Fallback to lowerPrice if available
            if (project.lowerPrice) {
              return parseFloat(project.lowerPrice)
            }
            // Fallback to pricePerSqFt if available
            if (project.pricePerSqFt) {
              return parseFloat(project.pricePerSqFt)
            }
            return 0
          }
          
          const priceAHigh = getSortPriceHigh(a)
          const priceBHigh = getSortPriceHigh(b)
          return priceBHigh - priceAHigh
          
        case "completion":
          // Use string comparison for dates to avoid hydration issues
          const dateA = a.completion || ''
          const dateB = b.completion || ''
          return dateA.localeCompare(dateB)
        default:
          return 0
      }
    }) : []

  // Update all filter arrays to handle undefined values
  const districts = isClient ? Array.from(new Set(projects.map(p => p.district).filter((d): d is number => d !== undefined))).sort((a, b) => a - b) : []
  const tenures = isClient ? Array.from(new Set(projects.map(p => p.tenure).filter((t): t is string => t !== undefined))) : []
  const propertyTypes = isClient ? Array.from(new Set(projects.map(p => p.propertyType).filter((t): t is string => t !== undefined))) : []
  const statuses: ("upcoming" | "ongoing" | "completed")[] = ["upcoming", "ongoing", "completed"]
  const bedrooms = isClient ? Array.from(new Set(projects.flatMap(p => p.bedrooms || []))) : []

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

  const handleSelectAllDistricts = () => {
    if (selectedDistricts.length === districts.length) {
      setSelectedDistricts([])
    } else {
      setSelectedDistricts([...districts])
    }
  }

  const handleSelectAllTenures = () => {
    if (selectedTenures.length === tenures.length) {
      setSelectedTenures([])
    } else {
      setSelectedTenures([...tenures])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
    setIsOpen(false)
  }

  // Helper function to generate pagination range with ellipsis
  const getPaginationRange = (currentPage: number, totalPages: number) => {
    const delta = 2 // Number of pages to show on each side of current page
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
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

      {/* Search and Filters Row */}
      <section ref={searchSectionRef} className="container mx-auto px-4 mt-[-4rem] mb-12 relative z-10">
        <div className="bg-[#242728] rounded-2xl shadow-lg p-4 sm:p-6">
          {/* Mobile Layout - Stacked */}
          <div className="block sm:hidden">
            {/* Search Bar - Full width on mobile */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search projects by name, location, or developer..."
                className="w-full pl-12 h-[52px] text-base bg-[#242728] border-gray-600 text-white placeholder:text-gray-400 focus:border-primary-red focus:ring-primary-red/20 backdrop-blur-sm rounded-md"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchQuery(searchInput)
                  }
                }}
              />
            </div>
            
            {/* Filter Controls - Stack on mobile */}
            <div className="flex flex-col items-stretch gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-[52px] px-4 flex items-center justify-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 rounded-md transition-colors whitespace-nowrap text-sm"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    {(selectedDistricts.length > 0 || selectedTenures.length > 0 || selectedPropertyTypes.length > 0 || 
                      selectedStatus.length > 0 || selectedBedrooms.length > 0 || (priceMin > 0 || priceMax < 5000000)) && (
                      <Badge variant="secondary" className="ml-1 bg-primary-red/20 text-primary-red rounded-full text-xs">
                        {selectedDistricts.length + selectedTenures.length + selectedPropertyTypes.length + 
                         selectedStatus.length + selectedBedrooms.length + ((priceMin > 0 || priceMax < 5000000) ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full bg-[#242728] border-gray-700 text-white">
                  <SheetHeader>
                    <SheetTitle className="text-white">Filter Projects</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                    {/* District Filter */}
                    <div>
                      <h3 className="font-medium mb-3 text-white">District</h3>
                      <div className="space-y-3">
                        <Button
                          variant={selectedDistricts.length === districts.length ? "default" : "outline"}
                          className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 text-sm py-2"
                          onClick={handleSelectAllDistricts}
                        >
                          {selectedDistricts.length === districts.length && <Check className="mr-2 h-4 w-4" />}
                          {selectedDistricts.length === districts.length ? "Deselect All" : "Select All"}
                        </Button>
                        <div className="grid grid-cols-4 gap-1.5 max-h-48 overflow-y-auto pr-2">
                          {districts.map((district) => (
                            <Button
                              key={district}
                              variant={selectedDistricts.includes(district) ? "default" : "outline"}
                              className="w-full justify-center border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 text-xs py-1.5 px-2 min-h-[32px]"
                              onClick={() => handleDistrictChange(district)}
                            >
                              {selectedDistricts.includes(district) && <Check className="mr-1 h-3 w-3" />}
                              D{district}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tenure Filter */}
                    <div>
                      <h3 className="font-medium mb-3 text-white">Tenure</h3>
                      <div className="space-y-2">
                        <Button
                          variant={selectedTenures.length === tenures.length ? "default" : "outline"}
                          className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                          onClick={handleSelectAllTenures}
                        >
                          {selectedTenures.length === tenures.length && <Check className="mr-2 h-4 w-4" />}
                          {selectedTenures.length === tenures.length ? "Deselect All" : "Select All"}
                        </Button>
                        {tenures.map((tenure) => (
                          <Button
                            key={tenure}
                            variant={selectedTenures.includes(tenure) ? "default" : "outline"}
                            className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 text-sm py-2"
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
                            className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 text-sm py-2"
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
                            className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 capitalize text-sm py-2"
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
                      <div className="grid grid-cols-2 gap-2">
                        {bedrooms.map((bedroom) => (
                          <Button
                            key={bedroom}
                            variant={selectedBedrooms.includes(bedroom) ? "default" : "outline"}
                            className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 text-sm py-2"
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
                      <h3 className="font-medium mb-4 text-white">Price Range</h3>
                      <div className="space-y-4">
                        <div className="px-1">
                          <Slider
                            defaultValue={[priceMin, priceMax]}
                            max={5000000}
                            step={100000}
                            onValueChange={(value) => {
                              setPriceMin(value[0])
                              setPriceMax(value[1])
                            }}
                            className="mb-6"
                          />
                        </div>
                        
                        {/* Price Display Cards */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-3">
                            <div className="text-xs text-gray-400 mb-1">Min Price</div>
                            <div className="text-white font-semibold">${priceMin.toLocaleString()}</div>
                          </div>
                          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-3">
                            <div className="text-xs text-gray-400 mb-1">Max Price</div>
                            <div className="text-white font-semibold">${priceMax.toLocaleString()}</div>
                          </div>
                        </div>
                        
                        {/* Quick Price Presets */}
                        <div className="space-y-2">
                          <div className="text-xs text-gray-400 font-medium">Quick Presets</div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                              onClick={() => {
                                setPriceMin(0)
                                setPriceMax(1000000)
                              }}
                            >
                              Under $1M
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                              onClick={() => {
                                setPriceMin(1000000)
                                setPriceMax(2000000)
                              }}
                            >
                              $1M - $2M
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                              onClick={() => {
                                setPriceMin(2000000)
                                setPriceMax(3000000)
                              }}
                            >
                              $2M - $3M
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                              onClick={() => {
                                setPriceMin(3000000)
                                setPriceMax(5000000)
                              }}
                            >
                              $3M - $5M
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-[52px] px-4 bg-[#242728] border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 rounded-md text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-[#242728] border-gray-700 text-white">
                  <SelectItem value="latest" className="text-white">Latest</SelectItem>
                  <SelectItem value="price-low-high" className="text-white">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low" className="text-white">Price: High to Low</SelectItem>
                  <SelectItem value="completion" className="text-white">Completion Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Desktop Layout - Horizontal Row */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search projects by name, location, or developer..."
                className="w-full pl-12 h-[52px] text-lg bg-[#242728] border-gray-600 text-white placeholder:text-gray-400 focus:border-primary-red focus:ring-primary-red/20 backdrop-blur-sm rounded-md"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchQuery(searchInput)
                  }
                }}
              />
            </div>
            {/* Filter Controls */}
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-[52px] px-4 flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 rounded-md transition-colors whitespace-nowrap"
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                    {(selectedDistricts.length > 0 || selectedTenures.length > 0 || selectedPropertyTypes.length > 0 || 
                      selectedStatus.length > 0 || selectedBedrooms.length > 0 || (priceMin > 0 || priceMax < 5000000)) && (
                      <Badge variant="secondary" className="ml-1 bg-primary-red/20 text-primary-red rounded-full">
                        {selectedDistricts.length + selectedTenures.length + selectedPropertyTypes.length + 
                         selectedStatus.length + selectedBedrooms.length + ((priceMin > 0 || priceMax < 5000000) ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] bg-[#242728] border-gray-700 text-white">
                  <SheetHeader>
                    <SheetTitle className="text-white">Filter Projects</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                    {/* District Filter */}
                    <div>
                      <h3 className="font-medium mb-3 text-white">District</h3>
                      <div className="space-y-3">
                        <Button
                          variant={selectedDistricts.length === districts.length ? "default" : "outline"}
                          className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                          onClick={handleSelectAllDistricts}
                        >
                          {selectedDistricts.length === districts.length && <Check className="mr-2 h-4 w-4" />}
                          {selectedDistricts.length === districts.length ? "Deselect All" : "Select All"}
                        </Button>
                        <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-2">
                          {districts.map((district) => (
                            <Button
                              key={district}
                              variant={selectedDistricts.includes(district) ? "default" : "outline"}
                              className="w-full justify-center border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 text-sm py-2 px-1 min-h-[36px]"
                              onClick={() => handleDistrictChange(district)}
                            >
                              {selectedDistricts.includes(district) && <Check className="mr-1 h-3 w-3" />}
                              D{district}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tenure Filter */}
                    <div>
                      <h3 className="font-medium mb-3 text-white">Tenure</h3>
                      <div className="space-y-2">
                        <Button
                          variant={selectedTenures.length === tenures.length ? "default" : "outline"}
                          className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                          onClick={handleSelectAllTenures}
                        >
                          {selectedTenures.length === tenures.length && <Check className="mr-2 h-4 w-4" />}
                          {selectedTenures.length === tenures.length ? "Deselect All" : "Select All"}
                        </Button>
                        {tenures.map((tenure) => (
                          <Button
                            key={tenure}
                            variant={selectedTenures.includes(tenure) ? "default" : "outline"}
                            className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 text-sm py-2"
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
                            className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 text-sm py-2"
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
                            className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 capitalize"
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
                      <div className="grid grid-cols-3 gap-2">
                        {bedrooms.map((bedroom) => (
                          <Button
                            key={bedroom}
                            variant={selectedBedrooms.includes(bedroom) ? "default" : "outline"}
                            className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
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
                      <h3 className="font-medium mb-4 text-white">Price Range</h3>
                      <div className="space-y-4">
                        <div className="px-1">
                          <Slider
                            defaultValue={[priceMin, priceMax]}
                            max={5000000}
                            step={100000}
                            onValueChange={(value) => {
                              setPriceMin(value[0])
                              setPriceMax(value[1])
                            }}
                            className="mb-6"
                          />
                        </div>
                        
                        {/* Price Display Cards */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-3">
                            <div className="text-xs text-gray-400 mb-1">Min Price</div>
                            <div className="text-white font-semibold">${priceMin.toLocaleString()}</div>
                          </div>
                          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-3">
                            <div className="text-xs text-gray-400 mb-1">Max Price</div>
                            <div className="text-white font-semibold">${priceMax.toLocaleString()}</div>
                          </div>
                        </div>
                        
                        {/* Quick Price Presets */}
                        <div className="space-y-2">
                          <div className="text-xs text-gray-400 font-medium">Quick Presets</div>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                              onClick={() => {
                                setPriceMin(0)
                                setPriceMax(1000000)
                              }}
                            >
                              Under $1M
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                              onClick={() => {
                                setPriceMin(1000000)
                                setPriceMax(2000000)
                              }}
                            >
                              $1M - $2M
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                              onClick={() => {
                                setPriceMin(2000000)
                                setPriceMax(3000000)
                              }}
                            >
                              $2M - $3M
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                              onClick={() => {
                                setPriceMin(3000000)
                                setPriceMax(5000000)
                              }}
                            >
                              $3M - $5M
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-[52px] px-4 bg-[#242728] border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 rounded-md">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-[#242728] border-gray-700 text-white">
                  <SelectItem value="latest" className="text-white">Latest</SelectItem>
                  <SelectItem value="price-low-high" className="text-white">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low" className="text-white">Price: High to Low</SelectItem>
                  <SelectItem value="completion" className="text-white">Completion Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Active Filters - Responsive layout */}
          {(selectedDistricts.length > 0 || selectedTenures.length > 0 || selectedPropertyTypes.length > 0 || 
            selectedStatus.length > 0 || selectedBedrooms.length > 0 || (priceMin > 0 || priceMax < 5000000)) && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 whitespace-nowrap">Active filters:</span>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors"
                  onClick={() => {
                    setSelectedDistricts([])
                    setSelectedTenures([])
                    setSelectedPropertyTypes([])
                    setSelectedStatus([])
                    setSelectedBedrooms([])
                    setPriceMin(0)
                    setPriceMax(5000000)
                  }}
                >
                  Clear all
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {selectedDistricts.map((district) => (
                  <Badge 
                    key={district}
                    variant="secondary" 
                    className="bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 cursor-pointer border border-gray-600 rounded-full px-2 sm:px-3 py-1 transition-colors text-xs sm:text-sm"
                    onClick={() => handleDistrictChange(district)}
                  >
                    <span className="sm:hidden">D{district}</span>
                    <span className="hidden sm:inline">District {district}</span>
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedTenures.map((tenure) => (
                  <Badge 
                    key={tenure}
                    variant="secondary" 
                    className="bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 cursor-pointer border border-gray-600 rounded-full px-2 sm:px-3 py-1 transition-colors text-xs sm:text-sm"
                    onClick={() => handleTenureChange(tenure)}
                  >
                    {tenure}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedPropertyTypes.map((type) => (
                  <Badge 
                    key={type}
                    variant="secondary" 
                    className="bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 cursor-pointer border border-gray-600 rounded-full px-2 sm:px-3 py-1 transition-colors text-xs sm:text-sm"
                    onClick={() => handlePropertyTypeChange(type)}
                  >
                    {type}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedStatus.map((status) => (
                  <Badge 
                    key={status}
                    variant="secondary" 
                    className="bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 cursor-pointer border border-gray-600 rounded-full px-2 sm:px-3 py-1 transition-colors capitalize text-xs sm:text-sm"
                    onClick={() => handleStatusChange(status)}
                  >
                    {status}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedBedrooms.map((bedroom) => (
                  <Badge 
                    key={bedroom}
                    variant="secondary" 
                    className="bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 cursor-pointer border border-gray-600 rounded-full px-2 sm:px-3 py-1 transition-colors text-xs sm:text-sm"
                    onClick={() => handleBedroomChange(bedroom)}
                  >
                    {bedroom}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {(priceMin > 0 || priceMax < 5000000) && (
                  <Badge 
                    variant="secondary" 
                    className="bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 cursor-pointer border border-gray-600 rounded-full px-2 sm:px-3 py-1 transition-colors text-xs sm:text-sm"
                    onClick={() => {
                      setPriceMin(0)
                      setPriceMax(5000000)
                    }}
                  >
                    ${priceMin.toLocaleString()} - ${priceMax.toLocaleString()}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Listing Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {(!isClient || isLoading) && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
            </div>
          )}

          {/* Projects Grid */}
          {isClient && !isLoading && (
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
          )}

          {/* No Results */}
          {isClient && !isLoading && filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4 border-gray-600 text-gray-300 hover:bg-gray-800/50"
                onClick={() => {
                  setSelectedDistricts([])
                  setSelectedTenures([])
                  setSelectedPropertyTypes([])
                  setSelectedStatus([])
                  setSelectedBedrooms([])
                  setPriceMin(0)
                  setPriceMax(5000000)
                  setSearchQuery("")
                  setSearchInput("")
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {isClient && !isLoading && totalPages > 1 && (
            <div className="flex flex-col items-center mt-12 gap-4">
              {/* Page Info */}
              <div className="text-sm text-gray-400">
                Showing {indexOfFirstProject + 1} to {Math.min(indexOfLastProject, filteredProjects.length)} of {filteredProjects.length} projects
              </div>
              
              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {getPaginationRange(currentPage, totalPages).map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                        ...
                      </span>
                    ) : (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => typeof page === 'number' && setCurrentPage(page)}
                        className={
                          currentPage === page 
                            ? "bg-primary-red text-white hover:bg-primary-red/90 border-primary-red" 
                            : "border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                        }
                      >
                        {page}
                      </Button>
                    )
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
