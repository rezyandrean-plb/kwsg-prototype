export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const type = searchParams.get('type');
  const radius = searchParams.get('radius') || '5000';

  if (!lat || !lng || !type) {
    return new Response(JSON.stringify({ error: 'Missing required parameters' }), { status: 400 });
  }

  const GOOGLE_MAPS_API_KEY = 'AIzaSyATaKZX6SiWUM43vZletpWeI1KPLo2Hftw';

  let placesData: any;

  // Special handling for transport type - prioritize MRT stations
  if (type === 'transit_station') {
    // First try to find MRT stations specifically
    const mrtUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=MRT&type=subway_station&key=${GOOGLE_MAPS_API_KEY}`;
    const mrtRes = await fetch(mrtUrl);
    const mrtData = await mrtRes.json();
    
    // If we found MRT stations, use them; otherwise fall back to general transit stations
    if (mrtData.results && mrtData.results.length > 0) {
      placesData = mrtData;
    } else {
      // Fallback to general transit stations
      const transitUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=transit_station&key=${GOOGLE_MAPS_API_KEY}`;
      const transitRes = await fetch(transitUrl);
      placesData = await transitRes.json();
    }
  } else {
    // For other types, use the original logic
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_API_KEY}`;
    const placesRes = await fetch(placesUrl);
    placesData = await placesRes.json();
  }

  if (!placesData.results) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  // For each place, get details and distance
  const places = await Promise.all(
    placesData.results.slice(0, 8).map(async (place: any) => {
      // Get distance and duration from Distance Matrix API
      const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lng}&destinations=${place.geometry.location.lat},${place.geometry.location.lng}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`;
      const distanceRes = await fetch(distanceUrl);
      const distanceData = await distanceRes.json();
      const element = distanceData.rows[0]?.elements[0];
      
      // Check if this is an MRT station for prioritization
      const isMRT = place.name.toLowerCase().includes('mrt') || 
                   place.name.toLowerCase().includes('mass rapid transit') ||
                   place.types?.includes('subway_station');
      
      return {
        placeId: place.place_id,
        name: place.name,
        address: place.vicinity || place.formatted_address || '',
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
        type: type,
        distance: element?.distance?.text || '',
        duration: element?.duration?.text || '',
        transportMode: 'driving',
        isMRT: isMRT,
      };
    })
  );

  // Sort places to prioritize MRT stations, then by distance
  places.sort((a, b) => {
    // First priority: MRT stations
    if (a.isMRT && !b.isMRT) return -1;
    if (!a.isMRT && b.isMRT) return 1;
    
    // Second priority: distance
    const distA = Number(a.distance.replace(/[^0-9.]/g, ''));
    const distB = Number(b.distance.replace(/[^0-9.]/g, ''));
    if (isNaN(distA) && isNaN(distB)) return 0;
    if (isNaN(distA)) return 1;
    if (isNaN(distB)) return -1;
    return distA - distB;
  });

  // Mark the nearest as isNearest (first item after sorting)
  if (places.length > 0) {
    places[0].isNearest = true;
  }

  return new Response(JSON.stringify(places), { status: 200 });
} 