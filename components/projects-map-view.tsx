"use client"

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import '@/app/leaflet.css'

// Project type definition (matching the one in projects page)
type Project = {
  slug: string
  name: string
  location: string
  address?: string
  price: string
  type?: string
  image: string
  image_url_banner?: string | null
  coordinates?: {
    lat: number
    lng: number
  }
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
  district?: number
  tenure?: string
  propertyType?: string
  bedrooms?: string[]
}

// Dynamically import the map components with no SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

interface ProjectsMapViewProps {
  projects: Project[]
}

export default function ProjectsMapView({ projects }: ProjectsMapViewProps) {
  const [buildingIcon, setBuildingIcon] = useState<any>(null)

  // Create custom building marker icon using the SVG from S3 - only run on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        // Create custom icon using the condo marker SVG
        const icon = L.default.icon({
          iconUrl: 'https://kwsingapore.s3.ap-southeast-1.amazonaws.com/images/condo-marker.svg',
          iconSize: [40, 40],
          iconAnchor: [20, 20], // Anchor at center for circular marker
          popupAnchor: [0, -20], // Popup appears above the marker
          className: 'custom-condo-marker'
        })

        setBuildingIcon(icon)
      })
    }
  }, [])

  // Filter projects that have valid coordinates
  const projectsWithCoords = projects.filter(
    (p) => {
      const hasCoords = p.coordinates && 
        typeof p.coordinates.lat === 'number' && 
        typeof p.coordinates.lng === 'number' &&
        !isNaN(p.coordinates.lat) &&
        !isNaN(p.coordinates.lng) &&
        p.coordinates.lat !== 0 &&
        p.coordinates.lng !== 0
      return hasCoords
    }
  )

  // Debug logging
  if (typeof window !== 'undefined') {
    console.log('ProjectsMapView - Total projects:', projects.length)
    console.log('ProjectsMapView - Projects with coords:', projectsWithCoords.length)
    if (projectsWithCoords.length > 0) {
      console.log('ProjectsMapView - First few projects with coords:', projectsWithCoords.slice(0, 3).map(p => ({
        name: p.name,
        coords: p.coordinates
      })))
    }
  }

  // Calculate center point (average of all project coordinates, or default to Singapore)
  const center: [number, number] = projectsWithCoords.length > 0
    ? [
        projectsWithCoords.reduce((sum, p) => sum + (p.coordinates?.lat || 0), 0) / projectsWithCoords.length,
        projectsWithCoords.reduce((sum, p) => sum + (p.coordinates?.lng || 0), 0) / projectsWithCoords.length,
      ]
    : [1.3521, 103.8198] // Default Singapore coordinates

  // Calculate zoom level based on number of projects
  // For Singapore, zoom 11 shows the whole island, 12-13 shows districts, 14-15 shows neighborhoods
  const zoom = projectsWithCoords.length === 0 
    ? 11 
    : projectsWithCoords.length === 1 
      ? 15 
      : projectsWithCoords.length < 5
        ? 13
        : projectsWithCoords.length < 20
          ? 12
          : 11

  if (projectsWithCoords.length === 0) {
    return (
      <div className="w-full h-[600px] rounded-lg bg-gray-900 flex items-center justify-center border border-gray-700">
        <p className="text-gray-400">No projects with location data available</p>
      </div>
    )
  }

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-700">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {projectsWithCoords.map((project, index) => (
          <Marker
            key={`${project.slug}-${index}-${project.coordinates!.lat}-${project.coordinates!.lng}`}
            position={[project.coordinates!.lat, project.coordinates!.lng]}
            icon={buildingIcon || undefined}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{project.location}</p>
                {project.address && (
                  <p className="text-xs text-gray-500 mb-2">{project.address}</p>
                )}
                <div className="flex items-center gap-2 text-sm mb-1">
                  <span className="font-semibold text-gray-900">Price:</span>
                  <span className="text-gray-700">{project.price}</span>
                </div>
                {project.type && (
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <span className="font-semibold text-gray-900">Type:</span>
                    <span className="text-gray-700">{project.type}</span>
                  </div>
                )}
                {project.developer && (
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <span className="font-semibold text-gray-900">Developer:</span>
                    <span className="text-gray-700">{project.developer}</span>
                  </div>
                )}
                {project.district && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-900">District:</span>
                    <span className="text-gray-700">D{project.district}</span>
                  </div>
                )}
                <a
                  href={`/projects/${project.slug}`}
                  className="mt-2 inline-block text-sm text-primary-red hover:underline font-semibold"
                >
                  View Details →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

