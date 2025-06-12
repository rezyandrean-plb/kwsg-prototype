"use client"

import { FileText, DollarSign, MapPinned, Newspaper } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProjectNavigationProps {
  onTabChange: (value: string) => void
}

export default function ProjectNavigation({ onTabChange }: ProjectNavigationProps) {
  const handleTabChange = (value: string) => {
    onTabChange(value)
    const element = document.getElementById(value)
    if (element) {
      const headerOffset = 120 // Adjust based on header height + tabs height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  return (
    <div className="sticky top-[64px] z-50 bg-[#1c1c1d] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
          <div className="overflow-x-auto">
            <TabsList className="w-full justify-start bg-transparent border-b-0 p-0 min-w-max">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-red-500 rounded-none px-4 sm:px-6 py-3 sm:py-4 text-gray-400 hover:text-white flex items-center gap-2 whitespace-nowrap transition-colors"
              >
                <FileText className="h-4 w-4 data-[state=active]:text-red-500" />
                <span className="text-sm sm:text-base">Project Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="pricing" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-red-500 rounded-none px-4 sm:px-6 py-3 sm:py-4 text-gray-400 hover:text-white flex items-center gap-2 whitespace-nowrap transition-colors"
              >
                <DollarSign className="h-4 w-4 data-[state=active]:text-red-500" />
                <span className="text-sm sm:text-base">Unit Types & Pricing</span>
              </TabsTrigger>
              <TabsTrigger 
                value="location" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-red-500 rounded-none px-4 sm:px-6 py-3 sm:py-4 text-gray-400 hover:text-white flex items-center gap-2 whitespace-nowrap transition-colors"
              >
                <MapPinned className="h-4 w-4 data-[state=active]:text-red-500" />
                <span className="text-sm sm:text-base">Location</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-red-500 rounded-none px-4 sm:px-6 py-3 sm:py-4 text-gray-400 hover:text-white flex items-center gap-2 whitespace-nowrap transition-colors"
              >
                <Newspaper className="h-4 w-4 data-[state=active]:text-red-500" />
                <span className="text-sm sm:text-base">Media Reviews</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  )
} 