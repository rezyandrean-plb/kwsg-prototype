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
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000"
            alt="Join KW Singapore"
            fill
            className="object-cover brightness-50"
            priority
            unoptimized
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
            <span className="text-white font-semibold text-lg">Why KW Singapore: Your Future in Real Estate, Reimagined</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight leading-tight">
            Your Future in Real Estate,<br />Reimagined
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-12 text-gray-100 leading-relaxed">
            You're a high-performing strategist, confident in your vision, and ambitious in your goals. You operate beyond the status quo, and so do we. At KW Singapore, we understand the critical shifts happening in real estate, and we've built the definitive platform to empower your dominance. This isn't just a brokerage. It's a business system designed for your unstoppable growth and enduring legacy.
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
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Why KW Singapore Section */}
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
                src="/images/join-kw/join-kw-header.webp"
                alt="Brand Trust & Awareness - Modern office building representing global presence"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
                unoptimized
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
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We're not just a new name; we're a new era. Our strategy is built on immediate clarity and high-impact narrative. We are Singapore's first real estate operating system for consultants, backed by a global network of over 200,000 consultants in 60+ countries.
              </p>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">Our Strategic Build for Consumer Trust & Dominance:</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>National Awareness Campaigns:</strong> We deploy omnichannel national awareness campaigns using social, influencer, and user-generated content strategies. Our website immediately communicates modernity, performance, and clear differentiation from legacy competitors.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>New Launch Dominance:</strong> We are uniquely positioned as the undisputed "New Launch Experts" in Singapore. Our platform secures prime developer partnerships and aims to capture 30-40% of Singapore's new launch volume by 2030. This includes direct 0.5-1% developer commissions that are not split with consultants.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>Consultant-First Visibility:</strong> Our integrated media studio and content creation team provide full in-house capabilities. We feature 100+ branded TikTok/IG accounts managed by HQ to amplify your brand and drive organic lead generation, ensuring our consultants attract leads, not chase them.</span>
                  </li>
                </ul>
              </div>
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
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Your growth is our blueprint. We don't just offer training; we provide a structured pathway to entrepreneurial mastery.
              </p>
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">World-Class Coaching. Local Market Execution:</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>KW University Singapore:</strong> Access a comprehensive modular training system that fast-tracks consultants from sales beginners to C-suite-calibre entrepreneurs. This includes foundational programs like Ignite (12-week onboarding) and specialized training in New Launch Mastery and Advanced Realtor Series.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>Dedicated Lead Trainers:</strong> Learn directly from industry leaders such as Melvin Lim (Founder & Operating Principal), Grayce Tan (Director of Growth), and Rayne Chua (New Launch Division Lead).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>KW Tech Onboarding Coach:</strong> Our tech trainers and systems administrators provide comprehensive onboarding and ongoing support for KW Command and other tech tools.</span>
                  </li>
                </ul>
              </div>
            </div>
            <motion.div 
              className="relative h-[400px] rounded-2xl overflow-hidden order-1 md:order-2"
              variants={slideInRight}
            >
              <Image
                src="/images/join-kw/join-kw-header.webp"
                alt="Training & Development - Professional business training session"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
                unoptimized
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
                src="/images/join-kw/join-kw-header.webp"
                alt="Technology & Innovation - Modern office with advanced technology"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
                unoptimized
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
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We operate with full transparency, grounded in credibility and systems. Our AI-powered tech stack is designed for unparalleled efficiency and competitive edge.
              </p>
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">Unmatched Technology. Actionable Insights:</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>KW Command CRM:</strong> Our proprietary, full-suite AI-powered CRM is the central hub for your business. It offers predictive lead generation, data visualization, and automated client workflows.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>KW Research Suite:</strong> Exclusive to KW Singapore, this suite includes powerful tools like Disparity Tool, Journey Maker, Home Reports, Market Insight Dashboards, and the Nucleus App.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>AI Integration:</strong> Our AI accelerates content ideation, enhances performance analytics, streamlines workflows, and expedites visualizations like virtual staging and 3D models. We even offer AI Avatar automated content generation for consistent social media presence.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>Comprehensive Calculator Suite:</strong> Access 15 specialized calculators for mortgages, investments, ROI analysis, TDSR, MSR, ABSD, BSD, SSD, and more. These tools provide instant, accurate financial figures for client consultations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>Singpass Integration:</strong> Seamless verification, faster data collection, and reduced paperwork through government-backed authentication.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Command Video Section */}
          <motion.div 
            className="mb-32"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">Show Command video:</h3>
              <p className="text-xl text-gray-300">Save Time, Save Money and Get More Leads With Command</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/j6A-g-2dY1U?si=VycAELfncKlRmwmE" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Media Services */}
          <motion.div 
            className="grid md:grid-cols-2 gap-16 items-center mb-32"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="space-y-8 order-2 md:order-1">
              <div className="inline-block px-4 py-2 bg-primary-red/20 rounded-full mb-4">
                <span className="text-primary-red font-semibold">Media Services</span>
              </div>
              <h3 className="text-3xl font-bold text-white">
                "Will in-house media offer more competitive prices, and how will it help agents establish brand positioning?"
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Your brand deserves better than DIY. Our media engine is a complete virality infrastructure, designed to turn you into a content powerhouse.
              </p>
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">Your Media. Your Advantage:</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>Cost Efficiency & Streamlined Workflow:</strong> Our in-house media division, Chief Media, offers highly competitive pricing due to economies of scale and faster turnaround times compared to external vendors.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>Full-Funnel Content Creation:</strong> We transform every consultant into a content creator with professional media production capabilities and generative-AI tooling. This includes branded video, copy, and visuals for all major platforms.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>Comprehensive Services:</strong> Access professional copywriting, videos & animations, drone services, and our Realtors Marketing Studio for podcasts and home staging. We provide and subsidize video content engine for listings and branding.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>Brand Ownership & Control:</strong> We empower you with white-label brand control and personal branding content, helping you build long-term brand equity. You get to select your specialty area (New Launch, Condo, Landed, HDB, Commercial) for automated, niche content.</span>
                  </li>
                </ul>
              </div>
            </div>
            <motion.div 
              className="relative h-[400px] rounded-2xl overflow-hidden order-1 md:order-2"
              variants={slideInRight}
            >
              <Image
                src="/images/join-kw/join-kw-header.webp"
                alt="Media Services - Professional media production studio"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Chief Media</h3>
                <p className="text-white">Complete virality infrastructure</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Growth Share & Financials */}
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
                src="/images/join-kw/join-kw-header.webp"
                alt="Growth Share Model - Modern business district representing financial growth"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Growth Share Model</h3>
                <p className="text-white">Build wealth beyond transactions</p>
              </div>
            </motion.div>
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-primary-red/20 rounded-full mb-4">
                <span className="text-primary-red font-semibold">Financial Growth</span>
              </div>
              <h3 className="text-3xl font-bold text-white">
                "What will I actually take home after all the splits? How does the Growth Share system work?"
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Clarity and maximum take-home are foundational to our model. We believe in building wealth beyond just transactions.
              </p>
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">Unlocking Your True Earning Potential:</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>Highest Commission Retention:</strong> You retain 90-94% of your commissions, one of the highest in the industry in Singapore.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>7-Tier Global Growth Share:</strong> Our passive income system allows you to earn 2% of the Gross Commission Income (GCI) from the company split in your 7-tier network. This model offers unlimited width and global eligibility, and is lifetime and transferable to your next-of-kin.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Financial Status */}
          <motion.div 
            className="grid md:grid-cols-2 gap-16 items-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="space-y-8 order-2 md:order-1">
              <div className="inline-block px-4 py-2 bg-primary-red/20 rounded-full mb-4">
                <span className="text-primary-red font-semibold">Financial Status</span>
              </div>
              <h3 className="text-3xl font-bold text-white">
                "What is the financial status of KW SG and its sustainability for growth?"
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                KW Singapore is built for longevity and fueled by a clear vision for the future. We are backed by a global powerhouse and strategic revenue streams.
              </p>
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">A Financially Viable Future:</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>$10 Million Seed Valuation:</strong> Keller Williams Singapore secured an angel-funded seed round, placing the company at a S$10 million valuation, underscoring investor confidence in our AI-driven, media-first, entrepreneur-first platform.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>Multi-Vertical Revenue Streams:</strong> Our revenue is diversified across technology, media, and training, ensuring robust financial viability and sustainable growth.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                    <span><strong>Global Network Strength:</strong> We are an affiliate of Keller Williams Worldwide, the largest real estate company in the United States, with a proven track record across more than 50 countries and over 145,000 salespersons. This global advantage provides international referrals, cross-border investment clients, and global recognition.</span>
                  </li>
                </ul>
              </div>
            </div>
            <motion.div 
              className="relative h-[400px] rounded-2xl overflow-hidden order-1 md:order-2"
              variants={slideInRight}
            >
              <Image
                src="/images/join-kw/join-kw-header.webp"
                alt="Global Network - International business connections"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Global Network</h3>
                <p className="text-white">145,000+ salespersons worldwide</p>
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
            <p className="text-xl text-gray-300 mb-8">
              Plug into the KW Singapore platform and take your career from closings to equity, visibility, and brand ownership. We invite you to lead in the next era of real estate.
            </p>
            <p className="text-lg text-gray-400 mb-12">
              Join the Platform. Built for Consultants. Backed by Systems. Where Media, Tech, and Talent Collide. One Platform. Unlimited Potential.
            </p>
            <p className="text-xl text-primary-red font-semibold mb-12">
              Your Next Deal is Just the Start.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-primary-red text-white hover:bg-primary-red/90 px-6 py-2 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                onClick={() => setIsDialogOpen(true)}
              >
                Book a Discovery Call →
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