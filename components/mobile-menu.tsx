"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:text-white/80"
        onClick={() => setIsOpen(!isOpen)}
        data-mobile-menu-button
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">KW Singapore</span>
                <img
                  className="h-8 w-auto"
                  src="/images/kwsg-logo.png"
                  alt="KW Logo"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                data-mobile-menu-button
                className="text-white hover:text-white/80"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-800">
                <div className="space-y-2 py-6">
                  <Link
                    href="/projects"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    New Launch Directory
                  </Link>
                  <Link
                    href="/join"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    Join KW Singapore
                  </Link>
                  <Link
                    href="/about-us"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/editorial"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    Editorial
                  </Link>
                  <Link
                    href="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
                <div className="py-6">
                  <Button className="w-full bg-primary-red text-white hover:bg-primary-red/90">
                    Join Webinar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 