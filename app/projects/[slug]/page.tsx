"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, MapPin, Calendar, Home, DollarSign, Phone, Mail, ArrowRight, Star, TrendingUp, Train, School, ShoppingBag, Trees } from "lucide-react"
import { Input } from "@/components/ui/input"
import ProjectCard from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // This would normally fetch data based on the slug
  const project = {
    title: "10 Evelyn",
    location: "Newton, District 11",
    price: "From $1.2M",
    pricePerSqFt: "$2,100 - $2,400 psf",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80"
    ],
    units: "56 Units",
    developer: "Amara Holdings",
    completion: "2025",
    description: "Luxury freehold development in the heart of Newton, offering exclusive living spaces with premium finishes.",
    features: ["Freehold", "Luxury finishes", "Prime location", "Full facilities"],
    district: 11,
    tenure: "Freehold",
    propertyType: "Condominium",
    status: "Launching Soon",
    totalUnits: "56 Units",
    totalFloors: "24 Floors",
    siteArea: "12,000 sq ft",
    unitTypes: [
      { type: "1 Bedroom", size: "484 - 527 sq ft", price: "From $1.2M" },
      { type: "2 Bedroom", size: "678 - 753 sq ft", price: "From $1.8M" },
      { type: "3 Bedroom", size: "1,076 - 1,184 sq ft", price: "From $2.8M" },
      { type: "4 Bedroom", size: "1,518 - 1,636 sq ft", price: "From $4.2M" }
    ],
    floorPlans: [
      { type: "1 Bedroom", image: "/floor-plans/1br.svg" },
      { type: "2 Bedroom", image: "/floor-plans/2br.svg" },
      { type: "3 Bedroom", image: "/floor-plans/3br.svg" },
      { type: "4 Bedroom", image: "/floor-plans/4br.svg" }
    ],
    locationAnalytics: {
      mrt: [
        { name: "Newton MRT", distance: "3 min walk" },
        { name: "Orchard MRT", distance: "10 min walk" }
      ],
      schools: [
        { name: "Anglo-Chinese School (Junior)", distance: "5 min walk" },
        { name: "St. Margaret's Primary School", distance: "8 min walk" }
      ],
      amenities: [
        { name: "United Square", distance: "3 min walk" },
        { name: "Goldhill Plaza", distance: "5 min walk" }
      ],
      parks: [
        { name: "Newton Green", distance: "2 min walk" }
      ]
    },
    mediaReviews: [
      {
        source: "The Edge Property",
        date: "2024-02-15",
        title: "10 Evelyn: A Rare Freehold Gem in Newton",
        excerpt: "The development offers a unique opportunity for investors and homeowners alike...",
        rating: 4.5
      },
      {
        source: "PropertyGuru",
        date: "2024-02-10",
        title: "Why 10 Evelyn is the Talk of Newton",
        excerpt: "With its prime location and luxury finishes, 10 Evelyn stands out...",
        rating: 4.8
      }
    ],
    similarProjects: [
      {
        title: "The Avenir",
        location: "River Valley, District 9",
        price: "From $2.5M",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
        units: "376 Units",
        developer: "Hong Leong Group",
        completion: "2025",
        slug: "the-avenir"
      },
      {
        title: "Midtown Modern",
        location: "Bugis, District 7",
        price: "From $1.8M",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
        units: "558 Units",
        developer: "GuocoLand",
        completion: "2024",
        slug: "midtown-modern"
      }
    ]
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4 w-fit">
              {project.status}
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
                  <TabsTrigger value="overview" className="text-lg">Overview</TabsTrigger>
                  <TabsTrigger value="pricing" className="text-lg">Pricing</TabsTrigger>
                  <TabsTrigger value="floor-plans" className="text-lg">Floor Plans</TabsTrigger>
                  <TabsTrigger value="location" className="text-lg">Location</TabsTrigger>
                  <TabsTrigger value="reviews" className="text-lg">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Total Units</div>
                        <div className="font-semibold">{project.totalUnits}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Total Floors</div>
                        <div className="font-semibold">{project.totalFloors}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Site Area</div>
                        <div className="font-semibold">{project.siteArea}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Tenure</div>
                        <div className="font-semibold">{project.tenure}</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Unit Types & Pricing</h2>
                    <div className="grid gap-6">
                      {project.unitTypes.map((unit, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-semibold mb-2">{unit.type}</h3>
                                <p className="text-gray-600">{unit.size}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-primary">{unit.price}</div>
                                <div className="text-sm text-gray-500">Starting Price</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="floor-plans" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Floor Plans</h2>
                    <div className="grid gap-8">
                      {project.floorPlans.map((plan, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-xl font-semibold mb-4">{plan.type}</h3>
                          <div className="aspect-[4/3] relative bg-white rounded-lg overflow-hidden">
                            <Image
                              src={plan.image}
                              alt={`${plan.type} Floor Plan`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Location Analytics</h2>
                    <div className="grid gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Train className="h-5 w-5 text-primary" />
                          MRT Stations
                        </h3>
                        <div className="grid gap-4">
                          {project.locationAnalytics.mrt.map((station, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                              <span>{station.name}</span>
                              <Badge variant="secondary">{station.distance}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <School className="h-5 w-5 text-primary" />
                          Schools
                        </h3>
                        <div className="grid gap-4">
                          {project.locationAnalytics.schools.map((school, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                              <span>{school.name}</span>
                              <Badge variant="secondary">{school.distance}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <ShoppingBag className="h-5 w-5 text-primary" />
                          Shopping & Amenities
                        </h3>
                        <div className="grid gap-4">
                          {project.locationAnalytics.amenities.map((amenity, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                              <span>{amenity.name}</span>
                              <Badge variant="secondary">{amenity.distance}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Trees className="h-5 w-5 text-primary" />
                          Parks & Recreation
                        </h3>
                        <div className="grid gap-4">
                          {project.locationAnalytics.parks.map((park, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                              <span>{park.name}</span>
                              <Badge variant="secondary">{park.distance}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Media Reviews</h2>
                    <div className="grid gap-6">
                      {project.mediaReviews.map((review, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-semibold mb-2">{review.title}</h3>
                                <p className="text-gray-500">{review.source} • {review.date}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                <span className="font-semibold">{review.rating}</span>
                              </div>
                            </div>
                            <p className="text-gray-600">{review.excerpt}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:w-1/3">
              <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Interested in this project?</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        className="w-full"
                      />
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
                {...similarProject}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
