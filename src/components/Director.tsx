
import React from "react";
import { User, Briefcase, Handshake, UserRound, ExternalLink } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Director = () => {
  return (
    <section id="director" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Director</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <Avatar className="h-64 w-64 border-4 border-transport-blue shadow-lg transition-transform hover:scale-105 duration-300">
                  <AvatarImage 
                    src="/lovable-uploads/44daee58-b83d-47b2-8e46-79cdb9b9ab5d.png" 
                    alt="Mr. M.E Masevhe" 
                    className="object-cover object-top h-full w-full"
                  />
                  <AvatarFallback className="text-4xl bg-transport-blue text-white">ME</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-3 -right-3 bg-transport-orange text-white p-2 rounded-full shadow-lg">
                  <div className="text-xs font-semibold">DIRECTOR</div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 mt-6 md:mt-0 text-left">
              <h3 className="text-2xl font-bold text-transport-blue mb-4">Mr. M.E Masevhe</h3>
              <p className="text-lg mb-4">
                As the Director of Me First Group, Mr. M.E Masevhe brings his unwavering passion for the transport industry 
                and commitment to excellence to every aspect of our operations.
              </p>
              <p className="text-lg mb-6">
                His leadership philosophy is built on three core principles:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-transport-blue mb-2">
                    <Briefcase size={32} />
                  </div>
                  <h4 className="font-semibold mb-2">Transport Excellence</h4>
                  <p className="text-center text-sm">Dedicated to maintaining the highest standards in the transport business</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-transport-blue mb-2">
                    <Handshake size={32} />
                  </div>
                  <h4 className="font-semibold mb-2">Customer Service</h4>
                  <p className="text-center text-sm">Passionate about exceeding client expectations through exceptional service</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-transport-blue mb-2">
                    <UserRound size={32} />
                  </div>
                  <h4 className="font-semibold mb-2">Employee Wellbeing</h4>
                  <p className="text-center text-sm">Committed to the fair treatment and professional growth of all team members</p>
                </div>
              </div>
              <p className="text-lg mt-6">
                Under Mr. Masevhe's guidance, Me First Group has established itself as a trusted partner in the mining industry, 
                known for reliable service, safety excellence, and professional integrity.
              </p>
              <div className="mt-6">
                <a 
                  href="#contact" 
                  className="inline-flex items-center text-transport-orange hover:text-transport-blue transition-colors font-medium"
                >
                  Contact our director <ExternalLink className="ml-1" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Director;
