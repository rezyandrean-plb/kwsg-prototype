"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import dynamic from "next/dynamic"
import { useState } from "react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

// Dynamically import non-critical components
const Select = dynamic(() => import("@/components/ui/select").then(mod => mod.Select), {
  loading: () => <div className="h-10" />,
  ssr: false
})
const SelectContent = dynamic(() => import("@/components/ui/select").then(mod => mod.SelectContent), {
  loading: () => <div className="h-0" />,
  ssr: false
})
const SelectItem = dynamic(() => import("@/components/ui/select").then(mod => mod.SelectItem), {
  loading: () => <div className="h-0" />,
  ssr: false
})
const SelectTrigger = dynamic(() => import("@/components/ui/select").then(mod => mod.SelectTrigger), {
  loading: () => <div className="h-10" />,
  ssr: false
})
const SelectValue = dynamic(() => import("@/components/ui/select").then(mod => mod.SelectValue), {
  loading: () => <div className="h-0" />,
  ssr: false
})

interface JoinFormDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

const AREAS_OF_INTEREST = [
  "Growth Share & Passive Income",
  "AI + PropTech Tools",
  "Media & Personal Branding Support",
  "KW Research Platform",
  "World-Class Training"
]

export function JoinFormDialog({ isOpen, onClose, onSubmit }: JoinFormDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    experience: "",
    currentBrokerage: "",
    areasOfInterest: [] as string[],
    linkedinUrl: "",
    consent: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate areas of interest
    if (formData.areasOfInterest.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one area of interest",
        variant: "destructive",
      })
      return
    }

    // Validate consent
    if (!formData.consent) {
      toast({
        title: "Validation Error",
        description: "Please consent to be contacted by KW Singapore",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    
    // Show submitting toast
    toast({
      title: "Submitting...",
      description: "Please wait while we process your application",
    })

    try {
      const response = await fetch('/api/join-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast({
          title: "Success!",
          description: "Your application has been submitted successfully. We'll be in touch within 24 hours.",
          variant: "default",
        })
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          experience: "",
          currentBrokerage: "",
          areasOfInterest: [],
          linkedinUrl: "",
          consent: false
        })
        
        // Close the dialog after a short delay
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        toast({
          title: "Submission Error",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.includes(area)
        ? prev.areasOfInterest.filter(a => a !== area)
        : [...prev.areasOfInterest, area]
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Image
              src="/images/kwsg-logo.webp"
              alt="KW Singapore"
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
              fetchPriority="high"
            />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">Join KW Singapore</DialogTitle>
          <DialogDescription className="text-center">
            Looking to build a career worth having and a business worth owning? Tell us more about you — this is your first step toward becoming a KW Singapore real estate consultant. A member of our Growth Team will reach out to guide you forward.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              placeholder="Let's start with your name"
              required
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="We'll use this to send important next steps and insights"
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number <span className="text-red-500">*</span></Label>
            <Input
              id="mobile"
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
              placeholder="For call-back and WhatsApp follow-up by our Growth Team"
              required
            />
          </div>

          {/* Real Estate Experience */}
          <div className="space-y-2">
            <Label>How many years have you been in real estate?</Label>
            <Select
              value={formData.experience}
              onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#B40101] focus:ring-[#B40101]">
                <SelectValue placeholder="Select your experience" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="new" className="text-gray-900 hover:bg-gray-100">I'm just starting</SelectItem>
                <SelectItem value="1-3" className="text-gray-900 hover:bg-gray-100">1–3 years</SelectItem>
                <SelectItem value="3-5" className="text-gray-900 hover:bg-gray-100">3–5 years</SelectItem>
                <SelectItem value="5+" className="text-gray-900 hover:bg-gray-100">5+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Current Brokerage */}
          <div className="space-y-2">
            <Label htmlFor="currentBrokerage">Current Brokerage (if any)</Label>
            <Input
              id="currentBrokerage"
              value={formData.currentBrokerage}
              onChange={(e) => setFormData(prev => ({ ...prev, currentBrokerage: e.target.value }))}
              placeholder="We're open to experienced consultants and fresh starts alike"
            />
          </div>

          {/* Areas of Interest */}
          <div className="space-y-2">
            <Label>Which areas of KW Singapore interest you most? <span className="text-red-500">*</span></Label>
            <div className="space-y-2">
              {AREAS_OF_INTEREST.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={formData.areasOfInterest.includes(area)}
                    onCheckedChange={() => handleAreaToggle(area)}
                    required={formData.areasOfInterest.length === 0}
                  />
                  <Label htmlFor={area} className="font-normal">{area}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* LinkedIn URL */}
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn Profile or Portfolio URL</Label>
            <Input
              id="linkedinUrl"
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
              placeholder="If you have an online profile, feel free to share it"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
              required
            />
            <Label htmlFor="consent" className="font-normal">
              I consent to be contacted by KW Singapore about joining as a consultant and related opportunities. <span className="text-red-500">*</span>
            </Label>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-primary-red hover:bg-primary-red/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Schedule My Discovery Call"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 