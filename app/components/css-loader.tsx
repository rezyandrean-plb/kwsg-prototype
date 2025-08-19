"use client"

import { useEffect } from 'react'

export default function CSSLoader() {
  useEffect(() => {
    // Disabled dynamic CSS loading to prevent 404s during dev
    // Next.js will handle CSS bundling.
  }, [])

  return null
} 