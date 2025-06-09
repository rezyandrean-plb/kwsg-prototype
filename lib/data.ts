export interface Block {
    name?: string
    address: string
    postalCode: string
  }
  
  export interface Project {
    id: number
    name: string
    project_name: string
    slug: string
    description: string
    longDescription?: string
    address: string
    location: string
    type: string
    status: string
    priceFrom: string
    bedrooms: string
    bathrooms: string
    size: string
    image?: string
    main_image?: string
    developer?: string
    tenure?: string
    completion?: string
    totalUnits?: string
    siteArea?: string
    featured?: boolean
    nearestMrt?: string
    district?: string
    blocks?: Block[]
    min_bedroom?: string
    max_bedroom?: string
    min_bathroom?: string
    max_bathroom?: string
    min_area?: string
    max_area?: string
    street_address?: string
    project_type?: string
    site_area?: string
    units_number?: string
    site_plan_url?: string
    unit_distribution_url?: string
    launch_date?: string
    completion_date?: string
    facilities?: string
    processed_facilities?: {
      'Sports & Fitness': string[];
      'Dining & BBQ': string[];
      'Relaxation & Social': string[];
      'Children & Play': string[];
      'Event & Entertainment': string[];
      'Nature & Gardens': string[];
      'Utilities & Services': string[];
    }
    floor_plans?: {
      floor_plan_id: string;
      floor_plan_type: string;
      floor_plan_category: string;
      floor_plan_name: string;
      img_url: string;
    }[];
    project_unit_types?: {
      unit_type: string;
      unit_number: string;
      available_number: string;
      min_area?: string;
      max_area?: string;
      min_price?: string;
      max_price?: string;
    }[];
    sitePlan?: {
      site_plan_url?: string;
      [key: string]: any;
    };
    media_images?: {
      image_id: string;
      create_time: string;
      title: string;
      image_link: string;
    }[];
    media_brochures?: {
      document_id: string;
      title: string;
      document_link: string;
      create_time: string;
    }[];
    latitude?: number;
    longitude?: number;
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      name: "19 NASSIM",
      project_name: "19 NASSIM",
      slug: "19-nassim",
      description:
        "An exclusive freehold luxury development in the prestigious Nassim Hill enclave. Featuring only 101 exquisite residences, this architectural masterpiece offers unparalleled luxury living in Singapore's most coveted address.",
      longDescription:
        "19 Nassim is an exclusive freehold development nestled in the prestigious Nassim enclave, one of Singapore's most coveted residential addresses. This boutique development offers just 101 exquisite residences, providing unparalleled exclusivity and privacy. Designed by renowned architects, the development features elegant interiors, premium finishes, and expansive living spaces that exude sophistication and luxury. Residents will enjoy a comprehensive suite of facilities including a 50m lap pool, gymnasium, function room, and lush landscaped gardens. With its prime location just minutes from Orchard Road and the Central Business District, 19 Nassim represents the pinnacle of luxury living in Singapore.",
      address: "19 Nassim Road",
      location: "Nassim",
      type: "Condominium",
      status: "New Launch",
      priceFrom: "3.8M",
      bedrooms: "2-4",
      bathrooms: "2-4",
      size: "807-3,832 sqft",
      developer: "Keppel Land",
      tenure: "Freehold",
      completion: "2026",
      totalUnits: "101",
      siteArea: "66,452 sqft",
      featured: true,
      nearestMrt: "Orchard MRT (350m)",
      district: "10",
      blocks: [
        {
          address: "19 Nassim Road",
          postalCode: "258461",
        },
      ],
    },
    {
      id: 2,
      name: "The Reef at King's Dock",
      project_name: "The Reef at King's Dock",
      slug: "the-reef-at-kings-dock",
      description: "Waterfront living at Keppel Bay with unique floating deck and marine facilities.",
      address: "2 Keppel Bay Drive",
      location: "Keppel Bay",
      type: "Condominium",
      status: "New Launch",
      priceFrom: "1.7M",
      bedrooms: "1-3",
      bathrooms: "1-3",
      size: "431-1,572 sqft",
      featured: true,
      developer: "Mapletree & Keppel Land",
      tenure: "99-year Leasehold",
      completion: "2025",
      totalUnits: "429",
      siteArea: "84,289 sqft",
      nearestMrt: "HarbourFront MRT (800m)",
      district: "4",
      blocks: [
        {
          address: "2 Keppel Bay Drive",
          postalCode: "098383",
        },
      ],
    },
    {
      id: 3,
      name: "Midtown Modern",
      project_name: "Midtown Modern",
      slug: "midtown-modern",
      description: "Garden homes in the city with direct access to Bugis MRT station.",
      address: "Tan Quee Lan Street",
      location: "Bugis",
      type: "Condominium",
      status: "New Launch",
      priceFrom: "1.5M",
      bedrooms: "1-4",
      bathrooms: "1-4",
      size: "409-1,808 sqft",
      featured: true,
      developer: "GuocoLand & Hong Leong",
      tenure: "99-year Leasehold",
      completion: "2024",
      totalUnits: "558",
      siteArea: "124,117 sqft",
      nearestMrt: "Bugis MRT (Direct Access)",
      district: "7",
      blocks: [
        {
          address: "Tan Quee Lan Street, Tower 1",
          postalCode: "188091",
        },
        {
          address: "Tan Quee Lan Street, Tower 2",
          postalCode: "188092",
        },
      ],
    },
    {
      id: 4,
      name: "Meyer Mansion",
      project_name: "Meyer Mansion",
      slug: "meyer-mansion",
      description: "Freehold luxury development with unblocked sea views along Meyer Road.",
      address: "79 Meyer Road",
      location: "East Coast",
      type: "Condominium",
      status: "New Launch",
      priceFrom: "2.2M",
      bedrooms: "1-4",
      bathrooms: "1-4",
      size: "484-2,142 sqft",
      featured: true,
      developer: "GuocoLand",
      tenure: "Freehold",
      completion: "2024",
      totalUnits: "200",
      siteArea: "85,249 sqft",
      nearestMrt: "Katong Park MRT (500m)",
      district: "15",
      blocks: [
        {
          address: "79 Meyer Road",
          postalCode: "437906",
        },
      ],
    },
    {
      id: 5,
      name: "Parc Greenwich",
      project_name: "Parc Greenwich",
      slug: "parc-greenwich",
      description: "Executive condominium with lush greenery and smart home features.",
      address: "Fernvale Lane",
      location: "Sengkang",
      type: "Executive Condominium",
      status: "New Launch",
      priceFrom: "1.1M",
      bedrooms: "2-5",
      bathrooms: "2-4",
      size: "786-1,464 sqft",
      developer: "Frasers Property",
      tenure: "99-year Leasehold",
      completion: "2024",
      totalUnits: "496",
      siteArea: "185,139 sqft",
      nearestMrt: "Fernvale LRT (400m)",
      district: "28",
      blocks: [
        {
          address: "31 Fernvale Lane",
          postalCode: "797494",
        },
        {
          address: "33 Fernvale Lane",
          postalCode: "797495",
        },
        {
          address: "35 Fernvale Lane",
          postalCode: "797496",
        },
      ],
    },
    {
      id: 6,
      name: "Pasir Ris 8",
      project_name: "Pasir Ris 8",
      slug: "pasir-ris-8",
      description: "Integrated development connected to Pasir Ris MRT and bus interchange.",
      address: "8 Pasir Ris Drive 1",
      location: "Pasir Ris",
      type: "Mixed Development",
      status: "New Launch",
      priceFrom: "1.4M",
      bedrooms: "1-4",
      bathrooms: "1-4",
      size: "420-1,604 sqft",
      developer: "Allgreen Properties & Kerry Properties",
      tenure: "99-year Leasehold",
      completion: "2026",
      totalUnits: "487",
      siteArea: "409,482 sqft",
      nearestMrt: "Pasir Ris MRT (Direct Access)",
      district: "18",
      blocks: [
        {
          address: "8 Pasir Ris Drive 1",
          postalCode: "519457",
        },
      ],
    },
    {
      id: 7,
      name: "Belgravia Ace",
      project_name: "Belgravia Ace",
      slug: "belgravia-ace",
      description: "Freehold strata landed homes with private lift and basement carpark.",
      address: "Belgravia Drive",
      location: "Ang Mo Kio",
      type: "Landed",
      status: "New Launch",
      priceFrom: "4.3M",
      bedrooms: "4-5",
      bathrooms: "4-5",
      size: "3,014-3,767 sqft",
      developer: "Tong Eng Group & Yeap Holdings",
      tenure: "Freehold",
      completion: "2025",
      totalUnits: "107",
      siteArea: "340,150 sqft",
      nearestMrt: "Ang Mo Kio MRT (1.5km)",
      district: "28",
      blocks: [
        {
          address: "Belgravia Drive",
          postalCode: "556807",
        },
      ],
    },
    {
      id: 8,
      name: "Canninghill Piers",
      project_name: "Canninghill Piers",
      slug: "canninghill-piers",
      description: "Iconic integrated development at the former Liang Court site along Singapore River.",
      address: "177 River Valley Road",
      location: "River Valley",
      type: "Mixed Development",
      status: "New Launch",
      priceFrom: "1.6M",
      bedrooms: "1-5",
      bathrooms: "1-5",
      size: "409-2,788 sqft",
      featured: true,
      developer: "CDL & CapitaLand",
      tenure: "99-year Leasehold",
      completion: "2025",
      totalUnits: "696",
      siteArea: "139,929 sqft",
      nearestMrt: "Fort Canning MRT (300m)",
      district: "6",
      blocks: [
        {
          address: "177 River Valley Road, Tower 1",
          postalCode: "179030",
        },
        {
          address: "177 River Valley Road, Tower 2",
          postalCode: "179031",
        },
      ],
    },
    {
      id: 9,
      name: "Perfect Ten",
      project_name: "Perfect Ten",
      slug: "perfect-ten",
      description: "Freehold luxury development in District 10 with panoramic city views.",
      address: "10 Bukit Timah Road",
      location: "Bukit Timah",
      type: "Condominium",
      status: "New Launch",
      priceFrom: "2.5M",
      bedrooms: "2-4",
      bathrooms: "2-4",
      size: "753-2,142 sqft",
      developer: "Japura Development",
      tenure: "Freehold",
      completion: "2025",
      totalUnits: "230",
      siteArea: "104,532 sqft",
      nearestMrt: "Newton MRT (400m)",
      district: "10",
      blocks: [
        {
          address: "10 Bukit Timah Road",
          postalCode: "376747",
        },
      ],
    },
    {
      id: 10,
      name: "Lentor Modern",
      project_name: "Lentor Modern",
      slug: "lentor-modern",
      description: "Integrated development directly connected to Lentor MRT station.",
      address: "Lentor Central",
      location: "Lentor",
      type: "Mixed Development",
      status: "Coming Soon",
      priceFrom: "1.3M",
      bedrooms: "1-4",
      bathrooms: "1-4",
      size: "527-1,528 sqft",
      developer: "GuocoLand",
      tenure: "99-year Leasehold",
      completion: "2026",
      totalUnits: "605",
      siteArea: "184,460 sqft",
      nearestMrt: "Lentor MRT (Direct Access)",
      district: "26",
      blocks: [
        {
          address: "1 Lentor Central",
          postalCode: "789619",
        },
        {
          address: "3 Lentor Central",
          postalCode: "789620",
        },
        {
          address: "5 Lentor Central",
          postalCode: "789621",
        },
      ],
    },
    {
      id: 11,
      name: "Piccadilly Grand",
      project_name: "Piccadilly Grand",
      slug: "piccadilly-grand",
      description: "Integrated development connected to Farrer Park MRT station.",
      address: "Northumberland Road",
      location: "Farrer Park",
      type: "Mixed Development",
      status: "Coming Soon",
      priceFrom: "1.2M",
      bedrooms: "1-5",
      bathrooms: "1-4",
      size: "484-1,679 sqft",
      developer: "CDL & MCL Land",
      tenure: "99-year Leasehold",
      completion: "2026",
      totalUnits: "407",
      siteArea: "94,000 sqft",
      nearestMrt: "Farrer Park MRT (200m)",
      district: "8",
      blocks: [
        {
          address: "Northumberland Road, Block A",
          postalCode: "218547",
        },
        {
          address: "Northumberland Road, Block B",
          postalCode: "218548",
        },
      ],
    },
    {
      id: 12,
      name: "North Gaia",
      project_name: "North Gaia",
      slug: "north-gaia",
      description: "Executive condominium in Yishun with smart home features and eco-friendly design.",
      address: "Yishun Close",
      location: "Yishun",
      type: "Executive Condominium",
      status: "New Launch",
      priceFrom: "1.1M",
      bedrooms: "2-5",
      bathrooms: "2-4",
      size: "958-1,313 sqft",
      developer: "Sing Holdings",
      tenure: "99-year Leasehold",
      completion: "2026",
      totalUnits: "616",
      siteArea: "231,575 sqft",
      nearestMrt: "Yishun MRT (1.2km)",
      district: "27",
      blocks: [
        {
          address: "1 Yishun Close",
          postalCode: "768999",
        },
        {
          address: "3 Yishun Close",
          postalCode: "769000",
        },
        {
          address: "5 Yishun Close",
          postalCode: "769001",
        },
        {
          address: "7 Yishun Close",
          postalCode: "769002",
        },
      ],
    },
  ]