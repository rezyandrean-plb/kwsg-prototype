"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Globe, Building2, Users, Award, Target, Heart, Lightbulb } from "lucide-react"
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

export default function GlobalBrandPage() {
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
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt="KW Global Brand"
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
            <span className="text-white font-semibold">Global Real Estate Powerhouse</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            Built by the World. Powered for You.
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-white">
            Join the World's Most Trusted Real Estate Brand
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-100">
            With a presence in 60+ countries and over 200,000 consultants worldwide, KW Singapore gives you instant credibility and access to a global network of opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-gray-200">
              <Globe className="w-5 h-5 text-primary-red" />
              <span>60+ Countries</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <Users className="w-5 h-5 text-primary-red" />
              <span>200,000+ Consultants</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <Award className="w-5 h-5 text-primary-red" />
              <span>Global Recognition</span>
            </div>
          </div>
          <Button 
            className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[56px] min-w-[240px]"
            onClick={() => setIsJoinFormOpen(true)}
          >
            Join KW Singapore →
          </Button>
        </motion.div>
      </section>

      {/* Global Network Section */}
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
              Global Network, Local Expertise
            </h2>
            <h3 className="text-xl md:text-2xl text-primary-red mb-6">
              The Power of Worldwide Connections
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
                <Globe className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">Global Referrals</h4>
              <p className="text-gray-200">
                Access a worldwide network of real estate professionals. Connect with clients and opportunities across borders through our established referral system.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <Building2 className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">Developer Relations</h4>
              <p className="text-gray-200">
                Leverage KW's global reputation to build strong relationships with developers and secure exclusive project access.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <Award className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">Brand Trust</h4>
              <p className="text-gray-200">
                Build instant credibility with clients through KW's globally recognized brand and proven track record of excellence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Global Success Stories */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
            alt="Global Success Stories"
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
            <h2 className="text-5xl md:text-6xl font-medium mb-6 text-white">
              Global Success Stories
            </h2>
            <h3 className="text-xl md:text-2xl text-primary-red mb-6">
              Real Results from Real Consultants
            </h3>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <Target className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">International Expansion</h4>
              <p className="text-gray-200">
                "KW's global network helped me expand my business beyond Singapore. I now handle international clients and properties with confidence."
              </p>
            </motion.div>

            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <Heart className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">Client Trust</h4>
              <p className="text-gray-200">
                "The KW brand gives my clients confidence. They know they're working with a globally recognized real estate professional."
              </p>
            </motion.div>
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
              Ready to Join the Global Real Estate Leader?
            </h3>
            <div className="flex flex-row gap-4 justify-center">
              <Button 
                className="bg-primary-red text-white hover:bg-primary-red/90 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[48px] min-w-[200px]"
                onClick={() => setIsJoinFormOpen(true)}
              >
                Join KW Singapore →
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