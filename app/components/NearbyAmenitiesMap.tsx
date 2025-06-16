"use client"

import React, { useEffect, useRef } from 'react';
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

// Custom icon mapping for amenity types
const amenityIconMap: Record<string, string> = {
  'Primary School': '/map-markers/school.png',
  'Secondary School': '/map-markers/school.png',
  'School': '/map-markers/school.png',
  'MRT Station': '/map-markers/mrt.png',
  'Shopping Mall': '/map-markers/shopping.png',
  'Food Centre': '/map-markers/food.png',
  'Supermarket': '/map-markers/groceries.png',
  'Park': '/map-markers/recreation.png',
  // Add more mappings as needed
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
      <Marker position={projectCoords}>
        <Popup>{project.title ? project.title : 'Project Location'}</Popup>
      </Marker>
      {/* Amenity Markers */}
      {amenities.map((amenity) => {
        const iconUrl = amenityIconMap[amenity.type] || DefaultIcon.options.iconUrl;
        const icon = L.icon({
          ...DefaultIcon.options,
          iconUrl: amenity.placeId === selectedAmenity?.placeId
            ? '/map-markers/selected.png' // Optional: special icon for selected
            : iconUrl,
        });
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
                <div className="text-xs">{amenity.type}</div>
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