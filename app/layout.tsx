"use client"

import type React from "react"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import TransparentHeader from "@/components/transparent-header"
import MobileMenu from "@/components/mobile-menu"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>KW Singapore</title>
        <link rel="icon" href="/images/kwsg-logo.png" type="image/png" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {!isAdminPage && <TransparentHeader />}
          <div className="flex min-h-screen flex-col">
            {!isAdminPage && (
              <header className="fixed top-0 z-50 w-full transition-all duration-300" id="main-header">
                <div className="container flex h-16 items-center justify-between">
                  <Link href="/" className="flex items-center space-x-2">
                    <Image
                      src="/images/kwsg-logo.png"
                      alt="KW Logo"
                      width={120}
                      height={60}
                      priority
                    />
                  </Link>
                  {/* Desktop Navigation */}
                  <nav className="hidden lg:flex gap-4 lg:gap-6">
                    <Link href="/editorial" className="text-sm font-medium text-white hover:text-primary-red transition-colors duration-300 rounded px-2 py-1 relative group" id="nav-link">
                      KW Blog
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/projects" className="text-sm font-medium text-white hover:text-primary-red transition-colors duration-300 rounded px-2 py-1 relative group" id="nav-link">
                      New Launch Condo
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/about-us" className="text-sm font-medium text-white hover:text-primary-red transition-colors duration-300 rounded px-2 py-1 relative group" id="nav-link">
                      About Us
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-white hover:text-primary-red transition-colors duration-300 rounded px-2 py-1 relative group" id="nav-link">
                      Contact
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/join" className="text-sm font-medium text-white hover:text-primary-red transition-colors duration-300 rounded px-2 py-1 relative group" id="nav-link">
                      Join KW Singapore
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-red transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </nav>
                  {/* Mobile and Tablet Menu */}
                  <MobileMenu />
                </div>
              </header>
            )}
            {children}
            {!isAdminPage && (
              <>
                <FloatingWhatsApp />
                <footer className="border-t py-8 md:py-12 bg-black text-white">
                  <div className="container grid gap-8 md:grid-cols-3">
                    <div className="space-y-4">
                      <Image
                        src="/images/kwsg-logo.png"
                        alt="KW Logo"
                        width={180}
                        height={90}
                      />
                      <p className="text-sm text-gray-300">
                        The Real Estate Model of the Future. Built Today.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white">Quick Links</h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-300">
                        <div className="space-y-2">
                          <Link href="/" className="hover:text-white block">
                            Home
                          </Link>
                          <Link href="/editorial" className="hover:text-white block">
                            KW Blog
                          </Link>
                          <Link href="/projects" className="hover:text-white block">
                            New Launch Condo
                          </Link>
                        </div>
                        <div className="space-y-2">
                          <Link href="/about-us" className="hover:text-white block">
                            About Us
                          </Link>
                          <Link href="/contact" className="hover:text-white block">
                            Contact
                          </Link>
                          <Link href="/join" className="hover:text-white block">
                            Join KW Singapore
                          </Link>
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
                    <p>&copy; {new Date().getFullYear()} KW New Launches. All rights reserved.</p>
                  </div>
                </footer>
              </>
            )}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
