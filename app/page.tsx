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
              <ContactDialog
                triggerText="Find Out More"
                headline="Unlock Your Full Potential with Keller Williams Singapore"
                body="Discover how our unparalleled support and resources can help you thrive in Singapore's dynamic property market. Fill out the form below to learn more."
                onSubmit={handleFormSubmit}
              />
              <ContactDialog
                triggerText="Join Us Today"
                headline="Join the #1 Global Realty Network"
                body="Want to be part of the world's largest real estate company and leverage a global network for your success in Singapore? Complete the form to connect with us."
                onSubmit={handleFormSubmit}
                variant="outline"
              />
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <ContactDialog
                triggerText="Join KW Singapore"
                headline="Join the #1 Global Realty Network"
                body="Want to be part of the world's largest real estate company and leverage a global network for your success in Singapore? Complete the form to connect with us."
                onSubmit={handleFormSubmit}
              />
              <ContactDialog
                triggerText="Explore Our PropTech"
                headline="Discover KW's Intelligent Technology"
                body="Want to see how our integrated tech ecosystem, powered by AI (KWIQ), can streamline your business and enhance client engagement? Fill out the form to explore KW Tech Suite!"
                onSubmit={handleFormSubmit}
                variant="outline"
              />
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
                  headline="Be at the Forefront of KW Singapore's Launch"
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
