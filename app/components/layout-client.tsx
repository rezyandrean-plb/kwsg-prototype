"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import dynamic from 'next/dynamic'

// Dynamically import components that are not immediately visible
const TransparentHeader = dynamic(() => import("@/components/transparent-header"), {
  ssr: false,
  loading: () => <div className="h-16" />
})

const MobileMenu = dynamic(() => import("@/components/mobile-menu"), {
  ssr: false,
  loading: () => <div className="w-8 h-8" />
})

const FloatingWhatsApp = dynamic(() => import("@/components/floating-whatsapp"), {
  ssr: false
})

// Memoize the navigation items to prevent unnecessary re-renders
const navItems = [
  { href: "/editorial", label: "KW Blog" },
  { href: "/projects", label: "New Launch Condo" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/join", label: "Join KW Singapore" }
]

export function Header() {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  if (isAdminPage) return null

  return (
    <>
      <TransparentHeader />
      <header className="fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300" id="main-header">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/kwsg-logo.webp"
              alt="KW Logo"
              width={120}
              height={60}
              priority
              loading="eager"
              fetchPriority="high"
              className="w-auto h-auto"
              style={{ contentVisibility: 'auto' }}
            />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-4 lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white hover:text-primary-red transition-colors duration-300 rounded px-2 py-1 relative group"
                id="nav-link"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
          {/* Mobile and Tablet Menu */}
          <MobileMenu />
        </div>
      </header>
    </>
  )
}

// Memoize the footer links to prevent unnecessary re-renders
const footerLinks = {
  column1: [
    { href: "/", label: "Home" },
    { href: "/editorial", label: "KW Blog" },
    { href: "/projects", label: "New Launch Condo" }
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

  if (isAdminPage) return null

  return (
    <>
      <FloatingWhatsApp />
      <footer className="border-t py-8 md:py-12 bg-black text-white">
        <div className="container grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Image
              src="/images/kwsg-logo.webp"
              alt="KW Logo"
              width={180}
              height={90}
              loading="lazy"
              className="w-auto h-auto"
              style={{ contentVisibility: 'auto' }}
            />
            <p className="text-sm text-gray-300">
              The Real Estate Model of the Future. Built Today.
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
                <a href="https://wa.me/6586111703" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Phone: +65 8611 1703
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="container mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Kairos World Real Estate Inc Pte. Ltd. | All rights reserved.</p>
          <p className="mt-1">CEA License Number: L3011034Z</p>
        </div>
      </footer>
    </>
  )
} 