"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X, Check } from "lucide-react"
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
import { Slider } from "@/components/ui/slider"

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
  slug: string
  location: string
  address?: string
  type?: string
  price: string
  price_from?: string
  lowerPrice?: string
  pricePerSqFt?: string
  bedrooms?: string[]
  bathrooms?: string
  size?: string
  units?: string
  developer?: string
  completion?: string
  description?: string
  features?: string[]
  district?: string | number
  tenure?: string
  propertyType?: string
  status?: string
  totalUnits?: string
  coordinates?: { lat: number; lng: number }
  image?: string
  image_url_banner?: string
}

// Add type definition for Project
type Project = {
  slug: string
  name: string
  location: string
  address?: string
  price: string
  type?: string
  image: string
  image_url_banner?: string | null
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

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

const normalizeMoney = (s?: string) => (s || '').replace(/[\$,]/g, '').trim()
const asMillions = (raw?: string) => {
  const n = Number(normalizeMoney(raw))
  if (!isFinite(n) || n <= 0) return undefined
  const inMillions = n >= 1_000_000
    ? (n / 1_000_000).toFixed(2).replace(/\.00$/, '')
    : (n / 1_000_000).toFixed(2)
  return inMillions
}
const mapStatus = (status: string | null | undefined): 'upcoming' | 'ongoing' | 'completed' => {
  if (!status) return 'upcoming'
  const s = status.toLowerCase()
  if (s.includes('launching soon') || s.includes('coming soon')) return 'upcoming'
  if (s.includes('under construction') || s.includes('ongoing')) return 'ongoing'
  return 'completed'
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
  
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [paginationMeta, setPaginationMeta] = useState({
    total: 0,
    page: 1,
    pageSize: projectsPerPage,
    pageCount: 1,
  })

  useEffect(() => { setIsClient(true) }, [])


  useEffect(() => {
    if (!isClient) return
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort('Request timeout after 15 seconds'), 15000)

    const loadProjects = async (retryCount = 0) => {
      setIsLoading(true)
      try {
        // Map sort to Strapi
        let sortParam = 'created_at:desc'
        if (sortBy === 'price-low-high') sortParam = 'price:asc'
        else if (sortBy === 'price-high-low') sortParam = 'price:desc'
        else if (sortBy === 'completion') sortParam = 'completion:asc'

        const params = new URLSearchParams()
        params.set('page', String(currentPage))
        params.set('pageSize', String(projectsPerPage))
        params.set('sort', sortParam)
        if (searchQuery.trim()) {
          params.set('search', searchQuery.trim())
        }
        
        // Add filter parameters
        if (selectedDistricts.length > 0) {
          selectedDistricts.forEach(district => params.append('districts', String(district)))
        }
        if (selectedTenures.length > 0) {
          selectedTenures.forEach(tenure => params.append('tenures', tenure))
        }
        if (selectedPropertyTypes.length > 0) {
          selectedPropertyTypes.forEach(type => params.append('propertyTypes', type))
        }
        if (selectedStatus.length > 0) {
          selectedStatus.forEach(status => params.append('statuses', status))
        }
        if (selectedBedrooms.length > 0) {
          selectedBedrooms.forEach(bedroom => params.append('bedrooms', bedroom))
        }
        if (priceMin > 0 || priceMax < 5000000) {
          params.set('priceMin', String(priceMin))
          params.set('priceMax', String(priceMax))
        }

        const url = `${API_BASE}/projects-prisma?${params.toString()}`
        const resp = await fetch(url, {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-cache',
        })
        clearTimeout(timeoutId)

        if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`)
        const json = await resp.json()
        const apiProjects: ApiProject[] = json.data || []
        const meta = json.meta?.pagination || { page: currentPage, pageSize: projectsPerPage, pageCount: 1, total: apiProjects.length }
        try {
          const mapped: Project[] = apiProjects.map((p) => {
          // district - handle both string "D10" and number 10 formats
          const districtNumber = p.district ? (() => {
            if (typeof p.district === 'number') {
              return p.district
            } else if (typeof p.district === 'string') {
              const m = p.district.match(/D(\d+)/i)
              return m ? parseInt(m[1], 10) : undefined
            }
            return undefined
          })() : undefined

          // price - API already provides transformed price data
          const price = p.price || 'Price on request'
          const lowerPrice = p.lowerPrice

          // developer - API already provides string
          const developerName = p.developer || 'Developer not specified'

          // coordinates - API already provides coordinates
          const coordinates = p.coordinates || { lat: 1.3521, lng: 103.8198 }

          // image - API already provides image URL
          const image = p.image || '/images/new-launch/new-launch-preview.webp'
          const image_url_banner = p.image_url_banner || image

          // bedrooms - API already provides array
          const bedrooms = p.bedrooms

          return {
            slug: p.slug,
            name: p.name,
            location: p.location,
            address: p.address,
            price,
            price_from: p.price_from, // Add price_from field from API
            priceRange: lowerPrice ? `From $${lowerPrice}M` : undefined,
            pricePerSqFt: p.pricePerSqFt,
            image,
            image_url_banner,
            units: p.units ? `${p.units} Units` : undefined,
            unitsAvailable: p.totalUnits ? `${p.totalUnits} Units` : undefined,
            propertySizeRange: p.size,
            developer: developerName,
            completion: p.completion,
            description: p.description,
            features: p.features || [],
            type: p.type || p.propertyType,
            status: mapStatus(p.status),
            district: districtNumber,
            tenure: p.tenure,
            propertyType: p.propertyType,
            bedrooms,
            coordinates,
            lowerPrice,
          }
        })

          setProjects(mapped)
          setPaginationMeta({
            total: meta.total ?? mapped.length,
            page: meta.page ?? currentPage,
            pageSize: meta.pageSize ?? projectsPerPage,
            pageCount: meta.pageCount ?? 1,
          })
        } catch (error) {
          console.error('Error in mapping:', error)
        }
        setIsLoading(false)
      } catch (err) {
        clearTimeout(timeoutId)
        if (retryCount < 2) {
          const delay = Math.pow(2, retryCount) * 1000
          setTimeout(() => loadProjects(retryCount + 1), delay)
        } else {
          setProjects([])
          setPaginationMeta({ total: 0, page: 1, pageSize: projectsPerPage, pageCount: 1 })
          setIsLoading(false)
        }
      }
    }

    loadProjects()
    return () => controller.abort()
  }, [isClient, currentPage, projectsPerPage, searchQuery, sortBy, selectedDistricts, selectedTenures, selectedPropertyTypes, selectedStatus, selectedBedrooms, priceMin, priceMax])


  const scrollToSearch = () => { searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' }) }

  // Server-side filtering is now handled by the API
  const filteredProjects = projects

  // Get unique districts from current projects
  const districts = Array.from(new Set(projects.map(p => p.district).filter((d): d is number => typeof d === 'number'))).sort((a, b) => a - b)
  const tenures = Array.from(new Set(projects.map(p => p.tenure).filter((t): t is string => t != null && t.trim() !== '')))
  const propertyTypes = Array.from(new Set(projects.map(p => p.propertyType).filter((t): t is string => t !== undefined)))
  const statuses: ("upcoming" | "ongoing" | "completed")[] = ["upcoming", "ongoing", "completed"]

  const bedrooms = (() => {
    const existing = Array.from(new Set(projects.flatMap(p => p.bedrooms || [])))
    const enhanced = [...existing]
    if (!enhanced.includes('Studio')) enhanced.unshift('Studio')
    if (!enhanced.includes('5 or more')) enhanced.push('5 or more')
    return enhanced
  })()

  const currentProjects = filteredProjects // server-paged, then client-filtered
  const totalPages = paginationMeta.pageCount || 1

  const handleDistrictChange = (district: number) => {
    setSelectedDistricts(prev => prev.includes(district) ? prev.filter(d => d !== district) : [...prev, district])
    setCurrentPage(1)
  }
  const handleTenureChange = (tenure?: string) => {
    if (tenure === undefined) return
    setSelectedTenures(prev => prev.includes(tenure) ? prev.filter(t => t !== tenure) : [...prev, tenure])
    setCurrentPage(1)
  }
  const handlePropertyTypeChange = (type?: string) => {
    if (type === undefined) return
    setSelectedPropertyTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])
    setCurrentPage(1)
  }
  const handleStatusChange = (status?: 'upcoming' | 'ongoing' | 'completed') => {
    if (status === undefined) return
    setSelectedStatus(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status])
    setCurrentPage(1)
  }
  const handleBedroomChange = (bedroom?: string) => {
    if (bedroom === undefined) return
    setSelectedBedrooms(prev => prev.includes(bedroom) ? prev.filter(b => b !== bedroom) : [...prev, bedroom])
    setCurrentPage(1)
  }

  const handleSelectAllDistricts = () => {
    setSelectedDistricts(prev => prev.length === districts.length ? [] : [...districts])
    setCurrentPage(1)
  }
  const handleSelectAllTenures = () => {
    setSelectedTenures(prev => prev.length === tenures.length ? [] : [...tenures])
    setCurrentPage(1)
  }

  const getPaginationRange = (currentPage: number, totalPages: number) => {
    const delta = 2
    const range = []
    const rangeWithDots: (number | '...')[] = []
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }
    if (currentPage - delta > 2) rangeWithDots.push(1, '...')
    else rangeWithDots.push(1)
    rangeWithDots.push(...range)
    if (currentPage + delta < totalPages - 1) rangeWithDots.push('...', totalPages)
    else if (totalPages > 1) rangeWithDots.push(totalPages)
    return rangeWithDots
  }

  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">New Launch Properties</h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-12 text-gray-200">
              Discover Singapore's most exclusive new launch condos and properties. From luxury waterfront residences to family-friendly developments, find your perfect home with our curated selection of premium real estate opportunities.
            </p>
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <Button className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg" onClick={() => searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}>
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
                className="w-full pl-4 h-[52px] text-base bg-[#242728] border-gray-600 text-white placeholder:text-gray-400 focus:border-primary-red focus:ring-primary-red/20 backdrop-blur-sm rounded-md"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchQuery(searchInput)
                    setCurrentPage(1)
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
                              className={`w-full justify-center text-xs py-1.5 px-2 min-h-[32px] transition-all duration-200 ${
                                selectedDistricts.includes(district)
                                  ? "bg-primary-red text-white border-primary-red shadow-lg transform scale-105"
                                  : "border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                              }`}
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
                            className={`w-full justify-start text-sm py-2 transition-all duration-200 ${
                              selectedTenures.includes(tenure)
                                ? "bg-primary-red text-white border-primary-red shadow-lg transform scale-[1.02]"
                                : "border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                            }`}
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
                              setCurrentPage(1)
                            }}
                            className="mb-6"
                          />
                        </div>
                        
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
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={(v) => { setSortBy(v); setCurrentPage(1) }}>
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
                className="w-full pl-4 h-[52px] text-lg bg-[#242728] border-gray-600 text-white placeholder:text-gray-400 focus:border-primary-red focus:ring-primary-red/20 backdrop-blur-sm rounded-md"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchQuery(searchInput)
                    setCurrentPage(1)
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
                              className={`w-full justify-center text-xs py-1.5 px-2 min-h-[32px] transition-all duration-200 ${
                                selectedDistricts.includes(district)
                                  ? "bg-primary-red text-white border-primary-red shadow-lg transform scale-105"
                                  : "border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                              }`}
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
                            className={`w-full justify-start text-sm py-2 transition-all duration-200 ${
                              selectedTenures.includes(tenure)
                                ? "bg-primary-red text-white border-primary-red shadow-lg transform scale-[1.02]"
                                : "border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-gray-500"
                            }`}
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
                              setCurrentPage(1)
                            }}
                            className="mb-6"
                          />
                        </div>
                        
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
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={(v) => { setSortBy(v); setCurrentPage(1) }}>
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
          
          {/* Active Filters */}
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
                    setSearchQuery("")
                    setSearchInput("")
                    setCurrentPage(1)
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
                    className="bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 cursor-pointer border border-gray-600 rounded-full px-2 sm:px-3 py-1 transition-colors text-xs sm:text-sm capitalize"
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
                      setCurrentPage(1)
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

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
            </div>
          )}

          {!isLoading && projects.length > 0 && (
            <div className="text-sm text-gray-400 mb-6">
              {(() => {
                const start = (paginationMeta.page - 1) * paginationMeta.pageSize + 1
                const end = Math.min(paginationMeta.page * paginationMeta.pageSize, paginationMeta.total)
                return `Showing ${start} to ${end} of ${paginationMeta.total} projects`
              })()}
            </div>
          )}

          {!isLoading && (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div key={project.slug || `project-${index}`} variants={fadeInUp}>
                  <ProjectCard 
                    {...project}
                    type={project.type || 'Mixed Development'}
                    coordinates={project.coordinates || { lat: 1.3521, lng: 103.8198 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && projects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">New Project Coming Soon</p>
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
                  setCurrentPage(1)
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}

          {!isLoading && (paginationMeta.pageCount || 1) > 1 && projects.length > 0 && (
            <div className="flex flex-col items-center mt-12 gap-4">
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
                  {getPaginationRange(currentPage, paginationMeta.pageCount || 1).map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">...</span>
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
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, paginationMeta.pageCount || 1))}
                  disabled={currentPage === (paginationMeta.pageCount || 1)}
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