"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Project } from "@/lib/data";
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";
import { useMemo } from "react";

interface Props {
  project: Project;
}

interface Amenity {
  name: string;
  lat: number;
  lng: number;
  type: string;
  isNearest?: boolean;
}

const CATEGORIES = [
  { key: 'transport', label: 'Transport', types: ['bus_station', 'subway_station', 'transit_station'], icon: '/map-markers/map/train.svg' },
  { key: 'school', label: 'School', types: ['primary_school', 'secondary_school', 'university'], icon: '/map-markers/map/school.svg' },
  { key: 'shopping_mall', label: 'Shopping Mall', types: ['shopping_mall'], icon: '/map-markers/map/shopping_bag.svg' },
  { key: 'supermarket', label: 'Supermarket', types: ['supermarket', 'grocery_store'], icon: '/map-markers/map/shopping_cart.svg' },
  { key: 'food_centre', label: 'Food Centre / Restaurant', types: ['restaurant', 'food_court', 'cafe', 'meal_takeaway'], icon: '/map-markers/map/utensils.svg' },
  { key: 'park', label: 'Park', types: ['park'], icon: '/map-markers/map/park.svg' },
];

const loadScript = (src: string): Promise<void> => {
  return new Promise<void>((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
};

async function fetchNearbyAmenities(lat: number, lng: number, radius: number, categories: typeof CATEGORIES): Promise<any[]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_KEY || (typeof window !== 'undefined' ? (window as any).NEXT_PUBLIC_GOOGLE_KEY : '');
  if (!apiKey) {
    console.error('Google Maps API key not found');
    return [];
  }
  const allResults: any[] = [];
  // ... rest of the function implementation
  return allResults;
}

export default function HybridMapAmenities({ project }: Props) {
  if (!project.latitude || !project.longitude) {
    return (
      <div id="hybrid-nearby-amenities" className="mt-20 mb-20">
        <h2 className="text-3xl font-bold mb-8">Nearby Amenities</h2>
        <p>Location data not available for this project.</p>
      </div>
    );
  }

  const projectCoords = { 
    lat: Number(project.latitude), 
    lng: Number(project.longitude) 
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const API_KEY = "AIzaSyATaKZX6SiWUM43vZletpWeI1KPLo2Hftw";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Fetch amenities when component mounts
    fetchNearbyAmenities(projectCoords.lat, projectCoords.lng, 1000, CATEGORIES)
      .then(results => {
        const formattedAmenities: Amenity[] = results.flatMap(category => 
          category.places.map((place: any) => ({
            name: place.name,
            lat: place.lat,
            lng: place.lon,
            type: place.type
          }))
        );
        setAmenities(formattedAmenities);
      });
  }, [projectCoords.lat, projectCoords.lng]);

  // Find the selected (nearest) amenity
  const selectedAmenityMemo = useMemo(
    () => amenities.find((a) => a.isNearest),
    [amenities]
  );

  // Center on selected amenity if exists, else project center
  const mapCenter = selectedAmenityMemo
    ? { lat: selectedAmenityMemo.lat, lng: selectedAmenityMemo.lng }
    : projectCoords;

  // Directions state
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (isLoaded && selectedAmenityMemo) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: projectCoords,
          destination: { lat: selectedAmenityMemo.lat, lng: selectedAmenityMemo.lng },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            setDirections(null);
          }
        }
      );
    } else {
      setDirections(null);
    }
  }, [isLoaded, selectedAmenityMemo, projectCoords]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={15}
      options={{ mapTypeControl: false, streetViewControl: false }}
    >
      {/* Project Marker */}
      <Marker position={projectCoords} label="P" />

      {/* Amenity Markers */}
      {amenities.map((amenity, idx) => (
        <Marker
          key={idx}
          position={{ lat: amenity.lat, lng: amenity.lng }}
          label={amenity.isNearest ? "★" : amenity.name[0]}
          title={amenity.name}
          icon={
            amenity.isNearest
              ? {
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }
              : undefined
          }
        />
      ))}

      {/* Directions */}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  ) : (
    <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400">
      Loading map...
    </div>
  );
} 