"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Users, Crown, DollarSign, Target, Award, Zap } from "lucide-react"
import { JoinFormDialog } from "@/components/join-form-dialog"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

const sectionVariants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
}

export default function KWModelPage() {
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false)

  const handleJoinSubmit = (data: any) => {
    console.log("Form submitted:", data)
    // The form submission is now handled within the JoinFormDialog component
    // This callback can be used for additional actions if needed
  }

  const businessModels = [
    {
      title: "MREA Rainmaker",
      subtitle: "Active Income from Sales",
      description: "Generate active income through your personal sales and your team's performance. This is your primary revenue stream from direct real estate transactions.",
      icon: Target,
      features: [
        "Direct commission from your sales",
        "Team override from your agents",
        "New launch specialist bonuses",
        "Performance-based incentives"
      ],
      color: "bg-gradient-to-br from-blue-600 to-blue-800",
      link: "https://explore.kwsingapore.com/mrea-masterclass-registration-1",
      external: true
    },
    {
      title: "Manager Overriding",
      subtitle: "Coaching Income",
      description: "Earn income by coaching and developing your team. Build your leadership skills while creating additional revenue streams through mentorship.",
      icon: Users,
      features: [
        "Coaching and training fees",
        "Leadership development programs",
        "Team building incentives",
        "Mentorship compensation"
      ],
      color: "bg-gradient-to-br from-green-600 to-green-800",
      link: "/join",
      external: false
    },
    {
      title: "7-Tier Growth Share",
      subtitle: "Legacy & Passive Income",
      description: "Build true passive income through our revolutionary 7-tier network system. Create a legacy that continues to generate income for generations.",
      icon: Crown,
      features: [
        "2% from every deal in your network",
        "7-tier unlimited width structure",
        "Lifetime and transferable benefits",
        "Global network eligibility"
      ],
      color: "bg-gradient-to-br from-purple-600 to-purple-800",
      link: "/why-kw/growth-share",
      external: false
    }
  ]

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
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000"
            alt="KW Business Models"
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
            <span className="text-white font-semibold">Three Paths to Success</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
            KW Business Models
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-white">
            Choose Your Path to Financial Freedom
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-100">
            KW Singapore offers three distinct business models designed to maximize your earning potential. 
            From active income to passive wealth building, discover the model that fits your goals.
          </p>
          <Button 
            className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[56px] min-w-[240px]"
            onClick={() => setIsJoinFormOpen(true)}
          >
            Start Your Journey →
          </Button>
        </motion.div>
      </section>

      {/* Business Models Section */}
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Three Proven Business Models
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Each model is designed to work independently or together, giving you the flexibility to build 
              multiple income streams and achieve true financial freedom.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {businessModels.map((model, index) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="bg-gray-900 rounded-2xl p-8 h-full border border-gray-800 hover:border-primary-red/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-red/10">
                  {/* Icon */}
                  <div className={`${model.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <model.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-2">{model.title}</h3>
                  <p className="text-primary-red font-semibold mb-4">{model.subtitle}</p>
                  <p className="text-gray-300 mb-6 leading-relaxed">{model.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {model.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className="w-full bg-primary-red text-white hover:bg-primary-red/90 transition-all duration-300 group-hover:scale-105"
                    onClick={() => {
                      if (model.external) {
                        window.open(model.link, '_blank', 'noopener,noreferrer')
                      } else {
                        window.location.href = model.link
                      }
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How the Models Work Together
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The power of KW Singapore lies in the synergy between these three models. 
              Start with one and expand to build multiple income streams.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-red rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Start with Active Income</h3>
                  <p className="text-gray-300">Begin with the MREA Rainmaker model to establish your primary income stream through direct sales and team building.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-red rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Develop Leadership Skills</h3>
                  <p className="text-gray-300">As you grow your team, leverage the Manager Overriding model to earn coaching income while developing your leadership abilities.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-red rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Build Passive Wealth</h3>
                  <p className="text-gray-300">Create lasting legacy through the 7-Tier Growth Share model, generating passive income that continues for generations.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary-red/20 to-purple-600/20 rounded-2xl p-8 border border-primary-red/30">
                <h3 className="text-2xl font-bold text-white mb-4">The KW Advantage</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-300">Unlimited earning potential</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-300">Proven global system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-300">Multiple income streams</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary-red" />
                    <span className="text-gray-300">Worldwide network support</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Choose Your Path?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join KW Singapore and discover which business model aligns with your goals. 
              Our team will help you develop a personalized strategy for success.
            </p>
            <Button 
              className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[56px] min-w-[240px]"
              onClick={() => setIsJoinFormOpen(true)}
            >
              Start Your Journey →
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