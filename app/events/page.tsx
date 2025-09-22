
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  Calendar,
  Clock,
  Users,
  ArrowRight,
  BookOpen,
  Video,
  Play,
} from "lucide-react"
import { motion } from "framer-motion"
import { BootcampCarouselDialog } from "@/components/bootcamp-carousel-dialog"
import { SummitRegistrationDialog } from "@/components/summit-registration-dialog"
import { Toaster } from "@/components/ui/toaster"
import dynamic from "next/dynamic"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

// Dynamically import the JoinFormDialog component
const JoinFormDialog = dynamic(() => import("@/components/join-form-dialog").then(mod => mod.JoinFormDialog), {
  loading: () => <div className="h-0" />,
  ssr: false
})

export default function EventsPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isBootcampCarouselDialogOpen, setIsBootcampCarouselDialogOpen] = useState(false)
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
  const [isSummitDialogOpen, setIsSummitDialogOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3
  const [activePastTab, setActivePastTab] = useState(0)
  const [pastCarouselIndex, setPastCarouselIndex] = useState(0)

  const pastEvents = [
    {
      title: "Realtor Branding Workshop",
      date: "August 2025",
      description:
        "A 2-day intensive masterclass diving into the millionaire models, strategies, and systems for exponential growth.",
      images: [
        "/images/event/mrea-summit-stage.webp",
        "/images/event/mrea-pricing-new.webp",
        "/images/event/mega-summit.webp",
        "/images/event/melvin-explore.webp",
      ],
    },
    {
      title: "Past Founders Insights",
      date: "July 2025",
      description:
        "An interactive online session for agents to discover multiple income streams and scalable models.",
      images: [
        "/images/event/melvin-explore.webp",
        "/images/event/mega-summit.webp",
        "/images/event/mrea-pricing-new.webp",
      ],
    },
    {
      title: "Past Welcome Dinner",
      date: "June 2025",
      description:
        "Hands-on bootcamp to craft compelling listing presentations and win mandates consistently.",
      images: [
        "/images/event/mrea-pricing-new.webp",
        "/images/event/mrea-summit-stage.webp",
        "/images/event/mega-summit.webp",
      ],
    },
    {
      title: "Past Business Network",
      date: "May 2025",
      description:
        "Frameworks and flows to convert leads into loyal clients across six distinct buyer profiles.",
      images: [
        "/images/event/mega-summit.webp",
        "/images/event/mrea-summit-stage.webp",
        "/images/event/melvin-explore.webp",
      ],
    },
  ]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-scroll to section based on URL hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            })
          }, 100) // Small delay to ensure page is fully loaded
        }
      }
    }
  }, [])

  // Touch/swipe functionality for carousel
  useEffect(() => {
    const carousel = document.getElementById("bootcamp-carousel")
    if (!carousel) return

    let startX = 0
    let currentX = 0
    let isDragging = false

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      isDragging = true
      carousel.style.transition = "none"
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      e.preventDefault()
      currentX = e.touches[0].clientX
      const diff = currentX - startX
      const currentTransform = carousel.style.transform || "translateX(0%)"
      const match = currentTransform.match(/-?\d+/)
      const currentTranslate = parseInt(match && match[0] ? match[0] : "0")
      carousel.style.transform = `translateX(${currentTranslate + diff}px)`
    }

    const handleTouchEnd = () => {
      if (!isDragging) return
      isDragging = false
      carousel.style.transition = "transform 0.3s ease-out"
      
      const diff = currentX - startX
      const threshold = 50
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Swipe right - go to previous
          prevSlide()
        } else {
          // Swipe left - go to next
          nextSlide()
        }
      } else {
        // Return to current position (mobile vs desktop)
        const isMobile = window.innerWidth < 1024
        const translateX = -(currentSlide * (isMobile ? 100 : 50))
        carousel.style.transform = `translateX(${translateX}%)`
      }
    }

    carousel.addEventListener("touchstart", handleTouchStart, { passive: false })
    carousel.addEventListener("touchmove", handleTouchMove, { passive: false })
    carousel.addEventListener("touchend", handleTouchEnd)

    return () => {
      carousel.removeEventListener("touchstart", handleTouchStart)
      carousel.removeEventListener("touchmove", handleTouchMove)
      carousel.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentSlide])

  const handleJoinSubmit = (data: any) => {
    console.log("Join form submitted:", data)
    // The form submission is handled within the JoinFormDialog component
  }

  const handleSummitSubmit = (data: { email: string }) => {
    console.log("Summit registration submitted:", data)
    // Handle summit registration submission
    setIsSummitDialogOpen(false)
  }

  const goToSlide = (slideIndex: number) => {
    const carousel = document.getElementById("bootcamp-carousel")
    if (!carousel) return
    
    setCurrentSlide(slideIndex)
    
    // Check if we're on mobile (screen width < 1024px) or desktop
    const isMobile = window.innerWidth < 1024
    const translateX = isMobile ? -(slideIndex * 100) : -(slideIndex * 50) // Mobile: 100% per slide, Desktop: 50% per slide
    carousel.style.transform = `translateX(${translateX}%)`
    
    // Update dot indicators
    document.querySelectorAll('[id^="dot-"]').forEach((dot, i) => {
      dot.className =
        i === slideIndex
          ? "w-3 h-3 rounded-full bg-[#B40101] transition-all duration-300"
          : "w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 transition-all duration-300"
    })
  }

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % totalSlides
    goToSlide(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides
    goToSlide(prevIndex)
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-center justify-center pt-20 sm:pt-20 md:pt-12">
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-[url('/images/event/kw-events-hero-new.webp')] bg-cover bg-center brightness-110" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-8 sm:pt-12 md:pt-16 lg:pt-32">
          <motion.h1 
            className="font-bold mb-8 leading-tight font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Exclusive KW Singapore
            <span className="block text-[#B40101] italic">Events</span>
          </motion.h1>

          <motion.p 
            className="text-base md:text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Stay ahead, get inspired, and grow with our upcoming masterclasses, summits, and workshops designed for
            ambitious real estate professionals.
          </motion.p>
        </div>

      </section>

      {/* MREA Training */}
      <section className="relative py-12 sm:py-32 overflow-hidden" data-section="mrea-training">
        <div className="absolute inset-0 bg-[url('/images/event/mega-summit.webp')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2 
                className="font-bold mb-6 font-sans text-2xl sm:text-3xl md:text-4xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <span className="text-white">MREA Masterclass:</span>
                <span className="block text-[#B40101] italic">The Blueprint for Exponential Real Estate Growth</span>
              </motion.h2>

              <motion.p 
                className="mb-8 leading-relaxed text-base md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                UNLOCK THE MILLIONAIRE MINDSET:<br />
                2-Day Intensive MREA Masterclass for Exponential Business Growth.<br />
                2-Day Intensive Masterclass<br />
                Learn the proven models, strategies, and systems to transform your real estate practice into a sustainable, wealth-building enterprise.
              </motion.p>

              <motion.div 
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-[#B40101]" />
                  <span className="text-slate-100">Interactive Sessions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-[#B40101]" />
                  <span className="text-slate-100">2-Day Intensive</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-[#B40101]" />
                  <span className="text-slate-100">Limited Seats</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex justify-center sm:justify-start"
              >
                <Button
                  size="lg"
                  className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 group rounded-md"
                  onClick={() => window.open("https://explore.kwsingapore.com/mrea-masterclass-registration-1", "_blank")}
                >
                  Secure your spot now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="relative rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <img
                  src="/images/event/mrea-pricing-new.webp"
                  alt="MREA Pricing Information"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mega Realtor Summit */}
      {/* <section id="mega-summit" className="relative py-12 sm:py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('/images/event/mega-summit.webp')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative">
                <img
                  src="/images/event/mrea-summit-stage.webp"
                  alt="MREA Summit 2025 - Industry Leaders Event"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
              </div>
            </motion.div>

            <motion.div 
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2 
                className="font-bold mb-6 font-sans text-2xl sm:text-3xl md:text-4xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <span className="text-white">MEGA Realtor Summit:</span>
                <span className="block text-[#B40101] italic">
                  Scale Your Real Estate Business with Industry Leaders
                </span>
              </motion.h2>

              <motion.p 
                className="text-base md:text-lg mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Designed for growth-minded real estate consultants, the MREA Summit is your gateway to market dominance.
                Learn cutting-edge strategies in lead generation, content, social media, team scaling, and new launches
                directly from KW titans J.P. Lewis, Melvin Lim, Grayce Tan, and Rayne Chua. Gain essential MREA insights
                to unlock millionaire-level success and accelerate your career.
              </motion.p>

              <motion.div 
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-[#B40101]" />
                  <span className="text-slate-100">27 August 2025</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-[#B40101]" />
                  <span className="text-white/80">Full-Day Event</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-[#B40101]" />
                  <span className="text-slate-100">Only 300 Seats Available</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex justify-center sm:justify-start"
              >
                <Button
                  size="lg"
                  className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 group rounded-md"
                  onClick={() => window.open("https://explore.kwsingapore.com/mega-realtor-summit-singapore-2025", "_blank")}
                >
                  Save My Spot
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Explore Night */}
      <section className="relative py-12 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/event/melvin-explore.webp')] bg-cover bg-center sm:bg-contain sm:bg-center sm:mx-8 sm:my-0" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

        <motion.div 
          className="relative z-10 max-w-6xl mx-auto px-6 text-center border-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="font-bold mb-8 font-sans text-3xl sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Your Real Estate Income
            <span className="block text-[#B40101] italic">Shouldn't Stop When You Do.</span>
          </motion.h2>

          <motion.p 
            className="text-base md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Discover how top-producing agents are building 3 income streams <br />
            — without burning out or managing large teams.
          </motion.p>

          <motion.div 
            className="flex flex-col items-center space-y-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex items-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-[#B40101]" />
                <span className="text-slate-100">1 Hour Interactive</span>
              </div>
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-[#B40101]" />
                <span className="text-slate-100">Online Format</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-6 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button
              size="lg"
              className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-12 py-4 text-xl font-semibold transition-all duration-300 hover:scale-105 group rounded-md"
              onClick={() => window.open("https://explore.kwsingapore.com/kw-explore-night-webinar-1", "_blank")}
            >
              Watch Now!
              <Play className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform" />
            </Button>

            <motion.p 
              className="text-sm md:text-lg text-white/80 max-w-2xl mx-auto leading-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Watch our exclusive webinar and discover why top agents choose KW Singapore.
              <span className="block mt-2 text-[#B40101] font-medium">
                Sign up for Explore Night after watching to take your next step.
              </span>
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Bootcamp Series - Redesigned */}
      <section className="relative py-12 sm:py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 font-sans"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              KW Bootcamp
              <span className="block text-[#B40101] italic">Series</span>
            </motion.h2>
            <motion.p 
              className="max-w-4xl mx-auto leading-relaxed leading-7 text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Master specialized skills with our intensive, hands-on training bootcamps. Each session is designed to
              deliver immediate, actionable results that transform your real estate practice and accelerate your
              success.
            </motion.p>
          </motion.div>

          {/* Bootcamp Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                id="bootcamp-carousel"
                style={{ transform: "translateX(0%)" }}
              >
                {/* Card 1: Seller Presentation Mastery */}
                <div className="w-full lg:w-1/2 flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-4 sm:p-8 rounded-lg border border-[#666666]/30 h-full group hover:shadow-2xl hover:shadow-[#B40101]/20 hover:border-[#B40101] transition-all duration-300 flex flex-col">
                    <h3 className="text-2xl font-bold mb-4">
                      Training Bootcamp:
                      <span className="block text-[#B40101]">Seller Presentation Mastery</span>
                    </h3>

                    <div className="flex-grow">
                      <p className="mb-6 leading-relaxed sm:h-32">
                        Command every listing pitch and consistently win mandates. Discover how to craft an undeniable
                        Unique Selling Proposition (USP) as expert listers, perfect a seamless seller presentation flow,
                        and deploy tailored strategies for six distinct seller profiles.
                      </p>

                      <div className="space-y-3 mb-8 text-slate-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#B40101] rounded-full" />
                          <span className="text-sm text-slate-100">Single Session Event</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#B40101] rounded-full" />
                          <span className="text-sm text-slate-100">In-Depth Training Session</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#B40101] rounded-full" />
                          <span className="text-sm text-slate-100">Limited Seats</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center sm:justify-start mt-auto">
                      <Button 
                        className="w-full sm:w-auto bg-[#B40101] hover:bg-[#B40101]/90 text-white font-semibold transition-all duration-300 hover:scale-105 rounded-md"
                        onClick={() => window.open("https://explore.kwsingapore.com/seller-presentation-formula", "_blank")}
                      >
                        Tell Me More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Card 2: High-Conversion Buyer Consultations */}
                <div className="w-full lg:w-1/2 flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-4 sm:p-8 rounded-lg border border-[#666666]/30 h-full group hover:shadow-2xl hover:shadow-[#B40101]/20 hover:border-[#B40101] transition-all duration-300 flex flex-col">
                    <h3 className="text-2xl font-bold mb-4">
                      Training Bootcamp:
                      <span className="block text-[#B40101]">High-Conversion Buyer Consultations</span>
                    </h3>

                    <div className="flex-grow">
                      <p className="mb-6 leading-relaxed sm:h-32">
                        Convert leads into loyal, long-term clients with supreme confidence. Dive deep into
                        understanding the six distinct buyer types, implement a proven, ultimate buyer consultation
                        flow, and master crafting a compelling buyer's journey.
                      </p>

                      <div className="space-y-3 mb-8">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#B40101] rounded-full" />
                          <span className="text-sm text-slate-100">Single Session Event</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#B40101] rounded-full" />
                          <span className="text-sm text-slate-100">In-Depth Training Session</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#B40101] rounded-full" />
                          <span className="text-sm text-slate-100">Limited Seats</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center sm:justify-start mt-auto">
                      <Button 
                        className="w-full sm:w-auto bg-[#B40101] hover:bg-[#B40101]/90 text-white font-semibold transition-all duration-300 hover:scale-105 rounded-md"
                        onClick={() => window.open("https://explore.kwsingapore.com/buyers/investors-consultation-playbook", "_blank")}
                      >
                        Tell Me More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Card 3: New Launch Analysis */}
                <div className="w-full lg:w-1/2 flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-gray-900 to-black p-4 sm:p-8 rounded-lg border border-[#666666]/30 h-full group hover:shadow-2xl hover:shadow-[#B40101]/20 hover:border-[#B40101] transition-all duration-300 flex flex-col">
                    <h3 className="text-2xl font-bold mb-4">
                      Training Bootcamp:
                      <span className="block text-[#B40101]">New Launch Analysis</span>
                    </h3>

                    <div className="flex-grow">
                      <p className="mb-6 leading-relaxed sm:h-32">
                        Dominate Singapore's New Launch market with unparalleled expertise. This bootcamp equips you
                        with the strategic skills to master site and floor plan analysis, deploy powerful pricing and
                        comparison techniques, and execute data-driven closing strategies.
                      </p>

                      <div className="space-y-3 mb-8">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#B40101] rounded-full" />
                          <span className="text-sm text-slate-100">Single Session Event</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#B40101] rounded-full" />
                          <span className="text-sm text-slate-100">In-Depth Training Session</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#B40101] rounded-full" />
                          <span className="text-sm text-slate-100">Limited Seats</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center sm:justify-start mt-auto">
                      <Button 
                        className="w-full sm:w-auto bg-[#B40101] hover:bg-[#B40101]/90 text-white font-semibold transition-all duration-300 hover:scale-105 rounded-md"
                        onClick={() => window.open("https://explore.kwsingapore.com/new-launch-analysis", "_blank")}
                      >
                        Tell Me More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Removed Card 4: Positioning as a Consultant */}
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex justify-center mt-12 space-x-2">
              {Array.from({ length: totalSlides }, (_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentSlide 
                      ? "bg-[#B40101]" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  onClick={() => goToSlide(i)}
                  id={`dot-${i}`}
                ></button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              className="hidden lg:block absolute -left-16 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-[#B40101]/80 text-white p-3 rounded-full transition-all duration-300"
              onClick={prevSlide}
              id="prev-btn"
            >
              <ChevronRight className="h-6 w-6 rotate-180" />
            </button>
            <button
              className="hidden lg:block absolute -right-16 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-[#B40101]/80 text-white p-3 rounded-full transition-all duration-300"
              onClick={nextSlide}
              id="next-btn"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          
        </div>
      </section>

      {/* Past Events */}
      <section className="relative py-12 sm:py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 font-sans"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Past Events
            </motion.h2>
            <motion.p 
              className="max-w-4xl mx-auto leading-relaxed leading-7 text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Relive the highlights from our previous events and see the impact we've made in the real estate community.
            </motion.p>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2 
                className="font-bold mb-6 font-sans text-2xl sm:text-3xl md:text-4xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <span className="text-white">MEGA Realtor Summit: </span>
                <span className="block text-[#B40101] italic">Scale Your Real Estate Business with Industry Leaders</span>
              </motion.h2>
              
              <div className="flex items-center gap-2 my-4">
                <Calendar className="w-5 h-5 text-[#B40101]" />
                <span className="text-white font-semibold">August 2025</span>
              </div>

              <motion.p 
                className="mb-8 leading-relaxed text-base md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Designed for growth-minded real estate consultants, the MREA Summit is your gateway to market dominance. 
                Learn cutting-edge strategies in lead generation, content, social media, team scaling, 
                and new launches directly from KW titans J.P. Lewis, Melvin Lim, Grayce Tan, and Rayne Chua. 
                Gain essential MREA insights to unlock millionaire-level success and accelerate your career.
              </motion.p>
            </motion.div>

            <motion.div 
              className="relative h-full flex items-stretch order-1 lg:order-2"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="relative rounded-lg overflow-hidden w-full h-full"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <iframe 
                  width="560" 
                  height="100%" 
                  src="https://www.youtube.com/embed/TSjkdfG6GMQ?si=TU8bF_QkIFTPq-mB" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full h-full rounded-lg shadow-2xl"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Past Events Tabs */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 mt-16 sm:mt-20">
          <motion.h3 
            className="text-2xl text-center sm:text-3xl md:text-4xl font-bold mb-8 font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            More Happening Events
          </motion.h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tabs (left) */}
            <div className="lg:col-span-1">
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2">
                {pastEvents.map((event, index) => (
                  <button
                    key={event.title}
                    onClick={() => { setActivePastTab(index); setPastCarouselIndex(0) }}
                    className={`px-4 py-3 rounded-md text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal border ${
                      activePastTab === index
                        ? "bg-[#B40101] border-[#B40101] text-white shadow-lg shadow-[#B40101]/30"
                        : "bg-gray-900/40 border-gray-700 text-gray-200 hover:bg-gray-800 hover:border-gray-600"
                    }`}
                  >
                    <div className="text-sm opacity-80">{pastEvents[index].date}</div>
                    <div className="text-base sm:text-lg font-semibold">{event.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content (right) */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                key={activePastTab}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-4 sm:p-6"
              >
                {/* Image carousel (moved to top) */}
                <div className="relative">
                  <div className="overflow-hidden rounded-md border border-gray-800">
                    <div className="relative h-56 sm:h-72 md:h-80 lg:h-96">
                      <img
                        src={pastEvents[activePastTab].images[pastCarouselIndex]}
                        alt={pastEvents[activePastTab].title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Carousel controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      {pastEvents[activePastTab].images.map((_, idx) => (
                        <button
                          key={idx}
                          aria-label={`Go to slide ${idx + 1}`}
                          onClick={() => setPastCarouselIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            idx === pastCarouselIndex ? "bg-[#B40101]" : "bg-white/30 hover:bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPastCarouselIndex((prev) => (prev - 1 + pastEvents[activePastTab].images.length) % pastEvents[activePastTab].images.length)}
                        className="px-3 py-2 rounded-md bg-black/50 border border-gray-800 hover:bg-[#B40101]/80 transition"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>
                      <button
                        onClick={() => setPastCarouselIndex((prev) => (prev + 1) % pastEvents[activePastTab].images.length)}
                        className="px-3 py-2 rounded-md bg-black/50 border border-gray-800 hover:bg-[#B40101]/80 transition"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Title and meta below images */}
                <div className="flex items-start justify-between gap-4 mt-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{pastEvents[activePastTab].title}</h3>
                    <div className="text-gray-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#B40101]" />
                      <span>{pastEvents[activePastTab].date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/20 via-black/80 to-black" />
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto px-6 text-center my-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-sans mb-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Can't Decide?
            <span className="block text-[#B40101] italic">Let's Chat.</span>
          </motion.h2>
            <motion.p 
              className="max-w-4xl mx-auto leading-relaxed text-base md:text-xl mb-9"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Not sure which event is right for you? <br />
              Our team is here to help you choose the perfect opportunity to accelerate your real estate career.
            </motion.p>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button
              size="lg"
              className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 group rounded-md"
              onClick={() => window.open("https://explore.kwsingapore.com/booking-page", "_blank")}
            >
              Speak to Our Team
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <motion.p 
              className="max-w-2xl mx-auto text-slate-100 text-sm md:text-base"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Get personalized recommendations based on your goals and experience level.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* Bootcamp Carousel Dialog */}
      <BootcampCarouselDialog
        isOpen={isBootcampCarouselDialogOpen}
        onClose={() => setIsBootcampCarouselDialogOpen(false)}
        onSubmit={(data) => {
          console.log('Bootcamp carousel registration submitted:', data)
          setIsBootcampCarouselDialogOpen(false)
        }}
      />

      {/* Join Form Dialog */}
      <JoinFormDialog
        isOpen={isJoinDialogOpen}
        onClose={() => setIsJoinDialogOpen(false)}
        onSubmit={handleJoinSubmit}
      />

      {/* Summit Registration Dialog */}
      <SummitRegistrationDialog
        isOpen={isSummitDialogOpen}
        onClose={() => setIsSummitDialogOpen(false)}
        onSubmit={handleSummitSubmit}
      />

      {/* Toaster for notifications */}
      <Toaster />
    </main>
    </GoogleReCaptchaProvider>
  )
} 
