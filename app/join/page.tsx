"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function JoinKW() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
            alt="Join KW Singapore"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <motion.div 
          className="relative container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Your Future, Our Platform
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-12 text-gray-200">
            We're preparing something special — a new way to explore what it means to build your real estate business with KW Singapore. No fluff, no gatekeeping — just the tools, training, and a team that help you scale your career on your terms.
          </p>
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Button 
              className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Register Your Interest →
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}

/*
Original code preserved below for future use:

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Users, Award, ArrowRight, Brain, Share2, Video, BarChart3 } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

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

export default function JoinKW() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      // ... existing code ...
    </main>
  )
}
*/ 