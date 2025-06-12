"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import Image from "next/image"
import { useState, useRef } from "react"
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

// Add these variants before the ParallaxImage component
const typingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const typingTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const TypingText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      variants={typingVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {typeof children === 'string' ? (
        children.split(' ').map((word, i) => (
          <motion.span
            key={i}
            variants={typingTextVariants}
            className="inline-block mr-1.5"
          >
            {word}
          </motion.span>
        ))
      ) : (
        <motion.div variants={typingTextVariants}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default function JoinKW() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data)
    setIsDialogOpen(false)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Hero Section - Enhanced for Real Estate Agents */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt="Join KW Singapore"
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
            <span className="text-white font-semibold">Exclusive Opportunity for Real Estate Professionals</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            Elevate Your Real Estate Career
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-white">
            Join Singapore's Most Innovative Real Estate Platform
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-100">
            KW Singapore is where ambitious real estate professionals transform their careers. With our proprietary systems, cutting-edge technology, and proven growth models, we're building the future of real estate in Singapore.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 text-gray-200">
              <Building2 className="w-5 h-5 text-primary-red" />
              <span>Established 2023</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <Users className="w-5 h-5 text-primary-red" />
              <span>Growing Community</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <Award className="w-5 h-5 text-primary-red" />
              <span>Industry Recognition</span>
            </div>
          </div>
          <Button 
            className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[56px] min-w-[240px]"
            onClick={() => setIsDialogOpen(true)}
          >
            Apply to Join KW Singapore →
          </Button>
        </motion.div>
      </section>

      {/* Why KW Singapore Section - New */}
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
              Why KW Singapore?
            </h2>
            <h3 className="text-xl md:text-2xl text-primary-red mb-6">
              The Competitive Edge for Modern Real Estate Professionals
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
                <Award className="w-6 h-6 text-primary-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Industry Leadership</h4>
              <p className="text-gray-300">
                Join a globally recognized brand with a proven track record of success. KW's systems and methodologies are trusted by top performers worldwide.
              </p>
            </motion.div>

            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-primary-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Innovation First</h4>
              <p className="text-gray-300">
                Access cutting-edge technology and AI tools designed specifically for real estate professionals. Stay ahead of market trends and client expectations.
              </p>
            </motion.div>

            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Community Growth</h4>
              <p className="text-gray-300">
                Be part of a collaborative environment where success is shared. Our Growth Share model rewards both individual achievement and community building.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Growth Share Model Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000"
              alt="Growth Share Model Background"
              fill
              className="object-cover brightness-[0.2]"
              style={{ transform: 'translateZ(-1px) scale(2)' }}
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
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
                alt="Growth Share Model"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
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
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
              alt="AI & Tech Tools Background"
              fill
              className="object-cover brightness-[0.2]"
              style={{ transform: 'translateZ(-1px) scale(2)' }}
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
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
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-primary-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">KW Command</h4>
              <p className="text-gray-300">
                Your business operations hub—built to scale consultants and teams. From lead capture to closing, every function runs through one AI-driven platform.
              </p>
            </motion.div>
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Share2 className="w-6 h-6 text-primary-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Smart Automation</h4>
              <p className="text-gray-300">
                Automate follow-ups. Launch smart campaigns. Track your pipeline in real time. Manage it all on the go with full visibility, anywhere you are.
              </p>
            </motion.div>
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-primary-red" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-white">Systemized Growth</h4>
              <p className="text-gray-300">
                Top consultants don't work more—they systemize better. Our tools help you build efficient, scalable processes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* KW Services Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"
              alt="KW Services Background"
              fill
              className="object-cover brightness-[0.2]"
              style={{ transform: 'translateZ(-1px) scale(2)' }}
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              KW Services
            </h2>
            <h3 className="text-xl md:text-2xl text-primary-red mb-6">
              Comprehensive Support for Your Success
            </h3>
          </motion.div>

          <div className="space-y-24">
            {/* Training Section - Image on Left */}
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <ParallaxImage
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000"
                alt="KW Training"
              />
              <div className="space-y-6">
                <TypingText>
                  <h3 className="text-2xl font-bold text-white">KW Training</h3>
                </TypingText>
                <TypingText>
                  <h4 className="text-xl text-primary-red">Model-Driven. Results-Focused.</h4>
                </TypingText>
                <TypingText className="text-gray-300 text-lg">
                  Training built on proven models, not theory. Grounded in the MREA playbook, every session is designed to help consultants generate leads, close more deals, and scale with structure.
                </TypingText>
              </div>
            </motion.div>

            {/* Media Hub Section - Image on Right */}
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <TypingText>
                  <h3 className="text-2xl font-bold text-white">KW Media Hub</h3>
                </TypingText>
                <TypingText>
                  <h4 className="text-xl text-primary-red">Elevate Your Presence</h4>
                </TypingText>
                <TypingText className="text-gray-300 text-lg">
                  Our in-house media team helps you stand out with professional visuals, social content, and listing marketing that drives engagement and trust. From brand videos to digital ads—it's all under one roof.
                </TypingText>
              </div>
              <ParallaxImage
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=2000"
                alt="KW Media Hub"
              />
            </motion.div>

            {/* Research Platform Section - Image on Left */}
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <ParallaxImage
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
                alt="KW Research Platform"
              />
              <div className="space-y-6">
                <TypingText>
                  <h3 className="text-2xl font-bold text-white">KW Research Platform</h3>
                </TypingText>
                <TypingText>
                  <h4 className="text-xl text-primary-red">Market Intelligence</h4>
                </TypingText>
                <TypingText className="text-gray-300 text-lg">
                  Access exclusive pricing trends, district analytics, and investor-ready insights. Make smarter decisions and guide your clients with confidence—powered by real-time data that moves with the market.
                </TypingText>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Update the Final CTA Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Ready to Transform Your Real Estate Career?
            </h2>
            <div className="flex flex-row gap-4 justify-center">
              <Button 
                className="bg-primary-red text-white hover:bg-primary-red/90 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[48px] min-w-[200px]"
                onClick={() => setIsDialogOpen(true)}
              >
                Apply Now →
              </Button>
              <Button 
                className="bg-white text-black hover:bg-white/90 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[48px] min-w-[200px]"
              >
                Schedule a Consultation
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
    </motion.main>
  )
}

const ParallaxImage = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div ref={ref} className="relative h-[400px] rounded-xl overflow-hidden">
      <motion.div
        style={{ 
          y, 
          scale,
          transformOrigin: "center center"
        }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </motion.div>
    </div>
  );
};

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