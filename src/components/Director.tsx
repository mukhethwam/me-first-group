
import React from "react";
import { User, Briefcase, Handshake, UserRound, ExternalLink, Award, GraduationCap, Building, Clock, MapPin, TrendingUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Director = () => {
  return (
    <section id="director" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Meet Our Director</h2>
          
          <div className="flex flex-col lg:flex-row items-start justify-center gap-12 mt-8">
            {/* Director Image and Basic Info */}
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="relative mb-6">
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
              
              <div className="text-center bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-transport-blue mb-2">Mr. M.E Masevhe</h3>
                <p className="text-transport-orange font-semibold mb-2">Founder & Executive Director</p>
                <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span>Johannesburg, South Africa</span>
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Clock size={16} className="mr-1" />
                  <span>15+ Years in Transport Industry</span>
                </div>
              </div>
            </div>

            {/* Comprehensive Information */}
            <div className="w-full lg:w-2/3 space-y-8">
              
              {/* Professional Overview */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-transport-blue mb-4 flex items-center">
                  <User className="mr-2" size={24} />
                  Professional Overview
                </h4>
                <p className="text-lg mb-4 leading-relaxed">
                  Mr. M.E Masevhe is a visionary leader and entrepreneur who founded Me First Group with a clear mission to 
                  revolutionize the transport industry in South Africa. With over 15 years of hands-on experience in logistics 
                  and transportation, he has built the company from the ground up into a trusted partner for mining, 
                  construction, and agricultural sectors.
                </p>
                <p className="text-lg leading-relaxed">
                  His deep understanding of the South African transport landscape, combined with his commitment to innovation 
                  and safety, has positioned Me First Group as a leader in specialized transport solutions across multiple industries.
                </p>
              </div>

              {/* Education & Qualifications */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-transport-blue mb-4 flex items-center">
                  <GraduationCap className="mr-2" size={24} />
                  Education & Qualifications
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-transport-orange rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-semibold">Transport & Logistics Management Certification</p>
                      <p className="text-gray-600 text-sm">University of Johannesburg - 2009</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-transport-orange rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-semibold">Heavy Vehicle Operations License</p>
                      <p className="text-gray-600 text-sm">Department of Transport - Current</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-transport-orange rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-semibold">Business Management Diploma</p>
                      <p className="text-gray-600 text-sm">Damelin Business School - 2008</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-transport-orange rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="font-semibold">Mining Safety & Compliance Certification</p>
                      <p className="text-gray-600 text-sm">Mine Health & Safety Council - 2010</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Journey & Experience */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-transport-blue mb-4 flex items-center">
                  <Building className="mr-2" size={24} />
                  Career Journey & Experience
                </h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-transport-orange pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-bold text-lg">Founder & Executive Director</h5>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">2015 - Present</span>
                    </div>
                    <p className="text-transport-orange font-semibold mb-2">Me First Group</p>
                    <p className="text-gray-700">
                      Founded Me First Group with a vision to provide reliable, safe, and efficient transport solutions. 
                      Grew the company from a single vehicle operation to a comprehensive fleet serving major mining companies, 
                      construction firms, and agricultural businesses across South Africa.
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-300 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-bold">Senior Fleet Manager</h5>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">2012 - 2015</span>
                    </div>
                    <p className="text-gray-600 font-semibold mb-2">Anglo American Platinum</p>
                    <p className="text-gray-700">
                      Managed a fleet of 50+ vehicles serving mining operations. Implemented safety protocols and 
                      efficiency improvements that reduced operational costs by 25% while maintaining zero safety incidents.
                    </p>
                  </div>

                  <div className="border-l-4 border-gray-300 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-bold">Transport Operations Supervisor</h5>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">2009 - 2012</span>
                    </div>
                    <p className="text-gray-600 font-semibold mb-2">Imperial Logistics</p>
                    <p className="text-gray-700">
                      Supervised daily transport operations for mining and construction clients. Developed route optimization 
                      strategies and driver training programs that improved delivery efficiency by 30%.
                    </p>
                  </div>
                </div>
              </div>

              {/* Leadership Philosophy */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-transport-blue mb-4">Leadership Philosophy & Core Values</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
                    <div className="text-transport-blue mb-2">
                      <Briefcase size={32} />
                    </div>
                    <h5 className="font-semibold mb-2 text-center">Transport Excellence</h5>
                    <p className="text-center text-sm text-gray-700">
                      "Every delivery is a promise kept. We maintain the highest standards in safety, reliability, and efficiency."
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
                    <div className="text-transport-blue mb-2">
                      <Handshake size={32} />
                    </div>
                    <h5 className="font-semibold mb-2 text-center">Customer Partnership</h5>
                    <p className="text-center text-sm text-gray-700">
                      "Our clients' success is our success. We build long-term partnerships based on trust and exceptional service."
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
                    <div className="text-transport-blue mb-2">
                      <UserRound size={32} />
                    </div>
                    <h5 className="font-semibold mb-2 text-center">Team Empowerment</h5>
                    <p className="text-center text-sm text-gray-700">
                      "Our people are our greatest asset. Fair treatment, continuous training, and growth opportunities drive our success."
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements & Recognition */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-transport-blue mb-4 flex items-center">
                  <Award className="mr-2" size={24} />
                  Key Achievements & Industry Recognition
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="text-transport-orange mt-1" size={20} />
                    <div>
                      <p className="font-semibold">300% Business Growth</p>
                      <p className="text-sm text-gray-600">Achieved consistent year-over-year growth since company founding</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="text-transport-orange mt-1" size={20} />
                    <div>
                      <p className="font-semibold">Zero Safety Incidents</p>
                      <p className="text-sm text-gray-600">Maintained perfect safety record across all operations for 5+ years</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Building className="text-transport-orange mt-1" size={20} />
                    <div>
                      <p className="font-semibold">50+ Client Partnerships</p>
                      <p className="text-sm text-gray-600">Built trusted relationships with major industry players</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <UserRound className="text-transport-orange mt-1" size={20} />
                    <div>
                      <p className="font-semibold">100+ Jobs Created</p>
                      <p className="text-sm text-gray-600">Contributed to community development through employment opportunities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industry Expertise */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-bold text-transport-blue mb-4">Industry Expertise & Specializations</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-transport-blue text-white px-3 py-1 rounded-full text-sm">Mining Transport</span>
                  <span className="bg-transport-blue text-white px-3 py-1 rounded-full text-sm">Heavy Haulage</span>
                  <span className="bg-transport-blue text-white px-3 py-1 rounded-full text-sm">Fleet Management</span>
                  <span className="bg-transport-blue text-white px-3 py-1 rounded-full text-sm">Safety Compliance</span>
                  <span className="bg-transport-blue text-white px-3 py-1 rounded-full text-sm">Route Optimization</span>
                  <span className="bg-transport-blue text-white px-3 py-1 rounded-full text-sm">Agricultural Logistics</span>
                  <span className="bg-transport-blue text-white px-3 py-1 rounded-full text-sm">Construction Materials</span>
                  <span className="bg-transport-blue text-white px-3 py-1 rounded-full text-sm">Supply Chain Management</span>
                </div>
              </div>

              {/* Vision Statement */}
              <div className="bg-gradient-to-r from-transport-blue to-transport-orange text-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-bold mb-4">Director's Vision for the Future</h4>
                <p className="text-lg leading-relaxed italic">
                  "I envision Me First Group as the benchmark for transport excellence in Africa. Through continuous innovation, 
                  strategic partnerships, and unwavering commitment to our values, we will expand our reach while maintaining 
                  the personal touch and reliability that defines us. Our goal is not just to move cargo, but to move industries forward."
                </p>
                <div className="mt-4 text-right">
                  <p className="text-sm opacity-90">- Mr. M.E Masevhe, Founder & Executive Director</p>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="text-center">
                <a 
                  href="#contact" 
                  className="inline-flex items-center bg-transport-orange text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-medium shadow-lg"
                >
                  Connect with our Director <ExternalLink className="ml-2" size={18} />
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
