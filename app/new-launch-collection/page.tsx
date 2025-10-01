"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Bed } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const newLaunches = [
  {
    id: 1,
    title: "Springleaf Residence",
    summary: "The North's First Nature-Integrated, and Well-connected High-Rise",
    image: "/images/new-launch/springleaf-collection.webp",
    location: "Upper Thomson",
    district: "District 26",
    status: "Registration Open",
    type: "Condo",
    bedrooms: "1-5 BR",
    price: "From $1,360,000",
    url: "/springleaf-residence",
  },
  {
    id: 2,
    title: "Penrith",
    summary: "The Margaret Drive Address That Brings You Closer to Everything",
    image: "/images/new-launch/penrith-collection.webp",
    launchDate: "April 2024",
    location: "Queenstown",
    district: "District 3",
    status: "Early Interest",
    type: "Condo",
    bedrooms: "2-5",
    price: "Coming Soon",
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
    status: "Coming Soon",
    type: "Condo",
    bedrooms: "2-5",
    price: "From $1,765,000",
    url: "",
  },
  {
    id: 4,
    title: "W Residences Marina View",
    summary: "Embrace liberated luxury with sleek, chic apartments that offer exclusive 5-star W facilities and services.",
    image: "/images/new-launch/w-residences-collection.webp",
    launchDate: "June 2024",
    location: "Marina View",
    district: "District 1",
    status: "Coming Soon",
    type: "Condo",
    bedrooms: "1-5 BR",
    price: "From $1,848,000",
    url: "",
  },
]

const filterOptions = {
  district: ["All", "District 1", "District 3", "District 7", "District 26"],
  status: ["All", "Preview Available", "Coming Soon", "Registration Open", "Early Interest"],
}

export default function NewLaunchCollectionPage() {
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
      <section className="relative px-4 sm:px-6 bg-black border-b border-[#666666]/20 min-h-[50vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-center justify-center pt-20 sm:pt-20 md:pt-12">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-4 sm:space-y-5 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight font-sans text-white">
              KW Singapore
              <span className="block text-[#B40101] italic">New Launch Collection</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed text-white px-2">
              Explore Singapore's most exclusive new property developments. <br /> Each project represents exceptional value and prime locations across the island.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 bg-black">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-10 sm:mb-12 md:mb-16 space-y-3 md:space-y-4">
            
            {/* Filter Groups */}
            <div className="flex flex-row items-center justify-between gap-3 border-b border-[#666666]/20 pb-4 sm:pb-6">
              <h2 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/60 font-sans">Filter by</h2>
              <button
                onClick={() => setActiveFilters({ districts: [], status: "All" })}
                className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full">
              {/* District Filter */}
              <div className="space-y-4 w-full">
              <h3 className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white/60 font-sans">
                District {activeFilters.districts.length > 0 && `(${activeFilters.districts.length})`}
              </h3>
                <div className="flex gap-2 overflow-x-auto whitespace-nowrap snap-x snap-mandatory pb-2 min-w-0" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {filterOptions.district.map((district) => {
                    const isAll = district === 'All'
                    const isActive = isAll ? activeFilters.districts.length === 0 : activeFilters.districts.includes(district)
                    return (
                      <button
                        key={district}
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
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-4 w-full">
                <h3 className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white/60 font-sans">Status</h3>
                <div className="flex gap-2 overflow-x-auto whitespace-nowrap snap-x snap-mandatory pb-2 min-w-0" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {filterOptions.status.map((status) => (
                    <button
                      key={status}
                      onClick={() => setActiveFilters({ ...activeFilters, status })}
                    className={`shrink-0 px-4 py-2 text-sm border transition-all snap-start min-w-max ${
                      activeFilters.status === status
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-[#666666]/40 hover:border-white"
                    }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>


          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px] sm:gap-[30px] mb-12 sm:mb-16 md:mb-20">
            {filteredLaunches.map((launch) => (
              <div key={launch.id} className="group space-y-6">
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
                      launch.status === "Coming Soon" || launch.status === "Registration Open"
                        ? "bg-[#B40101] text-white"
                        : "bg-black/90 text-white"
                    }`}
                    >
                      {launch.status}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-4">
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
              </div>
            ))}
          </div>

        {/* Results Count */}
        {filteredLaunches.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60">No properties match your filters. Try adjusting your selection.</p>
          </div>
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