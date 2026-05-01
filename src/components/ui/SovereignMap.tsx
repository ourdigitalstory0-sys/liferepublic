import React, { useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Navigation, Map as MapIcon } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '2rem'
};

const center = {
  lat: 18.5995,
  lng: 73.7153
};

// Premium dark mode styling for the monograph aesthetic
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

const markers = [
  { id: 'lr', position: center, title: 'Kolte Patil Life Republic', type: 'primary' },
  { id: 'it1', position: { lat: 18.5833, lng: 73.7333 }, title: 'Hinjewadi Phase 1 (IT Park)', type: 'commercial' },
  { id: 'it2', position: { lat: 18.6000, lng: 73.7000 }, title: 'Hinjewadi Phase 2', type: 'commercial' },
  { id: 'edu1', position: { lat: 18.5950, lng: 73.7100 }, title: 'Anisha Global School', type: 'education' },
  { id: 'metro', position: { lat: 18.5900, lng: 73.7250 }, title: 'Upcoming Metro Station', type: 'transit' }
];

export const SovereignMap: React.FC = () => {
  const [activeMarker, setActiveMarker] = React.useState<string | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const mapOptions = useMemo(() => ({
    styles: darkMapStyle,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
  }), []);

  const onLoad = React.useCallback(function callback() {
    // Initialization done
  }, []);

  const onUnmount = React.useCallback(function callback() {
    // Cleanup done
  }, []);

  if (loadError) {
    return (
      <div className="w-full h-[600px] rounded-[2rem] bg-gray-100 flex flex-col items-center justify-center border border-gray-200">
        <MapIcon size={48} className="text-gray-300 mb-4" />
        <p className="text-gray-500 font-serif">Interactive map temporarily unavailable.</p>
        <p className="text-gray-400 text-sm mt-2">Please check connectivity or API configuration.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[600px] rounded-[2rem] bg-gray-50 animate-pulse flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onClick={() => setActiveMarker(marker.id)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: marker.type === 'primary' ? 12 : 8,
              fillColor: marker.type === 'primary' ? '#C5A059' : '#ffffff',
              fillOpacity: 1,
              strokeWeight: marker.type === 'primary' ? 4 : 2,
              strokeColor: marker.type === 'primary' ? '#ffffff' : '#C5A059',
            }}
          />
        ))}

        {activeMarker && (
          <InfoWindow
            position={markers.find(m => m.id === activeMarker)?.position}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div className="p-2 min-w-[150px]">
              <h3 className="font-serif font-bold text-secondary mb-1">
                {markers.find(m => m.id === activeMarker)?.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-accent uppercase tracking-wider font-bold">
                <Navigation size={12} />
                {markers.find(m => m.id === activeMarker)?.type}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      
      {/* Premium Overlay UI */}
      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
            <MapPin size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Location</div>
            <div className="font-serif font-bold text-secondary text-sm">Hinjewadi IT Corridor</div>
          </div>
        </div>
      </div>
    </div>
  );
};
