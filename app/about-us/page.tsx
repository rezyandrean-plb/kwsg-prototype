"use client"

import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Building2, Users, Award, Brain, Share2, Video, BarChart3, Target, Heart, Lightbulb, Users2, Briefcase, ChevronRight, ChevronLeft, ArrowLeft, Rocket, Download } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState, useEffect, useMemo, useRef } from "react"
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
  const prevVisibleImagesRef = useRef<Set<string>>(new Set())

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
    { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/excellence-celebrated/Excellence-01.jpg", alt: "KW Singapore Excellence Celebration - Award Winners" },
    { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/excellence-celebrated/Excellence-02.jpg", alt: "KW Singapore Excellence Celebration - Social Gathering" },
    { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/excellence-celebrated/Excellence-03.jpg", alt: "KW Singapore Excellence Celebration - Recognition Event" },
    { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/excellence-celebrated/Excellence-04.jpg", alt: "KW Singapore Excellence Celebration - Celebration Moment" },
    { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/excellence-celebrated/Excellence-05.jpg", alt: "KW Singapore Excellence Celebration - Group Photo" },
    { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/excellence-celebrated/Excellence-06.jpg", alt: "KW Singapore Excellence Celebration - Event Gathering" },
    { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/excellence-celebrated/Excellence-07.jpg", alt: "KW Singapore Excellence Celebration - Award Presentation" },
    { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/excellence-celebrated/Excellence-08.jpg", alt: "KW Singapore Excellence Celebration - Celebration" },
    { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/excellence-celebrated/Excellence-09.jpg", alt: "KW Singapore Excellence Celebration - Social Event" },
    { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/excellence-celebrated/Excellence-10.jpg", alt: "KW Singapore Excellence Celebration - Recognition" },
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
    "Realtor Branding Workshop": [
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/realtor-branding/rb09-DSC04813.jpg", alt: "Branding Workshop 1" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/realtor-branding/rb09-DSC04825.jpg", alt: "Branding Workshop 2" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/realtor-branding/rb09-DSC04919.jpg", alt: "Branding Workshop 3" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/realtor-branding/rb09-DSC05077.jpg", alt: "Branding Workshop 4" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/realtor-branding/rb09-DSC05166.jpg", alt: "Branding Workshop 5" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/realtor-branding/rb09-DSC05177.jpg", alt: "Branding Workshop 6" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/realtor-branding/rb09-DSC05180.jpg", alt: "Branding Workshop 7" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/realtor-branding/rb09-DSC05236.jpg", alt: "Branding Workshop 8" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/realtor-branding/rb09-DSC05319.jpg", alt: "Branding Workshop 9" },
    ],
    "Multiplier Training": [
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/training-gallery/MT_01.jpg", alt: "Training Session 1" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/training-gallery/MT_02.jpg", alt: "Training Session 2" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/training-gallery/MT_03.jpg", alt: "Training Session 3" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/training-gallery/MT_04.jpg", alt: "Training Session 4" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/training-gallery/MT_05.jpg", alt: "Training Session 5" },
    ],
    "MREA Masterclass": [
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MREA/MREA_DSC05815.jpg", alt: "MREA Event 1" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MREA/MREA_DSC05873.jpg", alt: "MREA Event 2" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MREA/MREA_DSC05914.jpg", alt: "MREA Event 3" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MREA/MREA_DSC06539.jpg", alt: "MREA Event 4" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MREA/MREA_DSC07162.jpg", alt: "MREA Event 5" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MREA/MREA_DSC07169.jpg", alt: "MREA Event 6" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MREA/MREA_DSC07172.jpg", alt: "MREA Event 7" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MREA/MREA_DSC07223.jpg", alt: "MREA Event 8" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MREA/MREA_DSC07258.jpg", alt: "MREA Event 9" },
    ],
    "MEGA Realtor Summit": [
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MRS/KW Mega Summit 011.jpg", alt: "KW Mega Summit 1" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MRS/KW Mega Summit 019.jpg", alt: "KW Mega Summit 2" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MRS/KW Mega Summit 032.jpg", alt: "KW Mega Summit 3" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MRS/KW Mega Summit 046.jpg", alt: "KW Mega Summit 4" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MRS/KW Mega Summit 062.jpg", alt: "KW Mega Summit 5" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MRS/KW Mega Summit 070.jpg", alt: "KW Mega Summit 6" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MRS/KW Mega Summit 083.jpg", alt: "KW Mega Summit 7" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MRS/KW Mega Summit 103.jpg", alt: "KW Mega Summit 8" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/MRS/KW Mega Summit 126.jpg", alt: "KW Mega Summit 9" },
    ],
    "KW Pod": [
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/Podcast/Podcast_IMG_1038.jpg", alt: "KW Pod 1" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/Podcast/Podcast_IMG_1057.jpg", alt: "KW Pod 2" },
      { src: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/Podcast/Podcast_IMG_1085.jpg", alt: "KW Pod 3" },
    ],
  }

  const categories = [
    "Realtor Branding Workshop",
    "Multiplier Training",
    "MREA Masterclass",
    "MEGA Realtor Summit",
    "KW Pod"
  ]

  // Get filtered images based on selected category
  const filteredImages = useMemo(() => {
    if (galleryCategory === "all") {
      // Select balanced images from each category, filling to 12 images
      const selectedImages: Array<{ src: string; alt: string }> = []
      
      // Realtor Branding Workshop: 9 images → select 3 (evenly spaced: 1st, 4th, 7th)
      const brandingImages = galleryImages["Realtor Branding Workshop"]
      if (brandingImages.length >= 7) {
        selectedImages.push(brandingImages[0], brandingImages[3], brandingImages[6])
      } else if (brandingImages.length > 0) {
        selectedImages.push(...brandingImages.slice(0, Math.min(3, brandingImages.length)))
      }
      
      // Multiplier Training: 5 images → select 2 (1st, 4th)
      const trainingImages = galleryImages["Multiplier Training"]
      if (trainingImages.length >= 4) {
        selectedImages.push(trainingImages[0], trainingImages[3])
      } else if (trainingImages.length > 0) {
        selectedImages.push(...trainingImages.slice(0, Math.min(2, trainingImages.length)))
      }
      
      // MREA Masterclass: 9 images → select 3 (1st, 4th, 7th)
      const mreaImages = galleryImages["MREA Masterclass"]
      if (mreaImages.length >= 7) {
        selectedImages.push(mreaImages[0], mreaImages[3], mreaImages[6])
      } else if (mreaImages.length > 0) {
        selectedImages.push(...mreaImages.slice(0, Math.min(3, mreaImages.length)))
      }
      
      // MEGA Realtor Summit: 9 images → select 3 (1st, 4th, 7th)
      const mrsImages = galleryImages["MEGA Realtor Summit"]
      if (mrsImages.length >= 7) {
        selectedImages.push(mrsImages[0], mrsImages[3], mrsImages[6])
      } else if (mrsImages.length > 0) {
        selectedImages.push(...mrsImages.slice(0, Math.min(3, mrsImages.length)))
      }
      
      // KW Pod: 3 images → select 1 (1st)
      const podcastImages = galleryImages["KW Pod"]
      if (podcastImages.length > 0) {
        selectedImages.push(podcastImages[0])
      }
      
      // Fill remaining slots (if less than 12) by adding more from larger categories
      if (selectedImages.length < 12) {
        const remaining = 12 - selectedImages.length
        
        // Add more from Realtor Branding Workshop if available
        if (brandingImages.length > 3 && remaining > 0) {
          const additional = brandingImages.filter(img => !selectedImages.includes(img)).slice(0, Math.min(remaining, 2))
          selectedImages.push(...additional)
        }
        
        // Add more from MREA if still need more
        if (selectedImages.length < 12 && mreaImages.length > 3) {
          const remaining2 = 12 - selectedImages.length
          const additional = mreaImages.filter(img => !selectedImages.includes(img)).slice(0, Math.min(remaining2, 2))
          selectedImages.push(...additional)
        }
        
        // Add more from MRS if still need more
        if (selectedImages.length < 12 && mrsImages.length > 3) {
          const remaining3 = 12 - selectedImages.length
          const additional = mrsImages.filter(img => !selectedImages.includes(img)).slice(0, Math.min(remaining3, 2))
          selectedImages.push(...additional)
        }
        
        // Add more from Multiplier Training if still need more
        if (selectedImages.length < 12 && trainingImages.length > 2) {
          const remaining4 = 12 - selectedImages.length
          const additional = trainingImages.filter(img => !selectedImages.includes(img)).slice(0, Math.min(remaining4, 1))
          selectedImages.push(...additional)
        }
        
        // Add more from KW Pod if still need more
        if (selectedImages.length < 12 && podcastImages.length > 1) {
          const remaining5 = 12 - selectedImages.length
          const additional = podcastImages.filter(img => !selectedImages.includes(img)).slice(0, Math.min(remaining5, 1))
          selectedImages.push(...additional)
        }
      }
      
      return selectedImages.slice(0, 12) // Ensure max 12 images
    }
    return galleryImages[galleryCategory as keyof typeof galleryImages] || []
  }, [galleryCategory])

  // Track visible images to avoid re-animating those that remain
  useEffect(() => {
    prevVisibleImagesRef.current = new Set(filteredImages.map((img) => img.src))
  }, [filteredImages])

  const teamMembers = [
    {
      name: "Melvin Lim",
      title: "Founder & Operating Principal",
      bio: "Melvin Lim is the Founder and Operating Principal of KW Singapore, where he stands at the forefront of a transformative movement in Singapore's real estate landscape. As the driving force behind this venture, Melvin brings a unique combination of visionary leadership, deep industry insight, and an extensive professional network, positioning KW Singapore as a new benchmark for excellence, collaboration, and innovation in real estate.\n\nWidely regarded as one of Singapore's most influential real estate leaders, Melvin is also the Co-Founder of PLB Realty and PLB Media—trailblazing companies that revolutionised the way properties are marketed and experienced. With a background in banking and finance, Melvin blends strategic financial acumen with a deep understanding of digital storytelling, data-driven marketing, and consumer psychology. Under his leadership, PropertyLimBrothers has grown into one of the most recognised and respected property content brands in the country.\n\nAt KW Singapore, Melvin leverages over a decade of entrepreneurial success to cultivate a new generation of high-performing real estate professionals, anchored by the KW values of integrity, innovation, and collaboration. His mission is to empower agents with the tools, training, and culture they need to thrive in a rapidly evolving industry.\n\nOutside of his professional achievements, Melvin is a devoted family man who enjoys quality time with his wife, their four children, and their beloved dog, Oreo.",
      image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/core-team/melvin-lim-professional.webp",
    },
    {
      name: "Grayce Tan",
      title: "Director of Growth",
      bio: "As Director of Growth at KW Singapore, Grayce works closely with Melvin Lim and the core team in building the company from the ground up — shaping the strategic vision, assembling the founding team, and laying the operational groundwork to scale a next-generation real estate organisation. Her focus is not just on growth, but on building a company culture defined by empowered agents, shared leadership, and a deep commitment to long-term business success.\n\nGrayce's leadership experience is shaped by her years at PropertyLimBrothers, where she serves as Vice President of Strategy. There, she established and led the Strategic Business Growth unit, while building the Business Development, Marketing, and Editorial departments. She played a pivotal role in driving cross-functional initiatives that scaled content production, strengthened salesforce enablement, and deepened media and developer partnerships — all while fostering a collaborative, performance-driven team environment.\n\nWith a deep-rooted passion for coaching, learning, and self-development, Grayce brings a multidisciplinary lens to her work. Her academic background spans Sociology, Educational Pedagogy, and Real Estate Investment — reflecting her lifelong curiosity about how people think, grow, and connect. A voracious reader and critical thinker, Grayce thrives on exploring ideas across disciplines and translating them into meaningful strategies for business and team development. This commitment to learning and service continues to define her approach as she helps lead the transformative movement in Singapore's real estate landscape through KW Singapore.",
      image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/core-team/grayce-tan-professional.webp",
    },
    {
      name: "Wayne Tang",
      title: "Key Executive Officer (KEO) and Agency Coach",
      bio: "Wayne Tang is the Key Executive Officer (KEO) and Agency Coach of KW Singapore, where he plays a pivotal role in safeguarding professional standards while shaping the next chapter of the company’s growth. As KEO — one of the most critical appointments in Singapore’s real estate agency framework — Wayne sits at the intersection of governance, culture, and performance. He is responsible for upholding regulatory compliance, strengthening operational discipline, and ensuring that KW Singapore’s realtors serve clients with integrity, transparency, and professionalism.\n\nWith more than a decade of experience across consumer electronics and real estate marketing, Wayne brings a rare blend of commercial sharpness and operational rigour. His background spans brand-building, go-to-market strategy, and sales enablement, giving him a deep appreciation for both the front-line realities realtors face and the systems required to support them. Having led teams in fast-paced, highly competitive environments, he is no stranger to corporate governance, risk management, and the frameworks needed to scale a modern real estate organisation responsibly.\n\nAt KW Singapore, Wayne’s dual role as KEO and Agency Coach allows him to go beyond oversight and into active partnership with realtors. He designs and drives coaching programmes that equip consultants with the mindset, skills, and systems to thrive — from ethical decision-making and client advisory frameworks, to prospecting structure, pipeline management, and team collaboration. To Wayne, coaching is not just about hitting numbers; it is about building trusted professionals who can communicate clearly, think critically, and create long-term value for their clients and teams.\n\nWorking closely with Founder and Operating Principal Melvin Lim and the leadership team, Wayne plays a key role in aligning KW Singapore’s governance standards with its growth ambitions. He is deeply committed to building an agency where high performance is matched by high integrity, and where realtors are empowered not only to succeed in their careers, but to do so with clarity, confidence, and purpose.",
      image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/core-team/Wayne_Photo.jpg",
    },
    {
      name: "Joanne Ong",
      title: "Regional Operations & Success Manager",
      bio: "Joanne Ong joins KW Singapore as our new Operations Manager, bringing extensive experience in building high-performing, systems-driven real estate teams. As the co-founder of Jdot Property (Mega Team), she was instrumental in developing collaborative and results-oriented strategies, contributing to over RM110 million in closed gross development value.\n\nA former litigation lawyer and entrepreneur, Joanne pivoted to real estate in 2020. Inspired by the KW Mega Agent team model, she leveraged her strengths in systems, operations, and team development to build Jdot Property, earning recognition as a KW Worldwide Top 100 agent in 2024. Her expertise in operational excellence and commitment to teamwork perfectly align with KW Singapore's mission.",
      image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/core-team/Joanne Ong.jpg",
    },
    {
      name: "Siew Min Choong",
      title: "Regional Tech Trainer",
      bio: "Siew Min champions the technological empowerment of KW consultants in Singapore. Leveraging her deep expertise in digital marketing and project management, she transforms KW's cutting-edge tools into decisive business advantages.\n\nA pivotal figure since joining the KW ecosystem in 2019, Siew Min has significantly influenced the evolution of KW's proprietary technology. Her critical involvement in Command Labs, a global initiative, ensured KW Command was developed and optimized to meet the real-world needs of consultants.\n\nIn her role at KW Singapore, Siew Min drives tech enablement and adoption. She empowers consultants and their teams to fully leverage KW Command, streamlining operations and scaling their businesses with unparalleled precision. With over a decade of experience, Siew Min consistently bridges the gap between innovation and execution, ensuring KW remains at the forefront by empowering its consultants with the best in real estate technology.",
      image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/core-team/Siew Min.jpg",
    },
    {
      name: "Isabelle",
      title: "Branding & Social Media Executive",
      bio: "Isabelle is a Branding & Social Media Executive who helps real estate consultants turn their expertise into influence, authority, and a consistent digital presence. \n\nIsabelle has a strong foundation in consumer behaviour, visual storytelling, and digital branding. Working behind the scenes with multiple realtors gave her firsthand insight into what resonates with property audiences, how realtors should position themselves, and how content can shape perception, trust, and client flow.\n\n Today, at KW Singapore, Isabelle leads content development across social platforms, consultant branding projects, and media-driven recruitment initiatives. From shaping brand identities to story-led campaigns, she strategises communication on media platforms that elevate the KW brand and empower consultants to grow their businesses with clarity and confidence.\n\n Beyond KW, Isabelle also supports Chief Media, helping to refine creative workflows, oversee vendor content quality, and build the structure that allows realtors to access professional-level media production. Her experience across both sides — agency-style content creation and in-house branding — gives her a unique perspective on what realtors actually need to stand out in a competitive digital landscape.\n\n Her work combines creativity, strategic thinking, and a deep understanding of digital behaviour — ensuring every piece of content drives clarity, trust, and meaningful engagement.",
      image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/core-team/Isabelle Lee.jpg",
    },
    {
      name: "Vanessa",
      title: "Realtor Recruitment and Growth",
      bio: "Vanessa is a pivotal force in KW Singapore's expansion, specialising in Realtor Recruitment and Growth. Her role is dedicated to identifying high-potential professionals and providing them with the platform, systems, and mentorship required to scale their business exponentially. \n\n Armed with a Bachelor of Science degree in Marketing and a minor in Communications from the Singapore University of Social Sciences (SUSS), Vanessa leverages her deep understanding of market positioning and targeted messaging to connect ambitious realtors with the unique wealth-building opportunities available at KW Singapore.\n\n She is instrumental in executing the company's aggressive growth goals, ensuring every new consultant onboarded aligns with the high-performance culture. Vanessa’s ability to bridge strategic marketing theory with hands-on recruitment execution makes her an invaluable asset in reinforcing KW Singapore's position as the leading choice for growth-minded realtors.\n\n In her personal time, Vanessa maintains a balance of precision and exploration. She enjoys the focused ritual of crafting matcha and coffee, the discipline of going to the gym, and expanding her perspective through travel.",
      image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/core-team/Vanessa Chee.jpg",
    },
    {
      name: "Sheerra",
      title: "Operations and Admin Executive",
      bio: "Sheerra supports the growth and operations of Keller Williams Singapore through her role in realtor onboarding, tech support, and training coordination. With a strong background in business relations and administration, she ensures smooth processes and provides consistent support to help consultants perform at their best.\n\n Having honed her skills in realtor management, training coordination, and system support since 2021, Sheerra brings both precision and empathy to her work. Her deep familiarity with industry platforms such as KW Command, Datalabs, Powerkit, and CTOS enables her to guide consultants in adopting technology to enhance efficiency and productivity.",
      image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/core-team/Sheera Bakivelu.jpg",
    },
    {
      name: "Suvarna",
      title: "Operations and Finance Executive",
      bio: "Suvarna supports the finance functions of Keller Williams Singapore through transaction handling and system coordination. She ensures smooth processes and accuracy in financial matters while assisting the team in maintaining efficient operations. With a background in Bachelor of Finance, she brings a strong understanding of financial principles and business processes, contributing to the team’s overall efficiency and reliability",
      image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/core-team/Survana Bakivelu.jpeg",
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
      <section className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[40vh] lg:min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black to-gray-900 pt-12 sm:pt-12 md:pt-16 pb-4 sm:pb-8 md:pb-6 lg:pt-8 lg:pb-12">

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-4 sm:pt-6 md:pt-12 lg:pt-12">
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
            className="text-white/90 max-w-4xl mx-auto leading-relaxed text-base md:text-lg lg:text-xl"
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
                className="text-3xl font-bold text-white mb-6 md:text-4xl lg:text-5xl leading-tight"
            initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Inside KW: <br/><span className="text-[#B40101]">The Real Story</span>
              </motion.h2>
          <motion.p 
                className="text-white/90 leading-relaxed text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Beyond the transactions is a movement. Dive into our community, explore our core values, and see the <strong>Life at KW</strong> that agents are building—in their business, and their lives. 
                <br/><br/>
                See the journey and the celebration and hear it straight from the source.
              </motion.p>
            </motion.div>

            {/* Right Side - YouTube Video */}
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Excellence. Celebrated. - Image Carousel */}
      <section className="relative pt-12 pb-6 overflow-hidden bg-gradient-to-b from-black via-[#210101] to-black">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">Excellence. <span className="text-[#B40101]">Celebrated.</span></h2>
            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              A visual walk down the red carpet. See the grand celebration, recognition, and energy of our top performers
              as we honor the remarkable success built within the KW Singapore community.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto pb-6">
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
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
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
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
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
          
        </div>
      </section>

      {/* The Growth */}
      <section className="relative py-12 sm:py-12 overflow-hidden bg-black">
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
        <div className="relative z-10 w-full px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
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
              World-Class Training. <br className="block md:hidden" />Real-World Results.
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
          </div>

          {/* Category Filter Buttons */}
          <motion.div 
            className="flex flex-nowrap gap-3 mb-8 pb-2 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center lg:overflow-visible lg:flex-wrap lg:justify-center scrollbar-mini"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() => setGalleryCategory("all")}
              className={`px-4 py-2 text-sm rounded-full font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
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
                className={`px-4 py-2 text-sm rounded-full font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  galleryCategory === category
                    ? "bg-[#B40101] text-white shadow-lg shadow-[#B40101]/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Image Gallery Display - randomized mosaic */}
          <motion.div
            className="w-full max-w-none px-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {galleryCategory === "KW Pod" ? (
              <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl">
                  {filteredImages.map((image, index) => {
                    const isNew = !prevVisibleImagesRef.current.has(image.src)
                    return (
                      <motion.div
                        key={`${galleryCategory}-${index}-${image.src}`}
                        initial={isNew ? { opacity: 0, y: 12, scale: 0.98 } : undefined}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={isNew ? { duration: 0.45, ease: "easeOut" } : { duration: 0.2 }}
                        whileHover={{ scale: 1.025 }}
                        className="relative overflow-hidden rounded-lg bg-gray-800 shadow-sm shadow-black/10"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-auto object-cover transition-transform duration-400 ease-out hover:scale-102"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ) : galleryCategory === "Multiplier Training" ? (
              <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 flex justify-center">
                <div className="flex justify-center">
                  <div
                    className="columns-4 sm:columns-5 md:columns-6 lg:columns-6 xl:columns-5 gap-3 md:gap-3 [column-fill:_balance]"
                    style={{ columnWidth: "120px", columnGap: "14px" }}
                  >
                    {filteredImages.map((image, index) => {
                      const isNew = !prevVisibleImagesRef.current.has(image.src)
                      return (
                      <motion.div
                        key={`${galleryCategory}-${index}-${image.src}`}
                        initial={isNew ? { opacity: 0, y: 12, scale: 0.98 } : undefined}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={isNew ? { duration: 0.45, ease: "easeOut" } : { duration: 0.2 }}
                        whileHover={{ scale: 1.025 }}
                        className="mb-1.5 md:mb-2 break-inside-avoid relative overflow-hidden rounded-lg bg-gray-800 shadow-sm shadow-black/10"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-auto object-cover transition-transform duration-400 ease-out hover:scale-102"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : galleryCategory === "Realtor Branding Workshop" ? (
              <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 flex justify-center">
                <div className="flex justify-center">
                  <div
                    className="columns-4 sm:columns-5 md:columns-6 lg:columns-6 xl:columns-5 gap-3 md:gap-3 [column-fill:_balance]"
                    style={{ columnWidth: "120px", columnGap: "14px" }}
                  >
                    {filteredImages.map((image, index) => {
                      const isNew = !prevVisibleImagesRef.current.has(image.src)
                      return (
                      <motion.div
                        key={`${galleryCategory}-${index}-${image.src}`}
                        initial={isNew ? { opacity: 0, y: 12, scale: 0.98 } : undefined}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={isNew ? { duration: 0.45, ease: "easeOut" } : { duration: 0.2 }}
                        whileHover={{ scale: 1.025 }}
                        className="mb-1.5 md:mb-2 break-inside-avoid relative overflow-hidden rounded-lg bg-gray-800 shadow-sm shadow-black/10"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-auto object-cover transition-transform duration-400 ease-out hover:scale-102"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 flex justify-center">
                <div
                  className="columns-4 sm:columns-5 md:columns-6 lg:columns-6 xl:columns-6 gap-3 md:gap-3 [column-fill:_balance] inline-block"
                  style={{ columnWidth: "120px", columnGap: "14px" }}
                >
                  {filteredImages.map((image, index) => {
                    const isNew = !prevVisibleImagesRef.current.has(image.src)
                    return (
                    <motion.div
                      key={`${galleryCategory}-${index}-${image.src}`}
                      initial={isNew ? { opacity: 0, y: 12, scale: 0.98 } : undefined}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={isNew ? { duration: 0.45, ease: "easeOut" } : { duration: 0.2 }}
                      whileHover={{ scale: 1.025 }}
                      className="mb-1.5 md:mb-2 break-inside-avoid relative overflow-hidden rounded-lg bg-gray-800 shadow-sm shadow-black/10"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto object-cover transition-transform duration-400 ease-out hover:scale-102"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* The Weekly Edge */}
      <section className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B40101]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#B40101]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl">
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-start lg:items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                    The Weekly <span className="text-[#B40101]">Edge</span>
                  </h2>
                  <h3 className="text-xl sm:text-2xl font-medium text-white/80 mb-6">
                    Constant Momentum. <br className="block sm:hidden" />Life at KW.
                  </h3>
                  <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl">
                    Beyond the events and celebrations, our culture of performance and innovation is constant. Every week, we
                    package exclusive mastery sessions, tech deep dives, and founder insights to ensure our consultants stay ahead.
                    <br/><br/>
                    This weekly rhythm provides proof of life and ensures the strategic intersection of performance, consulting, and innovation continues outside the training room.
                  </p>
                </motion.div>
              </div>
              
              {/* Newsletter Section */}
              <div className="w-full flex items-center justify-end">
                <div className="flex flex-col gap-3 w-full max-w-sm h-[248px] overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-transparent">
                {[
                  { date: "29/12/2025 – 2/1/2026", url: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/newsletter/december-2025/31/Newsletter+Dec+31.pdf" },
                  { date: "22/12/2025 – 26/12/2025", url: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/newsletter/december-2025/24/Newsletter+Dec+24.pdf" },
                  { date: "15/12/2025 – 19/12/2025", url: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/newsletter/december-2025/10/Newsletter+Dec+16.pdf" },
                  { date: "8/12/2025 – 12/12/2025", url: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/newsletter/december-2025/10/Newsletter+Dec+10.pdf" },
                  { date: "1/12/2025 – 7/12/2025", url: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/newsletter/december-2025/3/Newsletter+Dec+3.pdf" },
                  { date: "24/11/2025 – 28/11/2025", url: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/newsletter/november-2025/26/Newsletter+Nov+26.pdf" },
                  { date: "17/11/2025 – 21/11/2025", url: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/newsletter/november-2025/24/Updated+Newsletter+Nov+24.pdf" },
                ].map((newsletter, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="w-full max-w-sm flex-shrink-0"
                  >
                    <a href={newsletter.url} target="_blank" rel="noopener noreferrer" className="block group">
                      <div className="bg-gradient-to-br from-[#B40101] to-red-700 p-0.5 rounded-xl transition-transform duration-300 group-hover:scale-[1.02] shadow-lg shadow-red-900/20 max-w-xs lg:ml-auto">
                        <div className="bg-black/90 rounded-[10px] p-3 h-full flex items-center gap-3 group-hover:bg-black/80 transition-colors duration-300">
                          <div>
                            <p className="text-white text-sm font-bold mb-0 group-hover:text-[#B40101] transition-colors whitespace-nowrap">
                              {newsletter.date} Newsletter
                            </p>
                          </div>
                          <div className="ml-auto">
                            <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </motion.div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-16 md:py-12 bg-gradient-to-b from-black to-gray-900 pb-5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">Our Story</h2>
          <p className="text-white leading-relaxed max-w-3xl mx-auto text-lg mb-8">
            As the local embodiment of the world's largest real estate brand, we are built to empower Singapore's top
            realtors through elite systems, technology, and training.
          </p>
          <div className="w-24 h-1 bg-[#B40101] mx-auto"></div>
        </div>
      </section>

      

      {/* Meet the Core Team */}
      <section className="relative pt-16 pb-32 md:py-12 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#B40101]/20 via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Meet the <span className="text-[#B40101]">Core Team</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              Our leadership isn't just operational — it's transformational. Each core leader at KW Singapore is handpicked for domain expertise, business acumen, and a commitment to building a scalable, consultant-first ecosystem.
            </p>
          </div>
          
          {/* Main Featured Area */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start mb-24">
            {/* Mobile: Image First, Desktop: Description First */}
            <div className="order-2 md:order-1 md:col-span-7 flex flex-col justify-center h-full">
              {/* Featured Member Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMember}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{teamMembers[selectedMember].name}</h3>
                    <div className="h-1 w-20 bg-[#B40101] rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl lg:text-2xl font-medium text-[#B40101]">{teamMembers[selectedMember].title}</h4>
                  </div>
                  <div className="relative">
                    <div className="max-h-[400px] overflow-y-auto pr-4 scrollbar-mini">
                      <p className="text-white/80 leading-relaxed text-sm md:text-base lg:text-lg whitespace-pre-line">
                        {teamMembers[selectedMember].bio}
                      </p>
                    </div>
                    {/* Fade at bottom of scroll area if needed, though max-h handles it */}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile: Image First, Desktop: Image Second */}
            <div className="order-1 md:order-2 md:col-span-5 relative">
              <div className="relative aspect-[3/4] w-[80%] md:w-full max-w-[280px] md:max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-[#B40101]/10 border border-white/5 bg-gradient-to-br from-[#B40101]/20 to-gray-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedMember}
                    src={teamMembers[selectedMember].image || "/placeholder.svg"}
                    alt={teamMembers[selectedMember].name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full object-cover object-top"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Team Member Thumbnails */}
          <div className="relative">
            <div className="flex justify-start md:justify-center gap-3 overflow-x-auto pb-6 px-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent md:scrollbar-hide">
              {teamMembers.map((member, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMember(index)}
                  className="flex-shrink-0 relative group transition-all duration-300 focus:outline-none"
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedMember === index 
                      ? 'border-[#B40101] scale-105 shadow-lg shadow-[#B40101]/30' 
                      : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                  }`}>
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Be Part of the Winning Team */}
      <section className="relative py-12 sm:py-32">
        <div className="absolute inset-0 bg-[url('https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/about-us/about-us-section-3.webp')] bg-cover bg-center" />
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