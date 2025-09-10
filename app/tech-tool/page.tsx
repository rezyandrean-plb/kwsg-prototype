"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Building2, Calculator, TrendingUp, BarChart3, MapPin, DollarSign, Smartphone, Home, ChevronRight, Play } from "lucide-react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"
import Image from "next/image"

// Tool data based on the image
const tools = [
  {
    id: 1,
    title: "KW PropSage",
    description: "A powerful back-end system that handles your entire transaction process smoothly, from start to finish, so you don't have to worry about paperwork.",
    icon: Building2,
    category: "Internal Tool",
    url: "app.propsage.com"
  },
  {
    id: 2,
    title: "KW Command",
    description: "Your central hub for all things real estate, making it easy to manage your business from anywhere and avoid the pain of juggling multiple platforms.",
    icon: Calculator,
    category: "Internal Tool",
    url: "agent.kw.com"
  },
  {
    id: 3,
    title: "KW University",
    description: "Access world-class real estate training and mentorship to continuously sharpen your skills and dominate the market.",
    icon: TrendingUp,
    category: "Internal Tool",
    url: "https://agent.kw.com/connect/learning/categories"
  },
  // External Tools items
  {
    id: 12,
    title: "Real Insights",
    description: "Get instant, data-driven insights into a property's value, market trends, and transaction history to price homes accurately.",
    icon: BarChart3,
    category: "External Tools",
    url: "rea-insight.com/"
  },
  {
    id: 13,
    title: "EdgeProp Inspector",
    description: "Avoid the pain of manual research by using this tool to get comprehensive property data, including URA planning, school details, and transaction history, all in one place.",
    icon: TrendingUp,
    category: "External Tools",
    url: "www.edgeprop.sg/analytic/inspector"
  },
  {
    id: 18,
    title: "Squarefoot",
    description: "Easily check recent transaction prices of HDBs, condos, and landed properties to ensure your clients get the best deal.",
    icon: Home,
    category: "External Tools",
    url: "squarefoot.com.sg/component/users/login"
  },
  {
    id: 19,
    title: "KW Canva",
    description: "Design stunning marketing materials, from social media posts to property brochures, even if you have no design experience.",
    icon: Building2,
    category: "External Tools",
    url: "canva.kw.com"
  },
  {
    id: 20,
    title: "SpiderGate DNC Subscription",
    description: "Easily check phone numbers against the Do Not Call registry to stay compliant and avoid legal trouble.",
    icon: Smartphone,
    category: "External Tools",
    url: "https://drive.google.com/file/d/1GcNpqifBzKSurSmz7qkpIMjrjaVOD1Pm/view"
  },
  // Compass Tools items
  {
    id: 14,
    title: "Research Chart Mega Vault",
    description: "Access a vast library of charts and reports to quickly understand market cycles and confidently advise clients on when to buy or sell.",
    icon: BarChart3,
    category: "Compass Tools",
    url: "proptech.kwsingapore.com"
  },
  {
    id: 15,
    title: "Disparity Effect Research Chart",
    description: "Comprehensive research charts and data analysis tools for property market insights and trend analysis.",
    icon: TrendingUp,
    category: "Compass Tools",
    url: "https://proptech.kwsingapore.com/tech-tools/disparity-effect/charts?type=all"
  },
  {
    id: 21,
    title: "BUC vs Resale Comparison Calculator",
    description: "Compare Build-to-Order (BUC) properties against resale properties to help clients make informed investment decisions.",
    icon: Calculator,
    category: "Compass Tools",
    url: "https://proptech.kwsingapore.com/tech-tools/property-comparison"
  },
  // Research Tools items
  {
    id: 22,
    title: "Research Chart Mega Vault",
    description: "Access a comprehensive collection of research charts and data analysis tools for property market insights and trend analysis.",
    icon: BarChart3,
    category: "Research Tools",
    url: "https://drive.google.com/drive/u/2/folders/16cpLVQWIGSmdsat2f9XONQkDbOESYV0m"
  },
  // Training Resource items
  {
    id: 23,
    title: "Training Recording: KW PropTech Calculator, EdgeProp Inspector, Real Insights, etc.",
    description: "Comprehensive training videos covering KW PropTech calculators, EdgeProp Inspector, Real Insights, and other essential tools.",
    icon: Play,
    category: "Training Resource",
    url: "https://www.youtube.com/playlist?list=PLLAXUUZdAmAqEH3-QDXlGc4Opm9i3lGa0"
  },
  {
    id: 24,
    title: "Training Recording: KW PropSage Deal Submission",
    description: "Step-by-step training videos for KW PropSage deal submission process and best practices.",
    icon: Play,
    category: "Training Resource",
    url: "https://www.youtube.com/playlist?list=PLLAXUUZdAmAoqtN5dPkjshZgUhF735R9x"
  },
  {
    id: 25,
    title: "Video Guide: KW Command",
    description: "Comprehensive video tutorials for KW Command platform features and functionality.",
    icon: Play,
    category: "Training Resource",
    url: "https://www.youtube.com/playlist?list=PLLAXUUZdAmAr-TbCVIjwGGCItRE-mQ3Vg"
  },
  {
    id: 26,
    title: "Step-by-step Guide: KW Command",
    description: "Detailed written guides and documentation for KW Command platform usage and troubleshooting.",
    icon: Play,
    category: "Training Resource",
    url: "https://answers.kw.com/hc/en-us/categories/26283417706515-Command"
  },
  {
    id: 27,
    title: "Step-by-step Guide: KW Command Mobile App",
    description: "Complete guide for using KW Command mobile application features and functionality.",
    icon: Play,
    category: "Training Resource",
    url: "https://answers.kw.com/hc/en-us/categories/4402619174931-Command-App"
  },
  {
    id: 28,
    title: "Step-by-step Guide: Real Insights",
    description: "Comprehensive guide for using Real Insights tool for property valuation and market analysis.",
    icon: Play,
    category: "Training Resource",
    url: "https://drive.google.com/file/d/1YkRJJebAJhWilzd2mvTMwMGbIvzvBzWY/view?usp=drive_link"
  },
  {
    id: 29,
    title: "Step-by-step Guide: Real Insights Valuation Report",
    description: "Detailed instructions for generating and interpreting Real Insights valuation reports.",
    icon: Play,
    category: "Training Resource",
    url: "https://drive.google.com/file/d/1KnOVVO_2YtvDta0vS_t0nxCIlo1K0AK3/view?usp=drive_link"
  },
]

