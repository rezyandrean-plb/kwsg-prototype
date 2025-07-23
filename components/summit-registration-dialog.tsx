"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

interface SummitRegistrationDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { email: string }) => void
}

export function SummitRegistrationDialog({
  isOpen,
  onClose,
  onSubmit,
}: SummitRegistrationDialogProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isExecutingRecaptcha, setIsExecutingRecaptcha] = useState(false)
  const { toast } = useToast()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    if (!executeRecaptcha) {
      console.error('reCAPTCHA not available')
      toast({
        title: "Security Error",
        description: "Security verification not available. Please refresh the page.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setIsExecutingRecaptcha(true)
    
    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha('summit_registration')
      
      // Call the API endpoint
      const response = await fetch('/api/summit-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(),
          recaptchaToken: token 
        }),
      })

      const result = await response.json()

      if (response.ok) {
        // Success - call the onSubmit callback
        await onSubmit({ email: email.trim() })
        setEmail("")
        
        // Show success toast
        toast({
          title: "Registration Successful!",
          description: "Thank you for registering your interest in the MREA Summit. We've sent you a confirmation email and will keep you updated with event details.",
          variant: "default",
        })
      } else {
        // Handle API error
        console.error("API error:", result.error)
        toast({
          title: "Registration Failed",
          description: result.error || 'Failed to submit registration. Please try again.',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsExecutingRecaptcha(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-gray-200 text-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Register My Interest
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-base">
              Register now to save your spot in the Mega Realtor Summit
            </p>
          </div>

          {/* Enhanced reCAPTCHA Protection Notice */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Protected by Google reCAPTCHA</p>
                  <p className="text-xs text-gray-600">Your information is secure and protected from bots</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
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

          <Button
            type="submit"
            className="w-full bg-[#B40101] hover:bg-[#B40101]/90 text-white font-semibold py-3 transition-all duration-300 hover:scale-105 group"
            disabled={isSubmitting || !email.trim() || isExecutingRecaptcha}
          >
            {isSubmitting || isExecutingRecaptcha ? (
              "Verifying..."
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