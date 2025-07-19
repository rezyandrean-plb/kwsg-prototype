"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"
import {
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  Building,
  MapPin,
  Home,
  Ruler,
  Eye,
  Car,
  Train,
  ShoppingBag,
  GraduationCap,
  Hospital,
  Play,
  MoveDownIcon,
  MountainSnow,
  Clock,
  Trees,
  Boxes,
  BedDouble,
  ChartLine,
  Compass,
  Layers,
  Info,
} from "lucide-react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Add custom CSS animations
const customStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInFromTop {
    from {
      opacity: 0;
      transform: translateY(-50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(220, 38, 38, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(220, 38, 38, 0.6);
    }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .animate-fade-in-left {
    animation: fadeInLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .animate-fade-in-right {
    animation: fadeInRight 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .animate-slide-in-top {
    animation: slideInFromTop 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .animate-scale-in {
    animation: scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .animate-slide-in-bottom {
    animation: slideInFromBottom 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .animate-pulse-glow {
    animation: pulseGlow 2s ease-in-out infinite;
  }
  
  .section-entrance {
    opacity: 0;
    transform: translateY(60px);
    transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .section-entrance.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .stagger-animation {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .stagger-animation.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  .text-gradient {
    background: linear-gradient(135deg, #dc2626, #ef4444);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .cta-buttons-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .cta-buttons-container.justify-center {
    justify-content: center;
  }
  
  @media (min-width: 640px) {
    .cta-buttons-container {
      flex-direction: row;
    }
  }
`;

export default function SpringleafResidenceLanding() {
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedFloorPlan, setSelectedFloorPlan] = useState("1br")
  const [isScrolled, setIsScrolled] = useState(false)
  const [date, setDate] = useState<Date>()
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    // Intersection Observer for section animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id')
          if (sectionId) {
            setAnimatedSections(prev => new Set([...prev, sectionId]))
          }
        }
      })
    }, observerOptions)

    // Observe all sections with data-section-id
    const sections = document.querySelectorAll('[data-section-id]')
    sections.forEach(section => observer.observe(section))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  const projectImages = [
    "/images/springleaf-residence/springleaf-residence-hero-aerial.webp",
    "/images/springleaf-residence/springleaf-residence-condo-look.webp",
    "/images/springleaf-residence/springleaf-residence-facilitate.webp",
    "/images/springleaf-residence/springleaf-residence-front.webp",
  ]

  const floorPlans = {
    "1br": {
      name: "1-Bedroom",
      size: "592 sqft",
      price: "~$1.15M",
      image: "/images/springleaf-residence/site-plan-dummy.webp",
    },
    "2br": {
      name: "2-Bedroom (2 bath)",
      size: "646 sqft",
      price: "~$1.26M",
      image: "/placeholder.svg?height=400&width=600&text=2BR+Floor+Plan",
    },
    "3br": {
      name: "3-Bedroom",
      size: "786–1,248 sqft",
      price: "~$1.53M - $2.18M",
      image: "/placeholder.svg?height=400&width=600&text=3BR+Floor+Plan",
    },
    "4br": {
      name: "4-Bedroom",
      size: "1,227 sqft",
      price: "~$2.39M",
      image: "/placeholder.svg?height=400&width=600&text=4BR+Floor+Plan",
    },
    "5br": {
      name: "5-Bedroom",
      size: "1,453 sqft",
      price: "~$2.83M",
      image: "/placeholder.svg?height=400&width=600&text=5BR+Floor+Plan",
    },
  }

  const amenities = [
    { icon: <Car className="w-6 h-6" />, name: "Covered Parking", distance: "On-site" },
    { icon: <Train className="w-6 h-6" />, name: "Springleaf MRT", distance: "2 mins walk" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Thomson Plaza", distance: "5 mins drive" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Northpoint City", distance: "8 mins drive" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "AMK Hub", distance: "10 mins drive" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Lentor Modern Mall", distance: "Upcoming" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Bishan Junction 8", distance: "12 mins drive" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Upper Thomson Rd Eateries", distance: "3 mins walk" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "CHIJ St Nicholas Girls' School", distance: "8 mins drive" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Anderson Primary School", distance: "5 mins drive" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Mayflower Primary School", distance: "6 mins drive" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Peiying Primary School", distance: "7 mins drive" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Chung Cheng High School (Yishun)", distance: "10 mins drive" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "GEMS World Academy", distance: "15 mins drive" },
    { icon: <Hospital className="w-6 h-6" />, name: "KK Hospital", distance: "10 mins drive" },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

  const scrollToLeadForm = () => {
    const leadFormSection = document.getElementById('lead-form')
    if (leadFormSection) {
      leadFormSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToProjectInfo = () => {
    const projectInfoSection = document.getElementById('project-info')
    if (projectInfoSection) {
      projectInfoSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToMedia = () => {
    const mediaSection = document.getElementById('media')
    if (mediaSection) {
      mediaSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToNearbyAmenities = () => {
    const nearbyAmenitiesSection = document.getElementById('nearby-amenities')
    if (nearbyAmenitiesSection) {
      nearbyAmenitiesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    emailAddress: '',
    preferredDate: undefined as Date | undefined,
    preferredTiming: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.fullName.trim() || !formData.contactNumber.trim()) {
      setSubmitError('Full name and contact number are required')
      toast({
        title: "Validation Error",
        description: "Full name and contact number are required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    // Show submitting toast
    toast({
      title: "Submitting...",
      description: "Please wait while we process your request",
    })

    try {
      const response = await fetch('/api/springleaf-residence-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitSuccess(true)
        setFormData({
          fullName: '',
          contactNumber: '',
          emailAddress: '',
          preferredDate: undefined,
          preferredTiming: ''
        })
        setDate(undefined)
        
        // Show success toast
        toast({
          title: "Request Submitted Successfully!",
          description: "Thank you for your interest in Springleaf Residence! We have sent you a confirmation email and our team will contact you soon to arrange your showflat visit.",
          variant: "default",
        })
        
        // Reset success state after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        throw new Error(result.error || 'Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form. Please try again.'
      setSubmitError(errorMessage)
      
      // Show error toast
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1c1c1d] text-white">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      {/* Sticky CTA for Mobile */}
      <div className={`fixed bottom-0 left-0 right-0 bg-[#ce001f] text-white p-4 z-50 md:hidden transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <Button 
          className="w-full bg-white text-[#ce001f] hover:bg-gray-100 font-semibold"
          onClick={scrollToLeadForm}
        >
          Book Your Showflat Visit
        </Button>
      </div>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          isScrolled ? 'bg-[#1c1c1d] shadow-sm border-b border-gray-700' : 'bg-transparent'
        } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/kwsingapore-logo.webp"
                  alt="KW Singapore Logo"
                  width={300}
                  height={100}
                  className="h-12 w-auto"
                />
              </div>
            </div>
              <nav className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={scrollToProjectInfo}
                  className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                >
                  Project Info
                </button>
                {/* <a href="#floor-plans" className="text-white hover:text-[#ce001f] transition-colors duration-300">
                  Floor Plans
                </a> */}
                <button 
                  onClick={scrollToMedia}
                  className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                >
                  Explore
                </button>
                <button 
                  onClick={scrollToNearbyAmenities}
                  className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                >
                  Location
                </button>
                {/* <a href="#editorial" className="text-white hover:text-[#ce001f] transition-colors duration-300">
                  Editorial
                </a> */}
                <Button 
                  className="bg-[#ce001f] hover:bg-[#b3001a] transition-colors duration-300"
                  onClick={scrollToLeadForm}
                >
                  Book Showflat Visit
                </Button>
              </nav>
          </div>
        </div>
      </header>

      {/* Clean Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/springleaf-residence/springleaf-hero.jpg"
            alt="Springleaf Residence Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70" />
        </div>

        <div className="relative container mx-auto px-4 min-h-screen flex items-center">
          <div className={`max-w-4xl transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {/* Clean Badge */}
            <div className={`mb-8 transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Badge className="bg-[#ce001f] text-white px-4 py-2 text-sm font-medium rounded-full animate-pulse">
                OFFICIAL PREVIEW LAUNCH 2025
              </Badge>
            </div>

            {/* Clean Typography */}
            <div className={`mb-8 transition-all duration-700 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <span className={`inline-block transition-all duration-1000 delay-900 ${isVisible ? 'animate-fade-in-left' : ''}`}>SPRINGLEAF</span>
                <br />
                <span className={`text-4xl md:text-6xl font-light text-white/90 inline-block transition-all duration-1000 delay-1100 ${isVisible ? 'animate-fade-in-right' : ''}`}>RESIDENCE</span>
              </h1>

              <div className={`flex items-center mb-6 transition-all duration-700 delay-1300 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                <div className="w-12 h-px bg-[#ce001f] mr-4"></div>
                <p className="text-lg text-gray-200 font-light">District 26, Upper Thomson</p>
              </div>

              <p className={`text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8 transition-all duration-700 delay-1500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                Redefining Modern Living in Nature's Embrace
              </p>
            </div>

            {/* Clean CTA Buttons */}
            <div className={`cta-buttons-container mb-12 transition-all duration-700 delay-1700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Button 
                className={`bg-[#ce001f] hover:bg-[#b3001a] text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 hover-lift flex-shrink-0 ${isVisible ? 'animate-pulse-glow' : ''}`}
                onClick={scrollToLeadForm}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Showflat Visit
              </Button>
              {/* <Button
                variant="outline"
                className="border-2 border-white text-gray-900 hover:bg-transparent hover:text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 bg-white hover-lift flex-shrink-0"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </Button> */}
            </div>

            {/* Clean Stats Grid */}
          </div>
        </div>

        {/* Clean Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-2000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">Scroll to explore</span>
            <MoveDownIcon className="w-5 h-5 rotate-90 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Enhanced Project Information Section */}
      <section 
        id="project-info" 
        className="py-16 bg-[#1c1c1d] section-entrance"
        data-section-id="project-info"
        style={{ 
          opacity: animatedSections.has('project-info') ? 1 : 0,
          transform: animatedSections.has('project-info') ? 'translateY(0)' : 'translateY(60px)'
        }}
      >
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${
            animatedSections.has('project-info') ? 'animate-slide-in-top' : ''
          }`}>
            <h2 className="text-3xl font-light mb-3 text-white text-center tracking-wide">The North's First Nature-Integrated, and Well-connected High-Rise</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your future home awaits in District 26 – just <strong>2 minutes' walk</strong> to Springleaf MRT. Discover elegant 1- to 5-bedroom condos designed for today's modern lifestyle, surrounded by lush greenery and unrivaled connectivity.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <Train className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "&lt;100m Sheltered Access to Springleaf MRT" },
              { icon: <MountainSnow className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "Near <strong>Upper Seletar Reservoir</strong>, Mandai Wildlife, & Nature Parks" },
              { icon: <ShoppingBag className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "Surrounded by Hawker Fare, Upscale Dining, Golf & Malls" },
              { icon: <BedDouble className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "1- to 5-Bedroom Units, Full Condo Facilities" },
              { icon: <ChartLine className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "Attractive Pricing from ~$2250 PSF" },
              { icon: <Compass className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "Direct connectivity to SLE, CTE, TPE & Upcoming North-South Corridor" },
              { icon: <Layers className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "5 Towers + Conservation Block | <strong>99-Year Leasehold</strong>" },
              { icon: <Building className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "Developed by <strong>GuocoLand & Hong Leong</strong>" }
            ].map((card, index) => (
              <Card 
                key={index} 
                className={`text-center hover:shadow-lg transition-all duration-700 border-gray-700 bg-[#18191b] hover:scale-105 hover-lift stagger-animation ${
                  animatedSections.has('project-info') ? 'animate' : ''
                }`} 
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  opacity: animatedSections.has('project-info') ? 1 : 0,
                  transform: animatedSections.has('project-info') ? 'translateY(0)' : 'translateY(40px)'
                }}
              >
                <CardContent className="p-6">
                  {card.icon}
                  <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: card.desc }}></p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Information Grid */}
          <div className={`grid lg:grid-cols-10 gap-8 mb-12 transition-all duration-1000 delay-500 ${
            animatedSections.has('project-info') ? 'animate-fade-in-up' : ''
          }`} style={{
            opacity: animatedSections.has('project-info') ? 1 : 0,
            transform: animatedSections.has('project-info') ? 'translateY(0)' : 'translateY(50px)'
          }}>
            {/* Project Details */}
            <Card className="lg:col-span-4 border-gray-700 bg-[#18191b] hover:shadow-lg transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-[#ce001f] flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Name:</span>
                  <span className="font-semibold text-white">Springleaf Residence</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">District:</span>
                  <span className="font-semibold text-white">D26 – Upper Thomson</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Developer:</span>
                  <span className="font-semibold text-white">GuocoLand & Hong Leong</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Tenure:</span>
                  <span className="font-semibold text-white">99 Years Leasehold</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Site Area:</span>
                  <span className="font-semibold text-white">344,700 sqft (32,023.7 sqm)</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Blocks:</span>
                  <span className="font-semibold text-white">5 x 25-Storey + 1 x 4-Storey Conservation</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Total Units:</span>
                  <span className="font-semibold text-white">941</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Unit Mix:</span>
                  <span className="font-semibold text-white">1 to 5 Bedrooms</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Target Preview:</span>
                  <span className="font-semibold text-white">1 August 2025</span>
                </div>
              </CardContent>
            </Card>

            {/* Site Plan & Floor Plans */}
            <Card className="lg:col-span-6 border-gray-700 bg-[#18191b] hover:shadow-lg transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-[#ce001f] flex items-center">
                  <Ruler className="w-5 h-5 mr-2" />
                  Plans & Layout
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">Site Plan</h4>
                    </div>
                    <Image
                      src="/images/springleaf-residence/springleaf-residence-site-plan.webp"
                      alt="Springleaf Residence Site Plan"
                      width={300}
                      height={200}
                      className="w-full rounded mb-3 hover:scale-95 transition-transform duration-500"
                    />
                    <p className="text-sm text-gray-300 mb-3">
                      View the overall development layout and facilities distribution
                    </p>
                    <Button variant="outline" size="sm" className="w-full bg-[#ce001f] hover:bg-[#ce001f]/20 hover:text-white transition-all duration-300 border-gray-500 text-gray-300">
                      <Download className="w-4 h-4 mr-2" />
                      Required Site Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Gallery Section */}
          <div className={`mb-20 transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-light mb-3 text-white text-center tracking-wide">Project Gallery</h3>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-[#ce001f] rounded" />
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                <span>
                  {currentImageIndex + 1} of {projectImages.length}
                </span>
              </div>
            </div>

            {/* Main Image Display */}
            <div className="relative max-w-6xl mx-auto mb-8">
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={projectImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`Springleaf Residence - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover transition-all duration-500"
                />

                
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <h4 className="text-lg font-semibold mb-1">
                      {currentImageIndex === 0
                        ? "Architectural Rendering"
                        : currentImageIndex === 1
                          ? "Swimming Pool Deck"
                          : currentImageIndex === 2
                            ? "Clubhouse Interior"
                            : currentImageIndex === 3
                              ? "Landscape Garden"
                              : "Gym Facilities"}
                    </h4>
                    <p className="text-sm opacity-90">
                      {currentImageIndex === 0
                        ? "Modern luxury towers with premium finishes"
                        : currentImageIndex === 1
                        ? "Resort-style pool with relaxation areas"
                        : currentImageIndex === 2
                        ? "Elegant clubhouse with premium amenities"
                        : currentImageIndex === 3
                        ? "Lush landscaping throughout the development"
                        : "State-of-the-art fitness facilities"}
                    </p>
                  </div>
                </div>
              </div>

              
              <div className="flex justify-center mt-6 space-x-3">
                {projectImages.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                      index === currentImageIndex
                        ? "border-primary-red shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div> 

          {/* Call to Action */}
          <div className={`text-center mb-4 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="bg-gradient-to-r from-[#ce001f] to-[#b3001a] text-white rounded-2xl p-8 max-w-4xl mx-auto hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">Be the first to own a home that combines convenience, luxury, and nature</h3>
              <p className="text-lg mb-6 opacity-90">
                Register now for an exclusive preview of Springleaf Residence
              </p>
              <div className="cta-buttons-container justify-center">
                <Button 
                  className="bg-white text-[#ce001f] hover:bg-gray-100 px-8 py-3 text-lg hover:scale-105 transition-all duration-300"
                  onClick={scrollToLeadForm}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Showflat Visit
                </Button>
                {/* <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#ce001f] px-8 py-3 text-lg bg-transparent hover:scale-105 transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Brochure
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      {/* <section id="floor-plans" className="py-16 bg-[#1c1c1d]">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-3xl font-light mb-3 text-white text-center tracking-wide">Floor Plans & Pricing</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-xl text-gray-300">Choose from the following thoughtfully designed unit layouts</p>
          </div>

          <Tabs value={selectedFloorPlan} onValueChange={setSelectedFloorPlan} className={`w-full transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
                        <TabsList className="w-full mb-8">
              <div className="flex flex-nowrap gap-3 justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent px-4" style={{ WebkitOverflowScrolling: 'touch' }}>
                {Object.entries(floorPlans).map(([key, plan]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key} 
                    className="px-6 py-3 rounded-full font-medium flex items-center gap-2 text-sm transition-all duration-300 border-2 focus:outline-none whitespace-nowrap flex-shrink-0 data-[state=active]:bg-[#ce001f] data-[state=active]:border-[#ce001f] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-transparent data-[state=inactive]:border-gray-600 data-[state=inactive]:text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover:text-white"
                  >
                    {plan.name}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>

            {Object.entries(floorPlans).map(([key, plan]) => (
              <TabsContent key={key} value={key}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="hover:scale-105 transition-transform duration-500">
                    <Image
                      src={plan.image || "/placeholder.svg"}
                      alt={`${plan.name} Floor Plan`}
                      width={600}
                      height={400}
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-primary-red mb-2">{plan.name}</h3>
                      <p className="text-xl text-gray-300 mb-4">{plan.size}</p>
                      <p className="text-2xl font-bold text-green-400">{plan.price}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Ruler className="w-5 h-5" style={{ color: '#ce001f' }} />
                        <span className="text-white font-light">Spacious and well-ventilated layout</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Eye className="w-5 h-5" style={{ color: '#ce001f' }} />
                        <span className="text-white font-light">Unblocked views from most units</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Home className="w-5 h-5" style={{ color: '#ce001f' }} />
                        <span className="text-white font-light">Premium fittings and finishes</span>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button className="bg-[#ce001f] hover:bg-[#b3001a] hover:scale-105 transition-all duration-300">Book Showflat Visit</Button>
                      <Button variant="outline" className="border-[#ce001f] text-[#ce001f] bg-transparent hover:scale-105 transition-all duration-300">
                        <Download className="w-4 h-4 mr-2" />
                        Download Floor Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className={`mt-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-light text-white mb-2">Safe entry price compared to other OCR areas:</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-3">Woodlands</h4>
                <p className="text-3xl font-bold text-[#ce001f]">~$2,300 PSF</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-3">Lakeside</h4>
                <p className="text-3xl font-bold text-[#ce001f]">~$2,600 PSF</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-3">Bayshore</h4>
                <p className="text-3xl font-bold text-[#ce001f]">~$2,900 PSF</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Investor Benefits & Pricing Comparison */}
      <section 
        className="py-16 bg-[#242728] section-entrance"
        data-section-id="investor-benefits"
        style={{ 
          opacity: animatedSections.has('investor-benefits') ? 1 : 0,
          transform: animatedSections.has('investor-benefits') ? 'translateY(0)' : 'translateY(60px)'
        }}
      >
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${
            animatedSections.has('investor-benefits') ? 'animate-slide-in-top' : ''
          }`}>
            <h2 className="text-3xl font-light mb-3 text-white text-center tracking-wide">For Investors</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
          </div>

          {/* Investor Benefits */}
          <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-500 ${
            animatedSections.has('investor-benefits') ? 'animate-fade-in-up' : ''
          }`} style={{
            opacity: animatedSections.has('investor-benefits') ? 1 : 0,
            transform: animatedSections.has('investor-benefits') ? 'translateY(0)' : 'translateY(50px)'
          }}>
            {/* Top Row - 3 Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                { icon: <Train className="w-8 h-8" style={{ color: '#ce001f' }} />, text: "MRT-adjacent - Strong rental appeal" },
                { icon: <MountainSnow className="w-8 h-8" style={{ color: '#ce001f' }} />, text: "Near Woodlands Regional Centre - future growth node" },
                { icon: <Clock className="w-8 h-8" style={{ color: '#ce001f' }} />, text: "Limited new launches in D26" }
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className={`text-left hover:shadow-lg transition-all duration-700 bg-[#18191b] rounded-xl hover:scale-105 hover-lift stagger-animation ${
                    animatedSections.has('investor-benefits') ? 'animate' : ''
                  }`} 
                  style={{ 
                    transitionDelay: `${index * 200}ms`,
                    opacity: animatedSections.has('investor-benefits') ? 1 : 0,
                    transform: animatedSections.has('investor-benefits') ? 'translateY(0)' : 'translateY(40px)'
                  }}
                >
                  <div className="p-6 flex items-center space-x-4">
                    <div>{benefit.icon}</div>
                    <p className="text-sm text-gray-300 font-medium">{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom Row - 2 Cards Centered */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { icon: <Trees className="w-8 h-8" style={{ color: '#ce001f' }} />, text: "Nature views + lifestyle value" },
                { icon: <Boxes className="w-8 h-8" style={{ color: '#ce001f' }} />, text: "Ideal for both capital appreciation & family living" }
              ].map((benefit, index) => (
                <div 
                  key={index + 3} 
                  className={`text-left hover:shadow-lg transition-all duration-700 bg-[#18191b] rounded-xl hover:scale-105 hover-lift stagger-animation ${
                    animatedSections.has('investor-benefits') ? 'animate' : ''
                  }`} 
                  style={{ 
                    transitionDelay: `${(index + 3) * 200}ms`,
                    opacity: animatedSections.has('investor-benefits') ? 1 : 0,
                    transform: animatedSections.has('investor-benefits') ? 'translateY(0)' : 'translateY(40px)'
                  }}
                >
                  <div className="p-6 flex items-center space-x-4">
                    <div>{benefit.icon}</div>
                    <p className="text-sm text-gray-300 font-medium">{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Amenities */}
      <section 
        id="nearby-amenities"
        className="py-16 bg-[#1c1c1d] section-entrance"
        data-section-id="nearby-amenities"
        style={{ 
          opacity: animatedSections.has('nearby-amenities') ? 1 : 0,
          transform: animatedSections.has('nearby-amenities') ? 'translateY(0)' : 'translateY(60px)'
        }}
      >
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${
            animatedSections.has('nearby-amenities') ? 'animate-slide-in-top' : ''
          }`}>
            <h2 className="text-3xl font-light mb-3 text-white text-center tracking-wide">Location</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-xl text-gray-300">Everything you need is within reach</p>
          </div>

          {/* Location Information */}
          <div className={`mb-12 transition-all duration-1000 delay-500 ${
            animatedSections.has('nearby-amenities') ? 'animate-fade-in-up' : ''
          }`} style={{
            opacity: animatedSections.has('nearby-amenities') ? 1 : 0,
            transform: animatedSections.has('nearby-amenities') ? 'translateY(0)' : 'translateY(50px)'
          }}>
            <Card className="border-gray-700 bg-[#18191b] hover:shadow-lg transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-[#ce001f] flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location Map
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location Image */}
                <div className="w-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/springleaf-residence/springleaf-location.webp"
                    alt="Springleaf Residence Location"
                    width={800}
                    height={450}
                    className="w-full h-[450px] object-cover"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5" style={{ color: '#ce001f' }} />
                    <div>
                      <p className="font-semibold text-white">Address</p>
                      <p className="text-sm text-gray-300 font-light">825A Upper Thomson Road, S787135</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Train className="w-5 h-5" style={{ color: '#ce001f' }} />
                    <div>
                      <p className="font-semibold text-white">MRT</p>
                      <p className="text-sm text-gray-300 font-light">Springleaf MRT (TEL Line)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Car className="w-5 h-5" style={{ color: '#ce001f' }} />
                    <div>
                      <p className="font-semibold text-white">Access</p>
                      <p className="text-sm text-gray-300 font-light">SLE | CTE | North-South Corridor</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, index) => (
              <Card 
                key={index} 
                className={`hover:shadow-lg transition-all duration-700 border-gray-700 bg-[#18191b] rounded-xl hover:scale-105 stagger-animation ${
                  animatedSections.has('nearby-amenities') ? 'animate' : ''
                }`} 
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                  opacity: animatedSections.has('nearby-amenities') ? 1 : 0,
                  transform: animatedSections.has('nearby-amenities') ? 'translateY(0)' : 'translateY(40px)'
                }}
              >
                <CardContent className="p-6 flex items-center space-x-4">
                  <div style={{ color: '#ce001f' }}>{amenity.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">{amenity.name}</h3>
                    <p className="text-gray-300 font-light">{amenity.distance}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Media Section */}
      <section id="media" className="pt-4 pb-4 bg-[#1c1c1d] flex items-center justify-center">
        <div className="container mx-auto px-4 text-left">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-3xl font-light mb-3 text-white text-center tracking-wide">Explore Springleaf Residence</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Immerse yourself in the luxury and elegance of our latest development through our comprehensive media
              gallery
            </p>
          </div>

          
          <div className={`space-y-20 transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-white text-[#ce001f]">NEW LAUNCH ANALYSIS</Badge>
                <h3 className="text-3xl font-bold text-[#ce001f]">
                  Springleaf Residence New Launch Analysis
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  District 26's first high-rise mega condo with full facilities. 
                  Developed by visionary GuocoLand and Hong Leong, this 941-unit project offers unbeatable connectivity, unparalleled green premium, and a strategic entry price. 
                  Discover how you can capitalise on this rare opportunity.
                </p>
                  <Button 
                    className="bg-[#ce001f] hover:bg-[#b3001a] text-white px-8 py-3 hover:scale-105 transition-all duration-300"
                    onClick={() => window.open('https://newlaunch.kwsingapore.com/springleaf-residence-new-launch-analysis', '_blank')}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Analysis
                  </Button>
              </div>
              <div className="relative hover:scale-105 transition-transform duration-500 md:p-0 p-4">
                <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/springleaf-residence/new-launch-analysis.webp?height=320&width=500&text=Lentor+Mansion+Showflat+Tour"
                    alt="Lentor Mansion Showflat Tour"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative hover:scale-105 transition-transform duration-500 md:p-0 p-4">
                <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/springleaf-residence/new-launch-analysis-2.webp?height=320&width=500&text=Lentor+Rejuvenation+Analysis"
                    alt="Lentor's Rejuvenation Analysis"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6 lg:order-2">
                <Badge className="bg-green-100 text-green-800">NEW LAUNCH ANALYSIS</Badge>
                <h3 className="text-3xl font-bold text-[#ce001f]">
                  Springleaf Residence vs. the Supply Surge: Can a Lower Land Bid Still Outperform in a Crowded District 26?
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Before you buy into the hype of D26, ask yourself: Are you investing… or just following the crowd? 
                  In a market flooded with options, the wrong call could mean years of stagnant capital. 
                  This webinar goes beyond brochures and showflat buzz to confront one critical question : 
                  <strong> Can Springleaf truly stand out — or will it be buried in the noise?</strong>
                </p>
                <Button 
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 hover:scale-105 transition-all duration-300"
                    onClick={() => window.open('https://newlaunch.kwsingapore.com/webinars/springleaf-residence-vs-the-supply-surge', '_blank')}
                  >
                    <Info className="w-5 h-5 mr-2" />
                    Read More
                  </Button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className={`text-center mt-12 mb-4 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="bg-gradient-to-r from-[#ce001f] to-[#b3001a] text-white rounded-2xl p-8 max-w-4xl mx-auto hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">Be the first to own a home that combines convenience, luxury, and nature</h3>
              <p className="text-lg mb-6 opacity-90">
                Register now for an exclusive preview of Springleaf Residence
              </p>
              <div className="cta-buttons-container justify-center">
                <Button 
                  className="bg-white text-[#ce001f] hover:bg-gray-100 px-8 py-3 text-lg hover:scale-105 transition-all duration-300"
                  onClick={scrollToLeadForm}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Showflat Visit
                </Button>
                {/* <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#ce001f] px-8 py-3 text-lg bg-transparent hover:scale-105 transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Brochure
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Generation Form */}
      <section
        id="lead-form"
        className={`py-16 relative bg-cover bg-center section-entrance`}
        data-section-id="lead-form"
        style={{ 
          backgroundImage: "url('/images/springleaf-residence/form-background.jpg')",
          opacity: animatedSections.has('lead-form') ? 1 : 0,
          transform: animatedSections.has('lead-form') ? 'translateY(0)' : 'translateY(60px)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-left">
            <Card className={`bg-white/20 backdrop-blur-sm text-white p-12 shadow-2xl border-0 rounded-xl hover:shadow-3xl transition-all duration-700 hover:scale-105 ${
              animatedSections.has('lead-form') ? 'animate-scale-in' : ''
            }`} style={{
              opacity: animatedSections.has('lead-form') ? 1 : 0,
              transform: animatedSections.has('lead-form') ? 'scale(1)' : 'scale(0.9)'
            }}>
              <h2 className="text-4xl font-bold mb-4 text-white text-center">Book Your Showflat Visit Today</h2>
              <p className="text-md mb-8 opacity-90 text-white text-center">
                Be the first to own a home that combines convenience, luxury, and nature. Register now for an exclusive preview of Springleaf Residence.
              </p>
              {submitError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {submitError}
                </div>
              )}
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                  Thank you for your interest! We will contact you soon to arrange your showflat visit.
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-white">
                    Full Name *
                  </label>
                  <Input 
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name" 
                    className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" 
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contactNumber" className="text-sm font-medium text-white">
                    Contact Number *
                  </label>
                  <Input 
                    id="contactNumber"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                    placeholder="Enter your contact number" 
                    className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" 
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="emailAddress" className="text-sm font-medium text-white">
                    Email Address *
                  </label>
                  <Input 
                    id="emailAddress"
                    type="email"
                    value={formData.emailAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, emailAddress: e.target.value }))}
                    placeholder="Enter your email address" 
                    className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" 
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Preferred Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white text-gray-800 border-0",
                          !formData.preferredDate && "text-gray-500"
                        )}
                        disabled={isSubmitting}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.preferredDate ? format(formData.preferredDate, "PPP") : <span>Select preferred date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border border-gray-200" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={formData.preferredDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, preferredDate: date }))}
                        initialFocus
                        defaultMonth={new Date(2025, 7, 1)} // August 2025 (month is 0-indexed, so 7 = August)
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label htmlFor="preferredTiming" className="text-sm font-medium text-white">
                    Preferred Time
                  </label>
                  <Select 
                    value={formData.preferredTiming}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTiming: value }))}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="preferredTiming" className="w-full bg-white text-gray-800 border-0">
                      <SelectValue placeholder="Select preferred time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      <SelectItem value="10:30-am">10:30 AM</SelectItem>
                      <SelectItem value="11:00-am">11:00 AM</SelectItem>
                      <SelectItem value="12:00-pm">12:00 PM</SelectItem>
                      <SelectItem value="1:00-pm">1:00 PM</SelectItem>
                      <SelectItem value="2:00-pm">2:00 PM</SelectItem>
                      <SelectItem value="3:00-pm">3:00 PM</SelectItem>
                      <SelectItem value="4:00-pm">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-center">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#ce001f] hover:bg-[#b3001a] px-12 py-3 text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      'Book Showflat Visit'
                    )}
                  </Button>
                  <p className="text-sm italic text-white-600 mt-4 text-center">
                    Upon registering, you agree to receive future marketing materials from KW Singapore. 
                    <br /> 
                    Your personal information will be used in accordance with our <a href="/privacy-policy" className="text-white hover:text-gray-300">privacy policy</a>.
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>


    </div>
  )
} 