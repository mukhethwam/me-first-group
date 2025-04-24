
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, CheckCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PremiumFleet = () => {
  const fleetFeatures = [
    "34-ton side tipper capacity",
    "Modern, well-maintained vehicles",
    "GPS tracking and fleet management",
    "Experienced drivers",
    "Regular maintenance schedule",
    "Safety compliance certified"
  ];

  const fleetImages = [
    {
      src: "/lovable-uploads/8a8be9f2-4251-4d4f-b750-185a58c1a8c4.png",
      alt: "Scania truck with yellow side tipper trailers"
    },
    {
      src: "/lovable-uploads/6b48b9ca-bd91-402a-bf6c-26413a7b352b.png",
      alt: "Scania R460 truck front view"
    },
    {
      src: "/lovable-uploads/1bfdabae-d742-41b9-800e-e4283a78d3d3.png",
      alt: "Scania truck with yellow side tipper trailers - side view"
    },
    {
      src: "/lovable-uploads/8e13c4aa-2284-46e7-b2b2-c082e90e76d3.png",
      alt: "Scania truck front angle view"
    },
    {
      src: "/lovable-uploads/bd74459c-115b-47bf-a4a7-971bb0062c85.png",
      alt: "Scania truck with license plate DM60RV GP"
    },
    {
      src: "/lovable-uploads/34e441d6-ef82-4a45-ae53-8f78580a000a.png",
      alt: "Scania truck on the highway with side tipper"
    },
    {
      src: "/lovable-uploads/7400796f-9949-4aa9-9bd2-26704ff3877f.png",
      alt: "Scania truck with red side tipper trailer"
    },
    {
      src: "/lovable-uploads/2b8f60f4-f018-43a3-87af-503038b14d75.png",
      alt: "Scania truck in sandy area"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-transport-blue text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <Truck size={32} />
              <h1 className="text-4xl md:text-5xl font-bold animate-fade-in">Our Premium Fleet</h1>
            </div>
            <p className="text-xl opacity-90 max-w-3xl animate-fade-in">
              Me First Group operates a specialized fleet of 34-ton side tipper trucks designed for the challenges of mining commodity transport.
            </p>
          </div>
        </div>

        {/* Fleet Details Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-transport-blue mb-6">Fleet Specifications</h2>
                <p className="text-lg mb-6 text-transport-gray">
                  Our vehicles are regularly maintained to ensure maximum reliability and efficiency
                  for all your transport needs. Each truck in our fleet represents our commitment to quality and performance.
                </p>
                
                <div className="space-y-3 mb-8">
                  {fleetFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="text-transport-orange mr-2 flex-shrink-0 mt-1" size={20} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src={fleetImages[0].src}
                    alt={fleetImages[0].alt}
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

        {/* Fleet Gallery Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-transport-blue mb-8 text-center">Fleet Gallery</h2>
            <p className="text-lg text-transport-gray text-center max-w-3xl mx-auto mb-12">
              Explore our modern fleet of Scania trucks equipped with side tippers, purpose-built for mining commodity transportation across South Africa and neighboring countries.
            </p>
            
            <div className="px-4 md:px-12">
              <Carousel className="w-full">
                <CarouselContent>
                  {fleetImages.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2">
                        <div className="rounded-lg overflow-hidden shadow-lg aspect-w-16 aspect-h-12 bg-white">
                          <img 
                            src={image.src} 
                            alt={image.alt}
                            className="object-cover w-full h-full" 
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 md:-left-4" />
                <CarouselNext className="absolute right-0 md:-right-4" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Fleet Advantages Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-transport-blue mb-8 text-center">Fleet Advantages</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-transport-orange mb-3">Reliability</h3>
                <p className="text-transport-gray">Our vehicles undergo regular maintenance and inspections to ensure consistent performance and minimal downtime.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-transport-orange mb-3">Capacity</h3>
                <p className="text-transport-gray">With 34-ton side tipper capacity, our fleet efficiently handles large volumes of mining commodities in a single trip.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-transport-orange mb-3">Technology</h3>
                <p className="text-transport-gray">Advanced GPS tracking and fleet management systems provide real-time updates and optimize delivery schedules.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-transport-orange mb-3">Experience</h3>
                <p className="text-transport-gray">Our professional drivers have extensive experience navigating challenging routes and handling specialized equipment.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-transport-orange mb-3">Compliance</h3>
                <p className="text-transport-gray">All vehicles meet strict safety and environmental regulations, ensuring responsible and compliant operations.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-transport-orange mb-3">Coverage</h3>
                <p className="text-transport-gray">Our fleet operates throughout South Africa and extends to neighboring countries, offering comprehensive regional coverage.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PremiumFleet;
