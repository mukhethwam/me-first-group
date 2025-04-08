
import React from "react";
import { Target, Eye } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission Section */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <div className="flex items-center mb-6">
              <div className="bg-transport-blue bg-opacity-10 p-4 rounded-full mr-4 text-transport-blue">
                <Target size={32} />
              </div>
              <h2 className="text-2xl font-bold text-transport-blue">Our Mission</h2>
            </div>
            <p className="text-transport-gray leading-relaxed mb-6">
              To provide exceptional transport and logistics services to the mining industry, 
              ensuring safe, reliable, and efficient delivery of mining commodities while 
              maintaining the highest standards of customer service and operational excellence.
            </p>
            <p className="text-transport-gray leading-relaxed">
              We are committed to supporting the growth of the mining sector by offering 
              specialized transport solutions that meet the unique challenges of moving valuable 
              mining commodities across Southern Africa.
            </p>
          </div>

          {/* Vision Section */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <div className="flex items-center mb-6">
              <div className="bg-transport-blue bg-opacity-10 p-4 rounded-full mr-4 text-transport-blue">
                <Eye size={32} />
              </div>
              <h2 className="text-2xl font-bold text-transport-blue">Our Vision</h2>
            </div>
            <p className="text-transport-gray leading-relaxed mb-6">
              To be the leading transport partner for the mining industry in Southern Africa, 
              recognized for our reliability, safety record, and commitment to excellence in 
              all aspects of our operations.
            </p>
            <p className="text-transport-gray leading-relaxed">
              We envision expanding our footprint across the region while maintaining our core 
              values of integrity, professionalism, and customer focus, becoming the first choice 
              for mining companies who need dependable transport solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
