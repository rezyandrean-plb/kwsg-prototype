"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const containerHeight = containerRef.current.offsetHeight

      // Check if section is in viewport
      const isInView = rect.top < windowHeight && rect.bottom > 0

      if (isInView) {
        setIsActive(true)
        // Calculate scroll progress within the section
        const scrollableDistance = containerHeight + windowHeight
        const scrolled = windowHeight - rect.top
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance))
        setScrollProgress(progress)
      } else {
        setIsActive(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Title Section: 0-25% scroll (balanced duration)
  const titleOpacity = scrollProgress < 0.25 ? 1 : Math.max(0, 1 - (scrollProgress - 0.25) * 4)

  // Cover Image: 20-45% scroll (25% duration, same as title)
  const coverImageTransform =
    scrollProgress > 0.2 && scrollProgress < 0.45
      ? `translateX(${100 - ((scrollProgress - 0.2) / 0.25) * 100}%)`
      : scrollProgress >= 0.45
        ? `translateX(0%)`
        : `translateX(100%)`

  // Cover image stays visible for full 25% duration
  const coverOpacity =
    scrollProgress > 0.2 && scrollProgress < 0.5
      ? scrollProgress < 0.45
        ? 1
        : Math.max(0, 1 - (scrollProgress - 0.45) * 20)
      : 0

  // First Story: 40-65% scroll (25% duration, balanced)
  const firstStoryTransform = `translateX(${100 - scrollProgress * 100}%)`
  const firstImageTransform = `translateX(${150 - scrollProgress * 100}%)`
  const firstStoryOpacity =
    scrollProgress > 0.4 && scrollProgress < 0.65
      ? scrollProgress < 0.43
        ? (scrollProgress - 0.4) * 33.33 // Gentle fade in over 3%
        : scrollProgress > 0.62
          ? Math.max(0, 1 - (scrollProgress - 0.62) * 33.33) // Gentle fade out over 3%
          : 1
      : 0

  // Second Story: 60-85% scroll (25% duration, balanced)
  const secondStoryTransform = `translateX(${100 - scrollProgress * 120}%)`
  const secondImageTransform = `translateX(${150 - scrollProgress * 120}%)`
  const secondStoryOpacity =
    scrollProgress > 0.6 && scrollProgress < 0.85
      ? scrollProgress < 0.63
        ? (scrollProgress - 0.6) * 33.33 // Gentle fade in over 3%
        : scrollProgress > 0.82
          ? Math.max(0, 1 - (scrollProgress - 0.82) * 33.33) // Gentle fade out over 3%
          : 1
      : 0

  // Zoom timing adjusted for balanced, slower effects
  const firstImageZoom =
    scrollProgress > 0.43 && scrollProgress < 0.62 ? Math.min(1.15, 1 + (scrollProgress - 0.43) * 2.63) : 1
  const secondImageZoom =
    scrollProgress > 0.63 && scrollProgress < 0.82 ? Math.min(1.15, 1 + (scrollProgress - 0.63) * 2.63) : 1

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Initial Title Section - Static Full Width */}
        <div
          className="absolute inset-0 z-10 bg-slate-900 flex items-center justify-start pl-8 md:pl-16 lg:pl-24"
          style={{
            opacity: titleOpacity,
            transition: "opacity 2s ease-out",
          }}
        >
          <div className="max-w-4xl px-8 md:px-16 lg:px-24">
            <h1 className="text-5xl md:text-5xl lg:text-5xl font-light text-white mb-8 leading-tight">
              Global Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl font-light">
              Experience unparalleled luxury with Keller Williams Singapore, where world-class amenities meet
              breathtaking natural beauty. Discover a sanctuary of tranquility and indulgence, where every detail is
              crafted to perfection.
            </p>
          </div>
        </div>

        {/* Full Cover Image Panel - Slides Left to Right */}
        <div
          className="absolute inset-0 z-20"
          style={{
            transform: coverImageTransform,
            opacity: coverOpacity,
            transition: "opacity 2.5s ease-out, transform 2s ease-out",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
            alt="Luxury Property"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* First Story Panel */}
        <div
          className="absolute inset-0 flex items-center bg-slate-900 z-30"
          style={{
            transform: firstStoryTransform,
            opacity: firstStoryOpacity,
            transition: "opacity 2.2s ease-out, transform 2s ease-out",
          }}
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 md:px-16 lg:px-24 items-center">
            <div className="flex flex-col justify-center">
              <p className="text-sm md:text-base text-slate-400 mb-4 tracking-wider uppercase">
                International Expansion
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8 leading-tight">
                A NEW STANDARD OF EXCELLENCE
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                Each resort is a sanctuary of elegance, where meticulous attention to detail and bespoke services
                converge to create an unparalleled retreat. From stunning vistas to exquisite interiors, these high-end
                destinations redefine opulence, offering guests an immersive journey into the art of fine living.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-md h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl"
                style={{
                  transform: `${firstImageTransform} scale(${firstImageZoom})`,
                  transition: "transform 2s ease-out",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2096&q=80"
                  alt="Luxury Resort"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Story Panel */}
        <div
          className="absolute inset-0 flex items-center bg-slate-900 z-40"
          style={{
            transform: secondStoryTransform,
            opacity: secondStoryOpacity,
            transition: "opacity 2.2s ease-out, transform 2s ease-out",
          }}
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 md:px-16 lg:px-24 items-center">
            <div className="flex flex-col justify-center">
              <p className="text-sm md:text-base text-slate-400 mb-4 tracking-wider uppercase">Client Trust</p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-8 leading-tight">
                THE KW BRAND GIVES MY CLIENTS CONFIDENCE
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                The KW brand gives my clients confidence. They know they're working with a globally recognized real
                estate professional.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-md h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl"
                style={{
                  transform: `${secondImageTransform} scale(${secondImageZoom})`,
                  transition: "transform 2s ease-out",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80"
                  alt="Luxury Development"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-300 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
