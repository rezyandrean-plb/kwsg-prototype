"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"
import { ArrowRight } from "lucide-react"

interface ContactDialogProps {
  triggerText: string
  headline: string
  body: string
  onSubmit: (data: any) => void
  variant?: "default" | "outline"
}

export function ContactDialog({
  triggerText,
  headline,
  body,
  onSubmit,
  variant = "default"
}: ContactDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className={`group ${
            variant === "default"
              ? "bg-primary-red text-white hover:bg-primary-red/90"
              : "bg-white text-primary-red hover:bg-white/90"
          } px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]`}
        >
          {triggerText}
          <ArrowRight className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogTitle className="sr-only">{headline}</DialogTitle>
        <ContactForm
          headline={headline}
          body={body}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
} 