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
  X,
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
    } else if (!/^[\+]?[^\s\-\(\)]{0}|[0-9\s\-\(\)]{8,}$/.test(formData.contactNumber)) {
      // keep original pattern from backup (we'll keep simpler): fallback to original
      if (!/^[\+]?[0-9\s\-\(\)]{8,}$/.test(formData.contactNumber)) {
        errors.contactNumber = 'Please enter a valid contact number'
      }
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
    <Card className={`bg-white/20 backdrop-blur-sm text-white p-6 md:p-12 shadow-2xl border-0 rounded-xl hover:shadow-3xl transition-all duration-700 hover:scale-105`}>
      <h2 className="text-4xl font-bold mb-4 text-white text-center">Book Your Showflat Visit Today</h2>
      <p className="text-md mb-8 opacity-90 text-white text-center">
        Be the first to own a home that combines convenience, luxury, and nature. Register now for an exclusive preview of Penrith.
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
                defaultMonth={new Date(2025, 9, 1)} // October 2025 (month is 0-indexed, so 9 = October)
                disabled={(date) => {
                  // Disable all dates before October 3rd, 2025
                  const cutoff = new Date(2025, 9, 3); // Oct 3, 2025
                  // Zero out time components for safe comparison
                  cutoff.setHours(0, 0, 0, 0)
                  const d = new Date(date)
                  d.setHours(0, 0, 0, 0)
                  return d < cutoff;
                }}
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

export default function SpringleafResidenceLanding() {
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedFloorPlan, setSelectedFloorPlan] = useState("1br")
  const [isScrolled, setIsScrolled] = useState(false)
  const [date, setDate] = useState<Date>()
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set())
  const [showSiteMapPopup, setShowSiteMapPopup] = useState(false)
  const [unitsActiveTab, setUnitsActiveTab] = useState(0)
  const [floorPlanIndex, setFloorPlanIndex] = useState(0)

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

  useEffect(() => {
    setFloorPlanIndex(0)
  }, [unitsActiveTab])

  const [projectImages, setProjectImages] = useState<string[]>([])

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await fetch('/api/penrith/gallery')
        if (!res.ok) throw new Error('Failed to load gallery')
        const data = await res.json()
        if (Array.isArray(data?.images) && data.images.length > 0) {
          setProjectImages(data.images)
        } else {
          setProjectImages([
            "/images/penrith/penrith-hero-background.webp",
            "/images/penrith/penrith-exterior-view.webp",
            "/images/penrith/penrith-facilities.webp",
            "/images/penrith/penrith-drone-view.webp",
            "/images/penrith/penrith-balcony.webp",
          ])
        }
      } catch (e) {
        setProjectImages([
          "/images/penrith/penrith-hero-background.webp",
          "/images/penrith/penrith-exterior-view.webp",
          "/images/penrith/penrith-facilities.webp",
          "/images/penrith/penrith-drone-view.webp",
          "/images/penrith/penrith-balcony.webp",
        ])
      }
    }
    loadGallery()
  }, [])


  const amenities = [
    // TRANSPORT
    { icon: <Train className="w-6 h-6" />, name: "Queenstown MRT", distance: "4-Mins walk", category: "Transport" },
    { icon: <Train className="w-6 h-6" />, name: "Outram Park MRT", distance: "3-Stops MRT", category: "Transport" },
    { icon: <Train className="w-6 h-6" />, name: "Tanjong Pagar MRT", distance: "4-Stops MRT", category: "Transport" },
    { icon: <Car className="w-6 h-6" />, name: "Orchard Road / CBD", distance: "10–15-Mins drive", category: "Transport" },
    { icon: <Car className="w-6 h-6" />, name: "AYE (Ayer Rajah Expressway)", distance: "2-Mins drive", category: "Transport" },
    { icon: <Car className="w-6 h-6" />, name: "PIE (Pan Island Expressway)", distance: "5-Mins drive", category: "Transport" },
    { icon: <Car className="w-6 h-6" />, name: "CTE (Central Expressway)", distance: "7-Mins drive", category: "Transport" },
    
    // RETAIL AND F&B
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Queensway Shopping Centre", distance: "6-Mins walk", category: "Retail & F&B" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "IKEA Alexandra", distance: "8-Mins walk", category: "Retail & F&B" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Alexandra Central", distance: "7-Mins walk", category: "Retail & F&B" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Anchorpoint", distance: "8-Mins walk", category: "Retail & F&B" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Mei Ling Market & Food Centre", distance: "4-Mins walk", category: "Retail & F&B" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Dawson Place", distance: "3-Mins drive", category: "Retail & F&B" },
    
    // NATURE AND LEISURE
    { icon: <Trees className="w-6 h-6" />, name: "Alexandra Canal Linear Park", distance: "5-Mins walk", category: "Nature & Leisure" },
    { icon: <Trees className="w-6 h-6" />, name: "Rail Corridor (Alexandra stretch)", distance: "7-Mins walk", category: "Nature & Leisure" },
    { icon: <Trees className="w-6 h-6" />, name: "HortPark", distance: "8-Mins drive", category: "Nature & Leisure" },
    { icon: <Trees className="w-6 h-6" />, name: "Dempsey Hill dining & lifestyle", distance: "8-Mins drive", category: "Nature & Leisure" },
    { icon: <Trees className="w-6 h-6" />, name: "Labrador Nature Reserve", distance: "10-Mins drive", category: "Nature & Leisure" },
    { icon: <Trees className="w-6 h-6" />, name: "Botanic Gardens", distance: "10-Mins drive", category: "Nature & Leisure" },
    
    // EDUCATION
    { icon: <GraduationCap className="w-6 h-6" />, name: "Queenstown Primary School", distance: "6-Mins walk", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Queenstown Secondary School", distance: "8-Mins walk", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Queensway Secondary School", distance: "9-Mins walk", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Alexandra Primary School", distance: "5-Mins drive", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Gan Eng Seng Primary School", distance: "7-Mins drive", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "New Town Primary School", distance: "8-Mins drive", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "ACS International", distance: "10-Mins drive", category: "Education" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Invictus International / Melbourne International", distance: "12-Mins drive", category: "Education" },
    
    // HEALTHCARE
    { icon: <Hospital className="w-6 h-6" />, name: "Alexandra Hospital", distance: "6-Mins drive", category: "Healthcare" },
    { icon: <Hospital className="w-6 h-6" />, name: "National University Hospital (NUH)", distance: "10-Mins drive", category: "Healthcare" },
    { icon: <Hospital className="w-6 h-6" />, name: "Gleneagles Hospital", distance: "12-Mins drive", category: "Healthcare" },
    { icon: <Hospital className="w-6 h-6" />, name: "Khoo Teck Puat Hospital", distance: "8-Stops MRT", category: "Healthcare" },
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

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('project-gallery')
    if (gallerySection) {
      gallerySection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const scrollToFloorPlans = () => {
    const gallerySection = document.getElementById('floor-plans')
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
  const [securityScore, setSecurityScore] = useState<number | null>(null)

  const [isSiteMapSubmitting, setIsSiteMapSubmitting] = useState(false)
  const [siteMapSubmitSuccess, setSiteMapSubmitSuccess] = useState(false)
  const [siteMapSubmitError, setSiteMapSubmitError] = useState<string | null>(null)

  // Build likely floor-plan filenames from unit type/subtype to match files placed in public/images/penrith/floor-plan
  const generatePenrithFloorPlanCandidates = (subtype: any, unitType: string) => {
    const base = '/images/penrith/floor-plan/'
    const candidates: string[] = []

    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const ut = normalize(unitType.replace(' Units', ''))
    const st = normalize(subtype?.subtype || '')

    const extractBedroomLabel = (raw: string) => {
      const m = (raw || '').match(/(\d+)\s*-?\s*bedroom/i)
      if (m) return `${m[1]} Bedroom`
      const m2 = (unitType || '').match(/(\d+)\s*-?\s*bedroom/i)
      if (m2) return `${m2[1]} Bedroom`
      return ''
    }
    const bedroomLabel = extractBedroomLabel(subtype?.subtype || unitType)

    if (bedroomLabel) {
      const typeLetters = ['A','B','C','D','E','F']
      const extsPriority = ['jpg', 'jpeg', 'png', 'webp']
      for (const L of typeLetters) {
        // Variants WITHOUT numbers (e.g., "Type A.jpg")
        for (const ext of extsPriority) {
          candidates.push(`${base}${bedroomLabel} - Type ${L}.${ext}`)
        }
        // Variants WITH numbers (e.g., "Type A1.jpg" and "Type A1H.jpg")
        for (let n = 1; n <= 9; n++) {
          for (const ext of extsPriority) {
            candidates.push(`${base}${bedroomLabel} - Type ${L}${n}.${ext}`)
            candidates.push(`${base}${bedroomLabel} - Type ${L}${n}H.${ext}`)
          }
        }
      }
    }

    const patterns = [st, ut, st.replace('bedroom-', 'br-'), ut.replace('bedroom-', 'br-')].filter(Boolean)
    for (const p of patterns) {
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

    if (subtype?.floor_plan_image) {
      candidates.unshift(subtype.floor_plan_image)
    }

    const seen = new Set<string>()
    return candidates.filter((c) => (seen.has(c) ? false : (seen.add(c), true)))
  }

  // Mock data and helpers for unit availability (align with Aurea implementation)
  const mockUnitPricing = [
    {
      unitType: "2-Bedroom",
      subtypes: [
        {
          subtype: "2-Bedroom",
          bedrooms: 2,
          bathrooms: 2,
          size: "614 - 678 sqft",
          price: "$1.9M - $2.2M",
          price_per_sqft: 2400,
          currency: "SGD",
          total: 150,
          available: 60,
          status: 40,
          floor_plan_images: [
            "/images/penrith/floor-plan/2 Bedroom - Type A.jpg",
            "/images/penrith/floor-plan/2 Bedroom - Type B.jpg",
          ],
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
          size: "786 - 1066 sqft",
          price: "$2.5M - $2.9M",
          price_per_sqft: 2450,
          currency: "SGD",
          total: 200,
          available: 80,
          status: 40,
          floor_plan_images: [
            "/images/penrith/floor-plan/3 Bedroom - Type A.jpg",
            "/images/penrith/floor-plan/3 Bedroom - Type B.jpg",
            "/images/penrith/floor-plan/3 Bedroom - Type C.jpg",
            "/images/penrith/floor-plan/3 Bedroom - Type D.jpg"
          ],
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
          size: "1173 - 1281 sqft",
          price: "$3.2M - $3.9M",
          price_per_sqft: 2550,
          currency: "SGD",
          total: 112,
          available: 40,
          status: 36,
          floor_plan_images: [
            "/images/penrith/floor-plan/4 Bedroom - Type A.jpg",
            "/images/penrith/floor-plan/4 Bedroom - Type B.jpg",
          ],
        }
      ]
    },
  ]

  const processUnitAvailabilityData = (unitPricing: any[]) => {
    if (!unitPricing || unitPricing.length === 0) {
      return mockUnitPricing
    }
    return unitPricing
  }

  const project = {
    unitPricing: mockUnitPricing,
  }

  const handleLeadFormSubmit = async (formDataWithToken: any) => {
    const { fullName, contactNumber, emailAddress, preferredDate, preferredTiming, recaptchaToken } = formDataWithToken
    
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

      // Ensure only the date (no time) is submitted for preferredDate
      const preferredDateOnly = preferredDate ? format(preferredDate, 'yyyy-MM-dd') : undefined

      const response = await fetch('/api/penrith-lead-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          fullName, 
          contactNumber, 
          emailAddress, 
          preferredDate: preferredDateOnly, 
          preferredTiming, 
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
          preferredTiming: ''
        })
        setDate(undefined)
        
        // Show success toast
        toast({
          title: "Request Submitted Successfully!",
          description: "Thank you for your interest in Penrith! We have sent you a confirmation email and our team will contact you soon to arrange your showflat visit.",
          variant: "default",
        })
        
      // Auto refresh page shortly after success
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.reload()
        }
      }, 1500)

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
        setShowSiteMapPopup(false)
        
        toast({
          title: "Site Map Request Submitted!",
          description: "Thank you for your interest! We will contact you soon with the site map.",
          variant: "default",
        })
        
      // Auto refresh page shortly after success
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.reload()
        }
      }, 1500)

        // Reset success state after 5 seconds
        setTimeout(() => setSiteMapSubmitSuccess(false), 5000)
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
                  onClick={scrollToProjectInfo}
                  className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                >
                  Project Info
                </button>
                <button 
                  onClick={scrollToGallery}
                  className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                >
                  Gallery
                </button>
                <button 
                  onClick={scrollToFloorPlans}
                  className="text-white hover:text-[#ce001f] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                >
                  Floor Plans
                </button>
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

            {/* Clean CTA Buttons */}
            <div className={`cta-buttons-container mb-4 sm:mb-4 md:mb-4 lg:mb-8 transition-all duration-700 delay-1700 ${
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
            <h2 className="text-3xl font-light mb-3 text-white text-center tracking-wide">The Margaret Drive Address That Brings You Closer to Everything</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Penrith is a new 462-unit condominium along Margaret Drive, developed by Hong Leong and GuocoLand. 
            Situated in the heart of Queenstown, it is just a 5-minute walk from Queenstown MRT, with everyday conveniences and schools close by — while Orchard, the CBD, and One-North are only a short train ride away.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="flex flex-wrap gap-6 lg:gap-4 mb-12 justify-center">
            {[
              { icon: <Train className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "4 mins walk to Queenstown MRT on the East–West Line" },
              { icon: <Train className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "3–6 MRT stops to Outram, Tanjong Pagar, Raffles Place & Marina Bay" },
              { icon: <Car className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "Seamless access to AYE, PIE & CTE" },
              { icon: <GraduationCap className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "Within 1km of Queenstown Primary & Secondary Schools" },
              { icon: <BedDouble className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "2- to 4-Bedroom Units with Full Condo Facilities" },
              { icon: <Layers className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "99-Year Leasehold in the heart of Queenstown" },
              { icon: <Building className="w-12 h-12 mx-auto mb-4" style={{ color: '#ce001f' }} />, desc: "Jointly developed by Hong Leong and GuocoLand" }
            ].map((card, index) => (
              <Card 
                key={index} 
                className={`basis-full md:basis-[calc(50%-12px)] lg:basis-[calc(25%-12px)] text-center hover:shadow-lg transition-all duration-700 border-gray-700 bg-[#18191b] hover:scale-105 hover-lift stagger-animation ${
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
                  <span className="font-semibold text-white">Penrith</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Developer:</span>
                  <span className="font-semibold text-white text-right">Hong Leong Holdings & GuocoLand<br/>(Margaret Rise Development Pte Ltd)</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Tenure:</span>
                  <span className="font-semibold text-white text-right">99 years Leasehold from <br/> 4 November 2024</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">District:</span>
                  <span className="font-semibold text-white">3 (Queenstown)</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Site Area:</span>
                  <span className="font-semibold text-white">9,522.3 Sqm / 102,498 Sqft</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Blocks:</span>
                  <span className="font-semibold text-white text-right sm:text-left">40 storeys</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Total Units:</span>
                  <span className="font-semibold text-white">462</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Unit Mix:</span>
                  <span className="font-semibold text-white">2- to 5-bedroom</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">TOP:</span>
                  <span className="font-semibold text-right">1 April 2029 <br/> (non-commitment basis)</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Target Preview:</span>
                  <span className="font-semibold text-white">3 October 2025</span>
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
                      <h4 className="font-semibold text-white">Site Map</h4>
                    </div>
                    <Image
                      src="/images/penrith/penrith-site-map.webp"
                      alt="Penrith Site Map"
                      width={800}
                      height={500}
                      quality={90}
                      className="w-full rounded mb-3 hover:scale-95 transition-transform duration-500 object-contain"
                    />
                    <p className="text-sm text-gray-300 mb-3">
                      View the overall development layout and facilities distribution
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full bg-[#ce001f] hover:bg-[#ce001f]/20 hover:text-white transition-all duration-300 border-gray-500 text-gray-300"
                      onClick={() => setShowSiteMapPopup(true)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Required Site Map
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Gallery Section */}
          <div 
            id="project-gallery"
            className={`mb-20 transition-all duration-1000 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
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
                  alt={`Penrith - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover transition-all duration-500"
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

                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <h4 className="text-lg font-semibold mb-1">
                      {currentImageIndex === 0
                        ? "Aerial View"
                        : currentImageIndex === 1
                        ? "Condo Exterior Look"
                        : currentImageIndex === 2
                        ? "Facilities & Amenities"
                        : currentImageIndex === 3
                        ? "Drone View"
                        : currentImageIndex === 4
                        ? "Balcony View"
                        : "Project Overview"}
                    </h4>
                    <p className="text-sm opacity-90">
                      {currentImageIndex === 0
                        ? "Breathtaking aerial perspective of Penrith"
                        : currentImageIndex === 1
                        ? "Modern condo exterior with contemporary design"
                        : currentImageIndex === 2
                        ? "Premium facilities and lifestyle amenities"
                        : currentImageIndex === 3
                        ? "Stunning main pool with aqua deck and alcove"
                        : "Comprehensive project overview and highlights"}
                    </p>
                  </div>
                </div>
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

          {/* Call to Action */}
          <div className={`text-center mb-4 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="bg-gradient-to-r from-[#ce001f] to-[#b3001a] text-white rounded-2xl p-8 max-w-4xl mx-auto hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">Be the first to own a home that combines convenience, luxury, and nature</h3>
              <p className="text-lg mb-6 opacity-90">
                Register now for an exclusive preview of Penrith
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
      <section 
        id="floor-plans"
        className="py-16 bg-[#242728] section-entrance"
        data-section-id="floor-plans"
        style={{ 
          opacity: animatedSections.has('floor-plans') ? 1 : 0,
          transform: animatedSections.has('floor-plans') ? 'translateY(0)' : 'translateY(60px)'
        }}
      >
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 delay-300 ${
            animatedSections.has('floor-plans') ? 'animate-slide-in-top' : ''
          }`}>
            <h2 className="text-3xl font-light mb-3 text-white text-center tracking-wide">Floor Plans</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-xl text-gray-300">Discover your perfect home from our collection of meticulously designed residences</p>
          </div>

          <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-500 ${
            animatedSections.has('floor-plans') ? 'animate-fade-in-up' : ''
          }`} style={{
            opacity: animatedSections.has('floor-plans') ? 1 : 0,
            transform: animatedSections.has('floor-plans') ? 'translateY(0)' : 'translateY(50px)'
          }}>
            {/* Tabs for unit types */}
            <div className="w-full px-2 sm:px-6 pt-4 sm:pt-6 pb-2 border-b border-gray-700 mb-6 sm:mb-8">
              <div className="flex flex-nowrap gap-1 sm:gap-2 justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent" style={{ WebkitOverflowScrolling: 'touch' }}>
                {(() => {
                  const dynamicUnitData = processUnitAvailabilityData(project?.unitPricing || [])
                  
                  // If no API data, show message
                  if (dynamicUnitData.length === 0) {
                    return (
                      <div className="col-span-full text-center py-8">
                        <p className="text-gray-400">No unit information available at the moment.</p>
                        <p className="text-sm text-gray-500 mt-2">Please check back later or contact our agents for more details.</p>
                      </div>
                    )
                  }
                  
                  return dynamicUnitData.map((unit, idx) => {
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
                        {/* {totalAvailable > 0 && (
                          <span className="bg-green-500 text-white text-xs px-1 sm:px-2 py-1 rounded-full">
                            {totalAvailable}
                          </span>
                        )} */}
                      </button>
                    )
                  })
                })()}
              </div>
            </div>

            {/* Card layout for selected unit type */}
            {(() => {
              const dynamicUnitData = processUnitAvailabilityData(project?.unitPricing || [])
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
                                : generatePenrithFloorPlanCandidates(subtype, currentUnit.unitType)
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
                                  {hasImages && images.length > 1 && (
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
                                onClick={() => scrollToSection('lead-form')}
                                className="w-full bg-white text-red-500 hover:bg-white-600 text-red-500 font-medium py-3 px-4 rounded-lg text-sm transition-colors"
                              >
                                Required Brochure
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
      </section>

      {/* Trusted Developer Section */}
      <section id="trusted-developer" className="bg-[#1c1c1d] text-white mt-8 md:mt-10 border-t border-gray-700 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <h3 className="text-2xl md:text-4xl font-semibold mb-8 md:mb-10">Trusted Developer with Proven Success</h3>
          <div className="flex items-center justify-center gap-8 md:gap-16 mb-8 md:mb-10 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="rounded-md bg-white/70 p-3">
                <Image
                  src="/images/penrith/hong-leong.png"
                  alt="Hong Leong Holdings Limited"
                  width={140}
                  height={60}
                  className="h-12 w-auto opacity-90"
                />
              </div>
              <span className="hidden sm:block text-sm md:text-base opacity-90">Hong Leong Holdings Limited</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-md bg-white/70 p-3">
                <Image
                  src="/images/penrith/guocoland.png"
                  alt="GuocoLand"
                  width={140}
                  height={60}
                  className="h-12 w-auto opacity-90"
                />
              </div>
              <span className="hidden sm:block text-sm md:text-base opacity-90">GuocoLand</span>
            </div>
          </div>
          <p className="text-base md:text-xl text-gray-300 leading-relaxed max-w-5xl mx-auto">
            Hong Leong and GuocoLand are trusted names in the Singapore real estate market. Their extensive portfolio includes successful developments such as Lentor Mansion and Springleaf Residence. With Penrith, they continue their commitment to delivering high-quality, innovative residential projects.
          </p>
        </div>
      </section>

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
            {/* First Row - 2 Cards on Mobile, 3 Cards on Desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              {[
                { icon: <Train className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#ce001f' }} />, title: '4-min Walk to Queenstown MRT', subtitle: 'strong rental demand from professionals in CBD & One-North' },
                { icon: <MapPin className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#ce001f' }} />, title: 'City-Fringe Location in D03', subtitle: 'proven resilience and sustained buyer demand' },
                { icon: <Clock className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#ce001f' }} />, title: 'First GLS Launch in Queenstown Since 2017', subtitle: 'limited new supply drives scarcity premium' }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className={`hover:shadow-lg transition-all duration-700 bg-[#18191b] rounded-xl hover:scale-105 hover-lift stagger-animation ${
                    animatedSections.has('investor-benefits') ? 'animate' : ''
                  } ${index === 2 ? 'hidden md:block' : ''}`}
                  style={{ 
                    transitionDelay: `${index * 200}ms`,
                    opacity: animatedSections.has('investor-benefits') ? 1 : 0,
                    transform: animatedSections.has('investor-benefits') ? 'translateY(0)' : 'translateY(40px)'
                  }}
                >
                  <div className="p-4 md:p-6 flex flex-col items-center text-center space-y-2">
                    <div className="flex-shrink-0">{benefit.icon}</div>
                    <h3 className="text-sm md:text-lg text-white font-semibold leading-snug">{benefit.title}</h3>
                    <p className="text-xs md:text-sm text-gray-300 font-light">{benefit.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row - 2 Cards on Mobile, 2 Cards on Desktop */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-6">
              {[
                { icon: <Compass className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#ce001f' }} />, title: 'Close to Key Growth Hubs', subtitle: 'Orchard, CBD, and One-North business park in minutes' },
                { icon: <Building className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#ce001f' }} />, title: 'Blue-Chip Developers', subtitle: 'Hong Leong + GuocoLand track record in premium city projects' }
              ].map((benefit, index) => (
                <div 
                  key={index + 3}
                  className={`hover:shadow-lg transition-all duration-700 bg-[#18191b] rounded-xl hover:scale-105 hover-lift stagger-animation ${
                    animatedSections.has('investor-benefits') ? 'animate' : ''
                  }`}
                  style={{ 
                    transitionDelay: `${(index + 3) * 200}ms`,
                    opacity: animatedSections.has('investor-benefits') ? 1 : 0,
                    transform: animatedSections.has('investor-benefits') ? 'translateY(0)' : 'translateY(40px)'
                  }}
                >
                  <div className="p-4 md:p-6 flex flex-col items-center text-center space-y-2">
                    <div className="flex-shrink-0">{benefit.icon}</div>
                    <h3 className="text-sm md:text-lg text-white font-semibold leading-snug">{benefit.title}</h3>
                    <p className="text-xs md:text-sm text-gray-300 font-light">{benefit.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Third Row - 1 Card Centered on Mobile, Hidden on Desktop */}
            <div className="grid grid-cols-4 md:hidden gap-6">
              <div className="col-span-1"></div>
              <div 
                className={`col-span-2 hover:shadow-lg transition-all duration-700 bg-[#18191b] rounded-xl hover:scale-105 hover-lift stagger-animation ${
                  animatedSections.has('investor-benefits') ? 'animate' : ''
                }`} 
                style={{ 
                  transitionDelay: `1000ms`,
                  opacity: animatedSections.has('investor-benefits') ? 1 : 0,
                  transform: animatedSections.has('investor-benefits') ? 'translateY(0)' : 'translateY(40px)'
                }}
              >
                <div className="p-4 md:p-6 flex flex-col items-center text-center space-y-2">
                  <div className="flex-shrink-0"><Clock className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#ce001f' }} /></div>
                  <h3 className="text-sm md:text-lg text-white font-semibold leading-snug">First GLS Launch in Queenstown Since 2017</h3>
                  <p className="text-xs md:text-sm text-gray-300 font-light">limited new supply drives scarcity premium</p>
                </div>
              </div>
              <div className="col-span-1"></div>
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
                    src="/images/penrith/penrith-location-map.webp"
                    alt="Penrith Location Map"
                    width={1200}
                    height={800}
                    quality={90}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5" style={{ color: '#ce001f' }} />
                    <div>
                    <p className="font-semibold text-white">Address</p>
                      <p className="text-sm text-gray-300 font-light">Margaret Drive, Queenstown</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Train className="w-5 h-5" style={{ color: '#ce001f' }} />
                    <div>
                      <p className="font-semibold text-white">MRT</p>
                      <p className="text-sm text-gray-300 font-light">Queenstown MRT (EW Line)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Car className="w-5 h-5" style={{ color: '#ce001f' }} />
                    <div>
                      <p className="font-semibold text-white">Access</p>
                      <p className="text-sm text-gray-300 font-light">AYE | PIE | CTE</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
                            <p className="text-gray-300 font-light text-xs md:text-sm break-words">{amenity.distance}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Enhanced Media Section */}
      <section id="media" className="pt-4 pb-4 bg-[#1c1c1d] flex items-center justify-center">
        <div className="container mx-auto px-4 text-left">
        <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-2xl md:text-3xl font-light mb-3 text-white text-center tracking-wide">Explore Penrith</h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-1 bg-[#ce001f] rounded" />
            </div>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Immerse yourself in the luxury and elegance of our latest development through our comprehensive media
              gallery
            </p>
          </div>

          
          <div className={`space-y-8 md:space-y-20 transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            
            <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <Badge className="bg-white text-[#ce001f]">NEW LAUNCH ANALYSIS</Badge>
                <h3 className="text-xl md:text-3xl font-semibold md:font-bold text-[#ce001f]">
                  Does Penrith's Future Promise Live Up to Queenstown's Proven Past?
                </h3>
                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                  In a mature estate like Queenstown, a new launch presents a rare opportunity—and a critical choice. 
                  This exclusive on-demand webinar provides the exact frameworks used by veteran investors to analyse Penrith against proven resale performers. 
                  Learn to calculate a safe entry price, identify real growth drivers, and engineer a profitable exit from Day 1.
                </p>
                  <Button 
                    className="bg-[#ce001f] hover:bg-[#b3001a] text-white px-8 py-3 hover:scale-105 transition-all duration-300"
                    onClick={() => window.open('https://newlaunch.kwsingapore.com/penrith-queenstown-webinar', '_blank')}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Watch Analysis
                  </Button>
              </div>
              <div className="relative hover:scale-105 transition-transform duration-500 p-0 md:p-0 order-1 lg:order-2">
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/penrith/explore-1.webp?height=320&width=500&text=Lentor+Mansion+Showflat+Tour"
                    alt="Explore Penrith"
                    fill
                    className="object-contain md:object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className={`text-center mt-12 sm:mt-16 md:mt-18 lg:mt-12 mb-4 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="bg-gradient-to-r from-[#ce001f] to-[#b3001a] text-white rounded-2xl p-8 max-w-4xl mx-auto hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <h3 className="text-xl md:text-2xl font-normal md:font-bold mb-4">Be the first to own a home that combines convenience, luxury, and nature</h3>
              <p className="text-base md:text-lg mb-6 opacity-90">
                Register now for an exclusive preview of Penrith
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
        className={`py-8 md:py-16 relative bg-cover bg-center section-entrance`}
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

      {/* Site Map Request Popup */}
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


      </div>
    </GoogleReCaptchaProvider>
  )
} 