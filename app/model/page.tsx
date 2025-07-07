"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamically import the JoinFormDialog component
const JoinFormDialog = dynamic(() => import("@/components/join-form-dialog").then(mod => mod.JoinFormDialog), {
  loading: () => <div className="h-0" />,
  ssr: false
})

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8
    }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8
    }
  }
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8
    }
  }
}

export default function ModelPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (data: any) => {
    console.log("Form submitted:", data)
    // The form submission is handled within the JoinFormDialog component
  }

  return (
    <motion.main 
      className="min-h-screen bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-[100vh] sm:min-h-screen flex items-center justify-center pt-20 sm:pt-20">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

        <motion.div 
          className="relative z-10 text-center max-w-6xl mx-auto px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            variants={itemVariants}
          >
            Unlock Your Full Earning Potential:
            <span className="block text-red-700">The KW Singapore 3-Income Model</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            At KW Singapore, we've redefined real estate earnings. Beyond traditional commissions, our innovative
            3-income model is engineered to provide multiple, scalable revenue streams, empowering you to build lasting
            wealth and true financial freedom. Discover how our system goes beyond closings to secure your long-term
            legacy.
          </motion.p>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
          onClick={() => {
            const model1Section = document.querySelector('[data-section="model1"]')
            if (model1Section) {
              model1Section.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <ChevronRight className="h-6 w-6 text-[#B40101] rotate-90" />
        </motion.div>
      </section>

      

      {/* Model 1: MREA Rainmaker */}
      <motion.section 
        className="relative py-12 sm:py-32 overflow-hidden"
        data-section="model1"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-[url('/images/model/mrea-rainmaker.webp')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="relative"
              variants={slideInLeft}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-[#B40101]/20 to-transparent rounded-lg overflow-hidden">
                <img
                  src="/images/model/active-income.webp"
                  alt="MREA Rainmaker - Team Leadership"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-transparent" />
              </div>
            </motion.div>

            <motion.div variants={slideInRight}>
              <motion.h2 
                className="font-bold mb-6 leading-tight text-2xl sm:text-3xl md:text-4xl"
                variants={itemVariants}
              >
                Active Income:
                <span className="block text-[#B40101] italic">Your Rainmaker Business</span>
              </motion.h2>

              <motion.p 
                className="mb-8 leading-relaxed text-lg"
                variants={itemVariants}
              >
                Build your empire through personal sales and team production. Leverage the MREA models to maximize your
                active income, generating consistent, high-volume closings and unparalleled market impact. This is where
                your direct efforts yield explosive returns.
              </motion.p>

              <motion.div 
                className="space-y-4 mb-10"
                variants={containerVariants}
              >
                <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                  <div className="w-2 h-2 bg-[#B40101] rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Lead your own sales team</h4>
                    <p className="text-white/70">Build and manage a high-performing real estate team</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                  <div className="w-2 h-2 bg-[#B40101] rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Control your income growth</h4>
                    <p className="text-white/70">Direct correlation between effort and earnings</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                  <div className="w-2 h-2 bg-[#B40101] rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Master the MREA models</h4>
                    <p className="text-white/70">Learn proven systems for sustainable success</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  size="lg"
                  className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 group rounded-md"
                  onClick={() => window.open("https://explore.kwsingapore.com/mrea-masterclass-registration-1", "_blank")}
                >
                  Explore Rainmaker Strategies
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Model 2: Manager Overriding */}
      <motion.section 
        className="relative py-12 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-black"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-[url('/images/model/manager-overriding.webp')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div 
              className="order-2 lg:order-1"
              variants={slideInLeft}
            >
              <motion.h2 
                className="font-bold mb-6 leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                variants={itemVariants}
              >
                Manager Overriding:
                <span className="block text-[#B40101] italic">Coaching Income</span>
              </motion.h2>

              <motion.p 
                className="mb-6 lg:mb-8 leading-relaxed text-base lg:text-lg"
                variants={itemVariants}
              >
                As a KW leader, unlock additional revenue by coaching and mentoring your growing team. Your success in
                guiding others to achieve their goals translates directly into a powerful override income, amplifying
                your earnings beyond your personal transactions.
              </motion.p>

              <motion.div 
                className="space-y-3 lg:space-y-4 mb-8 lg:mb-10"
                variants={containerVariants}
              >
                <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                  <div className="w-2 h-2 bg-[#B40101] rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-base lg:text-lg font-semibold mb-1">Monetize your leadership</h4>
                    <p className="text-white/70 text-sm lg:text-base">Turn your expertise into sustainable income</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                  <div className="w-2 h-2 bg-[#B40101] rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-base lg:text-lg font-semibold mb-1">Scalable earnings through guidance</h4>
                    <p className="text-white/70 text-sm lg:text-base">Income grows as your mentees succeed</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                  <div className="w-2 h-2 bg-[#B40101] rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-base lg:text-lg font-semibold mb-1">Support others while growing your business</h4>
                    <p className="text-white/70 text-sm lg:text-base">Create win-win relationships that compound</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative order-1 lg:order-2"
              variants={slideInRight}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-[#B40101]/20 to-transparent rounded-lg overflow-hidden">
                <img
                  src="/images/model/manager-coaching.webp"
                  alt="Manager Overriding - Coaching Excellence"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Model 3: 7-Tier Growth Share */}
      <motion.section 
        className="relative py-12 sm:py-32 overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-[url('/images/model/growth-share.webp')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="relative"
              variants={slideInLeft}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-[#B40101]/20 to-transparent rounded-lg overflow-hidden">
                <img
                  src="/images/model/7-growth-share.webp"
                  alt="7-Tier Growth Share - Legacy Building"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-transparent" />
              </div>
            </motion.div>

            <motion.div variants={slideInRight}>
              <motion.h2 
                className="font-bold mb-6 leading-tight text-2xl sm:text-3xl md:text-4xl"
                variants={itemVariants}
              >
                7-Tier Growth Share
                <span className="block text-[#B40101] italic">Legacy & True Passive Income</span>
              </motion.h2>

              <motion.p 
                className="mb-8 leading-relaxed text-lg"
                variants={itemVariants}
              >
                Build enduring wealth with KW's revolutionary 7-tier Growth Share model. This system allows you to earn
                a percentage of the company's commission cut from every consultant in your global network. As long as
                your tree of real estate consultants are closing deals, your financial legacy extends, providing
                repeatable and transferable passive income far beyond your active career.
              </motion.p>

              <motion.div 
                className="space-y-4 mb-10"
                variants={containerVariants}
              >
                <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                  <div className="w-2 h-2 bg-[#B40101] rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Lifetime legacy income</h4>
                    <p className="text-white/70">Build wealth that continues for generations</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                  <div className="w-2 h-2 bg-[#B40101] rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">True passive wealth generation</h4>
                    <p className="text-white/70">Income that grows while you sleep</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start space-x-4" variants={itemVariants}>
                  <div className="w-2 h-2 bg-[#B40101] rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Built on agent attraction and team building</h4>
                    <p className="text-white/70">Sustainable model based on growth and success</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        className="relative py-12 sm:py-32"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute inset-0 bg-[url('/images/model/kw-model-cta.webp')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/20 via-black/80 to-black" />

        <motion.div 
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            variants={itemVariants}
          >
            Ready to Build Income
            <span className="block text-[#B40101] italic">That Grows With You?</span>
          </motion.h2>

          <motion.p 
            className="text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Join the KW Singapore platform and unlock multiple income streams that scale with your ambition.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-[#B40101] hover:bg-[#B40101]/90 text-white px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 group rounded-md"
                onClick={() => setIsDialogOpen(true)}
              >
                Speak to Our Team
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-[#B40101] text-[#B40101] hover:bg-[#B40101] hover:text-white px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 group bg-transparent border-white text-white"
                onClick={() => (window.location.href = "https://explore.kwsingapore.com/kw-explore-night-webinar-1")}
              >
                Explore KW Singapore
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Join Form Dialog */}
      <JoinFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </motion.main>
  )
} 