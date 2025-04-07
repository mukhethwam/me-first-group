
import React from "react";

interface CommodityCardProps {
  name: string;
  image: string;
  description: string;
}

const CommodityCard = ({ name, image, description }: CommodityCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-transport-blue">{name}</h3>
        <p className="text-transport-gray">{description}</p>
      </div>
    </div>
  );
};

const MiningCommodities = () => {
  const commodities = [
    {
      name: "Manganese",
      image: "/lovable-uploads/14958783-fe80-43b1-b0d6-7dac2a26f2f8.png",
      description: "Essential in steel production and batteries, requiring specialized transport due to its density and weight."
    },
    {
      name: "Chrome",
      image: "/lovable-uploads/a568f39e-bf53-460c-a1bc-a71db58516ef.png",
      description: "Used in stainless steel and metal plating, chrome requires careful handling during transport."
    },
    {
      name: "Coal",
      image: "/lovable-uploads/798fefeb-1943-40bb-9e5f-3b9130a3f02a.png",
      description: "A primary energy source requiring efficient bulk transportation solutions for power generation."
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Mining Commodities We Transport</h2>
          <p className="text-lg text-transport-gray max-w-3xl mx-auto">
            Me First Group specializes in the safe and efficient transport of various mining commodities, 
            including but not limited to the following materials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {commodities.map((commodity, index) => (
            <CommodityCard
              key={index}
              name={commodity.name}
              image={commodity.image}
              description={commodity.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiningCommodities;
