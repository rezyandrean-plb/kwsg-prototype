"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Image from "next/image"

interface BootcampRegistrationDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

const BOOTCAMP_OPTIONS = [
  "Seller Presentation Mastery",
  "High-Conversion Buyer Consultations",
  "New Launch Analysis",
  "Webinar & Market Charts",
  "Other Training Bootcamp"
]

export function BootcampRegistrationDialog({ isOpen, onClose, onSubmit }: BootcampRegistrationDialogProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    selectedBootcamps: [] as string[]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate bootcamp selection
    if (formData.selectedBootcamps.length === 0) {
      alert("Please select at least one training bootcamp")
      return
    }

    // Just log the form data for now
    console.log('Bootcamp registration submitted:', formData)
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      selectedBootcamps: []
    })
    
    // Close the dialog
    onClose()
  }

  const handleBootcampToggle = (bootcamp: string) => {
    setFormData(prev => ({
      ...prev,
      selectedBootcamps: prev.selectedBootcamps.includes(bootcamp)
        ? prev.selectedBootcamps.filter(b => b !== bootcamp)
        : [...prev.selectedBootcamps, bootcamp]
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
          <DialogTitle className="text-2xl font-bold text-center">Register for Training Bootcamps</DialogTitle>
          <DialogDescription className="text-center">
            Express your interest in our specialized training bootcamps. Our team will reach out with details about upcoming sessions and registration information.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              placeholder="Enter your last name"
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
              placeholder="We'll send you bootcamp details and updates"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number <span className="text-red-500">*</span></Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              placeholder="For call-back and WhatsApp follow-up"
              required
            />
          </div>

          {/* Training Bootcamp Selection */}
          <div className="space-y-2">
            <Label>Which Training Bootcamp(s) are you interested in? <span className="text-red-500">*</span></Label>
            <div className="space-y-2">
              {BOOTCAMP_OPTIONS.map((bootcamp) => (
                <div key={bootcamp} className="flex items-center space-x-2">
                  <Checkbox
                    id={bootcamp}
                    checked={formData.selectedBootcamps.includes(bootcamp)}
                    onCheckedChange={() => handleBootcampToggle(bootcamp)}
                    required={formData.selectedBootcamps.length === 0}
                  />
                  <Label htmlFor={bootcamp} className="font-normal">{bootcamp}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#B40101] hover:bg-[#B40101]/90">
            Register for Interest
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 