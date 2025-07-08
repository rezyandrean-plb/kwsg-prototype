"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowRight } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface BootcampCarouselDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { email: string }) => void
}

export function BootcampCarouselDialog({ isOpen, onClose, onSubmit }: BootcampCarouselDialogProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setSubmitMessage("Please enter your email address")
      return
    }

    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const response = await fetch('/api/bootcamp-carousel-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitMessage("Thank you! Your interest has been registered. We'll notify you when bootcamp details are available.")
        
        // Reset form
        setEmail("")
        
        // Close the dialog after a short delay
        setTimeout(() => {
          onClose()
          setSubmitMessage("")
        }, 3000)
      } else {
        setSubmitMessage(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-gray-200 text-gray-900">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Image
              src="/images/kw-logo-dialog.webp"
              alt="KW Singapore"
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Register My Interest
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-base">
              Register now to save your spot in the Training Bootcamp
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#B40101] focus:ring-[#B40101]"
                required
              />
            </div>
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`p-3 rounded-md text-sm ${
              submitMessage.includes("Thank you") 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-red-100 text-red-800 border border-red-200"
            }`}>
              {submitMessage}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#B40101] hover:bg-[#B40101]/90 text-white font-semibold py-3 transition-all duration-300 hover:scale-105 group"
            disabled={isSubmitting || !email.trim()}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                Submit Registration
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 