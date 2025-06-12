"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Train, MapPinned, School, Train as TrainIcon, ShoppingBag, Utensils, ShoppingCart, Trees } from "lucide-react"
import dynamic from 'next/dynamic'
import { Project } from "@/lib/data"

// Dynamically import the map component with no SSR
const NearbyAmenitiesMap = dynamic(
  () => import('@/app/components/NearbyAmenitiesMap'),
  { ssr: false }
)

interface GooglePlace {
  placeId: string
  name: string
  address: string
  location: {
    lat: number
    lng: number
  }
  type: string
  distance: string
  duration: string
  transportMode: string
  isNearest?: boolean
}

interface LocationAnalytics {
  mrt: Array<{ name: string; distance: string }>
  schools: Array<{ name: string; distance: string }>
  amenities: Array<{ name: string; distance: string }>
  parks: Array<{ name: string; distance: string }>
}

interface ProjectLocationProps {
  project: Project
  locationAnalytics: LocationAnalytics
  realAmenitiesData: Record<string, GooglePlace[]>
  isLoadingAmenities: boolean
}

const amenityTabs = [
  { key: "all", label: "All", icon: MapPinned },
  { key: "schools", label: "Schools", icon: School },
  { key: "transport", label: "Transport", icon: TrainIcon },
  { key: "shopping", label: "Shopping Mall", icon: ShoppingBag },
  { key: "food", label: "Food Centre", icon: Utensils },
  { key: "groceries", label: "Groceries", icon: ShoppingCart },
  { key: "recreation", label: "Recreation", icon: Trees },
]

export default function ProjectLocation({ 
  project, 
  locationAnalytics, 
  realAmenitiesData, 
  isLoadingAmenities 
}: ProjectLocationProps) {
  const [selectedAmenityType, setSelectedAmenityType] = useState<string>("schools")
  const [selectedAmenity, setSelectedAmenity] = useState<GooglePlace | null>(null)

  // Get unique amenities for the selected type
  const amenities = selectedAmenityType === "all"
    ? Object.values(realAmenitiesData).flat()
    : realAmenitiesData[selectedAmenityType] || []

  const uniqueAmenities = Array.from(
    new Map(amenities.map((item: GooglePlace) => [item.placeId, item])).values()
  )

  return (
    <div id="location" className="space-y-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Location</h2>
      
      {/* Map and Amenities Section */}
      <div className="bg-[#242728] rounded-lg p-6">
        <Tabs defaultValue={selectedAmenityType} className="w-full" onValueChange={setSelectedAmenityType}>
          <TabsList className="mb-6 overflow-x-auto flex flex-wrap">
            {amenityTabs.map((tab) => (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white px-4 py-2 flex items-center gap-2 whitespace-nowrap transition-colors"
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map Component */}
            <div className="h-[500px] rounded-lg overflow-hidden border border-gray-700">
              <NearbyAmenitiesMap project={project} />
            </div>

            {/* Amenities List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {isLoadingAmenities ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-400">Loading amenities...</div>
                </div>
              ) : uniqueAmenities.length > 0 ? (
                uniqueAmenities.map((place) => (
                  <div
                    key={place.placeId}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedAmenity?.placeId === place.placeId
                        ? 'bg-red-500/10 border border-red-500/20'
                        : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800'
                    }`}
                    onClick={() => setSelectedAmenity(place)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-white mb-1">{place.name}</h4>
                        <p className="text-sm text-gray-400 mb-2">{place.address}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-300 flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-red-500" />
                            {place.distance}
                          </span>
                          <span className="text-gray-300 flex items-center gap-1">
                            <Clock className="h-4 w-4 text-red-500" />
                            {place.duration}
                          </span>
                          <span className="text-gray-300 flex items-center gap-1">
                            <Train className="h-4 w-4 text-red-500" />
                            {place.transportMode}
                          </span>
                        </div>
                      </div>
                      {place.isNearest && (
                        <Badge className="bg-red-500/10 text-red-500 border border-red-500/20">
                          Nearest
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  No amenities found in this category
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </div>

      {/* Location Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(locationAnalytics).map(([category, items]) => (
          <Card key={category} className="bg-[#242728] border-gray-700">
            <CardContent className="p-4">
              <h3 className="font-semibold text-white mb-3 capitalize">{category}</h3>
              <ul className="space-y-2">
                {items.map((item: { name: string; distance: string }, idx: number) => (
                  <li key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-gray-400">{item.distance}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 