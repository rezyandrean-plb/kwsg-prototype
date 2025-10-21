"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2, MapPin, Calendar, Home, Banknote, ChevronRight, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Project } from "@/data/projects"

interface ProjectCardProps extends Project {
  className?: string
  address?: string
  priceRange?: string
  price_from?: string
  units?: string
  unitsAvailable?: string
  propertySizeRange?: string
  developer?: string
  completion?: string
  description?: string
  pricePerSqFt?: string
  features?: string[]
  tenure?: string
  status?: 'upcoming' | 'ongoing' | 'completed'
  ctaText?: string
  image_url_banner?: string | null
}

export default function ProjectCard({
  slug,
  name,
  location,
  address,
  price,
  type,
  image,
  image_url_banner,
  className = "",
  priceRange,
  price_from,
  units,
  unitsAvailable,
  propertySizeRange,
  developer,
  completion,
  description,
  pricePerSqFt,
  features,
  tenure,
  status = 'upcoming',
  ctaText = "View Project"
}: ProjectCardProps) {
  // Dynamic status based on completion date
  const getDynamicStatus = () => {
    if (!completion) {
      // Fallback to prop status if no completion date
      return statusConfig[status];
    }
    
    const currentYear = new Date().getFullYear();
    const completionYear = parseInt(completion.split('-')[0]);
    
    if (completionYear < currentYear) {
      return {
        label: 'Completed',
        bg: 'bg-green-500',
        text: 'text-white'
      };
    } else {
      return {
        label: 'Coming Soon',
        bg: 'bg-orange-500',
        text: 'text-white'
      };
    }
  };

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

  const dynamicStatus = getDynamicStatus();

  return (
    <div className={`group relative bg-[#242728] border border-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-700 ${className}`}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image_url_banner && image_url_banner.trim() !== '' ? image_url_banner : (image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80')}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            console.log('Image failed to load:', e.currentTarget.src);
            console.log('image_url_banner:', image_url_banner);
            console.log('image:', image);
          }}
        />
        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${dynamicStatus.bg} ${dynamicStatus.text}`}>
            {dynamicStatus.label}
          </span>
          {units && (() => {
            const unitsMatch = units.match(/(\d+)\s*Units?/);
            return unitsMatch && parseInt(unitsMatch[1]) === 0;
          })() && (
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-red-600 text-white shadow-lg">
              Sold Out
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Location/District */}
        <div className="text-xs text-gray-400 mb-1.5 truncate flex items-center">
          <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
          {address || location}
        </div>
        {/* Project Name */}
        <h3 className="text-xl font-light mb-2 text-white truncate">{name}</h3>
        {/* Badges for tenure and TOP */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tenure && (
            <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-700 hover:bg-gray-700 transition-colors">
              {tenure}
            </span>
          )}
          {completion && (
            <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-700 hover:bg-gray-700 transition-colors">
              TOP: {completion.split('-')[0]}
            </span>
          )}
          {units && (
            <span className="flex items-center bg-gray-800 text-gray-300 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-700 hover:bg-gray-700 transition-colors">
              <Home className="h-3 w-3 mr-1.5 text-gray-400" />
              {units}
            </span>
          )}
        </div>
        
        {/* Price at the bottom */}
        <div className="mt-auto pt-4 border-t border-gray-800">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <div className="text-xs text-gray-400 mb-1">From</div>
              <div className="text-xl font-semibold text-white">
                {price_from && price_from !== '0' ? price_from : 'Price per request'}
              </div>
            </div>
            {pricePerSqFt && (
              <div className="text-right">
                <div className="text-xs text-gray-400">PSF</div>
                <div className="text-sm font-medium text-gray-300">
                  ${pricePerSqFt}
                </div>
              </div>
            )}
          </div>
          <Link href={`/projects/${slug}`} className="block">
            <Button variant="default" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-2.5 transition-all duration-200 hover:shadow-lg">
              {ctaText}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
