"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, User, Tag, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function EditorialPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
          alt="Editorial"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.div 
            className="container mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">KW Editorial</h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto">
              Insights, trends, and expert analysis on the new property launch market
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:w-1/2">
              <div className="inline-block bg-primary-red/10 px-4 py-2 rounded-full text-primary-red font-medium mb-4">
                Featured Article
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">The Future of New Launch Properties in a Post-Pandemic World</h2>
              <p className="text-lg text-gray-300 mb-6">
                The real estate landscape has undergone significant transformation since the pandemic. This article
                explores how new launch properties are adapting to changing buyer preferences, technological
                advancements, and market dynamics.
              </p>
              <div className="flex items-center text-gray-400 mb-6 text-sm">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>May 2, 2024</span>
                </div>
                <div className="flex items-center mr-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>8 min read</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>By Sarah Johnson</span>
                </div>
              </div>
              <Button className="bg-primary-red text-white hover:bg-primary-red/90">
                <Link href="/editorial/future-of-new-launch-properties" className="flex items-center">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
                alt="Future of New Launch Properties"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-white">Latest Articles</h2>
            <p className="text-lg text-gray-300 mb-12">Stay updated with the newest insights and trends in real estate</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Article 1 */}
            <motion.div 
              className="bg-black rounded-lg overflow-hidden shadow-md border border-gray-800"
              variants={fadeInUp}
            >
              <Link href="/editorial/luxury-condominium-trends">
                <div className="relative h-48">
                  <Image src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80" alt="Luxury Condominium Trends" fill className="object-cover" />
                  <div className="absolute top-3 left-3 bg-primary-red text-white px-3 py-1 rounded-full text-xs font-medium">
                    Market Trends
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary-red transition-colors">5 Luxury Condominium Trends to Watch in 2024</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    From smart home integration to wellness-focused amenities, discover the top trends shaping luxury
                    condominiums this year.
                  </p>
                  <div className="flex items-center text-gray-400 mb-4 text-xs">
                    <div className="flex items-center mr-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Apr 28, 2024</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>5 min read</span>
                    </div>
                  </div>
                  <div className="text-primary-red font-medium hover:underline text-sm inline-flex items-center">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Article 2 */}
            <motion.div 
              className="bg-black rounded-lg overflow-hidden shadow-md border border-gray-800"
              variants={fadeInUp}
            >
              <Link href="/editorial/investment-strategies">
                <div className="relative h-48">
                  <Image src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80" alt="Investment Strategies" fill className="object-cover" />
                  <div className="absolute top-3 left-3 bg-primary-red text-white px-3 py-1 rounded-full text-xs font-medium">
                    Investment
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary-red transition-colors">Investment Strategies for New Launch Properties</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    Expert advice on how to maximize returns when investing in pre-construction properties, including
                    timing, location selection, and negotiation tactics.
                  </p>
                  <div className="flex items-center text-gray-400 mb-4 text-xs">
                    <div className="flex items-center mr-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Apr 22, 2024</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>7 min read</span>
                    </div>
                  </div>
                  <div className="text-primary-red font-medium hover:underline text-sm inline-flex items-center">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Article 3 */}
            <motion.div 
              className="bg-black rounded-lg overflow-hidden shadow-md border border-gray-800"
              variants={fadeInUp}
            >
              <Link href="/editorial/sustainable-developments">
                <div className="relative h-48">
                  <Image src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80" alt="Sustainable Development" fill className="object-cover" />
                  <div className="absolute top-3 left-3 bg-primary-red text-white px-3 py-1 rounded-full text-xs font-medium">
                    Sustainability
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary-red transition-colors">The Rise of Sustainable New Developments</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    How eco-friendly features are becoming standard in new launches and why buyers are willing to pay a
                    premium for sustainable living spaces.
                  </p>
                  <div className="flex items-center text-gray-400 mb-4 text-xs">
                    <div className="flex items-center mr-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Apr 15, 2024</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>6 min read</span>
                    </div>
                  </div>
                  <div className="text-primary-red font-medium hover:underline text-sm inline-flex items-center">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Button variant="outline" className="border-primary-red text-primary-red hover:bg-primary-red hover:text-white">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
