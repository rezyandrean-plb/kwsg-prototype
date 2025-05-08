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

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would redirect to search results
    console.log(`Searching in category: ${["New Launches", "Resale", "Rent"][activeTab]}`)
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <Image
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
          alt="New Launch Property"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 bg-black/40">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 text-white">Find Your New Launch Property</h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl text-gray-100">
            We are the niche category king in New Launches
          </p>
          <div className="w-full max-w-4xl bg-black/90 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm">
            <div className="flex border-b border-gray-800">
              {["New Launches", "Resale", "Rent"].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 py-3 px-4 font-medium transition-colors ${
                    activeTab === index ? "bg-primary-red text-white" : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <form onSubmit={handleSearch} className="flex items-center p-4">
              <Input
                type="text"
                placeholder={
                  activeTab === 0
                    ? "Search for new launch projects, developers..."
                    : activeTab === 1
                      ? "Search for resale properties, locations..."
                      : "Search for rental properties, monthly rates..."
                }
                className="flex-1 border-0 bg-gray-900 text-white placeholder:text-gray-400 focus-visible:ring-0"
              />
              <Button type="submit" size="icon" className="ml-2 bg-primary-red hover:bg-primary-red/90">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section - Webinar */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-6 w-6 mr-2 text-primary-red" />
            <h2 className="text-2xl font-bold">Next Recruitment Webinar</h2>
          </div>
          <p className="text-lg mb-6 text-gray-300">Learn how to leverage the number one realty globally</p>
          <CountdownTimer targetDate="2024-06-15T18:00:00" />
          <Button className="mt-6 bg-primary-red text-white hover:bg-primary-red/90">
            Join Recruitment Webinar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* PSR Section: Problem, Solution, Result woven into narrative */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4 text-white">The Challenge in Singapore's New Launch Market</h2>
          <p className="text-lg mb-8 text-gray-300">
            In Singapore's fast-paced property market, both buyers and agents face a unique set of challenges. With countless new launches, ever-changing regulations, and intense competition, it's easy to feel lost. Buyers often struggle to find reliable, up-to-date information, while agents work hard to stand out and close deals efficiently. The result? Frustration, missed opportunities, and uncertainty for everyone involved.
          </p>
          <h2 className="text-3xl font-bold mb-4 text-white">How KW Singapore Makes a Difference</h2>
          <p className="text-lg mb-8 text-gray-300">
            That's where KW Singapore steps in. As the niche category king in new launches, we've reimagined the experience for both agents and buyers. Our platform combines cutting-edge technology, exclusive access to the latest projects, and world-class training. With advanced search, real-time analytics, and immersive virtual tours, we make it easy to discover, showcase, and secure the best properties. Agents receive specialized coaching and support, while buyers enjoy a seamless, transparent journey from search to sale.
          </p>
          <h2 className="text-3xl font-bold mb-4 text-white">The KW Singapore Advantage</h2>
          <p className="text-lg text-gray-300">
            The results speak for themselves: KW agents become new launch specialists, closing more deals with less effort and building a reputation for excellence. Buyers find their dream homes faster and with greater confidence. Together, we're setting new standards for success in Singapore's property market—driving faster sales, stronger engagement, and lasting client relationships. Experience the KW difference today.
          </p>
        </div>
      </section>

      {/* PSR Section: Solution */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4 text-white">Solution</h2>
          <p className="text-lg text-gray-300 mb-6">
            KW Singapore is the niche category king in new launches. We empower agents and buyers with cutting-edge technology, exclusive access to the latest projects, and world-class training. Our platform features advanced search, real-time market analytics, and immersive virtual tours, making it easy to discover, showcase, and secure the best properties. Agents receive specialized coaching and support, while buyers enjoy a seamless, transparent experience.
          </p>
        </div>
      </section>

      {/* PSR Section: Result */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4 text-primary-red">Result</h2>
          <p className="text-lg text-gray-300 mb-6">
            KW agents become new launch specialists, closing more deals with less effort and building a reputation for excellence. Buyers find their dream homes faster and with greater confidence. Together, we set new standards for success in Singapore's property market—driving faster sales, stronger engagement, and lasting client relationships.
          </p>
        </div>
      </section>

      {/* Tech Positioning Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Leverage Our Technology</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Access cutting-edge real estate technology that puts you ahead of the competition
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center border border-gray-800">
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Advanced CRM</h3>
              <p className="text-gray-300">
                Manage your clients and leads with our proprietary CRM system designed specifically for new launches
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center border border-gray-800">
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Market Analytics</h3>
              <p className="text-gray-300">
                Get real-time insights on market trends, pricing, and buyer preferences for new launches
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center border border-gray-800">
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Real-time Updates</h3>
              <p className="text-gray-300">
                Stay ahead with instant notifications on new launches, price changes, and market movements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Growth Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                alt="Training Session"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-white">World-Class Training</h2>
              <p className="text-lg text-gray-300 mb-6">
                Our comprehensive training program equips you with the skills and knowledge to excel in the new launches
                market.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="bg-primary-red/10 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-red"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">Specialized New Launch Training</h3>
                    <p className="text-gray-300">
                      Learn the unique aspects of marketing and selling new launch properties
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-red/10 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-red"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">Growth Share Program</h3>
                    <p className="text-gray-300">
                      Benefit from our unique commission structure that rewards performance
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-red/10 p-1 rounded-full mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-red"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">MVVBP Framework</h3>
                    <p className="text-gray-300">
                      Master our Mission, Vision, Values, Beliefs, and Perspective methodology
                    </p>
                  </div>
                </li>
              </ul>
              <Button className="bg-primary-red text-white hover:bg-primary-red/90">
                Join In-person Webinar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center text-white">Featured New Launches</h2>
          <p className="text-lg text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            Discover the most exclusive new property launches in prime locations
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="10 Evelyn"
              location="Newton, District 11"
              price="From $1.2M"
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
              units="120 Units"
              developer="Amara Holdings"
              completion="2025"
              slug="10-evelyn"
            />

            <ProjectCard
              title="The Avenir"
              location="River Valley, District 9"
              price="From $2.5M"
              image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
              units="376 Units"
              developer="Hong Leong Group"
              completion="2025"
              slug="the-avenir"
            />

            <ProjectCard
              title="Midtown Modern"
              location="Bugis, District 7"
              price="From $1.8M"
              image="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
              units="558 Units"
              developer="GuocoLand"
              completion="2024"
              slug="midtown-modern"
            />
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button variant="outline" className="border-primary-red text-primary-red hover:bg-primary-red hover:text-white">
                View All New Launches
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Story Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-white">Melvin's Headturner Story</h2>
              <p className="text-lg text-gray-300 mb-6">
                From struggling agent to top producer specializing in new launches - discover how Melvin transformed his
                career.
              </p>
              <blockquote className="border-l-4 border-primary-red pl-4 italic mb-8 text-gray-300">
                "Focusing on new launches completely changed my business. The specialized training and technology
                provided gave me the edge I needed to become a market leader."
              </blockquote>
              <div className="flex items-center mb-8">
                <div className="flex -space-x-2">
                  <div className="bg-primary-red text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    $1M+
                  </div>
                  <div className="bg-primary-red/80 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    50+
                  </div>
                  <div className="bg-primary-red/60 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    #1
                  </div>
                </div>
                <div className="ml-6">
                  <p className="text-sm text-gray-400">Annual commission | Units sold | In new launches</p>
                </div>
              </div>
              <Button className="bg-primary-red text-white hover:bg-primary-red/90">
                Join Recruitment Webinar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
                alt="Melvin Success Story"
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the New Launch Specialists?</h2>
            <p className="text-lg mb-8">
              Fill out the form below and we'll contact you with more information about our upcoming recruitment events.
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Input
                  type="text"
                  placeholder="Current Agency (if applicable)"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <textarea
                  placeholder="Tell us about your experience in real estate..."
                  rows={4}
                  className="w-full rounded-md bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 p-3"
                ></textarea>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="consent" className="mr-2" />
                <label htmlFor="consent" className="text-sm">
                  I consent to receive communications about recruitment opportunities
                </label>
              </div>
              <Button className="w-full bg-primary text-white hover:bg-primary/90">Submit Application</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
