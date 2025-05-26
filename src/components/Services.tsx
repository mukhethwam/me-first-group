
import React from "react";
import { Truck, Package, Mountain, Clock, Building2, ShoppingCart, Wheat, Apple } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-transport-orange">
      <div className="text-transport-orange mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-transport-blue">{title}</h3>
      <p className="text-transport-gray">{description}</p>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Mountain size={40} />,
      title: "Mining Commodity Transport",
      description: "Specialized transport of manganese, chrome, coal, and other mining materials with our advanced fleet of side tipper trucks."
    },
    {
      icon: <Building2 size={40} />,
      title: "Cement & Construction Materials",
      description: "Reliable transport solutions for cement, aggregates, and construction materials to support building projects across the region."
    },
    {
      icon: <ShoppingCart size={40} />,
      title: "Grocery & Consumer Goods",
      description: "Efficient distribution of groceries and consumer products with temperature-controlled and secure transport options."
    },
    {
      icon: <Wheat size={40} />,
      title: "Agricultural Fertilizers",
      description: "Safe and compliant transport of fertilizers and agricultural inputs to support farming operations nationwide."
    },
    {
      icon: <Apple size={40} />,
      title: "Fresh Produce Transport",
      description: "Temperature-controlled transport for fruits, vegetables, and perishable goods maintaining freshness from farm to market."
    },
    {
      icon: <Package size={40} />,
      title: "General Freight & Cargo",
      description: "Comprehensive transport solutions for various industrial goods, machinery, and general cargo with flexible scheduling."
    },
    {
      icon: <Truck size={40} />,
      title: "Bulk Material Haulage",
      description: "Efficient bulk transport solutions with side tipper trucks for maximum payload capacity and quick unloading."
    },
    {
      icon: <Clock size={40} />,
      title: "Time-Sensitive Deliveries",
      description: "Reliable and punctual transport services with GPS tracking to keep your operations running smoothly."
    }
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Comprehensive Transport Services</h2>
          <p className="text-lg text-transport-gray max-w-4xl mx-auto">
            Verbella General Trading provides specialized transport solutions across multiple industries, 
            from mining commodities to fresh produce, ensuring your goods reach their destination safely, 
            efficiently, and on time with our modern fleet and experienced team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-transport-blue text-center">Why Choose Verbella General Trading?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-2">Diverse Fleet Capability</h4>
              <p className="text-transport-gray">Our versatile fleet handles everything from bulk materials to temperature-sensitive goods.</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-2">Industry Expertise</h4>
              <p className="text-transport-gray">Years of experience across multiple sectors with specialized handling requirements.</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-2">Nationwide Coverage</h4>
              <p className="text-transport-gray">Comprehensive transport network covering urban centers and remote locations.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
