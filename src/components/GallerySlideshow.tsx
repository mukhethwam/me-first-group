
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GallerySlideshow = () => {
  const slides = [
    {
      image: "/lovable-uploads/c9754556-57c1-4716-94ea-70cca848029e.png",
      title: "Professional Transport Solutions",
      message: "Verbella General Trading - Your trusted partner for reliable transport across all industries"
    },
    {
      image: "/lovable-uploads/0d3cd3ad-6cdf-4a0d-b257-5b5e863d5bc8.png",
      title: "Modern Fleet Excellence",
      message: "State-of-the-art Scania trucks ensuring safe and efficient delivery of your valuable cargo"
    },
    {
      image: "/lovable-uploads/51982528-f0b4-4f1e-90e9-abeaf3c62146.png",
      title: "Heavy Duty Capabilities",
      message: "Specialized in bulk transport with advanced side tipper technology for maximum efficiency"
    },
    {
      image: "/lovable-uploads/1a3683f9-a3d1-4f37-bd29-417882be7ed8.png",
      title: "Efficient Loading Operations",
      message: "Professional loading and unloading services with modern equipment and skilled operators"
    },
    {
      image: "/lovable-uploads/ae653f48-2b40-4933-8f53-0331af79788f.png",
      title: "Secure Cargo Handling",
      message: "Temperature-controlled and secure transport for groceries, produce, and sensitive materials"
    },
    {
      image: "/lovable-uploads/ca13c38d-430b-4685-879c-eefdc31eb6fc.png",
      title: "Industrial Transport Solutions",
      message: "Comprehensive transport for fertilizers, cement, and construction materials nationwide"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Operations Gallery</h2>
          <p className="text-lg text-transport-gray max-w-3xl mx-auto">
            See our professional transport operations in action across different industries and cargo types.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Slideshow */}
          <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg shadow-xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-6 md:p-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-lg md:text-xl text-gray-200">{slide.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          >
            <ChevronLeft size={24} className="text-transport-blue" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          >
            <ChevronRight size={24} className="text-transport-blue" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? "bg-transport-orange" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h4 className="font-bold text-lg mb-2 text-transport-blue">Mining & Industrial</h4>
            <p className="text-transport-gray">Specialized transport for mining commodities, cement, and heavy industrial materials.</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h4 className="font-bold text-lg mb-2 text-transport-blue">Agricultural Products</h4>
            <p className="text-transport-gray">Safe transport of fertilizers, fresh produce, and agricultural inputs with proper handling.</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h4 className="font-bold text-lg mb-2 text-transport-blue">Consumer Goods</h4>
            <p className="text-transport-gray">Reliable distribution of groceries and consumer products with secure logistics solutions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySlideshow;
