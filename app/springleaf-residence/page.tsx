"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  Building,
  MapPin,
  Home,
  Ruler,
  Eye,
  Car,
  Train,
  ShoppingBag,
  GraduationCap,
  Hospital,
  Play,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  MoveDownIcon,
} from "lucide-react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Add custom CSS animations
const customStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInFromTop {
    from {
      opacity: 0;
      transform: translateY(-50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(220, 38, 38, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(220, 38, 38, 0.6);
    }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .animate-fade-in-left {
    animation: fadeInLeft 0.8s ease-out forwards;
  }
  
  .animate-fade-in-right {
    animation: fadeInRight 0.8s ease-out forwards;
  }
  
  .animate-slide-in-top {
    animation: slideInFromTop 0.6s ease-out forwards;
  }
  
  .animate-pulse-glow {
    animation: pulseGlow 2s ease-in-out infinite;
  }
  
  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  .text-gradient {
    background: linear-gradient(135deg, #dc2626, #ef4444);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export default function SpringleafResidenceLanding() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedFloorPlan, setSelectedFloorPlan] = useState("1br")
  const [isScrolled, setIsScrolled] = useState(false)
  const [date, setDate] = useState<Date>()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const projectImages = [
    "/images/springleaf-residence/building-rendering.jpg",
    "/images/springleaf-residence/building-rendering.jpg",
    "/images/springleaf-residence/building-rendering.jpg",
    "/images/springleaf-residence/building-rendering.jpg",
    "/images/springleaf-residence/building-rendering.jpg",
  ]

  const floorPlans = {
    "1br": {
      name: "1 Bedroom",
      size: "506 - 592 sqft",
      price: "From $1.2M",
      image: "/images/springleaf-residence/site-plan.jpg",
    },
    "2br": {
      name: "2 Bedroom",
      size: "721 - 883 sqft",
      price: "From $1.6M",
      image: "/placeholder.svg?height=400&width=600&text=2BR+Floor+Plan",
    },
    "3br": {
      name: "3 Bedroom",
      size: "1,001 - 1,249 sqft",
      price: "From $2.1M",
      image: "/placeholder.svg?height=400&width=600&text=3BR+Floor+Plan",
    },
    "4br": {
      name: "4 Bedroom",
      size: "1,399 - 1,647 sqft",
      price: "From $2.8M",
      image: "/placeholder.svg?height=400&width=600&text=4BR+Floor+Plan",
    },
  }

  const amenities = [
    { icon: <Car className="w-6 h-6" />, name: "Covered Parking", distance: "On-site" },
    { icon: <Train className="w-6 h-6" />, name: "Kovan MRT", distance: "8 mins walk" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "Heartland Mall", distance: "5 mins drive" },
    { icon: <GraduationCap className="w-6 h-6" />, name: "Rosyth School", distance: "3 mins walk" },
    { icon: <Hospital className="w-6 h-6" />, name: "KK Hospital", distance: "10 mins drive" },
    { icon: <ShoppingBag className="w-6 h-6" />, name: "NEX Shopping Mall", distance: "8 mins drive" },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

  return (
    <div className="min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      {/* Sticky CTA for Mobile */}
      <div className={`fixed bottom-0 left-0 right-0 bg-primary-red text-white p-4 z-50 md:hidden transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        <Button className="w-full bg-white text-primary-red hover:bg-gray-100 font-semibold">
          Book Your Showflat Visit
        </Button>
      </div>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          isScrolled ? 'bg-black shadow-sm border-b border-gray-700' : 'bg-transparent'
        } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/kwsingapore-logo.webp"
                  alt="KW Singapore Logo"
                  width={300}
                  height={100}
                  className="h-12 w-auto"
                />
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#project-info" className="text-white hover:text-primary-red transition-colors duration-300">
                Project Info
              </a>
              <a href="#floor-plans" className="text-white hover:text-primary-red transition-colors duration-300">
                Floor Plans
              </a>
              <a href="#gallery" className="text-white hover:text-primary-red transition-colors duration-300">
                Explore
              </a>
              <a href="#editorial" className="text-white hover:text-primary-red transition-colors duration-300">
                Editorial
              </a>
              <Button className="bg-primary-red hover:bg-red-700 transition-colors duration-300">Book Showflat Visit</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Clean Modern Hero Section */}
      <section
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/springleaf-residence/springleaf-hero.jpg')" }}
      >

        <div className="relative container mx-auto px-4 min-h-screen flex items-center">
          <div className={`max-w-4xl transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {/* Clean Badge */}
            <div className={`mb-8 transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-medium rounded-full animate-pulse">
                NEW LAUNCH 2024
              </Badge>
            </div>

            {/* Clean Typography */}
            <div className={`mb-8 transition-all duration-700 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <span className={`inline-block transition-all duration-1000 delay-900 ${isVisible ? 'animate-fade-in-left' : ''}`}>SPRINGLEAF</span>
                <br />
                <span className={`text-4xl md:text-6xl font-light text-white/90 inline-block transition-all duration-1000 delay-1100 ${isVisible ? 'animate-fade-in-right' : ''}`}>RESIDENCE</span>
              </h1>

              <div className={`flex items-center mb-6 transition-all duration-700 delay-1300 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}>
                <div className="w-12 h-px bg-primary-red mr-4"></div>
                <p className="text-lg text-red-200 font-medium">District 19, Serangoon</p>
              </div>

              <p className={`text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8 transition-all duration-700 delay-1500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                Where Modern Living Meets Tranquil Nature in Singapore's Most Coveted District
              </p>
            </div>

            {/* Clean CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-700 delay-1700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Button className={`bg-primary-red hover:bg-red-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 hover-lift ${isVisible ? 'animate-pulse-glow' : ''}`}>
                <Calendar className="w-5 h-5 mr-2" />
                Book Showflat Visit
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 bg-transparent hover-lift"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </Button>
            </div>

            {/* Clean Stats Grid */}
          </div>
        </div>

        {/* Clean Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-2000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">Scroll to explore</span>
            <MoveDownIcon className="w-5 h-5 rotate-90 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Enhanced Project Information Section */}
      <section id="project-info" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold text-primary-red mb-4">Discover Nature-Inspired Living</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nestled in the tranquil enclave of Upper Thomson, <strong>Springleaf Residence</strong> is a highly anticipated 941-unit project by <strong>GuocoLand & Hong Leong</strong>. Just <strong>&lt;2 min sheltered walk</strong> to Springleaf MRT (TEL), this development offers unmatched access to nature, connectivity, and lifestyle.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <Train className="w-12 h-12 text-primary-red mx-auto mb-4" />, desc: "&lt;100m Sheltered Access to Springleaf MRT" },
              { icon: <MapPin className="w-12 h-12 text-primary-red mx-auto mb-4" />, desc: "Near <strong>Upper Seletar Reservoir</strong>, Mandai Wildlife, & Nature Parks" },
              { icon: <ShoppingBag className="w-12 h-12 text-primary-red mx-auto mb-4" />, desc: "Surrounded by Hawker Fare, Upscale Dining, Golf & Malls" },
              { icon: <Home className="w-12 h-12 text-primary-red mx-auto mb-4" />, desc: "1 to 5 Bedroom Units, Full Condo Facilities" },
              { icon: <Building className="w-12 h-12 text-primary-red mx-auto mb-4" />, desc: "Attractive Pricing from ~$1,950 psf" },
              { icon: <MapPin className="w-12 h-12 text-primary-red mx-auto mb-4" />, desc: "Direct connectivity to SLE, CTE & North-South Corridor" },
              { icon: <Building className="w-12 h-12 text-primary-red mx-auto mb-4" />, desc: "5 Towers + Conservation Block | <strong>99-Year Leasehold</strong>" },
              { icon: <Building className="w-12 h-12 text-primary-red mx-auto mb-4" />, desc: "Developed by <strong>GuocoLand & Hong Leong</strong>" }
            ].map((card, index) => (
              <Card key={index} className={`text-center hover:shadow-lg transition-all duration-500 border-gray-600 bg-gray-700 hover:scale-105 hover-lift ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`} style={{ transitionDelay: `${index * 200}ms` }}>
                <CardContent className="p-6">
                  {card.icon}
                  <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: card.desc }}></p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Information Grid */}
          <div className={`grid lg:grid-cols-10 gap-8 mb-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {/* Project Details */}
            <Card className="lg:col-span-4 border-gray-600 bg-gray-700 hover:shadow-lg transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-primary-red flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Name:</span>
                  <span className="font-semibold text-white">Springleaf Residence</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">District:</span>
                  <span className="font-semibold text-white">D26 – Upper Thomson</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Developer:</span>
                  <span className="font-semibold text-white">GuocoLand & Hong Leong</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Tenure:</span>
                  <span className="font-semibold text-white">99 Years Leasehold</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Site Area:</span>
                  <span className="font-semibold text-white">344,700 sqft (32,023.7 sqm)</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Blocks:</span>
                  <span className="font-semibold text-white">5 x 25-Storey + 1 x 4-Storey Conservation</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Total Units:</span>
                  <span className="font-semibold text-white">941</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Unit Mix:</span>
                  <span className="font-semibold text-white">1 to 5 Bedrooms</span>
                </div>
                <div className="flex justify-between border-b border-gray-500 pb-3">
                  <span className="font-medium text-gray-300">Target Preview:</span>
                  <span className="font-semibold text-white">1 August 2025</span>
                </div>
              </CardContent>
            </Card>

            {/* Site Plan & Floor Plans */}
            <Card className="lg:col-span-6 border-gray-600 bg-gray-700 hover:shadow-lg transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-primary-red flex items-center">
                  <Ruler className="w-5 h-5 mr-2" />
                  Plans & Layout
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">Site Plan</h4>
                    </div>
                    <Image
                      src="/images/springleaf-residence/site-plan.jpg"
                      alt="Springleaf Residence Site Plan"
                      width={300}
                      height={200}
                      className="w-full rounded mb-3 hover:scale-95 transition-transform duration-500"
                    />
                    <p className="text-sm text-gray-300 mb-3">
                      View the overall development layout and facilities distribution
                    </p>
                    <Button variant="outline" size="sm" className="w-full bg-primary-red hover:bg-primary-red/20 hover:text-white transition-all duration-300 border-gray-500 text-gray-300">
                      <Download className="w-4 h-4 mr-2" />
                      Download Site Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Gallery Section */}
          <div className={`mb-20 transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-primary-red">Project Gallery</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>
                  {currentImageIndex + 1} of {projectImages.length}
                </span>
              </div>
            </div>

            {/* Main Image Display */}
            <div className="relative max-w-6xl mx-auto mb-8">
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={projectImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`Springleaf Residence - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover transition-all duration-500"
                />

                {/* Navigation Arrows */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-300"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                {/* Image Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white">
                    <h4 className="text-lg font-semibold mb-1">
                      {currentImageIndex === 0
                        ? "Architectural Rendering"
                        : currentImageIndex === 1
                          ? "Swimming Pool Deck"
                          : currentImageIndex === 2
                            ? "Clubhouse Interior"
                            : currentImageIndex === 3
                              ? "Landscape Garden"
                              : "Gym Facilities"}
                    </h4>
                    <p className="text-sm opacity-90">
                      {currentImageIndex === 0
                        ? "Modern luxury towers with premium finishes"
                        : currentImageIndex === 1
                          ? "Resort-style pool with relaxation areas"
                          : currentImageIndex === 2
                            ? "Elegant clubhouse with premium amenities"
                            : currentImageIndex === 3
                              ? "Lush landscaping throughout the development"
                              : "State-of-the-art fitness facilities"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center mt-6 space-x-3">
                {projectImages.map((image, index) => (
                  <button
                    key={index}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                      index === currentImageIndex
                        ? "border-primary-red shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className={`text-center mt-12 transition-all duration-1000 delay-900 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="bg-primary-red text-white rounded-lg p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">Interested in Springleaf Residence?</h3>
              <p className="text-lg mb-6 opacity-90">
                Get the latest floor plans, pricing, and availability information
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-primary-red hover:bg-gray-100 px-8 py-3 hover:scale-105 transition-all duration-300">Book Showflat Visit</Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-red px-8 py-3 bg-transparent hover:scale-105 transition-all duration-300"
                >
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section id="floor-plans" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold text-primary-red mb-4">Floor Plans & Pricing</h2>
            <p className="text-xl text-gray-300">Choose from our thoughtfully designed unit layouts</p>
          </div>

          <Tabs value={selectedFloorPlan} onValueChange={setSelectedFloorPlan} className={`w-full transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {Object.entries(floorPlans).map(([key, plan]) => (
                <TabsTrigger key={key} value={key} className="text-sm text-white hover:scale-105 transition-all duration-300">
                  {plan.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(floorPlans).map(([key, plan]) => (
              <TabsContent key={key} value={key}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="hover:scale-105 transition-transform duration-500">
                    <Image
                      src={plan.image || "/placeholder.svg"}
                      alt={`${plan.name} Floor Plan`}
                      width={600}
                      height={400}
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-primary-red mb-2">{plan.name}</h3>
                      <p className="text-xl text-gray-300 mb-4">{plan.size}</p>
                      <p className="text-2xl font-bold text-green-400">{plan.price}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Ruler className="w-5 h-5 text-primary-red" />
                        <span className="text-white">Spacious and well-ventilated layout</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Eye className="w-5 h-5 text-primary-red" />
                        <span className="text-white">Unblocked views from most units</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Home className="w-5 h-5 text-primary-red" />
                        <span className="text-white">Premium fittings and finishes</span>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button className="bg-primary-red hover:bg-red-700 hover:scale-105 transition-all duration-300">Book Showflat Visit</Button>
                      <Button variant="outline" className="border-primary-red text-primary-red bg-transparent hover:scale-105 transition-all duration-300">
                        <Download className="w-4 h-4 mr-2" />
                        Download Floor Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Nearby Amenities */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold text-primary-red mb-4">Nearby Amenities</h2>
            <p className="text-xl text-gray-300">Everything you need is within reach</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity, index) => (
              <Card key={index} className={`hover:shadow-lg transition-all duration-500 border-gray-600 bg-gray-700 rounded-xl hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`} style={{ transitionDelay: `${index * 150}ms` }}>
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="text-primary-red">{amenity.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">{amenity.name}</h3>
                    <p className="text-gray-300">{amenity.distance}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Media Section */}
      <section id="gallery" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-4xl font-bold text-primary-red mb-4">Explore Springleaf Residence</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Immerse yourself in the luxury and elegance of our latest development through our comprehensive media
              gallery
            </p>
          </div>

          {/* Content Items */}
          <div className={`space-y-20 transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            {/* Item 1 - Text Left, Image Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-primary-red/10 text-primary-red">SHOWFLAT TOUR</Badge>
                <h3 className="text-3xl font-bold text-primary-red">
                  Lentor Mansion: Luxury with Soul | KW Singapore New Launch Showflat Tour
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Sneak a peek at one of the widely anticipated launches of 2024—Lentor Mansion! Melvin Lim and Grayce
                  from KW Singapore introduces this newest luxury project by renowned developer, GuocoLand,
                  sitting on the largest plot in the Lentor precinct.
                </p>
                <Button className="bg-primary-red hover:bg-red-700 text-white px-8 py-3 hover:scale-105 transition-all duration-300">
                  <Play className="w-5 h-5 mr-2" />
                  Watch our Showflat Tour
                </Button>
              </div>
              <div className="relative hover:scale-105 transition-transform duration-500">
                <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/springleaf-residence/site-plan.jpg?height=320&width=500&text=Lentor+Mansion+Showflat+Tour"
                    alt="Lentor Mansion Showflat Tour"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-primary-red ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2 - Image Left, Text Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative lg:order-1">
                <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/springleaf-residence/site-plan.jpg?height=320&width=500&text=Lentor+Rejuvenation+Analysis"
                    alt="Lentor's Rejuvenation Analysis"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-green-600 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 lg:order-2">
                <Badge className="bg-green-100 text-green-800">MARKET ANALYSIS</Badge>
                <h3 className="text-3xl font-bold text-primary-red">
                  Lentor's Rejuvenation and What the URA Floor Area Harmonisation means for Buyers
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  You've probably heard a lot about Lentor's rejuvenation, but what is it all about? In this episode of
                  NOTG, Melvin Lim from KW Singapore explores the development and transformation of Lentor—once a
                  sleepy town, now projected to become a thriving estate in the years to come. Let Melvin explain more
                  about our government's focus on injecting residential zones in this area.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 hover:scale-105 transition-all duration-300">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Our Analysis
                </Button>
              </div>
            </div>

            {/* Item 3 - Text Left, Image Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-800">DETAILED REVIEW</Badge>
                <h3 className="text-3xl font-bold text-primary-red">
                  Lentor Mansion New Launch Review – A Beacon in Lentor's Evolving Landscape
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Lentor Mansion is set to become a cherished asset in the growing Lentor neighbourhood, which holds
                  immense promise for future development. The project will be the fifth addition to the serene
                  neighbourhood around Hillock Park, nestled amidst lush green surroundings within a private residential
                  enclave. Join us as we showcase the standout features of Lentor Mansion, its future prospects, and
                  provide recommendations for each available unit type.
                </p>
                <Button className="bg-white hover:bg-gray-100 text-black px-8 py-3 hover:scale-105 transition-all duration-300">
                  <Eye className="w-5 h-5 mr-2" />
                  Read our Analysis
                </Button>
              </div>
              <div className="relative">
                <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/springleaf-residence/site-plan.jpg?height=320&width=500&text=Lentor+Mansion+Landscape+Review"
                    alt="Lentor Mansion Landscape Review"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800">Detailed Analysis</h4>
                      <p className="text-sm text-gray-600">Comprehensive review and recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 4 - Image Left, Text Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative lg:order-1">
                <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/springleaf-residence/site-plan.jpg?height=320&width=500&text=Lentor+Mansion+Luxury+Living+Review"
                    alt="Lentor Mansion Luxury Living Review"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-orange-600 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 lg:order-2">
                <Badge className="bg-orange-100 text-orange-800">COMPREHENSIVE REVIEW</Badge>
                <h3 className="text-3xl font-bold text-primary-red">
                  Lentor Mansion New Launch Review - Luxury Living Amidst Nature In D26 | Singapore New Launch Review
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Wayne, Yong Zhun and Ramzi from KW Singapore review the third launch by GuocoLand in the Lentor
                  Hills estate, and their 2nd iteration of their Mansion series, Lentor Mansion! Lentor Mansion's unique
                  design that aims to blend luxury with convenience whilst embracing the surrounding greenery. The team
                  highlights Lentor Mansion's other standout features, its expansive land plot and strategic location in
                  the North-east region of Singapore, explore the pros and cons to this development, as well as its
                  layouts and the impact of the recent harmonisation rule.
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 hover:scale-105 transition-all duration-300">
                  <Play className="w-5 h-5 mr-2" />
                  Watch our Review
                </Button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className={`text-center mt-20 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="bg-gradient-to-r from-primary-red to-red-700 text-white rounded-2xl p-8 max-w-4xl mx-auto hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience Springleaf Residence?</h3>
              <p className="text-lg mb-6 opacity-90">
                Book your personal showflat visit and discover why Springleaf Residence is the perfect choice for luxury
                living
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-primary-red hover:bg-gray-100 px-8 py-3 text-lg hover:scale-105 transition-all duration-300">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Showflat Visit
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-red px-8 py-3 text-lg bg-transparent hover:scale-105 transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Article Section */}
      <section id="editorial" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div>
            <div className={`text-center mb-12 transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
              <Badge className="bg-primary-red/10 text-primary-red mb-4">KW SINGAPORE EDITORIAL</Badge>
              <h2 className="text-4xl font-bold text-primary-red mb-4">
                Springleaf Residence: A New Chapter in Serangoon Living
              </h2>
              <p className="text-xl text-gray-300">
                Our property experts analyze what makes this development stand out in today's market
              </p>
            </div>

            <div className={`grid md:grid-cols-2 gap-8 mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}>
              <div className="hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/springleaf-residence/site-plan.jpg?height=200&width=400&text=Editorial+Hero+Image"
                  alt="Editorial Image"
                  width={400}
                  height={200}
                  className="w-full rounded-lg shadow-md mb-6"
                />
              </div>

              <div>
                <div className="prose prose-lg max-w-none mb-6">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Serangoon has long been recognized as one of Singapore's most established residential districts.
                    Springleaf Residence represents the next evolution of luxury living in this mature estate, bringing
                    together modern design with tranquil charm.
                  </p>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    With excellent connectivity to Kovan MRT and limited new supply in the area, this development is
                    well-positioned for both owner-occupiers and investors seeking quality living in a prime location.
                  </p>

                  <Button className="bg-primary-red hover:bg-red-700 text-white px-6 py-2 hover:scale-105 transition-all duration-300">Read More</Button>
                </div>

                <Card className="hover:shadow-lg transition-all duration-500 hover:scale-105 border-gray-600 bg-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Article Highlights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                      <span className="text-sm text-gray-300">Strategic Serangoon location</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                      <span className="text-sm text-gray-300">Limited new supply</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                      <span className="text-sm text-gray-300">Attractive to upgraders and investors</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Generation Form */}
      <section
        className={`py-16 relative bg-cover bg-center transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
        style={{ backgroundImage: "url('/images/springleaf-residence/form-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-white/20 backdrop-blur-sm text-white p-12 shadow-2xl border-0 rounded-xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <h2 className="text-4xl font-bold mb-4 text-white">Book Your Showflat Visit Today</h2>
              <p className="text-md mb-8 opacity-90 text-white">
                Experience Springleaf Residence firsthand. Our consultants will guide you through the showflat and answer
                all your questions about this exciting new development.
              </p>
              <form className="space-y-6">
                <div>
                  <Input placeholder="Enter your full name *" className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" />
                </div>
                <div>
                  <Input placeholder="Enter your contact number *" className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" />
                </div>
                <div>
                  <Input placeholder="Enter your email address" className="w-full bg-white text-gray-800 placeholder:text-gray-500 border-0" />
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white text-gray-800 border-0",
                          !date && "text-gray-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select preferred date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border border-gray-200" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="w-full bg-white text-gray-800 border-0">
                      <SelectValue placeholder="Select preferred timing" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      <SelectItem value="weekday-morning">Weekday Morning</SelectItem>
                      <SelectItem value="weekday-afternoon">Weekday Afternoon</SelectItem>
                      <SelectItem value="weekday-evening">Weekday Evening</SelectItem>
                      <SelectItem value="weekend-morning">Weekend Morning</SelectItem>
                      <SelectItem value="weekend-afternoon">Weekend Afternoon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-center">
                  <Button className="bg-primary-red hover:bg-red-700 px-12 py-3 text-lg hover:scale-105 transition-all duration-300">Book Showflat Visit</Button>
                  <p className="text-sm italic text-white-600 mt-4">
                    By submitting this form, you agree to receive marketing communications from KW Singapore. 
                    <br /> You can unsubscribe at any time.
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`bg-gray-900 text-white py-12 transition-all duration-1000 delay-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/images/kwsingapore-logo.webp"
                  alt="KW Singapore Logo"
                  width={300}
                  height={100}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-sm opacity-90 mb-4">
                Your trusted partner in Singapore property investment and new launch developments.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 hover:text-primary-red cursor-pointer hover:scale-110 transition-transform duration-300" />
                <Instagram className="w-5 h-5 hover:text-primary-red cursor-pointer hover:scale-110 transition-transform duration-300" />
                <Youtube className="w-5 h-5 hover:text-primary-red cursor-pointer hover:scale-110 transition-transform duration-300" />
                <Linkedin className="w-5 h-5 hover:text-primary-red cursor-pointer hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary-red">
                    New Launch Properties
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-red">
                    Resale Properties
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-red">
                    Investment Advisory
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-red">
                    Property Management
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary-red">
                    Market Reports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-red">
                    Property News
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-red">
                    Investment Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-red">
                    Webinars
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+65 8611 1703</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@kwsingapore.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Singapore</span>
                </div>
              </div>
            </div>
          </div>

                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                <p>© 2024 KW Singapore Real Estate Pte. Ltd. | All Rights Reserved</p>
                <div className="flex justify-center space-x-4 mt-2">
                  <a href="#" className="hover:text-primary-red hover:scale-110 transition-transform duration-300">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-primary-red hover:scale-110 transition-transform duration-300">
                    Terms of Service
                  </a>
                  <a href="#" className="hover:text-primary-red hover:scale-110 transition-transform duration-300">
                    Contact
                  </a>
                </div>
              </div>
        </div>
      </footer>
    </div>
  )
} 