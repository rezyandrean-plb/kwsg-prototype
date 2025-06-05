"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface WebinarDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { email: string }) => void
}

export function WebinarDialog({ isOpen, onClose, onSubmit }: WebinarDialogProps) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email })
    setEmail("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Join Our Webinar</DialogTitle>
          <DialogDescription className="text-center">
            Register now to secure your spot in our exclusive webinar about the future of real estate in Singapore.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-primary-red hover:bg-primary-red/90">
            Register for Webinar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 