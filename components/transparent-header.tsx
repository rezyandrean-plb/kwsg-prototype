"use client"

import { useEffect, useState } from "react"

export default function TransparentHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Initial check
    handleScroll()

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  useEffect(() => {
    const header = document.getElementById("main-header")
    const logoText = document.getElementById("logo-text")
    const navLinks = document.querySelectorAll("#nav-link")
    const joinButton = document.querySelector("#join-webinar-button")
    const mobileMenuButton = document.querySelector("[data-mobile-menu-button]")

    if (scrolled) {
      // When scrolled, make header solid
      header?.classList.remove("bg-transparent")
      header?.classList.add(
        "bg-background/95",
        "backdrop-blur",
        "supports-[backdrop-filter]:bg-background/60",
        "border-b",
      )

      // Change text color
      logoText?.classList.remove("text-white")
      logoText?.classList.add("text-primary")

      navLinks.forEach((link) => {
        link.classList.remove("text-white", "hover:text-white/80")
        link.classList.add("text-foreground", "hover:text-primary")
      })

      // Always use primary color for button
      joinButton?.classList.remove("bg-white", "text-primary", "hover:bg-white/90")
      joinButton?.classList.add("bg-primary", "text-white", "hover:bg-primary/90")

      // Update mobile menu button color
      mobileMenuButton?.classList.remove("text-white", "hover:text-white/80")
      mobileMenuButton?.classList.add("text-foreground", "hover:text-primary")
    } else {
      // When at top, make header transparent
      header?.classList.remove(
        "bg-background/95",
        "backdrop-blur",
        "supports-[backdrop-filter]:bg-background/60",
        "border-b",
      )
      header?.classList.add("bg-transparent")

      // Change text color
      logoText?.classList.remove("text-primary")
      logoText?.classList.add("text-white")

      navLinks.forEach((link) => {
        link.classList.remove("text-foreground", "hover:text-primary")
        link.classList.add("text-white", "hover:text-white/80")
      })

      // Always use primary color for button
      joinButton?.classList.remove("bg-white", "text-primary", "hover:bg-white/90")
      joinButton?.classList.add("bg-primary", "text-white", "hover:bg-primary/90")

      // Update mobile menu button color
      mobileMenuButton?.classList.remove("text-foreground", "hover:text-primary")
      mobileMenuButton?.classList.add("text-white", "hover:text-white/80")
    }
  }, [scrolled])

  return null
}
