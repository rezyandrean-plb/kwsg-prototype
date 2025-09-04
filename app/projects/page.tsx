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
  developer: string | { name?: string }
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
  latitude: number | string | null
  longitude: number | string | null
  created_at: string
  updated_at: string
  image_url_banner: string | null
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

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://striking-hug-052e89dfad.strapiapp.com'

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
        params.set('populate', 'developer')
        if (searchQuery.trim()) {
          // basic containsi on two fields
          params.set('filters[name][$containsi]', searchQuery.trim())
          params.set('filters[location][$containsi]', searchQuery.trim())
        }

        const url = `${API_BASE}/api/projects?${params.toString()}`
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

        const mapped: Project[] = apiProjects.map((p) => {
          // district
          const districtNumber = p.district ? (() => {
            const m = p.district.match(/D(\d+)/i)
            return m ? parseInt(m[1], 10) : undefined
          })() : undefined

          // price
          const priceFromM = asMillions(p.price_from)
          let price = 'Price on request'
          let lowerPrice: string | undefined = undefined
          if (priceFromM) {
            lowerPrice = priceFromM
            price = `From $${priceFromM}M`
          } else if (p.display_price) {
            const m = p.display_price.match(/([\$]?[0-9,]+(\.[0-9]+)?)/)
            if (m) {
              const million = asMillions(m[1])
              if (million && million !== '0') {
                lowerPrice = million
                price = `From $${million}M`
              } else {
                price = p.display_price
              }
            } else {
              price = p.display_price
            }
          } else if (p.price) {
            price = p.price
          }

          // developer
          const developerName =
            typeof p.developer === 'string'
              ? p.developer
              : (p.developer && typeof p.developer === 'object' && 'name' in p.developer)
                ? (p.developer as any).name
                : ''

          // coords
          const lat = typeof p.latitude === 'number' ? p.latitude : p.latitude ? Number(p.latitude) : undefined
          const lng = typeof p.longitude === 'number' ? p.longitude : p.longitude ? Number(p.longitude) : undefined
          const coordinates = lat != null && lng != null ? { lat, lng } : { lat: 1.3521, lng: 103.8198 }

          // image
          const image = p.image_url_banner && p.image_url_banner.trim() !== ''
            ? p.image_url_banner
            : '/images/new-launch/new-launch-preview.webp'

          // bedrooms
          const bedrooms = p.bedrooms ? p.bedrooms.split(',').map(b => b.trim()).filter(b => b && b !== 'N/A') : undefined

          return {
            slug: p.slug,
            name: p.name || p.project_name,
            location: p.location,
            address: p.address,
            price,
            priceRange: p.display_price || undefined,
            pricePerSqFt: p.price_per_sqft,
            image,
            image_url_banner: p.image_url_banner,
            units: p.units ? `${p.units} Units` : undefined,
            unitsAvailable: p.total_units ? `${p.total_units} Units` : undefined,
            propertySizeRange: p.size,
            developer: developerName,
            completion: p.completion,
            description: p.description,
            features: p.features || [],
            type: p.type || p.property_type,
            status: mapStatus(p.status),
            district: districtNumber,
            tenure: p.tenure,
            propertyType: p.property_type,
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
  }, [isClient, currentPage, projectsPerPage, searchQuery, sortBy])

  const scrollToSearch = () => { searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' }) }

  // Client-side filtering of current page (optional; server already paginated)
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof project.developer === 'string' ? project.developer.toLowerCase() : '').includes(searchQuery.toLowerCase())

    const matchesDistrict = selectedDistricts.length === 0 || (project.district && selectedDistricts.includes(project.district))
    const matchesTenure = selectedTenures.length === 0 || (project.tenure && selectedTenures.includes(project.tenure))
    const matchesPropertyType = selectedPropertyTypes.length === 0 || (project.propertyType && selectedPropertyTypes.includes(project.propertyType))
    const matchesStatus = selectedStatus.length === 0 || (project.status && selectedStatus.includes(project.status))
    const matchesBedrooms = selectedBedrooms.length === 0 || (() => {
      if (!project.bedrooms || project.bedrooms.length === 0) return false
      return selectedBedrooms.some(selectedBedroom => {
        if (selectedBedroom === 'Studio') {
          return project.bedrooms?.includes('Studio') || project.bedrooms?.includes('0')
        } else if (selectedBedroom === '5 or more') {
          return project.bedrooms?.some(bedroom => {
            const num = parseInt(bedroom)
            return !isNaN(num) && num >= 5
          })
        } else {
          return project.bedrooms?.includes(selectedBedroom)
        }
      })
    })()

    const [projectMin, projectMax] = (project.priceRange || '').split(" - ").map(price => parseInt(price.replace(/[^0-9]/g, "")))
    const matchesPriceRange =
      (priceMin === 0 && priceMax === 5000000) ||
      (projectMax >= priceMin && projectMin <= priceMax)

    return matchesSearch && matchesDistrict && matchesTenure && matchesPropertyType && matchesStatus && matchesBedrooms && matchesPriceRange
  })

  const districts = Array.from(new Set(projects.map(p => p.district).filter((d): d is number => d !== undefined))).sort((a, b) => a - b)
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

      <section ref={searchSectionRef} className="container mx-auto px-4 mt-[-4rem] mb-12 relative z-10">
        <div className="bg-[#242728] rounded-2xl shadow-lg p-4 sm:p-6">
          {/* Mobile controls (omitted here for brevity, same as your original) */}
          {/* Desktop controls (omitted for brevity) */}
          {/* Keep your full controls as in your code; logic above wires data */}
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
              {filteredProjects.map((project) => (
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