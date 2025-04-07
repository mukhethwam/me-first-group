
import React from "react";
import { CheckCircle } from "lucide-react";

const Fleet = () => {
  const fleetFeatures = [
    "34-ton side tipper capacity",
    "Modern, well-maintained vehicles",
    "GPS tracking and fleet management",
    "Experienced drivers",
    "Regular maintenance schedule",
    "Safety compliance certified"
  ];

  return (
    <section id="fleet" className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">Our Premium Fleet</h2>
            <p className="text-lg mb-6 text-transport-gray">
              Me First Group operates a fleet of specialized 34-ton side tipper trucks designed 
              specifically for the challenges of mining commodity transport. Our vehicles are 
              regularly maintained to ensure maximum reliability and efficiency.
            </p>
            
            <div className="space-y-3 mb-8">
              {fleetFeatures.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="text-transport-orange mr-2 flex-shrink-0 mt-1" size={20} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <a 
              href="#contact" 
              className="bg-transport-blue text-white px-6 py-3 rounded-md font-medium inline-block hover:bg-opacity-90 transition-colors"
            >
              Schedule Our Fleet
            </a>
          </div>
          
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1506306405858-83e0a4a3d8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Me First Group Tipper Truck" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-transport-orange text-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="text-2xl font-bold">34-TON</p>
              <p>Side Tipper Capacity</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
