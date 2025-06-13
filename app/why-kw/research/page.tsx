"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Brain, Share2, Video, BarChart3, Users, Building2, Award, Search, LineChart, Target, Globe, TrendingUp, PieChart } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import non-critical components
const JoinFormDialog = dynamic(() => import("@/components/join-form-dialog").then(mod => mod.JoinFormDialog), {
  loading: () => <div className="h-0" />,
  ssr: false
})

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

const sectionVariants = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" }
}

export default function ResearchPage() {
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  const handleJoinSubmit = (data: any) => {
    console.log("Form submitted:", data)
    setIsJoinFormOpen(false)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
            alt="KW Research Platform"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div 
          className="relative container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-primary-red/20 rounded-full mb-6 border border-primary-red/30">
            <span className="text-white font-semibold">Insights That Convert</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            Market Intelligence
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-white">
            Smart Charts, Disparity Maps & Launch Decks
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-100">
            Access exclusive pricing trends, district analytics, and investor-ready insights. Make smarter decisions and guide your clients with confidence—powered by real-time data that moves with the market.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-gray-200">
              <Search className="w-5 h-5 text-primary-red" />
              <span>Real-Time Data</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <LineChart className="w-5 h-5 text-primary-red" />
              <span>Market Trends</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <Target className="w-5 h-5 text-primary-red" />
              <span>Smart Insights</span>
            </div>
          </div>
          <Button 
            className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[56px] min-w-[240px]"
            onClick={() => setIsJoinFormOpen(true)}
          >
            Access Market Intelligence →
          </Button>
        </motion.div>
      </section>

      {/* Research Tools Section */}
      <section className="relative py-24 bg-black/90">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Comprehensive Research Tools
            </h2>
            <h3 className="text-xl md:text-2xl text-primary-red mb-6">
              Everything You Need to Know
            </h3>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <LineChart className="w-6 h-6 text-primary-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Market Trends</h4>
              <p className="text-gray-300">
                Track PSF movements, transaction volumes, and market indicators across all districts in real-time.
              </p>
            </motion.div>

            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-primary-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">District Analytics</h4>
              <p className="text-gray-300">
                Deep dive into district performance, amenities, and development plans with our comprehensive analytics.
              </p>
            </motion.div>

            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <PieChart className="w-6 h-6 text-primary-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Investment Insights</h4>
              <p className="text-gray-300">
                Access ROI calculators, yield analysis, and investment opportunity reports for informed decision-making.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Launch Decks */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000"
            alt="Launch Decks"
            fill
            className="object-cover brightness-[0.2]"
            style={{ transform: 'translateZ(-1px) scale(2)' }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Professional Launch Decks
              </h2>
              <h3 className="text-xl md:text-2xl text-primary-red">
                Present with Confidence
              </h3>
              <p className="text-gray-300 text-lg">
                Access professionally designed launch decks with the latest market data, project insights, and investment analysis. Impress your clients with comprehensive, visually stunning presentations.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-200">
                  <TrendingUp className="w-5 h-5 text-primary-red" />
                  <span>Market performance analysis</span>
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <Target className="w-5 h-5 text-primary-red" />
                  <span>Investment opportunity reports</span>
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <Building2 className="w-5 h-5 text-primary-red" />
                  <span>Project comparison tools</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[600px]">
              <Image
                src="/images/research-dashboard.webp"
                alt="KW Research Dashboard"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Ready to Access Premium Market Intelligence?
            </h2>
            <div className="flex flex-row gap-4 justify-center">
              <Button 
                className="bg-primary-red text-white hover:bg-primary-red/90 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[48px] min-w-[200px]"
                onClick={() => setIsJoinFormOpen(true)}
              >
                Get Started with KW Research →
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <JoinFormDialog 
        isOpen={isJoinFormOpen}
        onClose={() => setIsJoinFormOpen(false)}
        onSubmit={handleJoinSubmit}
      />
    </motion.main>
  )
} 