"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Brain, Share2, Video, BarChart3, Users, Building2, Award, Command, Smartphone, Zap } from "lucide-react"
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

export default function CommandPage() {
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
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
            alt="KW Command Platform"
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
            <span className="text-white font-semibold">Your All-In-One Control Panel</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            Command Your Business
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-white">
            One Platform. Endless Possibilities.
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-100">
            KW Command is your complete business operations hub—powered by AI and designed to scale. From lead capture to closing, manage everything from one intuitive dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-gray-200">
              <Command className="w-5 h-5 text-primary-red" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <Smartphone className="w-5 h-5 text-primary-red" />
              <span>Mobile First</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <Zap className="w-5 h-5 text-primary-red" />
              <span>Lightning Fast</span>
            </div>
          </div>
          <Button 
            className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[56px] min-w-[240px]"
            onClick={() => setIsJoinFormOpen(true)}
          >
            Experience KW Command →
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Everything You Need
            </h2>
            <h3 className="text-xl md:text-2xl text-primary-red mb-6">
              Powerful Features for Modern Real Estate
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
              <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-primary-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">AI Lead Management</h4>
              <p className="text-gray-300">
                Automatically capture, qualify, and nurture leads with AI-powered insights and smart follow-ups.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-primary-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Smart Analytics</h4>
              <p className="text-gray-300">
                Track your performance, pipeline, and growth with real-time analytics and predictive insights.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Share2 className="w-6 h-6 text-primary-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Automated Marketing</h4>
              <p className="text-gray-300">
                Launch targeted campaigns, manage social media, and track ROI—all from one place.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Experience */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=2000"
            alt="Mobile Experience"
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
                Business in Your Pocket
              </h2>
              <h3 className="text-xl md:text-2xl text-primary-red">
                Run Your Business Anywhere
              </h3>
              <p className="text-gray-300 text-lg">
                Access your entire business from your smartphone. Respond to leads, manage listings, and close deals—all while on the go. KW Command's mobile-first design ensures you never miss an opportunity.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-200">
                  <Smartphone className="w-5 h-5 text-primary-red" />
                  <span>Real-time notifications</span>
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <Zap className="w-5 h-5 text-primary-red" />
                  <span>Instant lead response</span>
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <Command className="w-5 h-5 text-primary-red" />
                  <span>Full business control</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[600px]">
              <Image
                src="/images/command-mobile-mockup.webp"
                alt="KW Command Mobile App"
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
              Ready to Transform Your Business?
            </h2>
            <div className="flex flex-row gap-4 justify-center">
              <Button 
                className="bg-primary-red text-white hover:bg-primary-red/90 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[48px] min-w-[200px]"
                onClick={() => setIsJoinFormOpen(true)}
              >
                Get Started with KW Command →
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