"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, MapPin, Calendar, Home, DollarSign, Phone, Mail, ArrowRight, Star, TrendingUp, Train, School, ShoppingBag, Trees, Map, FileText, LayoutGrid, MapPinned, Newspaper, Maximize2, ChevronLeft, ChevronRight, Ruler, Layers, Hash, Bed, CalendarCheck, Tag, BadgeDollarSign, Utensils, ShoppingCart, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import ProjectCard from "@/components/project-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { use, useState, useEffect } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import dynamic from 'next/dynamic'
import MoatRadarChart from "../../components/ai-moat";
import HybridMapAmenities from "../../components/NearbyAmenitiesMap"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

interface Amenity {
  name: string;
  lat: number;
  lng: number;
  type: string;
}

interface GooglePlace {
  placeId: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  type: string;
  distance: string;
  duration: string;
  transportMode: string;
  isNearest?: boolean;
}

// Add this function before the component
async function searchNearbyPlaces(
  location: { lat: number; lng: number },
  type: string,
  radius: number = 5000
): Promise<GooglePlace[]> {
  // Map our amenity types to Google Places types
  const placeTypeMap: Record<string, string> = {
    schools: 'school',
    transport: 'transit_station',
    shopping: 'shopping_mall',
    food: 'food',
    groceries: 'supermarket',
    recreation: 'park'
  };

  const googleType = placeTypeMap[type] || 'point_of_interest';
  
  try {
    const response = await fetch(
      `/api/places?lat=${location.lat}&lng=${location.lng}&type=${googleType}&radius=${radius}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const places = await response.json();
    return places;
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    return [];
  }
}

// Dynamically import the map component with no SSR
const NearbyAmenitiesMap = dynamic(
  () => import('@/app/components/NearbyAmenitiesMap'),
  { ssr: false }
);

export default function ProjectPage({ params }: ProjectPageProps) {
  const unwrappedParams = use(params)
  // This would normally fetch data based on the slug
  const project = {
    id: 1,
    name: "10 Evelyn",
    project_name: "10 Evelyn",
    slug: "10-evelyn",
    title: "10 Evelyn",
    location: "Newton, District 11",
    address: "10 Evelyn Road, Singapore 308318",
    type: "Condominium",
    price: "From $1.2M",
    priceFrom: "1200000",
    pricePerSqFt: "$2,100 - $2,400 psf",
    bedrooms: "1-4",
    bathrooms: "1-3",
    size: "484 - 1,636 sq ft",
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
    district: "11",
    tenure: "Freehold",
    propertyType: "Condominium",
    status: "Launching Soon",
    totalUnits: "56 Units",
    totalFloors: "24 Floors",
    siteArea: "12,000 sq ft",
    latitude: 1.2834,
    longitude: 103.8598,
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
        { name: "Newton MRT", distance: "300m" },
        { name: "Orchard MRT", distance: "800m" }
      ],
      schools: [
        { name: "Anglo-Chinese School (Junior)", distance: "400m" },
        { name: "St. Margaret's Primary School", distance: "600m" }
      ],
      amenities: [
        { name: "United Square", distance: "250m" },
        { name: "Goldhill Plaza", distance: "400m" }
      ],
      parks: [
        { name: "Newton Green", distance: "150m" }
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
        name: "The Avenir",
        location: "River Valley",
        price: "From $2.5M",
        priceRange: "$2.5M - $4.8M",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
        units: "376 Units",
        unitsAvailable: "376 Units",
        propertySizeRange: "614 - 1,862 sqft",
        developer: "Hong Leong Group",
        completion: "2025",
        slug: "the-avenir",
        type: "Luxury Condominium",
        coordinates: { lat: 1.3521, lng: 103.8198 }
      },
      {
        name: "Midtown Modern",
        location: "Bugis",
        price: "From $1.8M",
        priceRange: "$1.8M - $3.8M",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80",
        units: "558 Units",
        unitsAvailable: "558 Units",
        propertySizeRange: "678 - 1,862 sqft",
        developer: "GuocoLand",
        completion: "2024",
        slug: "midtown-modern",
        type: "Mixed Development",
        coordinates: { lat: 1.3521, lng: 103.8198 }
      }
    ]
  }

  // Calculate units left and percentage
  const totalUnits = parseInt((project.totalUnits || '0').replace(/[^0-9]/g, ''))
  const unitsAvailable = parseInt((project.units || '0').replace(/[^0-9]/g, ''))
  const unitsLeftPercent = totalUnits > 0 ? Math.round((unitsAvailable / totalUnits) * 100) : 0

  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIdx, setGalleryIdx] = useState(0)
  // Add state for floor plan modal
  const [floorPlanModal, setFloorPlanModal] = useState<{ open: boolean, image: string | null, type: string | null }>({ open: false, image: null, type: null })

  // Add state for real amenities data
  const [realAmenitiesData, setRealAmenitiesData] = useState<Record<string, GooglePlace[]>>({});
  const [isLoadingAmenities, setIsLoadingAmenities] = useState(false);

  // Add state for selected amenity type
  const [selectedAmenityType, setSelectedAmenityType] = useState<string>("schools");
  const [selectedAmenity, setSelectedAmenity] = useState<GooglePlace | null>(null);
  const [selectedAmenityClick, setSelectedAmenityClick] = useState(0);

  // Project location (Marina Bay Sands)
  const projectLocation = {
    lat: 1.2834,
    lng: 103.8598
  };

  // Convert GooglePlace to Amenity for the map component
  const convertToAmenities = (places: GooglePlace[]): Amenity[] => {
    return places.map(place => ({
      name: place.name,
      lat: place.location.lat,
      lng: place.location.lng,
      type: place.type
    }));
  };

  // Add effect to fetch real amenities data
  useEffect(() => {
    async function fetchAmenities() {
      setIsLoadingAmenities(true);
      const projectLocation = { lat: 1.3736, lng: 103.9492 }; // Replace with actual project coordinates
      
      const amenitiesPromises = amenityTabs.map(async (tab) => {
        const places = await searchNearbyPlaces(projectLocation, tab.key);
        return [tab.key, places];
      });

      const results = await Promise.all(amenitiesPromises);
      const newAmenitiesData = Object.fromEntries(results);
      setRealAmenitiesData(newAmenitiesData);
      setIsLoadingAmenities(false);
    }

    fetchAmenities();
  }, []);

  // Prepare amenities for the map, marking only the selected one as isNearest
  const amenitiesForMap = convertToAmenities(
    (realAmenitiesData[selectedAmenityType] || []).map((a, i) => {
      if (selectedAmenity) {
        return { ...a, isNearest: a.placeId === selectedAmenity.placeId };
      } else {
        return { ...a, isNearest: i === 0 };
      }
    })
  );

  // Place these above the component return
  const amenitiesData: Record<string, Array<{
    name: string;
    address: string;
    type: string;
    distance: string;
    duration: string;
    mode: string;
    selected?: boolean;
  }>> = {
    schools: [
      {
        name: "White Sands Primary School",
        address: "2 Pasir Ris Street 11, Singapore 519075",
        type: "Primary School",
        distance: "3.5 km",
        duration: "11 mins",
        mode: "Driving",
        selected: true,
      },
      {
        name: "Pasir Ris Primary School",
        address: "5 Pasir Ris Street 21, Singapore 518968",
        type: "Primary School",
        distance: "3.7 km",
        duration: "12 mins",
        mode: "Driving",
      },
      {
        name: "East Spring Secondary School",
        address: "30 Tampines Street 34, Singapore 529231",
        type: "School",
        distance: "4.1 km",
        duration: "13 mins",
        mode: "Driving",
      },
      {
        name: "East Spring Primary School",
        address: "31 Tampines Street 33, Singapore 529258",
        type: "Primary School",
        distance: "4.2 km",
        duration: "14 mins",
        mode: "Driving",
      },
      {
        name: "Loyang View Secondary School",
        address: "12 Pasir Ris Street 11, Singapore 519073",
        type: "Secondary School",
        distance: "3.6 km",
        duration: "12 mins",
        mode: "Driving",
      },
      {
        name: "Casuarina Primary School",
        address: "30 Pasir Ris Street 41, Singapore 518935",
        type: "Primary School",
        distance: "4.5 km",
        duration: "15 mins",
        mode: "Driving",
      },
      {
        name: "Ngee Ann Secondary School",
        address: "1 Tampines Street 32, Singapore 529283",
        type: "School",
        distance: "4.3 km",
        duration: "14 mins",
        mode: "Driving",
      },
    ],
    transport: [
      {
        name: "Pasir Ris MRT (EW1)",
        address: "Pasir Ris Central, Singapore 519634",
        type: "MRT Station",
        distance: "3.2 km",
        duration: "10 mins",
        mode: "Driving",
        selected: true,
      },
      {
        name: "Tampines East MRT (DT33)",
        address: "Tampines Ave 7, Singapore 529625",
        type: "MRT Station",
        distance: "3.8 km",
        duration: "12 mins",
        mode: "Driving",
      },
      {
        name: "Loyang Bus Interchange",
        address: "Loyang Ave, Singapore 508775",
        type: "Bus Interchange",
        distance: "2.9 km",
        duration: "9 mins",
        mode: "Driving",
      },
    ],
    shopping: [
      {
        name: "White Sands Mall",
        address: "1 Pasir Ris Central Street 3, Singapore 518457",
        type: "Shopping Mall",
        distance: "3.3 km",
        duration: "10 mins",
        mode: "Driving",
        selected: true,
      },
      {
        name: "Downtown East",
        address: "1 Pasir Ris Close, Singapore 519599",
        type: "Shopping Mall",
        distance: "3.8 km",
        duration: "12 mins",
        mode: "Driving",
      },
      {
        name: "Loyang Point",
        address: "259 Pasir Ris Street 21, Singapore 510259",
        type: "Shopping Mall",
        distance: "2.7 km",
        duration: "8 mins",
        mode: "Driving",
      },
    ],
    food: [
      {
        name: "Pasir Ris Central Hawker Centre",
        address: "110 Pasir Ris Central, Singapore 519641",
        type: "Food Centre",
        distance: "3.4 km",
        duration: "10 mins",
        mode: "Driving",
        selected: true,
      },
      {
        name: "Tampines Round Market & Food Centre",
        address: "137 Tampines Street 11, Singapore 522137",
        type: "Food Centre",
        distance: "4.0 km",
        duration: "13 mins",
        mode: "Driving",
      },
    ],
    groceries: [
      {
        name: "Giant Supermarket",
        address: "1 Pasir Ris Close, Singapore 519599",
        type: "Supermarket",
        distance: "3.8 km",
        duration: "12 mins",
        mode: "Driving",
        selected: true,
      },
      {
        name: "NTUC FairPrice",
        address: "1 Pasir Ris Central Street 3, Singapore 518457",
        type: "Supermarket",
        distance: "3.3 km",
        duration: "10 mins",
        mode: "Driving",
      },
    ],
    recreation: [
      {
        name: "Pasir Ris Park",
        address: "Pasir Ris Green, Singapore 510534",
        type: "Park",
        distance: "4.1 km",
        duration: "13 mins",
        mode: "Driving",
        selected: true,
      },
      {
        name: "Wild Wild Wet",
        address: "1 Pasir Ris Close, Singapore 519599",
        type: "Water Park",
        distance: "3.8 km",
        duration: "12 mins",
        mode: "Driving",
      },
    ],
  };
  const amenityTabs = [
    { key: "all", label: "All", icon: MapPinned },
    { key: "schools", label: "Schools", icon: School },
    { key: "transport", label: "Transport", icon: Train },
    { key: "shopping", label: "Shopping Mall", icon: ShoppingBag },
    { key: "food", label: "Food Centre", icon: Utensils },
    { key: "groceries", label: "Groceries", icon: ShoppingCart },
    { key: "recreation", label: "Recreation", icon: Trees },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#1c1c1d] text-white">
      {/* Black gap above breadcrumbs */}
      <div className="w-full bg-[#1c1c1d]" style={{ height: '4rem' }} />
      {/* Breadcrumbs */}
      <nav className="bg-[#242728] py-3 px-4 text-sm text-gray-300">
        <ol className="flex space-x-2">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li>/</li>
          <li><a href="/projects" className="hover:underline">Projects</a></li>
          <li>/</li>
          <li className="text-red-500 font-semibold">{project.title}</li>
        </ol>
      </nav>

      {/* Top Section: Gallery + Info */}
      <section className="bg-black py-0 md:py-0">
        {/* Banner Section (static main image) */}
        <div className="relative w-screen aspect-[16/6] overflow-hidden mb-0" style={{ minHeight: '400px', maxHeight: '60vh' }}>
          <Image
            src={project.images[galleryIdx]}
            alt={project.title}
            fill
            className="object-cover"
            priority
            onClick={() => setGalleryOpen(true)}
            style={{ cursor: "zoom-in" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          {/* Project Info Overlay */}
          <div className="absolute left-0 bottom-0 p-8 text-white z-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
            <div className="flex items-center gap-2 text-gray-200 mb-2">
              <MapPin className="h-5 w-5 text-red-500" />
              <span className="text-lg">{project.location}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-gray-200 text-base mb-2">
              <div className="flex items-center"><Building2 className="h-5 w-5 mr-2 text-red-500" />{project.developer}</div>
              <div className="flex items-center"><Calendar className="h-5 w-5 mr-2 text-red-500" />Est. {project.completion}</div>
              <div className="flex items-center"><Home className="h-5 w-5 mr-2 text-red-500" />{project.totalUnits}</div>
              <div className="flex items-center bg-black/60 px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-white">
                  Units Left: {unitsAvailable}/{totalUnits} ({unitsLeftPercent}%)
                </span>
              </div>
            </div>
            {/* Add more info (rating, address, etc.) as needed */}
          </div>
          {/* Gallery Controls */}
          <div className="absolute right-0 bottom-0 flex items-center gap-2 p-6 z-10">
            <button
              className="bg-black/60 hover:bg-black/80 rounded-full p-2"
              onClick={e => { e.stopPropagation(); setGalleryIdx((galleryIdx - 1 + project.images.length) % project.images.length) }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              className="bg-black/60 hover:bg-black/80 rounded-full p-2"
              onClick={e => { e.stopPropagation(); setGalleryOpen(true) }}
              aria-label="Enlarge image"
            >
              <Maximize2 className="w-6 h-6 text-white" />
            </button>
            <button
              className="bg-black/60 hover:bg-black/80 rounded-full p-2"
              onClick={e => { e.stopPropagation(); setGalleryIdx((galleryIdx + 1) % project.images.length) }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Modal Gallery */}
        <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
          <DialogContent className="max-w-4xl bg-black p-0">
            <DialogTitle>
              <span className="sr-only">Gallery for {project.title}</span>
            </DialogTitle>
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={project.images[galleryIdx]}
                alt={`${project.title} enlarged image`}
                fill
                className="object-contain rounded"
              />
              {/* Modal Gallery Controls */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2"
                onClick={() => setGalleryIdx((galleryIdx - 1 + project.images.length) % project.images.length)}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2"
                onClick={() => setGalleryIdx((galleryIdx + 1) % project.images.length)}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Sticky Navigation Tabs */}
      <div className="sticky top-[64px] z-40 bg-[#1c1c1d] border-b border-gray-800">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full" onValueChange={(value) => {
            const element = document.getElementById(value);
            if (element) {
              const headerOffset = 120; // Adjust this value based on your header height + tabs height
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
          }}>
            <div className="overflow-x-auto">
              <TabsList className="w-full justify-start bg-transparent border-b-0 p-0 min-w-max">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-red-500 rounded-none px-4 sm:px-6 py-3 sm:py-4 text-gray-400 hover:text-white flex items-center gap-2 whitespace-nowrap"
                >
                  <FileText className="h-4 w-4 data-[state=active]:text-red-500" />
                  <span className="text-sm sm:text-base">Project Overview</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="pricing" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-red-500 rounded-none px-4 sm:px-6 py-3 sm:py-4 text-gray-400 hover:text-white flex items-center gap-2 whitespace-nowrap"
                >
                  <DollarSign className="h-4 w-4 data-[state=active]:text-red-500" />
                  <span className="text-sm sm:text-base">Unit Types & Pricing</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="location" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-red-500 rounded-none px-4 sm:px-6 py-3 sm:py-4 text-gray-400 hover:text-white flex items-center gap-2 whitespace-nowrap"
                >
                  <MapPinned className="h-4 w-4 data-[state=active]:text-red-500" />
                  <span className="text-sm sm:text-base">Location</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-red-500 data-[state=active]:border-b-2 data-[state=active]:border-red-500 rounded-none px-4 sm:px-6 py-3 sm:py-4 text-gray-400 hover:text-white flex items-center gap-2 whitespace-nowrap"
                >
                  <Newspaper className="h-4 w-4 data-[state=active]:text-red-500" />
                  <span className="text-sm sm:text-base">Media Reviews</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 bg-[#1c1c1d]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:w-2/3 space-y-12">
              {/* Overview Section */}
              <div id="overview">
                <h2 className="text-2xl font-bold mb-4 text-white">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed mb-8">{project.description}</p>

                <h3 className="text-xl font-semibold mb-4 text-white">Facilities</h3>
                <div className="flex flex-wrap gap-4 mb-8">
                  {['Arrival Lobby', 'Pool Lounge', 'Gym', 'BBQ Pavilion', 'Playground', 'Function Room', 'Garden'].map((facility, idx) => (
                    <span key={idx} className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm font-medium text-gray-300">{facility}</span>
                  ))}
                </div>

                <div className="mb-12">
                  <MoatRadarChart moat={{
                    project: project.title,
                    exitAudience: 4.2,
                    districtDisparityEffect: 3.8,
                    mrtProximity: 4.5,
                    parentsAttractionEffect: 3.9,
                    quantumEffect: 4.1,
                    rentalDemand: 4.3,
                    regionDisparityEffect: 3.7,
                    volumeEffect: 4.0,
                    balasCurveEffect: 4.4,
                    landsizeDensity: 3.6
                  }} />
                </div>

                <div className="mb-12">
                  <h3 className="text-xl font-semibold mb-4 text-white">Site Plan</h3>
                  <div className="bg-[#242728] rounded-lg p-6">
                    <Tabs defaultValue="project-map" className="w-full">
                      <TabsList className="mb-6">
                        <TabsTrigger value="project-map" className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-l px-6 py-2">Project Map</TabsTrigger>
                        <TabsTrigger value="elevation-chart" className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-r px-6 py-2">Elevation Chart</TabsTrigger>
                      </TabsList>
                      <TabsContent value="project-map">
                        <img src="/siteplan-dummy.jpg" alt="Project Site Map" className="rounded w-full" />
                      </TabsContent>
                      <TabsContent value="elevation-chart">
                        <img src="/siteplan-dummy.jpg" alt="Elevation Chart" className="rounded w-full" />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column - Contact Form and Brochure */}
            <div className="lg:w-1/3">
              {/* Brochure Card */}
              <div className="bg-[#242728] text-white rounded-lg p-6 shadow-lg flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <BadgeDollarSign className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-semibold">Price Guide</h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Starting from</span>
                    <span className="text-xl font-bold text-red-500">{project.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Price per sq ft</span>
                    <span className="text-gray-300">{project.pricePerSqFt}</span>
                  </div>
                </div>
                <Button className="mt-4 bg-primary text-white hover:bg-primary/90 font-semibold">
                  Download Brochure
                </Button>
                <div className="flex flex-col gap-2 mt-2">
                  <Button className="bg-primary text-white hover:bg-primary/90 font-semibold">
                    Request Price List
                  </Button>
                </div>
              </div>
              {/* Contact Form */}
              <div>
                <div className="bg-[#242728] rounded-lg shadow-lg p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">Interested in {project.title}?</h3>
                    <p className="text-gray-400 text-sm">Fill in the form below and our property specialist will get back to you within 24 hours.</p>
                  </div>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                        Phone
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="unit-type" className="block text-sm font-medium text-gray-300 mb-1">
                        Interested Unit Type
                      </label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select unit type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          {project.unitTypes.map((unit, index) => (
                            <SelectItem key={index} value={unit.type} className="text-gray-300 hover:bg-gray-800">
                              {unit.type} - {unit.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="I'm interested in this project..."
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      ></textarea>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="newsletter"
                        className="rounded border-gray-700 bg-gray-800 text-primary focus:ring-primary"
                      />
                      <label htmlFor="newsletter" className="text-sm text-gray-300">
                        Subscribe to our newsletter for updates on new launches
                      </label>
                    </div>

                    <Button className="w-full bg-primary text-white hover:bg-primary/90">
                      Inquire Now
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <h4 className="font-semibold mb-3 text-white">Contact our specialist directly:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mr-3">
                          <Phone className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Phone</div>
                          <div className="font-medium text-white">+65 8123 4567</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center mr-3">
                          <Mail className="h-4 w-4 text-red-500" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">Email</div>
                          <div className="font-medium text-white">newlaunches@example.com</div>
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

      {/* Transaction History - Full Width */}
      <section className="py-12 bg-[#1c1c1d]">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-4 text-white">Transaction History</h3>
          <div className="bg-[#242728] rounded-lg p-8 flex flex-col items-center justify-center shadow-lg">
            <p className="text-gray-400 text-center">Transaction history data will be displayed here soon.</p>
          </div>
        </div>
      </section>

      {/* Project Details - Full Width */}
      <section className="py-12 bg-[#1c1c1d]">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-4 text-white">Project Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Address */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <MapPin className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Address</div>
                <div className="font-semibold text-white">{project.location}</div>
              </div>
            </div>
            {/* Site Area */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <Ruler className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Site Area</div>
                <div className="font-semibold text-white">{project.siteArea}</div>
              </div>
            </div>
            {/* Developer */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <Building2 className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Developer</div>
                <div className="font-semibold text-white">{project.developer}</div>
              </div>
            </div>
            {/* District */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <Map className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">District</div>
                <div className="font-semibold text-white">D{project.district}</div>
              </div>
            </div>
            {/* Tenure */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <Calendar className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Tenure</div>
                <div className="font-semibold text-white">{project.tenure}</div>
              </div>
            </div>
            {/* Nearest MRT */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <Train className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Nearest MRT</div>
                <div className="font-semibold text-white">{project.locationAnalytics.mrt[0]?.name || 'N/A'}{project.locationAnalytics.mrt[0]?.distance ? ` (${project.locationAnalytics.mrt[0].distance})` : ''}</div>
              </div>
            </div>
            {/* Total Units */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <Home className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Total Units</div>
                <div className="font-semibold text-white">{project.totalUnits}</div>
              </div>
            </div>
            {/* Bedrooms */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <Bed className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Bedrooms</div>
                <div className="font-semibold text-white">{project.unitTypes.map(u => u.type).join(', ')}</div>
              </div>
            </div>
            {/* Expected TOP */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <CalendarCheck className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Expected TOP</div>
                <div className="font-semibold text-white">{project.completion}</div>
              </div>
            </div>
            {/* Property Type */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <Tag className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Property Type</div>
                <div className="font-semibold text-white">{project.propertyType}</div>
              </div>
            </div>
            {/* Floor Size */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <LayoutGrid className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Floor Size</div>
                <div className="font-semibold text-white">{project.unitTypes[0]?.size} - {project.unitTypes[project.unitTypes.length-1]?.size}</div>
              </div>
            </div>
            {/* Average PSF */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Average PSF</div>
                <div className="font-semibold text-white">{project.pricePerSqFt}</div>
              </div>
            </div>
            {/* Blocks */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <Layers className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Blocks</div>
                <div className="font-semibold text-white">N/A</div>
              </div>
            </div>
            {/* Floors */}
            <div className="bg-[#242728] p-4 rounded-lg flex items-start gap-3">
              <Hash className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <div className="text-sm text-gray-400 font-semibold">Floors</div>
                <div className="font-semibold text-white">{project.totalFloors}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience the Space - Full Width */}
      <section className="py-12 bg-[#1c1c1d]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-3 text-white">Experience the Space</h3>
            <p className="text-gray-300">Walk through every corner, just like you're there.</p>
          </div>
          <div className="relative w-full aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            {/* Initial state with play button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors cursor-pointer group" 
                 onClick={(e) => {
                   const iframe = e.currentTarget.nextElementSibling as HTMLIFrameElement;
                   iframe.style.display = 'block';
                   e.currentTarget.style.display = 'none';
                 }}>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5.14v14l11-7-11-7z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-gray-300 font-medium">Click to Experience 3D Tour</span>
              </div>
            </div>
            {/* 3D Tour iframe - hidden initially */}
            <iframe 
              src="https://www.propertylimbrothers.com/3d-tour/parc-esta-2br/fullscreen/#"
              className="w-full h-full hidden"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Unit Types & Pricing - Full Width */}
      <section className="py-12 bg-[#1c1c1d]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-white">Unit Types & Pricing</h2>
          <div className="grid gap-6">
            {project.unitTypes.map((unit, index) => {
              // Find the matching floor plan image by type
              const floorPlan = project.floorPlans.find(fp => fp.type === unit.type)
              return (
                <Card key={index} className="bg-[#242728] border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-semibold text-white">{unit.type}</h3>
                        <div className="flex items-center text-gray-300">
                          <Home className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{unit.size}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-gray-800 text-gray-300">Starting from</Badge>
                          <Badge variant="outline" className="border-gray-700 text-gray-300">{unit.price}</Badge>
                        </div>
                      </div>
                      <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-3">
                        <div>
                          <div className="text-xl font-bold text-red-500">{unit.price}</div>
                          <div className="text-sm text-gray-400">Starting Price</div>
                        </div>
                        {floorPlan && (
                          <Button
                            variant="outline"
                            className="w-full md:w-auto border-gray-700 text-gray-300 hover:bg-gray-800"
                            onClick={() => setFloorPlanModal({ open: true, image: floorPlan.image, type: unit.type })}
                          >
                            View Floor Plan
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          {/* Floor Plan Modal Dialog */}
          <Dialog open={floorPlanModal.open} onOpenChange={open => setFloorPlanModal(fp => ({ ...fp, open }))}>
            <DialogContent className="max-w-2xl bg-black p-0">
              <DialogTitle>
                <span className="text-white text-lg font-semibold">{floorPlanModal.type} Floor Plan</span>
              </DialogTitle>
              {floorPlanModal.image && (
                <div className="relative w-full aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={floorPlanModal.image}
                    alt={`${floorPlanModal.type} Floor Plan`}
                    fill
                    className="object-contain rounded"
                  />
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Location - Full Width */}
      <section className="py-16 bg-[#1c1c1d] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Location</h2>
          
          {/* Tabs */}
          <div className="border-b border-gray-800 mb-6">
            <div className="flex space-x-4 overflow-x-auto">
              {amenityTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedAmenityType(tab.key)}
                    className={`py-2 px-3 border-b-2 font-medium text-xs whitespace-nowrap flex items-center gap-2 ${
                      selectedAmenityType === tab.key
                        ? 'border-blue-500 text-blue-400'
                        : 'border-transparent text-gray-400 hover:text-white hover:border-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* List - 30% */}
            <div className="lg:col-span-3 space-y-2">
              {isLoadingAmenities ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : !realAmenitiesData[selectedAmenityType] || realAmenitiesData[selectedAmenityType].length === 0 ? (
                <div className="text-center text-gray-400 py-8">No amenities found</div>
              ) : (
                (selectedAmenityType === "all" 
                  ? Object.values(realAmenitiesData).flat()
                  : realAmenitiesData[selectedAmenityType]
                ).map((amenity, index) => (
                  <div
                    key={amenity.placeId}
                    onClick={() => {
                      setSelectedAmenity(amenity);
                      setSelectedAmenityClick((c) => c + 1);
                    }}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors duration-150 ${
                      (selectedAmenity
                        ? amenity.placeId === selectedAmenity.placeId
                        : index === 0)
                        ? 'border-blue-500 bg-blue-900/30'
                        : 'border-gray-800 bg-[#232325] hover:border-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm text-white">{amenity.name}</h3>
                        <p className="text-xs text-gray-400">{amenity.address}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-blue-300">{amenity.distance}</p>
                        <p className="text-xs text-gray-400">
                          {amenity.duration} ({amenity.transportMode})
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Map - 70% */}
            <div className="lg:col-span-7 h-[600px] rounded-lg overflow-hidden border border-gray-800">
              <HybridMapAmenities project={project} />
            </div>
          </div>
        </div>
      </section>

      {/* Similar Projects - Bottom of Page */}
      <section className="py-12 bg-[#242728]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-white">Similar Projects You May Like</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.similarProjects.map((similarProject) => (
              <ProjectCard
                key={similarProject.slug}
                name={similarProject.name}
                location={similarProject.location}
                price={similarProject.price}
                priceRange={similarProject.priceRange}
                image={similarProject.image}
                units={similarProject.units}
                unitsAvailable={similarProject.unitsAvailable}
                propertySizeRange={similarProject.propertySizeRange}
                developer={similarProject.developer}
                completion={similarProject.completion}
                slug={similarProject.slug}
                type={similarProject.type}
                coordinates={similarProject.coordinates}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - With Agents */}
      <section className="py-16 bg-[#1c1c1d] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Contact Our Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Agent Cards */}
            <div className="space-y-6">
              {/* Agent 1 */}
              <div className="bg-[#242728] rounded-lg p-6 flex gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/agent-1.jpg"
                    alt="Agent Name"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">Siew Min</h3>
                      <p className="text-sm text-gray-400">Senior Property Consultant</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">Top Agent</Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-300">
                      <Phone className="h-4 w-4 mr-2 text-red-500" />
                      +65 8123 4567
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Mail className="h-4 w-4 mr-2 text-red-500" />
                      siewmin@example.com
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>

              {/* Agent 2 */}
              <div className="bg-[#242728] rounded-lg p-6 flex gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/agent-2.jpg"
                    alt="Agent Name"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">John Doe</h3>
                      <p className="text-sm text-gray-400">Property Consultant</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">New</Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-300">
                      <Phone className="h-4 w-4 mr-2 text-red-500" />
                      +65 8765 4321
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Mail className="h-4 w-4 mr-2 text-red-500" />
                      john@example.com
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </Button>
                    <Button variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#242728] rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Send Inquiry</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="I'm interested in this project..."
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  ></textarea>
                </div>
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  Send Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Without Agents */}
      <section className="py-16 bg-[#1c1c1d] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Contact Us (If Not Have Agent)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-[#242728] rounded-lg p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                  <p className="text-gray-400 mb-6">Our team is ready to assist you with any questions about {project.title}.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-lg font-medium">+65 8123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-lg font-medium">inquiry@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Business Hours</p>
                      <p className="text-lg font-medium">Mon - Sat: 9AM - 6PM</p>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#242728] rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Send Inquiry</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="I'm interested in this project..."
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  ></textarea>
                </div>
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  Send Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Projects - Bottom of Page */}
      <section className="py-12 bg-[#242728]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-white">Similar Projects You May Like</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.similarProjects.map((similarProject) => (
              <ProjectCard
                key={similarProject.slug}
                name={similarProject.name}
                location={similarProject.location}
                price={similarProject.price}
                priceRange={similarProject.priceRange}
                image={similarProject.image}
                units={similarProject.units}
                unitsAvailable={similarProject.unitsAvailable}
                propertySizeRange={similarProject.propertySizeRange}
                developer={similarProject.developer}
                completion={similarProject.completion}
                slug={similarProject.slug}
                type={similarProject.type}
                coordinates={similarProject.coordinates}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
