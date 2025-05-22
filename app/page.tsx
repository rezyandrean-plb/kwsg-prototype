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
              <Button 
                className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
              >
                Explore KW Singapore
                <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-white text-primary-red hover:bg-white/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Join Us Today
                <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
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
            <div className="text-center mb-10">
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
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary-red/10 rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Media-Led, Brand-Driven Consultants</h3>
                    <p className="text-gray-300 leading-relaxed">
                      KW Singapore empowers consultants with in-house media, content strategy, and branding support—built to amplify personal presence, generate leads, and close faster in a media-first market.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: AI-Powered */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary-red/10 rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">AI-Powered, Precision-Driven</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Consultants leverage Command by KW—an AI-powered, all-in-one platform that automates lead gen, marketing, and deal tracking. Designed for speed, structure, and scale.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Insight-Led */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary-red/10 rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Insight-Led, Research-Focused</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Every consultant is equipped with KW's market research tools and training to advise clients with confidence—using live pricing trends, demand forecasts, and investment analytics.
                    </p>
                  </div>
                </div>
              </div>
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
            <div className="text-center mb-10 space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                The KW Advantage
              </h2>
            </div>

            {/* Technology Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {/* KW Global Brand Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary-red/10 rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">KW Global Brand & Trust</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Backed by 200,000+ professionals in 60+ countries, Keller Williams is the world's most trusted realty network. In Singapore, that trust becomes your competitive edge.
                    </p>
                  </div>
                </div>
              </div>

              {/* KW PropTech Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary-red/10 rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 animate-bounce">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">KW PropTech: Command</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Our proprietary system streamlines every part of your business—from CRM to closing—on a single, mobile-optimized interface tailored to the Singapore market.
                    </p>
                  </div>
                </div>
              </div>

              {/* KW Research Hub Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-red/20 to-transparent rounded-2xl transform transition-transform group-hover:scale-105"></div>
                <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transform transition-all duration-300 group-hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary-red/10 rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 animate-spin-slow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">KW Research Hub</h3>
                    <p className="text-gray-300 leading-relaxed">
                      AI-enhanced data, market trends, and district insights—at your fingertips. It's the intelligence behind better advice, faster deals, and lasting client trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
              >
                Join KW Singapore
                <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-white text-primary-red hover:bg-white/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Explore Our PropTech
                <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* New Section - Launch Countdown */}
      <section className="relative py-14 sm:py-20 md:py-28 bg-black text-white overflow-hidden">
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
            {/* Main Content Card */}
            <div className="relative overflow-hidden rounded-3xl backdrop-blur-sm border border-white/10 bg-black/30">
              {/* Content Layout - Single Column */}
              <div className="p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
                {/* Text Content */}
                <div className="space-y-3 sm:space-y-4 text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                    The Future of Real Estate in Singapore is Here. Are You Ready?
                  </h2>
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                      Get ready to experience a new era of real estate with the upcoming launch of Keller Williams Singapore. Be among the first to join a revolutionary platform designed to elevate your career with unparalleled support, cutting-edge technology, and a global network. The countdown has begun!
                    </p>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="bg-black/50 rounded-2xl border border-primary-red/20 p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col items-center space-y-3 sm:space-y-5 w-full">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full">
                      <div className="p-2 rounded-full bg-primary-red/10 mb-2 sm:mb-0">
                        <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-primary-red" />
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white text-center">Launch Countdown</h3>
                    </div>
                    {/* Enhanced Countdown Timer */}
                    <div className="w-full flex justify-center">
                      <div className="transform scale-100 sm:scale-105 w-full max-w-xs">
                        <CountdownTimer targetDate="2025-07-01T00:00:00" />
                      </div>
                    </div>
                    {/* Additional Info */}
                    <p className="text-center text-gray-300 text-base sm:text-lg">
                      Join us for the most anticipated real estate launch of July 1st 2025  
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                  <Button 
                    className="group px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl bg-primary-red text-white hover:bg-primary-red/90 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                  >
                    Be Part of the Launch
                    <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
