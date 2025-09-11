"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SignIn } from '@clerk/nextjs'
import { motion } from "framer-motion"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  toolTitle?: string
}

export default function AuthDialog({ open, onOpenChange, toolTitle }: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <DialogTitle className="text-white text-center">
                {toolTitle ? `Access ${toolTitle}` : "Sign In Required"}
              </DialogTitle>
            </motion.div>
          </DialogHeader>
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className="text-gray-300 text-sm text-center mb-6">
              Please sign in to access this tool
            </p>
            <div className="flex justify-center">
              <SignIn 
                routing="hash"
                appearance={{
                  baseTheme: undefined,
                  variables: {
                    colorBackground: "#1f2937", // gray-800
                    colorInputBackground: "#374151", // gray-700
                    colorText: "#e5e7eb", // gray-200
                    colorTextSecondary: "#d1d5db", // gray-300
                    colorPrimary: "#b40101",
                    colorAlphaShaded: "rgba(31,41,55,0.9)",
                    colorShimmer: "#4b5563"
                  },
                  elements: {
                    rootBox: "w-full bg-transparent",
                    card: "bg-gray-800 border-gray-600 shadow-none",
                    main: "bg-gray-800",
                    header: "bg-gray-800",
                    headerTitle: "text-white",
                    headerSubtitle: "text-gray-300",
                    badge: "bg-gray-800 text-gray-300 border border-gray-600",
                    socialButtonsBlock: "bg-gray-800",
                    socialButtonsBlockButton: "bg-gray-600 border-gray-500 text-white hover:bg-gray-500",
                    socialButtonsBlockButtonText: "text-white",
                    formButtonPrimary: "bg-[#b40101] hover:bg-[#8a0101] text-white",
                    footerActionLink: "text-[#b40101] hover:text-[#8a0101]",
                    footerActionText: "text-gray-300",
                    identityPreview: "bg-gray-700 border-gray-600",
                    identityPreviewText: "text-gray-300",
                    identityPreviewEditButton: "text-[#b40101] hover:text-[#8a0101]",
                    formFieldInput: "bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-[#b40101] focus:ring-[#b40101]/20",
                    formFieldLabel: "text-gray-300",
                    formFieldSuccessText: "text-green-400",
                    formFieldErrorText: "text-red-400",
                    formFieldWarningText: "text-yellow-400",
                    dividerLine: "bg-gray-600",
                    dividerText: "text-gray-400",
                    formResendCodeLink: "text-[#b40101] hover:text-[#8a0101]",
                    otpCodeFieldInput: "bg-gray-600 border-gray-500 text-white focus:border-[#b40101] focus:ring-[#b40101]/20",
                    formHeaderTitle: "text-white",
                    formHeaderSubtitle: "text-gray-300",
                    alertText: "text-gray-300",
                    formFieldRow: "bg-transparent",
                    formField: "bg-transparent",
                    form: "bg-transparent",
                    footer: "bg-gray-800",
                    footerText: "text-gray-300",
                    footerAction: "bg-gray-800",
                    alternativeMethodsBlockButton: "bg-gray-600 border-gray-500 text-white hover:bg-gray-500",
                    alternativeMethodsBlockButtonText: "text-white",
                    formFieldInputShowPasswordButton: "text-gray-400 hover:text-white",
                    formFieldInputShowPasswordIcon: "text-gray-400",
                    formFieldSuccessIcon: "text-green-400",
                    formFieldErrorIcon: "text-red-400",
                    formFieldWarningIcon: "text-yellow-400",
                    loadingSpinner: "text-[#b40101]",
                    formFieldInputIcon: "text-gray-400",
                    formFieldInputPrefix: "text-gray-400",
                    formFieldInputSuffix: "text-gray-400",
                    formFieldInputAction: "text-gray-400 hover:text-white",
                    formFieldInputActionIcon: "text-gray-400",
                    formFieldInputActionText: "text-gray-400",
                    formFieldInputActionButton: "text-gray-400 hover:text-white",
                    formFieldInputActionButtonText: "text-gray-400",
                    formFieldInputActionButtonIcon: "text-gray-400"
                  }
                }}
                redirectUrl="/tech-tool"
              />
            </div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
