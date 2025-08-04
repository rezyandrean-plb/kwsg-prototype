"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2, MapPin, Calendar, Home, Banknote, ChevronRight, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Project } from "@/data/projects"

interface ProjectCardProps extends Project {
  className?: string
  priceRange?: string
  lowerPrice?: string
  units?: string
  unitsAvailable?: string
  propertySizeRange?: string
  developer?: string
  completion?: string
  description?: string
  pricePerSqFt?: string
  features?: string[]
  status?: 'upcoming' | 'ongoing' | 'completed'
  ctaText?: string
  image_url_banner?: string | null
}

export default function ProjectCard({
  slug,
  name,
  location,
  price,
  type,
  image,
  image_url_banner,
  className = "",
  priceRange,
  lowerPrice,
  units,
  unitsAvailable,
  propertySizeRange,
  developer,
  completion,
  description,
  pricePerSqFt,
  features,
  status = 'upcoming',
  ctaText = "View Project"
}: ProjectCardProps) {
  const statusConfig = {
    upcoming: {
      label: 'Upcoming',
      bg: 'bg-black',
      text: 'text-white'
    },
    ongoing: {
      label: 'Ongoing',
      bg: 'bg-green-500',
      text: 'text-white'
    },
    completed: {
      label: 'Completed',
      bg: 'bg-gray-500',
      text: 'text-white'
    }
  } as const

  return (
    <div className={`group relative bg-[#242728] border border-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image_url_banner && image_url_banner.trim() !== '' ? image_url_banner : image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[status].bg} ${statusConfig[status].text}`}>
            {statusConfig[status].label}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Location/District */}
        <div className="text-xs text-gray-400 mb-1.5 truncate flex items-center">
          <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
          {location}
        </div>
        {/* Project Name */}
        <h3 className="text-xl font-light mb-2 text-white truncate">{name}</h3>
        {/* Badges for tenure and TOP */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {features && features[0] && (
            <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-700">{features[0]}</span>
          )}
          {completion && (
            <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-700">TOP: {completion}</span>
          )}
        </div>
        {/* Bedroom range and property size */}
        <div className="text-xs text-gray-400 mb-2 flex items-center gap-4">
          {units && (
            <span className="flex items-center"><Home className="h-3.5 w-3.5 mr-1 text-gray-500" />{units}</span>
          )}
          {propertySizeRange && (
            <span className="flex items-center"><Ruler className="h-3.5 w-3.5 mr-1 text-gray-500" />{propertySizeRange}</span>
          )}
        </div>
        {/* Price at the bottom */}
        <div className="mt-auto pt-2 border-t border-gray-800">
          <div className="text-xs text-gray-400 mb-0.5">From</div>
          <div className="text-lg font-normal text-white">
            {lowerPrice ? `$${lowerPrice}M` : (priceRange || price)}
          </div>
          {pricePerSqFt && (
            <div className="text-xs text-gray-400 mt-0.5">
              ${pricePerSqFt} psf
            </div>
          )}
          <Link href={`/projects/${slug}`} className="mt-6">
            <Button variant="default" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white">
              {ctaText}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
