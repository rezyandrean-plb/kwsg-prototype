"use client"

import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Building2, Users, Award, Brain, Share2, Video, BarChart3, Target, Heart, Lightbulb, Users2, Briefcase } from "lucide-react"
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

export default function AboutUsPage() {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  const handleJoinFormSubmit = (data: any) => {
    console.log('Form submitted:', data)
    setIsJoinFormOpen(false)
  }

  const team = [
    {
      key: 'melvin',
      name: 'Melvin Lim',
      position: 'Founder & Operating Principal',
      image: '/images/core-team/melvin-lim.jpg',
      bio: [
        "Melvin Lim is the Founder and Operating Principal of Keller Williams Singapore, where he stands at the forefront of a transformative movement in Singapore's real estate landscape. As the driving force behind this venture, Melvin brings a unique combination of visionary leadership, deep industry insight, and an extensive professional network, positioning Keller Williams Singapore as a new benchmark for excellence, collaboration, and innovation in real estate.",
        "Widely regarded as one of Singapore's most influential real estate leaders, Melvin is also the Co-Founder of PLB Realty and PLB Media—trailblazing companies that revolutionised the way properties are marketed and experienced. With a background in banking and finance, Melvin blends strategic financial acumen with a deep understanding of digital storytelling, data-driven marketing, and consumer psychology. Under his leadership, PropertyLimBrothers has grown into one of the most recognised and respected property content brands in the country.",
        "At Keller Williams Singapore, Melvin leverages over a decade of entrepreneurial success to cultivate a new generation of high-performing real estate professionals, anchored by the KW values of integrity, innovation, and collaboration. His mission is to empower agents with the tools, training, and culture they need to thrive in a rapidly evolving industry.",
        "Outside of his professional achievements, Melvin is a devoted family man who enjoys quality time with his wife, their four children, and their beloved dog, Oreo."
      ]
    },
    {
      key: 'grayce',
      name: 'Grayce Tan',
      position: 'Director of Growth',
      image: '/images/core-team/grayce-tan.jpg',
      bio: [
        "As Director of Growth at Keller Williams Singapore, Grayce works closely with Melvin Lim and the core team in building the company from the ground up — shaping the strategic vision, assembling the founding team, and laying the operational groundwork to scale a next-generation real estate organisation. Her focus is not just on growth, but on building a company culture defined by empowered agents, shared leadership, and a deep commitment to long-term business success.",
        "Grayce's leadership experience is shaped by her years at PropertyLimBrothers, where she serves as Vice President of Strategy. There, she established and led the Strategic Business Growth unit, while building the Business Development, Marketing, and Editorial departments. She played a pivotal role in driving cross-functional initiatives that scaled content production, strengthened salesforce enablement, and deepened media and developer partnerships — all while fostering a collaborative, performance-driven team environment.",
        "With a deep-rooted passion for coaching, learning, and self-development, Grayce brings a multidisciplinary lens to her work. Her academic background spans Sociology, Educational Pedagogy, and Real Estate Investment — reflecting her lifelong curiosity about how people think, grow, and connect. A voracious reader and critical thinker, Grayce thrives on exploring ideas across disciplines and translating them into meaningful strategies for business and team development. This commitment to learning and service continues to define her approach as she helps lead the transformative movement in Singapore's real estate landscape through Keller Williams Singapore."
      ]
    },

    {
      key: 'carrie',
      name: 'Carrie Teoh',
      position: 'HR & Finance Director',
      image: '/images/core-team/carrie-teoh.png',
      bio: [
        "Carrie is the systems architect behind KW Singapore's platform operations. As HR & Finance Director, she plans, builds, and scales the infrastructure that powers our consultants—from finance and compliance to HR systems, recruitment, and onboarding.",
        "With a strong belief in fairness and structure, Carrie ensures that every process is thoughtfully designed to balance people needs with operational standards. Her approach is both strategic and grounded—bringing clarity to complexity while never losing sight of the human experience.",
        "She's not here to manage agents. She's here to empower builders. Every consultant who joins KW Singapore touches a process she's crafted: structured, compliant, and performance-ready. From hiring playbooks to financial discipline, Carrie ensures our backend runs with the same clarity and scalability as our consultants' front-end brand engines.",
        "And while her systems run lean, her leadership is deeply human. Carrie leads by showing up—whether it's through onboarding sessions, supporting teammates through challenges, or even cooking for the team from the office kitchen that now proudly bears her name. For Carrie, wellness isn't a perk. It's a baseline for performance.",
        "KW Singapore doesn't run like a brokerage. It runs like a platform—and Carrie is the anchor who keeps that platform steady, fair, and future-ready."
      ]
    },
    {
      key: 'siewmin',
      name: 'Siew Min Choong',
      position: 'Regional Tech Trainer & Administrator',
      image: '/images/core-team/siew-min-choong.jpg',
      bio: [
        "Siew Min brings over a decade of experience at the intersection of real estate and technology. She joined the KW ecosystem in 2019 through KW Malaysia and later worked closely with KW Worldwide via Command Labs—gathering ground-level feedback from consultants to shape how Command is built, localized, and optimized for real-world market needs.",
        "At KW Singapore, she leads tech enablement and adoption—training consultants and teams to leverage Command, streamline operations, and scale with precision. With a background in digital marketing and project management, she bridges innovation and execution, turning complex tools into everyday business advantage."
      ]
    },
    {
      key: 'marie',
      name: 'Marie Abalos',
      position: 'Market Center Administrator & Executive Assistant to OP',
      image: '/images/core-team/marie-abalos.jpg',
      bio: [
        "Marie serves as both Market Center Administrator and Executive Assistant to the Operating Principal—leading with precision, clarity, and operational discipline. She oversees financials, compliance, and market center systems while supporting top-level strategy and execution. With prior HR experience at PropertyLimBrothers and a track record in executive support, Marie bridges leadership and operations with focus and reliability. Her background in medical technology and business management adds depth to her role in managing both people and process."
      ]
    },
    {
      key: 'nyshan',
      name: 'Nyshan Tabbay',
      position: 'Assistant to OP & MCA',
      image: '/images/core-team/nyshan-tabbay.jpg',
      bio: [
        "Nyshan supports the day-to-day operations of KW Singapore by assisting the OP and MCA in executing key administrative and business functions. Detail-oriented and dependable, she ensures operational flow, calendar management, and team coordination stay sharp and consistent. Her strength lies in creating structure behind the scenes, so leadership and consultants can stay focused on performance and growth."
      ]
    }
  ]

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <Image
          src="/images/about-us/about-us-section.jpg"
          alt="About KW Singapore"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white inline-block tracking-tight">
              About KW Singapore
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto mt-6">
              Keller Williams Singapore is more than a realty — it's a launchpad for real estate entrepreneurs. We are the strategic intersection of performance, consulting, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-300 mb-8">
              As the local embodiment of the world's largest real estate brand, we are built to empower Singapore's top realtors through elite systems, technology, and training.
            </p>
            <motion.div 
              className="relative w-full h-24 overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0,50 C100,0 200,100 300,50 C400,0 500,100 600,50"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  style={{ pathLength }}
                  transition={{ duration: 0.1 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF0000" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MVVBP Section */}
      <section className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full h-full"
          >
            <Image
              src="/images/about-us/about-us-section-2.jpg"
              alt="MVVBP Background"
              fill
              className="object-cover brightness-[0.2]"
              style={{ transform: 'translateZ(-1px) scale(2)' }}
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our MVVBP</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              The principles that guide our every decision and action
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Target className="h-6 w-6 text-primary-red" />,
                title: "Mission",
                description: "Build careers worth having, businesses worth owning, lives worth living, experiences worth giving, and legacies worth leaving."
              },
              {
                icon: <Lightbulb className="h-6 w-6 text-primary-red" />,
                title: "Vision",
                description: "To be the real estate company of choice for consultants and their clients in Singapore."
              },
              {
                icon: <Heart className="h-6 w-6 text-primary-red" />,
                title: "Values",
                description: "God, family, then business."
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-black/60 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
            {[
              {
                icon: <Brain className="h-6 w-6 text-primary-red" />,
                title: "Beliefs",
                description: "WI4C2TES – Win-Win, Integrity, Clients First, Commitment, Communication, Creativity, Teamwork, Trust, Equity, Success."
              },
              {
                icon: <Users2 className="h-6 w-6 text-primary-red" />,
                title: "Perspective",
                description: "We are a tech company that provides a real estate platform preferred by clients — thinking like top producers, consulting like coaches, and focusing on productivity, service, and profitability."
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-black/60 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx + 3) * 0.1 }}
              >
                <div className="bg-primary-red/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full h-full"
          >
            <Image
              src="/images/about-us/about-us-section-3.jpg"
              alt="Core Team Background"
              fill
              className="object-cover brightness-[0.2]"
              style={{ transform: 'translateZ(-1px) scale(2)' }}
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet the Core Team</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our leadership isn't just operational — it's transformational. Each core leader at KW Singapore is handpicked for domain expertise, business acumen, and a commitment to building a scalable, consultant-first ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.slice(0, 3).map((member, idx) => (
              <motion.div
                key={member.key}
                className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 overflow-hidden cursor-pointer group max-w-[240px] mx-auto w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => setOpenModal(member.key)}
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Profile
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-bold mb-0.5 text-white group-hover:text-primary-red transition-colors duration-300">{member.name}</h3>
                  <p className="text-xs text-white/80 line-clamp-2">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              {team.slice(3).map((member, idx) => (
                <motion.div
                  key={member.key}
                  className="bg-black/40 backdrop-blur-sm rounded-xl shadow-lg border border-white/10 overflow-hidden cursor-pointer group max-w-[240px] mx-auto w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx + 3) * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  onClick={() => setOpenModal(member.key)}
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Profile
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-lg font-bold mb-0.5 text-white group-hover:text-primary-red transition-colors duration-300">{member.name}</h3>
                    <p className="text-xs text-white/80 line-clamp-2">{member.position}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Modal */}
          {team.map(member => openModal === member.key && (
            <div
              key={member.key + '-modal'}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
              onClick={() => setOpenModal(null)}
            >
              <div
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-auto relative animate-fadeIn overflow-y-auto max-h-[90vh]"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-primary-red text-2xl font-bold focus:outline-none z-10"
                  onClick={() => setOpenModal(null)}
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border-4 border-primary-red flex-shrink-0">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600 font-medium">{member.position}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                    {member.bio.map((b, i) => <p key={i}>{b}</p>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of the Winning Team</h2>
            <p className="text-lg text-gray-300 mb-8">
              Explore our platform, plug in, and grow at your pace with exponential potential.
            </p>
            <motion.div 
              className="flex justify-center"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <Button 
                  className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold"
                  onClick={() => setIsJoinFormOpen(true)}
                >
                  Let's Connect
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
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
