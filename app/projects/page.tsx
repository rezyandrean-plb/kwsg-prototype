import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ArrowRight } from "lucide-react"
import ProjectCard from "@/components/project-card"
import Image from "next/image"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-black text-white h-screen flex items-center">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
            alt="New Launch Projects"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 flex items-center bg-black/40">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">New Launch Projects</h1>
              <p className="text-xl max-w-3xl mx-auto mb-12 text-gray-100">
                Discover the most exclusive new property launches in prime locations
              </p>
              <div className="max-w-3xl mx-auto bg-black/90 rounded-lg overflow-hidden flex backdrop-blur-sm">
                <Input
                  type="text"
                  placeholder="Search by project name, location, or developer..."
                  className="flex-1 border-0 bg-gray-900 text-white placeholder:text-gray-400 focus-visible:ring-0"
                />
                <Button className="rounded-none bg-primary-red hover:bg-primary-red/90">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">All Projects</h2>
              <p className="text-gray-300">Showing 12 new launch projects</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <Button variant="outline" className="flex items-center border-gray-700 text-gray-300 hover:bg-gray-800">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <select className="ml-4 p-2 border border-gray-700 rounded-md bg-gray-900 text-gray-300">
                <option>Sort by: Latest</option>
                <option>Sort by: Price (Low to High)</option>
                <option>Sort by: Price (High to Low)</option>
                <option>Sort by: Popularity</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="10 Evelyn"
              location="Newton, District 11"
              price="From $1.2M"
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
              units="120 Units"
              developer="Amara Holdings"
              completion="2025"
              slug="10-evelyn"
            />

            <ProjectCard
              title="The Avenir"
              location="River Valley, District 9"
              price="From $2.5M"
              image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
              units="376 Units"
              developer="Hong Leong Group"
              completion="2025"
              slug="the-avenir"
            />

            <ProjectCard
              title="Midtown Modern"
              location="Bugis, District 7"
              price="From $1.8M"
              image="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
              units="558 Units"
              developer="GuocoLand"
              completion="2024"
              slug="midtown-modern"
            />

            <ProjectCard
              title="Clavon"
              location="Clementi, District 5"
              price="From $1.5M"
              image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80"
              units="640 Units"
              developer="UOL Group"
              completion="2024"
              slug="clavon"
            />

            <ProjectCard
              title="Normanton Park"
              location="Kent Ridge, District 5"
              price="From $1.1M"
              image="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80"
              units="1862 Units"
              developer="Kingsford Development"
              completion="2023"
              slug="normanton-park"
            />

            <ProjectCard
              title="The Reef at King's Dock"
              location="HarbourFront, District 4"
              price="From $2.0M"
              image="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80"
              units="429 Units"
              developer="Mapletree/Keppel Land"
              completion="2025"
              slug="the-reef"
            />
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" className="mx-1 px-4 border-gray-700 text-gray-300 hover:bg-gray-800">
              1
            </Button>
            <Button variant="outline" className="mx-1 px-4 border-gray-700 text-gray-300 hover:bg-gray-800">
              2
            </Button>
            <Button variant="outline" className="mx-1 px-4 border-gray-700 text-gray-300 hover:bg-gray-800">
              3
            </Button>
            <Button variant="outline" className="mx-1 border-gray-700 text-gray-300 hover:bg-gray-800">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Why Choose Us for New Launches?</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
            We specialize exclusively in new property launches, giving you the edge in this competitive market
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">First Access</h3>
              <p className="text-gray-300">Get priority access to new launches before they hit the market</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Expert Guidance</h3>
              <p className="text-gray-300">Our specialists have in-depth knowledge of every new launch project</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Exclusive Deals</h3>
              <p className="text-gray-300">
                Access to developer discounts and special packages not available elsewhere
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
