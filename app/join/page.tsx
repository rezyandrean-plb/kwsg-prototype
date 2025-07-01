"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import Image from "next/image"
import { useState, useRef } from "react"
import dynamic from "next/dynamic"
import { ArrowRight, Brain, Share2, Video, BarChart3, Users, Building2, Award, Globe, TrendingUp, Calculator, Zap, Camera, Star, ChevronRight } from "lucide-react"

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
  const { scrollYProgress, scrollY } = useScroll()
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          style={{
            transform: `translateY(${scrollY.get() * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-[url('/images/join-kw/join-kw-header.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-8"></div>

          <h1 className="text-6xl font-bold mb-8 leading-tight font-sans md:text-7xl">
            Your Journey to
            <span className="block text-[#B40101] italic">Real Estate Success</span>
            <span className="block">Begins Here</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            You're a high-performing strategist, confident in your vision, and ambitious in your goals. At KW Singapore,
            we've built the definitive platform to empower your dominance.
          </p>

          <div className="flex justify-center items-center">
            <Button
              size="lg"
              className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-8 py-4 text-lg font-semibold rounded-none border-none transition-all duration-300 hover:scale-105 group"
              onClick={() => setIsDialogOpen(true)}
            >
              Join Us Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-[#B40101] rotate-90" />
        </div>
      </section>

      {/* Why KW Singapore */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/luxury-singapore-properties.png')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
                          <h2 className="font-bold mb-8 font-sans text-5xl text-white">
                Your Ambition. Our Platform.
                <span className="block text-[#B40101] italic">Unlocked.</span>
              </h2>
            <p className="text-lg text-white/80 max-w-4xl mx-auto">
              We recognize the questions that challenge traditional real estate careers. KW Singapore provides the bold,
              outcome-first solutions you need to scale sustainably.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Globe className="h-12 w-12" />,
                title: "Global Network Strength",
                description:
                  "145,000+ consultants across 50+ countries. International referrals and cross-border investment opportunities.",
                stat: "145K+",
              },
              {
                icon: <TrendingUp className="h-12 w-12" />,
                title: "New Launch Dominance",
                description:
                  "Positioned to capture 30-40% of Singapore's new launch volume by 2030 with direct developer partnerships.",
                stat: "30-40%",
              },
              {
                icon: <Users className="h-12 w-12" />,
                title: "Consultant-First Visibility",
                description:
                  "100+ branded social accounts managed by HQ. We ensure our consultants attract leads, not chase them.",
                stat: "100+",
              },
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/10 to-transparent rounded-lg transform group-hover:scale-105 transition-all duration-500" />
                <div className="relative p-8 h-full">
                  <div className="text-[#B40101] mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-bold text-[#B40101] mb-4">{item.stat}</div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                  <p className="text-white/80 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[url('/images/modern-office-tech.png')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8 font-sans text-white">
                Unmatched Technology.
                <span className="block text-[#B40101] italic">Actionable Insights.</span>
              </h2>
              <p className="text-lg text-white/80 mb-12 leading-relaxed">
                Our AI-powered tech ecosystem delivers unparalleled efficiency and a critical competitive edge. We equip
                you with the precision and insight to lead the market.
              </p>

              <h3 className="text-2xl font-bold mb-8 text-white">Key Technology Pillars:</h3>

              <div className="space-y-6">
                {[
                  {
                    icon: <Brain className="h-6 w-6" />,
                    title: "KW Command Platform",
                    desc: "Your integrated operating system for real estate. Control leads, manage transactions, and scale your business with smart tools built for growth.",
                  },
                  {
                    icon: <Calculator className="h-6 w-6" />,
                    title: "PropTech Calculator Suite",
                    desc: "Specialized calculators for instant financial analysis and client insights.",
                  },
                  {
                    icon: <TrendingUp className="h-6 w-6" />,
                    title: "PropTech Research & Charts",
                    desc: "Powerful, integrated platform for dynamic market charts, Disparity Effect, and MOAT analysis.",
                  },
                  {
                    icon: <Zap className="h-6 w-6" />,
                    title: "AI Integration",
                    desc: "Beyond CRM, leverage AI for content ideation, performance analytics, and virtual staging.",
                  },
                ].map((tech, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="text-[#B40101] mt-1 group-hover:scale-110 transition-transform">{tech.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{tech.title}</h4>
                      <p className="text-white/80">{tech.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border-[#666666]/30 leading-3 border-0 border-none opacity-100 py-0 px-0">
                <div className="aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/_H9v-sPdH3o"
                    title="KW Command in Action"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media & Branding */}
      <section className="relative py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-8 font-sans text-white">
              Your Media.
              <span className="block text-[#B40101] italic">Your Advantage.</span>
            </h2>
            <p className="text-lg text-white/80 max-w-4xl mx-auto">
              Your brand deserves better than DIY. Our media engine is a complete virality infrastructure, designed to
              turn you into a content powerhouse.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Camera className="h-8 w-8" />,
                title: "Professional Media",
                desc: "Video, drone, photography services",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Brand Control",
                desc: "White-label personal branding content",
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Content Creation",
                desc: "AI-powered copy and visual generation",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Marketing Studio",
                desc: "Podcasts, staging, and branded content",
              },
            ].map((service, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#B40101]/10 rounded-full mb-6 group-hover:bg-[#B40101]/20 transition-colors">
                  <div className="text-[#B40101]">{service.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-white/80">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-[#B40101]/10 to-transparent p-12 rounded-lg border border-[#B40101]/20">
                <div className="text-center">
                  <div className="text-6xl font-bold text-[#B40101] mb-4">90-94%</div>
                  <h3 className="text-2xl font-semibold mb-4">Commission Retention</h3>
                  <p className="text-[#999999] mb-8">One of the highest in Singapore's real estate industry</p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-[#666666]/30">
                      <span className="text-white/80">Your Commission</span>
                      <span className="text-[#B40101] font-semibold">90-94%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#666666]/30">
                      <span className="text-white/80">Growth Share Bonus</span>
                      <span className="text-[#B40101] font-semibold">2% GCI</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/80">7-Tier Network</span>
                      <span className="text-[#B40101] font-semibold">Lifetime</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-5xl font-bold mb-8 font-sans text-white">
                Unlocking Your True
                <span className="block text-[#B40101] italic">Earning Potential</span>
              </h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Clarity and maximum take-home are foundational to our model. We believe in building wealth beyond just
                transactions.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-[#B40101] rounded-full mt-3" />
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Highest Commission Retention</h4>
                    <p className="text-white/80">
                      You retain 90-94% of your commissions, one of the highest in Singapore.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-[#B40101] rounded-full mt-3" />
                  <div>
                    <h4 className="text-lg font-semibold mb-2">7-Tier Global Growth Share</h4>
                    <p className="text-white/80">
                      Build lasting wealth with passive income. Earn 2% of the company's GCI from your growing global
                      network, designed for lifetime and inheritable benefits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Backing */}
      <section className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8 font-sans text-white">
            A Financially Viable
            <span className="block text-[#B40101] italic">Future</span>
          </h2>
          <p className="text-lg text-white/80 mb-16 max-w-4xl mx-auto">
            KW Singapore is built for longevity and fueled by a clear vision for the future. We are backed by a global
            powerhouse and strategic revenue streams.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#B40101] mb-4">$10M</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Seed Valuation</h3>
              <p className="text-white/80">Angel-funded seed round demonstrating investor confidence</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#B40101] mb-4">50+</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Countries</h3>
              <p className="text-white/80">Global network presence with proven track record</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#B40101] mb-4">145K+</div>
              <h3 className="text-xl font-semibold mb-3 text-white">Salespersons</h3>
              <p className="text-white/80">Salespersons in our global network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[url('/images/singapore-skyline-night.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/20 via-black/80 to-black" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-6xl md:text-7xl font-bold mb-8 font-sans text-white">
            The Future of Real Estate is Here.
            <span className="block text-[#B40101] italic">Will You Lead It?</span>
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Plug into the KW Singapore platform and take your career from closings to equity, visibility, and brand
            ownership. We invite you to lead in the next era of real estate.
          </p>

          <div className="space-y-6">
            <Button
              size="lg"
              className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 group rounded-sm"
              onClick={() => setIsDialogOpen(true)}
            >
              Book Your Discovery Call
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Your next deal is just the start. Join the platform built for consultants, backed by systems.
              <span className="block mt-2 text-[#B40101] font-medium">
                Where Media, Tech, and Talent Collide. One Platform. Unlimited Potential.
              </span>
            </p>
          </div>
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