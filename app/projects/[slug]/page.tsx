import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, MapPin, Calendar, Home, DollarSign, Phone, Mail, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import ProjectCard from "@/components/project-card"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // This would normally fetch data based on the slug
  // For this prototype, we'll use hardcoded data for 10 Evelyn
  const project = {
    title: "10 Evelyn",
    location: "Newton, District 11",
    price: "From $1.2M",
    pricePerSqFt: "$2,100 - $2,400 psf",
    description:
      "10 Evelyn is a freehold condominium development located in the prime District 11 of Singapore. Nestled in the tranquil Newton enclave, this exclusive development offers a perfect blend of luxury, convenience, and serenity. With its strategic location, residents enjoy proximity to Newton MRT Station, providing seamless connectivity to the rest of the island.",
    features: [
      "Freehold tenure",
      "56 exclusive units",
      "1 to 3 bedroom configurations",
      "Full condominium facilities",
      "Close proximity to Newton MRT",
      "Near prestigious schools",
      "Surrounded by amenities",
    ],
    developer: "Amara Holdings",
    tenure: "Freehold",
    completion: "2025",
    totalUnits: "56 Units",
    unitTypes: [
      { type: "1 Bedroom", size: "484 - 506 sq ft", price: "From $1.2M" },
      { type: "2 Bedroom", size: "678 - 721 sq ft", price: "From $1.6M" },
      { type: "3 Bedroom", size: "1,066 - 1,119 sq ft", price: "From $2.5M" },
    ],
    facilities: [
      "Swimming Pool",
      "Gymnasium",
      "BBQ Pits",
      "Children's Playground",
      "Clubhouse",
      "Function Room",
      "Landscaped Gardens",
    ],
    nearbyAmenities: [
      "Newton MRT Station (5 min walk)",
      "Novena MRT Station (10 min walk)",
      "United Square Shopping Mall",
      "Velocity @ Novena Square",
      "Newton Food Centre",
      "Anglo-Chinese School (Junior)",
      "St. Joseph's Institution",
    ],
    images: [
      "/placeholder.svg?key=gabjg",
      "/placeholder.svg?key=6s9zc",
      "/placeholder.svg?key=7ewf3",
      "/placeholder.svg?key=jdjoc",
    ],
    similarProjects: [
      {
        title: "The Avenir",
        location: "River Valley, District 9",
        price: "From $2.5M",
        image: "/placeholder.svg?key=1wce3",
        units: "376 Units",
        developer: "Hong Leong Group",
        completion: "2025",
        slug: "the-avenir",
        description: "Luxury living in the heart of River Valley with stunning city views and world-class amenities.",
        features: ["Freehold", "Luxury finishes", "City views", "Full facilities"],
        pricePerSqFt: "$2,800 - $3,200 psf"
      },
      {
        title: "Midtown Modern",
        location: "Bugis, District 7",
        price: "From $1.8M",
        image: "/placeholder.svg?key=7233g",
        units: "558 Units",
        developer: "GuocoLand",
        completion: "2024",
        slug: "midtown-modern",
        description: "Contemporary urban living in the vibrant Bugis district, combining modern design with convenience.",
        features: ["99-year leasehold", "Smart home features", "Urban lifestyle", "Integrated development"],
        pricePerSqFt: "$2,400 - $2,800 psf"
      },
      {
        title: "Clavon",
        location: "Clementi, District 5",
        price: "From $1.5M",
        image: "/placeholder.svg?key=5j2ou",
        units: "640 Units",
        developer: "UOL Group",
        completion: "2024",
        slug: "clavon",
        description: "Family-friendly development in the established Clementi neighborhood with excellent connectivity.",
        features: ["99-year leasehold", "Family-oriented", "Near MRT", "Good schools"],
        pricePerSqFt: "$1,800 - $2,200 psf"
      }
    ]
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <Image
          src={project.images[0] || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4 w-fit">
              New Launch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{project.title}</h1>
            <div className="flex items-center text-white/90 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">{project.location}</span>
            </div>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                <span>{project.developer}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Est. Completion: {project.completion}</span>
              </div>
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                <span>{project.totalUnits}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>{project.price}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:w-2/3">
              <Tabs defaultValue="overview">
                <TabsList className="w-full border-b mb-8">
                  <TabsTrigger value="overview" className="text-lg">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="gallery" className="text-lg">
                    Gallery
                  </TabsTrigger>
                  <TabsTrigger value="floor-plans" className="text-lg">
                    Floor Plans
                  </TabsTrigger>
                  <TabsTrigger value="location" className="text-lg">
                    Location
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About {project.title}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>

                    <h3 className="text-xl font-bold mb-3">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Unit Types</h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border px-4 py-3 text-left">Type</th>
                            <th className="border px-4 py-3 text-left">Size</th>
                            <th className="border px-4 py-3 text-left">Price</th>
                            <th className="border px-4 py-3 text-left">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.unitTypes.map((unit, index) => (
                            <tr key={index} className="border-b">
                              <td className="border px-4 py-3">{unit.type}</td>
                              <td className="border px-4 py-3">{unit.size}</td>
                              <td className="border px-4 py-3">{unit.price}</td>
                              <td className="border px-4 py-3">
                                <Button size="sm">View Details</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Facilities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {project.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="bg-primary/10 p-2 rounded-full mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {facility}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Nearby Amenities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.nearbyAmenities.map((amenity, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gallery">
                  <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.images.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} - Image ${index + 1}`}
                          width={600}
                          height={400}
                          className="w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="floor-plans">
                  <h2 className="text-2xl font-bold mb-6">Floor Plans</h2>
                  <div className="space-y-8">
                    {project.unitTypes.map((unit, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b">
                          <h3 className="text-xl font-bold">{unit.type}</h3>
                          <p className="text-gray-600">{unit.size}</p>
                        </div>
                        <div className="p-6">
                          <Image
                            src={`/placeholder.svg?key=6t3k5&key=glhwa&height=400&width=600&query=floor plan for ${unit.type} apartment`}
                            alt={`Floor Plan - ${unit.type}`}
                            width={600}
                            height={400}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="location">
                  <h2 className="text-2xl font-bold mb-6">Location</h2>
                  <div className="rounded-lg overflow-hidden shadow-lg mb-6">
                    <Image
                      src="/placeholder.svg?key=t9q5d"
                      alt="Location Map"
                      width={800}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Transportation</h3>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        Newton MRT Station (5 min walk)
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        Novena MRT Station (10 min walk)
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/10 p-1 rounded-full mr-3 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        Multiple bus services along Bukit Timah Road
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold mb-4">Interested in this project?</h3>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and our specialist will get in touch with you shortly.
                </p>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input id="name" type="text" placeholder="Your name" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input id="phone" type="tel" placeholder="Your phone number" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="I'm interested in this project..."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    ></textarea>
                  </div>

                  <Button className="w-full bg-primary text-white hover:bg-primary/90">Inquire Now</Button>
                </form>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Contact our specialist directly:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-primary" />
                      <span>+65 8123 4567</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-primary" />
                      <span>newlaunches@example.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Projects */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Similar Projects You May Like</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {project.similarProjects.map((similarProject) => (
              <ProjectCard
                key={similarProject.slug}
                title={similarProject.title}
                location={similarProject.location}
                price={similarProject.price}
                image={similarProject.image}
                units={similarProject.units}
                developer={similarProject.developer}
                completion={similarProject.completion}
                slug={similarProject.slug}
                description={similarProject.description}
                pricePerSqFt={similarProject.pricePerSqFt}
                features={similarProject.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team of New Launch Specialists</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Leverage our technology, training, and exclusive developer relationships to grow your real estate career
          </p>
          <Button className="bg-white text-primary hover:bg-gray-100">
            Join Recruitment Webinar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  )
}
