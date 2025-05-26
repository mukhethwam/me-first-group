
import React from "react";
import { ArrowRight, PhoneForwarded } from "lucide-react";

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
      
      <div className="container mx-auto px-4 py-28 md:py-36 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Professional Transport Solutions for All Industries
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Specialized transport services for mining commodities, cement, groceries, fertilizers, fresh produce, and various industrial goods with our modern fleet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#services" 
              className="bg-transport-orange text-white px-6 py-3 rounded-md font-medium text-lg inline-flex items-center justify-center hover:bg-opacity-90 transition-colors transform hover:scale-105 duration-300"
            >
              Our Services
              <ArrowRight className="ml-2" size={20} />
            </a>
            <a 
              href="#contact" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium text-lg inline-flex items-center justify-center hover:bg-white hover:text-transport-blue transition-colors transform hover:scale-105 duration-300"
            >
              Request a Quote
              <PhoneForwarded className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-transport-blue to-transparent"></div>
    </div>
  );
};

export default Hero;
