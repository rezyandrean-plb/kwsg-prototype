"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:text-white/80"
        onClick={() => setIsOpen(!isOpen)}
        data-mobile-menu-button
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile and Tablet menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 md:max-w-md animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                data-mobile-menu-button
                className="text-white hover:text-white/80"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-800">
                            <div className="space-y-4 py-6">
              <Link
                href="/model"
                className="block text-lg font-semibold leading-7 text-white hover:text-primary-red transition-colors duration-300 relative group"
                onClick={() => setIsOpen(false)}
              >
                KW Model
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/events"
                className="block text-lg font-semibold leading-7 text-white hover:text-primary-red transition-colors duration-300 relative group"
                onClick={() => setIsOpen(false)}
              >
                Events
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/about-us"
                className="block text-lg font-semibold leading-7 text-white hover:text-primary-red transition-colors duration-300 relative group"
                onClick={() => setIsOpen(false)}
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className="block text-lg font-semibold leading-7 text-white hover:text-primary-red transition-colors duration-300 relative group"
                onClick={() => setIsOpen(false)}
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/join"
                className="block text-lg font-semibold leading-7 text-white hover:text-primary-red transition-colors duration-300 relative group"
                onClick={() => setIsOpen(false)}
              >
                Join KW Singapore
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 