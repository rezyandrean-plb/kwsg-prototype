"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight, Calendar } from "lucide-react"
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

  // Simplified animation variants
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
        ease: "easeOut",
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

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section - Updated with video */}
      <section className="relative w-full min-h-[100vh] overflow-hidden">
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
        <div className="relative z-10 flex flex-col items-center justify-center text-white p-4 sm:p-6 md:p-8 py-16 md:py-24 min-h-[100vh]">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-tight text-white leading-[1.1]">
              The Real Estate Model of the Future. Built Today.
            </h1>
            <p className="text-[clamp(1rem,2.5vw,1.5rem)] text-gray-100 max-w-6xl mx-auto leading-relaxed">
              KW Singapore is the next-generation real estate model for tomorrow's consultants. We empower ambitious professionals with world-class media production, AI automation, and training systems—so they can build brands, grow businesses, and scale sustainably.
            </p>
            <div className="inline-flex justify-center pt-4">
              <Button 
                onClick={() => {
                  document.getElementById('kw-advantage')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,1.5vw,1.25rem)] text-[clamp(0.875rem,1.25vw,1.125rem)] bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                aria-label="Learn more about KW Singapore"
              >
                Learn More
                <ArrowRight className="ml-2 h-[clamp(1rem,1.25vw,1.25rem)] w-[clamp(1rem,1.25vw,1.25rem)] transform transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The KW Advantage Section */}
      <section id="kw-advantage" className="relative py-16 md:py-20 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05),transparent_70%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div 
            ref={advantageRef}
            initial="hidden"
            animate={advantageControls}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                The KW Advantage
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Empowering real estate professionals with cutting-edge tools and strategies
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Card 1: Dominate New Launches */}
              <motion.div variants={itemVariants} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src="/images/homepage/dominate-new-launches.webp"
                        alt="New Launch Property"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        quality={85}
                        loading="lazy"
                        style={{ willChange: 'transform' }}
                      />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-white text-center">Dominate New Launches</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Scale with Media */}
              <motion.div variants={itemVariants} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src="/images/homepage/scale-with-media.webp"
                        alt="Media Production"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        quality={85}
                        loading="lazy"
                        style={{ willChange: 'transform' }}
                      />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-white text-center">Scale with Media</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Win with AI */}
              <motion.div variants={itemVariants} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src="/images/homepage/win-with-ai.webp"
                        alt="AI Technology"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        quality={85}
                        loading="lazy"
                        style={{ willChange: 'transform' }}
                      />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-white text-center">Win with AI</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Buttons
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button 
                onClick={() => setIsJoinFormOpen(true)}
                className="w-full sm:w-auto group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
              >
                Speak to our Team
                <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Why KW Singapore Section */}
      <section className="relative py-16 md:py-20 bg-black text-white overflow-hidden">
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

        <div className="relative z-10 container mx-auto px-4">
          <motion.div 
            ref={whyKWRef}
            initial="hidden"
            animate={whyKWControls}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
                Why KW Singapore?
              </h2>
              <div className="flex flex-col items-center gap-6">
                <motion.p 
                  variants={itemVariants}
                  className="text-xl text-white max-w-3xl mx-auto"
                >
                  Built for Consultants. Backed by Systems.
                </motion.p>
                
                <div className="relative w-full max-w-3xl h-[2px] overflow-hidden">
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-primary-red to-transparent"
                  />
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-primary-red"
                  />
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -top-1 -right-6 w-2 h-2 rounded-full bg-primary-red/70"
                  />
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -top-1 -right-10 w-2 h-2 rounded-full bg-primary-red/40"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* First Row - 4 Cards */}
              {/* Global Brand & Trust */}
              <motion.div variants={itemVariants}>
                <Link href="/why-kw/global-brand" className="group">
                  <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 hover:border-primary-red hover:-translate-y-1">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Built by the World. Powered for You.</h3>
                    <p className="text-gray-300 text-sm mb-4">60+ countries. 200,000 consultants. KW Singapore unlocks global referrals and instant credibility with developers.</p>
                  </div>
                </Link>
              </motion.div>

              {/* Custom CRM - Command */}
              <motion.div variants={itemVariants}>
                <Link href="/why-kw/command" className="group">
                  <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 hover:border-primary-red hover:-translate-y-1">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Your All-In-One Control Panel.</h3>
                    <p className="text-gray-300 text-sm mb-4">Run your leads, campaigns, and closings from a single AI-powered dashboard—desktop or app.</p>
                  </div>
                </Link>
              </motion.div>

              {/* PropTech Stack */}
              <motion.div variants={itemVariants}>
                <Link href="/why-kw/proptech" className="group">
                  <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 hover:border-primary-red hover:-translate-y-1">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Tech That Closes.</h3>
                    <p className="text-gray-300 text-sm mb-4">Asset tools, PSF trackers, dashboards & more—designed to help you win high-value clients.</p>
                  </div>
                </Link>
              </motion.div>

              {/* Research Hub */}
              <motion.div variants={itemVariants}>
                <Link href="/why-kw/research" className="group">
                  <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 hover:border-primary-red hover:-translate-y-1">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Insights That Convert.</h3>
                    <p className="text-gray-300 text-sm mb-4">Plug into smart charts, disparity maps & launch decks. Know what to say—every month.</p>
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Second Row - 3 Centered Cards */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              {/* Media Support */}
              <motion.div variants={itemVariants}>
                <Link href="/why-kw/media" className="group">
                  <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 hover:border-primary-red hover:-translate-y-1">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Look Pro. Sell More.</h3>
                    <p className="text-gray-300 text-sm mb-4">KW-exclusive video shoots, reels, and scripts to grow your brand—at startup-friendly prices.</p>
                  </div>
                </Link>
              </motion.div>

              {/* Training System */}
              <motion.div variants={itemVariants}>
                <Link href="/why-kw/training" className="group">
                  <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 hover:border-primary-red hover:-translate-y-1">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Learn Fast. Earn Fast.</h3>
                    <p className="text-gray-300 text-sm mb-4">You get weekly coaching, expert-led playbooks, and a launch plan that works.</p>
                  </div>
                </Link>
              </motion.div>

              {/* Growth Share Model */}
              <motion.div variants={itemVariants}>
                <Link href="/why-kw/growth-share" className="group">
                  <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 hover:border-primary-red hover:-translate-y-1">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Earn Beyond Closings.</h3>
                    <p className="text-gray-300 text-sm mb-4">2% from every deal in your 7-tier tree. Passive. Global.</p>
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Button 
                onClick={() => setIsJoinFormOpen(true)}
                className="w-full sm:w-auto group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                aria-label="Revolutionise your business with KW Singapore"
              >
                Revolutionise Your Business
                <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Launch Condo Section - Hidden
      <section className="relative py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">New Launch Condo</h2>
            <p className="text-xl text-gray-300 leading-relaxed">Discover the latest property launches in Singapore</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  {...project}
                  className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                ctaText="Find out more"
                />
              ))}
          </div>

          <div className="text-center">
            <Link href="/projects">
              <Button className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                Explore New Launch Condo
                <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      */}

      {/* New Section - Launch Countdown */}
      <section className="relative py-10 sm:py-14 md:py-20 bg-black text-white overflow-hidden">
        {/* Background Image with Parallax-like Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/homepage/launch-countdown.webp"
            alt="Luxury Singapore Property"
            fill
            className="object-cover object-center scale-105 brightness-[0.15]"
            quality={75}
            loading="lazy"
            style={{ willChange: 'transform' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05),transparent_20%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Main Content */}
            <div className="space-y-6">
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="space-y-3 text-center"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  The Future of Real Estate in Singapore is Here. Are You Ready?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                  Join us for the most anticipated real estate launch of 2025!
                </p>
              </motion.div>

              {/* Countdown Timer */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.div 
                    initial={{ rotate: -180, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="p-2 rounded-full bg-primary-red/10"
                  >
                    <Calendar className="h-6 w-6 text-primary-red" />
                  </motion.div>
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                    className="text-xl sm:text-2xl font-bold tracking-tight text-white"
                  >
                    Launch Countdown
                  </motion.h3>
                </div>
                {/* Enhanced Countdown Timer */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                  className="w-full flex justify-center"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div className="transform scale-100 sm:scale-105 w-full max-w-xs">
                    <CountdownTimer targetDate="2025-07-01T00:00:00" />
                  </div>
                </motion.div>
              </motion.div>

              {/* CTA Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                className="flex justify-center"
              >
                <Button 
                  onClick={() => setIsWebinarDialogOpen(true)}
                  className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                  aria-label="Join the KW Singapore webinar"
                >
                  Join the Webinar
                  <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
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
