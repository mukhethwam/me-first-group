
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import AboutUs from '../components/AboutUs';
import MissionVision from '../components/MissionVision';
import Footer from '../components/Footer';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-transport-blue relative inline-block pb-2">
            About Me First Group
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-transport-orange"></span>
          </h1>
        </div>
      </div>
      <AboutUs />
      <MissionVision />
      <Footer />
    </div>
  );
};

export default About;
