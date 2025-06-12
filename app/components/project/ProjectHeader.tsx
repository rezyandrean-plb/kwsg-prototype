"use client"

import { Building2, MapPin, Calendar, Home, DollarSign } from "lucide-react"

interface ProjectHeaderProps {
  title: string
  location: string
  developer: string
  completion: string
  totalUnits: string
  unitsAvailable: number
  totalUnitsCount: number
  price: string
}

export default function ProjectHeader({
  title,
  location,
  developer,
  completion,
  totalUnits,
  unitsAvailable,
  totalUnitsCount,
  price
}: ProjectHeaderProps) {
  // Calculate units left percentage
  const unitsLeftPercent = totalUnitsCount > 0 ? Math.round((unitsAvailable / totalUnitsCount) * 100) : 0

  return (
    <div className="absolute left-0 bottom-0 p-8 text-white z-10 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
      <div className="flex items-center gap-2 text-gray-200 mb-2">
        <MapPin className="h-5 w-5 text-red-500" />
        <span className="text-lg">{location}</span>
      </div>
      <div className="flex flex-wrap gap-4 text-gray-200 text-base mb-2">
        <div className="flex items-center">
          <Building2 className="h-5 w-5 mr-2 text-red-500" />
          {developer}
        </div>
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-red-500" />
          Est. {completion}
        </div>
        <div className="flex items-center">
          <Home className="h-5 w-5 mr-2 text-red-500" />
          {totalUnits}
        </div>
        <div className="flex items-center bg-black/60 px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-white">
            Units Left: {unitsAvailable}/{totalUnitsCount} ({unitsLeftPercent}%)
          </span>
        </div>
      </div>
    </div>
  )
} 