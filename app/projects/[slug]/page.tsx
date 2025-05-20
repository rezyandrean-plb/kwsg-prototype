"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, MapPin, Calendar, Home, DollarSign, Phone, Mail, ArrowRight, Star, TrendingUp, Train, School, ShoppingBag, Trees, Map } from "lucide-react"
import { Input } from "@/components/ui/input"
import ProjectCard from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { use } from "react"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const unwrappedParams = use(params)
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
      { type: "1 Bedroom", image: "https://wpmedia.roomsketcher.com/content/uploads/2022/01/06145940/What-is-a-floor-plan-with-dimensions.png" },
      { type: "2 Bedroom", image: "https://wpmedia.roomsketcher.com/content/uploads/2022/01/06145940/What-is-a-floor-plan-with-dimensions.png" },
      { type: "3 Bedroom", image: "https://wpmedia.roomsketcher.com/content/uploads/2022/01/06145940/What-is-a-floor-plan-with-dimensions.png" },
      { type: "4 Bedroom", image: "https://wpmedia.roomsketcher.com/content/uploads/2022/01/06145940/What-is-a-floor-plan-with-dimensions.png" },
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
        priceRange: "$2.5M - $4.8M",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
        units: "376 Units",
        unitsAvailable: "376 Units",
        propertySizeRange: "614 - 1,862 sqft",
        developer: "Hong Leong Group",
        completion: "2025",
        slug: "the-avenir"
      },
      {
        title: "Midtown Modern",
        location: "Bugis, District 7",
        price: "From $1.8M",
        priceRange: "$1.8M - $3.8M",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
        units: "558 Units",
        unitsAvailable: "558 Units",
        propertySizeRange: "678 - 1,862 sqft",
        developer: "GuocoLand",
        completion: "2024",
        slug: "midtown-modern"
      }
    ]
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Black gap above breadcrumbs */}
      <div className="w-full bg-black" style={{ height: '4rem' }} />
      {/* Breadcrumbs */}
      <nav className="bg-gray-50 py-3 px-4 text-sm text-gray-500">
        <ol className="flex space-x-2">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li>/</li>
          <li><a href="/projects" className="hover:underline">Projects</a></li>
          <li>/</li>
          <li className="text-primary font-semibold">{project.title}</li>
        </ol>
      </nav>

      {/* Top Section: Gallery + Info */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
          {/* Image Gallery */}
          <div className="md:w-2/3 flex flex-col items-center">
            <div className="w-full aspect-[16/9] relative rounded-lg overflow-hidden mb-4">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex gap-2 w-full justify-center">
              {project.images.map((img, idx) => (
                <div key={idx} className="w-20 h-14 relative rounded overflow-hidden border border-gray-200">
                  <Image src={img} alt={`${project.title} thumb ${idx+1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          {/* Project Info Card */}
          <div className="md:w-1/3 flex flex-col gap-4">
            <div className="bg-primary text-white rounded-lg p-6 shadow-lg flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">{project.status}</span>
                <span className="ml-auto text-xs">Ref: {unwrappedParams.slug}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex flex-wrap gap-3 text-white/90 text-sm">
                <div className="flex items-center"><Building2 className="h-4 w-4 mr-1" />{project.developer}</div>
                <div className="flex items-center"><Calendar className="h-4 w-4 mr-1" />Est. {project.completion}</div>
                <div className="flex items-center"><Home className="h-4 w-4 mr-1" />{project.totalUnits}</div>
                <div className="flex items-center"><DollarSign className="h-4 w-4 mr-1" />{project.price}</div>
              </div>
              <Button className="mt-4 bg-white text-primary hover:bg-gray-100 font-semibold" variant="outline">
                Download Brochure
              </Button>
            </div>
            {/* Key Facts Card */}
            <div className="bg-white border rounded-lg p-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Tenure</div>
                <div className="font-semibold">{project.tenure}</div>
              </div>
              <div>
                <div className="text-gray-500">Property Type</div>
                <div className="font-semibold">{project.propertyType}</div>
              </div>
              <div>
                <div className="text-gray-500">Total Units</div>
                <div className="font-semibold">{project.totalUnits}</div>
              </div>
              <div>
                <div className="text-gray-500">Site Area</div>
                <div className="font-semibold">{project.siteArea}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Facilities</h2>
          <div className="flex flex-wrap gap-4">
            {/* Example facilities, replace with real data if available */}
            {['Arrival Lobby', 'Pool Lounge', 'Gym', 'BBQ Pavilion', 'Playground', 'Function Room', 'Garden'].map((facility, idx) => (
              <span key={idx} className="bg-white border rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">{facility}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Development Site Plan Section */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Development Site Plan</h2>
          <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden border">
            <Image src="/siteplan-dummy.jpg" alt="Site Plan" width={900} height={600} className="object-contain w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Unit Analysis Section */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Unit Analysis</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-2 text-left">Unit Description</th>
                  <th className="px-4 py-2 text-left">Area (sq ft)</th>
                  <th className="px-4 py-2 text-left">Unit Distribution</th>
                  <th className="px-4 py-2 text-left">Price (Available Units)</th>
                  <th className="px-4 py-2 text-left">Balance Units</th>
                </tr>
              </thead>
              <tbody>
                {/* Example row, replace with real data if available */}
                <tr>
                  <td className="border px-4 py-2">2 Bedroom + Study</td>
                  <td className="border px-4 py-2">1234-1322</td>
                  <td className="border px-4 py-2">03-01/03-10</td>
                  <td className="border px-4 py-2">$2.1M</td>
                  <td className="border px-4 py-2">4</td>
                </tr>
              </tbody>
            </table>
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
                        <div className="text-sm text-gray-500">Tenure</div>
                        <div className="font-semibold">{project.tenure}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Available / Total Units</div>
                        <div className="font-semibold">{project.totalUnits}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">TOP Build Year</div>
                        <div className="font-semibold">{project.completion}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Project Type</div>
                        <div className="font-semibold">{project.propertyType}</div>
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
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                              <div className="space-y-2">
                                <h3 className="text-xl font-semibold">{unit.type}</h3>
                                <div className="flex items-center text-gray-600">
                                  <Home className="h-4 w-4 mr-2" />
                                  <span>{unit.size}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="secondary">Starting from</Badge>
                                  <Badge variant="outline">{unit.price}</Badge>
                                </div>
                              </div>
                              <div className="text-right space-y-2">
                                <div className="text-xl font-bold text-primary">{unit.price}</div>
                                <div className="text-sm text-gray-500">Starting Price</div>
                                <Button variant="outline" className="mt-2">
                                  View Floor Plan
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Payment Schedule</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Booking Fee</span>
                          <span className="font-medium">5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Option to Purchase (OTP) Exercise</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Foundation Completion</span>
                          <span className="font-medium">10%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Superstructure Completion</span>
                          <span className="font-medium">10%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>TOP</span>
                          <span className="font-medium">25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Final Completion</span>
                          <span className="font-medium">35%</span>
                        </div>
                      </div>
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
                    <h2 className="text-2xl font-bold mb-6">Location</h2>
                    
                    {/* Location Overview */}
                    <div className="mb-8 bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{project.location}</h3>
                          <p className="text-gray-600">
                            Located in the heart of {project.location}, this development offers convenient access to key amenities, 
                            transportation hubs, and lifestyle destinations. The strategic location ensures residents enjoy the best 
                            of urban living with excellent connectivity.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Train className="h-5 w-5 text-primary" />
                          MRT Stations
                        </h3>
                        <div className="grid gap-4">
                          {project.locationAnalytics.mrt.map((station, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Train className="h-4 w-4 text-primary" />
                                </div>
                                <span>{station.name}</span>
                              </div>
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
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <School className="h-4 w-4 text-primary" />
                                </div>
                                <span>{school.name}</span>
                              </div>
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
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <ShoppingBag className="h-4 w-4 text-primary" />
                                </div>
                                <span>{amenity.name}</span>
                              </div>
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
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Trees className="h-4 w-4 text-primary" />
                                </div>
                                <span>{park.name}</span>
                              </div>
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
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Interested in {project.title}?</h3>
                    <p className="text-gray-600 text-sm">Fill in the form below and our property specialist will get back to you within 24 hours.</p>
                  </div>

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
                      <label htmlFor="unit-type" className="block text-sm font-medium text-gray-700 mb-1">
                        Interested Unit Type
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit type" />
                        </SelectTrigger>
                        <SelectContent>
                          {project.unitTypes.map((unit, index) => (
                            <SelectItem key={index} value={unit.type}>
                              {unit.type} - {unit.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="newsletter"
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="newsletter" className="text-sm text-gray-600">
                        Subscribe to our newsletter for updates on new launches
                      </label>
                    </div>

                    <Button className="w-full bg-primary text-white hover:bg-primary/90">
                      Inquire Now
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-3">Contact our specialist directly:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Phone</div>
                          <div className="font-medium">+65 8123 4567</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Email</div>
                          <div className="font-medium">newlaunches@example.com</div>
                        </div>
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
