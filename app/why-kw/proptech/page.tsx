"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Brain, Share2, Video, BarChart3, Users, Building2, Award, Cpu, Zap, Smartphone, LineChart, Target, Search } from "lucide-react"
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

export default function PropTechPage() {
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
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
            alt="KW PropTech"
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
            <span className="text-white font-semibold">Tech That Closes</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            PropTech That Powers Success
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-white">
            Asset Tools, PSF Trackers & More
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-100">
            Access a suite of cutting-edge tools designed to help you win high-value clients and close more deals. From market analysis to client engagement, our PropTech stack gives you the edge.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-gray-200">
              <Cpu className="w-5 h-5 text-primary-red" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <Zap className="w-5 h-5 text-primary-red" />
              <span>Real-Time Data</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <Smartphone className="w-5 h-5 text-primary-red" />
              <span>Mobile Ready</span>
            </div>
          </div>
          <Button 
            className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[56px] min-w-[240px]"
            onClick={() => setIsJoinFormOpen(true)}
          >
            Explore Our PropTech →
          </Button>
        </motion.div>
      </section>

      {/* Tools Section */}
      <section className="relative py-24 bg-black/90">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
          {/* Left column: Heading and subheading at the top */}
          <motion.div 
            className="mb-12 md:mb-0 mt-6 md:sticky md:top-24 md:z-10 md:bg-black/90"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-5xl md:text-6xl font-medium mb-6 text-white">
              Powerful Tools for Modern Real Estate
            </h2>
            <h3 className="text-xl md:text-2xl text-primary-red mb-6">
              Everything You Need to Win
            </h3>
          </motion.div>

          {/* Right column: Feature cards stacked vertically */}
          <motion.div 
            className="flex flex-col gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Card 1 */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <LineChart className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">PSF Tracker</h4>
              <p className="text-gray-200">
                Track and analyze PSF trends across districts. Make data-driven decisions with real-time market insights.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <Target className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">Asset Tools</h4>
              <p className="text-gray-200">
                Evaluate properties with precision. Calculate ROI, analyze market potential, and present compelling investment cases.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <Search className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">Market Intelligence</h4>
              <p className="text-gray-200">
                Access comprehensive market data, trends, and insights to guide your clients with confidence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI Features */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"
            alt="AI Features"
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
                AI-Powered Insights
              </h2>
              <h3 className="text-xl md:text-2xl text-primary-red">
                Smart Tools for Smart Decisions
              </h3>
              <p className="text-gray-300 text-lg">
                Our AI-powered tools analyze market data, predict trends, and provide actionable insights. Stay ahead of the market and guide your clients with confidence.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-200">
                  <Brain className="w-5 h-5 text-primary-red" />
                  <span>Predictive analytics</span>
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <Zap className="w-5 h-5 text-primary-red" />
                  <span>Real-time market insights</span>
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <Target className="w-5 h-5 text-primary-red" />
                  <span>Smart property matching</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[600px]">
              <Image
                src="/images/proptech-dashboard.webp"
                alt="KW PropTech Dashboard"
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
            <h3 className="text-5xl md:text-6xl font-medium mb-8 text-white">
              Ready to Power Your Success?
            </h3>
            <div className="flex flex-row gap-4 justify-center">
              <Button 
                className="bg-primary-red text-white hover:bg-primary-red/90 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[48px] min-w-[200px]"
                onClick={() => setIsJoinFormOpen(true)}
              >
                Get Started with KW PropTech →
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