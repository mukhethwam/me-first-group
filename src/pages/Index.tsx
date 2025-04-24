
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import MiningCommodities from "@/components/MiningCommodities";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Debug logs to verify component mounting and behavior
    console.log("[DEBUG] Index page mounted");
    console.log("[DEBUG] Current URL:", window.location.href);
    console.log("[DEBUG] Current pathname:", window.location.pathname);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Return cleanup function
    return () => {
      console.log("[DEBUG] Index page unmounted");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Fleet />
      <MiningCommodities />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
