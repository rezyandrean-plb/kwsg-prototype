"use client"

import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Building2, Users, Award, Brain, Share2, Video, BarChart3, Target, Heart, Lightbulb, Users2, Briefcase, ChevronRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
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
  useEffect(() => {
    document.title = 'About Us - KW Singapore'
  }, [])
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(0)
  const { scrollYProgress, scrollY } = useScroll()
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scrollYValue = useTransform(scrollY, (value) => value * 0.5)

  const handleJoinFormSubmit = (data: any) => {
    console.log('Form submitted:', data)
    // The form submission is now handled within the JoinFormDialog component
    // This callback can be used for additional actions if needed
  }

  

  const teamMembers = [
    {
      name: "Melvin Lim",
      title: "Founder & Operating Principal",
      bio: "Melvin Lim is the Founder and Operating Principal of KW Singapore, where he stands at the forefront of a transformative movement in Singapore's real estate landscape. As the driving force behind this venture, Melvin brings a unique combination of visionary leadership, deep industry insight, and an extensive professional network, positioning KW Singapore as a new benchmark for excellence, collaboration, and innovation in real estate.\n\nWidely regarded as one of Singapore's most influential real estate leaders, Melvin is also the Co-Founder of PLB Realty and PLB Media—trailblazing companies that revolutionised the way properties are marketed and experienced. With a background in banking and finance, Melvin blends strategic financial acumen with a deep understanding of digital storytelling, data-driven marketing, and consumer psychology. Under his leadership, PropertyLimBrothers has grown into one of the most recognised and respected property content brands in the country.\n\nAt KW Singapore, Melvin leverages over a decade of entrepreneurial success to cultivate a new generation of high-performing real estate professionals, anchored by the KW values of integrity, innovation, and collaboration. His mission is to empower agents with the tools, training, and culture they need to thrive in a rapidly evolving industry.\n\nOutside of his professional achievements, Melvin is a devoted family man who enjoys quality time with his wife, their four children, and their beloved dog, Oreo.",
      image: "/images/about-us/core-team/melvin-lim-professional.webp",
    },
    {
      name: "Grayce Tan",
      title: "Director of Growth",
      bio: "As Director of Growth at KW Singapore, Grayce works closely with Melvin Lim and the core team in building the company from the ground up — shaping the strategic vision, assembling the founding team, and laying the operational groundwork to scale a next-generation real estate organisation. Her focus is not just on growth, but on building a company culture defined by empowered agents, shared leadership, and a deep commitment to long-term business success.\n\nGrayce's leadership experience is shaped by her years at PropertyLimBrothers, where she serves as Vice President of Strategy. There, she established and led the Strategic Business Growth unit, while building the Business Development, Marketing, and Editorial departments. She played a pivotal role in driving cross-functional initiatives that scaled content production, strengthened salesforce enablement, and deepened media and developer partnerships — all while fostering a collaborative, performance-driven team environment.\n\nWith a deep-rooted passion for coaching, learning, and self-development, Grayce brings a multidisciplinary lens to her work. Her academic background spans Sociology, Educational Pedagogy, and Real Estate Investment — reflecting her lifelong curiosity about how people think, grow, and connect. A voracious reader and critical thinker, Grayce thrives on exploring ideas across disciplines and translating them into meaningful strategies for business and team development. This commitment to learning and service continues to define her approach as she helps lead the transformative movement in Singapore's real estate landscape through KW Singapore.",
      image: "/images/about-us/core-team/grayce-tan-professional.webp",
    },
    {
      name: "Joanne Ong",
      title: "Regional Operations & Success Manager",
      bio: "Joanne Ong joins KW Singapore as our new Operations Manager, bringing extensive experience in building high-performing, systems-driven real estate teams. As the co-founder of Jdot Property (Mega Team), she was instrumental in developing collaborative and results-oriented strategies, contributing to over RM110 million in closed gross development value.\n\nA former litigation lawyer and entrepreneur, Joanne pivoted to real estate in 2020. Inspired by the KW Mega Agent team model, she leveraged her strengths in systems, operations, and team development to build Jdot Property, earning recognition as a KW Worldwide Top 100 agent in 2024. Her expertise in operational excellence and commitment to teamwork perfectly align with KW Singapore's mission.",
      image: "/images/about-us/core-team/joanne-ong-professional.webp",
    },
    {
      name: "Siew Min Choong",
      title: "Regional Tech Trainer & Administrator",
      bio: "Siew Min champions the technological empowerment of KW consultants in Singapore. Leveraging her deep expertise in digital marketing and project management, she transforms KW's cutting-edge tools into decisive business advantages.\n\nA pivotal figure since joining the KW ecosystem in 2019, Siew Min has significantly influenced the evolution of KW's proprietary technology. Her critical involvement in Command Labs, a global initiative, ensured KW Command was developed and optimized to meet the real-world needs of consultants.\n\nIn her role at KW Singapore, Siew Min drives tech enablement and adoption. She empowers consultants and their teams to fully leverage KW Command, streamlining operations and scaling their businesses with unparalleled precision. With over a decade of experience, Siew Min consistently bridges the gap between innovation and execution, ensuring KW remains at the forefront by empowering its consultants with the best in real estate technology.",
      image: "/images/about-us/core-team/siew-min-professional.webp",
    },
    {
      name: "Isabelle",
      title: "TBC",
      bio: "TBC",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Vanessa",
      title: "TBC",
      bio: "TBC",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Sheerra",
      title: "TBC",
      bio: "TBC",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Suvarna",
      title: "TBC",
      bio: "TBC",
      image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=1200&q=80",
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
      <section className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-center justify-center pt-20 sm:pt-20 md:pt-12">
        <motion.div
          className="absolute inset-0 bg-black"
          style={{
            y: scrollYValue,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-8 sm:pt-12 md:pt-16 lg:pt-32">
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
            KW Singapore is more than a realty — it's a launchpad for real estate entrepreneurs. <br></br>
            We are the strategic intersection of performance, consulting, and innovation.
          </motion.p>
        </div>

      </section>

      {/* Inside KW Section */}
      <section id="our-story" className="relative py-12 sm:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-3xl font-bold text-white mb-6 md:text-4xl lg:text-5xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Inside KW: <br/><span className="text-[#B40101]">The Real Story</span>
              </motion.h2>
              <motion.p 
                className="text-white/90 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Beyond the transactions is a movement. Dive into our community, explore our core values, and see the <strong>Life at KW</strong> that agents are building—in their business, and their lives.
              </motion.p>
            </motion.div>

            {/* Right Side - YouTube Video + Special Sentence */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-800 mb-6">
                <iframe
                  src="https://www.youtube.com/embed/vEoJTl5cQJI"
                  title="Inside KW: The Real Story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <motion.p 
                className="text-white leading-relaxed text-sm text-center italic font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                See the journey and the celebration and hear it straight from the source.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Excellence. Celebrated. Section */}
      <section className="relative py-12 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#B40101]/10 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(180,1,1,0.15),transparent_70%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header and Copy */}
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-white mb-6 md:text-4xl lg:text-5xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Excellence. <span className="text-[#B40101]">Celebrated.</span>
            </motion.h2>
            <motion.p 
              className="text-white/90 leading-relaxed text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A visual walk down the red carpet. See the grand celebration, recognition, and energy of our top performers as we honor the remarkable success built within the KW Singapore community.
            </motion.p>
          </div>

          {/* Gallery Image */}
          <motion.div
            className="relative w-full max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-gradient-to-br from-[#B40101]/20 to-transparent shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <Image
                src="/images/about-us/excellence-celebrated-gallery.webp"
                alt="KW Singapore Excellence Celebration - Awards, Recognition, and Social Events"
                fill
                className="object-cover"
                priority
                unoptimized
              />
              {/* Overlay gradient for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-0" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="relative py-12 sm:py-32 bg-gradient-to-b from-black to-gray-900">
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

      

      {/* Meet the Core Team - Redesigned */}
      <section className="relative py-12 sm:py-32 overflow-hidden">
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
                  <h3 className="text-3xl font-bold text-white">{teamMembers[selectedMember].name}</h3>
                </div>
                <div>
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
                      className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
                        index < 3 ? 'scale-110' : ''
                      }`}
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
      <section className="relative py-12 sm:py-32">
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
