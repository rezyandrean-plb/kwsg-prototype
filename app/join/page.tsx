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
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
            alt="Join KW Singapore"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <motion.div 
          className="relative container mx-auto px-4 text-center pt-16 sm:pt-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
            Built for Realtors. Backed by Innovation.
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 sm:mb-12 text-gray-200">
            KW Singapore is where real estate consultants grow scalable, sustainable businesses. Backed by world-class systems, PropTech, and a performance-driven culture, we equip you with the tools, training, and platforms to lead in today's market.
          </p>
        </motion.div>
      </section>

      {/* Growth Share Model Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Growth Share Model</h2>
              <p className="text-xl text-gray-300 mb-6">Earn Beyond Transactions. Share in the Growth.</p>
              <p className="text-gray-300 mb-6">
                KW's 7-tier Growth Share model rewards you for growing the community. Every consultant you introduce creates a new stream of passive income—without managing a team. It's scalable, collaborative, and built for longevity.
              </p>
              <p className="text-gray-300">
                Your share continues through a named beneficiary—securing a legacy beyond your career.
              </p>
            </div>
            <motion.div 
              className="relative h-[400px] rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                alt="Growth Share Model"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI & Tech Tools Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative h-[400px] rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
                alt="KW Command Platform"
                fill
                className="object-cover"
              />
            </motion.div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">AI & Tech Tools</h2>
              <p className="text-xl text-gray-300 mb-6">Engineered for Growth. Powered by AI.</p>
              <p className="text-gray-300 mb-6">
                KW Command is your business operations hub—built to scale consultants and teams. From lead capture to closing, every function runs through one AI-driven platform.
              </p>
              <p className="text-gray-300 mb-6">
                Automate follow-ups. Launch smart campaigns. Track your pipeline in real time. And with the Command Mobile App, manage it all on the go—with full visibility, anywhere you are.
              </p>
              <p className="text-gray-300">
                Top consultants don't work more—they systemize better.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KW Training Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">KW Training</h2>
            <p className="text-xl text-gray-300 mb-6">Model-Driven. Results-Focused.</p>
            <p className="text-gray-300 mb-6">
              Training at KW Singapore is built on proven models, not theory. Grounded in the MREA playbook, every session is designed to help consultants generate leads, close more deals, and scale with structure.
            </p>
            <p className="text-gray-300">
              From new consultants to experienced teams, the focus is the same—business growth through systems that work. No fluff. Just frameworks that deliver.
            </p>
          </motion.div>
        </div>
      </section>

      {/* KW Media Hub Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">KW Media Hub for Realtors</h2>
              <p className="text-xl text-gray-300 mb-6">Elevate Your Presence. Market with Precision.</p>
              <p className="text-gray-300">
                Our in-house media team helps you stand out with professional visuals, social content, and listing marketing that drives engagement and trust. From brand videos to digital ads—it's all under one roof.
              </p>
            </div>
            <motion.div 
              className="relative h-[400px] rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                alt="KW Media Hub"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* KW Research Platform Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative h-[400px] rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
                alt="KW Research Platform"
                fill
                className="object-cover"
              />
            </motion.div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">KW Research Platform</h2>
              <p className="text-xl text-gray-300 mb-6">Market Intelligence. Real-Time Advantage.</p>
              <p className="text-gray-300">
                Access exclusive pricing trends, district analytics, and investor-ready insights. Make smarter decisions and guide your clients with confidence—powered by real-time data that moves with the market.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Business With KW Singapore?</h2>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8 px-4 sm:px-0"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp} className="w-full sm:w-auto">
                <Button 
                  className="w-full sm:w-auto bg-primary-red text-white hover:bg-primary-red/90 px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Become a KW Realtor
                </Button>
              </motion.div>
              <motion.div variants={fadeInUp} className="w-full sm:w-auto">
                <Button 
                  className="w-full sm:w-auto bg-white text-primary-red hover:bg-white/90 px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Book a Discovery Call
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 