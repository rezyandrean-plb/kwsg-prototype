"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ContactFormProps {
  headline: string
  body: string
  onSubmit: (data: any) => void
}

export function ContactForm({ headline, body, onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    agency: "",
    interests: {
      newLaunch: false,
      aboutKW: false,
      kwCulture: false,
      growthShare: false,
      kwTech: false,
      kwTraining: false,
      kwLeaders: false,
      others: false
    },
    othersText: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [interest]: !prev.interests[interest as keyof typeof prev.interests]
      }
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{headline}</h2>
        <p className="text-gray-600">{body}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agency">Agency</Label>
            <Input
              id="agency"
              value={formData.agency}
              onChange={(e) => setFormData(prev => ({ ...prev, agency: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Area of Interest</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newLaunch"
                checked={formData.interests.newLaunch}
                onCheckedChange={() => handleInterestChange("newLaunch")}
              />
              <Label htmlFor="newLaunch">New Launch</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="aboutKW"
                checked={formData.interests.aboutKW}
                onCheckedChange={() => handleInterestChange("aboutKW")}
              />
              <Label htmlFor="aboutKW">About KW #1 Global Realty Network</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="kwCulture"
                checked={formData.interests.kwCulture}
                onCheckedChange={() => handleInterestChange("kwCulture")}
              />
              <Label htmlFor="kwCulture">KW Culture</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="growthShare"
                checked={formData.interests.growthShare}
                onCheckedChange={() => handleInterestChange("growthShare")}
              />
              <Label htmlFor="growthShare">Build your passive income with Growth Share</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="kwTech"
                checked={formData.interests.kwTech}
                onCheckedChange={() => handleInterestChange("kwTech")}
              />
              <Label htmlFor="kwTech">KW tech suite</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="kwTraining"
                checked={formData.interests.kwTraining}
                onCheckedChange={() => handleInterestChange("kwTraining")}
              />
              <Label htmlFor="kwTraining">KW training</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="kwLeaders"
                checked={formData.interests.kwLeaders}
                onCheckedChange={() => handleInterestChange("kwLeaders")}
              />
              <Label htmlFor="kwLeaders">KW leaders</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="others"
                checked={formData.interests.others}
                onCheckedChange={() => handleInterestChange("others")}
              />
              <Label htmlFor="others">Others</Label>
            </div>
          </div>

          {formData.interests.others && (
            <div className="mt-4">
              <Label htmlFor="othersText">Please specify:</Label>
              <Input
                id="othersText"
                value={formData.othersText}
                onChange={(e) => setFormData(prev => ({ ...prev, othersText: e.target.value }))}
                placeholder="Please specify your interest"
              />
            </div>
          )}
        </div>

        <Button type="submit" className="w-full bg-primary-red text-white hover:bg-primary-red/90">
          Submit
        </Button>
      </form>
    </div>
  )
} 