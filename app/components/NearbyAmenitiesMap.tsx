"use client"

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Project {
  latitude?: number;
  longitude?: number;
  title?: string;
}

interface Amenity {
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

interface Props {
  project: Project;
  amenities: Amenity[];
  selectedAmenity: Amenity | null;
}

// Fix for default marker icon in Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom property marker icon
const PropertyIcon = L.icon({
  iconUrl: '/map-markers/property.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Function to get icon based on amenity type and name
const getAmenityIcon = (type: string, name: string): string => {
  const typeLower = type.toLowerCase();
  const nameLower = name.toLowerCase();
  
  // Transportation - MRT/Train stations
  if (typeLower.includes('transit') || typeLower.includes('station') || 
      nameLower.includes('mrt') || nameLower.includes('train') || 
      nameLower.includes('metro') || nameLower.includes('subway')) {
    return '/map-markers/mrt.svg';
  }
  
  // Transportation - Bus stops
  if (typeLower.includes('bus') || nameLower.includes('bus stop') || 
      nameLower.includes('bus station')) {
    return '/map-markers/bus.svg';
  }
  
  // Education - Schools
  if (typeLower.includes('school') || nameLower.includes('school') || 
      nameLower.includes('primary') || nameLower.includes('secondary') ||
      nameLower.includes('university') || nameLower.includes('college')) {
    return '/map-markers/school.svg';
  }
  
  // Shopping - Malls
  if (typeLower.includes('shopping') || typeLower.includes('mall') || 
      nameLower.includes('shopping') || nameLower.includes('mall')) {
    return '/map-markers/shopping.svg';
  }
  
  // Food - Restaurants and food courts
  if (typeLower.includes('restaurant') || typeLower.includes('food') || 
      nameLower.includes('restaurant') || nameLower.includes('food court') ||
      nameLower.includes('food centre') || nameLower.includes('hawker')) {
    return '/map-markers/food.svg';
  }
  
  // Groceries - Supermarkets
  if (typeLower.includes('supermarket') || typeLower.includes('grocery') || 
      nameLower.includes('supermarket') || nameLower.includes('grocery') ||
      nameLower.includes('ntuc') || nameLower.includes('fairprice')) {
    return '/map-markers/groceries.svg';
  }
  
  // Recreation - Parks
  if (typeLower.includes('park') || nameLower.includes('park') || 
      nameLower.includes('garden') || nameLower.includes('recreation')) {
    return '/map-markers/recreation.svg';
  }
  
  // Healthcare
  if (typeLower.includes('hospital') || typeLower.includes('clinic') || 
      nameLower.includes('hospital') || nameLower.includes('clinic') ||
      nameLower.includes('medical')) {
    return '/map-markers/hospital.svg';
  }
  
  // Default fallback
  return '';
};

// Legacy mapping for backward compatibility (if needed)
const amenityIconMap: Record<string, string> = {
  // Education
  'Primary School': '/map-markers/school.svg',
  'Secondary School': '/map-markers/school.svg',
  'School': '/map-markers/school.svg',
  'school': '/map-markers/school.svg',
  'University': '/map-markers/school.svg',
  'College': '/map-markers/school.svg',
  
  // Transportation
  'MRT Station': '/map-markers/mrt.svg',
  'transit_station': '/map-markers/mrt.svg',
  'Bus Stop': '/map-markers/bus.svg',
  'Bus Station': '/map-markers/bus.svg',
  'Train Station': '/map-markers/mrt.svg',
  
  // Shopping & Food
  'Shopping Mall': '/map-markers/shopping.svg',
  'shopping_mall': '/map-markers/shopping.svg',
  'Shopping Centre': '/map-markers/shopping.svg',
  'Food Centre': '/map-markers/food.svg',
  'Food Court': '/map-markers/food.svg',
  'Restaurant': '/map-markers/food.svg',
  'restaurant': '/map-markers/food.svg',
  'Supermarket': '/map-markers/groceries.svg',
  'supermarket': '/map-markers/groceries.svg',
  'Grocery Store': '/map-markers/groceries.svg',
  'Convenience Store': '/map-markers/groceries.svg',
  
  // Recreation
  'Park': '/map-markers/recreation.svg',
  'park': '/map-markers/recreation.svg',
  'Garden': '/map-markers/recreation.svg',
  'Recreation Centre': '/map-markers/recreation.svg',
  'Sports Centre': '/map-markers/recreation.svg',
  
  // Healthcare
  'Hospital': '/map-markers/hospital.svg',
  'Medical Centre': '/map-markers/hospital.svg',
  'Clinic': '/map-markers/hospital.svg',
  'Polyclinic': '/map-markers/hospital.svg',
};

function MapAutoCenter({ project, selectedAmenity }: { project: Project; selectedAmenity: Amenity | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedAmenity) {
      map.setView([selectedAmenity.location.lat, selectedAmenity.location.lng], 15, { animate: true });
    } else {
      map.setView([project.latitude ?? 0, project.longitude ?? 0], 15, { animate: true });
    }
  }, [selectedAmenity, project.latitude, project.longitude, map]);
  return null;
}

export default function NearbyAmenitiesMap({ project, amenities, selectedAmenity }: Props) {
  if (!project.latitude || !project.longitude) {
    return <div className="h-full flex items-center justify-center text-gray-400">Location data not available.</div>;
  }
  const projectCoords = [project.latitude ?? 0, project.longitude ?? 0] as [number, number];
  const selectedCoords = selectedAmenity ? [selectedAmenity.location.lat, selectedAmenity.location.lng] as [number, number] : null;

  return (
    <MapContainer center={projectCoords} zoom={15} style={{ width: '100%', height: '100%' }} scrollWheelZoom={true}>
      <MapAutoCenter project={project} selectedAmenity={selectedAmenity} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Project Marker */}
      <Marker position={projectCoords} icon={PropertyIcon}>
        <Popup>
          <div>
            <div className="font-bold text-blue-600">{project.title ? project.title : 'Project Location'}</div>
            <div className="text-xs text-gray-500">Property Location</div>
          </div>
        </Popup>
      </Marker>
      {/* Amenity Markers */}
      {amenities.map((amenity) => {
        const isSelected = amenity.placeId === selectedAmenity?.placeId;
        // Use intelligent matching function, fallback to map, then to selected icon
        const iconUrl = isSelected 
          ? '/map-markers/selected.svg' 
          : getAmenityIcon(amenity.type, amenity.name) || amenityIconMap[amenity.type] || '';
        const icon = iconUrl ? L.icon({
          iconUrl: iconUrl,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        }) : DefaultIcon;
        
        return (
          <Marker
            key={amenity.placeId}
            position={[amenity.location.lat, amenity.location.lng]}
            icon={icon}
          >
            <Popup>
              <div>
                <div className="font-bold">{amenity.name}</div>
                <div className="text-xs text-gray-500">{amenity.address}</div>
                <div className="text-xs font-medium">{amenity.type}</div>
                <div className="text-xs text-green-600">
                  {amenity.distance} • {amenity.duration} by {amenity.transportMode}
                </div>
                {isSelected && (
                  <div className="text-xs text-red-600 font-medium mt-1">
                    ✓ Selected
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
      {/* Polyline from project to selected amenity */}
      {selectedCoords && (
        <Polyline positions={[projectCoords, selectedCoords]} color="#ef4444" weight={4} />
      )}
    </MapContainer>
  );
} 