"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CountdownTimer from "@/components/countdown-timer"
import ProjectCard from "@/components/project-card"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import CountUp from "react-countup"
import { projects } from "@/data/projects"
import { ContactDialog } from "@/components/contact-dialog"

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would redirect to search results
    console.log(`Searching in category: ${["New Launches", "Resale", "Rent"][activeTab]}`)
  }

  const handleNewLaunchSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching new launches:", searchQuery)
  }

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data)
    // Here you would typically send the data to your backend
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section - Updated with new content */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
            alt="Luxury Singapore Property"
            fill
            className="object-cover brightness-[0.3]"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white p-4 sm:p-6 md:p-8 min-h-screen">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              The Realty Company Built for Realtors, Backed by Innovation
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Keller Williams Singapore is a next-generation realty brand powered by technology, media, and proven global systems. Designed for today's buyers, sellers, and realtors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about-us">
                <Button className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                  Explore KW Singapore
                  <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/join">
                <Button className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-white text-primary-red hover:bg-white/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  Join Us Today
                  <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured New Launches Section - Enhanced with better card design */}
      <section className="relative py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Featured New Launches</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover the most exclusive new property launches in prime locations
            </p>
            <div className="mt-6">
              <Link href="/projects">
                <Button className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                  Browse New Launch Projects
                  <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                {...project}
                className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why KW Singapore Section */}
      <section className="relative py-16 md:py-20 bg-black text-white overflow-hidden">
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05),transparent_70%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Why KW Singapore?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Empowering real estate professionals with cutting-edge tools and strategies
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1: Media-Led */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110 animate-spin-slow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Media-Led, Brand-Driven Consultants</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      KW Singapore empowers consultants with in-house media, content strategy, and branding support—built to amplify personal presence, generate leads, and close faster in a media-first market.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: AI-Powered */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110 animate-spin-slow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">AI-Powered, Precision-Driven</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      Consultants leverage Command by KW—an AI-powered, all-in-one platform that automates lead gen, marketing, and deal tracking. Designed for speed, structure, and scale.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Insight-Led */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110 animate-spin-slow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Insight-Led, Research-Focused</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      Every consultant is equipped with KW's market research tools and training to advise clients with confidence—using live pricing trends, demand forecasts, and investment analytics.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/join" className="w-full sm:w-auto">
                <Button className="w-full group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                  Join KW Singapore
                  <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/join#tech-tools" className="w-full sm:w-auto">
                <Button className="w-full group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-white text-primary-red hover:bg-white/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  Explore Our PropTech Platform
                  <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KW Advantage Section */}
      <section className="relative py-16 md:py-20 bg-black text-white overflow-hidden">
        {/* Background Image with Parallax-like Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="Technology Background"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center brightness-[0.5]"
            quality={100}
          />
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05),transparent_20%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Content */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                The KW Advantage
              </h2>
            </div>

            {/* Technology Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* KW Global Brand Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">KW Global Brand & Trust</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      Backed by 200,000+ professionals in 60+ countries, Keller Williams is the world's most trusted realty network. In Singapore, that trust becomes your competitive edge.
                    </p>
                  </div>
                </div>
              </div>

              {/* KW PropTech Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">KW PropTech: Command</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      Our proprietary system streamlines every part of your business—from CRM to closing—on a single, mobile-optimized interface tailored to the Singapore market.
                    </p>
                  </div>
                </div>
              </div>

              {/* KW Research Hub Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-primary-red/10 rounded-xl flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">KW Research Hub</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      AI-enhanced data, market trends, and district insights—at your fingertips. It's the intelligence behind better advice, faster deals, and lasting client trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about-us" className="w-full sm:w-auto">
                <Button className="w-full group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                  Explore KW Singapore
                  <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/join" className="w-full sm:w-auto">
                <Button className="w-full group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-white text-primary-red hover:bg-white/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  Join Us Today
                  <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Section - Launch Countdown */}
      <section className="relative py-10 sm:py-14 md:py-20 bg-black text-white overflow-hidden">
        {/* Background Image with Parallax-like Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
            alt="Luxury Singapore Property"
            fill
            className="object-cover object-center scale-105 brightness-[0.15]"
            quality={100}
            priority
          />
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05),transparent_20%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Text Content */}
              <div className="space-y-3 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  The Future of Real Estate in Singapore is Here. Are You Ready?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                  Get ready to experience a new era of real estate with the upcoming launch of Keller Williams Singapore. Be among the first to join a revolutionary platform designed to elevate your career with unparalleled support, cutting-edge technology, and a global network. The countdown has begun!
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="p-2 rounded-full bg-primary-red/10">
                    <Calendar className="h-6 w-6 text-primary-red" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Launch Countdown</h3>
                </div>
                {/* Enhanced Countdown Timer */}
                <div className="w-full flex justify-center">
                  <div className="transform scale-100 sm:scale-105 w-full max-w-xs">
                    <CountdownTimer targetDate="2025-07-01T00:00:00" />
                  </div>
                </div>
                {/* Additional Info */}
                <p className="text-center text-gray-300 text-base">
                  Join us for the most anticipated real estate launch of July 1st 2025  
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center">
                <ContactDialog
                  triggerText="Be Part of the Launch"
                  headline="Unlock Your Full Potential with Keller Williams Singapore"
                  body="Excited about the future of real estate in Singapore? Register your interest to be among the first to learn about Keller Williams Singapore. Fill out the form to stay informed."
                  onSubmit={handleFormSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
