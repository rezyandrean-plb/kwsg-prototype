"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"

interface SimilarProject {
  id: string
  slug: string
  title: string
  location: string
  price: string
  image: string
  beds: number
  baths: number
  size: string
}

interface ProjectSimilarProps {
  projects: SimilarProject[]
}

export default function ProjectSimilar({ projects }: ProjectSimilarProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Similar Projects</h2>
        <p className="text-gray-400">Discover other properties you might be interested in</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group bg-[#242728] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
          >
            <div className="relative h-48 w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center text-gray-300 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.location}
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Starting from</span>
                <span className="text-lg font-semibold text-primary">{project.price}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-gray-800/50 rounded p-2 text-center">
                  <div className="text-gray-400">Beds</div>
                  <div className="font-medium text-white">{project.beds}</div>
                </div>
                <div className="bg-gray-800/50 rounded p-2 text-center">
                  <div className="text-gray-400">Baths</div>
                  <div className="font-medium text-white">{project.baths}</div>
                </div>
                <div className="bg-gray-800/50 rounded p-2 text-center">
                  <div className="text-gray-400">Size</div>
                  <div className="font-medium text-white">{project.size}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 