"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Building2, Calculator, TrendingUp, BarChart3, MapPin, DollarSign, Smartphone, Home, ChevronRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState } from "react"

// Tool data based on the image
const tools = [
  {
    id: 1,
    title: "Alana",
    description: "Our all-in-one PropTech CRM system unites in-house creative, sales, research, and tech to power smarter property decisions.",
    icon: "A",
    category: "KW Singapore Internal Proptech"
  },
  {
    id: 2,
    title: "BUC Calculator",
    description: "Calculate progressive payments for new or subsale launches—get a detailed timeline and cost breakdown to plan with confidence.",
    icon: "BUC",
    category: "KW Singapore Internal Proptech"
  },
  {
    id: 3,
    title: "Condo Ranker",
    description: "Compare condos with live listings, shortlist top units, and use our analytics to uncover the best deals in Singapore.",
    icon: "CR",
    category: "KW Singapore Internal Proptech"
  },
  {
    id: 4,
    title: "Disparity Effect",
    description: "Explore our new KW Singapore research portal—packed with Singapore property data in easy-to-read charts, graphs, and insights.",
    icon: "D",
    category: "KW Singapore Internal Proptech"
  },
  {
    id: 5,
    title: "Journey Maker",
    description: "A planning tool our consultants use to map out personalised wealth and retirement roadmaps tailored to each client's goals.",
    icon: "JM",
    category: "KW Singapore Internal Proptech"
  },
  {
    id: 6,
    title: "MOAT Analysis – Tableau",
    description: "A proprietary scoring system based on 10 factors of research, developed through years of experience, to compare and sieve out properties in accordance to desirability.",
    icon: "MA",
    category: "KW Singapore Internal Proptech"
  },
  {
    id: 7,
    title: "MOAT Analysis – Web",
    description: "Proprietary 10-factor scoring system filters top properties based on real data, experience, and client insights.",
    icon: "MW",
    category: "KW Singapore Internal Proptech"
  },
  {
    id: 8,
    title: "Nucleus App",
    description: "All our in-house tools, on the go—built to analyse market trends and calculate financial performance in SG property.",
    icon: "NA",
    category: "KW Singapore Internal Proptech"
  },
  {
    id: 9,
    title: "Rent & Stay ROI Calculator",
    description: "Rent or buy? New launch or resale? This tool compares every scenario to help you make the smartest move for your property goals.",
    icon: "RS",
    category: "KW Singapore Internal Proptech"
  }
]

const categories = [
  "All",
  "KW Singapore Internal Proptech",
  "Notion Wiki",
  "Google Sheets",
  "External Resources",
  "KW Singapore Mortgage Calculator"
]

export default function TechToolPage() {
  const [activeCategory, setActiveCategory] = useState("KW Singapore Internal Proptech")
  const [searchQuery, setSearchQuery] = useState("")
  
  const { scrollYProgress, scrollY } = useScroll()
  const scrollYValue = useTransform(scrollY, (value) => value * 0.5)

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero Banner */}
      <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center pt-20">
        <motion.div
          className="absolute inset-0 bg-black"
          style={{
            y: scrollYValue,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.h1 
            className="text-4xl font-bold mb-8 leading-tight md:text-6xl lg:text-7xl text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tech Tool
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

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => {
              document.getElementById('tech-tool')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            <ChevronRight className="h-6 w-6 text-[#B40101] rotate-90" />
          </button>
        </div>
      </section>

      {/* Tech Tool Dashboard */}
      <section id="tech-tool" className="relative py-12 sm:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            {/* Navigation Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-[#B40101] text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Title and Search */}
            <div className="flex items-center justify-between gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {activeCategory}
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search Tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full md:w-80 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#B40101]"
                />
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:bg-gray-750 transition-all cursor-pointer border border-gray-700"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#B40101] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">
                    {tool.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed">
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No tools found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </motion.main>
  )
}
