"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EditorialCardProps {
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
  slug: string
  className?: string
}

export default function EditorialCard({
  title,
  excerpt,
  image,
  date,
  readTime,
  category,
  slug,
  className = ""
}: EditorialCardProps) {
  return (
    <article className={cn(
      "group relative bg-[#242728]/80 border border-[#2e3133] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm",
      className
    )}>
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-red text-white">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {readTime}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-3 text-white line-clamp-2 group-hover:text-primary-red transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Read More Link */}
        <Link 
          href={`/editorial/${slug}`} 
          className="mt-auto inline-flex items-center text-primary-red hover:text-primary-red/90 font-medium group"
        >
          Read More
          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
} 