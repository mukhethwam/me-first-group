
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Fleet from "@/components/Fleet";
import Footer from "@/components/Footer";

const PremiumFleet = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Debug logs to verify component mounting and behavior
    console.log("[DEBUG] PremiumFleet page mounted");
    console.log("[DEBUG] Current URL:", window.location.href);
    console.log("[DEBUG] Current pathname:", window.location.pathname);
    console.log("[DEBUG] Current hash:", window.location.hash);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Mark component as loaded
    setIsLoaded(true);
    
    // Return cleanup function
    return () => {
      console.log("[DEBUG] PremiumFleet page unmounted");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      {isLoaded && (
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
      )}
    </div>
  );
};

export default PremiumFleet;
