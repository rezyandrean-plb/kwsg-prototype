"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2, MapPin, Calendar, Home, DollarSign, ChevronRight, Ruler } from "lucide-react"
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
}: ProjectCardProps) {
  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] flex flex-col h-full", className)}>
      <div className="relative h-60">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
          New Launch
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-1 text-primary">{title}</h3>
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Price Range</p>
            <p className="text-sm font-medium text-gray-800">{priceRange}</p>
          </div>
          {pricePerSqFt && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Price PSF</p>
              <p className="text-sm font-medium text-gray-800">{pricePerSqFt}</p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Property Size</p>
            <p className="text-sm font-medium text-gray-800">{propertySizeRange}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Units Available</p>
            <p className="text-sm font-medium text-gray-800">{unitsAvailable}</p>
          </div>
        </div>

        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        )}

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center text-gray-600">
            <Building2 className="h-4 w-4 mr-1 text-gray-400" />
            <span className="text-sm">{developer}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Home className="h-4 w-4 mr-1 text-gray-400" />
            <span className="text-sm">{units}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
            <span className="text-sm">Est. {completion}</span>
          </div>
        </div>

        {features && features.length > 0 && (
          <div className="mb-5">
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  +{features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto">
          <Link href={`/projects/${slug}`}>
            <Button className="w-full bg-primary text-white hover:bg-primary/90 group">
              View Details
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
