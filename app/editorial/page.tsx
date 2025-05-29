"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export default function EditorialPage() {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ email, consent })
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
          alt="KW Blog Coming Soon"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.div 
            className="container mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-2xl md:text-3xl text-gray-100 mb-6 tracking-wide">
              KW Blog – Coming Soon
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white inline-block tracking-tight">
              Inside KW Singapore
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-gray-300 mb-12">
              We're putting the finishing touches on our blog — a behind-the-scenes look at life inside KW Singapore. 
              From team moments and cultural highlights to the stories that shape our brand, this is where you'll get 
              to know who we are beyond the business.
            </p>

            {/* Subscription Form */}
            <div className="bg-gray-900 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-2">Stay Connected with KW Singapore</h2>
              <p className="text-gray-300 mb-6">
                Our blog is almost ready. Want to know when we go live? Drop your email and we'll give you a heads-up.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    We'll send you one update when the blog launches. That's it.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) => setConsent(checked as boolean)}
                    required
                    className="border-gray-400 data-[state=checked]:bg-primary-red data-[state=checked]:border-primary-red"
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-white"
                  >
                    I agree to receive updates from KW Singapore.
                  </label>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-primary-red text-white hover:bg-primary-red/90"
                >
                  Notify Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
