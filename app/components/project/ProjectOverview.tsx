"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MoatRadarChart from "@/app/components/ai-moat"

interface ProjectOverviewProps {
  description: string
  facilities: string[]
  moat: {
    project: string
    exitAudience: number
    districtDisparityEffect: number
    mrtProximity: number
    parentsAttractionEffect: number
    quantumEffect: number
    rentalDemand: number
    regionDisparityEffect: number
    volumeEffect: number
    balasCurveEffect: number
    landsizeDensity: number
  }
}

export default function ProjectOverview({ description, facilities, moat }: ProjectOverviewProps) {
  return (
    <div id="overview" className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">Project Overview</h2>
        <p className="text-gray-300 leading-relaxed mb-8">{description}</p>

        <h3 className="text-xl font-semibold mb-4 text-white">Facilities</h3>
        <div className="flex flex-wrap gap-4 mb-8">
          {facilities.map((facility, idx) => (
            <span 
              key={idx} 
              className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors"
            >
              {facility}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <MoatRadarChart moat={moat} />
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-white">Site Plan</h3>
        <div className="bg-[#242728] rounded-lg p-6">
          <Tabs defaultValue="project-map" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger 
                value="project-map" 
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-l px-6 py-2 transition-colors"
              >
                Project Map
              </TabsTrigger>
              <TabsTrigger 
                value="elevation-chart" 
                className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-r px-6 py-2 transition-colors"
              >
                Elevation Chart
              </TabsTrigger>
            </TabsList>
            <TabsContent value="project-map">
              <img 
                src="/siteplan-dummy.jpg" 
                alt="Project Site Map" 
                className="rounded w-full"
                loading="lazy"
              />
            </TabsContent>
            <TabsContent value="elevation-chart">
              <img 
                src="/siteplan-dummy.jpg" 
                alt="Elevation Chart" 
                className="rounded w-full"
                loading="lazy"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 