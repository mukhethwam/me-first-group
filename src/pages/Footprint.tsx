
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe, MapPin } from "lucide-react";

const Footprint = () => {
  // South African provinces
  const saProvinces = [
    "Gauteng",
    "Limpopo",
    "North West",
    "Northern Cape",
    "Mpumalanga",
    "Western Cape",
    "Eastern Cape",
    "KwaZulu-Natal",
    "Free State"
  ];

  // Cross-border countries
  const crossBorderCountries = [
    "Botswana",
    "Mozambique",
    "Zimbabwe"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-transport-blue text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Our Operational Footprint</h1>
            <p className="text-xl opacity-90 max-w-3xl animate-fade-in">
              Discover the extensive reach of Me First Group's operations across South Africa and neighboring countries.
            </p>
          </div>
        </div>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-transport-blue mb-4">Areas of Operation</h2>
              <p className="text-transport-gray max-w-3xl mx-auto">
                Our extensive network allows us to provide reliable transportation services across multiple regions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Map Image */}
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <div className="aspect-w-4 aspect-h-3 bg-gray-200">
                  <img 
                    src="/lovable-uploads/74ca0feb-afab-43d9-9ff1-a16e8d2e6d24.png" 
                    alt="South Africa Map with Operational Areas" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-transport-orange p-2 text-white">
                      <MapPin size={20} />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-md shadow-md text-sm">
                  <span className="font-bold text-transport-blue">Me First Group</span>
                </div>
              </div>

              {/* Right: Locations List */}
              <div>
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Globe className="text-transport-blue mr-2" size={24} />
                    <h3 className="text-2xl font-bold text-transport-blue">South African Provinces</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {saProvinces.map((province, index) => (
                      <div key={index} className="flex items-center">
                        <MapPin size={18} className="text-transport-orange mr-2" />
                        <span>{province}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <Globe className="text-transport-blue mr-2" size={24} />
                    <h3 className="text-2xl font-bold text-transport-blue">Cross-Border Operations</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {crossBorderCountries.map((country, index) => (
                      <div key={index} className="flex items-center">
                        <MapPin size={18} className="text-transport-orange mr-2" />
                        <span>{country}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Description */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-transport-blue bg-opacity-5 p-8 rounded-lg border border-transport-blue border-opacity-20">
              <h2 className="text-3xl font-bold text-transport-blue mb-6">Our Operations</h2>
              <p className="text-transport-gray mb-4">
                Me First Group has established a robust presence throughout South Africa, with comprehensive coverage across all nine provinces. Our strategic positioning allows us to effectively serve diverse industries, from mining and agriculture to manufacturing and retail.
              </p>
              <p className="text-transport-gray mb-4">
                Beyond South Africa's borders, we've extended our operations to neighboring countries including Botswana, Mozambique, and Zimbabwe. This cross-border capability enables seamless logistics solutions for clients with regional transportation needs.
              </p>
              <p className="text-transport-gray">
                Our extensive network is supported by strategically located depots, maintenance facilities, and support teams, ensuring reliable and efficient service delivery across our entire operational footprint. Whether you require transportation within South Africa or across borders, Me First Group delivers excellence at every destination.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Footprint;
