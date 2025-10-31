"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import { User } from 'lucide-react'

// Dynamically import components that are not immediately visible
const MobileMenu = dynamic(() => import("@/components/mobile-menu"), {
  ssr: false,
  loading: () => <div className="w-8 h-8" />
})

const FloatingWhatsApp = dynamic(() => import("@/components/floating-whatsapp"), {
  ssr: false
})

// Memoize the navigation items to prevent unnecessary re-renders
const navItems = [
  { href: "/new-launch-collection", label: "New Launch Collection" },
  { href: "/model", label: "KW Income Model" },
  { href: "/events", label: "Events" },
  { href: "/press", label: "Press" },
  { href: "/about-us", label: "About Us" },
  { href: "/tools", label: "Tools & Resources" },
  { href: "/contact", label: "Contact" }
]

const joinNavItem = { href: "/join", label: "Join KW Singapore" }

export function Header() {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')
  const isSpringleafPage = pathname?.startsWith('/springleaf-residence')
  const isSpringleafBackupPage = pathname?.startsWith('/springleaf-backup')
  const isAureaPage = pathname?.startsWith('/aurea')
  const isPenrithPage = pathname === '/penrith' || pathname?.startsWith('/penrith/')
  const isWResidencePage = pathname === '/w-residences' || pathname?.startsWith('/w-residence')
  const isArinaEastPage = pathname === '/arina-east' || pathname?.startsWith('/arina-east')
  const isPenrithEventPage = pathname?.startsWith('/penrith-consumer-event')
  const isArtisan8Page = pathname === '/artisan-8' || pathname?.startsWith('/artisan-8')
  const [isScrolled, setIsScrolled] = useState(false)
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isAdminPage || isSpringleafPage || isSpringleafBackupPage || isAureaPage || isPenrithPage || isPenrithEventPage || isWResidencePage || isArinaEastPage || isArtisan8Page) return null

  return (
    <header 
      id="main-header" 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? 'bg-black' : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/kwsingapore-logo.webp"
            alt="KW Logo"
            width={60}
            height={30}
            priority
            loading="eager"
            fetchPriority="high"
            className="w-auto h-auto"
          />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-4 lg:gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              id="nav-link"
              className="text-sm font-semibold transition-colors duration-300 rounded px-2 py-2 relative group text-white"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          
          {/* Show Join button or User info based on authentication status */}
          {isSignedIn ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-white">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {user?.fullName || (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName) || user?.username || user?.emailAddresses[0]?.emailAddress || 'User'}
                </span>
              </div>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "bg-white border-gray-200 shadow-lg",
                    userButtonPopoverActionButton: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    userButtonPopoverActionButtonText: "text-gray-700",
                    userButtonPopoverFooter: "hidden",
                    userButtonPopoverMain: "bg-white",
                    userButtonPopoverActionButtonIcon: "text-gray-500",
                    userButtonPopoverHeaderTitle: "text-gray-900",
                    userButtonPopoverHeaderSubtitle: "text-gray-500",
                    userButtonPopoverHeader: "text-gray-900",
                    userButtonPopoverUserPreview: "text-gray-900",
                    userButtonPopoverUserPreviewMainIdentifier: "text-gray-900",
                    userButtonPopoverUserPreviewSecondaryIdentifier: "text-gray-500",
                    userButtonPopoverUserPreviewTextContainer: "text-gray-900",
                    userButtonPopoverUserPreviewTextContainerPrimary: "text-gray-900",
                    userButtonPopoverUserPreviewTextContainerSecondary: "text-gray-500",
                    userButtonPopoverUserPreviewTextContainerIdentifier: "text-gray-900",
                    userButtonPopoverUserPreviewTextContainerUsername: "text-gray-900",
                    userButtonPopoverUserPreviewTextContainerEmail: "text-gray-500"
                  }
                }}
              />
            </div>
          ) : (
            <Link
              href={joinNavItem.href}
              id="nav-link"
              className="text-sm font-semibold transition-colors duration-300 rounded px-2 py-2 bg-red-600 text-white hover:bg-red-700"
            >
              {joinNavItem.label}
            </Link>
          )}
        </nav>
        {/* Mobile and Tablet Menu */}
        <MobileMenu />
      </div>
    </header>
  )
}

// Memoize the footer links to prevent unnecessary re-renders
const footerLinks = {
  column1: [
    { href: "/", label: "Home" },
    { href: "/model", label: "KW Income Model" },
    { href: "/events", label: "Events" },
    { href: "/press", label: "Press" },
  ],
  column2: [
    { href: "/about-us", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/join", label: "Join KW Singapore" }
  ]
}

export function Footer() {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')
  const isSpringleafPage = pathname?.startsWith('/springleaf-residence')
  const isSpringleafBackupPage = pathname?.startsWith('/springleaf-backup')
  const isAureaPage = pathname?.startsWith('/aurea')
  const isPenrithPage = pathname === '/penrith' || pathname?.startsWith('/penrith/')
  const isPenrithEventPage = pathname?.startsWith('/penrith-event')
  const isWResidencePage = pathname === '/w-residences' || pathname?.startsWith('/w-residence')
  const isArinaEastPage = pathname === '/arina-east' || pathname?.startsWith('/arina-east')
  const isArtisan8Page = pathname === '/artisan-8' || pathname?.startsWith('/artisan-8')
  if (isAdminPage) return null

  return (
    <>
      {!isSpringleafPage && !isSpringleafBackupPage && !isAureaPage && !isPenrithPage && !isPenrithEventPage && !isWResidencePage && !isArinaEastPage && !isArtisan8Page && <FloatingWhatsApp />}
      <footer className="border-t py-8 md:py-12 bg-black text-white">
        <div className="container grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Image
              src="/images/kwsingapore-logo.webp"
              alt="KW Logo"
              width={60}
              height={30}
              loading="lazy"
              className="w-auto h-auto"
            />
            <p className="text-sm text-gray-300">
              Realtors to Real Estate Entrepreneurs
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-300">
              <div className="space-y-2">
                {footerLinks.column1.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-white block">
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                {footerLinks.column2.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-white block">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <a href="mailto:hello@kwsingapore.com" className="hover:text-white">
                  Email: hello@kwsingapore.com
                </a>
              </p>
              <p>
                <a href="https://wa.me/6587996569" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Phone: +65 8799 6569
                </a>
              </p>
              <p>
                <a rel="noopener noreferrer" className="hover:text-white">
                  Address: Oxley Bizhub 2, 62 Ubi Road 1 #01-19 <br /> Singapore 408734
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="container mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} KW Singapore Real Estate Pte. Ltd. | All rights reserved.</p>
          <p className="mt-1">CEA License Number: L3011034Z</p>
        </div>
      </footer>
    </>
  )
} 