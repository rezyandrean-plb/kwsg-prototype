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

// Enhanced Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
}

// Enhanced typing variants with better timing
const typingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.08,
      ease: "easeOut"
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

// New professional entrance animations
const heroTitleVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
}

const heroLineVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const fadeInScale = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" }
}

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
}

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
}

const cardHoverVariants: Variants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

const buttonVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.3
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

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
  const { scrollYProgress, scrollY } = useScroll()
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data)
    // The form submission is now handled within the JoinFormDialog component
    // This callback can be used for additional actions if needed
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-center justify-center pt-20 sm:pt-20 md:pt-12">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          style={{
            transform: `translateY(${scrollY.get() * 0.5}px)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        {/* Removed background image - now using black background */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-8 sm:pt-12 md:pt-16 lg:pt-32">
          <div className="mb-8"></div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight font-sans"
            variants={heroTitleVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={heroLineVariants} className="block">Your Journey to</motion.span>
            <motion.span variants={heroLineVariants} className="block text-[#B40101] italic">Real Estate Success</motion.span>
            <motion.span variants={heroLineVariants} className="block">Begins Here</motion.span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            You're a high-performing strategist, confident in your vision, and ambitious in your goals. At KW Singapore,
            we've built the definitive platform to empower your dominance.
          </motion.p>

          <motion.div 
            className="flex justify-center items-center"
            variants={buttonVariants}
            initial="initial"
            animate="whileInView"
            whileHover="hover"
          >
            <Button
              size="lg"
              className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-8 py-4 text-lg font-semibold rounded-none border-none transition-all duration-300 group"
              onClick={() => window.open("https://explore.kwsingapore.com/booking-page", "_blank")}
            >
              Join Us Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

      </section>

      {/* Why KW Singapore */}
      <section id="why-kw-section" className="relative py-12 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/luxury-singapore-properties.png')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="font-bold mb-8 font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white"
              variants={typingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span variants={typingTextVariants} className="block">Your Ambition. Our Platform.</motion.span>
              <motion.span variants={typingTextVariants} className="block text-[#B40101] italic">Unlocked.</motion.span>
            </motion.h2>
            <motion.p 
              className="text-lg text-white/80 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              We recognize the questions that challenge traditional real estate careers. KW Singapore provides the bold,
              outcome-first solutions you need to scale sustainably.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: <Globe className="h-12 w-12" />,
                title: "Global Network Strength",
                description:
                  "189,000+ consultants across 55+ regions. International referrals and cross-border investment opportunities.",
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
              <motion.div 
                key={index} 
                className="group relative"
                variants={cardHoverVariants}
                whileHover="hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/10 to-transparent rounded-lg transform group-hover:scale-105 transition-all duration-500" />
                <div className="relative p-8 h-full">
                  <motion.div 
                    className="text-[#B40101] mb-6 group-hover:scale-110 transition-transform duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {item.icon}
                  </motion.div>
                  <motion.div 
                    className="text-4xl font-bold text-[#B40101] mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  >
                    {item.stat}
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p 
                    className="text-white/80 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  >
                    {item.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative py-12 sm:py-32">
        <div className="absolute inset-0 bg-[url('/images/modern-office-tech.png')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Video - Mobile First */}
            <motion.div 
              className="relative order-1 lg:order-2"
              variants={slideInRight}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
            >
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
            </motion.div>

            {/* Content - Mobile Second */}
            <motion.div 
              className="text-center lg:text-left order-2 lg:order-1"
              variants={slideInLeft}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-sans text-white"
                variants={typingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.span variants={typingTextVariants} className="block">Unmatched Technology.</motion.span>
                <motion.span variants={typingTextVariants} className="block text-[#B40101] italic">Actionable Insights.</motion.span>
              </motion.h2>
              <motion.p 
                className="text-lg text-white/80 mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our AI-powered tech ecosystem delivers unparalleled efficiency and a critical competitive edge. We equip
                you with the precision and insight to lead the market.
              </motion.p>

              <motion.h3 
                className="text-2xl font-bold mb-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Key Technology Pillars:
              </motion.h3>

              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
              >
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
                  <motion.div 
                    key={index} 
                    className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 group text-center sm:text-left"
                    variants={fadeInUp}
                  >
                    <motion.div 
                      className="text-[#B40101] sm:mt-1 group-hover:scale-110 transition-transform"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {tech.icon}
                    </motion.div>
                    <div>
                      <motion.h4 
                        className="text-lg font-semibold mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                      >
                        {tech.title}
                      </motion.h4>
                      <motion.p 
                        className="text-white/80"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        {tech.desc}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Media & Branding */}
      <section className="relative py-12 sm:py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-10 sm:mb-20"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-sans text-white"
              variants={typingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span variants={typingTextVariants} className="block">Your Media.</motion.span>
              <motion.span variants={typingTextVariants} className="block text-[#B40101] italic">Your Advantage.</motion.span>
            </motion.h2>
            <motion.p 
              className="text-lg text-white/80 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Your brand deserves better than DIY. Our media engine is a complete virality infrastructure, designed to
              turn you into a content powerhouse.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
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
              <motion.div 
                key={index} 
                className="text-center group"
                variants={cardHoverVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-[#B40101]/10 rounded-full mb-6 group-hover:bg-[#B40101]/20 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-[#B40101]">{service.icon}</div>
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold mb-3 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  className="text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  {service.desc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="relative py-12 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="relative order-2 lg:order-1"
              variants={slideInLeft}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                className="bg-gradient-to-br from-[#B40101]/10 to-transparent p-12 rounded-lg border border-[#B40101]/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#B40101] mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    90-94%
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-semibold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Commission Retention
                  </motion.h3>
                  <motion.p 
                    className="text-[#999999] mb-8 text-sm sm:text-base leading-tight sm:leading-normal max-w-xs sm:max-w-none mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    One of the highest in Singapore's real estate industry
                  </motion.p>

                  <motion.div 
                    className="space-y-4"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {[
                      { label: "Your Commission", value: "90-94%" },
                      { label: "Growth Share Bonus", value: "2% GCI" },
                      { label: "7-Tier Network", value: "Lifetime" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-[#666666]/30"
                        variants={fadeInUp}
                      >
                        <span className="text-white/80">{item.label}</span>
                        <span className="text-[#B40101] font-semibold">{item.value}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="text-center lg:text-left order-1 lg:order-2"
              variants={slideInRight}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-sans text-white"
                variants={typingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.span variants={typingTextVariants} className="block">Unlocking Your True</motion.span>
                <motion.span variants={typingTextVariants} className="block text-[#B40101] italic">Earning Potential</motion.span>
              </motion.h2>
              <motion.p 
                className="text-lg text-white/80 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Clarity and maximum take-home are foundational to our model. We believe in building wealth beyond just
                transactions.
              </motion.p>

              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
              >
                {[
                  {
                    title: "Highest Commission Retention",
                    desc: "You retain 90-94% of your commissions, one of the highest in Singapore."
                  },
                  {
                    title: "7-Tier Global Growth Share",
                    desc: "Build lasting wealth with passive income. Earn 2% of the company's GCI from your growing global network, designed for lifetime and inheritable benefits."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-4"
                    variants={fadeInUp}
                  >
                    <motion.div 
                      className="w-2 h-2 bg-[#B40101] rounded-full mt-3"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    />
                    <div>
                      <motion.h4 
                        className="text-lg font-semibold mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                      >
                        {item.title}
                      </motion.h4>
                      <motion.p 
                        className="text-white/80"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                      >
                        {item.desc}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Financial Backing */}
      <section className="relative py-12 sm:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-sans text-white"
            variants={typingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={typingTextVariants} className="block">A Financially Viable</motion.span>
            <motion.span variants={typingTextVariants} className="block text-[#B40101] italic">Future</motion.span>
          </motion.h2>
          <motion.p 
            className="text-lg text-white/80 mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            KW Singapore is built for longevity and fueled by a clear vision for the future. We are backed by a global
            powerhouse and strategic revenue streams.
          </motion.p>

          <motion.div 
            className="grid md:grid-cols-3 gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { stat: "$10M", title: "Seed Valuation", desc: "Angel-funded seed round demonstrating investor confidence" },
              { stat: "55+", title: "Regions", desc: "Global network presence with proven track record" },
              { stat: "189K+", title: "Salespersons", desc: "Salespersons in our global network" }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={cardHoverVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#B40101] mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {item.stat}
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold mb-3 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p 
                  className="text-white/80"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                >
                  {item.desc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-12 sm:py-32">
        <div className="absolute inset-0 bg-[url('/images/singapore-skyline-night.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/20 via-black/80 to-black" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-sans text-white"
            variants={heroTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={heroLineVariants} className="block">The Future of Real Estate is Here.</motion.span>
            <motion.span variants={heroLineVariants} className="block text-[#B40101] italic">Will You Lead It?</motion.span>
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Plug into the KW Singapore platform and take your career from closings to equity, visibility, and brand
            ownership. We invite you to lead in the next era of real estate.
          </motion.p>

          <motion.div 
            className="space-y-6"
            variants={buttonVariants}
            initial="initial"
            whileInView="whileInView"
            whileHover="hover"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button
              size="lg"
              className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 group rounded-sm"
              onClick={() => window.open("https://explore.kwsingapore.com/booking-page", "_blank")}
            >
              Book Your Discovery Call
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <motion.p 
              className="text-lg text-white/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Your next deal is just the start. Join the platform built for consultants, backed by systems.
              <span className="block mt-2 text-[#B40101] font-medium">
                Where Media, Tech, and Talent Collide. One Platform. Unlimited Potential.
              </span>
            </motion.p>
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