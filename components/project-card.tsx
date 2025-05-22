"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2, MapPin, Calendar, Home, Banknote, ChevronRight, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  location: string
  price: string
  priceRange: string
  image: string
  units: string
  unitsAvailable: string
  propertySizeRange: string
  developer: string
  completion: string
  slug: string
  description?: string
  pricePerSqFt?: string
  features?: string[]
  className?: string
  status?: 'upcoming' | 'ongoing' | 'completed'
}

export default function ProjectCard({
  title,
  location,
  price,
  priceRange,
  image,
  units,
  unitsAvailable,
  propertySizeRange,
  developer,
  completion,
  slug,
  description,
  pricePerSqFt,
  features,
  className,
  status = 'upcoming',
}: ProjectCardProps) {
  const statusConfig = {
    upcoming: {
      label: 'Upcoming',
      className: 'bg-black text-white'
    },
    ongoing: {
      label: 'Ongoing',
      className: 'bg-green-500 text-white'
    },
    completed: {
      label: 'Completed',
      className: 'bg-gray-500 text-white'
    }
  } as const

  const currentStatus = statusConfig[status] || statusConfig.upcoming

  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] flex flex-col h-full", className)}>
      <div className="relative h-60">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className={cn("absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium", currentStatus.className)}>
          {currentStatus.label}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        {/* Location/District */}
        <div className="text-xs text-gray-500 mb-1.5 truncate flex items-center">
          <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
          {location}
        </div>
        {/* Project Name */}
        <h3 className="text-lg font-semibold mb-2 text-gray-900 truncate">{title}</h3>
        {/* Badges for tenure and TOP */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {features && features[0] && (
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-200">{features[0]}</span>
          )}
          {completion && (
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium border border-gray-200">TOP: {completion}</span>
          )}
        </div>
        {/* Bedroom range and property size */}
        <div className="text-xs text-gray-700 mb-2 flex items-center gap-4">
          {units && (
            <span className="flex items-center"><Home className="h-3.5 w-3.5 mr-1 text-gray-400" />{units}</span>
          )}
          {propertySizeRange && (
            <span className="flex items-center"><Ruler className="h-3.5 w-3.5 mr-1 text-gray-400" />{propertySizeRange}</span>
          )}
        </div>
        {/* Price at the bottom */}
        <div className="mt-auto pt-2 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-0.5">From</div>
          <div className="text-lg font-bold text-gray-900">{priceRange}</div>
          <Link href={`/projects/${slug}`} className="mt-3">
            <Button variant="default" className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white">
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
