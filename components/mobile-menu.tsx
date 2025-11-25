"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { useUser, UserButton } from '@clerk/nextjs'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { isSignedIn, user } = useUser()

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
                    href="/new-launch-collection"
                    className="block text-lg font-semibold leading-7 text-white hover:text-primary-red transition-colors duration-300 relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    New Launch Collection
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
                    href="/awards"
                    className="block text-lg font-semibold leading-7 text-white hover:text-primary-red transition-colors duration-300 relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    Awards
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
                    href="/tools"
                    className="block text-lg font-semibold leading-7 text-white hover:text-primary-red transition-colors duration-300 relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    Tools & Resources
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/press"
                    className="block text-lg font-semibold leading-7 text-white hover:text-primary-red transition-colors duration-300 relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    Press
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
                  
                  {/* Show Join button or User info based on authentication status */}
                  {isSignedIn ? (
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-3 mb-4">
                        <User className="w-5 h-5 text-white" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-300">Signed in as</p>
                          <p className="text-white font-medium">
                            {user?.emailAddresses[0]?.emailAddress || 'User'}
                          </p>
                        </div>
                        <UserButton 
                          appearance={{
                            elements: {
                              avatarBox: "w-8 h-8",
                              userButtonPopoverCard: "bg-gray-900 border-gray-600 shadow-lg",
                              userButtonPopoverActionButton: "text-white hover:bg-gray-700 hover:text-white",
                              userButtonPopoverActionButtonText: "text-white",
                              userButtonPopoverFooter: "hidden",
                              userButtonPopoverMain: "bg-gray-900",
                              userButtonPopoverActionButtonIcon: "text-white",
                              userButtonPopoverHeaderTitle: "text-white",
                              userButtonPopoverHeaderSubtitle: "text-white",
                              userButtonPopoverHeader: "text-white",
                              userButtonPopoverUserPreview: "text-white",
                              userButtonPopoverUserPreviewMainIdentifier: "text-white",
                              userButtonPopoverUserPreviewSecondaryIdentifier: "text-white",
                              userButtonPopoverUserPreviewTextContainer: "text-white",
                              userButtonPopoverUserPreviewTextContainerPrimary: "text-white",
                              userButtonPopoverUserPreviewTextContainerSecondary: "text-white",
                              userButtonPopoverUserPreviewTextContainerIdentifier: "text-white",
                              userButtonPopoverUserPreviewTextContainerUsername: "text-white",
                              userButtonPopoverUserPreviewTextContainerEmail: "text-white"
                            }
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <Link
                      href="/join"
                      className="block text-lg font-semibold leading-7 text-white hover:text-primary-red transition-colors duration-300 relative group"
                      onClick={() => setIsOpen(false)}
                    >
                      Why KW Singapore
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 