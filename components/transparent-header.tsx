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
    const navLinks = document.querySelectorAll("#nav-link")
    const mobileMenuButton = document.querySelector("[data-mobile-menu-button]")

    if (scrolled) {
      // When scrolled, make header solid black with blur effect
      header?.classList.remove("bg-transparent")
      header?.classList.add(
        "bg-black/90",
        "backdrop-blur-md",
        "shadow-lg",
        "border-b",
        "border-gray-800"
      )

      // Update navigation links
      navLinks.forEach((link) => {
        link.classList.remove("text-white/90")
        link.classList.add("text-white")
      })

      // Update mobile menu button
      mobileMenuButton?.classList.remove("text-white/90")
      mobileMenuButton?.classList.add("text-white")
    } else {
      // When at top, make header transparent
      header?.classList.remove(
        "bg-black/90",
        "backdrop-blur-md",
        "shadow-lg",
        "border-b",
        "border-gray-800"
      )
      header?.classList.add("bg-transparent")

      // Update navigation links
      navLinks.forEach((link) => {
        link.classList.remove("text-white")
        link.classList.add("text-white/90")
      })

      // Update mobile menu button
      mobileMenuButton?.classList.remove("text-white")
      mobileMenuButton?.classList.add("text-white/90")
    }
  }, [scrolled])

  return null
}
