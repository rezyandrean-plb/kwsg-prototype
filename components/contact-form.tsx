"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ContactFormProps {
  headline: string
  body: string
  onSubmit: (data: any) => void
}

export function ContactForm({ headline, body, onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    consent: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          {headline}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          {body}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent"
            required
          />
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="consent"
            checked={formData.consent}
            onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
            className="mt-1 h-4 w-4 text-primary-red focus:ring-primary-red border-gray-300 rounded"
            required
          />
          <label htmlFor="consent" className="text-sm text-gray-600">
            I consent to receiving updates and information about Keller Williams Singapore's launch and services.
          </label>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-primary-red text-white hover:bg-primary-red/90 py-3 sm:py-4 text-base sm:text-lg rounded-lg transition-all duration-300"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
} 