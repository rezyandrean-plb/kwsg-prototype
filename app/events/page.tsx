
"use client"

import { useState, useEffect, useMemo, useRef } from "react"
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

// Static past events data - moved outside component to maintain referential equality
  const pastEvents = [
    {
      title: "Realtor Branding Workshop",
      date: "August 2025",
      description:
        "A 2-day intensive masterclass diving into the millionaire models, strategies, and systems for exponential growth.",
      images: [
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/September/1.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/September/2.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/September/3.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/September/4.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/September/5.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/September/6.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/September/7.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/September/8.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/September/9.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/October/1.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/October/2.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/October/3.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/October/4.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/October/5.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/October/6.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/October/7.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/October/8.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/October/9.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/October/10.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/October/11.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/1.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/2.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/3.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/4.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/5.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/6.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/7.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/8.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/9.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/10.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/11.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/12.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/13.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/14.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/realtor-branding/November/15.jpg",
      ],
      video: [],
    },
    {
      title: "Explore Night",
      date: "August 2025",
      description:
        "A 2-day intensive masterclass diving into the millionaire models, strategies, and systems for exponential growth.",
    images: [],
    video: [
      "https://youtu.be/Sh8aD6uI0-E?si=rVtunRhP4MHe4V9X",
      "https://youtu.be/4bjVvRaItHA?si=_oM6PtjNWfMBospn",
      "https://youtu.be/PW8A6XC0UhE?si=B5v-zjIhS9PbnEm3",
      "https://youtu.be/eo84p1nHWBE?si=hlN_j1XZM5VnuqzN",
      "https://youtu.be/jc6GFFnQQB4?si=_1sfQfS4RkSkOMDN",
      "https://youtu.be/PW8A6XC0UhE?si=wDm6H9XFzWDG0WJc",
      ],
    },
    {
    title: "Founder's Market Insights",
      date: "July 2025",
      description:
        "An interactive online session for agents to discover multiple income streams and scalable models.",
      images: [
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/founder-insight-1.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/founder-insight-2.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/founder-insight-3.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/founder-insight-4.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/founder-insight-5.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/founder-insight-6.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/founder-insight-7.jpg",
      ],
      video: [
        "https://www.youtube.com/shorts/8ZRBWMkM-n0",
      ],
    },
    {
      title: "Welcome Dinner",
      date: "June 2025",
      description:
        "Hands-on bootcamp to craft compelling listing presentations and win mandates consistently.",
      images: [
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/welcome-dinner-1.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/welcome-dinner-2.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/welcome-dinner-3.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/welcome-dinner-4.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/welcome-dinner-5.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/welcome-dinner-6.jpg",
      ],
      video: [],
    },
    {
      title: "Business Connect",
      date: "May 2025",
      description:
        "Frameworks and flows to convert leads into loyal clients across six distinct buyer profiles.",
      images: [
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-1.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-2.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-3.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-4.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-5.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-6.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-7.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-8.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-9.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-10.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-11.jpg",
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-12.jpg",  
        "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/events/business-network-13.jpg",
      ],
      video: [
        "https://www.youtube.com/shorts/8ZRBWMkM-n0",
      ],
    },
  ]

