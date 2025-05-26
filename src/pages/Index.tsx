
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import GallerySlideshow from "@/components/GallerySlideshow";
import MiningCommodities from "@/components/MiningCommodities";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Services />
      <GallerySlideshow />
      <Fleet />
      <MiningCommodities />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
