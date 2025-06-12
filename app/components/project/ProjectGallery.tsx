"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

interface ProjectGalleryProps {
  images: string[]
  title: string
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIdx, setGalleryIdx] = useState(0)

  return (
    <section className="bg-black py-0 md:py-0">
      {/* Banner Section */}
      <div className="relative w-screen aspect-[16/6] overflow-hidden mb-0" style={{ minHeight: '400px', maxHeight: '60vh' }}>
        <Image
          src={images[galleryIdx]}
          alt={title}
          fill
          className="object-cover"
          priority
          onClick={() => setGalleryOpen(true)}
          style={{ cursor: "zoom-in" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Gallery Controls */}
        <div className="absolute right-0 bottom-0 flex items-center gap-2 p-6 z-10">
          <button
            className="bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
            onClick={e => { e.stopPropagation(); setGalleryIdx((galleryIdx - 1 + images.length) % images.length) }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            className="bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
            onClick={e => { e.stopPropagation(); setGalleryOpen(true) }}
            aria-label="Enlarge image"
          >
            <Maximize2 className="w-6 h-6 text-white" />
          </button>
          <button
            className="bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
            onClick={e => { e.stopPropagation(); setGalleryIdx((galleryIdx + 1) % images.length) }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Modal Gallery */}
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-w-4xl bg-black p-0">
          <DialogTitle>
            <span className="sr-only">Gallery for {title}</span>
          </DialogTitle>
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={images[galleryIdx]}
              alt={`${title} enlarged image`}
              fill
              className="object-contain rounded"
            />
            {/* Modal Gallery Controls */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
              onClick={() => setGalleryIdx((galleryIdx - 1 + images.length) % images.length)}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
              onClick={() => setGalleryIdx((galleryIdx + 1) % images.length)}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
} 