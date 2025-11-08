"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Bed } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const newLaunches = [
  {
    id: 1,
    title: "Springleaf Residence",
    summary: "The North's First Nature-Integrated, and Well-connected High-Rise",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/springleaf-collection.webp",
    location: "Upper Thomson",
    district: "District 26",
    status: "Launched",
    type: "Condo",
    bedrooms: "3-5",
    price: "From $2,300,000",
    url: "/springleaf-residence",
  },
  {
    id: 2,
    title: "Penrith",
    summary: "The Margaret Drive Address That Brings You Closer to Everything",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/penrith-collection.webp",
    launchDate: "April 2024",
    location: "Queenstown",
    district: "District 3",
    status: "Launched",
    type: "Condo",
    bedrooms: "2-5",
    price: "From $1,495,000",
    url: "/penrith",
  },
  {
    id: 3,
    title: "Aurea",
    summary: "he Golden Mile's Premier Residential Development",
    image: "/images/aurea/hero-aurea.webp",
    launchDate: "May 2024",
    location: "Beach Road",
    district: "District 7",
    status: "Launched",
    type: "Condo",
    bedrooms: "2-5",
    price: "From $1,765,000",
    url: "/aurea",
  },
  {
    id: 4,
    title: "W Residences Marina View",
    summary: "Embrace liberated luxury with sleek, chic apartments that offer exclusive 5-star W facilities and services.",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/w-residences-collection.webp",
    launchDate: "June 2024",
    location: "Marina View",
    district: "District 1",
    status: "Launched",
    type: "Condo",
    bedrooms: "1-5 BR",
    price: "From $1,848,000",
    url: "/w-residences",
  },
  {
    id: 5,
    title: "Arina East Residences",
    summary: "The East Coast's First Nature-Integrated, and Well-connected High-Rise",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/arina-east-collection.webp",
    launchDate: "June 2024",
    location: "East Coast",
    district: "District 15",
    status: "Launched",
    type: "Condo",
    bedrooms: "1-4",
    price: "From $1,298,000",
    url: "/arina-east",
  },
  {
    id: 6,
    title: "Artisan 8",
    summary: "Exceptionally Crafted Homes With Enduring Value",
    image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/artisan-8-collection.webp",
    launchDate: "TBC",
    location: "Sin Ming",
    district: "District 20",
    status: "Q2 2027",
    type: "Condo",
    bedrooms: "1-5",
    price: "From $1,292,000",
    url: "/artisan-8",
  },
  
]

// Derive district options from data and sort from lowest to highest
const districtOptions = [
  "All",
  ...Array.from(new Set(newLaunches.map((l) => l.district)))
    .filter(district => district !== "All")
    .sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ''))
      const numB = parseInt(b.replace(/\D/g, ''))
      return numA - numB
    })
]

const filterOptions = {
  status: ["All", "Launched", "Preview Available", "Coming Soon", "Registration Open", "Early Interest"],
}

