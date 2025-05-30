"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Clock } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function ContactPage() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <Image
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
          alt="Contact Us"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold text-white inline-block tracking-tight"
            >
              Contact Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl text-gray-100 max-w-3xl mx-auto mt-6"
            >
              Get in touch with our team for any inquiries about new launches, partnerships, or career opportunities.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Contact Information */}
            <motion.div 
              variants={fadeInUp}
              className="space-y-8"
            >
              <div>
                <motion.h2 
                  variants={fadeInUp}
                  className="text-3xl font-bold mb-6 text-white"
                >
                  Get in Touch
                </motion.h2>
                <motion.p 
                  variants={fadeInUp}
                  className="text-gray-300 mb-8"
                >
                  Have questions about new launches or interested in joining our team? We're here to help.
                </motion.p>
              </div>

              <motion.div 
                variants={staggerContainer}
                className="space-y-6"
              >
                <motion.div 
                  variants={fadeInUp}
                  className="flex items-start space-x-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-primary-red/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Business Hours</h3>
                    <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex items-start space-x-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-primary-red/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email Us</h3>
                    <a href="mailto:hello@kwsingapore.com" className="text-gray-300 hover:text-primary-red transition-colors">
                      hello@kwsingapore.com
                    </a>
                  </div>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex items-start space-x-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-primary-red/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Call Us</h3>
                    <a href="tel:+6586111703" className="text-gray-300 hover:text-primary-red transition-colors">
                      +65 8611 1703
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Floating Contact Form */}
            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gray-900 rounded-lg p-8 shadow-xl sticky top-8"
              >
                <motion.h3 
                  variants={fadeInUp}
                  className="text-2xl font-bold mb-6 text-white"
                >
                  Send Us a Message
                </motion.h3>
                <motion.form 
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      variants={fadeInUp}
                      className="space-y-2"
                    >
                      <label htmlFor="firstName" className="text-sm font-medium text-white">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </motion.div>
                    <motion.div 
                      variants={fadeInUp}
                      className="space-y-2"
                    >
                      <label htmlFor="lastName" className="text-sm font-medium text-white">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        className="bg-gray-800 border-gray-700 text-white"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div 
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <label htmlFor="email" className="text-sm font-medium text-white">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </motion.div>

                  <motion.div 
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <label htmlFor="phone" className="text-sm font-medium text-white">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </motion.div>

                  <motion.div 
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <label htmlFor="subject" className="text-sm font-medium text-white">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </motion.div>

                  <motion.div 
                    variants={fadeInUp}
                    className="space-y-2"
                  >
                    <label htmlFor="message" className="text-sm font-medium text-white">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      className="bg-gray-800 border-gray-700 text-white min-h-[150px]"
                      required
                    />
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button type="submit" className="w-full bg-primary-red text-white hover:bg-primary-red/90">
                      Send Message
                    </Button>
                  </motion.div>
                </motion.form>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
} 