export default function EventsPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isBootcampCarouselDialogOpen, setIsBootcampCarouselDialogOpen] = useState(false)
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)
  const [isSummitDialogOpen, setIsSummitDialogOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3
  const [activePastTab, setActivePastTab] = useState(0)
  const [pastCarouselIndex, setPastCarouselIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [eventCategory, setEventCategory] = useState<string>("")
  const prevVisibleImagesRef = useRef<Set<string>>(new Set())
  const [exploreIndex, setExploreIndex] = useState(0)
  const [fourUpIndex, setFourUpIndex] = useState(0)
  const [fourUpPerRow, setFourUpPerRow] = useState(4)
  const [realtorSubTag, setRealtorSubTag] = useState<"All" | "September" | "October" | "November">("All")
  const exploreCarouselRef = useRef<HTMLDivElement>(null)
  const fourUpCarouselRef = useRef<HTMLDivElement>(null)
  const exploreIsTransitioning = useRef(false)
  const fourUpIsTransitioning = useRef(false)
  const [exploreIsResetting, setExploreIsResetting] = useState(false)
  const [fourUpIsResetting, setFourUpIsResetting] = useState(false)


  // Helper function to extract YouTube video ID and convert to embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    // Match regular YouTube URLs (watch?v= or youtu.be/)
    let videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    // Match YouTube Shorts URLs
    if (!videoIdMatch) {
      videoIdMatch = url.match(/youtube\.com\/shorts\/([^&\s?]+)/)
    }
    if (videoIdMatch) {
      const videoId = videoIdMatch[1].split('?')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1`
    }
    return url
  }

  const isYouTubeUrl = (url: string) => /youtube\.com|youtu\.be/.test(url) || /youtube\.com\/shorts/.test(url)

  // Organize images and videos by event category for gallery
  const eventImages = useMemo(() => {
    const media: Record<string, Array<{ src: string; alt: string; type: 'image' | 'video'; tag?: string }>> = {}
    pastEvents.forEach((event) => {
      const mediaItems: Array<{ src: string; alt: string; type: 'image' | 'video'; tag?: string }> = []
      
      // Add images
      if (Array.isArray(event.images) && event.images.length > 0) {
        event.images.forEach((src) => {
          // Extract month from URL path for Realtor Branding Workshop
          let monthTag: string | undefined = undefined
          if (event.title === "Realtor Branding Workshop") {
            // Check if URL contains month folder (e.g., /September/, /October/, /November/)
            const monthMatch = src.match(/\/(September|October|November)\//i)
            if (monthMatch) {
              // Ensure proper capitalization: first letter uppercase, rest lowercase
              const month = monthMatch[1]
              monthTag = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()
            } else {
              // Fallback: use array index pattern if URL doesn't contain month
              const realtorImageTags = ["September", "September", "October", "October", "November", "November"]
              const idx = event.images.indexOf(src)
              monthTag = realtorImageTags[idx % realtorImageTags.length]
            }
          }
          
          mediaItems.push({
            src,
            alt: `${event.title} - Event Image`,
            type: 'image',
            tag: monthTag
          })
        })
      }
      
      // Add videos
      if (Array.isArray(event.video) && event.video.length > 0) {
        event.video.forEach((src) => {
          // Extract month from URL path for Realtor Branding Workshop
          let monthTag: string | undefined = undefined
          if (event.title === "Realtor Branding Workshop") {
            // Check if URL contains month folder (e.g., /September/, /October/, /November/)
            const monthMatch = src.match(/\/(September|October|November)\//i)
            if (monthMatch) {
              // Ensure proper capitalization: first letter uppercase, rest lowercase
              const month = monthMatch[1]
              monthTag = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()
            } else {
              // Fallback: use array index pattern if URL doesn't contain month
              const realtorTags = ["September", "September", "October", "October", "November", "November"]
              const idx = event.video.indexOf(src)
              monthTag = realtorTags[idx % realtorTags.length]
            }
          }
          
          mediaItems.push({
            src,
            alt: `${event.title} - Event Video`,
            type: 'video',
            tag: monthTag
          })
        })
      }
      
      if (mediaItems.length > 0) {
        media[event.title] = mediaItems
      }
    })
    return media
  }, [pastEvents])

  // Get events that have images or videos for filter buttons
  const eventsWithImages = useMemo(() => {
    return pastEvents.filter(event => {
      const hasImages = Array.isArray(event.images) && event.images.length > 0
      const hasVideos = Array.isArray(event.video) && event.video.length > 0
      return hasImages || hasVideos
    })
  }, [pastEvents])

  // Get filtered images/videos based on selected category
  const filteredEventImages = useMemo(() => {
    const base = eventImages[eventCategory] || []
    if (eventCategory === "Realtor Branding Workshop" && realtorSubTag !== "All") {
      return base.filter((item: any) => item.tag === realtorSubTag)
    }
    return base
  }, [eventCategory, eventImages, realtorSubTag])

  // Get all Explore Night media (single-item carousel)
  const allExploreMedia = useMemo(() => {
    if (eventCategory !== "Explore Night") return []
    return filteredEventImages
  }, [eventCategory, filteredEventImages])

  const exploreLength = allExploreMedia.length

  // Set initial event category to first event with images or videos
  useEffect(() => {
    if (!eventCategory && pastEvents.length > 0) {
      const firstEventWithMedia = pastEvents.find(event => {
        const hasImages = Array.isArray(event.images) && event.images.length > 0
        const hasVideos = Array.isArray(event.video) && event.video.length > 0
        return hasImages || hasVideos
      })
      if (firstEventWithMedia) {
        setEventCategory(firstEventWithMedia.title)
      } else if (pastEvents[0]) {
        setEventCategory(pastEvents[0].title)
      }
    }
  }, [eventCategory, pastEvents])

  // Track visible images to avoid re-animating those that remain
  useEffect(() => {
    prevVisibleImagesRef.current = new Set(filteredEventImages.map((img) => img.src))
  }, [filteredEventImages])

  // Reset explore index when switching categories
  useEffect(() => {
    setExploreIndex(0)
    setFourUpIndex(0)
    setRealtorSubTag("All")
    setExploreIsResetting(false)
    setFourUpIsResetting(false)
    exploreIsTransitioning.current = false
    fourUpIsTransitioning.current = false
  }, [eventCategory])

  // Track how many items per row for four-up carousels based on viewport
  useEffect(() => {
    const updatePerRow = () => {
      if (typeof window === "undefined") return
      const w = window.innerWidth
      if (w < 640) setFourUpPerRow(1)       // mobile
      else if (w < 768) setFourUpPerRow(2)  // small tablets
      else if (w < 1024) setFourUpPerRow(3) // tablets
      else setFourUpPerRow(4)               // desktop
    }
    updatePerRow()
    window.addEventListener("resize", updatePerRow)
    return () => window.removeEventListener("resize", updatePerRow)
  }, [])

  // Auto-scroll Explore Night every 3 seconds (infinite right to left)
  useEffect(() => {
    const isSingleItemCarousel = eventCategory === "Explore Night"
    if (!isSingleItemCarousel || allExploreMedia.length <= 1) return
    
    const interval = setInterval(() => {
      if (exploreIsTransitioning.current) return
      
      setExploreIndex((prev) => {
        const next = prev + 1
        const totalItems = allExploreMedia.length
        
        // If we've reached the end (duplicate), seamlessly jump to start
        if (next > totalItems) {
          exploreIsTransitioning.current = true
          setExploreIsResetting(true)
          setTimeout(() => {
            setExploreIndex(0)
            exploreIsTransitioning.current = false
          }, 50)
          return totalItems // Show duplicate first, then reset
        }
        
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [eventCategory, allExploreMedia.length])

  // Auto-scroll Welcome Dinner / Founder's Market Insights images every 3 seconds (infinite right to left)
  useEffect(() => {
    const fourUpCategories = ["Welcome Dinner", "Founder's Market Insights", "Business Connect"]
    if (!fourUpCategories.includes(eventCategory) || filteredEventImages.length <= fourUpPerRow) return
    
    const interval = setInterval(() => {
      if (fourUpIsTransitioning.current) return
      
      setFourUpIndex((prev) => {
        const next = prev + 1
        const totalItems = filteredEventImages.length
        
        // If we've reached the end (duplicate), seamlessly jump to start
        if (next > totalItems) {
          fourUpIsTransitioning.current = true
          setFourUpIsResetting(true)
          setTimeout(() => {
            setFourUpIndex(0)
            fourUpIsTransitioning.current = false
          }, 50)
          return totalItems // Show duplicate first, then reset
        }
        
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [eventCategory, filteredEventImages.length, fourUpPerRow])

  // Compute active past event media (images first, then videos)
  const activeEvent = pastEvents[activePastTab] || {}
  const activeImages = Array.isArray((activeEvent as any).images) ? (activeEvent as any).images.filter(Boolean) : []
  const activeVideos = Array.isArray((activeEvent as any).video) ? (activeEvent as any).video.filter(Boolean) : []
  const activeMedia = [
    ...activeImages.map((src: string) => ({ type: "image" as const, src })),
    ...activeVideos.map((src: string) => ({ type: "video" as const, src })),
  ]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-scroll carousel (only for images, skip videos)
  useEffect(() => {
    if (activeMedia.length <= 1 || isCarouselPaused) return // Don't auto-scroll if there's only one item, no items, or paused

    const interval = setInterval(() => {
      setPastCarouselIndex((prev) => {
        // If current slide is a video, don't auto-scroll
        if (activeMedia[prev]?.type === "video") {
          return prev
        }
        
        let nextIndex = (prev + 1) % activeMedia.length
        let attempts = 0
        const maxAttempts = activeMedia.length
        
        // Skip videos and find next image
        while (activeMedia[nextIndex]?.type === "video" && attempts < maxAttempts) {
          nextIndex = (nextIndex + 1) % activeMedia.length
          attempts++
        }
        
        return nextIndex
      })
    }, 2000) // Change slide every 2 seconds

    return () => clearInterval(interval)
  }, [activeMedia.length, activePastTab, isCarouselPaused, activeMedia]) // Reset when active tab changes or pause state changes

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
      <section className="relative py-12 sm:py-32 overflow-hidden bg-black">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: "linear-gradient(to bottom, #1a0000 0%, #000000 33%, #330000 66%, #000000 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1.5px, transparent 0)",
            backgroundSize: "30px 30px",
            backgroundPosition: "15px 15px",
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 2px, transparent 0)",
            backgroundSize: "40px 40px",
            backgroundPosition: "20px 20px",
            maskImage: "linear-gradient(to bottom right, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom right, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)",
          }}
        />

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

        {/* More Events - Gallery Layout */}
        <div className="relative z-10 w-full px-6 text-center mt-16 sm:mt-20">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
          >
            More Events
            </motion.h2>
          </div>

          {/* Category Filter Buttons */}
          <motion.div 
            className="flex flex-nowrap gap-3 mb-6 pb-2 overflow-x-auto lg:overflow-visible lg:flex-wrap lg:justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {eventsWithImages.map((event) => (
                  <button
                    key={event.title}
                onClick={() => setEventCategory(event.title)}
                className={`px-4 py-2 text-sm rounded-full font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  eventCategory === event.title
                    ? "bg-[#B40101] text-white shadow-lg shadow-[#B40101]/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                {event.title}
                  </button>
                ))}
          </motion.div>

          {/* Sub-tag for Realtor Branding Workshop */}
          {eventCategory === "Realtor Branding Workshop" && (
              <motion.div 
              className="flex flex-nowrap gap-3 mt-3 mb-6 pb-2 overflow-x-auto lg:overflow-visible lg:flex-wrap lg:justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {["All", "September", "October", "November"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setRealtorSubTag(tag as "All" | "September" | "October" | "November")}
                  className={`px-3 py-1.5 text-xs sm:text-sm rounded-full font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    realtorSubTag === tag
                      ? "bg-white text-black shadow-lg shadow-white/20"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          )}

          {/* Image/Video Gallery */}
          <motion.div 
            key={eventCategory}
            className="w-full max-w-none px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {eventCategory === "Explore Night" ? (
              <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 overflow-hidden">
                <div className="relative w-full">
                  <motion.div
                    ref={exploreCarouselRef}
                    className={`flex gap-6 md:gap-8 ${exploreLength < 3 ? "justify-center" : ""}`}
                    animate={{
                      x: `-${exploreIndex * 100}%`
                    }}
                    transition={{ duration: exploreIsResetting ? 0 : 0.8, ease: "easeInOut" }}
                    onAnimationComplete={() => {
                      if (exploreIsResetting) {
                        setExploreIsResetting(false)
                      }
                    }}
                  >
                    {/* Original items */}
                    {allExploreMedia.map((media, index) => {
                      const isNew = !prevVisibleImagesRef.current.has(media.src)
                      const hoverProps = media.type === "image" ? { whileHover: { scale: 1.02 } } : {}
                      return (
                        <motion.div
                          key={`original-${media.src}-${index}`}
                          initial={isNew ? { opacity: 0, scale: 0.98 } : undefined}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                          {...hoverProps}
                          className="relative overflow-hidden rounded-lg bg-gray-800 shadow-sm shadow-black/10 aspect-video flex-shrink-0 w-full md:w-1/2"
                        > 
                          {media.type === "image" ? (
                            <img
                              src={media.src}
                              alt={media.alt}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <iframe
                              src={getYouTubeEmbedUrl(media.src)}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={media.alt}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                      )
                    })}
                    {/* Duplicate first item at the end for infinite loop */}
                    {allExploreMedia.length > 0 && allExploreMedia.map((media, index) => {
                      const hoverProps = media.type === "image" ? { whileHover: { scale: 1.02 } } : {}
                      return (
                        <motion.div
                          key={`duplicate-${media.src}-${index}`}
                          {...hoverProps}
                          className="relative overflow-hidden rounded-lg bg-gray-800 shadow-sm shadow-black/10 aspect-video flex-shrink-0 w-full md:w-1/2"
                        > 
                          {media.type === "image" ? (
                            <img
                              src={media.src}
                              alt={media.alt}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <iframe
                              src={getYouTubeEmbedUrl(media.src)}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={media.alt}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                      )
                    })}
                  </motion.div>
                  </div>

                {exploreLength > 0 && (
                  <div className="flex items-center justify-center gap-3 mt-6 md:mt-8">
                    <button
                      onClick={() => {
                        if (exploreIsTransitioning.current) return
                        setExploreIndex((prev) => {
                          const newIndex = prev - 1
                          if (newIndex < 0) {
                            // Jump to the last duplicate item (which is the same as the last original)
                            exploreIsTransitioning.current = true
                            setExploreIsResetting(true)
                            setTimeout(() => {
                              setExploreIndex(exploreLength - 1)
                              exploreIsTransitioning.current = false
                            }, 50)
                            // Show the duplicate of the last item (at index exploreLength + exploreLength - 1)
                            return exploreLength + exploreLength - 1
                          }
                          return newIndex
                        })
                      }}
                      className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10 transition"
                      aria-label="Previous video"
                    >
                      <ChevronRight className="h-4 w-4 rotate-180" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: exploreLength }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (exploreIsTransitioning.current) return
                            setExploreIndex(idx)
                          }}
                          aria-label={`Go to video ${idx + 1}`}
                          className={`h-2 rounded-full transition-all ${
                            (exploreIndex % exploreLength) === idx ? "w-6 bg-[#B40101]" : "w-2 bg-white/40"
                          }`}
                        />
                      ))}
                </div>

                    <button
                      onClick={() => {
                        if (exploreIsTransitioning.current) return
                        setExploreIndex((prev) => {
                          const next = prev + 1
                          if (next > exploreLength) {
                            // Seamlessly jump to start
                            exploreIsTransitioning.current = true
                            setExploreIsResetting(true)
                            setTimeout(() => {
                              setExploreIndex(0)
                              exploreIsTransitioning.current = false
                            }, 50)
                            return exploreLength
                          }
                          return next
                        })
                      }}
                      className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10 transition"
                      aria-label="Next video"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : ["Welcome Dinner", "Founder's Market Insights", "Business Connect"].includes(eventCategory) ? (
              <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 overflow-hidden">
                <div className="relative w-full">
                  <motion.div
                    ref={fourUpCarouselRef}
                    className={`flex gap-4 md:gap-6 ${filteredEventImages.length < 3 ? "justify-center" : ""}`}
                    animate={{
                      x: `-${fourUpIndex * (100 / fourUpPerRow)}%`
                    }}
                    transition={{ duration: fourUpIsResetting ? 0 : 0.8, ease: "easeInOut" }}
                    onAnimationComplete={() => {
                      if (fourUpIsResetting) {
                        setFourUpIsResetting(false)
                      }
                    }}
                  >
                      {/* Original items */}
                      {filteredEventImages.map((media, index) => {
                      const isNew = !prevVisibleImagesRef.current.has(media.src)
                      const hoverProps = media.type === "image" ? { whileHover: { scale: 1.08, zIndex: 20 } } : {}
                      return (
                        <motion.div
                          key={`original-${media.src}-${index}`}
                          initial={isNew ? { opacity: 0, scale: 0.98 } : undefined}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                          {...hoverProps}
                          className="group relative overflow-hidden rounded-lg bg-gray-800 shadow-sm shadow-black/10 flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                          {media.type === 'image' ? (
                            <img
                              src={media.src}
                              alt={media.alt}
                              className="w-full h-auto object-cover"
                              loading="lazy"
                            />
                          ) : isYouTubeUrl(media.src) ? (
                            <iframe
                              src={getYouTubeEmbedUrl(media.src)}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={media.alt}
                            />
                          ) : (
                            <video
                              src={media.src}
                              controls
                              className="w-full h-auto object-cover"
                              preload="metadata"
                              autoPlay
                              muted
                              loop
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                          {media.type === 'image' && (
                            <div className="pointer-events-none absolute left-1/2 bottom-full mb-3 z-30 hidden -translate-x-1/2 group-hover:block">
                              <div className="rounded-lg overflow-hidden shadow-2xl shadow-black/60 border border-white/10 bg-black/80">
                                <img
                                  src={media.src}
                                  alt={media.alt}
                                  className="w-72 h-auto object-cover"
                                  loading="lazy"
                                />
                      </div>
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                    {/* Duplicate items at the end for infinite loop */}
                    {filteredEventImages.length > 0 && filteredEventImages.map((media, index) => {
                      const hoverProps = media.type === "image" ? { whileHover: { scale: 1.08, zIndex: 20 } } : {}
                      return (
                        <motion.div
                          key={`duplicate-${media.src}-${index}`}
                          {...hoverProps}
                          className="group relative overflow-hidden rounded-lg bg-gray-800 shadow-sm shadow-black/10 flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                          {media.type === 'image' ? (
                            <img
                              src={media.src}
                              alt={media.alt}
                              className="w-full h-auto object-cover"
                              loading="lazy"
                            />
                          ) : isYouTubeUrl(media.src) ? (
                            <iframe
                              src={getYouTubeEmbedUrl(media.src)}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={media.alt}
                            />
                          ) : (
                            <video
                              src={media.src}
                              controls
                              className="w-full h-auto object-cover"
                              preload="metadata"
                              autoPlay
                              muted
                              loop
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                          {media.type === 'image' && (
                            <div className="pointer-events-none absolute left-1/2 bottom-full mb-3 z-30 hidden -translate-x-1/2 group-hover:block">
                              <div className="rounded-lg overflow-hidden shadow-2xl shadow-black/60 border border-white/10 bg-black/80">
                                <img
                                  src={media.src}
                                  alt={media.alt}
                                  className="w-72 h-auto object-cover"
                                  loading="lazy"
                                />
                      </div>
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </motion.div>
                    </div>

                {filteredEventImages.length > 0 && (
                  <div className="flex items-center justify-center gap-3 mt-6 md:mt-8">
                    <button
                      onClick={() => {
                        if (fourUpIsTransitioning.current) return
                        setFourUpIndex((prev) => {
                          const newIndex = prev - 1
                          const totalItems = filteredEventImages.length
                          if (newIndex < 0) {
                            // Jump to the last duplicate item (which is the same as the last original)
                            fourUpIsTransitioning.current = true
                            setFourUpIsResetting(true)
                            setTimeout(() => {
                              setFourUpIndex(totalItems - 1)
                              fourUpIsTransitioning.current = false
                            }, 50)
                            // Show the duplicate of the last item
                            return totalItems + totalItems - 1
                          }
                          return newIndex
                        })
                      }}
                      className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10 transition"
                      aria-label="Previous image"
                    >
                      <ChevronRight className="h-4 w-4 rotate-180" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: filteredEventImages.length }).map((_, idx) => (
                          <button
                            key={idx}
                          onClick={() => {
                            if (fourUpIsTransitioning.current) return
                            setFourUpIndex(idx)
                          }}
                          aria-label={`Go to image ${idx + 1}`}
                          className={`h-2 rounded-full transition-all ${
                            (fourUpIndex % filteredEventImages.length) === idx ? "w-6 bg-[#B40101]" : "w-2 bg-white/40"
                            }`}
                          />
                        ))}
                      </div>

                        <button
                      onClick={() => {
                        if (fourUpIsTransitioning.current) return
                        setFourUpIndex((prev) => {
                          const next = prev + 1
                          const totalItems = filteredEventImages.length
                          if (next > totalItems) {
                            // Seamlessly jump to start
                            fourUpIsTransitioning.current = true
                            setFourUpIsResetting(true)
                            setTimeout(() => {
                              setFourUpIndex(0)
                              fourUpIsTransitioning.current = false
                            }, 50)
                            return totalItems
                          }
                          return next
                        })
                      }}
                      className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10 transition"
                      aria-label="Next image"
                        >
                      <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                )}
                    </div>
            ) : (
              <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
                <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 ${filteredEventImages.length < 3 ? "justify-center" : ""}`}>
                  {filteredEventImages.map((media) => {
                    const isNew = !prevVisibleImagesRef.current.has(media.src)
                    const hoverProps = media.type === "image" ? { whileHover: { scale: 1.035, zIndex: 10 } } : {}
                    return (
                      <motion.div
                        key={media.src}
                        initial={isNew ? { opacity: 0, y: 12, scale: 0.98 } : undefined}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={isNew ? { duration: 0.45, ease: "easeOut" } : { duration: 0.2 }}
                        {...hoverProps}
                        className="group relative overflow-hidden rounded-lg bg-gray-800 shadow-sm shadow-black/10"
                      >
                        {media.type === "image" ? (
                          <>
                            <img
                              src={media.src}
                              alt={media.alt}
                              className="w-full h-auto object-cover transition-transform duration-400 ease-out hover:scale-102"
                              loading="lazy"
                            />
                            <div className="pointer-events-none absolute left-1/2 bottom-full mb-2 z-30 hidden -translate-x-1/2 group-hover:block">
                              <div className="rounded-lg overflow-hidden shadow-2xl shadow-black/60 border border-white/10 bg-black/80">
                                <img
                                  src={media.src}
                                  alt={media.alt}
                                  className="w-64 h-auto object-cover"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <video
                            src={media.src}
                            controls
                            className="w-full h-auto object-cover"
                            preload="metadata"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </motion.div>
                    )
                  })}
            </div>
          </div>
            )}
          </motion.div>
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