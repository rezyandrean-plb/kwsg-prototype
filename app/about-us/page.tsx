"use client"

import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Building2, Users, Award, Brain, Share2, Video, BarChart3, Target, Heart, Lightbulb, Users2, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

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

  const team = [
    {
      key: 'melvin',
      name: 'Melvin Lim',
      position: 'Founder & Operating Principal, Keller Williams Singapore',
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
      position: 'Director of Growth, Keller Williams Singapore',
      image: '/images/core-team/grayce-tan.jpg',
      bio: [
        "As Director of Growth at Keller Williams Singapore, Grayce works closely with Melvin Lim and the core team in building the company from the ground up — shaping the strategic vision, assembling the founding team, and laying the operational groundwork to scale a next-generation real estate organisation. Her focus is not just on growth, but on building a company culture defined by empowered agents, shared leadership, and a deep commitment to long-term business success.",
        "Grayce's leadership experience is shaped by her years at PropertyLimBrothers, where she serves as Vice President of Strategy. There, she established and led the Strategic Business Growth unit, while building the Business Development, Marketing, and Editorial departments. She played a pivotal role in driving cross-functional initiatives that scaled content production, strengthened salesforce enablement, and deepened media and developer partnerships — all while fostering a collaborative, performance-driven team environment.",
        "With a deep-rooted passion for coaching, learning, and self-development, Grayce brings a multidisciplinary lens to her work. Her academic background spans Sociology, Educational Pedagogy, and Real Estate Investment — reflecting her lifelong curiosity about how people think, grow, and connect. A voracious reader and critical thinker, Grayce thrives on exploring ideas across disciplines and translating them into meaningful strategies for business and team development. This commitment to learning and service continues to define her approach as she helps lead the transformative movement in Singapore's real estate landscape through Keller Williams Singapore."
      ]
    },
    {
      key: 'siewmin',
      name: 'Siew Min Choong',
      position: 'Regional Tech Trainer & Administrator, Keller Williams Singapore',
      image: '/images/core-team/siew-min-choong.jpg',
      bio: [
        "Siew Min brings over a decade of experience at the intersection of real estate and technology. She joined the KW ecosystem in 2019 through KW Malaysia and later worked closely with KW Worldwide via Command Labs—gathering ground-level feedback from consultants to shape how Command is built, localized, and optimized for real-world market needs.",
        "At KW Singapore, she leads tech enablement and adoption—training consultants and teams to leverage Command, streamline operations, and scale with precision. With a background in digital marketing and project management, she bridges innovation and execution, turning complex tools into everyday business advantage."
      ]
    },
    {
      key: 'marie',
      name: 'Marie Abalos',
      position: 'Market Center Administrator & Executive Assistant to OP, Keller Williams Singapore',
      image: '/images/core-team/marie-abalos.jpg',
      bio: [
        "Marie serves as both Market Center Administrator and Executive Assistant to the Operating Principal—leading with precision, clarity, and operational discipline. She oversees financials, compliance, and market center systems while supporting top-level strategy and execution. With prior HR experience at PropertyLimBrothers and a track record in executive support, Marie bridges leadership and operations with focus and reliability. Her background in medical technology and business management adds depth to her role in managing both people and process."
      ]
    },
    {
      key: 'nyshan',
      name: 'Nyshan Tabbay',
      position: 'Assistant to OP & MCA, Keller Williams Singapore',
      image: '/images/core-team/nyshan-tabbay.jpg',
      bio: [
        "Nyshan supports the day-to-day operations of KW Singapore by assisting the OP and MCA in executing key administrative and business functions. Detail-oriented and dependable, she ensures operational flow, calendar management, and team coordination stay sharp and consistent. Her strength lies in creating structure behind the scenes, so leadership and consultants can stay focused on performance and growth."
      ]
    }
  ]

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
          alt="About KW Singapore"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About KW Singapore</h1>
            <p className="text-xl text-gray-100 max-w-3xl">
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
          </motion.div>
        </div>
      </section>

      {/* MVVBP Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* First Row - 3 cards */}
            <motion.div 
              className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary-red" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-white">Mission</h3>
              <p className="text-gray-300 text-center">
                Build careers worth having, businesses worth owning, lives worth living, experiences worth giving, and legacies worth leaving.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-primary-red" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-white">Vision</h3>
              <p className="text-gray-300 text-center">
                To be the real estate company of choice for consultants and their clients in Singapore.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-red" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-white">Values</h3>
              <p className="text-gray-300 text-center">
                God, family, then business.
              </p>
            </motion.div>

            {/* Second Row - 2 centered cards */}
            <div className="md:col-span-2 lg:col-span-3 flex justify-center gap-8">
              <motion.div 
                className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-primary-red" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-center text-white">Beliefs</h3>
                <p className="text-gray-300 text-center">
                  WI4C2TES – Win-Win, Integrity, Clients First, Commitment, Communication, Creativity, Teamwork, Trust, Equity, Success.
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users2 className="h-8 w-8 text-primary-red" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-center text-white">Perspective</h3>
                <p className="text-gray-300 text-center">
                  We are a tech company that provides a real estate platform preferred by clients — thinking like top producers, consulting like coaches, and focusing on productivity, service, and profitability.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map(member => (
              <motion.button
                key={member.key}
                className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 flex flex-col h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary-red"
                style={{ textAlign: 'left' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onClick={() => setOpenModal(member.key)}
                tabIndex={0}
                type="button"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold mb-1 text-white">{member.name}</h3>
                  <p className="text-primary-red font-medium mb-0 text-sm">{member.position}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Modal */}
          {team.map(member => openModal === member.key && (
            <div
              key={member.key + '-modal'}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
              onClick={() => setOpenModal(null)}
            >
              <div
                className="bg-white text-black rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative animate-fadeIn"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-primary-red text-2xl font-bold focus:outline-none"
                  onClick={() => setOpenModal(null)}
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="flex flex-col md:flex-row gap-8 items-center mb-2">
                  <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary-red flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col items-center md:items-start">
                    <h3 className="text-2xl font-bold mb-1 text-center md:text-left">{member.name}</h3>
                    <p className="text-primary-red font-medium mb-4 text-center md:text-left">{member.position}</p>
                  </div>
                </div>
                <div className="space-y-4 text-gray-800 text-sm leading-relaxed mt-4">
                  {member.bio.map((b, i) => <p key={i}>{b}</p>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sales Leadership Team Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sales Leadership Team</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our sales leadership drives performance across growth, training, and retention. Each leader is measured not just by numbers, but by how many consultants they elevate. They train. They coach. They recruit — strategically.<br />
              Meet the minds behind the market center's productivity engine. Every metric we hit begins with them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1,2,3].map(i => (
              <div key={i} className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center p-8 h-full">
                <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-primary-red">
                  <img
                    src={`https://randomuser.me/api/portraits/men/${i+20}.jpg`}
                    alt="Sales Leader Avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1 text-white">Leader Name {i}</h3>
                <p className="text-primary-red font-medium mb-2">Sales Leader Position</p>
                <p className="text-gray-300 text-center text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Sales Consultants Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Sales Consultants</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We don't recruit realtors. We develop real estate consultants. Our network comprises high-performing professionals focused on serving clients with precision, integrity, and market intelligence. Meet the individuals reshaping what it means to be a trusted advisor in real estate.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1,2,3].map(i => (
              <div key={i} className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center p-8 h-full">
                <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-primary-red">
                  <img
                    src={`https://randomuser.me/api/portraits/women/${i+30}.jpg`}
                    alt="Consultant Avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1 text-white">Consultant Name {i}</h3>
                <p className="text-primary-red font-medium mb-2">Real Estate Consultant</p>
                <p className="text-gray-300 text-center text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Careers @ KW</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We don't offer jobs — we offer business models. Whether you're starting out or scaling a high-performance team, KW Singapore equips you with tools, coaching, and systems to build a legacy business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-red" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-white">Solo Consultant to Capper</h3>
              <p className="text-gray-300 text-center">
                Start your journey as an independent consultant and grow into a top producer.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users2 className="h-8 w-8 text-primary-red" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-white">Team Leader to Expansion Director</h3>
              <p className="text-gray-300 text-center">
                Scale your success by building and leading high-performance teams.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-primary-red" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-white">Support Roles</h3>
              <p className="text-gray-300 text-center">
                Creative, Media, Tech, Training, and Ops roles for non-sales talents.
              </p>
            </motion.div>
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get to Know Us</h2>
            <p className="text-lg text-gray-300 mb-8">
              Explore our platform, plug in, and grow at your pace with exponential potential.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp}>
                <Button 
                  className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold"
                >
                  Join KW Singapore
                </Button>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Button 
                  className="bg-white text-primary-red hover:bg-white/90 px-8 py-6 text-lg font-semibold"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
