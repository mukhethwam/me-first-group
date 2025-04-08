
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { ExternalLink } from "lucide-react";

const containerStyle = {
  width: '100%',
  height: '400px'
};

// Coordinates for 6 Marlu Road, Selcourt, Springs, 1559, South Africa
const center = {
  lat: -26.185869,
  lng: 28.449944
};

const LocationMap = () => {
  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined';
  
  // Look for API key in window object (set in index.html for production)
  const apiKey = isBrowser ? 
    (window as any).GOOGLE_MAPS_API_KEY || 
    "" : "";
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Fallback display when Google Maps isn't loaded
  const fallbackDisplay = (
    <div className="rounded-lg overflow-hidden shadow-lg bg-gray-100 h-[400px] flex flex-col items-center justify-center p-4">
      <p className="text-lg text-transport-gray mb-4">Google Maps not available</p>
      <div className="text-center">
        <p className="font-semibold mb-2">Me First Group</p>
        <p>6 Marlu Road, Selcourt</p>
        <p>Springs, 1559, South Africa</p>
        <a 
          href="https://maps.google.com/?q=-26.185869,28.449944" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center bg-transport-blue text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          <span>View on Google Maps</span>
          <ExternalLink size={16} className="ml-2" />
        </a>
      </div>
    </div>
  );

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Location</h2>
          <p className="text-lg text-transport-gray max-w-3xl mx-auto">
            Find us at 6 Marlu Road, Selcourt, Springs, 1559, South Africa
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          {isLoaded && apiKey ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              <Marker position={center} title="Me First Group" />
            </GoogleMap>
          ) : fallbackDisplay}
        </div>
        {isLoaded && !apiKey && (
          <div className="text-center mt-4 p-4 bg-yellow-50 text-yellow-800 rounded">
            <p className="text-sm">
              Note for site administrator: Please add your Google Maps API key in the index.html file.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationMap;
