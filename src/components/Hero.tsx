
import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-transport-blue text-white">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2175&q=80')" 
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Heavy Duty Transport for Mining Industries
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Specialized 34-ton side tipper trucks for efficient transport of manganese, chrome, coal, and other mining commodities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#services" 
              className="bg-transport-orange text-white px-6 py-3 rounded-md font-medium text-lg inline-flex items-center justify-center hover:bg-opacity-90 transition-colors"
            >
              Our Services
              <ArrowRight className="ml-2" size={20} />
            </a>
            <a 
              href="#contact" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium text-lg inline-flex items-center justify-center hover:bg-white hover:text-transport-blue transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
