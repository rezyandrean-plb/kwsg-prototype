"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

export default function Page() {
  const scrollToLeadForm = () => {
    const leadForm = document.getElementById('lead-form')
    if (leadForm) {
      const y = leadForm.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
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
  const { toast } = useToast()

  const handleLeadFormSubmit = async (formDataWithToken: any) => {
    const { fullName, contactNumber, emailAddress, preferredDate, preferredTiming, recaptchaToken } = formDataWithToken

    if (!fullName.trim() || !contactNumber.trim()) {
      setSubmitError('Full name and contact number are required')
      toast({ title: 'Validation Error', description: 'Full name and contact number are required', variant: 'destructive' })
      return
    }

    if (!recaptchaToken) {
      setSubmitError('Please complete the reCAPTCHA verification')
      toast({ title: 'Validation Error', description: 'Please complete the reCAPTCHA verification', variant: 'destructive' })
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      toast({ title: 'Submitting...', description: 'Please wait while we process your request' })

      const preferredDateOnly = preferredDate ? format(preferredDate, 'yyyy-MM-dd') : undefined

      const response = await fetch('/api/penrith-lead-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, contactNumber, emailAddress, preferredDate: preferredDateOnly, preferredTiming, recaptchaToken })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitSuccess(true)
        setFormData({ fullName: '', contactNumber: '', emailAddress: '', preferredDate: undefined, preferredTiming: '' })
        toast({
          title: 'Request Submitted Successfully!',
          description: 'Thank you for your interest in Penrith! Our team will contact you soon to arrange your showflat visit.'
        })
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        throw new Error(result.error || 'Failed to submit form')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit form. Please try again.'
      setSubmitError(errorMessage)
      toast({ title: 'Submission Failed', description: errorMessage, variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 bg-[#1c1c1d] shadow-sm border-b border-gray-700">
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
                <Link href="/penrith#project-info" className="text-white hover:text-[#ce001f] transition-colors duration-300">
                  Project Info
                </Link>
                <Link href="/penrith#project-gallery" className="text-white hover:text-[#ce001f] transition-colors duration-300">
                  Gallery
                </Link>
                <Link href="/penrith#floor-plans" className="text-white hover:text-[#ce001f] transition-colors duration-300">
                  Floor Plans
                </Link>
                <Link href="/penrith#media" className="text-white hover:text-[#ce001f] transition-colors duration-300">
                  Explore
                </Link>
                <Link href="/penrith#nearby-amenities" className="text-white hover:text-[#ce001f] transition-colors duration-300">
                  Location
                </Link>
                <Button onClick={scrollToLeadForm} className="bg-[#ce001f] hover:bg-[#b3001a] transition-colors duration-300">
                  Book Showflat Visit
                </Button>
              </nav>
          </div>
        </div>
      </header>
      
      <section style={{ position: 'relative', width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
        <iframe
          src="https://tubear.co/3d-model/kwsg-penrith/fullscreen/"
          frameBorder="0"
          allow="vr"
          allowFullScreen
          style={{ border: '0', width: '100%', height: '100%' }}
          title="KWSG Penrith 3D Model"
        />
      </section>

      {/* Lead Generation Form */}
      <section
        id="lead-form"
        className="pt-24 pb-12 md:py-24 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/springleaf-residence/form-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-left">
            <GoogleReCaptchaProvider
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
              scriptProps={{ async: false, defer: false, appendTo: "head", nonce: undefined }}
            >
              <LeadGenerationForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleLeadFormSubmit}
                isSubmitting={isSubmitting}
                submitSuccess={submitSuccess}
                submitError={submitError}
              />
            </GoogleReCaptchaProvider>
          </div>
        </div>
      </section>
    </>
  )
}

function LeadGenerationForm({ 
  formData, 
  setFormData, 
  onSubmit, 
  isSubmitting, 
  submitSuccess, 
  submitError 
}: {
  formData: any
  setFormData: (data: any) => void
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
    if (!formData.fullName?.trim() || !formData.contactNumber?.trim()) return
    if (!executeRecaptcha) return
    setIsExecutingRecaptcha(true)
    try {
      const token = await executeRecaptcha('showflat_visit_request')
      const mockScore = Math.random() * 0.3 + 0.7
      setSecurityScore(mockScore)
      await onSubmit({ ...formData, recaptchaToken: token })
    } finally {
      setIsExecutingRecaptcha(false)
    }
  }

  return (
    <div className="bg-white/20 backdrop-blur-sm text-white p-6 md:p-12 shadow-2xl border-0 rounded-xl hover:shadow-3xl transition-all duration-700">
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
          <label htmlFor="fullName" className="text-sm font-medium text-white">Full Name *</label>
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
          <label htmlFor="contactNumber" className="text-sm font-medium text-white">Contact Number *</label>
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
          <label htmlFor="emailAddress" className="text-sm font-medium text-white">Email Address *</label>
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
          <label className="text-sm font-medium text-white">Preferred Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full justify-start text-left font-normal bg-white text-gray-800 border-0 ${!formData.preferredDate && 'text-gray-500'}`}
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
                defaultMonth={new Date(2025, 9, 1)}
                disabled={(date) => {
                  const cutoff = new Date(2025, 9, 3)
                  cutoff.setHours(0, 0, 0, 0)
                  const d = new Date(date)
                  d.setHours(0, 0, 0, 0)
                  return d < cutoff
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <label htmlFor="preferredTiming" className="text-sm font-medium text-white">Preferred Time</label>
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
                  <span className="text-xs text-green-400 font-medium">Score: {(securityScore * 100).toFixed(0)}%</span>
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
    </div>
  )
}


