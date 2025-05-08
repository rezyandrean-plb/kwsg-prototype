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
      // When scrolled, make header solid black
      header?.classList.remove("bg-transparent")
      header?.classList.add(
        "bg-black",
        "backdrop-blur",
        "supports-[backdrop-filter]:bg-black/60",
        "border-b",
        "border-gray-800"
      )

      // Change text color
      logoText?.classList.remove("text-white")
      logoText?.classList.add("text-white")

      navLinks.forEach((link) => {
        link.classList.remove("text-white", "hover:text-white/80")
        link.classList.add("text-white", "hover:text-white/80")
      })

      // Use red color for button
      joinButton?.classList.remove("bg-white", "text-primary", "hover:bg-white/90")
      joinButton?.classList.add("bg-primary-red", "text-white", "hover:bg-primary-red/90")

      // Update mobile menu button color
      mobileMenuButton?.classList.remove("text-white", "hover:text-white/80")
      mobileMenuButton?.classList.add("text-white", "hover:text-white/80")
    } else {
      // When at top, make header transparent
      header?.classList.remove(
        "bg-black",
        "backdrop-blur",
        "supports-[backdrop-filter]:bg-black/60",
        "border-b",
        "border-gray-800"
      )
      header?.classList.add("bg-transparent")

      // Change text color
      logoText?.classList.remove("text-white")
      logoText?.classList.add("text-white")

      navLinks.forEach((link) => {
        link.classList.remove("text-white", "hover:text-white/80")
        link.classList.add("text-white", "hover:text-white/80")
      })

      // Use red color for button
      joinButton?.classList.remove("bg-white", "text-primary", "hover:bg-white/90")
      joinButton?.classList.add("bg-primary-red", "text-white", "hover:bg-primary-red/90")

      // Update mobile menu button color
      mobileMenuButton?.classList.remove("text-white", "hover:text-white/80")
      mobileMenuButton?.classList.add("text-white", "hover:text-white/80")
    }
  }, [scrolled])

  return null
}
