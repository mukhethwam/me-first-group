
import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Fleet = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    console.log("[FLEET] Fleet component mounted");
    // Preload critical images
    const preloadImages = async () => {
      try {
        const imagePromises = fleetImages.slice(0, 3).map((image) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.src;
            img.onload = () => resolve(image.src);
            img.onerror = () => reject(new Error(`Failed to load image: ${image.src}`));
          });
        });
        
        await Promise.all(imagePromises);
        setImagesLoaded(true);
        console.log("[FLEET] Critical images preloaded");
      } catch (error) {
        console.error("[FLEET] Error preloading images:", error);
        // Still set as loaded to allow rendering with fallbacks
        setImagesLoaded(true);
      }
    };
    
    preloadImages();
    
    return () => {
      console.log("[FLEET] Fleet component unmounted");
    };
  }, []);

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

  // Create plugin - moved outside of useMemo for simpler rendering
  const plugin = Autoplay({ delay: 4000, stopOnInteraction: false });
  
  // Image error handler
  const handleImageError = (e) => {
    console.error(`[FLEET] Image failed to load: ${e.target.src}`);
    e.target.src = "/placeholder.svg"; // Fallback to placeholder
    e.target.onerror = null; // Prevent infinite error loops
  };

  if (!imagesLoaded) {
    return (
      <section id="fleet" className="section-padding">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-transport-blue mx-auto"></div>
            <p className="mt-4 text-transport-gray">Loading fleet information...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="fleet" className="section-padding">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Premium Fleet</h2>
          <p className="text-lg max-w-3xl mx-auto text-transport-gray">
            Me First Group operates a fleet of specialized 34-ton side tipper trucks designed 
            specifically for the challenges of mining commodity transport.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Fleet Specifications</h3>
            <p className="text-lg mb-6 text-transport-gray">
              Our vehicles are regularly maintained to ensure maximum reliability and efficiency
              for your transport needs.
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
                src={fleetImages[0].src}
                alt={fleetImages[0].alt}
                className="object-cover w-full h-full"
                loading="eager"
                onError={handleImageError}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-transport-orange text-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="text-2xl font-bold">34-TON</p>
              <p>Side Tipper Capacity</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Explore Our Fleet</h3>
          <div className="px-4 md:px-12">
            <Carousel plugins={[plugin]} className="w-full">
              <CarouselContent>
                {fleetImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <div className="rounded-lg overflow-hidden shadow-lg aspect-w-16 aspect-h-12 bg-white">
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="object-cover w-full h-full" 
                          loading={index < 2 ? "eager" : "lazy"}
                          onError={handleImageError}
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
      </div>
    </section>
  );
};

export default Fleet;
