"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import dynamic from "next/dynamic"
import { ArrowRight, Brain, Share2, Video, BarChart3, Users, Building2, Award } from "lucide-react"

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

export default function JoinKW() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data)
    setIsDialogOpen(false)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000"
            alt="Join KW Singapore"
            fill
            className="object-cover brightness-[0.4]"
            priority
            fetchPriority="high"
            sizes="100vw"
            style={{ contentVisibility: 'auto' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20" />
        </div>
        <motion.div 
          className="relative container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white/90"
            style={{ contentVisibility: 'auto' }}
          >
            KW Singapore
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-white/90">
            Built for Realtors. Backed by Innovation.
          </h2>
          <p 
            className="text-lg sm:text-xl max-w-3xl mx-auto mb-12 text-gray-100/90"
            style={{ contentVisibility: 'auto' }}
          >
            KW Singapore is where real estate consultants grow scalable, sustainable businesses. Backed by world-class systems, PropTech, and a performance-driven culture, we equip you with the tools, training, and platforms to lead in today's market.
          </p>
        </motion.div>
      </section>

      {/* Growth Share Model Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
                alt="Growth Share Model"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Growth Share Model
              </h2>
              <h3 className="text-xl md:text-2xl text-primary-red mb-6">
                Earn Beyond Transactions. Share in the Growth.
              </h3>
              <p className="text-gray-300 mb-6">
                KW's 7-tier Growth Share model rewards you for growing the community. Every consultant you introduce creates a new stream of passive income—without managing a team. It's scalable, collaborative, and built for longevity.
              </p>
              <p className="text-gray-300">
                Your share continues through a named beneficiary—securing a legacy beyond your career.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI & Tech Tools Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              AI & Tech Tools
            </h2>
            <h3 className="text-xl md:text-2xl text-primary-red mb-6">
              Engineered for Growth. Powered by AI.
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
              className="bg-gray-800 p-8 rounded-lg"
              variants={fadeInUp}
            >
              <Brain className="w-12 h-12 text-primary-red mb-6" />
              <h4 className="text-xl font-semibold mb-4">KW Command</h4>
              <p className="text-gray-300">
                Your business operations hub—built to scale consultants and teams. From lead capture to closing, every function runs through one AI-driven platform.
              </p>
            </motion.div>
            <motion.div 
              className="bg-gray-800 p-8 rounded-lg"
              variants={fadeInUp}
            >
              <Share2 className="w-12 h-12 text-primary-red mb-6" />
              <h4 className="text-xl font-semibold mb-4">Smart Automation</h4>
              <p className="text-gray-300">
                Automate follow-ups. Launch smart campaigns. Track your pipeline in real time. Manage it all on the go with full visibility, anywhere you are.
              </p>
            </motion.div>
            <motion.div 
              className="bg-gray-800 p-8 rounded-lg"
              variants={fadeInUp}
            >
              <BarChart3 className="w-12 h-12 text-primary-red mb-6" />
              <h4 className="text-xl font-semibold mb-4">Systemized Growth</h4>
              <p className="text-gray-300">
                Top consultants don't work more—they systemize better. Our tools help you build efficient, scalable processes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* KW Training Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                KW Training
              </h2>
              <h3 className="text-xl md:text-2xl text-primary-red mb-6">
                Model-Driven. Results-Focused.
              </h3>
              <p className="text-gray-300 mb-6">
                Training at KW Singapore is built on proven models, not theory. Grounded in the MREA playbook, every session is designed to help consultants generate leads, close more deals, and scale with structure.
              </p>
              <p className="text-gray-300">
                From new consultants to experienced teams, the focus is the same—business growth through systems that work. No fluff. Just frameworks that deliver.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000"
                alt="KW Training"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* KW Media Hub Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000"
                alt="KW Media Hub"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                KW Media Hub for Realtors
              </h2>
              <h3 className="text-xl md:text-2xl text-primary-red mb-6">
                Elevate Your Presence. Market with Precision.
              </h3>
              <p className="text-gray-300">
                Our in-house media team helps you stand out with professional visuals, social content, and listing marketing that drives engagement and trust. From brand videos to digital ads—it's all under one roof.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KW Research Platform Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                KW Research Platform
              </h2>
              <h3 className="text-xl md:text-2xl text-primary-red mb-6">
                Market Intelligence. Real-Time Advantage.
              </h3>
              <p className="text-gray-300">
                Access exclusive pricing trends, district analytics, and investor-ready insights. Make smarter decisions and guide your clients with confidence—powered by real-time data that moves with the market.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000"
                alt="KW Research Platform"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Ready to Build Your Business With KW Singapore?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-primary-red text-white hover:bg-primary-red/90 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[48px]"
                onClick={() => setIsDialogOpen(true)}
              >
                Become a KW Realtor →
              </Button>
              <Button 
                className="bg-white text-black hover:bg-white/90 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[48px]"
              >
                Book a Discovery Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <JoinFormDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </main>
  )
}

/*
Original code preserved below for future use:

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Users, Award, ArrowRight, Brain, Share2, Video, BarChart3 } from "lucide-react"
import Image from "next/image"
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

export default function JoinKW() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      // ... existing code ...
    </main>
  )
}
*/ 