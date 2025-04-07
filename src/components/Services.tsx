
import React from "react";
import { Truck, Package, Mountain, Clock } from "lucide-react";

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
      description: "Specialized transport of manganese, chrome, coal, and other mining materials with our advanced fleet."
    },
    {
      icon: <Truck size={40} />,
      title: "Bulk Material Haulage",
      description: "Efficient bulk transport solutions with 34-ton side tipper trucks for maximum payload capacity."
    },
    {
      icon: <Package size={40} />,
      title: "Custom Logistics Solutions",
      description: "Tailored logistics planning to meet your specific mining transport requirements and timelines."
    },
    {
      icon: <Clock size={40} />,
      title: "Time-Sensitive Deliveries",
      description: "Reliable and punctual transport services to keep your operations running smoothly."
    }
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Transport Services</h2>
          <p className="text-lg text-transport-gray max-w-3xl mx-auto">
            Me First Group provides specialized transport solutions for the mining industry, 
            ensuring your commodities reach their destination safely and efficiently.
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
      </div>
    </section>
  );
};

export default Services;
