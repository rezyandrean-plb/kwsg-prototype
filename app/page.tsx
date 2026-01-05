"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight, Calendar, ChevronRight, Rocket, BarChart3, Bot, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CountdownTimer from "@/components/countdown-timer"
import ProjectCard from "@/components/project-card"
import ProjectMap from "@/components/project-map"
import CountUp from "react-countup"
import { projects } from "@/data/projects"
import { useInView } from "react-intersection-observer"
import { motion, useAnimation } from "framer-motion"
import dynamic from 'next/dynamic'

// Dynamically import dialogs
const ContactDialog = dynamic(() => import("@/components/contact-dialog").then(mod => mod.ContactDialog), {
  loading: () => <div className="w-full h-full flex items-center justify-center">Loading...</div>
})
const WebinarDialog = dynamic(() => import("@/components/webinar-dialog").then(mod => mod.WebinarDialog), {
  loading: () => <div className="w-full h-full flex items-center justify-center">Loading...</div>
})
const JoinFormDialog = dynamic(() => import("@/components/join-form-dialog").then(mod => mod.JoinFormDialog), {
  loading: () => <div className="w-full h-full flex items-center justify-center">Loading...</div>
})

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWebinarDialogOpen, setIsWebinarDialogOpen] = useState(false)
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false)
  const [expandedAdvantage, setExpandedAdvantage] = useState(-1)
  const [scrollY, setScrollY] = useState(0)
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [currentReelIndex2, setCurrentReelIndex2] = useState(0)
  const [currentReelIndex2Desktop, setCurrentReelIndex2Desktop] = useState(0)
  const [currentReelIndex2Tablet, setCurrentReelIndex2Tablet] = useState(0)
  const [currentConsultantIndex, setCurrentConsultantIndex] = useState(0)
  
  // Ref for the KW Advantage section
  const advantageSectionRef = useRef<HTMLElement>(null)

  // Memoize handlers
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Searching in category: ${["New Launches", "Resale", "Rent"][activeTab]}`)
  }, [activeTab])

  const handleNewLaunchSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching new launches:", searchQuery)
  }, [searchQuery])

  const handleFormSubmit = useCallback((data: any) => {
    console.log("Form submitted:", data)
  }, [])

  const handleWebinarSubmit = useCallback((data: { email: string }) => {
    console.log("Webinar registration:", data)
    setIsWebinarDialogOpen(false)
  }, [])

  const handleJoinSubmit = useCallback((data: any) => {
    console.log("Join form submitted:", data)
    // The form submission is now handled within the JoinFormDialog component
    // This callback can be used for additional actions if needed
  }, [])

  // Scroll to advantage section handler
  const scrollToAdvantage = useCallback(() => {
    advantageSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }, [])

  // Carousel navigation handlers
  const nextReel = useCallback(() => {
    setCurrentReelIndex((prev) => (prev + 1) % 4)
  }, [])

  const prevReel = useCallback(() => {
    setCurrentReelIndex((prev) => (prev - 1 + 4) % 4)
  }, [])

  const nextReel2 = useCallback(() => {
    setCurrentReelIndex2((prev) => (prev + 1) % 8)
  }, [])

  const prevReel2 = useCallback(() => {
    setCurrentReelIndex2((prev) => (prev - 1 + 8) % 8)
  }, [])

  const nextReel2Desktop = useCallback(() => {
    setCurrentReelIndex2Desktop((prev) => {
      // reels2 is defined below, but we know it has 8 items
      const totalReels = 8
      const itemsPerPage = 4
      const maxIndex = Math.max(0, totalReels - itemsPerPage)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }, [])

  const prevReel2Desktop = useCallback(() => {
    setCurrentReelIndex2Desktop((prev) => {
      // reels2 is defined below, but we know it has 8 items
      const totalReels = 8
      const itemsPerPage = 4
      const maxIndex = Math.max(0, totalReels - itemsPerPage)
      return prev <= 0 ? maxIndex : prev - 1
    })
  }, [])

  const nextReel2Tablet = useCallback(() => {
    setCurrentReelIndex2Tablet((prev) => {
      // reels2 is defined below, but we know it has 8 items
      const totalReels = 8
      const itemsPerPage = 2
      const maxIndex = Math.max(0, totalReels - itemsPerPage)
      return prev >= maxIndex ? 0 : prev + itemsPerPage
    })
  }, [])

  const prevReel2Tablet = useCallback(() => {
    setCurrentReelIndex2Tablet((prev) => {
      // reels2 is defined below, but we know it has 8 items
      const totalReels = 8
      const itemsPerPage = 2
      const maxIndex = Math.max(0, totalReels - itemsPerPage)
      return prev <= 0 ? maxIndex : prev - itemsPerPage
    })
  }, [])

  const nextConsultant = useCallback(() => {
    setCurrentConsultantIndex((prev) => (prev + 1) % 2)
  }, [])

  const prevConsultant = useCallback(() => {
    setCurrentConsultantIndex((prev) => (prev - 1 + 2) % 2)
  }, [])

  // Optimize animation controls
  const [advantageRef, advantageInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px'
  })
  const [whyKWRef, whyKWInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px'
  })

  const advantageControls = useAnimation()
  const whyKWControls = useAnimation()

  // Fixed animation variants with proper TypeScript types
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  }

  // Optimize image loading
  const heroImages = [
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
  ]

  // Reel data
  const reels1 = [
    { src: "/video/Shorts 1 - Melvin.mp4", label: "KW Singapore Reel 1" },
    { src: "/video/Shorts 2 - Melvin.mp4", label: "KW Singapore Reel 2" },
    { src: "/video/Shorts 3 - Grayce.mp4", label: "KW Singapore Reel 3" },
    { src: "/video/Shorts 4 - Grayce.mp4", label: "KW Singapore Reel 4" }
  ]

  const reels2 = [
    { src: "https://www.youtube.com/embed/iAkGW4Y51dQ?autoplay=1&mute=1&loop=1&playlist=iAkGW4Y51dQ", label: "KW Singapore Reel 1" },
    { src: "https://www.youtube.com/embed/RAqxdrwk1HQ?autoplay=1&mute=1&loop=1&playlist=RAqxdrwk1HQ", label: "KW Singapore Reel 2" },
    { src: "https://www.youtube.com/embed/XBZWFBoJi08?autoplay=1&mute=1&loop=1&playlist=XBZWFBoJi08", label: "KW Singapore Reel 3" },
    { src: "https://www.youtube.com/embed/s3n1qH3M5cI?autoplay=1&mute=1&loop=1&playlist=s3n1qH3M5cI", label: "KW Singapore Reel 4" },
    { src: "https://www.youtube.com/embed/Oq0pQG3_0wA?autoplay=1&mute=1&loop=1&playlist=Oq0pQG3_0wA", label: "KW Singapore Reel 5" },
    { src: "https://www.youtube.com/embed/fditK842Zbw?autoplay=1&mute=1&loop=1&playlist=fditK842Zbw", label: "KW Singapore Reel 6" },
    { src: "https://www.youtube.com/embed/__zDeHtZLn4?autoplay=1&mute=1&loop=1&playlist=__zDeHtZLn4", label: "KW Singapore Reel 7" },
    { src: "https://www.youtube.com/embed/6dMnifQl5JU?autoplay=1&mute=1&loop=1&playlist=6dMnifQl5JU", label: "KW Singapore Reel 8" }
  ]

  const consultantVideos = [
    { src: "https://www.youtube.com/embed/C-SeyqyP4rU?start=4&autoplay=1&mute=1", label: "Meet the Consultants 1" },
    { src: "https://www.youtube.com/embed/6S1Qgw7SS4I?autoplay=1&mute=1", label: "Meet the Consultants 2" }
  ]

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (typeof window !== 'undefined') {
      timeoutId = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
      }, 5000)
    }
    return () => clearTimeout(timeoutId)
  }, [currentImageIndex])

  useEffect(() => {
    if (advantageInView) {
      advantageControls.start("visible")
    }
  }, [advantageInView, advantageControls])

  useEffect(() => {
    if (whyKWInView) {
      whyKWControls.start("visible")
    }
  }, [whyKWInView, whyKWControls])

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section - Updated with new design but keeping video background */}
      <section className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-center justify-center pt-20 sm:pt-20 md:pt-12">
        {/* Background elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          {/* Keep the existing video background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
              style={{ 
                willChange: 'transform',
                contentVisibility: 'auto'
              }}
            >
              <source src="/hero-section-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/20" />
          </div>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </motion.div>

        {/* Content - properly centered */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 lg:pt-32">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight font-sans text-white"
          >
            The Real Estate Model
            <span className="block text-[#B40101] italic">of the Future.</span>
            <span className="block">Built Today.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed text-white px-2"
          >
            KW Singapore is the next-generation real estate model for today's consultants. <br></br> 
            We empower ambitious professionals with media production, AI automation, and 
            training systems—so they can build brands, grow businesses, and scale sustainably.
          </motion.p>
        </div>
      </section>

      {/* Shorts / Reels Section */}
      <section className="relative py-8 sm:py-14 md:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile Carousel */}
          <div className="sm:hidden relative">
            <div className="relative w-full overflow-hidden rounded-lg border border-[#666666]/20 bg-black/40">
              <video
                key={currentReelIndex}
                className="w-full h-[600px] object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={reels1[currentReelIndex].label}
              >
                <source src={reels1[currentReelIndex].src} type="video/mp4" />
              </video>
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevReel}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Previous reel"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextReel}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Next reel"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            {/* Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {reels1.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReelIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentReelIndex ? 'bg-[#B40101]' : 'bg-white/30'
                  }`}
                  aria-label={`Go to reel ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {reels1.map((reel, index) => (
              <div key={index} className="relative w-full overflow-hidden rounded-lg border border-[#666666]/20 bg-black/40">
                <video
                  className="w-full h-[500px] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={reel.label}
                >
                  <source src={reel.src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press News Section */}
      <section className="relative py-8 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 font-sans text-white">
              Featured in
              <span className="block text-[#B40101] italic">Press</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Desktop Layout - Side by side */}
            <div className="hidden md:block group relative overflow-hidden rounded-lg border border-[#666666]/20 bg-black/40 backdrop-blur-sm hover:border-[#B40101]/40 transition-all duration-300 hover:scale-105">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-full">
                  <img
                    src="https://img.tepcdn.com/img-style/simplecrop_article/88304311.jpeg"
                    alt="Real Estate Franchise Keller Williams Expands in Singapore"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block bg-[#B40101] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      EdgeProp
                    </span>
                    <span className="text-white/60 text-sm ml-3">July 7, 2025</span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-[#B40101] transition-colors duration-300">
                    Real Estate Franchise Keller Williams Expands in Singapore
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed mb-6 text-sm sm:text-base">
                    Keller Williams, one of the world's largest real estate franchises, continues its expansion in Singapore with innovative technology and training programs for local property consultants.
                  </p>
                  
                  <div className="mt-auto">
                    <Button
                      className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-6 py-3 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 group"
                      onClick={() => window.location.href = '/press/real-estate-franchise-keller-williams-expands-in-singapore'}
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout - Card style like press page */}
            <div className="md:hidden group relative overflow-hidden rounded-lg border border-[#666666]/20 transition-all duration-300 hover:scale-105 hover:border-[#B40101]/40 cursor-pointer"
                 onClick={() => window.location.href = '/press/real-estate-franchise-keller-williams-expands-in-singapore'}>
              <img
                src="https://img.tepcdn.com/img-style/simplecrop_article/88304311.jpeg"
                alt="Real Estate Franchise Keller Williams Expands in Singapore"
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-[#B40101] text-white text-xs px-2 py-1 rounded-full">
                    July 7, 2025
                  </div>
                  <div className="bg-white/70 text-black text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    EdgeProp
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-white line-clamp-2">
                  Real Estate Franchise Keller Williams Expands in Singapore
                </h3>
                <div className="text-white/80 text-xs mt-2">
                  Click to read full article
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* From Realtors */}
      <section ref={advantageSectionRef} className="relative py-8 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Column - Title and Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-bold mb-6 sm:mb-8 leading-tight text-2xl sm:text-3xl md:text-4xl text-white">
                From Realtors to
                <span className="block text-[#B40101] italic">Real Estate Entrepreneurs</span>
              </h2>
            </motion.div>

            {/* Right Column - Advantage Points */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              {[
                {
                  title: "Up to 94% Commission Share",
                  description:
                    "All KW Singapore realtors have the opportunity to enjoy up to 94% in commission share.",
                  icon: Rocket,
                  gradient: "from-blue-500/20 to-purple-500/20",
                },
                {
                  title: "Build True Passive Income",
                  description:
                    "KW Singapore empowers realtors to build lifetime passive income through our Growth Share Programme.",
                  icon: BarChart3,
                  gradient: "from-green-500/20 to-teal-500/20",
                },
              ].map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative border-b border-[#666666]/20 pb-4 sm:pb-6 border-slate-400">
                    <div
                      className="flex items-center justify-between mb-3 sm:mb-4 cursor-pointer"
                      onClick={() => setExpandedAdvantage(expandedAdvantage === index ? -1 : index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-[#B40101] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                          <advantage.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-[#B40101] transition-colors duration-300">
                          {advantage.title}
                        </h3>
                      </div>
                      <motion.div 
                        className="text-[#B40101] text-xl sm:text-2xl font-light"
                        animate={{ rotate: expandedAdvantage === index ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {expandedAdvantage === index ? "−" : "+"}
                      </motion.div>
                    </div>
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: expandedAdvantage === index ? "auto" : 0,
                        opacity: expandedAdvantage === index ? 1 : 0
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm sm:text-base text-white/70 leading-relaxed pt-2">
                        {advantage.description}
                      </p>
                      
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* KW Singapore Advantage */}
      <section className="relative py-8 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/homepage/why-kw-section.webp"
            alt="Technology Background"
            fill
            sizes="100vw"
            loading="lazy"
            className="object-cover object-center brightness-[0.5]"
            quality={75}
            style={{ willChange: 'transform' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05),transparent_20%)]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 md:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 font-sans text-white">
              The KW Singapore
              <span className="block text-[#B40101] italic">Advantage</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed text-slate-100 px-2">
            All KW Realtors are supported by integrated services including in-house media production, 
            AI-led client prospecting, and a modular training curriculum under KW Training Academy.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-16"
          >
            {/* First Row - 4 items */}
            {[
              {
                title: "Built by the World. Powered for You.",
                description:
                  "55+ regions. 189,000+ consultants. KW Singapore unlocks global referrals and instant credibility with developers.",
              },
              {
                title: "Your All-In-One Control Panel.",
                description:
                  "Run your leads, campaigns, and closings from a single AI-powered dashboard—desktop or app.",
              },
              {
                title: "Tech That Closes.",
                description:
                  "Asset tools, PSF trackers, dashboards & more—designed to help you win high-value clients.",
              },
              {
                title: "Insights That Convert.",
                description: "Plug into smart charts, disparity maps & launch decks. Know what to say—every month.",
              },
            ].map((point, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/10 to-transparent rounded-lg transform group-hover:scale-105 transition-all duration-300" />
                <div className="relative p-4 sm:p-6 h-full border border-[#666666]/20 rounded-lg bg-black/40 backdrop-blur-sm group-hover:border-[#B40101]/40 transition-all duration-300">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-white group-hover:text-[#B40101] transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
            {/* Second Row - 3 items */}
            {[
              {
                title: "Build Your Brand.",
                description:
                  "Leverage our in-house Media-as-a-Service arm, equipped with media studios for production."
              },
              {
                title: "Learn Fast. Earn Fast.",
                description: "You get weekly coaching, expert-led playbooks, and a launch plan that works.",
              },
              {
                title: "Earn Beyond Closings.",
                description: "2% from every deal in your 7-tier tree. Passive. Global.",
              },
            ].map((point, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/10 to-transparent rounded-lg transform group-hover:scale-105 transition-all duration-300" />
                <div className="relative p-4 sm:p-6 h-full border border-[#666666]/20 rounded-lg bg-black/40 backdrop-blur-sm group-hover:border-[#B40101]/40 transition-all duration-300">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-white group-hover:text-[#B40101] transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{point.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg md:text-xl font-semibold transition-all duration-300 hover:scale-105 group rounded-md"
              onClick={() => window.open("https://explore.kwsingapore.com/booking-page", "_blank")}
            >
              Revolutionise Your Business
              <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Leadership Quote Section */}
      <section className="relative py-8 sm:py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#B40101]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#B40101]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
        </div>
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Quote */}
            <div>
              <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-white mb-8 italic">
                "The real estate model in Singapore is due for innovation and forward-looking change. We provide the
                tools, frameworks, platform and education for consultants to scale their business, while building true
                passive income through the Growth Share Programme."
              </blockquote>
              <div className="border-l-4 border-[#B40101] pl-6">
                <p className="text-xl font-semibold text-white mb-2">Melvin Lim</p>
                <p className="text-white/80">Operating Principal of KW Singapore</p>
              </div>
            </div>

            {/* Right Column - Photo */}
            <div className="relative md:mb-0 -mb-8">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/images/homepage/melvin-section.webp"
                  alt="Melvin Lim - Operating Principal of KW Singapore"
                  className="w-full h-[600px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Academy Section */}
      <section className="relative py-8 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 font-sans text-white">
              KW Training<span className="block text-[#B40101] italic">Academy</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {[
              {
                title: "MREA Masterclass: The Blueprint for Exponential Real Estate Growth",
                image: "/images/event/melvin-explore.webp",
                cta: "Secure Your Spot",
                date: undefined,
                description: undefined,
              },
              {
                title: "MEGA Realtors Summit: Scale Your Real Estate Business with Industry Leaders",
                image: "/images/homepage/mrea-summit-stage-event.webp",
                cta: "View More",
                date: undefined,
                description: undefined,
              },
            ].map((event, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white">{event.title}</h3>
                  {event.date && <p className="text-[#B40101] font-medium mb-2 sm:mb-3 text-sm">{event.date}</p>}
                  {event.description && <p className="text-white/90 mb-3 sm:mb-4 leading-relaxed text-sm">{event.description}</p>}
                  <div className="text-center sm:text-left">
                    <Button 
                      className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105"
                      onClick={() => {
                        if (index === 0) {
                          window.open('https://explore.kwsingapore.com/mrea-masterclass-registration-1', '_blank')
                        } else if (index === 1) {
                          window.location.href = '/events#mega-summit'
                        }
                      }}
                    >
                      {event.cta}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-[#B40101] text-[#B40101] hover:bg-[#B40101] hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold transition-all duration-300 hover:scale-105 group bg-transparent"
              onClick={() => (window.location.href = "/events")}
            >
              View All Events
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Meet the Consultants Section */}
      <section className="relative py-8 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 font-sans text-white">
              Meet the<span className="block text-[#B40101] italic">Consultants</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#666666]/20 bg-black/40">
                <iframe
                  key={currentConsultantIndex}
                  className="absolute inset-0 w-full h-full"
                  src={consultantVideos[currentConsultantIndex].src}
                  title={consultantVideos[currentConsultantIndex].label}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              
              {/* Navigation buttons */}
              {consultantVideos.length > 1 && (
                <>
                  <button
                    onClick={prevConsultant}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                    aria-label="Previous video"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextConsultant}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                    aria-label="Next video"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              
              {/* Indicators */}
              {consultantVideos.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {consultantVideos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentConsultantIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentConsultantIndex ? 'bg-[#B40101]' : 'bg-white/30'
                      }`}
                      aria-label={`Go to video ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Second Shorts / Reels Section */}
      <section className="relative py-8 sm:py-14 md:py-16 lg:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Building Success Together
            </h2>
          </div>

          {/* Mobile Carousel */}
          <div className="sm:hidden relative">
            <div className="relative w-full overflow-hidden rounded-lg border border-[#666666]/20 bg-black/40">
              <iframe
                key={currentReelIndex2}
                className="w-full h-[600px]"
                src={reels2[currentReelIndex2].src}
                title={reels2[currentReelIndex2].label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevReel2}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Previous reel"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextReel2}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              aria-label="Next reel"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            {/* Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {reels2.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReelIndex2(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentReelIndex2 ? 'bg-[#B40101]' : 'bg-white/30'
                  }`}
                  aria-label={`Go to reel ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Tablet Grid Carousel */}
          <div className="hidden sm:block lg:hidden relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {reels2.slice(currentReelIndex2Tablet, currentReelIndex2Tablet + 2).map((reel, index) => (
                <div key={currentReelIndex2Tablet + index} className="relative w-full overflow-hidden rounded-lg border border-[#666666]/20 bg-black/40">
                  <iframe
                    className="w-full h-[500px]"
                    src={reel.src}
                    title={reel.label}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
            
            {/* Navigation buttons */}
            {reels2.length > 2 && (
              <>
                <button
                  onClick={prevReel2Tablet}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                  aria-label="Previous reel"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextReel2Tablet}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                  aria-label="Next reel"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            
            {/* Indicators */}
            {reels2.length > 2 && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: Math.ceil(reels2.length / 2) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReelIndex2Tablet(index * 2)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      Math.floor(currentReelIndex2Tablet / 2) === index ? 'bg-[#B40101]' : 'bg-white/30'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Desktop Grid Carousel */}
          <div className="hidden lg:block relative">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {reels2.slice(currentReelIndex2Desktop, currentReelIndex2Desktop + 4).map((reel, index) => (
                <div key={currentReelIndex2Desktop + index} className="relative w-full overflow-hidden rounded-lg border border-[#666666]/20 bg-black/40">
                  <iframe
                    className="w-full h-[500px]"
                    src={reel.src}
                    title={reel.label}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
            
            {/* Navigation buttons */}
            {reels2.length > 4 && (
              <>
                <button
                  onClick={prevReel2Desktop}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                  aria-label="Previous reel"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextReel2Desktop}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
                  aria-label="Next reel"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            
            {/* Indicators */}
            {reels2.length > 4 && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: Math.ceil(reels2.length / 4) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReelIndex2Desktop(index * 4)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      Math.floor(currentReelIndex2Desktop / 4) === index ? 'bg-[#B40101]' : 'bg-white/30'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Future CTA with Countdown - Keep existing countdown component */}
      <section className="relative py-8 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/20 via-black/80 to-black" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 font-sans text-white">
            The Future of Real Estate
            <span className="block text-[#B40101] italic">in Singapore is Here.</span>
            <span className="block">Are You Ready?</span>
          </h2>

          <Button
            size="lg"
            className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg md:text-xl font-semibold transition-all duration-300 hover:scale-105 group"
            onClick={() => window.open('https://explore.kwsingapore.com/', '_blank')}
          >
            Start Your Future Now
            <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Join Form Dialog */}
      <JoinFormDialog
        isOpen={isJoinFormOpen}
        onClose={() => setIsJoinFormOpen(false)}
        onSubmit={handleJoinSubmit}
      />

      {/* Webinar Dialog */}
      <WebinarDialog
        isOpen={isWebinarDialogOpen}
        onClose={() => setIsWebinarDialogOpen(false)}
        onSubmit={handleWebinarSubmit}
      />
    </main>
  )
}
