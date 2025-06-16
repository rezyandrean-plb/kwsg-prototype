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

// Add new animation variants
const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
}

const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
}

const slideInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
}

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
      {/* Hero Section - Updated for Real Estate Professionals */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000"
            alt="Join KW Singapore"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        </div>
        <motion.div 
          className="relative container mx-auto px-4 text-center max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block px-6 py-3 bg-primary-red/20 rounded-full mb-8 border border-primary-red/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-white font-semibold text-lg">Exclusive Opportunity for High-Performing Real Estate Professionals</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight leading-tight">
            Your Future in Real Estate,<br />Reimagined
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-12 text-gray-100 leading-relaxed">
            You're a high-performing strategist, confident in your vision, and ambitious in your goals. At KW Singapore, we've built the definitive platform to empower your dominance.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <motion.div 
              className="flex items-center gap-3 text-gray-200 bg-white/5 px-6 py-3 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Building2 className="w-6 h-6 text-primary-red" />
              <span className="font-medium">Global Network</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 text-gray-200 bg-white/5 px-6 py-3 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Brain className="w-6 h-6 text-primary-red" />
              <span className="font-medium">AI-Powered Platform</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 text-gray-200 bg-white/5 px-6 py-3 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Award className="w-6 h-6 text-primary-red" />
              <span className="font-medium">90-94% Commission</span>
            </motion.div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-primary-red text-white hover:bg-primary-red/90 px-6 py-2 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => setIsDialogOpen(true)}
            >
              Book a Discovery Call →
            </Button>
            <Button 
              className="bg-white/10 text-white hover:bg-white/20 px-6 py-2 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Why KW Singapore Section - Updated */}
      <section className="relative py-32 bg-black/90">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Your Ambition. Our Platform.<br />Unlocked.
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
              We recognize the questions that challenge traditional real estate careers. KW Singapore provides the bold, outcome-first solutions you need to scale sustainably.
            </p>
          </motion.div>

          {/* Trust & Brand Awareness */}
          <motion.div 
            className="grid md:grid-cols-2 gap-16 items-center mb-32"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="relative h-[400px] min-w-[350px] w-full rounded-2xl overflow-hidden bg-gray-800"
              variants={slideInLeft}
            >
              <Image
                src="/images/office-building.jpg"
                alt="Brand Trust & Awareness - Modern office building representing global presence"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Global Network</h3>
                <p className="text-white">200,000+ consultants across 60+ countries</p>
              </div>
            </motion.div>
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-primary-red/20 rounded-full mb-4">
                <span className="text-primary-red font-semibold">Brand Trust & Awareness</span>
              </div>
              <h3 className="text-3xl font-bold text-white">
                "Consumers haven't heard of KW Singapore before. How will you build brand awareness and establish trust?"
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                We're not just a new name; we're a new era. Our strategy is built on immediate clarity and high-impact narrative. We are Singapore's first real estate operating system for consultants, backed by a global network of over 200,000 consultants in 60+ countries.
              </p>
            </div>
          </motion.div>

          {/* Training & Development */}
          <motion.div 
            className="grid md:grid-cols-2 gap-16 items-center mb-32"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="space-y-8 order-2 md:order-1">
              <div className="inline-block px-4 py-2 bg-primary-red/20 rounded-full mb-4">
                <span className="text-primary-red font-semibold">Training & Development</span>
              </div>
              <h3 className="text-3xl font-bold text-white">
                "Who will conduct training, coach on apps, and provide subject expertise?"
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Your growth is our blueprint. We don't just offer training; we provide a structured pathway to entrepreneurial mastery.
              </p>
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-bold mb-3 text-white">KW University Singapore</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-red" />
                      <span>12-week Ignite onboarding program</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-red" />
                      <span>New Launch Mastery training</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-red" />
                      <span>Advanced Realtor Series</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-bold mb-3 text-white">Expert Leadership</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-red" />
                      <span>Melvin Lim - Founder & Operating Principal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-red" />
                      <span>Grayce Tan - Director of Growth</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-red" />
                      <span>Rayne Chua - New Launch Division Lead</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <motion.div 
              className="relative h-[400px] rounded-2xl overflow-hidden order-1 md:order-2"
              variants={slideInRight}
            >
              <Image
                src="/images/training-session.jpg"
                alt="Training & Development - Professional business training session"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">World-Class Training</h3>
                <p className="text-white">From sales beginners to C-suite-calibre entrepreneurs</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Technology Stack */}
          <motion.div 
            className="grid md:grid-cols-2 gap-16 items-center mb-32"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="relative h-[400px] rounded-2xl overflow-hidden"
              variants={slideInLeft}
            >
              <Image
                src="/images/tech-office.jpg"
                alt="Technology & Innovation - Modern office with advanced technology"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">AI-Powered Platform</h3>
                <p className="text-white">Unmatched efficiency and competitive edge</p>
              </div>
            </motion.div>
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-primary-red/20 rounded-full mb-4">
                <span className="text-primary-red font-semibold">Technology & Innovation</span>
              </div>
              <h3 className="text-3xl font-bold text-white">
                "Tell me more about KW Tech and what's available?"
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                We operate with full transparency, grounded in credibility and systems. Our AI-powered tech stack is designed for unparalleled efficiency and competitive edge.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-primary-red" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-white">KW Command CRM</h4>
                  <p className="text-gray-300 text-sm">
                    AI-powered CRM with predictive lead generation and automated workflows
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary-red" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-white">Research Suite</h4>
                  <p className="text-gray-300 text-sm">
                    Exclusive tools for market analysis and client insights
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Growth Share & Financials */}
          <motion.div 
            className="grid md:grid-cols-2 gap-16 items-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="space-y-8 order-2 md:order-1">
              <div className="inline-block px-4 py-2 bg-primary-red/20 rounded-full mb-4">
                <span className="text-primary-red font-semibold">Financial Growth</span>
              </div>
              <h3 className="text-3xl font-bold text-white">
                "What will I actually take home after all the splits?"
              </h3>
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-bold mb-3 text-white">Highest Commission Retention</h4>
                  <p className="text-gray-300">
                    You retain 90-94% of your commissions, one of the highest in the industry in Singapore.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-bold mb-3 text-white">7-Tier Global Growth Share</h4>
                  <p className="text-gray-300">
                    Earn 2% of the Gross Commission Income (GCI) from the company split in your 7-tier network. This model offers unlimited width and global eligibility, and is lifetime and transferable to your next-of-kin.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="text-xl font-bold mb-3 text-white">Financial Stability</h4>
                  <p className="text-gray-300">
                    Backed by a S$10 million seed valuation and diversified revenue streams across technology, media, and training.
                  </p>
                </div>
              </div>
            </div>
            <motion.div 
              className="relative h-[400px] rounded-2xl overflow-hidden order-1 md:order-2"
              variants={slideInRight}
            >
              <Image
                src="/images/business-district.jpg"
                alt="Growth Share Model - Modern business district representing financial growth"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Growth Share Model</h3>
                <p className="text-white">Build wealth beyond transactions</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-b from-black to-black/90">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              The Future of Real Estate is Here.<br />Will You Lead It?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Plug into the KW Singapore platform and take your career from closings to equity, visibility, and brand ownership. We invite you to lead in the next era of real estate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-primary-red text-white hover:bg-primary-red/90 px-6 py-2 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                onClick={() => setIsDialogOpen(true)}
              >
                Book a Discovery Call →
              </Button>
              <Button 
                className="bg-white/10 text-white hover:bg-white/20 px-6 py-2 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
              >
                Download Brochure
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