"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import non-critical components
const Dialog = dynamic(() => import("@/components/ui/dialog").then(mod => mod.Dialog), {
  loading: () => <div className="h-0" />,
  ssr: false
})
const DialogContent = dynamic(() => import("@/components/ui/dialog").then(mod => mod.DialogContent), {
  loading: () => <div className="h-0" />,
  ssr: false
})
const DialogHeader = dynamic(() => import("@/components/ui/dialog").then(mod => mod.DialogHeader), {
  loading: () => <div className="h-0" />,
  ssr: false
})
const DialogTitle = dynamic(() => import("@/components/ui/dialog").then(mod => mod.DialogTitle), {
  loading: () => <div className="h-0" />,
  ssr: false
})
const DialogTrigger = dynamic(() => import("@/components/ui/dialog").then(mod => mod.DialogTrigger), {
  loading: () => <div className="h-0" />,
  ssr: false
})

export default function EditorialPage() {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, consent })
    setIsOpen(false)
  }

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
          src="/images/kw-blog/kw-blog-section.webp"
          alt="KW Blog Coming Soon"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20 flex items-center justify-center">
          <motion.div 
            className="container mx-auto px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white inline-block tracking-tight">
              Inside KW Singapore
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-black">
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

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-primary-red text-white hover:bg-primary-red/90 px-8 py-6 text-lg"
                >
                  Get Notified When We Go Live
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-white border-gray-200">
                <DialogHeader>
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/images/kwsg-logo.webp"
                      alt="KW Singapore"
                      width={200}
                      height={60}
                      className="h-12 w-auto"
                      priority
                    />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-center text-gray-900">Stay Connected with KW Singapore</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                    />
                    <p className="text-sm text-gray-500 mt-2">
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
                      className="text-sm text-gray-900"
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
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
