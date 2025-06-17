"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Brain, Share2, Video, BarChart3, Users, Building2, Award, BookOpen, GraduationCap, Target, Clock, TrendingUp, CheckCircle } from "lucide-react"
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

export default function TrainingPage() {
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
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000"
            alt="KW Training System"
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
            <span className="text-white font-semibold">Learn Fast. Earn Fast.</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            Training System
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-white">
            Accelerate Your Success with Expert-Led Programs
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-100">
            Our comprehensive training system combines proven methodologies with cutting-edge strategies. From weekly coaching to expert-led playbooks, we provide everything you need to build a successful real estate business.
          </p>
          <Button 
            className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[56px] min-w-[240px]"
            onClick={() => setIsJoinFormOpen(true)}
          >
            Start Your Training →
          </Button>
        </motion.div>
      </section>

      {/* Training Programs Section */}
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
              Training Programs
            </h2>
            <h3 className="text-xl md:text-2xl text-primary-red mb-6">
              Structured Learning for Real Results
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
                <GraduationCap className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">Weekly Coaching</h4>
              <p className="text-gray-200">
                Regular one-on-one sessions with experienced mentors who guide you through challenges and celebrate your wins.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <BookOpen className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">Expert Playbooks</h4>
              <p className="text-gray-200">
                Step-by-step guides and proven strategies from top performers in the real estate industry.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-black/60 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="mb-6">
                <Target className="w-10 h-10 text-primary-red" />
              </div>
              <h4 className="text-2xl md:text-3xl mb-4 text-white">Launch Plans</h4>
              <p className="text-gray-200">
                Comprehensive 90-day action plans designed to get you up and running with proven success strategies.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000"
            alt="Learning Path"
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
                Your Learning Journey
              </h2>
              <p className="text-lg text-gray-200">
                Our structured approach ensures you build a solid foundation and progress systematically toward your goals.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-red rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Foundation Building</h4>
                    <p className="text-gray-300 text-sm">Master the fundamentals of real estate sales and KW systems.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-red rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Skill Development</h4>
                    <p className="text-gray-300 text-sm">Learn advanced techniques for lead generation and client management.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-red rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Business Scaling</h4>
                    <p className="text-gray-300 text-sm">Strategies to grow your business and build a sustainable income.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Training Highlights</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-200">Weekly group coaching sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-200">Access to exclusive training materials</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-200">One-on-one mentorship opportunities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-200">Performance tracking and analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-200">Continuous learning and updates</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Metrics Section */}
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
              Training Success Metrics
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our training system has helped thousands of consultants achieve remarkable results
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-4 gap-8"
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
              <h3 className="text-3xl font-bold text-white mb-2">90%</h3>
              <p className="text-gray-300">Success Rate</p>
            </motion.div>

            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-primary-red" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">3x</h3>
              <p className="text-gray-300">Faster Learning</p>
            </motion.div>

            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-primary-red" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
              <p className="text-gray-300">Graduates</p>
            </motion.div>

            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <div className="bg-primary-red/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-primary-red" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">95%</h3>
              <p className="text-gray-300">Satisfaction</p>
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
              Ready to Accelerate Your Success?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our training system and start building the real estate business of your dreams with expert guidance and proven strategies.
            </p>
            <Button 
              className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[56px] min-w-[240px]"
              onClick={() => setIsJoinFormOpen(true)}
            >
              Start Your Training Journey →
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