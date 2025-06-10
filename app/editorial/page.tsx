"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import dynamic from "next/dynamic"
import EditorialCard from "@/components/editorial-card"

// Dynamically import non-critical components
const Dialog = dynamic(() => import("@/components/ui/dialog").then(mod => mod.Dialog), {
  loading: () => <div className="h-0" />,
  ssr: false
})
const DialogContent = dynamic(() => import("@/components/ui/dialog").then(mod => mod.DialogContent), {
  loading: () => <div className="h-0" />,
  ssr: false
})
const DialogHeader = dynamic(() => import("@/components/ui/dialog").then(mod => mod.DialogHeader), {
  loading: () => <div className="h-0" />,
  ssr: false
})
const DialogTitle = dynamic(() => import("@/components/ui/dialog").then(mod => mod.DialogTitle), {
  loading: () => <div className="h-0" />,
  ssr: false
})
const DialogTrigger = dynamic(() => import("@/components/ui/dialog").then(mod => mod.DialogTrigger), {
  loading: () => <div className="h-0" />,
  ssr: false
})

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
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
      <section className="relative h-screen w-full">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
          alt="KW Blog"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20 flex items-center justify-center">
          <motion.div 
            className="container mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
              style={{ contentVisibility: 'auto' }}
            >
              KW Singapore Insights
            </h1>
            <p 
              className="text-lg sm:text-xl max-w-3xl mx-auto mb-12 text-gray-200"
              style={{ contentVisibility: 'auto' }}
            >
              Your trusted source for real estate insights, market trends, and expert analysis. 
              From luxury living to investment strategies, discover the stories and expertise 
              that make KW Singapore your premier real estate partner.
            </p>
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="flex justify-center"
            >
              <Button 
                className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg"
                onClick={() => {
                  const nextSection = document.querySelector('section:nth-child(2)') as HTMLElement;
                  if (nextSection) {
                    window.scrollTo({ top: nextSection.offsetTop, behavior: 'smooth' });
                  }
                }}
              >
                Explore Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
              <p className="text-gray-300">Discover insights and stories from KW Singapore</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 bg-gray-900 border-gray-700 text-gray-300 placeholder:text-gray-500"
                />
              </div>
              <Button variant="outline" className="flex items-center border-gray-700 text-gray-300 hover:bg-gray-800">
                <Filter className="h-4 w-4 mr-2" />
                Categories
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EditorialCard
              title="The Future of Luxury Living in Singapore"
              excerpt="Explore how luxury residential developments are evolving to meet the demands of modern homeowners, with a focus on sustainability, smart technology, and community living."
              image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
              date="March 15, 2024"
              readTime="5 min read"
              category="Luxury Living"
              slug="future-of-luxury-living"
            />

            <EditorialCard
              title="Investment Opportunities in District 9"
              excerpt="A comprehensive analysis of the real estate market in District 9, highlighting emerging investment opportunities and market trends in this prime location."
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
              date="March 12, 2024"
              readTime="4 min read"
              category="Market Insights"
              slug="district-9-investment"
            />

            <EditorialCard
              title="Sustainable Living: Green Features in New Developments"
              excerpt="Discover how new residential projects are incorporating sustainable features and green technologies to create eco-friendly living spaces."
              image="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
              date="March 10, 2024"
              readTime="6 min read"
              category="Sustainability"
              slug="sustainable-living-features"
            />

            <EditorialCard
              title="The Rise of Mixed-Use Developments"
              excerpt="Understanding the growing popularity of mixed-use developments and how they're reshaping urban living in Singapore."
              image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
              date="March 8, 2024"
              readTime="5 min read"
              category="Urban Living"
              slug="rise-of-mixed-use"
            />

            <EditorialCard
              title="Family-Friendly Condominiums: What to Look For"
              excerpt="A guide to choosing the perfect family-friendly condominium, from amenities to location considerations and community features."
              image="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80"
              date="March 5, 2024"
              readTime="7 min read"
              category="Family Living"
              slug="family-friendly-condos"
            />

            <EditorialCard
              title="Smart Home Technology in Modern Condos"
              excerpt="How smart home technology is transforming the way we live, with a look at the latest innovations in residential developments."
              image="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80"
              date="March 3, 2024"
              readTime="4 min read"
              category="Technology"
              slug="smart-home-technology"
            />
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" className="mx-1 px-4 border-gray-700 text-gray-300 hover:bg-gray-800">
              1
            </Button>
            <Button variant="outline" className="mx-1 px-4 border-gray-700 text-gray-300 hover:bg-gray-800">
              2
            </Button>
            <Button variant="outline" className="mx-1 px-4 border-gray-700 text-gray-300 hover:bg-gray-800">
              3
            </Button>
            <Button variant="outline" className="mx-1 border-gray-700 text-gray-300 hover:bg-gray-800">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