const categories = [
  "All",
  "Internal Tool",
  "External Tools",
  "Compass Tools",
  "Research Tools",
  "Training Resource"
]

export default function TechToolPage() {
  const [activeCategory, setActiveCategory] = useState("Internal Tool")
  const [searchQuery, setSearchQuery] = useState("")
  const [showMore, setShowMore] = useState(false)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [selectedTool, setSelectedTool] = useState<any>(null)
  const [password, setPassword] = useState("")
 
  const { scrollYProgress, scrollY } = useScroll()
  const scrollYValue = useTransform(scrollY, (value) => value * 0.5)

  // Refs for intersection observer
  const heroRef = useRef(null)
  const navigationRef = useRef(null)
  const toolsRef = useRef(null)
  const roadmapRef = useRef(null)

  // Intersection observer hooks
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const navigationInView = useInView(navigationRef, { once: true, margin: "-50px" })
  const toolsInView = useInView(toolsRef, { once: true, margin: "-100px" })
  const roadmapInView = useInView(roadmapRef, { once: true, margin: "-100px" })

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const itemsPerPage = 6
  const displayedTools = showMore ? filteredTools : filteredTools.slice(0, itemsPerPage)
  const hasMoreItems = filteredTools.length > itemsPerPage

  const onSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const handleCardClick = (tool: any) => {
    if (tool.url) {
      setSelectedTool(tool)
      setPasswordDialogOpen(true)
    }
  }

  const handlePasswordSubmit = () => {
    if (password === "kwagent2025#") {
      if (selectedTool?.url) {
        const url = selectedTool.url.startsWith('http') ? selectedTool.url : `https://${selectedTool.url}`
        window.open(url, '_blank')
      }
      setPasswordDialogOpen(false)
      setPassword("")
      setSelectedTool(null)
    } else {
      alert("Incorrect password. Please try again.")
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero Banner */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute top-20 left-20 w-32 h-32 border-2 border-[#b40101] rotate-45"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 45 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.div 
            className="absolute top-40 right-32 w-24 h-24 border border-red-400 rotate-12"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 12 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.div 
            className="absolute bottom-32 left-1/4 w-40 h-40 border border-[#b40101] rotate-45"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 45 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-red-400 rotate-12"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 12 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-28 h-28 border border-[#b40101] rotate-45"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 45 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          />

          {/* Hexagonal shapes */}
          <motion.svg
            className="absolute top-16 right-1/3 w-16 h-16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: 360 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <polygon points="13 2 3 14 12 22 22 14" className="text-[#b40101]" />
          </motion.svg>
          <motion.svg
            className="absolute bottom-1/4 left-1/3 w-12 h-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1, rotate: -360 } : { opacity: 0, scale: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            <polygon points="13 2 3 14 12 22 22 14" className="text-red-400" />
          </motion.svg>

          {/* Dots */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#b40101] rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <motion.div 
            className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-400 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-[#b40101] rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-balance"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            KW Singapore Tech Tools
          </motion.h1>
        </div>
      </section>

      {/* Navigation Filters */}
      <section ref={navigationRef} className="relative py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={navigationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <motion.button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#B40101] text-white shadow-lg shadow-[#B40101]/30"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md"
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={navigationInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Tool Dashboard */}
      <div ref={toolsRef} className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, x: -30 }}
              animate={toolsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {activeCategory} ({filteredTools.length})
            </motion.h2>
            <motion.div 
              className="relative max-w-md"
              initial={{ opacity: 0, x: 30 }}
              animate={toolsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search Tools..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#b40101] focus:ring-[#b40101]/20 transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          {filteredTools.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-gray-400 text-lg">No tools found matching your criteria.</p>
            </motion.div>
          ) : (
            <>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                initial={{ opacity: 0 }}
                animate={toolsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {displayedTools.map((tool, index) => {
                  const IconComponent = tool.icon
                  return (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={toolsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.6 + index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        y: -5, 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-[#b40101]/20 transition-all duration-300 hover:border-[#b40101] ${
                          tool.url ? 'cursor-pointer' : 'cursor-default'
                        }`}
                        onClick={() => handleCardClick(tool)}
                      >
                        <CardContent className="p-6 px-3 py-3">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <motion.div 
                                className="w-12 h-12 bg-[#b40101]/20 rounded-lg flex items-center justify-center"
                                whileHover={{ 
                                  backgroundColor: "rgba(180, 1, 1, 0.3)",
                                  scale: 1.1,
                                  transition: { duration: 0.2 }
                                }}
                              >
                                <IconComponent className="w-6 h-6 text-[#b40101]" />
                              </motion.div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
                              <p className="text-sm text-gray-300 leading-relaxed">{tool.description}</p>
                              {tool.url && (
                                <motion.p 
                                  className="text-xs text-[#b40101] mt-2"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.8 + index * 0.1 }}
                                >
                                  Click to access →
                                </motion.p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>

              {hasMoreItems && (
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="bg-[#b40101] hover:bg-[#8a0101] text-white px-8 py-2 transition-all duration-300 hover:shadow-lg hover:shadow-[#b40101]/30"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? "Show Less" : `Show More (${filteredTools.length - itemsPerPage} more)`}
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Next 90 Days Section */}
      <section ref={roadmapRef} className="bg-black py-8 sm:py-12 lg:py-16">
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl w-full">
            {/* Header with Logo */}
            <motion.div 
              className="flex items-center justify-center gap-4 sm:gap-8 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={roadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center">
                <motion.h2 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={roadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Next 90 Days – What's Coming
                </motion.h2>
                <motion.p 
                  className="text-sm sm:text-base lg:text-lg text-gray-300 px-4 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={roadmapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  What's ahead is even more exciting. Here's our line-up for the next quarter:
                </motion.p>
              </div>
            </motion.div>

            {/* Three Column Layout */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 lg:mt-10"
              initial={{ opacity: 0 }}
              animate={roadmapInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {/* September */}
              <motion.div 
                className="bg-gray-900/30 rounded-lg p-4 sm:p-6 border border-gray-800"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={roadmapInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  borderColor: "#b40101",
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-white border-b border-gray-700 pb-2 mb-3 sm:mb-4">September</h3>
                <div className="space-y-2 sm:space-y-3">
                  <motion.div 
                    className="text-green-400 text-sm sm:text-base font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    Property Comparison Tool
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    Property Analysis
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    MegaMap
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                  >
                    KW Compass10
                  </motion.div>
                </div>
              </motion.div>

              {/* October */}
              <motion.div 
                className="bg-gray-900/30 rounded-lg p-4 sm:p-6 border border-gray-800"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={roadmapInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  borderColor: "#b40101",
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-white border-b border-gray-700 pb-2 mb-3 sm:mb-4">October</h3>
                <div className="space-y-2 sm:space-y-3">
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    Valuation Tool
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    School-based Property Finder
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                  >
                    KW Resource Hub
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                  >
                    DisparityEffect 2.0
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.3 }}
                  >
                    Condo Ranker 2.0
                  </motion.div>
                </div>
              </motion.div>

              {/* November */}
              <motion.div 
                className="bg-gray-900/30 rounded-lg p-4 sm:p-6 border border-gray-800 sm:col-span-2 lg:col-span-1"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={roadmapInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  borderColor: "#b40101",
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-white border-b border-gray-700 pb-2 mb-3 sm:mb-4">November</h3>
                <div className="space-y-2 sm:space-y-3">
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                  >
                    Time Machine (Concept Tool)
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.1 }}
                  >
                    ProCharts
                  </motion.div>
                  <motion.div 
                    className="text-white text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                  >
                    AI Chatbot 2.0
                  </motion.div>
                  <motion.div 
                    className="text-gray-400 text-sm sm:text-base italic"
                    initial={{ opacity: 0, x: -20 }}
                    animate={roadmapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1.3 }}
                  >
                    ...and more
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Password Dialog */}
      <AnimatePresence>
        {passwordDialogOpen && (
          <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
            <DialogContent className="bg-gray-800 border-gray-700">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <DialogHeader>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <DialogTitle className="text-white">Access Tool</DialogTitle>
                  </motion.div>
                </DialogHeader>
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <motion.p 
                    className="text-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    Please enter the password to access <span className="text-[#b40101] font-semibold">{selectedTool?.title}</span>
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-[#b40101] focus:ring-[#b40101]/20 transition-all duration-300"
                      onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                      autoFocus
                    />
                  </motion.div>
                  <motion.div 
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handlePasswordSubmit}
                        className="bg-[#b40101] hover:bg-[#8a0101] text-white flex-1 transition-all duration-300 hover:shadow-lg hover:shadow-[#b40101]/30"
                      >
                        Access Tool
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => {
                          setPasswordDialogOpen(false)
                          setPassword("")
                          setSelectedTool(null)
                        }}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 transition-all duration-300"
                      >
                        Cancel
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.main>
  )
}
