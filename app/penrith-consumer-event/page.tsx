"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3"
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
  ArrowRight,
  X,
  Users,
  MapPinned,
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

// Site Map Form Component with reCAPTCHA
function SiteMapForm({ 
  onSubmit, 
  onClose, 
  isSubmitting, 
  submitSuccess, 
  submitError,
  executeRecaptcha
}: {
  onSubmit: (formData: any) => Promise<void>
  onClose: () => void
  isSubmitting: boolean
  submitSuccess: boolean
  submitError: string | null
  executeRecaptcha: (action: string) => Promise<string>
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    contactNumber: ''
  })
  const [isExecutingRecaptcha, setIsExecutingRecaptcha] = useState(false)
  const [securityScore, setSecurityScore] = useState<number | null>(null)
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters'
    }
    
    if (!formData.emailAddress.trim()) {
      errors.emailAddress = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      errors.emailAddress = 'Please enter a valid email address'
    }
    
    if (!formData.contactNumber.trim()) {
      errors.contactNumber = 'Contact number is required'
    } else if (!/^[\+]?[0-9\s\-\(\)]{8,}$/.test(formData.contactNumber)) {
      errors.contactNumber = 'Please enter a valid contact number'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors
    setFormErrors({})
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    if (!executeRecaptcha) {
      console.error('reCAPTCHA not available')
      setFormErrors({ general: 'Security verification not available. Please refresh the page.' })
      return
    }

    setIsExecutingRecaptcha(true)
    try {
      const token = await executeRecaptcha('site_map_request')
      
      // Simulate security score (in real implementation, this would come from the API)
      const mockScore = Math.random() * 0.3 + 0.7 // Score between 0.7 and 1.0
      setSecurityScore(mockScore)
      
      await onSubmit({ ...formData, recaptchaToken: token })
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error)
      setFormErrors({ general: 'Security verification failed. Please try again.' })
    } finally {
      setIsExecutingRecaptcha(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Request Site Map</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {submitError}
            </div>
          )}
          
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
              Thank you for your interest! We will contact you soon with the site map.
            </div>
          )}

          {formErrors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {formErrors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="siteMapFullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <Input
                id="siteMapFullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, fullName: e.target.value }))
                  if (formErrors.fullName) {
                    setFormErrors(prev => ({ ...prev, fullName: '' }))
                  }
                }}
                placeholder="Enter your full name"
                className={`w-full bg-gray-50 text-gray-900 placeholder:text-gray-500 transition-all duration-200 ${
                  formErrors.fullName 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20' 
                    : 'border-gray-300 focus:border-[#ce001f] focus:ring-[#ce001f] focus:ring-opacity-20'
                }`}
                required
                disabled={isSubmitting || isExecutingRecaptcha}
              />
              {formErrors.fullName && (
                <p className="mt-1 text-xs text-red-600">{formErrors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="siteMapEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                id="siteMapEmail"
                type="email"
                value={formData.emailAddress}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, emailAddress: e.target.value }))
                  if (formErrors.emailAddress) {
                    setFormErrors(prev => ({ ...prev, emailAddress: '' }))
                  }
                }}
                placeholder="Enter your email address"
                className={`w-full bg-gray-50 text-gray-900 placeholder:text-gray-500 transition-all duration-200 ${
                  formErrors.emailAddress 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20' 
                    : 'border-gray-300 focus:border-[#ce001f] focus:ring-[#ce001f] focus:ring-opacity-20'
                }`}
                required
                disabled={isSubmitting || isExecutingRecaptcha}
              />
              {formErrors.emailAddress && (
                <p className="mt-1 text-xs text-red-600">{formErrors.emailAddress}</p>
              )}
            </div>

            <div>
              <label htmlFor="siteMapPhone" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <Input
                id="siteMapPhone"
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, contactNumber: e.target.value }))
                  if (formErrors.contactNumber) {
                    setFormErrors(prev => ({ ...prev, contactNumber: '' }))
                  }
                }}
                placeholder="Enter your contact number"
                className={`w-full bg-gray-50 text-gray-900 placeholder:text-gray-500 transition-all duration-200 ${
                  formErrors.contactNumber 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-20' 
                    : 'border-gray-300 focus:border-[#ce001f] focus:ring-[#ce001f] focus:ring-opacity-20'
                }`}
                required
                disabled={isSubmitting || isExecutingRecaptcha}
              />
              {formErrors.contactNumber && (
                <p className="mt-1 text-xs text-red-600">{formErrors.contactNumber}</p>
              )}
            </div>

            {/* Enhanced reCAPTCHA Protection Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Protected by Google reCAPTCHA</p>
                    <p className="text-xs text-gray-600">Your information is secure and protected from bots</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {securityScore && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600 font-medium">
                        Score: {(securityScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            {(isExecutingRecaptcha || isSubmitting) && (
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700">
                    {isExecutingRecaptcha ? 'Security Verification' : 'Processing Request'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {isExecutingRecaptcha ? 'Step 1/2' : 'Step 2/2'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: isExecutingRecaptcha ? '50%' : '100%' }}
                  ></div>
                </div>
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || isExecutingRecaptcha}
                className={`w-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${
                  isExecutingRecaptcha 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700' 
                    : 'bg-gradient-to-r from-[#ce001f] to-[#b3001a] hover:from-[#b3001a] hover:to-[#a0001a]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting Request...
                  </>
                ) : isExecutingRecaptcha ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Verifying Security...
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 mr-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    Request Site Map
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function SpringleafResidenceLanding() {
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedFloorPlan, setSelectedFloorPlan] = useState("1br")
  const [isScrolled, setIsScrolled] = useState(false)
  const [date, setDate] = useState<Date>()
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set())
  const [showSiteMapPopup, setShowSiteMapPopup] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

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

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying) return

    const autoSlideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0))
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(autoSlideInterval)
  }, [isAutoPlaying])

  const projectImages = [
    "/images/penrith/penrith-hero-background.webp",
    "/images/penrith/penrith-exterior-view.webp",
    "/images/penrith/penrith-facilities.webp",
    "/images/penrith/penrith-drone-view.webp",
    "/images/penrith/penrith-balcony.webp",
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
    // TRANSPORT
    { icon: <Train className="w-6 h-6" />, name: "Queenstown MRT", distance: "🚶 4 min walk" },
    { icon: <Train className="w-6 h-6" />, name: "Outram Park MRT", distance: "🚇 3 stops" },
    { icon: <Train className="w-6 h-6" />, name: "Tanjong Pagar MRT", distance: "🚇 4 stops" },
    { icon: <Car className="w-6 h-6" />, name: "Orchard Road / CBD", distance: "🚗10–15 min drive" },
    { icon: <Car className="w-6 h-6" />, name: "AYE (Ayer Rajah Expressway)", distance: "🚗 2 min" },
    { icon: <Car className="w-6 h-6" />, name: "PIE (Pan Island Expressway)", distance: "🚗 5 min" },
    { icon: <Car className="w-6 h-6" />, name: "CTE (Central Expressway)", distance: "🚗 7 min" },
    
    // RETAIL AND F&B
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Queensway Shopping Centre", distance: "🚶 6 min" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "IKEA Alexandra", distance: "🚶 8 min" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Alexandra Central", distance: "🚶 7 min" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Anchorpoint", distance: "🚶 8 min" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Mei Ling Market & Food Centre", distance: "🚶 4 min" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Dawson Place", distance: "🚗 3 min" },
    
    // NATURE AND LEISURE
    { icon: <Trees className="w-6 h-6" />, name: "Alexandra Canal Linear Park", distance: "🚶 5 min" },
    { icon: <Trees className="w-6 h-6" />, name: "Rail Corridor (Alexandra stretch)", distance: "🚶 7 min" },
    { icon: <Trees className="w-6 h-6" />, name: "HortPark", distance: "🚗 8 min" },
    { icon: <Trees className="w-6 h-6" />, name: "Dempsey Hill dining & lifestyle", distance: "🚗 8 min" },
    { icon: <Trees className="w-6 h-6" />, name: "Labrador Nature Reserve", distance: "🚗 10 min" },
    { icon: <Trees className="w-6 h-6" />, name: "Botanic Gardens", distance: "🚗 10 min" },
    
    // EDUCATION
    { icon: <GraduationCap className="w-6 h-6" />, name: "Queenstown Primary School", distance: "🚶 6 min" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Queenstown Secondary School", distance: "🚶 8 min" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Queensway Secondary School", distance: "🚶 9 min" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Alexandra Primary School", distance: "🚗 5 min" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Gan Eng Seng Primary School", distance: "🚗 7 min" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "New Town Primary School", distance: "🚗 8 min" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "ACS International", distance: "🚗 10 min" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Invictus International / Melbourne International", distance: "🚗 12 min" },
    
    // HEALTHCARE
    { icon: <Hospital className="w-6 h-6" />, name: "Alexandra Hospital", distance: "🚗 6 min" },
    { icon: <Hospital className="w-6 h-6" />, name: "National University Hospital (NUH)", distance: "🚗 10 min" },
    { icon: <Hospital className="w-6 h-6" />, name: "Gleneagles Hospital", distance: "🚗 12 min" },
    { icon: <Hospital className="w-6 h-6" />, name: "Khoo Teck Puat Hospital", distance: "🚇 8 stops / 🚗 18 min" },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

  const scrollToLeadForm = () => {
    const leadFormSection = document.getElementById('event-registration')
    if (leadFormSection) {
      leadFormSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToEventInfo = () => {
    const projectInfoSection = document.getElementById('event-info')
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

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('project-gallery')
    if (gallerySection) {
      gallerySection.scrollIntoView({ 
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
  const [isExecutingRecaptcha, setIsExecutingRecaptcha] = useState(false)
  const [securityScore, setSecurityScore] = useState<number | null>(null)

  const [isSiteMapSubmitting, setIsSiteMapSubmitting] = useState(false)
  const [siteMapSubmitSuccess, setSiteMapSubmitSuccess] = useState(false)
  const [siteMapSubmitError, setSiteMapSubmitError] = useState<string | null>(null)

  // Event form state
  const [eventFormData, setEventFormData] = useState({
    fullName: '',
    contactNumber: '',
    emailAddress: '',
    numberOfPax: '1',
    plbConsultant: ''
  })
  const [isEventSubmitting, setIsEventSubmitting] = useState(false)
  const [eventSubmitSuccess, setEventSubmitSuccess] = useState(false)
  const [eventSubmitError, setEventSubmitError] = useState<string | null>(null)

  const { executeRecaptcha } = useGoogleReCaptcha()

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

    if (!executeRecaptcha) {
      console.error('reCAPTCHA not available')
      setSubmitError('Security verification not available. Please refresh the page.')
      toast({
        title: "Security Error",
        description: "Security verification not available. Please refresh the page.",
        variant: "destructive",
      })
      return
    }

    setIsExecutingRecaptcha(true)
    setSubmitError(null)

    try {
      const token = await executeRecaptcha('showflat_visit_request')
      
      // Simulate security score (in real implementation, this would come from the API)
      const mockScore = Math.random() * 0.3 + 0.7 // Score between 0.7 and 1.0
      setSecurityScore(mockScore)
      
      setIsSubmitting(true)

      // Show submitting toast
      toast({
        title: "Submitting...",
        description: "Please wait while we process your request",
      })

      const response = await fetch('/api/springleaf-residence-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
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
          description: "Thank you for your interest in Penrith! We have sent you a confirmation email and our team will contact you soon to arrange your showflat visit.",
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
      setIsExecutingRecaptcha(false)
    }
  }

  const handleSiteMapFormSubmit = async (formDataWithToken: any) => {
    const { fullName, emailAddress, contactNumber, recaptchaToken } = formDataWithToken
    
    // Validate required fields
    if (!fullName.trim() || !emailAddress.trim() || !contactNumber.trim()) {
      setSiteMapSubmitError('Full name, email address, and contact number are required')
      toast({
        title: "Validation Error",
        description: "Full name, email address, and contact number are required",
        variant: "destructive",
      })
      return
    }

    // Validate reCAPTCHA
    if (!recaptchaToken) {
      setSiteMapSubmitError('Please complete the reCAPTCHA verification')
      toast({
        title: "Validation Error",
        description: "Please complete the reCAPTCHA verification",
        variant: "destructive",
      })
      return
    }

    setIsSiteMapSubmitting(true)
    setSiteMapSubmitError(null)

    // Show submitting toast
    toast({
      title: "Submitting...",
      description: "Please wait while we process your request",
    })

    try {
      const response = await fetch('/api/site-map-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          emailAddress,
          contactNumber,
          recaptchaToken
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSiteMapSubmitSuccess(true)
        // Show success toast
        toast({
          title: "Request Submitted Successfully!",
          description: "Thank you for your interest! We have sent you a confirmation email and our team will contact you soon with the site map.",
          variant: "default",
        })
        
        // Close popup after 3 seconds
        setTimeout(() => {
          setShowSiteMapPopup(false)
          setSiteMapSubmitSuccess(false)
        }, 3000)
      } else {
        throw new Error(result.error || 'Failed to submit form')
      }
    } catch (error) {
      console.error('Site map form submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form. Please try again.'
      setSiteMapSubmitError(errorMessage)
      
      // Show error toast
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSiteMapSubmitting(false)
    }
  }

  const handleEventFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!eventFormData.fullName.trim() || !eventFormData.contactNumber.trim() || !eventFormData.emailAddress.trim()) {
      setEventSubmitError('Full name, contact number, and email address are required')
      toast({
        title: "Validation Error",
        description: "Full name, contact number, and email address are required",
        variant: "destructive",
      })
      return
    }

    setIsEventSubmitting(true)
    setEventSubmitError(null)

    try {
      // Show submitting toast
      toast({
        title: "Submitting...",
        description: "Please wait while we process your registration",
      })

      const response = await fetch('/api/penrith-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventFormData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setEventSubmitSuccess(true)
        setEventFormData({
          fullName: '',
          contactNumber: '',
          emailAddress: '',
          numberOfPax: '1',
          plbConsultant: ''
        })
        
        // Show success toast
        toast({
          title: "Registration Successful!",
          description: "Thank you for registering for the Penrith Event! We will contact you soon with event details.",
          variant: "default",
        })
        
        // Reset success state after 5 seconds
        setTimeout(() => {
          setEventSubmitSuccess(false)
        }, 5000)
      } else {
        throw new Error(result.error || 'Failed to submit registration')
      }
    } catch (error) {
      console.error('Event form submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit registration. Please try again.'
      setEventSubmitError(errorMessage)
      
      // Show error toast
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsEventSubmitting(false)
    }
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <div className="min-h-screen bg-[#1c1c1d] text-white">
        <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      {/* Sticky CTA for Mobile */}
      {/* <div className={`fixed bottom-0 left-0 right-0 bg-[#ce001f] text-white p-4 z-50 md:hidden transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <Button 
          className="w-full bg-white text-[#ce001f] hover:bg-gray-100 font-semibold"
          onClick={scrollToLeadForm}
        >
          Book Your Showflat Visit
        </Button>
      </div> */}

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          isScrolled ? 'bg-[#1c1c1d] shadow-sm border-b border-gray-700' : 'bg-transparent'
        } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/" aria-label="Go to homepage" className="flex items-center space-x-2">
                <Image
                  src="/images/kwsingapore-logo.webp"
                  alt="KW Singapore Logo"
                  width={300}
                  height={100}
                  className="h-12 w-auto"
                />
              </Link>
            </div>
              <nav className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={scrollToEventInfo}
                  className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                >
                  Event Info
                </button>
                {/* <a href="#floor-plans" className="text-white hover:text-[#ce001f] transition-colors duration-300">
                  Floor Plans
                </a> */}
                <button 
                  onClick={() => window.open('/penrith', '_blank', 'noopener,noreferrer')}
                  className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                >
                  Project Info
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
                  In-Person Analysis Seminar
                </Button>
              </nav>
          </div>
        </div>
      </header>

      {/* Clean Modern Hero Section */}
      <section className="relative min-h-screen md:min-h-0 md:h-[50vh] lg:min-h-screen lg:h-auto flex items-center justify-center">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/penrith/penrith-hero-background.webp"
            alt="Penrith Hero"
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
            <div className={`mb-2 sm:mb-2 md:mb-2 transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Badge className="bg-[#ce001f] text-white px-4 py-2 text-sm font-medium rounded-full animate-pulse">
                OFFICIAL PREVIEW LAUNCH OCT 2025
              </Badge>
            </div>

            {/* Clean Typography */}
            <div className={`mb-4 sm:mb-2 md:mb-2 lg:mb-6 transition-all duration-700 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 sm:mb-2 md:mb-2 lg:mb-4 leading-tight">
                <span className={`transition-all duration-1000 delay-900 ${isVisible ? 'animate-fade-in-left' : ''}`}>PENRITH</span>
              </h1>

              <div className={`flex items-center mb-2 sm:mb-2 md:mb-2 lg:mb-4 transition-all duration-700 delay-1300 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                <div className="w-12 h-px bg-[#ce001f] mr-4"></div>
                <p className="text-lg text-gray-200 font-light">District 3, Queenstown</p>
              </div>

              <p className={`text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-4 sm:mb-2 md:mb-2 lg:mb-6 transition-all duration-700 delay-1500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                The Margaret Drive Address That Brings You Closer to Everything
              </p>
            </div>

            {/* Clean CTA Buttons Hero */}
            <div className={`w-full pl-0 pr-2 sm:pl-0 sm:pr-6 md:pl-0 md:pr-8 mb-4 sm:mb-4 md:mb-4 lg:mb-8 transition-all duration-700 delay-1700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Button 
                className={`inline-flex w-auto items-center justify-start text-left bg-[#ce001f] hover:bg-[#b3001a] text-white px-2 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 hover-lift flex-shrink-0 ${isVisible ? 'animate-pulse-glow' : ''}`}
                onClick={scrollToLeadForm}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Book Your Seat
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

      {/* Event Section */}
      <section id="event-info" className="relative py-12 sm:py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('/images/event/mega-summit.webp')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Centered Title */}
          <motion.h2 
            className="font-light mb-12 font-sans text-2xl sm:text-3xl md:text-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="text-white">
              <span className="font-bold">Mastering New Launch Investments:</span>
              <br /> 6 Strategies to Identify the Best Entry Points in 2025 In a 2025 New Launch
            </span>
            <span className="block text-[#B40101] italic">
              Featuring Penrith
            </span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image Column - Always first on mobile, left on desktop */}
            <motion.div 
              className="relative order-1 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative">
                <img
                  src="/images/penrith/penrith-seminar.webp"
                  alt="Penrith Event"
                  className="w-full h-auto rounded-lg shadow-2xl object-contain md:object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
              </div>
            </motion.div>

            {/* Content Column - Always second on mobile, right on desktop */}
            <motion.div 
              className="order-2 lg:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-8"
              >
                <ul className="text-base md:text-md leading-relaxed space-y-2">
                  <li>• 6 Proven Strategies for Identifying the Optimal Entry Price in 2025 New Launches</li>
                  <li>• 7 High-Yield Investment Opportunities at Penrith with Maximum Upside Potential</li>
                  <li>• How to Map Your Exit Strategy and Analyse Buyer Demand for Maximum Returns</li>
                </ul>
              </motion.div>

              <motion.div 
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-[#B40101]" />
                  <span className="text-slate-100">08 October 2025, Wednesday</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-[#B40101]" />
                  <span className="text-white/80">07:00 PM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinned className="h-5 w-5 text-[#B40101]" />
                  <button
                    type="button"
                    className="text-slate-100 underline-offset-2 hover:underline cursor-pointer text-left"
                    onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Penrith Showflat, 6A Margaret Drive, Singapore 142006
                  </button>
                </div>
              </motion.div>
              
            </motion.div>
          </div>

          {/* Event Registration Form - Centered below content */}
          <motion.div id="event-registration"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <Card className="bg-white/10 backdrop-blur-sm text-white p-6 md:p-8 shadow-2xl border border-white/20 rounded-xl">
              <h3 className="text-2xl font-medium mb-6 text-center text-white">
                Join us LIVE for an in-person seminar!
              </h3>
              
              {eventSubmitError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {eventSubmitError}
                </div>
              )}
              
              {eventSubmitSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                  Thank you for registering! We will contact you soon with event details.
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleEventFormSubmit}>
                <div className="space-y-2">
                  <label htmlFor="eventFullName" className="text-sm font-medium text-white">
                    Full Name *
                  </label>
                  <Input 
                    id="eventFullName"
                    value={eventFormData.fullName}
                    onChange={(e) => setEventFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name" 
                    className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" 
                    required
                    disabled={isEventSubmitting}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="eventContactNumber" className="text-sm font-medium text-white">
                      Contact Number *
                    </label>
                    <Input 
                      id="eventContactNumber"
                      value={eventFormData.contactNumber}
                      onChange={(e) => setEventFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                      placeholder="Enter your contact number" 
                      className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" 
                      required
                      disabled={isEventSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="eventEmailAddress" className="text-sm font-medium text-white">
                      Email Address *
                    </label>
                    <Input 
                      id="eventEmailAddress"
                      type="email"
                      value={eventFormData.emailAddress}
                      onChange={(e) => setEventFormData(prev => ({ ...prev, emailAddress: e.target.value }))}
                      placeholder="Enter your email address" 
                      className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" 
                      required
                      disabled={isEventSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="eventNumberOfPax" className="text-sm font-medium text-white">
                    No. of Pax *
                  </label>
                  <select
                    id="eventNumberOfPax"
                    value={eventFormData.numberOfPax}
                    onChange={(e) => setEventFormData(prev => ({ ...prev, numberOfPax: e.target.value }))}
                    className="w-full bg-white text-gray-800 border-0 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B40101] disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                    disabled={isEventSubmitting}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="eventPlbConsultant" className="text-sm font-medium text-white">
                    Name of KW Singapore or PLB Consultant *
                  </label>
                  <Input 
                    id="eventPlbConsultant"
                    value={eventFormData.plbConsultant}
                    onChange={(e) => setEventFormData(prev => ({ ...prev, plbConsultant: e.target.value }))}
                    placeholder="Name of KW Singapore or PLB Consultant" 
                    className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" 
                    required
                    disabled={isEventSubmitting}
                  />
                  <p className="text-xs text-white/70 italic">
                    *Please indicate NA if you are not connected to one of our KW Singapore or PLB consultants.
                  </p>
                </div>

                <div className="text-center">
                  <Button 
                    type="submit"
                    disabled={isEventSubmitting}
                    className="w-full bg-[#B40101] hover:bg-[#B40101]/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isEventSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5 mr-2" />
                        Secure My Spot!
                      </>
                    )}
                  </Button>
                  <p className="text-sm italic text-white/70 mt-4 text-center">
                    Upon registering, you agree to receive future marketing materials from KW Singapore. 
                    <br /> 
                    Your personal information will be used in accordance with our <a href="/privacy-policy" className="text-white hover:text-gray-300">privacy policy</a>.
                  </p>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Location */}
       <section 
         id="nearby-amenities"
         className="pt-8 md:pt-12 pb-16 bg-[#1c1c1d] section-entrance"
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
            <h2 className="text-3xl font-light mb-3 text-white text-center tracking-wide">How to Get There</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-xl text-gray-300">Penrith Showflat, 6A Margaret Drive, Singapore 142006</p>
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
                {/* Location Maps */}
                <div className="w-full rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.791583198789!2d103.8036607!3d1.2998703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1a398d401fdf%3A0x4a7deba39eca40a7!2s6A%20Margaret%20Dr%2C%20Singapore%20142006!5e0!3m2!1sen!2sid!4v1758191086855!5m2!1sen!2sid"
                    width="800"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[450px]"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                   <div className="flex items-center space-x-3">
                     <Button 
                       className="inline-flex items-center gap-2 bg-[#ce001f] hover:bg-[#b3001a] text-white px-4 py-2 rounded-md transition-colors"
                       onClick={() => window.open('https://maps.google.com/maps/dir//Penrith+Condo+498+Margaret+Dr+Singapore+149308/@1.2967344,103.8086402,15z/data=!4m5!4m4!1m0!1m2!1m1!1s0x31da1b590c541b6f:0xdcd4bd3dc6253e2', '_blank', 'noopener,noreferrer')}
                     >
                       <Car className="w-4 h-4" />
                       Get Direction
                     </Button>
                   </div>
                </div>
              </CardContent>
            </Card>
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
            Explore the untapped potential
            <span className="block text-[#B40101] italic">of Penrith</span>
            <span className="block">Are You Ready?</span>
          </h2>

          <Button
            size="lg"
            className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg md:text-xl font-semibold transition-all duration-300 hover:scale-105 group"
            onClick={() => window.open('/penrith', '_blank', 'noopener,noreferrer')}
          >
            Find Out More
            <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Site Map Request Popup */}
      {showSiteMapPopup && executeRecaptcha && (
        <SiteMapForm
          onSubmit={handleSiteMapFormSubmit}
          onClose={() => setShowSiteMapPopup(false)}
          isSubmitting={isSiteMapSubmitting}
          submitSuccess={siteMapSubmitSuccess}
          submitError={siteMapSubmitError}
          executeRecaptcha={executeRecaptcha}
        />
      )}


      </div>
    </GoogleReCaptchaProvider>
  )
} 