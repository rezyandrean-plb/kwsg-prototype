"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"


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

interface Recipient {
  id: number
  name?: string
  title?: string
  image: string
}

interface AwardCategory {
  id: number
  title: string
  description: string
  recipients: Recipient[]
}

interface AwardsGridProps {
  categories?: AwardCategory[]
}

const defaultCategories: AwardCategory[] = [
  {
    id: 15,
    title: "Rainmaker MREA Millionaire Award",
    description: "TBC",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/rainmaker-mrea-millionaire/1.jpg" },
        { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/rainmaker-mrea-millionaire/2.jpg" },
    ],
  },
  {
    id: 14,
    title: "MREA Millionaire In The Making",
    description:
      "In recognition of your commitment to building wealth through real estate and demonstrating the potential to achieve millionaire status.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/millionaire-in-the-maker/1.jpg" },
        { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/millionaire-in-the-maker/2.jpg" },
        { id: 3, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/millionaire-in-the-maker/3.jpg" }
    ],
  },
  {
    id: 13,
    title: "TOP 20 Producers",
    description:
      "In recognition of ranking among the top 20 highest-performing agents in overall production and GCI this quarter.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/1.jpg" },
        { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/2.jpg" },
        { id: 3, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/3.jpg" },
        { id: 4, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/4.jpg" },
        { id: 5, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/5.jpg" },
        { id: 6, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/6.jpg" },
        { id: 7, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/7.jpg" },
        { id: 8, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/8.jpg" },
        { id: 9, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/9.jpg" },
        { id: 10, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/10.jpg" },
        { id: 11, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/11.jpg" },
        { id: 12, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/12.jpg" },
        { id: 13, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/13.jpg" },
        { id: 14, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/14.jpg" },
        { id: 15, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/15.jpg" },
        { id: 16, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/16.jpg" },
        { id: 17, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/17.jpg" },
        { id: 18, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/18.jpg" },
        { id: 19, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/19.jpg" },
        { id: 20, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-20-producers/20.jpg" },
    ],
  },
  {
    id: 12,
    title: "The Rainmaker Consultant Award",
    description:
      "In recognition of generating exceptional revenue and consistently bringing in high-value transactions.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/rainmaker-millionaire-award/1.jpg" },
        { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/rainmaker-millionaire-award/2.jpg" },
    ],
  },
  {
    id: 11,
    title: "The SuperStar Realtor Award",
    description: "In recognition of your exceptional GCI sales achievement for the quarter.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/superstar-realtor-award/1.jpg" },
        { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/superstar-realtor-award/2.jpg" },
    ],
  },
  {
    id: 10,
    title: "THE Achiever Award",
    description: "In recognition of your excellent sales performance and GCI achievement this quarter.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/1.jpg" },
        { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/2.jpg" },
        { id: 3, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/3.jpg" },
        { id: 4, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/4.jpg" },
        { id: 5, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/5.jpg" },
        { id: 6, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/6.jpg" },
        { id: 7, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/7.jpg" },
        { id: 8, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/8.jpg" },
        { id: 9, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/9.jpg" },
        { id: 10, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/10.jpg" },
        { id: 11, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/11.jpg" },
        { id: 12, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/12.jpg" },
        { id: 13, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/13.jpg" },
        { id: 14, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/the-achiever-award/14.jpg" }
    ],
  },
  {
    id: 9,
    title: "TOP Manager",
    description:
      "In recognition of exceptional leadership, team development, and outstanding management performance this quarter.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-manager/1.jpg" },
        { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-manager/2.jpg" },
        { id: 3, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-manager/3.jpg" },
    ],
  },
  {
    id: 8,
    title: "TOP Rookie",
    description:
      "In recognition of achieving the highest transacted GCI among all the new RES Associates in your first year with KW Singapore.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/top-rookie/1.jpg" },
    ],
  },
  {
    id: 7,
    title: "Consultant Achievement Award",
    description:
      "In recognition of your accelerated performance and achieving promotion to the 90% commission tier this quarter.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/consultant-achievement-award/1.jpg" },
    ],
  },
  {
    id: 6,
    title: "TOP Project Specialist",
    description:
      "In recognition of your outstanding success in New Launch Project Sales, achieving the highest GCI through expert analysis and successful client advisory.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/project-specialist/1.jpg" },
        { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/project-specialist/2.jpg" },
        { id: 3, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/project-specialist/3.jpg" },
        { id: 4, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/project-specialist/4.jpg" },
        { id: 5, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/project-specialist/5.jpg" },
    ],
  },
  {
    id: 5,
    title: "TOP Growth Share Evangelist",
    description:
      "In recognition of the commitment to sharing the KW Model and Value, evidenced by the highest number of new associates joining KW Singapore this quarter.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/growth-share-evangelist/1.jpg" },
        { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/growth-share-evangelist/2.jpg" },
        { id: 3, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/growth-share-evangelist/3.jpg" },
    ],
  },
  {
    id: 4,
    title: "TOP Private Property Transactors",
    description:
      "In recognition of the Market Dominance in Private Resale (Condo, Apartment) Sales & Purchase, achieving top transaction volume in this premium segment.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/private-property-transactors/1.jpg" },
        { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/private-property-transactors/2.jpg" },
        { id: 3, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/private-property-transactors/3.jpg" },
        { id: 4, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/private-property-transactors/4.jpg" },
        { id: 5, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/private-property-transactors/5.jpg" },
    ],
  },
  {
    id: 3,
    title: "TOP HDB Transactors",
    description:
      "In recognition of your exceptional performance as an HDB Volume Leader, driving high-frequency transactions in HDB Sales & Purchase.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/hdb-transactors/1.jpg" },
        { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/hdb-transactors/2.jpg" },
        { id: 3, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/hdb-transactors/3.jpg" },
        { id: 4, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/hdb-transactors/4.jpg" },
        { id: 5, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/hdb-transactors/5.jpg" },
    ],
  },
  {
    id: 2,
    title: "TOP Leasing Transactors",
    description:
      "In recognition of the outstanding Leasing Velocity, successfully closing the highest number of Residential & Commercial rental transactions.",
    recipients: [
        { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/leasing-transactors/1.jpg" },
        { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/leasing-transactors/2.jpg" },
        { id: 3, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/leasing-transactors/3.jpg" },
        { id: 4, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/leasing-transactors/4.jpg" },
        { id: 5, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/leasing-transactors/5.jpg" },
    ],
  },
  {
    id: 1,
    title: "TOP Exclusive Listers",
    description:
      "In recognition of securing the highest number of exclusive seller listings and demonstrating exceptional seller trust.",
    recipients: [
      { id: 1, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/executive-lister/1.jpg" },
      { id: 2, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/executive-lister/2.jpg" },
      { id: 3, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/executive-lister/3.jpg" },
      { id: 4, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/executive-lister/4.jpg" },
      { id: 5, image: "https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/awards/executive-lister/5.jpg" },
    ],
  },
]

export function AwardsGrid({ categories = defaultCategories }: AwardsGridProps) {
  return (
    <motion.section className="py-20 px-6 bg-background" initial="hidden" animate="visible" variants={sectionVariants}>
      <div className="container mx-auto max-w-7xl">
        <div className="space-y-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`pb-16 ${index !== categories.length - 1 ? "border-b border-border/30" : ""}`}
              variants={itemVariants}
            >
              <div className="mb-8 space-y-1.5">
                <h3 className="text-foreground leading-tight text-2xl leading-6 tracking-normal font-sans font-bold">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl font-medium">
                  {category.description}
                </p>
              </div>
              <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" variants={containerVariants}>
                {category.recipients.map((recipient) => (
                  <motion.div key={recipient.id} className="group relative overflow-hidden bg-muted aspect-[3/4]" variants={fadeInUp}>
                    {/* Profile Image */}
                    <img
                      src={recipient.image || "/placeholder.svg"}
                      alt={recipient.name || recipient.title || "Award recipient"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        {recipient.name && <p className="font-serif text-lg leading-tight mb-1">{recipient.name}</p>}
                        {recipient.title && <p className={`text-xs text-white/80 tracking-wide ${recipient.name ? '' : 'text-lg'}`}>{recipient.title}</p>}
                      </div>
                    </div>
                    {recipient.name && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                        <p className="font-serif text-white text-sm leading-tight">{recipient.name}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default function ModelPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    document.title = 'KW Awards - KW Singapore'
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
      <section className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-center justify-center pt-20 sm:pt-20 md:pt-12">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

        <motion.div 
          className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-8 sm:pt-12 md:pt-16 lg:pt-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            variants={itemVariants}
          >
            Celebrating
            <span className="block text-red-700 italic">Excellence.</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
           This is where we celebrate the very best in Singapore real estate. 
           Witness the dedication and world-class results that define our culture of excellence, updated with new achievements every quarter.
          </motion.p>
        </motion.div>
      </section>

      {/* Quarterly Excellence Section */}
      <motion.section 
        className="py-20 px-6 bg-background"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            className="text-center max-w-4xl mx-auto space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
              variants={itemVariants}
            >
              Quarterly Excellence
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              We proudly honour the market-leading results and outstanding performance achieved by our Associates throughout the year, marking success every three months.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Awards Grid Section */}
      <AwardsGrid />
      
    </motion.main>
  )
} 