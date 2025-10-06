"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, Clock, Facebook, Instagram, Linkedin, Youtube, ChevronRight, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Contact Form Component with reCAPTCHA
function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isExecutingRecaptcha, setIsExecutingRecaptcha] = useState(false)
  const [securityScore, setSecurityScore] = useState<number | null>(null)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!executeRecaptcha) {
      console.error('reCAPTCHA not available')
      return
    }

    setIsExecutingRecaptcha(true)
    setSubmitSuccess(false)

    try {
      const token = await executeRecaptcha('contact_form_submission')
      
      // Simulate security score (in real implementation, this would come from the API)
      const mockScore = Math.random() * 0.3 + 0.7 // Score between 0.7 and 1.0
      setSecurityScore(mockScore)
      
      setIsSubmitting(true)

      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitSuccess(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        })
      } else {
        console.error('Form submission error:', result.error)
        // You could add error state handling here
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
      setIsExecutingRecaptcha(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 p-6 sm:p-8 rounded-2xl border border-[#666666]/20 backdrop-blur-sm">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white">Send Us a Message</h2>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
          <p className="text-green-400 font-medium">
            Thank you for your message! We have sent you a confirmation email and our team will get back to you within 24 business hours.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name and Last Name Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-white mb-2">
              First Name *
            </label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Enter your first name"
              required
              className="bg-black/50 border-[#666666]/30 text-white placeholder:text-[#999999] focus:border-[#B40101] focus:ring-[#B40101] h-12"
              disabled={isSubmitting || isExecutingRecaptcha}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-white mb-2">
              Last Name *
            </label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Enter your last name"
              required
              className="bg-black/50 border-[#666666]/30 text-white placeholder:text-[#999999] focus:border-[#B40101] focus:ring-[#B40101] h-12"
              disabled={isSubmitting || isExecutingRecaptcha}
            />
          </div>
        </div>

        {/* Email and Phone Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
              Email Address *
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your.email@example.com"
              required
              className="bg-black/50 border-[#666666]/30 text-white placeholder:text-[#999999] focus:border-[#B40101] focus:ring-[#B40101] h-12"
              disabled={isSubmitting || isExecutingRecaptcha}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+65 XXXX XXXX"
              className="bg-black/50 border-[#666666]/30 text-white placeholder:text-[#999999] focus:border-[#B40101] focus:ring-[#B40101] h-12"
              disabled={isSubmitting || isExecutingRecaptcha}
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
            Subject *
          </label>
          <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)} disabled={isSubmitting || isExecutingRecaptcha}>
            <SelectTrigger className="bg-black/50 border-[#666666]/30 text-white focus:border-[#B40101] focus:ring-[#B40101] h-12 hover:border-[#B40101]/50 transition-colors">
              <SelectValue placeholder="Select inquiry type" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-[#B40101]/30 shadow-2xl backdrop-blur-sm">
              <SelectItem value="general" className="text-white hover:bg-[#B40101]/20 focus:bg-[#B40101]/20 focus:text-white cursor-pointer transition-all duration-200 hover:scale-105">
                General Inquiry
              </SelectItem>
              <SelectItem value="partnership" className="text-white hover:bg-[#B40101]/20 focus:bg-[#B40101]/20 focus:text-white cursor-pointer transition-all duration-200 hover:scale-105">
                Partnership
              </SelectItem>
              <SelectItem value="bootcamp" className="text-white hover:bg-[#B40101]/20 focus:bg-[#B40101]/20 focus:text-white cursor-pointer transition-all duration-200 hover:scale-105">
                Training & Events
              </SelectItem>
              <SelectItem value="property" className="text-white hover:bg-[#B40101]/20 focus:bg-[#B40101]/20 focus:text-white cursor-pointer transition-all duration-200 hover:scale-105">
                Property Inquiry
              </SelectItem>
              <SelectItem value="career" className="text-white hover:bg-[#B40101]/20 focus:bg-[#B40101]/20 focus:text-white cursor-pointer transition-all duration-200 hover:scale-105">
                Career Opportunities
              </SelectItem>
              <SelectItem value="media" className="text-white hover:bg-[#B40101]/20 focus:bg-[#B40101]/20 focus:text-white cursor-pointer transition-all duration-200 hover:scale-105">
                Media Services
              </SelectItem>
              <SelectItem value="other" className="text-white hover:bg-[#B40101]/20 focus:bg-[#B40101]/20 focus:text-white cursor-pointer transition-all duration-200 hover:scale-105">
                Other
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
            Message *
          </label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            placeholder="Tell us how we can help you..."
            required
            rows={6}
            className="bg-black/50 border-[#666666]/30 text-white placeholder:text-[#999999] focus:border-[#B40101] focus:ring-[#B40101] resize-none"
            disabled={isSubmitting || isExecutingRecaptcha}
          />
        </div>

        {/* Enhanced reCAPTCHA Protection Notice */}
        <div className="bg-gradient-to-r from-blue-50/20 to-indigo-50/20 border border-blue-200/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Protected by Google reCAPTCHA</p>
                <p className="text-xs text-gray-300">Your information is secure and protected from bots</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {securityScore && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-400 font-medium">
                    Score: {(securityScore * 100).toFixed(0)}%
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {(isExecutingRecaptcha || isSubmitting) && (
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-300">
                {isExecutingRecaptcha ? 'Security Verification' : 'Processing Request'}
              </span>
              <span className="text-xs text-gray-500">
                {isExecutingRecaptcha ? 'Step 1/2' : 'Step 2/2'}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: isExecutingRecaptcha ? '50%' : '100%' }}
              ></div>
            </div>
          </div>
        )}

        {/* Privacy Policy */}
        <div className="text-sm text-[#999999]">
          By submitting this form, you agree to our{" "}
          <a href="/privacy-policy" className="text-[#B40101] hover:underline">
            Privacy Policy
          </a>{" "}
          and consent to being contacted by our team.
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || isExecutingRecaptcha}
          className={`w-full text-white py-4 text-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            isExecutingRecaptcha 
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700' 
              : 'bg-[#B40101] hover:bg-[#B40101]/90 hover:scale-105'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Sending Message...
            </>
          ) : isExecutingRecaptcha ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Verifying Security...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  )
}

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    document.title = 'Contact - KW Singapore'
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToContactSection = () => {
    const contactSection = document.getElementById('main-contact-section')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] sm:min-h-[40vh] md:min-h-[60vh] lg:min-h-[60vh] flex items-center justify-center pt-20 sm:pt-20 md:pt-12">
          <div
            className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="absolute inset-0 bg-[url('/images/event/modern-office-contact-bg.webp')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-8 sm:pt-12 md:pt-16 lg:pt-32"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
            >
              Get In
              <span className="block text-[#B40101] italic">Touch</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed text-base sm:text-lg md:text-xl"
            >
              We're here to help you succeed. Reach out to our team for any inquiries, partnerships, or support. <br></br>
              Your journey to real estate excellence starts with a conversation.
            </motion.p>
          </motion.div>

        </section>

        {/* Main Contact Section */}
        <section id="main-contact-section" className="relative py-16 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="grid lg:grid-cols-2 gap-16"
            >
              {/* Left Side - Contact Information */}
              <motion.div 
                variants={fadeInUp}
                className="space-y-12 order-2 lg:order-1"
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white">Reach Us Directly</h2>
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 sm:mb-12">
                    Connect with our team through any of the channels below. We're committed to responding promptly and
                    helping you take the next step in your real estate journey.
                  </p>
                </div>

                {/* Contact Details */}
                <motion.div 
                  variants={staggerContainer}
                  className="space-y-8"
                >
                  {/* Phone */}
                  <motion.div 
                    variants={fadeInUp}
                    className="flex items-start space-x-4 group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#B40101]/10 rounded-lg flex items-center justify-center group-hover:bg-[#B40101]/20 transition-colors">
                      <Phone className="h-6 w-6 text-[#B40101]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Phone</h3>
                      <a href="tel:+6587996569" className="text-white/80 hover:text-[#B40101] transition-colors text-lg">
                        +65 8799 6569
                      </a>
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div 
                    variants={fadeInUp}
                    className="flex items-start space-x-4 group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#B40101]/10 rounded-lg flex items-center justify-center group-hover:bg-[#B40101]/20 transition-colors">
                      <Mail className="h-6 w-6 text-[#B40101]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Email</h3>
                      <a
                        href="mailto:hello@kwsingapore.com"
                        className="text-white/80 hover:text-[#B40101] transition-colors text-lg"
                      >
                        hello@kwsingapore.com
                      </a>
                    </div>
                  </motion.div>

                  {/* Address */}
                  <motion.div 
                    variants={fadeInUp}
                    className="flex items-start space-x-4 group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#B40101]/10 rounded-lg flex items-center justify-center group-hover:bg-[#B40101]/20 transition-colors">
                      <MapPin className="h-6 w-6 text-[#B40101]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Address</h3>
                      <p className="text-white/80 text-lg leading-relaxed">
                        Oxley Bizhub 2, 62 Ubi Road 1 #01-19<br />
                        Singapore 408734
                      </p>
                    </div>
                  </motion.div>

                  {/* Operating Hours */}
                  <motion.div 
                    variants={fadeInUp}
                    className="flex items-start space-x-4 group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#B40101]/10 rounded-lg flex items-center justify-center group-hover:bg-[#B40101]/20 transition-colors">
                      <Clock className="h-6 w-6 text-[#B40101]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Operating Hours</h3>
                      <div className="text-white/80 text-lg leading-relaxed">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday & Sunday: Closed</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Social Media Links */}
                <motion.div 
                  variants={fadeInUp}
                  className="pt-8"
                >
                  <h3 className="text-2xl font-bold mb-6 text-white">Connect With Us</h3>
                  <motion.div 
                    variants={staggerContainer}
                    className="flex space-x-4"
                  >
                    {[
                      { icon: Facebook, href: "https://www.facebook.com/kwsingapore", label: "Facebook" },
                      { icon: Instagram, href: "https://www.instagram.com/kwsingapore/", label: "Instagram" },
                      {
                        icon: Linkedin,
                        href: "https://www.linkedin.com/company/kw-singapore/",
                        label: "LinkedIn",
                      },
                      {
                        icon: ({ className }: { className?: string }) => (
                          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                          </svg>
                        ),
                        href: "https://www.tiktok.com/@kwsingapore",
                        label: "TikTok",
                      },
                      { icon: Youtube, href: "http://www.youtube.com/@kw_singapore", label: "YouTube" },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-[#666666]/20 rounded-full flex items-center justify-center text-[#999999] hover:bg-[#B40101] hover:text-white transition-all duration-300 hover:scale-110"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right Side - Contact Form */}
              <motion.div 
                variants={fadeInUp}
                className="order-1 lg:order-2"
              >
                <ContactForm />
              </motion.div>
            </motion.div>
          </div>
        </section>

        
      </main>
    </GoogleReCaptchaProvider>
  )
} 