export interface GooglePlace {
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