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

  // Fetch nearby places from Google Places API
  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_API_KEY}`;
  const placesRes = await fetch(placesUrl);
  const placesData = await placesRes.json();

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
      };
    })
  );

  // Mark the nearest as isNearest
  let nearestIdx = 0;
  let minDistance = Number.MAX_VALUE;
  for (let i = 0; i < places.length; i++) {
    const dist = Number(places[i].distance.replace(/[^0-9.]/g, ''));
    if (!isNaN(dist) && dist < minDistance) {
      minDistance = dist;
      nearestIdx = i;
    }
  }
  if (places[nearestIdx]) {
    places[nearestIdx].isNearest = true;
  }

  return new Response(JSON.stringify(places), { status: 200 });
} 