export default function NewLaunchCollectionPage() {
  useEffect(() => {
    document.title = 'New Launch Collection - KW Singapore'
  }, [])
  const [activeFilters, setActiveFilters] = useState({
    districts: [] as string[],
    status: "All",
  })

  const filteredLaunches = newLaunches.filter((launch) => {
    if (activeFilters.districts.length > 0 && !activeFilters.districts.includes(launch.district)) return false
    if (activeFilters.status !== "All" && launch.status !== activeFilters.status) return false
    return true
  })

  const toggleDistrict = (district: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      districts: prev.districts.includes(district)
        ? prev.districts.filter((d) => d !== district)
        : [...prev.districts, district],
    }))
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-black border-b border-[#666666]/20 min-h-[50vh] sm:min-h-[40vh] md:min-h-[40vh] lg:min-h-[60vh] flex items-center justify-center pt-20 sm:pt-20 md:pt-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center space-y-4 sm:space-y-5 md:space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight font-sans text-white"
            >
              KW Singapore
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="block text-[#B40101] italic"
              >
                New Launch Collection
              </motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="text-sm sm:text-base md:text-xl lg:text-xl mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed text-white"
            >
              Explore Singapore's most exclusive new property developments. <br /> Each project represents exceptional value and prime locations across the island.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-14 sm:py-16 md:py-20 bg-black mx-0 lg:mx-[84px]">
        <div className="container mx-auto max-w-screen-2xl px-[14px] sm:px-[22px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            className="mb-10 sm:mb-12 md:mb-16 space-y-3 md:space-y-4"
          >
            
            {/* Filter Groups */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
              className="flex flex-row items-center justify-between gap-3 border-b border-[#666666]/20 pb-4 sm:pb-6"
            >
              <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/60 font-sans">Filter by</h2>
              <button
                onClick={() => setActiveFilters({ districts: [], status: "All" })}
                className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors"
              >
                Clear all
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full"
            >
              {/* District Filter */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
                className="space-y-4 w-full"
              >
              <h3 className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white/60 font-sans">
                District {activeFilters.districts.length > 0 && `(${activeFilters.districts.length})`}
              </h3>
                <div className="flex gap-2 overflow-x-auto whitespace-nowrap snap-x snap-mandatory pb-2 min-w-0" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {districtOptions.map((district, index) => {
                    const isAll = district === 'All'
                    const isActive = isAll ? activeFilters.districts.length === 0 : activeFilters.districts.includes(district)
                    return (
                      <motion.button
                        key={district}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 1.7 + (index * 0.1), ease: "easeOut" }}
                        onClick={() => {
                          if (isAll) {
                            setActiveFilters((prev) => ({ ...prev, districts: [] }))
                          } else {
                            toggleDistrict(district)
                          }
                        }}
                        className={`shrink-0 px-4 py-2 text-sm border transition-all snap-start min-w-max ${
                          isActive
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-white border-[#666666]/40 hover:border-white"
                        }`}
                      >
                        {district}
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>

              {/* Status Filter */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
                className="space-y-4 w-full"
              >
                <h3 className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white/60 font-sans">Status</h3>
                <div className="flex gap-2 overflow-x-auto whitespace-nowrap snap-x snap-mandatory pb-2 min-w-0" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {filterOptions.status.map((status, index) => (
                    <motion.button
                      key={status}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.7 + (index * 0.1), ease: "easeOut" }}
                      onClick={() => setActiveFilters({ ...activeFilters, status })}
                    className={`shrink-0 px-4 py-2 text-sm border transition-all snap-start min-w-max ${
                      activeFilters.status === status
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-[#666666]/40 hover:border-white"
                    }`}
                    >
                      {status}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>


          {/* Projects Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px] sm:gap-[30px] mb-12 sm:mb-16 md:mb-20"
          >
            {filteredLaunches.map((launch, index) => (
              <motion.div 
                key={launch.id} 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.2 + (index * 0.1), ease: "easeOut" }}
                className="group space-y-6"
              >
                {/* Property Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black/40 rounded-md border border-[#666666]/20">
                  <img
                    src={launch.image || "/placeholder.svg?height=800&width=640"}
                    alt={launch.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6">
                    <span
                    className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs tracking-wider backdrop-blur-sm ${
                      launch.status === "Launched"
                        ? "bg-[#B40101] text-white"
                        : launch.status === "Coming Soon" || launch.status === "Registration Open"
                        ? "bg-[#B40101] text-white"
                        : "bg-black/90 text-white"
                    }`}
                    >
                      {launch.status}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-2">
                {/* Location */}
                <div className="flex items-center text-white/60 text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 mr-2 shrink-0" />
                  <span>{launch.location}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-sans font-semibold text-white leading-tight sm:min-h-[5rem]">
                  {launch.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed sm:min-h-[4rem] line-clamp-4 font-sans">
                  {launch.summary}
                </p>

                {/* Property Info */}
                <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/60 pt-2">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span>{launch.bedrooms.includes('BR') ? launch.bedrooms : `${launch.bedrooms} BR`}</span>
                  </div>
                  <div className="border-l border-[#666666]/40 pl-4 sm:pl-6">
                    <span className="text-white font-medium">{launch.price}</span>
                  </div>
                </div>

                  {/* CTA */}
                  <div className="pt-4">
                  {launch.url ? (
                    <Link href={launch.url}>
                      <Button
                        variant="outline"
                        className="w-full h-10 sm:h-10 border-white text-white hover:bg-[#B40101] hover:text-white transition-all bg-transparent rounded-md"
                      >
                        View More
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      disabled
                      aria-disabled="true"
                      className="w-full h-10 sm:h-10 border-white text-white bg-transparent rounded-md cursor-not-allowed opacity-70"
                    >
                      Coming Soon
                    </Button>
                  )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        {/* Results Count */}
        {filteredLaunches.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center py-20"
          >
            <p className="text-white/60">No properties match your filters. Try adjusting your selection.</p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        {/* <div className="text-center pt-10 sm:pt-12 border-t border-[#666666]/20">
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-sans font-light text-white">Explore our collection</h3>
            <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto font-sans">
              Discover additional luxury developments and investment opportunities across Singapore
            </p>
            <Link href="https://kwsg-prototype.vercel.app/projects" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="h-11 sm:h-12 border-white text-white hover:bg-[#B40101] hover:text-white bg-transparent rounded-md"
              >
                View All Properties
              </Button>
            </Link>
          </div>
        </div> */}
        </div>
      </section>
    </main>
  )
}