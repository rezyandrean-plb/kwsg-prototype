"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
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
  X,
  Bath,
  Layout,
  Image as ImageIcon,
  Maximize2,
} from "lucide-react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

// Site Plan Form Component with reCAPTCHA
function SiteMapForm({ 
  onSubmit, 
  onClose, 
  isSubmitting, 
  submitSuccess, 
  submitError 
}: {
  onSubmit: (formData: any) => Promise<void>
  onClose: () => void
  isSubmitting: boolean
  submitSuccess: boolean
  submitError: string | null
}) {
  const { executeRecaptcha } = useGoogleReCaptcha()
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
            <h2 className="text-2xl font-bold text-gray-900">Request Site Map & Floor Plan</h2>
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
              Thank you for your interest! We will contact you soon with the site map and floor plan.
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
                    Request Site Map & Floor Plan
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

// Lead Generation Form Component with reCAPTCHA
function LeadGenerationForm({ 
  formData, 
  setFormData, 
  date, 
  setDate, 
  onSubmit, 
  isSubmitting, 
  submitSuccess, 
  submitError 
}: {
  formData: any
  setFormData: (data: any) => void
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  onSubmit: (formDataWithToken: any) => Promise<void>
  isSubmitting: boolean
  submitSuccess: boolean
  submitError: string | null
}) {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [isExecutingRecaptcha, setIsExecutingRecaptcha] = useState(false)
  const [securityScore, setSecurityScore] = useState<number | null>(null)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.fullName.trim() || !formData.contactNumber.trim()) {
      return
    }

    if (!executeRecaptcha) {
      console.error('reCAPTCHA not available')
      return
    }

    setIsExecutingRecaptcha(true)

    try {
      const token = await executeRecaptcha('showflat_visit_request')
      
      // Simulate security score (in real implementation, this would come from the API)
      const mockScore = Math.random() * 0.3 + 0.7 // Score between 0.7 and 1.0
      setSecurityScore(mockScore)
      
      await onSubmit({ ...formData, recaptchaToken: token })
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error)
    } finally {
      setIsExecutingRecaptcha(false)
    }
  }

  return (
    <Card className={`bg-white/20 backdrop-blur-sm text-white p-4 sm:p-6 md:p-12 shadow-2xl border-0 rounded-xl hover:shadow-3xl transition-all duration-700 hover:scale-105`}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white text-center">Book Your Showflat Visit Today</h2>
      <p className="text-sm sm:text-base md:text-md mb-6 sm:mb-8 opacity-90 text-white text-center">
        Be the first to own a home that combines convenience, luxury, and nature. Register now for an exclusive preview of Aurea & The Golden Mile.
      </p>
      {submitError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {submitError}
        </div>
      )}
      
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
          Thank you for your interest in Aurea! We will contact you soon to arrange your showflat visit.
        </div>
      )}
      
      <form className="space-y-4 sm:space-y-6" onSubmit={handleFormSubmit}>
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium text-white">
            Full Name *
          </label>
          <Input 
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, fullName: e.target.value }))}
            placeholder="Enter your full name" 
            className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" 
            required
            disabled={isSubmitting || isExecutingRecaptcha}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contactNumber" className="text-sm font-medium text-white">
            Contact Number *
          </label>
          <Input 
            id="contactNumber"
            value={formData.contactNumber}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, contactNumber: e.target.value }))}
            placeholder="Enter your contact number" 
            className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" 
            required
            disabled={isSubmitting || isExecutingRecaptcha}
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
            onChange={(e) => setFormData((prev: any) => ({ ...prev, emailAddress: e.target.value }))}
            placeholder="Enter your email address" 
            className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" 
            required
            disabled={isSubmitting || isExecutingRecaptcha}
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
                disabled={isSubmitting || isExecutingRecaptcha}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.preferredDate ? format(formData.preferredDate, "PPP") : <span>Select preferred date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white border border-gray-200" align="start">
              <CalendarComponent
                mode="single"
                selected={formData.preferredDate}
                onSelect={(date) => setFormData((prev: any) => ({ ...prev, preferredDate: date }))}
                initialFocus
                defaultMonth={new Date()} // Current month
                disabled={(date) => {
                  // Disable past dates (yesterday or more past)
                  const today = new Date();
                  today.setHours(0, 0, 0, 0); // Reset time to start of day
                  return date < today;
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <label htmlFor="projectType" className="text-sm font-medium text-white">
            Project Type
          </label>
          <Select 
            value={formData.projectType}
            onValueChange={(value) => setFormData((prev: any) => ({ ...prev, projectType: value }))}
            disabled={isSubmitting || isExecutingRecaptcha}
          >
            <SelectTrigger id="projectType" className="w-full bg-white text-gray-800 border-0">
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="Aurea">Aurea</SelectItem>
              <SelectItem value="The Golden Mile">The Golden Mile</SelectItem>
              <SelectItem value="Aurea & The Golden Mile">Aurea & The Golden Mile</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="preferredTiming" className="text-sm font-medium text-white">
            Preferred Time
          </label>
          <Select 
            value={formData.preferredTiming}
            onValueChange={(value) => setFormData((prev: any) => ({ ...prev, preferredTiming: value }))}
            disabled={isSubmitting || isExecutingRecaptcha}
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
        {/* Enhanced reCAPTCHA Protection Notice */}
        <div className="bg-gradient-to-r from-blue-50/20 to-indigo-50/20 border border-blue-200/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Protected by Google reCAPTCHA</p>
                <p className="text-xs text-gray-300">Your information is secure and protected from bots</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {securityScore && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-400 font-medium">
                    Score: {(securityScore * 100).toFixed(0)}%
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
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
                Book Showflat Visit
              </>
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
  )
}

export default function AureaLanding() {
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentCombinedGalleryIndex, setCurrentCombinedGalleryIndex] = useState(0)
  const [currentGoldenMileImageIndex, setCurrentGoldenMileImageIndex] = useState(0)
  const [isCombinedGalleryPaused, setIsCombinedGalleryPaused] = useState(false)
  const [combinedGalleryFade, setCombinedGalleryFade] = useState(false)
  const [isAureaGalleryPaused, setIsAureaGalleryPaused] = useState(false)
  const [aureaGalleryFade, setAureaGalleryFade] = useState(false)
  const [isGoldenMileGalleryPaused, setIsGoldenMileGalleryPaused] = useState(false)
  const [goldenMileGalleryFade, setGoldenMileGalleryFade] = useState(false)
  const [selectedFloorPlan, setSelectedFloorPlan] = useState("1br")
  const [isScrolled, setIsScrolled] = useState(false)
  const [date, setDate] = useState<Date>()
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set())
  const [showSiteMapPopup, setShowSiteMapPopup] = useState(false)
  const [unitsActiveTab, setUnitsActiveTab] = useState(0)
  const [floorPlanIndex, setFloorPlanIndex] = useState(0)
  const [goldenMileUnitsActiveTab, setGoldenMileUnitsActiveTab] = useState(0)
  const [goldenMileFloorPlanIndex, setGoldenMileFloorPlanIndex] = useState(0)
  const [showFloorPlanDialog, setShowFloorPlanDialog] = useState(false)
  const [selectedFloorPlanImage, setSelectedFloorPlanImage] = useState<string>("")
  const [showGoldenMileFloorPlanDialog, setShowGoldenMileFloorPlanDialog] = useState(false)
  const [selectedGoldenMileFloorPlanImage, setSelectedGoldenMileFloorPlanImage] = useState<string>("")
  const [currentAureaSitePlanIndex, setCurrentAureaSitePlanIndex] = useState(0)
  
  // Aurea Site Plan Images
  const aureaSitePlanImages = [
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-siteplan/Aurea_SitePlan_L03.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-siteplan/Aurea_SitePlan_L17.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-siteplan/Aurea_SitePlan_L33.jpg"
  ]
  
  // Navigation functions for Aurea Site Plan
  const nextAureaSitePlan = () => {
    setCurrentAureaSitePlanIndex((prev) => (prev + 1) % aureaSitePlanImages.length)
  }
  
  const prevAureaSitePlan = () => {
    setCurrentAureaSitePlanIndex((prev) => (prev - 1 + aureaSitePlanImages.length) % aureaSitePlanImages.length)
  }

  useEffect(() => {
    setFloorPlanIndex(0)
  }, [unitsActiveTab])

  useEffect(() => {
    setGoldenMileFloorPlanIndex(0)
  }, [goldenMileUnitsActiveTab])

  const generateFloorPlanCandidates = (subtype: any, unitType: string) => {
    const base = '/images/aurea/floor-plan/'
    const candidates: string[] = []

    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const ut = normalize(unitType.replace(' Units', ''))
    const st = normalize(subtype?.subtype || '')

    // Derive human-readable bedroom label like "2 Bedroom"
    const extractBedroomLabel = (raw: string) => {
      const m = raw.match(/(\d+)\s*-?\s*bedroom/i)
      if (m) return `${m[1]} Bedroom`
      // try unitType too
      const m2 = unitType.match(/(\d+)\s*-?\s*bedroom/i)
      if (m2) return `${m2[1]} Bedroom`
      return ''
    }
    const bedroomLabel = extractBedroomLabel(subtype?.subtype || unitType)
    const safeBedroomLabel = bedroomLabel // keep spaces as filenames have spaces

    // Specific "Type" patterns e.g. "2 Bedroom - Type B1.jpg" (put FIRST, prioritize jpg)
    if (bedroomLabel) {
      const typeLetters = ['A','B','C','D','E','F']
      const extsPriority = ['jpg', 'jpeg', 'png', 'webp']
      for (const L of typeLetters) {
        for (let n = 1; n <= 9; n++) {
          for (const ext of extsPriority) {
            candidates.push(`${base}${bedroomLabel} - Type ${L}${n}.${ext}`)
            // Include variants with trailing letter (e.g., B1H)
            candidates.push(`${base}${bedroomLabel} - Type ${L}${n}H.${ext}`)
          }
        }
      }
    }

    // Common patterns
    const patterns = [
      st,
      ut,
      st.replace('bedroom-', 'br-'),
      ut.replace('bedroom-', 'br-'),
      st.replace(' ', '-'),
      // also push human label without normalization (to match filenames with spaces)
      safeBedroomLabel,
    ].filter(Boolean)

    // Build numbered variants (prioritize jpg)
    for (const p of patterns) {
      if (!p) continue
      const exts = ['jpg', 'jpeg', 'png', 'webp']
      for (const ext of exts) {
        candidates.push(`${base}${p}.${ext}`)
      }
      for (let i = 1; i <= 9; i++) {
        for (const ext of exts) {
          candidates.push(`${base}${p}-${i}.${ext}`)
          candidates.push(`${base}${p} ${i}.${ext}`)
        }
      }
    }

    // Fallback to any explicit image on subtype
    if (subtype?.floor_plan_image) {
      candidates.unshift(subtype.floor_plan_image)
    }

    // De-duplicate while preserving order
    const seen = new Set<string>()
    return candidates.filter((c) => (seen.has(c) ? false : (seen.add(c), true)))
  }

  useEffect(() => {
    // Set page title
    document.title = 'Aurea + The Golden Mile - KW Singapore'
    
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

  const [projectImages] = useState<string[]>([
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View04.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View06.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View08.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View09.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View12.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View13.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View17.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View19.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View22.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View23.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View24.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View25.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View26.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View32.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-gallery/R-View35.jpg",
  ])
  const [goldenMileImages] = useState<string[]>([
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/the-golden-mile-gallery/LR_The+Golden+Mile+-+1.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/the-golden-mile-gallery/LR_The+Golden+Mile+-+2.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/the-golden-mile-gallery/LR_The+Golden+Mile+-+3.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/the-golden-mile-gallery/LR_The+Golden+Mile+-+4.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/the-golden-mile-gallery/LR_The+Golden+Mile+-+5.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/the-golden-mile-gallery/LR_The+Golden+Mile+-+6.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/the-golden-mile-gallery/LR_The+Golden+Mile+-+7.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/the-golden-mile-gallery/LR_The+Golden+Mile+-+8.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/the-golden-mile-gallery/LR_The+Golden+Mile+-+9.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/the-golden-mile-gallery/LR_The+Golden+Mile+-+10.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/the-golden-mile-gallery/LR_The+Golden+Mile+-+11.jpg",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/the-golden-mile-gallery/LR_The+Golden+Mile+-+12.jpg",
  ])
  const [combinedGalleryImages, setCombinedGalleryImages] = useState<string[]>([
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/gallery/R-View03.webp",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/gallery/R-View07.webp",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/gallery/R-View15.webp",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/gallery/R-View16.webp",
    "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/gallery/R-View34.webp",
  ])

  // Refs to track timeouts for cleanup
  const combinedGalleryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const aureaGalleryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const goldenMileGalleryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-slide for Combined Gallery
  useEffect(() => {
    if (isCombinedGalleryPaused || combinedGalleryImages.length === 0) return

    const interval = setInterval(() => {
      setCombinedGalleryFade(true)
      combinedGalleryTimeoutRef.current = setTimeout(() => {
        setCurrentCombinedGalleryIndex((prev) => (prev + 1) % combinedGalleryImages.length)
        setCombinedGalleryFade(false)
        combinedGalleryTimeoutRef.current = null
      }, 300) // Half of transition duration
    }, 4000) // Change image every 4 seconds

    return () => {
      clearInterval(interval)
      if (combinedGalleryTimeoutRef.current) {
        clearTimeout(combinedGalleryTimeoutRef.current)
        combinedGalleryTimeoutRef.current = null
      }
    }
  }, [isCombinedGalleryPaused, combinedGalleryImages.length])

  // Auto-slide for Aurea Gallery
  useEffect(() => {
    if (isAureaGalleryPaused || projectImages.length === 0) return

    const interval = setInterval(() => {
      setAureaGalleryFade(true)
      aureaGalleryTimeoutRef.current = setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
        setAureaGalleryFade(false)
        aureaGalleryTimeoutRef.current = null
      }, 300) // Half of transition duration
    }, 4000) // Change image every 4 seconds

    return () => {
      clearInterval(interval)
      if (aureaGalleryTimeoutRef.current) {
        clearTimeout(aureaGalleryTimeoutRef.current)
        aureaGalleryTimeoutRef.current = null
      }
    }
  }, [isAureaGalleryPaused, projectImages.length])

  // Auto-slide for The Golden Mile Gallery
  useEffect(() => {
    if (isGoldenMileGalleryPaused || goldenMileImages.length === 0) return

    const interval = setInterval(() => {
      setGoldenMileGalleryFade(true)
      goldenMileGalleryTimeoutRef.current = setTimeout(() => {
        setCurrentGoldenMileImageIndex((prev) => (prev + 1) % goldenMileImages.length)
        setGoldenMileGalleryFade(false)
        goldenMileGalleryTimeoutRef.current = null
      }, 300) // Half of transition duration
    }, 4000) // Change image every 4 seconds

    return () => {
      clearInterval(interval)
      if (goldenMileGalleryTimeoutRef.current) {
        clearTimeout(goldenMileGalleryTimeoutRef.current)
        goldenMileGalleryTimeoutRef.current = null
      }
    }
  }, [isGoldenMileGalleryPaused, goldenMileImages.length])

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
    // MRT & CONNECTIVITY
    { icon: <Train className="w-6 h-6" />, name: "Nicoll Highway MRT (Circle Line)", distance: "5 mins' walk (~0.4 km)", category: "Transport" },
    { icon: <Train className="w-6 h-6" />, name: "Lavender MRT (East-West Line)", distance: "9 mins' walk (~0.8 km)", category: "Transport" },
    { icon: <Train className="w-6 h-6" />, name: "Major Expressways (ECP, KPE, Nicoll Highway)", distance: "Quick Access", category: "Transport" },
    
    // SHOPPING & LIFESTYLE
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Golden Mile Food Centre", distance: "2 mins' walk (~0.2 km)", category: "Retail & F&B" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Kampong Glam Heritage District", distance: "9 mins' walk (~0.8 km)", category: "Retail & F&B" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Bugis Junction", distance: "3 mins' drive", category: "Retail & F&B" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Raffles City / Suntec City", distance: "3–4 mins' drive", category: "Retail & F&B" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Suntec Singapore Convention & Exhibition Centre", distance: "4-Min Drive", category: "Retail & F&B" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "The Shoppes at Marina Bay Sands", distance: "6 mins' drive", category: "Retail & F&B" },
    
    // PARKS & RECREATION
    { icon: <Trees className="w-6 h-6" />, name: "Kallang Riverside Park", distance: "3 mins' walk (~0.3 km)", category: "Nature & Leisure" },
    { icon: <Trees className="w-6 h-6" />, name: "Esplanade – Theatres on the Bay", distance: "5 mins' drive", category: "Nature & Leisure" },
    { icon: <Trees className="w-6 h-6" />, name: "Sands Expo and Convention Centre", distance: "5-Min Drive", category: "Nature & Leisure" },
    { icon: <Trees className="w-6 h-6" />, name: "Gardens by the Bay", distance: "9 mins' drive", category: "Nature & Leisure" },
    { icon: <Trees className="w-6 h-6" />, name: "Singapore Sports Hub & Indoor Stadium", distance: "9 mins' drive", category: "Nature & Leisure" },
    
    // SCHOOLS & EDUCATION
    { icon: <GraduationCap className="w-6 h-6" />, name: "HWA International School - MSQ Campus", distance: "3 mins' drive", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Nanyang Academy of Fine Arts (NAFA) Bencoolen", distance: "3 mins' drive", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Singapore Management University (SMU)", distance: "4 mins' drive", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "LASALLE College of the Arts / NAFA", distance: "3–4 mins' drive", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Farrer Park Primary School", distance: "6 mins' drive", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Anglo-Chinese School (Junior)", distance: "7 mins' drive", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Dunman High School", distance: "8 mins' drive", category: "Education" },
    
    // MEDICAL
    { icon: <Hospital className="w-6 h-6" />, name: "Raffles Hospital", distance: "2 mins' drive", category: "Healthcare" },
    { icon: <Hospital className="w-6 h-6" />, name: "Farrer Park Hospital", distance: "4 mins' drive", category: "Healthcare" },
    { icon: <Hospital className="w-6 h-6" />, name: "Mount Elizabeth Hospital", distance: "11 mins' drive", category: "Healthcare" },
    { icon: <Hospital className="w-6 h-6" />, name: "Singapore General Hospital", distance: "11 mins' drive", category: "Healthcare" },
  ]

  // Mock data for Aurea units and pricing
  const aureaUnitPricing = [
    {
      unitType: "2-Bedroom",
      subtypes: [
        {
          subtype: "2-Bedroom",
          bedrooms: 2,
          bathrooms: 2,
          size: "635 - 710 sqft",
          price: "From $1,765,000",
          price_per_sqft: "From $2,780",
          currency: "SGD",
          total: 84,
          available: 68,
          status: 50,
          floor_plan_images: [
            "/images/aurea/floor-plan/2 Bedroom - Type B1.jpg",
            "/images/aurea/floor-plan/2 Bedroom - Type B1H.jpg",
            "/images/aurea/floor-plan/2 Bedroom - Type B2.jpg",
            "/images/aurea/floor-plan/2 Bedroom - Type B2H.jpg",
            "/images/aurea/floor-plan/2 Bedroom - Type B3.jpg",
            "/images/aurea/floor-plan/2 Bedroom - Type B3H.jpg"
          ],
          payment_terms: "20% Down Payment",
          discount_info: "Launch Collection"
        }
      ]
    },
    {
      unitType: "3-Bedroom",
      subtypes: [
        {
          subtype: "3-Bedroom",
          bedrooms: 3,
          bathrooms: 2,
          size: "1,001 sqft",
          price: "From $2,632,000",
          price_per_sqft: "From $2,629",
          currency: "SGD",
          total: 70,
          available: 21,
          status: 28,
          floor_plan_images: [
            "/images/aurea/floor-plan/3 Bedroom - Type C1.jpg",
            "/images/aurea/floor-plan/3 Bedroom - Type C1H.jpg"
          ],
          payment_terms: "20% Down Payment",
          discount_info: "Launch Collection"
        }
      ]
    },
    {
      unitType: "4-Bedroom",
      subtypes: [
        {
          subtype: "4-Bedroom",
          bedrooms: 4,
          bathrooms: 3,
          size: "1,442 – 1,798 sqft",
          price: "From $4,080,510",
          price_per_sqft: "From $2,830",
          currency: "SGD",
          total: 56,
          available: 48,
          status: 60,
          floor_plan_images: [
            "/images/aurea/floor-plan/4 Bedroom - Type D1.jpg",
            "/images/aurea/floor-plan/4 Bedroom - Type D1g.jpg",
            "/images/aurea/floor-plan/4 Bedroom - Type D1H.jpg",
            "/images/aurea/floor-plan/4 Bedroom - Type D1Hg.jpg",
            "/images/aurea/floor-plan/4 Bedroom - Type D2.jpg",
            "/images/aurea/floor-plan/4 Bedroom - Type D2g.jpg",
            "/images/aurea/floor-plan/4 Bedroom - Type D2H.jpg",
            "/images/aurea/floor-plan/4 Bedroom - Type D2Hg.jpg"
          ],
          payment_terms: "20% Down Payment",
          discount_info: "Launch Collection"
        }
      ]
    },
    {
      unitType: "5-Bedroom",
      subtypes: [
        {
          subtype: "5-Bedroom",
          bedrooms: 5,
          bathrooms: 4,
          size: "2,852 - 3251 sqft",
          price: "From $9,726,890",
          price_per_sqft: "From $3,397",
          currency: "SGD",
          total: 18,
          available: 17,
          status: 25,
          floor_plan_images: [
            "/images/aurea/floor-plan/5 Bedroom - Type E1.jpg",
            "/images/aurea/floor-plan/5 Bedroom - Type E2.jpg"
          ],
          payment_terms: "20% Down Payment",
          discount_info: "Ultra-Luxury Collection"
        }
      ]
    },
    {
      unitType: "Penthouse",
      subtypes: [
        {
          subtype: "Penthouse",
          bedrooms: 5,
          bathrooms: 4,
          size: "",
          price: "Coming Soon",
          price_per_sqft: "",
          currency: "SGD",
          total: 0,
          available: 0,
          status: 25,
          floor_plan_images: [
            "/images/springleaf-residence/site-plan-dummy.webp",
          ],
          payment_terms: "20% Down Payment",
          discount_info: "Ultra-Luxury Collection"
        }
      ]
    }
  ]

  // Mock data for The Golden Mile (Commercial) units and pricing
  const goldenMileUnitPricing = [
    {
      unitType: "Retail",
      subtypes: [
        {
          subtype: "Retail (L1 - L2)",
          bedrooms: 0,
          bathrooms: 0,
          size: "10,967 sqm / 118,066 sqft",
          price: "Contact for pricing",
          price_per_sqft: "Contact for pricing",
          currency: "SGD",
          total: 0,
          available: 0,
          status: 0,
          floor_plan_images: [
            "/images/springleaf-residence/site-plan-dummy.webp",
          ],
          payment_terms: "Contact for details",
          discount_info: "Retail"
        }
      ]
    },
    {
      unitType: "Medical Suites",
      subtypes: [
        {
          subtype: "Medical Suites (L3)",
          bedrooms: 0,
          bathrooms: 1,
          size: "47 – 228 sqm / 506 - 2,454 sqft",
          price: "Contact for pricing",
          price_per_sqft: "Contact for pricing",
          currency: "SGD",
          total: 19,
          available: 19,
          status: 100,
          floor_plan_images: [
            "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/tgm-floor-plan/TGM-FloorPlan-L3.jpg",
          ],
          payment_terms: "Contact for details",
          discount_info: "Medical Suites"
        }
      ]
    },
    {
      unitType: "Office",
      subtypes: [
        {
          subtype: "Office (L4 - L22)",
          bedrooms: 0,
          bathrooms: 1,
          size: "123 - 501 sqm / 3,315 - 5,393 sqft",
          price: "Contact for pricing",
          price_per_sqft: "Contact for pricing",
          currency: "SGD",
          total: 156,
          available: 156,
          status: 100,
          floor_plan_images: [
            "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/tgm-floor-plan/TGM-FloorPlan-L4.jpg",
            "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/tgm-floor-plan/TGM-FloorPlan-L5.jpg",
            "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/tgm-floor-plan/TGM-FloorPlan-L8.jpg",
            "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/tgm-floor-plan/TGM-FloorPlan-L10.jpg",
          ],
          payment_terms: "Contact for details",
          discount_info: "Office"
        }
      ]
    }
  ]

  // Helper function to process unit availability data for Aurea
  const processUnitAvailabilityData = (unitPricing?: any[]) => {
    if (!Array.isArray(unitPricing) || unitPricing.length === 0) {
      return aureaUnitPricing
    }
    return unitPricing
  }

  // Helper function to process unit availability data for The Golden Mile
  const processGoldenMileUnitAvailabilityData = (unitPricing?: any[]) => {
    if (!Array.isArray(unitPricing) || unitPricing.length === 0) {
      return goldenMileUnitPricing
    }
    return unitPricing
  }

  // Project config object (can be extended with more data if needed)
  const project = {
    unitPricingAurea: aureaUnitPricing,
    unitPricingGoldenMile: goldenMileUnitPricing,
  }

  const nextImage = () => {
    setAureaGalleryFade(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
      setAureaGalleryFade(false)
    }, 300)
  }

  const prevImage = () => {
    setAureaGalleryFade(true)
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
      setAureaGalleryFade(false)
    }, 300)
  }

  const handleAureaGalleryThumbnailClick = (index: number) => {
    setAureaGalleryFade(true)
    setTimeout(() => {
      setCurrentImageIndex(index)
      setAureaGalleryFade(false)
    }, 300)
  }

  const nextCombinedGalleryImage = () => {
    setCombinedGalleryFade(true)
    setTimeout(() => {
      setCurrentCombinedGalleryIndex((prev) => (prev + 1) % combinedGalleryImages.length)
      setCombinedGalleryFade(false)
    }, 300)
  }

  const prevCombinedGalleryImage = () => {
    setCombinedGalleryFade(true)
    setTimeout(() => {
      setCurrentCombinedGalleryIndex((prev) => (prev - 1 + combinedGalleryImages.length) % combinedGalleryImages.length)
      setCombinedGalleryFade(false)
    }, 300)
  }

  const handleCombinedGalleryThumbnailClick = (index: number) => {
    setCombinedGalleryFade(true)
    setTimeout(() => {
      setCurrentCombinedGalleryIndex(index)
      setCombinedGalleryFade(false)
    }, 300)
  }

  const nextGoldenMileImage = () => {
    if (goldenMileImages.length === 0) return
    setGoldenMileGalleryFade(true)
    setTimeout(() => {
      setCurrentGoldenMileImageIndex((prev) => (prev + 1) % goldenMileImages.length)
      setGoldenMileGalleryFade(false)
    }, 300)
  }

  const prevGoldenMileImage = () => {
    if (goldenMileImages.length === 0) return
    setGoldenMileGalleryFade(true)
    setTimeout(() => {
      setCurrentGoldenMileImageIndex((prev) => (prev - 1 + goldenMileImages.length) % goldenMileImages.length)
      setGoldenMileGalleryFade(false)
    }, 300)
  }

  const handleGoldenMileGalleryThumbnailClick = (index: number) => {
    setGoldenMileGalleryFade(true)
    setTimeout(() => {
      setCurrentGoldenMileImageIndex(index)
      setGoldenMileGalleryFade(false)
    }, 300)
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

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('project-gallery')
    if (gallerySection) {
      gallerySection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToFloorPlans = () => {
    const floorPlansSection = document.getElementById('floor-plans')
    if (floorPlansSection) {
      floorPlansSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToAureaFloorPlans = () => {
    const section = document.getElementById('aurea-floor-plans')
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToAureaSitePlan = () => {
    const section = document.getElementById('aurea-site-plan')
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToGoldenMileFloorPlans = () => {
    const section = document.getElementById('golden-mile-floor-plans')
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToGoldenMileSitePlan = () => {
    const section = document.getElementById('golden-mile-site-plan')
    if (section) {
      section.scrollIntoView({ 
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
    preferredTiming: '',
    projectType: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [securityScore, setSecurityScore] = useState<number | null>(null)

  const [isSiteMapSubmitting, setIsSiteMapSubmitting] = useState(false)
  const [siteMapSubmitSuccess, setSiteMapSubmitSuccess] = useState(false)
  const [siteMapSubmitError, setSiteMapSubmitError] = useState<string | null>(null)

  const handleLeadFormSubmit = async (formDataWithToken: any) => {
    const { fullName, contactNumber, emailAddress, preferredDate, preferredTiming, projectType, recaptchaToken } = formDataWithToken
    
    // Validate required fields
    if (!fullName.trim() || !contactNumber.trim()) {
      setSubmitError('Full name and contact number are required')
      toast({
        title: "Validation Error",
        description: "Full name and contact number are required",
        variant: "destructive",
      })
      return
    }

    // Validate reCAPTCHA token
    if (!recaptchaToken) {
      setSubmitError('Please complete the reCAPTCHA verification')
      toast({
        title: "Validation Error",
        description: "Please complete the reCAPTCHA verification",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Show submitting toast
      toast({
        title: "Submitting...",
        description: "Please wait while we process your request",
      })

      const response = await fetch('/api/aurea-the-golden-mile-lead-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          fullName, 
          contactNumber, 
          emailAddress, 
          preferredDate, 
          preferredTiming, 
          projectType,
          recaptchaToken 
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitSuccess(true)
        setFormData({
          fullName: '',
          contactNumber: '',
          emailAddress: '',
          preferredDate: undefined,
          preferredTiming: '',
          projectType: ''
        })
        setDate(undefined)
        
        // Show success toast
        toast({
          title: "Request Submitted Successfully!",
          description: "Thank you for your interest in Aurea + The Golden Mile! We have sent you a confirmation email and our team will contact you soon to arrange your showflat visit.",
          variant: "default",
        })
        
        // Reset success state after 5 seconds and reload page
        setTimeout(() => {
          setSubmitSuccess(false)
          window.location.reload()
        }, 5000)
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

    // Validate reCAPTCHA token
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

    try {
      // Submit the form with the reCAPTCHA token
      const response = await fetch('/api/aurea-site-map-request', {
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
        setShowSiteMapPopup(false)
        
        toast({
          title: "Site Map & Floor Plan Request Submitted!",
          description: "Thank you for your interest! We will contact you soon with the site map and floor plan.",
          variant: "default",
        })
        
        // Reset success state after 5 seconds and reload page
        setTimeout(() => {
          setSiteMapSubmitSuccess(false)
          window.location.reload()
        }, 5000)
      } else {
        throw new Error(result.error || 'Failed to submit site map request')
      }
    } catch (error) {
      console.error('Site map form submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit site map request. Please try again.'
      setSiteMapSubmitError(errorMessage)
      
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSiteMapSubmitting(false)
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
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/" aria-label="Go to homepage" className="flex items-center space-x-2">
                <Image
                  src="/images/kwsingapore-logo.webp"
                  alt="KW Singapore Logo"
                  width={300}
                  height={100}
                  className="h-8 sm:h-10 md:h-12 w-auto"
                />
              </Link>
            </div>
              {/* Tablet Navigation - md:flex lg:hidden */}
              <nav className="hidden md:flex lg:hidden items-center space-x-4">
                <button 
                  onClick={scrollToProjectInfo}
                  className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer text-sm"
                >
                  Project Info
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer flex items-center text-sm">
                    Aurea
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1c1c1d] border-gray-700 text-white">
                    <DropdownMenuItem 
                      onClick={scrollToAureaFloorPlans}
                      className="text-white hover:text-[#ce001f] hover:bg-gray-800 cursor-pointer data-[highlighted]:text-[#ce001f] data-[highlighted]:bg-gray-800"
                    >
                      Floor Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={scrollToAureaSitePlan}
                      className="text-white hover:text-[#ce001f] hover:bg-gray-800 cursor-pointer data-[highlighted]:text-[#ce001f] data-[highlighted]:bg-gray-800"
                    >
                      Site Plan
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer flex items-center text-sm">
                    The Golden Mile
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1c1c1d] border-gray-700 text-white">
                    <DropdownMenuItem 
                      onClick={scrollToGoldenMileFloorPlans}
                      className="text-white hover:text-[#ce001f] hover:bg-gray-800 cursor-pointer data-[highlighted]:text-[#ce001f] data-[highlighted]:bg-gray-800"
                    >
                      Floor Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={scrollToGoldenMileSitePlan}
                      className="text-white hover:text-[#ce001f] hover:bg-gray-800 cursor-pointer data-[highlighted]:text-[#ce001f] data-[highlighted]:bg-gray-800"
                    >
                      Site Plan
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  className="bg-[#ce001f] hover:bg-[#b3001a] transition-colors duration-300 text-sm px-3 py-1.5"
                  onClick={scrollToLeadForm}
                >
                  Book Showflat Visit
                </Button>
              </nav>
              
              {/* Desktop Navigation - lg:flex */}
              <nav className="hidden lg:flex items-center space-x-6">
                {/* Order matches vertical section order: Project Info → Location → Aurea → Gallery → The Golden Mile → Explore */}
                <button 
                  onClick={scrollToProjectInfo}
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
                <button 
                  onClick={scrollToGallery}
                  className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                >
                  Gallery
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer flex items-center">
                    Aurea
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1c1c1d] border-gray-700 text-white">
                    <DropdownMenuItem 
                      onClick={scrollToAureaFloorPlans}
                      className="text-white hover:text-[#ce001f] hover:bg-gray-800 cursor-pointer data-[highlighted]:text-[#ce001f] data-[highlighted]:bg-gray-800"
                    >
                      Floor Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={scrollToAureaSitePlan}
                      className="text-white hover:text-[#ce001f] hover:bg-gray-800 cursor-pointer data-[highlighted]:text-[#ce001f] data-[highlighted]:bg-gray-800"
                    >
                      Site Plan
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer flex items-center">
                    The Golden Mile
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1c1c1d] border-gray-700 text-white">
                    <DropdownMenuItem 
                      onClick={scrollToGoldenMileFloorPlans}
                      className="text-white hover:text-[#ce001f] hover:bg-gray-800 cursor-pointer data-[highlighted]:text-[#ce001f] data-[highlighted]:bg-gray-800"
                    >
                      Floor Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={scrollToGoldenMileSitePlan}
                      className="text-white hover:text-[#ce001f] hover:bg-gray-800 cursor-pointer data-[highlighted]:text-[#ce001f] data-[highlighted]:bg-gray-800"
                    >
                      Site Plan
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
      <section className="relative min-h-[60vh] md:min-h-[60vh] lg:min-h-screen lg:h-auto flex items-center justify-center">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/aurea-the-golden-mile-hero.webp"
            alt="Aurea Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 md:px-8 min-h-[60vh] md:min-h-[60vh] lg:min-h-screen flex items-center py-12 md:py-12 lg:py-0">
          <div className={`max-w-4xl w-full transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {/* Clean Badge */}
            <div className={`mb-4 sm:mb-3 md:mb-2 transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Image
                src="https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/hero-logo.webp"
                alt="Aurea + The Golden Mile Logo"
                width={300}
                height={100}
                className="h-auto w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px]"
                priority
              />
            </div>

            {/* Clean Typography */}
            <div className={`mb-4 sm:mb-2 md:mb-2 lg:mb-6 transition-all duration-700 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 sm:mb-2 md:mb-2 lg:mb-4 leading-tight">
                <span
                  className={`transition-all duration-1000 delay-900 lg:whitespace-nowrap ${isVisible ? 'animate-fade-in-left' : ''}`}
                >
                  AUREA + THE GOLDEN MILE
                </span>
              </h1>

              <div className={`flex items-center mb-3 sm:mb-2 md:mb-2 lg:mb-4 transition-all duration-700 delay-1300 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                <div className="w-8 sm:w-10 md:w-12 h-px bg-[#ce001f] mr-3 sm:mr-4"></div>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 font-light">District 7, Beach Road</p>
              </div>

              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl mb-6 sm:mb-4 md:mb-2 lg:mb-6 transition-all duration-700 delay-1500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                A new 45-storey residential tower anchored by one of Singapore’s most iconic heritage landmarks.
              </p>
            </div>

            {/* Clean CTA Buttons */}
            <div className={`cta-buttons-container mb-6 sm:mb-4 md:mb-4 lg:mb-8 transition-all duration-700 delay-1700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Button 
                className={`bg-[#ce001f] hover:bg-[#b3001a] text-white px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 text-base sm:text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 hover-lift flex-shrink-0 w-full sm:w-auto ${isVisible ? 'animate-pulse-glow' : ''}`}
                onClick={scrollToLeadForm}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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
        <div className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-2000 hidden md:flex ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-col items-center text-white/60">
            <span className="text-xs sm:text-sm mb-2">Scroll to explore</span>
            <MoveDownIcon className="w-4 h-4 sm:w-5 sm:h-5 rotate-90 animate-bounce" />
          </div>
        </div>

        {/* Disclaimer Text */}
        <div className={`absolute bottom-2 sm:bottom-4 right-2 sm:right-4 transition-all duration-1000 delay-2000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <p className="text-[9px] sm:text-[10px] md:text-xs text-white/70 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-2 rounded-lg">
            Images are for illustrative purposes only and may <br className="sm:hidden"/> not reflect the final design of Aurea & The Golden Mile.
          </p>
        </div>
      </section>

      {/* Enhanced Project Information Section */}
      <section 
        id="project-info" 
        className="py-6 sm:py-8 md:py-12 bg-[#1c1c1d] section-entrance"
        data-section-id="project-info"
        style={{ 
          opacity: animatedSections.has('project-info') ? 1 : 0,
          transform: animatedSections.has('project-info') ? 'translateY(0)' : 'translateY(60px)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${
            animatedSections.has('project-info') ? 'animate-slide-in-top' : ''
          }`}>
            <h2 className="text-2xl sm:text-3xl font-light mb-3 text-white text-center tracking-wide">A  Dual-Component Project Concept</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-4xl mx-auto px-2">
              Aurea + The Golden Mile builds upon the legacy of the Golden Mile Complex, the architectural hallmark that anchored Beach Road in the 1970s. The developers are reshaping the precinct into two distinct yet connected components: <br /> <br></br>
              The Conservation Wing (formerly the Golden Mile Complex) is being repurposed into a high-spec commercial hub. The old retail chaos is replaced by a refined mix of office and lifestyle concepts that align with the structure’s bold geometry. <br /> <br></br>
              The Residential Tower Aurea—stands 45 storeys tall next to the conserved wing. It reclaims the old car park space to deliver 188 exclusive homes focused on pure utility and view.
            </p>
          </div>

          {/* Detailed Information Grid */}
          <div className={`grid grid-cols-1 lg:grid-cols-10 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 delay-500 ${
            animatedSections.has('project-info') ? 'animate-fade-in-up' : ''
          }`} style={{
            opacity: animatedSections.has('project-info') ? 1 : 0,
            transform: animatedSections.has('project-info') ? 'translateY(0)' : 'translateY(50px)'
          }}>
            {/* Project Details */}
            <Card className="lg:col-span-4 border-gray-700 bg-[#18191b] hover:shadow-lg transition-all duration-500 w-full">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-[#ce001f] flex items-center text-base sm:text-lg">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-500 pb-3 gap-2 md:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Project Name:</span>
                  <span className="text-xs sm:text-sm font-semibold text-white md:text-right">Aurea (Residential) <br /> The Golden Mile (Commercial)</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-500 pb-3 gap-2 md:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Developer:</span>
                  <span className="text-xs sm:text-sm font-semibold text-white md:text-right">GMC Property Pte. Ltd. (JV between <br />Perennial Holdings and Far East Organization)</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-500 pb-3 gap-2 md:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Tenure:</span>
                  <span className="text-xs sm:text-sm font-semibold text-white md:text-right">99 years from 18 Nov 2024</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-500 pb-3 gap-2 md:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">District:</span>
                  <span className="text-xs sm:text-sm font-semibold text-white md:text-right">7 (Beach Road)</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-500 pb-3 gap-2 md:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Address:</span>
                  <span className="text-xs sm:text-sm font-semibold text-white md:text-right">800 Beach Road, Singapore 199979,<br />802 Beach Road, Singapore 199980</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-500 pb-3 gap-2 md:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Site Area:</span>
                  <span className="text-xs sm:text-sm font-semibold text-white md:text-right">13,462.30 sqm / 144,908 sqft</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-500 pb-3 gap-2 md:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Tower:</span>
                  <span className="text-xs sm:text-sm font-semibold text-white md:text-right">1</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-500 pb-3 gap-2 md:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Storey:</span>
                  <span className="text-xs sm:text-sm font-semibold text-white md:text-right">Aurea: 45 Storeys + 3 basements<br />The Golden Mile: 22 Storeys + 1 Basement</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-500 pb-3 gap-2 md:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Total Units:</span>
                  <span className="text-xs sm:text-sm font-semibold text-white md:text-right">Aurea: 188 units<br />The Golden Mile: 156 Offices & 19 Medical suites</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-500 pb-3 gap-2 md:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Unit Mix:</span>
                  <span className="text-xs sm:text-sm font-semibold text-white md:text-right">Aurea : 2- to 5-bedroom</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-500 pb-3 gap-2 md:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Architect:</span>
                  <span className="text-xs sm:text-sm font-semibold text-white md:text-right">DP Architects Pte Ltd</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-500 pb-3 gap-2 md:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">TOP:</span>
                  <span className="text-xs sm:text-sm font-semibold text-white md:text-right">Q2 2029</span>
                </div>
              </CardContent>
            </Card>

            {/* Combined Gallery */}
            <Card className="lg:col-span-6 border-gray-700 bg-[#18191b] hover:shadow-lg transition-all duration-500 w-full">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-[#ce001f] flex items-center text-base sm:text-lg">
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Gallery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="space-y-4">
                  <div>
                    {/* Main Image Display */}
                    <div 
                      className="relative mb-4 sm:mb-6"
                      onMouseEnter={() => setIsCombinedGalleryPaused(true)}
                      onMouseLeave={() => setIsCombinedGalleryPaused(false)}
                    >
                      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                        <Image
                          src={combinedGalleryImages[currentCombinedGalleryIndex] || "/placeholder.svg"}
                          alt={`Aurea + The Golden Mile Gallery Image ${currentCombinedGalleryIndex + 1}`}
                          width={800}
                          height={500}
                          quality={90}
                          className={`object-cover transition-opacity duration-700 ease-in-out ${
                            combinedGalleryFade ? 'opacity-0' : 'opacity-100'
                          }`}
                        />
                        
                        {/* Navigation buttons */}
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300 z-10 w-8 h-8 sm:w-10 sm:h-10"
                          onClick={prevCombinedGalleryImage}
                        >
                          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#ce001f]" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300 z-10 w-8 h-8 sm:w-10 sm:h-10"
                          onClick={nextCombinedGalleryImage}
                        >
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#ce001f]" />
                        </Button>
                              </div>

                      {/* Thumbnail Images */}
                      <div className="flex items-center justify-center mt-4 sm:mt-6 space-x-2 sm:space-x-3 overflow-x-auto px-2 pb-2">
                        {/* Previous Arrow */}
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300 flex-shrink-0"
                          onClick={prevCombinedGalleryImage}
                        >
                          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-[#ce001f]" />
                        </Button>

                        {/* Thumbnail Images */}
                        {combinedGalleryImages.map((image, index) => (
                          <button
                            key={index}
                            className={`relative w-16 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 flex-shrink-0 ${
                              index === currentCombinedGalleryIndex
                                ? "border-[#ce001f] shadow-lg scale-105"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => handleCombinedGalleryThumbnailClick(index)}
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}

                        {/* Next Arrow */}
                    <Button 
                      variant="outline" 
                          size="icon"
                          className="w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300 flex-shrink-0"
                          onClick={nextCombinedGalleryImage}
                        >
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#ce001f]" />
                    </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nearby Amenities */}
      <section 
        id="nearby-amenities"
        className="py-6 sm:py-8 md:py-12 bg-[#1c1c1d] section-entrance"
        data-section-id="nearby-amenities"
        style={{ 
          opacity: animatedSections.has('nearby-amenities') ? 1 : 0,
          transform: animatedSections.has('nearby-amenities') ? 'translateY(0)' : 'translateY(60px)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${
            animatedSections.has('nearby-amenities') ? 'animate-slide-in-top' : ''
          }`}>
            <h2 className="text-2xl sm:text-3xl font-light mb-3 text-white text-center tracking-wide">Location</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 px-2">Everything you need is within reach</p>
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
                {/* Location Map */}
                <div className="w-full rounded-lg overflow-hidden shadow-lg">
                  <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.151251038296!2d103.86127752483931!3d1.3022549421312515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19b38241d779%3A0xac34c19e47d3a9c9!2s800%20Beach%20Rd%2C%20Singapore%20199979!5e0!3m2!1sen!2sid!4v1768456349718!5m2!1sen!2sid"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5" style={{ color: '#ce001f' }} />
                    <div>
                    <p className="font-semibold text-white">Address</p>
                    <p className="text-sm text-gray-300 font-light">800 Beach Road, Singapore 199979,<br />802 Beach Road, Singapore 199980</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Train className="w-5 h-5" style={{ color: '#ce001f' }} />
                    <div>
                      <p className="font-semibold text-white">MRT</p>
                      <p className="text-sm text-gray-300 font-light">Nicoll Highway MRT (Circle Line)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Car className="w-5 h-5" style={{ color: '#ce001f' }} />
                    <div>
                    <p className="font-semibold text-white">Access</p>
                    <p className="text-sm text-gray-300 font-light">ECP | KPE | Nicoll Highway</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Amenities Filter */}
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="flex justify-start gap-2 bg-transparent p-0 mb-6 overflow-x-auto whitespace-nowrap snap-x snap-mandatory">
              {['All','Transport','Retail & F&B','Nature & Leisure','Education','Healthcare'].map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat} 
                  className="bg-[#18191b] text-white data-[state=active]:bg-[#ce001f] data-[state=active]:text-white border border-gray-700 min-w-max snap-start rounded-full px-4 py-2 flex items-center gap-2"
                >
                  {cat === 'All' && <Layers className="w-4 h-4" />}
                  {cat === 'Transport' && <Train className="w-4 h-4" />}
                  {cat === 'Retail & F&B' && <ShoppingBag className="w-4 h-4" />}
                  {cat === 'Nature & Leisure' && <Trees className="w-4 h-4" />}
                  {cat === 'Education' && <GraduationCap className="w-4 h-4" />}
                  {cat === 'Healthcare' && <Hospital className="w-4 h-4" />}
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {['All','Transport','Retail & F&B','Nature & Leisure','Education','Healthcare'].map((cat) => (
              <TabsContent key={cat} value={cat}>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {amenities.filter(a => cat === 'All' ? true : a.category === cat).map((amenity, index) => (
                    <Card 
                      key={`${cat}-${index}`}
                      className={`hover:shadow-lg transition-all duration-700 border-gray-700 bg-[#18191b] rounded-xl hover:scale-105 stagger-animation ${
                        animatedSections.has('nearby-amenities') ? 'animate' : ''
                      }`}
                      style={{ 
                        transitionDelay: `${index * 150}ms`,
                        opacity: animatedSections.has('nearby-amenities') ? 1 : 0,
                        transform: animatedSections.has('nearby-amenities') ? 'translateY(0)' : 'translateY(40px)'
                      }}
                    >
                      <CardContent className="p-4 md:p-6 min-h-[100px] md:min-h-[120px] w-full">
                        <div className="flex flex-col items-center justify-center space-y-2 md:flex-row md:items-center md:justify-start md:space-y-0 md:space-x-4 w-full">
                          <div className="flex-shrink-0" style={{ color: '#ce001f' }}>{amenity.icon}</div>
                          <div className="text-center md:text-center flex-1 min-w-0">
                            <h3 className="font-semibold text-xs md:text-lg text-white break-words">{amenity.name}</h3>
                            {amenity.distance && (
                              <p className="text-gray-300 font-light text-xs md:text-sm break-words">{amenity.distance}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          {/* Call to Action */}
          <div className={`text-center mb-4 mt-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="bg-gradient-to-r from-[#ce001f] to-[#b3001a] text-white rounded-2xl p-8 max-w-4xl mx-auto hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Be the first to own a home that combines convenience, luxury, and nature</h3>
              <p className="text-base sm:text-lg mb-6 opacity-90">
                Register now for an exclusive preview of Aurea & The Golden Mile 
              </p>
              <div className="cta-buttons-container justify-center">
                <Button 
                  className="bg-white text-[#ce001f] hover:bg-gray-100 px-8 py-3 text-lg hover:scale-105 transition-all duration-300"
                  onClick={scrollToLeadForm}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Showflat Visit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section id="trusted-developer" className="bg-[#1c1c1d] text-white mt-8 md:mt-10 border-t border-gray-700 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <h3 className="text-xl sm:text-2xl md:text-4xl font-semibold mb-6 sm:mb-8 md:mb-10">Trusted Developer with Proven Success</h3>
          <div className="flex items-center justify-center gap-8 md:gap-16 mb-8 md:mb-10 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="rounded-md bg-white p-3">
                <Image
                  src="https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/feo-eng-logo.webp"
                  alt="Far East Organization"
                  width={140}
                  height={60}
                  className="h-12 w-auto opacity-90"
                />
              </div>
              <span className="hidden sm:block text-sm md:text-base opacity-90">Far East Organization</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-md bg-white p-3">
                <Image
                  src="https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/perennial-holdings-logo.webp"
                  alt="Perennial Holdings"
                  width={140}
                  height={60}
                  className="h-12 w-auto opacity-90"
                />
              </div>
              <span className="hidden sm:block text-sm md:text-base opacity-90">Perennial Holdings</span>
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-5xl mx-auto mb-6">
          Breathing new life into a renowned national monument requires a distinct calibre of expertise. Development of Aurea + The Golden Mile is led by a consortium that specialises in exactly this kind of sensitive restoration: Perennial Holdings, Far East Organization, and Sino Land.
          </p>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-5xl mx-auto mb-6">
          <strong className="text-white">Far East Organization:</strong> The team behind The Fullerton Heritage. They took the historic General Post Office and turned it into Singapore's finest hotel. They know how to protect a legacy while making it commercially viable.
          </p>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-5xl mx-auto mb-6">
          <strong className="text-white">Perennial Holdings:</strong> The specialists behind Capitol Singapore and CHIJMES. They have a track record of taking conservation clusters and turning them into thriving lifestyle destinations.
          </p>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-5xl mx-auto">
          <strong className="text-white">Sino Land:</strong> Bringing international luxury standards to ensure the new residential tower holds its own against the weight of the historic site.
          </p>
        </div>
      </section>

      {/* AureaFloor Plans & Pricing Section */}
      <section 
        id="aurea-floor-plans"
        className="py-8 sm:py-12 md:py-16 bg-[#242728] section-entrance"
        data-section-id="floor-plans"
        style={{ 
          opacity: animatedSections.has('floor-plans') ? 1 : 0,
          transform: animatedSections.has('floor-plans') ? 'translateY(0)' : 'translateY(60px)'
        }}
      > 

      {/* Aurea Image Gallery Section */}
          <div 
            id="project-gallery"
            className={`mb-20 transition-all duration-1000 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-light mb-3 text-white text-center tracking-wide">Aurea</h3>
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
            <div 
              className="relative max-w-6xl mx-auto mb-8"
              onMouseEnter={() => setIsAureaGalleryPaused(true)}
              onMouseLeave={() => setIsAureaGalleryPaused(false)}
            >
            <div className="relative w-full h-[220px] sm:h-[320px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={projectImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`Aurea - Image ${currentImageIndex + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-700 ease-in-out ${
                    aureaGalleryFade ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-5 h-5 text-[#ce001f]" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-5 h-5 text-[#ce001f]" />
                </Button>

              
              </div>

              
              <div className="flex items-center justify-center mt-6 space-x-3 overflow-x-auto px-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4 text-[#ce001f]" />
                </Button>
                {projectImages.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 flex-shrink-0 ${
                      index === currentImageIndex
                        ? "border-primary-red shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleAureaGalleryThumbnailClick(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4 text-[#ce001f]" />
                </Button>
              </div>
            </div>
          </div> 

        {/* Aurea Project Information Table */}
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-4xl mx-auto">
            <Card className="border-gray-700 bg-[#18191b] hover:shadow-lg transition-all duration-500">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-xs sm:text-sm font-medium text-gray-300 mb-2">Tower</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">1</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-300 mb-2">Storey</div>
                    <div className="text-sm font-semibold text-white">45 Storeys + 3 Basements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-300 mb-2">Total Units</div>
                    <div className="text-base font-semibold text-white">188</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-300 mb-2">Unit Mix</div>
                    <div className="text-sm font-semibold text-white">2- to 5-Bedroom</div>
                </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${
            animatedSections.has('floor-plans') ? 'animate-slide-in-top' : ''
          }`}>
            <h2 className="text-2xl sm:text-3xl font-light mb-3 text-white text-center tracking-wide">Floor Plans & Pricing</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-sm sm:text-base md:text-xl text-gray-300 px-2">Discover your perfect home from our collection of meticulously designed residences</p>
          </div>

          <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-500 ${
            animatedSections.has('floor-plans') ? 'animate-fade-in-up' : ''
          }`} style={{
            opacity: animatedSections.has('floor-plans') ? 1 : 0,
            transform: animatedSections.has('floor-plans') ? 'translateY(0)' : 'translateY(50px)'
          }}>
            {/* Tabs for unit types */}
            <div className="w-full px-2 sm:px-4 md:px-6 pt-4 sm:pt-6 pb-2 border-b border-gray-700 mb-4 sm:mb-6 md:mb-8">
              <div className="flex flex-nowrap gap-1 sm:gap-2 justify-start sm:justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
                {(() => {
                  const dynamicUnitData = processUnitAvailabilityData(project?.unitPricingAurea || [])
                  
                  // If no API data, show message
                  if (dynamicUnitData.length === 0) {
                    return (
                      <div className="col-span-full text-center py-8">
                        <p className="text-gray-400">No unit information available at the moment.</p>
                        <p className="text-sm text-gray-500 mt-2">Please check back later or contact our agents for more details.</p>
                      </div>
                    )
                  }
                  
                  return dynamicUnitData.map((unit: any, idx: number) => {
                    // Calculate total available units for this type
                    const totalAvailable = unit.subtypes.reduce((sum: number, subtype: any) => sum + subtype.available, 0)
                    const totalUnits = unit.subtypes.reduce((sum: number, subtype: any) => sum + subtype.total, 0)
                    
                    return (
                      <button
                        key={unit.unitType}
                        onClick={() => setUnitsActiveTab(idx)}
                        className={`px-2 sm:px-4 py-2 rounded-full font-light flex items-center gap-1 sm:gap-2 text-xs sm:text-sm transition-colors border focus:outline-none whitespace-nowrap ${unitsActiveTab === idx ? 'bg-gray-800 border-[#ce001f] text-white' : 'bg-[#18191b] border-gray-700 text-gray-300 hover:bg-[#ce001f]/10 hover:text-[#ce001f]'}`}
                      >
                        <span>{unit.unitType.replace(' Units', '')}</span>
                        {totalAvailable > 0 && (
                          <span className="bg-green-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full">
                            {totalAvailable}
                          </span>
                        )}
                      </button>
                    )
                  })
                })()}
              </div>
            </div>

            {/* Card layout for selected unit type */}
            {(() => {
              const dynamicUnitData = processUnitAvailabilityData(project?.unitPricingAurea || [])
              const currentUnit = dynamicUnitData[unitsActiveTab] || dynamicUnitData[0]
              
              // If no data available, show fallback
              if (!currentUnit) {
                return (
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-center items-stretch bg-[#111] rounded-xl p-4 lg:p-8 max-w-5xl mx-auto shadow-lg pricing-container">
                    <div className="w-full text-center text-gray-400 py-8">
                      <p>No unit information available at the moment.</p>
                      <p className="text-sm mt-2">Please check back later or contact our agents for more details.</p>
                    </div>
                  </div>
                )
              }
              
              // Calculate total availability for this unit type
              const totalAvailable = currentUnit.subtypes.reduce((sum: number, subtype: any) => sum + subtype.available, 0)
              const totalUnits = currentUnit.subtypes.reduce((sum: number, subtype: any) => sum + subtype.total, 0)
              
              return (
                <div className="space-y-4 sm:space-y-6">
                  {/* Cards */}
                  <div className="w-full">
                    {currentUnit.subtypes.slice(0, 1).map((subtype: any, subtypeIndex: number) => (
                      <div key={subtypeIndex} className="bg-[#111] rounded-xl p-4 sm:p-6 shadow-lg border border-gray-800 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full items-center">
                          {/* Floor Plan Image - Left Side */}
                          <div>
                            {(() => {
                              const images = Array.isArray(subtype.floor_plan_images) && subtype.floor_plan_images.length > 0
                                ? subtype.floor_plan_images
                                : []
                              const hasImages = images && images.length > 0

                              const prev = () => setFloorPlanIndex((i) => (i - 1 + images.length) % images.length)
                              const next = () => setFloorPlanIndex((i) => (i + 1) % images.length)

                              return (
                                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-700">
                                  {hasImages ? (
                                  <Image
                                      key={images[floorPlanIndex % images.length]}
                                      src={images[floorPlanIndex % images.length]}
                                    alt={`${currentUnit.unitType.replace(' Units', '')} Floor Plan`}
                                    fill
                                      className="object-contain bg-black"
                                    />
                                  ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-xs">No floor plan images</div>
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                                  {hasImages && (
                                    <>
                                      {/* Zoom Button */}
                                      <button
                                        aria-label="Zoom floor plan"
                                        className="absolute bottom-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200 z-10"
                                        onClick={() => {
                                          setSelectedFloorPlanImage(images[floorPlanIndex % images.length])
                                          setShowFloorPlanDialog(true)
                                        }}
                                      >
                                        <Maximize2 className="h-4 w-4" style={{ color: '#40e0d0' }} />
                                      </button>
                                      {images.length > 1 && (
                                    <>
                                      <button
                                        aria-label="Previous floor plan"
                                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow"
                                        onClick={prev}
                                      >
                                        <ChevronLeft className="w-4 h-4" />
                                      </button>
                                      <button
                                        aria-label="Next floor plan"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow"
                                        onClick={next}
                                      >
                                        <ChevronRight className="w-4 h-4" />
                                      </button>
                                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                        {images.slice(0, 8).map((_img: string, idx: number) => (
                                          <span
                                            key={idx}
                                            className={`w-2 h-2 rounded-full ${idx === (floorPlanIndex % images.length) ? 'bg-white' : 'bg-white/40'}`}
                                          />
                                        ))}
                                      </div>
                                        </>
                                      )}
                                    </>
                                  )}
                                  <div className="absolute bottom-1 left-1 text-white text-xs font-medium">
                                    Floor Plan
                                  </div>
                                </div>
                              )
                            })()}
                          </div>

                          {/* Information - Right Side */}
                          <div className="flex flex-col justify-center">
                            <div>
                              {/* Unit Type Header */}
                              <div className="mb-4">
                                <h4 className="text-xl font-bold text-white mb-2">{subtype.subtype}</h4>
                                <p className="text-gray-300 text-sm">{subtype.size}</p>
                              </div>
                              
                              {/* Price */}
                              <div className="mb-6">
                                <p className="text-green-400 font-semibold text-lg">{subtype.price}</p>
                                {subtype.price_per_sqft && (
                                  <p className="text-gray-400 text-sm">
                                    {subtype.price_per_sqft.toLocaleString()} per sqft
                                  </p>
                                )}
                              </div>
                              
                              
                            </div>
                            
                            {/* CTA Buttons */}
                            <div className="space-y-3">
                              <button 
                                onClick={() => scrollToSection('lead-form')}
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg text-sm transition-colors"
                              >
                                Book Showflat Visit
                              </button>
                              <button 
                                onClick={() => setShowSiteMapPopup(true)}
                                className="w-full bg-white text-red-500 hover:bg-white-600 text-red-500 font-medium py-3 px-4 rounded-lg text-sm transition-colors"
                              >
                                Request Floor Plan
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div 
            id="aurea-site-plan"
            className={`mt-20 mb-20 transition-all duration-1000 delay-300 ${
              animatedSections.has('floor-plans') ? 'animate-slide-in-top' : ''
            }`}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-light mb-3 text-white text-center tracking-wide">Facilities / Site Plan</h2>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-[#ce001f] rounded" />
              </div>
            </div>
            
            {/* Aurea Site Plan Carousel */}
            <div className="relative max-w-6xl md:max-w-full mx-auto mb-8">
              <div className="relative w-full h-[220px] sm:h-[320px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={aureaSitePlanImages[currentAureaSitePlanIndex] || "/placeholder.svg"}
                  alt={`Aurea Site Plan - Image ${currentAureaSitePlanIndex + 1}`}
                  fill
                  className="object-cover md:object-contain transition-all duration-500"
                />
        
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                  onClick={prevAureaSitePlan}
                >
                  <ChevronLeft className="w-5 h-5 text-[#ce001f]" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                  onClick={nextAureaSitePlan}
                >
                  <ChevronRight className="w-5 h-5 text-[#ce001f]" />
                </Button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex items-center justify-center mt-6 gap-2">
                {aureaSitePlanImages.map((_image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAureaSitePlanIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentAureaSitePlanIndex
                        ? "bg-[#ce001f] w-8"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Golden Mile Floor Plans & Pricing Section */}
      <section 
        id="golden-mile-floor-plans"
        className="py-16 bg-[#1c1c1d] section-entrance"
        data-section-id="floor-plans"
        style={{ 
          opacity: animatedSections.has('floor-plans') ? 1 : 0,
          transform: animatedSections.has('floor-plans') ? 'translateY(0)' : 'translateY(60px)'
        }}
      > 

      {/* The Golden Mile Image Gallery Section */}
      <div 
          id="golden-mile-gallery"
          className={`mb-20 transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-light mb-3 text-white text-center tracking-wide">The Golden Mile</h3>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <span>
                {currentGoldenMileImageIndex + 1} of {goldenMileImages.length}
              </span>
            </div>
          </div>

          {/* Main Image Display */}
          <div 
            className="relative max-w-6xl mx-auto mb-8"
            onMouseEnter={() => setIsGoldenMileGalleryPaused(true)}
            onMouseLeave={() => setIsGoldenMileGalleryPaused(false)}
          >
            <div className="relative w-full h-[220px] sm:h-[320px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={goldenMileImages[currentGoldenMileImageIndex] || "/placeholder.svg"}
                alt={`The Golden Mile - Image ${currentGoldenMileImageIndex + 1}`}
                fill
                className={`object-cover transition-opacity duration-700 ease-in-out ${
                  goldenMileGalleryFade ? 'opacity-0' : 'opacity-100'
                }`}
              />
      
              <Button
                variant="outline"
                size="icon"
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                onClick={prevGoldenMileImage}
              >
                <ChevronLeft className="w-5 h-5 text-[#ce001f]" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                onClick={nextGoldenMileImage}
              >
                <ChevronRight className="w-5 h-5 text-[#ce001f]" />
              </Button>

              
                </div>

            
            <div className="flex items-center justify-center mt-6 space-x-3 overflow-x-auto px-2">
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                onClick={prevGoldenMileImage}
              >
                <ChevronLeft className="w-4 h-4 text-[#ce001f]" />
              </Button>
              {goldenMileImages.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 flex-shrink-0 ${
                    index === currentGoldenMileImageIndex
                      ? "border-primary-red shadow-lg scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleGoldenMileGalleryThumbnailClick(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`The Golden Mile Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                onClick={nextGoldenMileImage}
              >
                <ChevronRight className="w-4 h-4 text-[#ce001f]" />
              </Button>
                </div>
                    </div>
                  </div>

        {/* The Golden Mile Project Information Table */}
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-4xl mx-auto">
            <Card className="border-gray-700 bg-[#18191b] hover:shadow-lg transition-all duration-500">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-xs sm:text-sm font-medium text-gray-300 mb-2">Tower</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">1</div>
                    </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-300 mb-2">Storey</div>
                    <div className="text-sm font-semibold text-white">22 Storeys<br />+ 1 Basement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-300 mb-2">Total Units</div>
                    <div className="text-sm font-semibold text-white">156 Offices<br />19 Medical Suites</div>
                    </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-300 mb-2">Carpark</div>
                    <div className="text-sm font-semibold text-white">173 Lots, 3 Accessible Lots,<br />2 Loading / Unloading Lots</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${
            animatedSections.has('floor-plans') ? 'animate-slide-in-top' : ''
          }`}>
            <h2 className="text-2xl sm:text-3xl font-light mb-3 text-white text-center tracking-wide">Floor Plans & Pricing</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-sm sm:text-base md:text-xl text-gray-300 px-2">Discover commercial spaces from our collection of offices and medical suites</p>
          </div>

          <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-500 ${
            animatedSections.has('floor-plans') ? 'animate-fade-in-up' : ''
          }`} style={{
            opacity: animatedSections.has('floor-plans') ? 1 : 0,
            transform: animatedSections.has('floor-plans') ? 'translateY(0)' : 'translateY(50px)'
          }}>
            {/* Tabs for unit types */}
            <div className="w-full px-2 sm:px-4 md:px-6 pt-4 sm:pt-6 pb-2 border-b border-gray-700 mb-4 sm:mb-6 md:mb-8">
              <div className="flex flex-nowrap gap-1 sm:gap-2 justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
                {(() => {
                  const dynamicUnitData = processGoldenMileUnitAvailabilityData(project?.unitPricingGoldenMile || [])
                  
                  // If no API data, show message
                  if (dynamicUnitData.length === 0) {
                    return (
                      <div className="col-span-full text-center py-8">
                        <p className="text-gray-400">No unit information available at the moment.</p>
                        <p className="text-sm text-gray-500 mt-2">Please check back later or contact our agents for more details.</p>
                      </div>
                    )
                  }
                  
                  return dynamicUnitData.map((unit: any, idx: number) => {
                    // Calculate total available units for this type
                    const totalAvailable = unit.subtypes.reduce((sum: number, subtype: any) => sum + subtype.available, 0)
                    const totalUnits = unit.subtypes.reduce((sum: number, subtype: any) => sum + subtype.total, 0)
                    
                    return (
                      <button
                        key={unit.unitType}
                        onClick={() => setGoldenMileUnitsActiveTab(idx)}
                        className={`px-2 sm:px-4 py-2 rounded-full font-light flex items-center gap-1 sm:gap-2 text-xs sm:text-sm transition-colors border focus:outline-none whitespace-nowrap ${goldenMileUnitsActiveTab === idx ? 'bg-gray-800 border-[#ce001f] text-white' : 'bg-[#18191b] border-gray-700 text-gray-300 hover:bg-[#ce001f]/10 hover:text-[#ce001f]'}`}
                      >
                        <span>{unit.unitType.replace(' Units', '')}</span>
                        {totalAvailable > 0 && (
                          <span className="bg-green-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full">
                            {totalAvailable}
                          </span>
                        )}
                      </button>
                    )
                  })
                })()}
              </div>
            </div>

            {/* Card layout for selected unit type */}
            {(() => {
              const dynamicUnitData = processGoldenMileUnitAvailabilityData(project?.unitPricingGoldenMile || [])
              const currentUnit = dynamicUnitData[goldenMileUnitsActiveTab] || dynamicUnitData[0]
              
              // If no data available, show fallback
              if (!currentUnit) {
                return (
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-center items-stretch bg-[#111] rounded-xl p-4 lg:p-8 max-w-5xl mx-auto shadow-lg pricing-container">
                    <div className="w-full text-center text-gray-400 py-8">
                      <p>No unit information available at the moment.</p>
                      <p className="text-sm mt-2">Please check back later or contact our agents for more details.</p>
                    </div>
                  </div>
                )
              }
              
              // Calculate total availability for this unit type
              const totalAvailable = currentUnit.subtypes.reduce((sum: number, subtype: any) => sum + subtype.available, 0)
              const totalUnits = currentUnit.subtypes.reduce((sum: number, subtype: any) => sum + subtype.total, 0)
              
              return (
                <div className="space-y-4 sm:space-y-6">
                  {/* Cards */}
                  <div className="w-full">
                    {currentUnit.subtypes.slice(0, 1).map((subtype: any, subtypeIndex: number) => (
                      <div key={subtypeIndex} className="bg-[#111] rounded-xl p-4 sm:p-6 shadow-lg border border-gray-800 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full items-center">
                          {/* Floor Plan Image - Left Side */}
                          <div>
                            {(() => {
                              const images = Array.isArray(subtype.floor_plan_images) && subtype.floor_plan_images.length > 0
                                ? subtype.floor_plan_images
                                : []
                              const hasImages = images && images.length > 0

                              const prev = () => setGoldenMileFloorPlanIndex((i) => (i - 1 + images.length) % images.length)
                              const next = () => setGoldenMileFloorPlanIndex((i) => (i + 1) % images.length)

                              return (
                                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-700">
                                  {hasImages ? (
                                  <Image
                                      key={images[goldenMileFloorPlanIndex % images.length]}
                                      src={images[goldenMileFloorPlanIndex % images.length]}
                                    alt={`${currentUnit.unitType.replace(' Units', '')} Floor Plan`}
                                    fill
                                      className="object-contain bg-black"
                                    />
                                  ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-xs">No floor plan images</div>
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                                  {hasImages && (
                                    <>
                                      {/* Zoom Button */}
                                      <button
                                        aria-label="Zoom floor plan"
                                        className="absolute bottom-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all duration-200 z-10"
                                        onClick={() => {
                                          setSelectedGoldenMileFloorPlanImage(images[goldenMileFloorPlanIndex % images.length])
                                          setShowGoldenMileFloorPlanDialog(true)
                                        }}
                                      >
                                        <Maximize2 className="h-4 w-4" style={{ color: '#40e0d0' }} />
                                      </button>
                                      {images.length > 1 && (
                                        <>
                                          <button
                                            aria-label="Previous floor plan"
                                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow"
                                            onClick={prev}
                                          >
                                            <ChevronLeft className="w-4 h-4" />
                                          </button>
                                          <button
                                            aria-label="Next floor plan"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow"
                                            onClick={next}
                                          >
                                            <ChevronRight className="w-4 h-4" />
                                          </button>
                                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                            {images.slice(0, 8).map((_img: string, idx: number) => (
                                              <span
                                                key={idx}
                                                className={`w-2 h-2 rounded-full ${idx === (goldenMileFloorPlanIndex % images.length) ? 'bg-white' : 'bg-white/40'}`}
                                              />
                                            ))}
                                          </div>
                                        </>
                                      )}
                                    </>
                                  )}
                                  <div className="absolute bottom-1 left-1 text-white text-xs font-medium">
                                    Floor Plan
                          </div>
                        </div>
                              )
                            })()}
                </div>

                          {/* Information - Right Side */}
                          <div className="flex flex-col justify-center">
                            <div>
                              {/* Unit Type Header */}
                              <div className="mb-4">
                                <h4 className="text-xl font-bold text-white mb-2">{subtype.subtype}</h4>
                                <p className="text-gray-300 text-sm">{subtype.size}</p>
                              </div>
                              
                              {/* Price */}
                              <div className="mb-6">
                                <p className="text-green-400 font-semibold text-lg">{subtype.price}</p>
                                {subtype.price_per_sqft && (
                                  <p className="text-gray-400 text-sm">
                                    {subtype.price_per_sqft.toLocaleString()} per sqft
                                  </p>
                                )}
                              </div>
                              
                              
                            </div>
                            
                            {/* CTA Buttons */}
                            <div className="space-y-3">
                              <button 
                                onClick={() => scrollToSection('lead-form')}
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg text-sm transition-colors"
                              >
                                Book Showflat Visit
                              </button>
                              <button 
                                onClick={() => setShowSiteMapPopup(true)}
                                className="w-full bg-white text-red-500 hover:bg-white-600 text-red-500 font-medium py-3 px-4 rounded-lg text-sm transition-colors"
                              >
                                Request Floor Plan
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div 
            id="golden-mile-site-plan"
            className={`mt-20 mb-20 transition-all duration-1000 delay-300 ${
              animatedSections.has('floor-plans') ? 'animate-slide-in-top' : ''
            }`}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-light mb-3 text-white text-center tracking-wide">Facilities / Site Plan</h2>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-[#ce001f] rounded" />
              </div>
            </div>
            
            {/* Site Plan Image */}
            <div className="relative max-w-6xl mx-auto">
              <div className="relative w-full rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/new-launch-collection/mega-landing-page/aurea-the-golden-mile/TGM-Siteplan.jpg"
                  alt="Facilities / Site Plan"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Generation Form */}
      <section
        id="lead-form"
        className={`py-6 sm:py-8 md:py-16 relative bg-cover bg-center section-entrance`}
        data-section-id="lead-form"
        style={{ 
          backgroundImage: 'url("/images/aurea/gallery/R-View09 - L3 Infinity Pool View_08 (250109).jpg")',
          opacity: animatedSections.has('lead-form') ? 1 : 0,
          transform: animatedSections.has('lead-form') ? 'translateY(0)' : 'translateY(60px)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-left">
            <GoogleReCaptchaProvider
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
              scriptProps={{
                async: false,
                defer: false,
                appendTo: "head",
                nonce: undefined,
              }}
            >
              <LeadGenerationForm
                formData={formData}
                setFormData={setFormData}
                date={date}
                setDate={setDate}
                onSubmit={handleLeadFormSubmit}
                isSubmitting={isSubmitting}
                submitSuccess={submitSuccess}
                submitError={submitError}
              />
            </GoogleReCaptchaProvider>
          </div>
        </div>
      </section>

      {/* Site Plan Request Popup */}
      {showSiteMapPopup && (
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: "head",
            nonce: undefined,
          }}
        >
          <SiteMapForm
            onSubmit={handleSiteMapFormSubmit}
            onClose={() => setShowSiteMapPopup(false)}
            isSubmitting={isSiteMapSubmitting}
            submitSuccess={siteMapSubmitSuccess}
            submitError={siteMapSubmitError}
          />
        </GoogleReCaptchaProvider>
      )}

      {/* Floor Plan Zoom Dialog - Aurea */}
      <Dialog open={showFloorPlanDialog} onOpenChange={setShowFloorPlanDialog}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black border-gray-800 overflow-auto">
          <DialogTitle className="sr-only">Aurea Floor Plan - Full Size</DialogTitle>
          <div className="relative w-full min-h-full flex items-center justify-center p-4">
            {selectedFloorPlanImage && (
              <Image
                src={selectedFloorPlanImage}
                alt="Floor Plan - Full Size"
                width={2400}
                height={1800}
                className="w-auto h-auto object-contain"
                style={{ maxWidth: 'none' }}
                unoptimized
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Floor Plan Zoom Dialog - The Golden Mile */}
      <Dialog open={showGoldenMileFloorPlanDialog} onOpenChange={setShowGoldenMileFloorPlanDialog}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black border-gray-800 overflow-auto">
          <DialogTitle className="sr-only">The Golden Mile Floor Plan - Full Size</DialogTitle>
          <div className="relative w-full min-h-full flex items-center justify-center p-4">
            {selectedGoldenMileFloorPlanImage && (
              <Image
                src={selectedGoldenMileFloorPlanImage}
                alt="Floor Plan - Full Size"
                width={2400}
                height={1800}
                className="w-auto h-auto object-contain"
                style={{ maxWidth: 'none' }}
                unoptimized
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      </div>
    </GoogleReCaptchaProvider>
  )
} 