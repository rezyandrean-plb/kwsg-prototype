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
    contact: "",
    email: "",
    agency: "",
    interests: {
      newLaunches: false,
      resale: false,
      rental: false,
      investment: false,
      others: false
    },
    otherInterest: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleCheckboxChange = (interest: keyof typeof formData.interests) => {
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [interest]: !prev.interests[interest]
      }
    }))
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="tel"
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
              className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

          <div className="space-y-2">
            <label htmlFor="agency" className="block text-sm font-medium text-gray-700">
              Agency
            </label>
            <input
              type="text"
              id="agency"
              value={formData.agency}
              onChange={(e) => setFormData(prev => ({ ...prev, agency: e.target.value }))}
              className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Area of Interest
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="newLaunches"
                checked={formData.interests.newLaunches}
                onChange={() => handleCheckboxChange("newLaunches")}
                className="h-4 w-4 text-primary-red focus:ring-primary-red border-gray-300 rounded"
              />
              <label htmlFor="newLaunches" className="text-sm text-gray-700">
                New Launches
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="resale"
                checked={formData.interests.resale}
                onChange={() => handleCheckboxChange("resale")}
                className="h-4 w-4 text-primary-red focus:ring-primary-red border-gray-300 rounded"
              />
              <label htmlFor="resale" className="text-sm text-gray-700">
                Resale
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rental"
                checked={formData.interests.rental}
                onChange={() => handleCheckboxChange("rental")}
                className="h-4 w-4 text-primary-red focus:ring-primary-red border-gray-300 rounded"
              />
              <label htmlFor="rental" className="text-sm text-gray-700">
                Rental
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="investment"
                checked={formData.interests.investment}
                onChange={() => handleCheckboxChange("investment")}
                className="h-4 w-4 text-primary-red focus:ring-primary-red border-gray-300 rounded"
              />
              <label htmlFor="investment" className="text-sm text-gray-700">
                Investment
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="others"
                checked={formData.interests.others}
                onChange={() => handleCheckboxChange("others")}
                className="h-4 w-4 text-primary-red focus:ring-primary-red border-gray-300 rounded"
              />
              <label htmlFor="others" className="text-sm text-gray-700">
                Others
              </label>
            </div>
          </div>

          {formData.interests.others && (
            <div className="mt-3">
              <input
                type="text"
                value={formData.otherInterest}
                onChange={(e) => setFormData(prev => ({ ...prev, otherInterest: e.target.value }))}
                placeholder="Please specify"
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent"
              />
            </div>
          )}
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