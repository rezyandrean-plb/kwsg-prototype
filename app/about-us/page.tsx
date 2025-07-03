"use client"

import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Building2, Users, Award, Brain, Share2, Video, BarChart3, Target, Heart, Lightbulb, Users2, Briefcase, ChevronRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState } from "react"
import { JoinFormDialog } from "@/components/join-form-dialog"

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

export default function AboutUsPage() {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(0)
  const { scrollYProgress, scrollY } = useScroll()
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scrollYValue = useTransform(scrollY, (value) => value * 0.5)

  const handleJoinFormSubmit = (data: any) => {
    console.log('Form submitted:', data)
    setIsJoinFormOpen(false)
  }

  const mvvbpItems = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Mission",
      description: "Build careers worth having, businesses worth owning, lives worth living, experiences worth giving, and legacies worth leaving."
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Vision",
      description: "To be the real estate company of choice for consultants and their clients in Singapore."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Values",
      description: "God, family, then business."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Beliefs",
      description: "WI4C2TES – Win-Win, Integrity, Clients First, Commitment, Communication, Creativity, Teamwork, Trust, Equity, Success."
    },
    {
      icon: <Users2 className="h-6 w-6" />,
      title: "Perspective",
      description: "We are a tech company that provides a real estate platform preferred by clients — thinking like top producers, consulting like coaches, and focusing on productivity, service, and profitability."
    }
  ]

  const teamMembers = [
    {
      name: "Melvin Lim",
      title: "Founder & Operating Principal",
      bio: "Melvin Lim is the Founder and Operating Principal of Keller Williams Singapore, where he stands at the forefront of a transformative movement in Singapore's real estate landscape. As the driving force behind this venture, Melvin brings a unique combination of visionary leadership, deep industry insight, and an extensive professional network, positioning Keller Williams Singapore as a new benchmark for excellence, collaboration, and innovation in real estate.\n\nWidely regarded as one of Singapore's most influential real estate leaders, Melvin is also the Co-Founder of PLB Realty and PLB Media—trailblazing companies that revolutionised the way properties are marketed and experienced. With a background in banking and finance, Melvin blends strategic financial acumen with a deep understanding of digital storytelling, data-driven marketing, and consumer psychology. Under his leadership, PropertyLimBrothers has grown into one of the most recognised and respected property content brands in the country.\n\nAt Keller Williams Singapore, Melvin leverages over a decade of entrepreneurial success to cultivate a new generation of high-performing real estate professionals, anchored by the KW values of integrity, innovation, and collaboration. His mission is to empower agents with the tools, training, and culture they need to thrive in a rapidly evolving industry.\n\nOutside of his professional achievements, Melvin is a devoted family man who enjoys quality time with his wife, their four children, and their beloved dog, Oreo.",
      image: "/images/about-us/core-team/melvin-lim-professional.webp",
    },
    {
      name: "Grayce Tan",
      title: "Director of Growth",
      bio: "As Director of Growth at Keller Williams Singapore, Grayce works closely with Melvin Lim and the core team in building the company from the ground up — shaping the strategic vision, assembling the founding team, and laying the operational groundwork to scale a next-generation real estate organisation. Her focus is not just on growth, but on building a company culture defined by empowered agents, shared leadership, and a deep commitment to long-term business success.\n\nGrayce's leadership experience is shaped by her years at PropertyLimBrothers, where she serves as Vice President of Strategy. There, she established and led the Strategic Business Growth unit, while building the Business Development, Marketing, and Editorial departments. She played a pivotal role in driving cross-functional initiatives that scaled content production, strengthened salesforce enablement, and deepened media and developer partnerships — all while fostering a collaborative, performance-driven team environment.\n\nWith a deep-rooted passion for coaching, learning, and self-development, Grayce brings a multidisciplinary lens to her work. Her academic background spans Sociology, Educational Pedagogy, and Real Estate Investment — reflecting her lifelong curiosity about how people think, grow, and connect. A voracious reader and critical thinker, Grayce thrives on exploring ideas across disciplines and translating them into meaningful strategies for business and team development. This commitment to learning and service continues to define her approach as she helps lead the transformative movement in Singapore's real estate landscape through Keller Williams Singapore.",
      image: "/images/about-us/core-team/grayce-tan-professional.webp",
    },
    {
      name: "Carrie Teoh",
      title: "HR & Finance Director",
      bio: "Carrie is the systems architect behind KW Singapore's platform operations. As HR & Finance Director, she plans, builds, and scales the infrastructure that powers our consultants—from finance and compliance to HR systems, recruitment, and onboarding.\n\nWith a strong belief in fairness and structure, Carrie ensures that every process is thoughtfully designed to balance people needs with operational standards. Her approach is both strategic and grounded—bringing clarity to complexity while never losing sight of the human experience.\n\nShe's not here to manage agents. She's here to empower builders. Every consultant who joins KW Singapore touches a process she's crafted: structured, compliant, and performance-ready. From hiring playbooks to financial discipline, Carrie ensures our backend runs with the same clarity and scalability as our consultants' front-end brand engines.\n\nAnd while her systems run lean, her leadership is deeply human. Carrie leads by showing up—whether it's through onboarding sessions, supporting teammates through challenges, or even cooking for the team from the office kitchen that now proudly bears her name. For Carrie, wellness isn't a perk. It's a baseline for performance.\n\nKW Singapore doesn't run like a brokerage. It runs like a platform—and Carrie is the anchor who keeps that platform steady, fair, and future-ready.",
      image: "/images/about-us/core-team/carrie-teoh-professional.webp",
    },
    {
      name: "Siew Min Choong",
      title: "Regional Tech Trainer & Administrator",
      bio: "Siew Min champions the technological empowerment of Keller Williams (KW) consultants in Singapore. Leveraging her deep expertise in digital marketing and project management, she transforms KW's cutting-edge tools into decisive business advantages.\n\nA pivotal figure since joining the KW ecosystem in 2019, Siew Min has significantly influenced the evolution of KW's proprietary technology. Her critical involvement in Command Labs, a global initiative, ensured KW Command was developed and optimized to meet the real-world needs of consultants.\n\nIn her role at KW Singapore, Siew Min drives tech enablement and adoption. She empowers consultants and their teams to fully leverage KW Command, streamlining operations and scaling their businesses with unparalleled precision. With over a decade of experience, Siew Min consistently bridges the gap between innovation and execution, ensuring Keller Williams remains at the forefront by empowering its consultants with the best in real estate technology.",
      image: "/images/about-us/core-team/siew-min-professional.webp",
    },
    {
      name: "Marie Abalos",
      title: "Market Center Administrator & Executive Assistant to OP",
      bio: "Marie serves as both Market Center Administrator and Executive Assistant to the Operating Principal—leading with precision, clarity, and operational discipline. She oversees financials, compliance, and market center systems while supporting top-level strategy and execution. With prior HR experience at PropertyLimBrothers and a track record in executive support, Marie bridges leadership and operations with focus and reliability. Her background in medical technology and business management adds depth to her role in managing both people and process.",
      image: "/images/about-us/core-team/marie-abalos-professional.webp",
    },
    {
      name: "Joanne Ong",
      title: "Operations Manager",
      bio: "Joanne Ong joins KW Singapore as our new Operations Manager, bringing extensive experience in building high-performing, systems-driven real estate teams. As the co-founder of Jdot Property (Mega Team), she was instrumental in developing collaborative and results-oriented strategies, contributing to over RM110 million in closed gross development value.\n\nA former litigation lawyer and entrepreneur, Joanne pivoted to real estate in 2020. Inspired by the Keller Williams Mega Agent team model, she leveraged her strengths in systems, operations, and team development to build Jdot Property, earning recognition as a KW Worldwide Top 100 agent in 2024. Her expertise in operational excellence and commitment to teamwork perfectly align with KW Singapore's mission.",
      image: "/images/about-us/core-team/joanne-ong-professional.webp",
    },
  ]

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero Banner */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          style={{
            y: scrollYValue,
          }}
        />
        <div className="absolute inset-0 bg-[url('/images/about-us/about-kw-hero.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.h1 
            className="text-4xl font-bold mb-8 leading-tight md:text-6xl lg:text-7xl text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About
            <span className="block text-[#B40101] italic">KW Singapore</span>
          </motion.h1>

          <motion.p 
            className="text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed text-base md:text-lg lg:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Keller Williams Singapore is more than a realty — it's a launchpad for real estate entrepreneurs. We are the
            strategic intersection of performance, consulting, and innovation.
          </motion.p>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => {
              document.getElementById('our-story')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            <ChevronRight className="h-6 w-6 text-[#B40101] rotate-90" />
          </button>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h2 
            className="text-3xl font-bold text-white mb-8 md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Story
          </motion.h2>
          <motion.p 
            className="text-white/90 leading-relaxed max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            As the local embodiment of the world's largest real estate brand, we are built to empower Singapore's top
            realtors through elite systems, technology, and training.
          </motion.p>
          <motion.div 
            className="relative w-48 h-1 mx-auto mt-8 overflow-hidden"
            variants={itemVariants}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "-100%" }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[#B40101] to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* Our Guiding Principles - Compact Design */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/about-us/about-us-section-2.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-6 text-white leading-tight md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our MVVBP
            </motion.h2>
            <motion.p 
              className="text-lg text-white max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The principles that guide our every decision and action
            </motion.p>
          </div>

          {/* Compact Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 text-left">
            {mvvbpItems.slice(0, 3).map((item, index) => (
              <motion.div 
                key={index} 
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/15 via-[#B40101]/5 to-transparent rounded-xl transform group-hover:scale-105 transition-all duration-300" />
                <div className="relative p-6 h-full border border-[#B40101]/20 rounded-xl bg-black/40 backdrop-blur-sm group-hover:border-[#B40101]/40 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="text-[#B40101] mr-3 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="leading-relaxed text-sm text-slate-100">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Bottom row - centered */}
          <div className="flex justify-center mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl">
              {mvvbpItems.slice(3).map((item, index) => (
                <motion.div 
                  key={index + 3} 
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/15 via-[#B40101]/5 to-transparent rounded-xl transform group-hover:scale-105 transition-all duration-300" />
                  <div className="relative p-6 h-full border border-[#B40101]/20 rounded-xl bg-black/40 backdrop-blur-sm group-hover:border-[#B40101]/40 transition-all duration-300">
                                      <div className="flex items-center mb-4">
                    <div className="text-[#B40101] mr-3 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                    <p className="leading-relaxed text-sm text-slate-100">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-16 h-16 border border-[#B40101]/20 rounded-full opacity-30"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-[#B40101]/10 rounded-full opacity-20"></div>
        </div>
      </section>

      {/* Meet the Core Team - Redesigned */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-8 text-white leading-tight md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Meet the Core Team
            </motion.h2>
            <motion.p 
              className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our leadership isn't just operational — it's transformational. Each core leader at KW Singapore is handpicked for domain expertise, business acumen, and a commitment to building a scalable, consultant-first ecosystem.
            </motion.p>
          </div>
          {/* Main Featured Area */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            {/* Mobile: Image First, Desktop: Description First */}
            <div className="order-2 md:order-1">
              {/* Featured Member Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#B40101] font-semibold tracking-wider uppercase mb-2">NAME</p>
                  <h3 className="text-3xl font-bold text-white">{teamMembers[selectedMember].name}</h3>
                </div>
                <div>
                  <p className="text-sm text-[#B40101] font-semibold tracking-wider uppercase mb-2">POSITION</p>
                  <h4 className="text-2xl font-semibold text-white/90">{teamMembers[selectedMember].title}</h4>
                </div>
                <div className="pt-4">
                  <div className="h-60 overflow-y-auto pr-2 scrollbar-auto">
                    <p className="text-white/80 leading-relaxed text-base whitespace-pre-line">
                      {teamMembers[selectedMember].bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Image First, Desktop: Image Second */}
            <div className="relative w-[70%] mx-auto order-1 md:order-2">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[#B40101]/10 to-transparent">
                <img
                  src={teamMembers[selectedMember].image || "/placeholder.svg"}
                  alt={teamMembers[selectedMember].name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Team Member Thumbnails */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {teamMembers.map((member, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMember(index)}
                  className="flex-shrink-0 relative group transition-all duration-300"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-800">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                  {selectedMember !== index && (
                    <div className="absolute inset-0 bg-black/40 rounded-xl transition-opacity duration-300 group-hover:bg-black/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Be Part of the Winning Team */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[url('/images/about-us/about-us-section-3.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl font-bold leading-tight mb-6 text-white md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Be Part of the
            <span className="block text-[#B40101] italic">Winning Team</span>
          </motion.h2>

          <motion.p 
            className="text-base md:text-lg lg:text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join Singapore's most innovative real estate platform and unlock your potential with cutting-edge
            technology, comprehensive training, unmatched support systems, and a community of ambitious professionals
            committed to excellence. At KW Singapore, your success is our success.
          </motion.p>

          <div className="space-y-6">
            <Button
              size="lg"
              className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-12 py-6 text-xl font-semibold transition-all duration-300 hover:scale-105 group rounded-md"
              onClick={() => (window.location.href = "/join")}
            >
              Join KW Singapore
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-lg max-w-2xl mx-auto text-slate-100">
              Ready to transform your real estate career?
              <span className="block">Discover the opportunities waiting for you</span>
              <span className="block mt-2 text-[#B40101] font-medium">Where Media, Tech, and Talent Collide.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Join Form Dialog */}
      <JoinFormDialog 
        isOpen={isJoinFormOpen}
        onClose={() => setIsJoinFormOpen(false)}
        onSubmit={handleJoinFormSubmit}
      />
    </motion.main>
  )
}
