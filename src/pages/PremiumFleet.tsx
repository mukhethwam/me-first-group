
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";

const PremiumFleet = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Debug logs to verify component mounting and behavior
    console.log("[DEBUG] PremiumFleet page mounted");
    console.log("[DEBUG] Current URL:", window.location.href);
    console.log("[DEBUG] Current pathname:", window.location.pathname);
    console.log("[DEBUG] Current hash:", window.location.hash);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    try {
      // Mark component as loaded with a small delay
      // This helps ensure proper rendering in Chrome
      setTimeout(() => {
        setIsLoaded(true);
        console.log("[DEBUG] PremiumFleet marked as loaded");
      }, 20);
    } catch (error) {
      console.error("[PREMIUM-FLEET] Error during component initialization:", error);
      setLoadError(true);
    }
    
    // Return cleanup function
    return () => {
      console.log("[DEBUG] PremiumFleet page unmounted");
    };
  }, []);

  // This secondary effect ensures visibility in Chrome
  useEffect(() => {
    if (isLoaded) {
      console.log("[DEBUG] PremiumFleet components now rendering");
      
      // Force layout recalculation in Chrome
      document.body.clientHeight;
    }
  }, [isLoaded]);

  // Show error state
  if (loadError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Unable to load page</h2>
        <p className="mb-4">There was an error loading the fleet page content.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-transport-blue text-white rounded hover:bg-opacity-90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      {isLoaded ? (
        <>
          <div className="pt-16">
            <div className="bg-gray-100 py-12">
              <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-6">Our Premium Fleet</h1>
                <p className="text-lg text-center max-w-3xl mx-auto text-transport-gray">
                  Explore our specialized fleet of 34-ton side tipper trucks designed specifically for mining commodity transport.
                </p>
              </div>
            </div>
          </div>
          <Fleet />
          <Footer />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-transport-blue mx-auto"></div>
            <p className="mt-4 text-transport-gray">Loading fleet information...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumFleet;
