"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Brain, Share2, Video, BarChart3, Users, Building2, Award, TrendingUp, DollarSign, Network, Globe, Zap, CheckCircle, PieChart } from "lucide-react"
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

export default function GrowthSharePage() {
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
      <section className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-center justify-center pt-20 sm:pt-20 md:pt-12">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000"
            alt="KW Growth Share Model"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div 
          className="relative container mx-auto px-4 text-center pt-8 sm:pt-12 md:pt-16 lg:pt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 bg-primary-red/20 rounded-full mb-6 border border-primary-red/30">
            <span className="text-white font-semibold">Earn Beyond Closings.</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            Growth Share Model
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-white">
            Build Passive Income Through Global Network
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-100">
            The KW Growth Share Model is a revolutionary compensation system that rewards you for building and mentoring your team. Earn 2% from every deal in your 7-tier network—passive income that grows with your team's success.
          </p>
          <Button 
            className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[56px] min-w-[240px]"
            onClick={() => setIsJoinFormOpen(true)}
          >
            Build Your Network →
          </Button>
        </motion.div>
      </section>

      {/* Growth Share Model Section */}
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
              How It Works
            </h2>
            <h3 className="text-xl md:text-2xl text-primary-red mb-6">
              The Revolutionary 7-Tier System
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
                <Network className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">7-Tier Network</h4>
              <p className="text-gray-200">
                Build a network that extends 7 levels deep. Every consultant you recruit and every consultant they recruit contributes to your passive income.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <DollarSign className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">2% Commission</h4>
              <p className="text-gray-200">
                Earn 2% from every transaction completed by anyone in your network. This includes both your direct recruits and their recruits.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <Globe className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">Global Reach</h4>
              <p className="text-gray-200">
                Your network isn't limited to Singapore. KW operates in 60+ countries, giving you access to a global pool of potential recruits.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Network Visualization Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
            alt="Network Growth"
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
                Your Network Potential
              </h2>
              <p className="text-lg text-gray-200">
                See how your network can grow exponentially and generate substantial passive income over time.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-red rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Direct Recruits</h4>
                    <p className="text-gray-300 text-sm">Start by recruiting 5-10 consultants directly under you.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-red rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Network Expansion</h4>
                    <p className="text-gray-300 text-sm">Each recruit builds their own network, expanding your reach.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-red rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Passive Income</h4>
                    <p className="text-gray-300 text-sm">Earn from every transaction across your entire network.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Network Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-200">Unlimited earning potential</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-200">Passive income generation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-200">Global network access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-200">Mentorship opportunities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-200">Residual income for life</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Income Potential Section */}
      <section className="relative py-24 bg-black/90">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Income Potential
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how the Growth Share Model can transform your income potential
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-primary-red" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Unlimited</h3>
              <p className="text-gray-300">Earning Potential</p>
            </motion.div>

            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-10 h-10 text-primary-red" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">2%</h3>
              <p className="text-gray-300">From Every Deal</p>
            </motion.div>

            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-primary-red" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">60+</h3>
              <p className="text-gray-300">Countries</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000"
            alt="Success Stories"
            fill
            className="object-cover brightness-[0.2]"
            style={{ transform: 'translateZ(-1px) scale(2)' }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real consultants who have built successful networks through the Growth Share Model
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Sarah Chen</h4>
                  <p className="text-gray-300 text-sm">Senior Consultant</p>
                </div>
              </div>
              <p className="text-gray-200 mb-4">
                "The Growth Share Model has transformed my income. I now earn more from my network than from my own deals. It's truly life-changing."
              </p>
              <div className="flex items-center gap-2 text-primary-red">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">$50K+ monthly passive income</span>
              </div>
            </motion.div>

            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Michael Tan</h4>
                  <p className="text-gray-300 text-sm">Team Leader</p>
                </div>
              </div>
              <p className="text-gray-200 mb-4">
                "Building a network has given me financial freedom. I can focus on mentoring and growing my team while earning passive income."
              </p>
              <div className="flex items-center gap-2 text-primary-red">
                <Network className="w-4 h-4" />
                <span className="text-sm font-semibold">200+ consultants in network</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Your Network?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start building your passive income stream today with the KW Growth Share Model. Join thousands of successful consultants who have transformed their financial future.
            </p>
            <Button 
              className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[56px] min-w-[240px]"
              onClick={() => setIsJoinFormOpen(true)}
            >
              Start Building Your Network →
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Join Form Dialog */}
      <JoinFormDialog
        isOpen={isJoinFormOpen}
        onClose={() => setIsJoinFormOpen(false)}
        onSubmit={handleJoinSubmit}
      />
    </motion.main>
  )
}
