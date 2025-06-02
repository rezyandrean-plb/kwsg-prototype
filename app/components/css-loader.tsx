"use client"

import { useEffect } from 'react'

export default function CSSLoader() {
  useEffect(() => {
    // Critical CSS is already inlined in the layout.tsx
    // Handle non-critical CSS loading
    const nonCriticalCSS = [
      '/_next/static/css/app/layout.css',
      '/_next/static/css/app/editorial/page.css',
      '/_next/static/css/app/editorial/[slug]/page.css'
    ]

    nonCriticalCSS.forEach(href => {
      // Create and append the preload link
      const preloadLink = document.createElement('link')
      preloadLink.rel = 'preload'
      preloadLink.href = href
      preloadLink.as = 'style'
      document.head.appendChild(preloadLink)

      // Create and append the stylesheet link with print media
      const styleLink = document.createElement('link')
      styleLink.rel = 'stylesheet'
      styleLink.href = href
      styleLink.media = 'print'
      styleLink.onload = () => {
        styleLink.media = 'all'
      }
      document.head.appendChild(styleLink)
    })
  }, [])

  return null
} 