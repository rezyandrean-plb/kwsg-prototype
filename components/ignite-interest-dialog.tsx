"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface IgniteInterestDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function IgniteInterestDialog({ isOpen, onClose }: IgniteInterestDialogProps) {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !mobile.trim()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/ignite-masterclass-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast({
          title: "Interest Registered",
          description: result.message || "Thank you! We've received your details and sent you a confirmation email.",
        })
        setName("")
        setEmail("")
        setMobile("")
        onClose()
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Ignite interest submission error:", error)
      toast({
        title: "Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-gray-200 text-gray-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            I’m interested in Ignite Masterclass
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Leave your details and our team will follow up with more information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="ignite-name">Name</Label>
            <Input
              id="ignite-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ignite-email">Email</Label>
            <Input
              id="ignite-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ignite-mobile">Mobile</Label>
            <Input
              id="ignite-mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Your mobile number"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#B40101] hover:bg-[#B40101]/90 text-white font-semibold py-3 transition-all duration-300 hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}


