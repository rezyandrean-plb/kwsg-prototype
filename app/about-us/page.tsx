"use client"

import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Building2, Users, Award, Brain, Share2, Video, BarChart3, Target, Heart, Lightbulb, Users2, Briefcase, ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { JoinFormDialog } from "@/components/join-form-dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"

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
  const router = useRouter()
  useEffect(() => {
    document.title = 'About Us - KW Singapore'
  }, [])
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [isJoinFormOpen, setIsJoinFormOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(0)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobileView, setIsMobileView] = useState(false)
  const [galleryCategory, setGalleryCategory] = useState<string>("all")
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0)

  useEffect(() => {
    const updateIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobileView(window.innerWidth < 768)
      }
    }

    updateIsMobile()
    window.addEventListener("resize", updateIsMobile)

    return () => {
      window.removeEventListener("resize", updateIsMobile)
    }
  }, [])
  
  // Celebration images array
  const celebrationImages = [
    { src: "/images/about-us/excellence-celebrated/Excellence-01.jpg", alt: "KW Singapore Excellence Celebration - Award Winners" },
    { src: "/images/about-us/excellence-celebrated/Excellence-02.jpg", alt: "KW Singapore Excellence Celebration - Social Gathering" },
    { src: "/images/about-us/excellence-celebrated/Excellence-03.jpg", alt: "KW Singapore Excellence Celebration - Recognition Event" },
    { src: "/images/about-us/excellence-celebrated/Excellence-04.jpg", alt: "KW Singapore Excellence Celebration - Celebration Moment" },
    { src: "/images/about-us/excellence-celebrated/Excellence-05.jpg", alt: "KW Singapore Excellence Celebration - Group Photo" },
    { src: "/images/about-us/excellence-celebrated/Excellence-06.jpg", alt: "KW Singapore Excellence Celebration - Event Gathering" },
    { src: "/images/about-us/excellence-celebrated/Excellence-07.jpg", alt: "KW Singapore Excellence Celebration - Award Presentation" },
    { src: "/images/about-us/excellence-celebrated/Excellence-08.jpg", alt: "KW Singapore Excellence Celebration - Celebration" },
    { src: "/images/about-us/excellence-celebrated/Excellence-09.jpg", alt: "KW Singapore Excellence Celebration - Social Event" },
    { src: "/images/about-us/excellence-celebrated/Excellence-10.jpg", alt: "KW Singapore Excellence Celebration - Recognition" },
  ]
  
  // Navigation functions for celebration carousel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % celebrationImages.length)
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + celebrationImages.length) % celebrationImages.length)
  }
  
  // Auto-slide animation for celebration carousel (slow)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % celebrationImages.length)
    }, 6000) // 6 seconds - slow auto-slide

    return () => clearInterval(interval)
  }, [celebrationImages.length])
  
  const { scrollYProgress, scrollY } = useScroll()
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scrollYValue = useTransform(scrollY, (value) => value * 0.5)

  // Auto-scroll carousel
  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000) // Change slide every 5 seconds (slower)

    return () => clearInterval(interval)
  }, [api])

  // Track current slide and scroll availability
  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    })
  }, [api])

  const handleJoinFormSubmit = (data: any) => {
    console.log('Form submitted:', data)
    // The form submission is now handled within the JoinFormDialog component
    // This callback can be used for additional actions if needed
  }

  // Gallery images by category
  const galleryImages = {
    "Branding workshop": [
      { src: "/images/about-us/excellence-celebrated/Excellence-01.jpg", alt: "Branding Workshop 1" },
      { src: "/images/about-us/excellence-celebrated/Excellence-02.jpg", alt: "Branding Workshop 2" },
      { src: "/images/about-us/excellence-celebrated/Excellence-03.jpg", alt: "Branding Workshop 3" },
    ],
    "Trainings": [
      { src: "/images/about-us/excellence-celebrated/Excellence-04.jpg", alt: "Training Session 1" },
      { src: "/images/about-us/excellence-celebrated/Excellence-05.jpg", alt: "Training Session 2" },
      { src: "/images/about-us/excellence-celebrated/Excellence-06.jpg", alt: "Training Session 3" },
    ],
    "MREA": [
      { src: "/images/about-us/excellence-celebrated/Excellence-07.jpg", alt: "MREA Event 1" },
      { src: "/images/about-us/excellence-celebrated/Excellence-08.jpg", alt: "MREA Event 2" },
      { src: "/images/about-us/excellence-celebrated/Excellence-09.jpg", alt: "MREA Event 3" },
    ],
    "MRS": [
      { src: "/images/about-us/excellence-celebrated/Excellence-10.jpg", alt: "MRS Event 1" },
      { src: "/images/about-us/excellence-celebrated/Excellence-01.jpg", alt: "MRS Event 2" },
      { src: "/images/about-us/excellence-celebrated/Excellence-02.jpg", alt: "MRS Event 3" },
    ],
    "Podcast": [
      { src: "/images/about-us/excellence-celebrated/Excellence-03.jpg", alt: "Podcast Recording 1" },
      { src: "/images/about-us/excellence-celebrated/Excellence-04.jpg", alt: "Podcast Recording 2" },
      { src: "/images/about-us/excellence-celebrated/Excellence-05.jpg", alt: "Podcast Recording 3" },
    ],
  }

  const categories = ["Branding workshop", "Trainings", "MREA", "MRS", "Podcast"]

  // Get filtered images based on selected category
  const filteredImages = useMemo(() => {
    if (galleryCategory === "all") {
      return Object.values(galleryImages).flat()
    }
    return galleryImages[galleryCategory as keyof typeof galleryImages] || []
  }, [galleryCategory])

  // Random image rotation
  useEffect(() => {
    if (filteredImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentGalleryImage((prev) => {
        const nextIndex = Math.floor(Math.random() * filteredImages.length)
        return nextIndex !== prev ? nextIndex : (nextIndex + 1) % filteredImages.length
      })
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [filteredImages])

  // Reset to first image when category changes
  useEffect(() => {
    setCurrentGalleryImage(0)
  }, [galleryCategory])

  // Ensure currentGalleryImage is within bounds
  useEffect(() => {
    if (currentGalleryImage >= filteredImages.length && filteredImages.length > 0) {
      setCurrentGalleryImage(0)
    }
  }, [filteredImages.length, currentGalleryImage])

  

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
      title: "Branding & Social Media Executive",
      bio: "Isabelle is a Branding & Social Media Executive who helps real estate consultants turn their expertise into influence, authority, and a consistent digital presence. \n\nIsabelle has a strong foundation in consumer behaviour, visual storytelling, and digital branding. Working behind the scenes with multiple realtors gave her firsthand insight into what resonates with property audiences, how realtors should position themselves, and how content can shape perception, trust, and client flow.\n\n Today, at KW Singapore, Isabelle leads content development across social platforms, consultant branding projects, and media-driven recruitment initiatives. From shaping brand identities to story-led campaigns, she strategises communication on media platforms that elevate the KW brand and empower consultants to grow their businesses with clarity and confidence.\n\n Beyond KW, Isabelle also supports Chief Media, helping to refine creative workflows, oversee vendor content quality, and build the structure that allows realtors to access professional-level media production. Her experience across both sides — agency-style content creation and in-house branding — gives her a unique perspective on what realtors actually need to stand out in a competitive digital landscape.\n\n Her work combines creativity, strategic thinking, and a deep understanding of digital behaviour — ensuring every piece of content drives clarity, trust, and meaningful engagement.",
      image: "/images/about-us/core-team/isabelle-lee.jpg",
    },
    {
      name: "Vanessa",
      title: "Realtor Recruitment and Growth",
      bio: "Vanessa is a pivotal force in KW Singapore's expansion, specialising in Realtor Recruitment and Growth. Her role is dedicated to identifying high-potential professionals and providing them with the platform, systems, and mentorship required to scale their business exponentially. \n\n Armed with a Bachelor of Science degree in Marketing and a minor in Communications from the Singapore University of Social Sciences (SUSS), Vanessa leverages her deep understanding of market positioning and targeted messaging to connect ambitious realtors with the unique wealth-building opportunities available at KW Singapore.\n\n She is instrumental in executing the company's aggressive growth goals, ensuring every new consultant onboarded aligns with the high-performance culture. Vanessa’s ability to bridge strategic marketing theory with hands-on recruitment execution makes her an invaluable asset in reinforcing KW Singapore's position as the leading choice for growth-minded realtors.\n\n In her personal time, Vanessa maintains a balance of precision and exploration. She enjoys the focused ritual of crafting matcha and coffee, the discipline of going to the gym, and expanding her perspective through travel.",
      image: "/images/about-us/core-team/Vanessa Chee.jpg",
    },
    {
      name: "Sheerra",
      title: "Operations and Admin Executive",
      bio: "Sheerra supports the growth and operations of Keller Williams Singapore through her role in realtor onboarding, tech support, and training coordination. With a strong background in business relations and administration, she ensures smooth processes and provides consistent support to help consultants perform at their best.\n\n Having honed her skills in realtor management, training coordination, and system support since 2021, Sheerra brings both precision and empathy to her work. Her deep familiarity with industry platforms such as KW Command, Datalabs, Powerkit, and CTOS enables her to guide consultants in adopting technology to enhance efficiency and productivity.",
      image: "/images/about-us/core-team/Sheera Bakivelu.jpg",
    },
    {
      name: "Suvarna",
      title: "Operations and Finance Executive",
      bio: "Suvarna supports the finance functions of Keller Williams Singapore through transaction handling and system coordination. She ensures smooth processes and accuracy in financial matters while assisting the team in maintaining efficient operations. With a background in Bachelor of Finance, she brings a strong understanding of financial principles and business processes, contributing to the team’s overall efficiency and reliability",
      image: "/images/about-us/core-team/Survana Bakivelu.jpeg",
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
      <section className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black to-gray-900 pt-20 sm:pt-20 md:pt-12">
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #000000 0%, rgba(66, 2, 2, 0.3) 40%, #111827 100%)",
            opacity: 0.9,
          }}
        />
        <div className="absolute inset-0 opacity-18">
          <svg viewBox="0 0 1440 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.10" />
              </linearGradient>
            </defs>
            <g stroke="url(#waveGradient)" strokeWidth="1" fill="none" opacity="0.2">
              {[200, 210, 220].map((y) => (
                <path key={`wave1-${y}`} d={`M0,${y} Q180,${y - 50} 360,${y} T720,${y} T1080,${y} T1440,${y}`} />
              ))}
              {[300, 310, 320].map((y) => (
                <path key={`wave2-${y}`} d={`M0,${y} Q200,${y - 50} 400,${y} T800,${y} T1200,${y} T1440,${y}`} />
              ))}
              {[400, 410, 420].map((y) => (
                <path key={`wave3-${y}`} d={`M0,${y} Q160,${y - 50} 320,${y} T640,${y} T960,${y} T1280,${y} T1440,${y}`} />
              ))}
              {[500, 510, 520].map((y) => (
                <path key={`wave4-${y}`} d={`M0,${y} Q220,${y - 50} 440,${y} T880,${y} T1320,${y} T1440,${y}`} />
              ))}
              {[600, 610, 620].map((y) => (
                <path key={`wave5-${y}`} d={`M0,${y} Q140,${y - 50} 280,${y} T560,${y} T840,${y} T1120,${y} T1440,${y}`} />
              ))}
            </g>
          </svg>
        </div>

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
      <section id="our-story" className="relative py-6 sm:py-12 bg-gradient-to-b from-gray-900 to-black">
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

      {/* Excellence. Celebrated. - Image Carousel */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-[#210101] to-black">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">Excellence. <span className="text-[#B40101]">Celebrated.</span></h2>
            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              A visual walk down the red carpet. See the grand celebration, recognition, and energy of our top performers
              as we honor the remarkable success built within the KW Singapore community.
            </p>
          </div>

          {/* Video Section */}
          <motion.div 
            className="relative w-full max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-800 shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/EFkqgHdxTb0?modestbranding=1&rel=0&showinfo=0&controls=1&fs=1&autoplay=1&mute=1&playsinline=1&loop=1&playlist=EFkqgHdxTb0"
                title="Excellence Celebrated"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Cards Display */}
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center perspective-1000">
              {celebrationImages.map((image, index) => {
                const position = (index - currentSlide + celebrationImages.length) % celebrationImages.length

                const isCenter = position === 0
                const isLeft1 = position === celebrationImages.length - 1
                const isLeft2 = position === celebrationImages.length - 2
                const isRight1 = position === 1
                const isRight2 = position === 2
                
                let transformStyle = ""
                let zIndex = 0
                let opacity = 0
                let gradientOverlay = ""
                
                if (isMobileView) {
                  if (isCenter) {
                    transformStyle = "translateX(0) scale(1)"
                    zIndex = 50
                    opacity = 1
                    gradientOverlay = ""
                  } else {
                    transformStyle = "translateX(0) scale(0.5)"
                    zIndex = 10
                    opacity = 0
                    gradientOverlay = ""
                  }
                } else {
                  if (isCenter) {
                    transformStyle = "translateX(0) scale(1.1) rotateY(0deg)"
                    zIndex = 50
                    opacity = 1
                    gradientOverlay = ""
                  } else if (isLeft1) {
                    transformStyle = "translateX(-80%) scale(0.9) rotateY(10deg)"
                    zIndex = 40
                    opacity = 0.7
                    gradientOverlay = "linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent)"
                  } else if (isLeft2) {
                    transformStyle = "translateX(-160%) scale(0.75) rotateY(20deg)"
                    zIndex = 30
                    opacity = 0.5
                    gradientOverlay = "linear-gradient(to right, rgba(0, 0, 0, 0.6), transparent 70%)"
                  } else if (isRight1) {

                    transformStyle = "translateX(80%) scale(0.9) rotateY(-10deg)"
                    zIndex = 40
                    opacity = 0.7
                    gradientOverlay = "linear-gradient(to left, rgba(0, 0, 0, 0.3), transparent)"
                  } else if (isRight2) {
                    transformStyle = "translateX(160%) scale(0.75) rotateY(-20deg)"
                    zIndex = 30
                    opacity = 0.5
                    gradientOverlay = "linear-gradient(to left, rgba(0, 0, 0, 0.6), transparent 70%)"
                  } else {
                    transformStyle = "translateX(0) scale(0.5)"
                    zIndex = 10
                    opacity = 0
                    gradientOverlay = ""
                  }
                }

                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-500 ease-out"
                    style={{
                      transform: transformStyle,
                      zIndex: zIndex,
                      opacity: opacity,
                      pointerEvents: isCenter ? "auto" : "none",
                    }}
                  >
                    <div className="relative w-[280px] md:w-[350px] h-[360px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt || `Celebration ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="350px"
                        unoptimized
                        priority={isCenter}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {gradientOverlay && (
                        <div 
                          className="absolute inset-0" 
                          style={{ background: gradientOverlay }}
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Combined Navigation Controls */}
            <div className="flex justify-center items-center gap-3 md:gap-6 mt-8 md:mt-12">
              <button
                onClick={prevSlide}
                className="bg-white/10 hover:bg-[#B40101] text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              
              {/* Indicator Dots */}
              <div className="flex justify-center gap-1.5 md:gap-2">
                {celebrationImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === index ? "w-6 md:w-8 h-1.5 md:h-2 bg-[#B40101]" : "w-1.5 md:w-2 h-1.5 md:h-2 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="bg-white/10 hover:bg-[#B40101] text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Growth */}
      <section className="relative py-12 sm:py-32 overflow-hidden bg-black">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: "linear-gradient(to bottom, #1a0000 0%, #000000 33%, #330000 66%, #000000 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1.5px, transparent 0)",
            backgroundSize: "30px 30px",
            backgroundPosition: "15px 15px",
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 2px, transparent 0)",
            backgroundSize: "40px 40px",
            backgroundPosition: "20px 20px",
            maskImage: "linear-gradient(to bottom right, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom right, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-sans text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            The Growth
          </motion.h2>
          <motion.p 
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-[#B40101]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            World-Class Training. Real-World Results.
          </motion.p>
          <motion.p 
            className="text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We are the strategic launchpad for real estate entrepreneurs. We are built to empower Singapore's top realtors through elite systems, technology, and training. Unlock your potential with comprehensive training, unmatched support systems, and a community of ambitious consultants committed to excellence.
          </motion.p>

          {/* Category Filter Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() => setGalleryCategory("all")}
              className={`px-4 py-2 text-sm rounded-full font-semibold transition-all duration-300 ${
                galleryCategory === "all"
                  ? "bg-[#B40101] text-white shadow-lg shadow-[#B40101]/30"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setGalleryCategory(category)}
                className={`px-4 py-2 text-sm rounded-full font-semibold transition-all duration-300 ${
                  galleryCategory === category
                    ? "bg-[#B40101] text-white shadow-lg shadow-[#B40101]/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Image Gallery Display */}
          <motion.div 
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-800 relative">
              <AnimatePresence mode="wait">
                {filteredImages.length > 0 && (
                  <motion.div
                    key={`${galleryCategory}-${currentGalleryImage}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={filteredImages[currentGalleryImage]?.src || "/placeholder.svg"}
                      alt={filteredImages[currentGalleryImage]?.alt || "Gallery Image"}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Image Counter */}
              {filteredImages.length > 0 && (
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                  {currentGalleryImage + 1} / {filteredImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Grid */}
            {filteredImages.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-6">
                {filteredImages.slice(0, 8).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentGalleryImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden relative transition-all duration-300 ${
                      currentGalleryImage === index
                        ? "ring-2 ring-[#B40101] scale-105"
                        : "opacity-60 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    {currentGalleryImage === index && (
                      <div className="absolute inset-0 bg-[#B40101]/20" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-32 bg-gradient-to-b from-black to-gray-900 pb-5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold text-white mb-8">Our Story</h2>
          <p className="text-white leading-relaxed max-w-3xl mx-auto text-lg mb-8">
            As the local embodiment of the world's largest real estate brand, we are built to empower Singapore's top
            realtors through elite systems, technology, and training.
          </p>
          <div className="w-24 h-1 bg-[#B40101] mx-auto"></div>
        </div>
      </section>

      

      {/* Meet the Core Team */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-8 text-white text-center leading-tight">
              Meet the Core Team
            </h2>
            <p className="text-lg text-white leading-relaxed max-w-4xl mx-auto text-left">
              Our leadership isn't just operational — it's transformational. Each core leader at KW Singapore is handpicked for domain expertise, business acumen, and a commitment to building a scalable, consultant-first ecosystem.
            </p>
          </div>
          {/* Main Featured Area */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            {/* Mobile: Image First, Desktop: Description First */}
            <div className="order-2 md:order-1">
              {/* Featured Member Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMember}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-3xl font-bold text-white">{teamMembers[selectedMember].name}</h3>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-white/90">{teamMembers[selectedMember].title}</h4>
                  </div>
                  <div className="pt-4">
                    <div className="h-60 overflow-y-auto pr-2 scrollbar-mini">
                      <p className="text-white/80 leading-relaxed text-base whitespace-pre-line">
                        {teamMembers[selectedMember].bio}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile: Image First, Desktop: Image Second */}
            <div className="relative w-[70%] mx-auto order-1 md:order-2">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[#B40101]/10 to-transparent">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedMember}
                    src={teamMembers[selectedMember].image || "/placeholder.svg"}
                    alt={teamMembers[selectedMember].name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full h-full object-cover object-top"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
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
                  <div className={`w-24 h-24 rounded-xl overflow-hidden bg-gray-800 transition-all duration-300 ${
                    selectedMember === index ? 'ring-2 ring-[#B40101] ring-offset-2 ring-offset-gray-900' : ''
                  }`}>
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className={`w-full h-full object-cover object-top transition-all duration-300 group-hover:scale-110 ${
                        selectedMember === index ? 'scale-105' : ''
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
              onClick={() => router.push("/join")}
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
