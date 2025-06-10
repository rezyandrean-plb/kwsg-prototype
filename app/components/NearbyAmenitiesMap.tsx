"use client"

import React, { useEffect, useState } from 'react';
import { Project } from "@/lib/data";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

// Dummy fetchNearbyAmenities for now (replace with your real fetch logic)
async function fetchNearbyAmenities(lat: number, lng: number, radius: number, categories: typeof CATEGORIES): Promise<Amenity[]> {
  // Return a few dummy amenities for demonstration
  return [
    { name: 'Amenity 1', lat: lat + 0.001, lng: lng + 0.001, type: 'school' },
    { name: 'Amenity 2', lat: lat - 0.001, lng: lng - 0.001, type: 'park' },
  ];
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

  const [amenities, setAmenities] = useState<Amenity[]>([]);

  useEffect(() => {
    fetchNearbyAmenities(projectCoords.lat, projectCoords.lng, 1000, CATEGORIES)
      .then(setAmenities);
  }, [projectCoords.lat, projectCoords.lng]);

  return (
    <MapContainer center={projectCoords} zoom={15} style={{ width: '100%', height: '100%' }} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Project Marker */}
      <Marker position={projectCoords}>
        <Popup>
          Project Location
        </Popup>
      </Marker>
      {/* Amenity Markers */}
      {amenities.map((amenity, idx) => (
        <Marker key={idx} position={{ lat: amenity.lat, lng: amenity.lng }}>
          <Popup>
            {amenity.name} ({amenity.type})
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 