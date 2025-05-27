"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import Image from "next/image"

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
  "World-Class Training & Certifications"
]

export function JoinFormDialog({ isOpen, onClose, onSubmit }: JoinFormDialogProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Image
              src="/images/kwsg-logo.png"
              alt="KW Singapore"
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
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
            <Label htmlFor="fullName">Full Name</Label>
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
            <Label htmlFor="email">Email Address</Label>
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
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
              placeholder="For call-back and WhatsApp follow-up by our recruitment team"
              required
            />
          </div>

          {/* Real Estate Experience */}
          <div className="space-y-2">
            <Label>How many years have you been in real estate?</Label>
            <Select
              value={formData.experience}
              onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">I'm just starting</SelectItem>
                <SelectItem value="1-3">1–3 years</SelectItem>
                <SelectItem value="3-5">3–5 years</SelectItem>
                <SelectItem value="5+">5+ years</SelectItem>
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
            <Label>Which areas of KW Singapore interest you most?</Label>
            <div className="space-y-2">
              {AREAS_OF_INTEREST.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={formData.areasOfInterest.includes(area)}
                    onCheckedChange={() => handleAreaToggle(area)}
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
              I consent to be contacted by KW Singapore about joining as a consultant and related opportunities.
            </Label>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-primary-red hover:bg-primary-red/90">
            Schedule My Discovery Call
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 