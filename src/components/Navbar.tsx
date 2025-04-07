
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/30ff2778-31e9-4cd9-9b9b-35a85416a46c.png" 
                alt="Me First Group Logo" 
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold text-[#ea384c]">Me First Group</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-transport-gray hover:text-transport-orange font-medium transition-colors">
              Home
            </Link>
            <a href="#services" className="text-transport-gray hover:text-transport-orange font-medium transition-colors">
              Services
            </a>
            <a href="#fleet" className="text-transport-gray hover:text-transport-orange font-medium transition-colors">
              Our Fleet
            </a>
            <a href="#about" className="text-transport-gray hover:text-transport-orange font-medium transition-colors">
              About Us
            </a>
            <a href="#contact" className="bg-transport-orange text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-transport-gray p-2 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 px-4 py-6 bg-white border-t">
              <Link 
                to="/" 
                className="text-transport-gray hover:text-transport-orange font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <a 
                href="#services" 
                className="text-transport-gray hover:text-transport-orange font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#fleet" 
                className="text-transport-gray hover:text-transport-orange font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Fleet
              </a>
              <a 
                href="#about" 
                className="text-transport-gray hover:text-transport-orange font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a 
                href="#contact" 
                className="bg-transport-orange text-white px-4 py-2 rounded text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
