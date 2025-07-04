"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight, Calendar, ChevronRight, Rocket, Video, Bot } from "lucide-react"
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
    setIsJoinFormOpen(false)
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
      <section className="relative min-h-screen flex items-center justify-center">
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
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
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
            KW Singapore is the next-generation real estate model for tomorrow's consultants. We empower ambitious
            professionals with world-class media production, AI automation, and training systems—so they can build
            brands, grow businesses, and scale sustainably.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <ChevronRight className="h-6 w-6 text-[#B40101] rotate-90" />
        </div>
      </section>

      {/* The KW Advantage */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left Column - Title and Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 sm:mb-6">
                <span className="text-[#B40101] text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  KW SINGAPORE ADVANTAGE
                </span>
              </div>
              <h2 className="font-bold mb-6 sm:mb-8 leading-tight text-2xl sm:text-3xl md:text-4xl text-white">
                We empower consultants to
                <span className="block text-[#B40101] italic">dominate Singapore's</span>
                real estate market.
              </h2>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-100">
                Our comprehensive platform combines cutting-edge technology, professional media services, and AI-powered
                tools to give you the competitive edge needed to succeed in today's dynamic real estate landscape.
              </p>
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
                  title: "Dominate New Launches",
                  description:
                    "Access exclusive pre-launch opportunities and cutting-edge market intelligence to stay ahead of the competition.",
                  icon: Rocket,
                  gradient: "from-blue-500/20 to-purple-500/20",
                },
                {
                  title: "Scale with Media",
                  description:
                    "Professional video production, photography, and content creation services to elevate your brand and listings.",
                  icon: Video,
                  gradient: "from-green-500/20 to-teal-500/20",
                },
                {
                  title: "Win With AI",
                  description:
                    "Leverage artificial intelligence for lead generation, market analysis, and automated client communication systems.",
                  icon: Bot,
                  gradient: "from-orange-500/20 to-red-500/20",
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
                      <div className="mt-4 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#B40101] rounded-full animate-pulse" />
                        <span className="text-xs text-[#B40101]/80 font-medium">Learn More</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why KW Singapore */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
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
              Why KW
              <span className="block text-[#B40101] italic">Singapore?</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed text-slate-100 px-2">
              KW Singapore combines global expertise with cutting-edge technology and proven systems to empower
              consultants in Singapore's competitive real estate market.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16"
          >
            {/* First Row - 4 items */}
            {[
              {
                title: "Built by the World. Powered for You.",
                description:
                  "60+ countries. 200,000 consultants. KW Singapore unlocks global referrals and instant credibility with developers.",
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
                <div className="relative p-6 h-full border border-[#666666]/20 rounded-lg bg-black/40 backdrop-blur-sm group-hover:border-[#B40101]/40 transition-all duration-300">
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[#B40101] transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm">{point.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
            {/* Second Row - 3 items */}
            {[
              {
                title: "Look Pro. Sell More.",
                description:
                  "KW-exclusive video shoots, reels, and scripts to grow your brand—at startup-friendly prices.",
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
              onClick={() => setIsJoinFormOpen(true)}
            >
              Revolutionise Your Business
              <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Media Service */}
      {/* <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/homepage/media-service-banner.webp')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 font-sans text-white">
              Professional Media
              <span className="block text-[#B40101] italic">Support</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed text-white px-2">
              Elevate your brand with our in-house media production services, designed to create stunning visuals and
              compelling narratives for your listings and personal branding.
            </p>
          </motion.div>

          <div className="relative">
            <img
              src="/images/homepage/media-service-banner.webp"
              alt="Media Service Banner"
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
              <Button
                size="lg"
                className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold transition-all duration-300 hover:scale-105 group rounded-md"
              >
                Explore Media Services
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Events Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 font-sans text-white">
              Events &<span className="block text-[#B40101] italic">Workshops</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {[
              {
                title: "MREA Masterclass: The Blueprint for Exponential Real Estate Growth",
                image: "/images/homepage/mrea-masterclass-event.webp",
                cta: "Secure Your Spot",
                date: undefined,
                description: undefined,
              },
              {
                title: "MREA Summit: Scale Your Real Estate Business with Industry Leaders",
                image: "/images/homepage/mrea-summit-stage-event.webp",
                cta: "Save My Spot",
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
                  <Button className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105">
                    {event.cta}
                  </Button>
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

      {/* Future CTA with Countdown - Keep existing countdown component */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/20 via-black/80 to-black" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 font-sans text-white">
            The Future of Real Estate
            <span className="block text-[#B40101] italic">in Singapore is Here.</span>
            <span className="block">Are You Ready?</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed text-white px-2">
            Join the pioneering real estate professionals who are embracing innovation and redefining success in
            Singapore's dynamic property market.
          </p>

          {/* Keep existing CountdownTimer component */}
          <div className="mb-8 sm:mb-12">
            <div className="flex justify-center items-center space-x-4 sm:space-x-8 mb-4">
              <CountdownTimer targetDate="2025-07-05T00:00:00" />
            </div>
            <p className="text-white/60 text-xs sm:text-sm">Until Next Bootcamp Intake</p>
          </div>

          <Button
            size="lg"
            className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg md:text-xl font-semibold transition-all duration-300 hover:scale-105 group"
            onClick={() => setIsWebinarDialogOpen(true)}
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
