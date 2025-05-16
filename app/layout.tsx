"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import TransparentHeader from "@/components/transparent-header"
import MobileMenu from "@/components/mobile-menu"
import Image from "next/image"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={inter.className}>
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
                  <nav className="hidden md:flex gap-4 lg:gap-6">
                    <Link href="/projects" className="text-sm font-medium text-white hover:text-white/80 hover:bg-black/20 rounded px-2 py-1" id="nav-link">
                      New Launch Directory
                    </Link>
                    <Link href="/join" className="text-sm font-medium text-white hover:text-white/80 hover:bg-black/20 rounded px-2 py-1" id="nav-link">
                      Join KW Singapore
                    </Link>
                    <Link href="/about-us" className="text-sm font-medium text-white hover:text-white/80 hover:bg-black/20 rounded px-2 py-1" id="nav-link">
                      About Us
                    </Link>
                    <Link href="/editorial" className="text-sm font-medium text-white hover:text-white/80 hover:bg-black/20 rounded px-2 py-1" id="nav-link">
                      Editorial
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-white hover:text-white/80 hover:bg-black/20 rounded px-2 py-1" id="nav-link">
                      Contact Us
                    </Link>
                  </nav>
                  <div className="hidden md:block">
                    <Button id="join-webinar-button" className="bg-primary-red text-white hover:bg-primary-red/90">
                      Join Webinar
                    </Button>
                  </div>
                  {/* Mobile Menu */}
                  <MobileMenu />
                </div>
              </header>
            )}
            {children}
            {!isAdminPage && (
              <footer className="border-t py-8 md:py-12 bg-black text-white">
                <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-4">
                    <Image
                      src="/images/kw-logo.png"
                      alt="KW Logo"
                      width={80}
                      height={40}
                    />
                    <p className="text-sm text-gray-300">
                      The niche category king in new property launches, leveraging on the number one realty globally.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>
                        <Link href="/" className="hover:text-white">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link href="/projects" className="hover:text-white">
                          New Launch Directory
                        </Link>
                      </li>
                      <li>
                        <Link href="/about-us" className="hover:text-white">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/melvin-story" className="hover:text-white">
                          Melvin Headhunter Story
                        </Link>
                      </li>
                      <li>
                        <Link href="/editorial" className="hover:text-white">
                          Editorial
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Contact Us</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>Email: info@kwnewlaunches.com</li>
                      <li>Phone: +65 6123 4567</li>
                      <li>Address: 8 Marina View, Singapore</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Follow Us</h3>
                    <div className="flex space-x-4">
                      <Link href="#" className="text-gray-300 hover:text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-facebook"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                        <span className="sr-only">Facebook</span>
                      </Link>
                      <Link href="#" className="text-gray-300 hover:text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-instagram"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                        <span className="sr-only">Instagram</span>
                      </Link>
                      <Link href="#" className="text-gray-300 hover:text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-linkedin"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="container mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-300">
                  <p>&copy; {new Date().getFullYear()} KW New Launches. All rights reserved.</p>
                </div>
              </footer>
            )}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
