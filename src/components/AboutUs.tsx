
import React from "react";
import { Award, Target, Users } from "lucide-react";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="bg-transport-blue bg-opacity-10 p-4 rounded-full mb-4 text-transport-blue">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-transport-gray">{description}</p>
    </div>
  );
};

const AboutUs = () => {
  const values = [
    {
      icon: <Award size={32} />,
      title: "Quality Service",
      description: "We maintain the highest standards in transport services, ensuring safe and efficient delivery every time."
    },
    {
      icon: <Target size={32} />,
      title: "Reliability",
      description: "Our commitment to timeliness and dependability has made us a trusted partner across multiple industries."
    },
    {
      icon: <Users size={32} />,
      title: "Expert Team",
      description: "Our experienced drivers and logistics professionals ensure smooth operations from pickup to delivery."
    }
  ];

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-lg text-transport-gray max-w-3xl mx-auto mb-6">
            Me First Group is a leading transport company specializing in comprehensive logistics solutions 
            across multiple industries. We've built our reputation on reliability, safety, and efficiency in 
            the transport of mining commodities, construction materials, agricultural products, and consumer goods.
          </p>
          <p className="text-lg text-transport-gray max-w-3xl mx-auto">
            With our diverse fleet of Tautliner Superlink, Side Tipper, and Flatbed trailers, combined with 
            our experienced team, we provide tailored transport solutions to meet the unique needs of every industry we serve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
