"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CountdownTimer from "@/components/countdown-timer"
import ProjectCard from "@/components/project-card"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import CountUp from "react-countup"

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would redirect to search results
    console.log(`Searching in category: ${["New Launches", "Resale", "Rent"][activeTab]}`)
  }

  const handleNewLaunchSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching new launches:", searchQuery)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section - Updated with new content */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
            alt="Luxury Singapore Property"
            fill
            className="object-cover brightness-[0.3]"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white p-4 sm:p-6 md:p-8 min-h-screen">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              Unlock Your Full Potential in Singapore's Dynamic Property Market
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Imagine having access to unparalleled resources, cutting-edge technology, and a supportive community that propels you to the forefront of Singapore's real estate scene. At Keller Williams Singapore, we're not just a brokerage; we're a platform built for your success.
            </p>
            <p className="text-sm sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Whether you're a seasoned agent looking to dominate the new launch niche or a rising star seeking comprehensive support, you've found your home.
            </p>
            <Button 
              className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Find Out More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* New Section - Unfair Advantage */}
      <section className="relative py-16 sm:py-24 md:py-32 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
            alt="Luxury Property Development"
            fill
            className="object-cover brightness-[0.2]"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Your Unfair Advantage Starts Here
              </h2>
              <p className="text-base sm:text-xl text-gray-300 leading-relaxed">
                Lead the new launch market. We provide the specialized knowledge, tools, and network to make it happen.
              </p>
            </div>

            {/* New Launch Search */}
            <div className="w-full max-w-3xl mx-auto">
              <form onSubmit={handleNewLaunchSearch} className="flex flex-col md:flex-row gap-3 sm:gap-4">
                <Input
                  type="text"
                  placeholder="Search for new launch projects, developers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-12 sm:h-14 text-base sm:text-lg border-0 bg-white/10 text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-primary-red rounded-lg backdrop-blur-sm"
                />
                <Button 
                  type="submit"
                  className="h-12 sm:h-14 px-6 sm:px-8 bg-primary-red hover:bg-primary-red/90 text-white font-medium rounded-lg transition-all duration-300"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured New Launches Section - Enhanced with better card design */}
      <section className="relative py-24 md:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Featured New Launches</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover the most exclusive new property launches in prime locations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <ProjectCard
              title="10 Evelyn"
              location="Newton, District 11"
              price="From $1.2M"
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
              units="120 Units"
              developer="Amara Holdings"
              completion="2025"
              slug="10-evelyn"
              className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            />

            <ProjectCard
              title="The Avenir"
              location="River Valley, District 9"
              price="From $2.5M"
              image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
              units="376 Units"
              developer="Hong Leong Group"
              completion="2025"
              slug="the-avenir"
            />

            <ProjectCard
              title="Midtown Modern"
              location="Bugis, District 7"
              price="From $1.8M"
              image="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
              units="558 Units"
              developer="GuocoLand"
              completion="2024"
              slug="midtown-modern"
            />
          </div>
        </div>
      </section>

      {/* New Section - Launch Countdown */}
      <section className="relative py-14 sm:py-20 md:py-28 bg-black text-white overflow-hidden">
        {/* Background Image with Parallax-like Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
            alt="Luxury Singapore Property"
            fill
            className="object-cover object-center scale-105 brightness-[0.15]"
            quality={100}
            priority
          />
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05),transparent_20%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Main Content Card */}
            <div className="relative overflow-hidden rounded-3xl backdrop-blur-sm border border-white/10 bg-black/30">
              {/* Content Layout - Single Column */}
              <div className="p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
                {/* Text Content */}
                <div className="space-y-3 sm:space-y-4 text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                    The Future of Real Estate in Singapore is Here. Are You Ready?
                  </h2>
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                      Get ready to experience a new era of real estate with the upcoming launch of Keller Williams Singapore. Be among the first to join a revolutionary platform designed to elevate your career with unparalleled support, cutting-edge technology, and a global network.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-medium text-primary-red">
                      The countdown has begun!
                    </p>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="bg-black/50 rounded-2xl border border-primary-red/20 p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col items-center space-y-3 sm:space-y-5 w-full">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full">
                      <div className="p-2 rounded-full bg-primary-red/10 mb-2 sm:mb-0">
                        <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-primary-red" />
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white text-center">Launch Countdown</h3>
                    </div>
                    {/* Enhanced Countdown Timer */}
                    <div className="w-full flex justify-center">
                      <div className="transform scale-100 sm:scale-105 w-full max-w-xs">
                        <CountdownTimer targetDate="2024-05-25T00:00:00" />
                      </div>
                    </div>
                    {/* Additional Info */}
                    <p className="text-center text-gray-300 text-base sm:text-lg">
                      Join us for the most anticipated real estate launch of 2024
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                  <Button 
                    className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                  >
                    Be Part of the Launch
                    <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Leadership Section */}
      <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05),transparent_70%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl backdrop-blur-sm border border-white/10 bg-black/30 p-8 md:p-12">
              {/* Global Leadership Content */}
              <div className="space-y-8">
                {/* Impactful Statistic */}
                <div className="text-center space-y-4">
                  <div className="inline-block">
                    <span className="text-6xl md:text-8xl font-bold text-primary-red tracking-tight">#1</span>
                    <span className="text-3xl md:text-4xl font-bold text-white ml-2">Globally</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                    Join the Global Powerhouse: Keller Williams – The World's #1 in Agent Count
                  </h2>
                </div>

                {/* Global Reach Animated Stats & Map */}
                <div className="w-full flex flex-col items-center gap-8">
                  <div className="w-full flex flex-wrap justify-center gap-8 mb-4">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl md:text-5xl font-bold text-primary-red">
                        <CountUp end={5} duration={2} />
                      </span>
                      <span className="text-lg text-gray-200 mt-1">Continents</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-4xl md:text-5xl font-bold text-primary-red">
                        <CountUp end={55} duration={2} suffix="+" />
                      </span>
                      <span className="text-lg text-gray-200 mt-1">Regions</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-4xl md:text-5xl font-bold text-primary-red">
                        <CountUp end={300} duration={2} suffix="+" />
                      </span>
                      <span className="text-lg text-gray-200 mt-1">Market Center Locations</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-4xl md:text-5xl font-bold text-primary-red">
                        <CountUp end={189000} duration={2.5} separator="," suffix="+" />
                      </span>
                      <span className="text-lg text-gray-200 mt-1">Associates Globally</span>
                    </div>
                  </div>
                  <div className="w-full max-w-2xl mx-auto">
                    <ComposableMap projectionConfig={{ scale: 120 }} width={600} height={300} style={{ width: "100%", height: "auto" }}>
                      <Geographies geography="/maps/world-countries.json">
                        {({ geographies }: { geographies: any[] }) =>
                          geographies.map((geo: any) => {
                            // List of Keller Williams countries (ISO_A3 codes)
                            const kwCountries = [
                              "USA", "CAN", "MEX", "BRA", "COL", "PER", "ARG", "CHL", "ECU", "VEN", "CRI", "PAN", "PRI", "TTO", "URY", "ZAF", "NGA", "EGY", "KEN", "GHA", "TUN", "MAR", "FRA", "ESP", "PRT", "GBR", "DEU", "ITA", "TUR", "POL", "ROU", "SRB", "HUN", "CZE", "SVK", "BGR", "GRC", "RUS", "IND", "THA", "PHL", "SGP", "VNM", "KOR", "JPN", "AUS", "NZL", "CHN", "IDN", "MYS", "KAZ", "ARE", "QAT", "SAU", "ISR"
                            ]
                            const isKW = kwCountries.includes(geo.properties.ISO_A3)
                            return (
                              <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={isKW ? "#DC2626" : "#e5e7eb"}
                                stroke="#222"
                                style={{
                                  default: { outline: "none", transition: "fill 0.3s" },
                                  hover: { fill: isKW ? "#b91c1c" : "#f87171", outline: "none" },
                                  pressed: { outline: "none" }
                                }}
                              />
                            )
                          })
                        }
                      </Geographies>
                    </ComposableMap>
                  </div>
                </div>

                {/* Supporting Paragraph */}
                <div className="space-y-6">
                  <p className="text-xl text-gray-200 leading-relaxed text-center">
                    You deserve to be part of something bigger. Keller Williams isn't just a local agency; we are the largest real estate company globally by agent count. This vast international network translates to unparalleled opportunities, innovative resources, and a reputation that opens doors. By joining Keller Williams Singapore, you're aligning yourself with a proven leader, instantly elevating your profile and access.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center pt-4">
                  <Button 
                    className="group px-10 py-6 text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                  >
                    Find Out More
                    <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MVVBP Section */}
      <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05),transparent_70%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl backdrop-blur-sm border border-white/10 bg-black/30 p-8 md:p-12">
              {/* MVVBP Content */}
              <div className="space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                    MVVBP | Our Foundation
                  </h2>
                  <p className="text-xl text-gray-300">
                    Guiding Principles for Your Success
                  </p>
                </div>

                {/* Mission */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary-red">Mission</h3>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    To build careers worth having, businesses worth owning, lives worth living, experiences worth giving, and legacies worth leaving.
                  </p>
                </div>

                {/* Vision */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary-red">Vision</h3>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    To be the real estate company of choice for agents and their customers.
                  </p>
                </div>

                {/* Values */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary-red">Values</h3>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    God, Family, then Business.
                  </p>
                </div>

                {/* Beliefs */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary-red">Beliefs (WI4C2TS)</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-red font-bold">•</span>
                      <span className="text-gray-200">Win-Win: or no deal</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-red font-bold">•</span>
                      <span className="text-gray-200">Integrity: do the right thing</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-red font-bold">•</span>
                      <span className="text-gray-200">Customers: always come first</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-red font-bold">•</span>
                      <span className="text-gray-200">Commitment: in all things</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-red font-bold">•</span>
                      <span className="text-gray-200">Communication: seek first to understand</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-red font-bold">•</span>
                      <span className="text-gray-200">Creativity: ideas before results</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-red font-bold">•</span>
                      <span className="text-gray-200">Teamwork: together everyone achieves more</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-red font-bold">•</span>
                      <span className="text-gray-200">Trust: begins with honesty</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-red font-bold">•</span>
                      <span className="text-gray-200">Success: results through people</span>
                    </li>
                  </ul>
                </div>

                {/* Perspective */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary-red">Perspective</h3>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    A technology company providing the real estate platform that our agents' buyers and sellers prefer. Keller Williams thinks like a top producer, acts like a trainer-consultant, and focuses all its activities on service, productivity, and profitability.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center pt-6">
                  <Button 
                    className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                  >
                    Discover Our Culture
                    <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Share Section */}
      <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05),transparent_70%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl backdrop-blur-sm border border-white/10 bg-black/30 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Column - Visual Metaphor */}
                <div className="relative h-[400px] md:h-[500px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Growth Tree Visualization */}
                    <div className="relative w-full h-full">
                      {/* Tree Trunk */}
                      <div className="absolute left-1/2 bottom-0 w-4 h-[60%] bg-primary-red/20 rounded-full transform -translate-x-1/2">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-red/40 to-transparent rounded-full"></div>
                      </div>
                      
                      {/* Tree Branches */}
                      <div className="absolute left-1/2 top-[20%] w-[80%] h-[40%] transform -translate-x-1/2">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-full relative">
                            {/* Circular Nodes representing Growth Share benefits */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary-red/20 rounded-full flex items-center justify-center border-2 border-primary-red/40">
                              <span className="text-primary-red font-bold">Legacy</span>
                            </div>
                            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-16 h-16 bg-primary-red/20 rounded-full flex items-center justify-center border-2 border-primary-red/40">
                              <span className="text-primary-red font-bold">Wealth</span>
                            </div>
                            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-16 h-16 bg-primary-red/20 rounded-full flex items-center justify-center border-2 border-primary-red/40">
                              <span className="text-primary-red font-bold">Growth</span>
                            </div>
                            
                            {/* Connecting Lines */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <line x1="50" y1="0" x2="50" y2="50" stroke="rgba(220,38,38,0.3)" strokeWidth="2" />
                              <line x1="50" y1="0" x2="0" y2="50" stroke="rgba(220,38,38,0.3)" strokeWidth="2" />
                              <line x1="50" y1="0" x2="100" y2="50" stroke="rgba(220,38,38,0.3)" strokeWidth="2" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                      Unlock Lasting Wealth: Build Your Legacy with KW Growth Share
                    </h2>
                    <div className="space-y-6">
                      <p className="text-lg text-gray-200 leading-relaxed">
                        What if your contribution to building a thriving brokerage directly translated into long-term financial growth? Keller Williams' revolutionary Growth Share program makes this a reality.
                      </p>
                      <p className="text-lg text-gray-200 leading-relaxed">
                        By attracting talented agents to our community, you gain the opportunity to earn passive income, with the potential for this income stream to even extend to your beneficiaries. Secure your financial future and build wealth that lasts.
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <Button 
                      className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                    >
                      Explore Growth Share
                      <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
        {/* Background Image with Parallax-like Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="Technology Background"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center brightness-[0.5]"
            quality={100}
          />
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05),transparent_20%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Content */}
            <div className="text-center mb-16 space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                The Future of Real Estate, Intelligently Integrated
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience KW's powerful, integrated technology suite of tools.
              </p>
            </div>

            {/* Technology Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* KW Command Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
                  <div className="aspect-video relative mb-6 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
                      alt="KW Command Interface"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary-red"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-red/50"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-red/30"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">KW Command</h3>
                  <p className="text-gray-300">
                    Command for seamless business management
                  </p>
                </div>
              </div>

              {/* KW Consumer App Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
                  <div className="aspect-video relative mb-6 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80"
                      alt="KW Consumer App"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary-red"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-red/50"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-red/30"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">KW Consumer App</h3>
                  <p className="text-gray-300">
                    Our intuitive Consumer App for enhanced client engagement
                  </p>
                </div>
              </div>

              {/* KW Connect Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
                  <div className="aspect-video relative mb-6 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80"
                      alt="KW Connect"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary-red"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-red/50"></div>
                        <div className="w-2 h-2 rounded-full bg-primary-red/30"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">KW Connect</h3>
                  <p className="text-gray-300">
                    Connect for unparalleled networking and learning
                  </p>
                </div>
              </div>
            </div>

            {/* AI Powered Description */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-lg text-gray-300 leading-relaxed">
                All powered by AI, KWIQ, providing you with intelligent insights and automation to elevate your business. Access this entire suite across web and mobile, putting you at the forefront of real estate innovation.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Button 
                className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
              >
                Discover KW Tech
                <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
