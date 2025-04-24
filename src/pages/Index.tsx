
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import MiningCommodities from "@/components/MiningCommodities";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Debug logs to verify component mounting and behavior
    console.log("[DEBUG] Index page mounted");
    console.log("[DEBUG] Current URL:", window.location.href);
    console.log("[DEBUG] Current pathname:", window.location.pathname);
    console.log("[DEBUG] Current hash:", window.location.hash);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    try {
      // Mark component as loaded
      setIsLoaded(true);
    } catch (error) {
      console.error("[INDEX] Error during component initialization:", error);
      setLoadError(true);
    }
    
    // Return cleanup function
    return () => {
      console.log("[DEBUG] Index page unmounted");
    };
  }, []);

  // Show error state
  if (loadError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Unable to load page</h2>
        <p className="mb-4">There was an error loading the page content.</p>
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
          <Hero />
          <Services />
          <Fleet />
          <MiningCommodities />
          <ContactSection />
          <Footer />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-transport-blue mx-auto"></div>
            <p className="mt-4 text-transport-gray">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
