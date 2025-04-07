
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
      image: "https://images.unsplash.com/photo-1560691023-ca1f295a5173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      description: "Essential in steel production and batteries, requiring specialized transport due to its density and weight."
    },
    {
      name: "Chrome",
      image: "https://images.unsplash.com/photo-1578500351529-69eacb578dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      description: "Used in stainless steel and metal plating, chrome requires careful handling during transport."
    },
    {
      name: "Coal",
      image: "https://images.unsplash.com/photo-1581271137595-20701447fa98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
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
