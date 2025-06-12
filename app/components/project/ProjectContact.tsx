"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BadgeDollarSign, Phone, Mail } from "lucide-react"

interface UnitType {
  type: string
  size: string
  price: string
}

interface ProjectContactProps {
  title: string
  price: string
  pricePerSqFt: string
  unitTypes: UnitType[]
}

export default function ProjectContact({ title, price, pricePerSqFt, unitTypes }: ProjectContactProps) {
  return (
    <div className="space-y-6">
      {/* Brochure Card */}
      <div className="bg-[#242728] text-white rounded-lg p-6 shadow-lg flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-2">
          <BadgeDollarSign className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold">Price Guide</h3>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Starting from</span>
            <span className="text-xl font-bold text-red-500">{price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Price per sq ft</span>
            <span className="text-gray-300">{pricePerSqFt}</span>
          </div>
        </div>
        <Button className="mt-4 bg-primary text-white hover:bg-primary/90 font-semibold transition-colors">
          Download Brochure
        </Button>
        <div className="flex flex-col gap-2 mt-2">
          <Button className="bg-primary text-white hover:bg-primary/90 font-semibold transition-colors">
            Request Price List
          </Button>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-[#242728] rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-white">Interested in {title}?</h3>
          <p className="text-gray-400 text-sm">
            Fill in the form below and our property specialist will get back to you within 24 hours.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Your phone number"
              className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="unit-type" className="block text-sm font-medium text-gray-300 mb-1">
              Interested Unit Type
            </label>
            <Select>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:border-red-500 focus:ring-red-500">
                <SelectValue placeholder="Select unit type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {unitTypes.map((unit, index) => (
                  <SelectItem 
                    key={index} 
                    value={unit.type} 
                    className="text-gray-300 hover:bg-gray-800 focus:bg-gray-800 focus:text-white"
                  >
                    {unit.type} - {unit.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="I'm interested in this project..."
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="newsletter"
              className="rounded border-gray-700 bg-gray-800 text-primary focus:ring-primary"
            />
            <label htmlFor="newsletter" className="text-sm text-gray-300">
              Subscribe to our newsletter for updates on new launches
            </label>
          </div>

          <Button className="w-full bg-primary text-white hover:bg-primary/90 transition-colors">
            Inquire Now
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <h4 className="font-semibold mb-3 text-white">Contact our specialist directly:</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mr-3">
                <Phone className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Phone</div>
                <div className="font-medium text-white">+65 8123 4567</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mr-3">
                <Mail className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Email</div>
                <div className="font-medium text-white">newlaunches@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 