
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
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transport-blue">
            About Me First Group
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
