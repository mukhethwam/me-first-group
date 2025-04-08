
import React, { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // First navigate to home if not already there
    if (window.location.hash !== '#/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/5e0c66c3-0eee-4e98-8870-06dde2529bcb.png" 
                alt="Me First Group" 
                className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'} w-auto`}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-transport-gray hover:text-transport-orange font-medium transition-colors">
              Home
            </Link>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-transport-gray hover:text-transport-orange font-medium transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('fleet')} 
              className="text-transport-gray hover:text-transport-orange font-medium transition-colors"
            >
              Our Fleet
            </button>
            <Link 
              to="/footprint" 
              className="text-transport-gray hover:text-transport-orange font-medium transition-colors flex items-center"
            >
              <MapPin size={16} className="mr-1" />
              Footprint
            </Link>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-transport-gray hover:text-transport-orange font-medium transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('director')} 
              className="text-transport-gray hover:text-transport-orange font-medium transition-colors"
            >
              Our Director
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-transport-orange text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors flex items-center"
            >
              <Phone size={16} className="mr-2" />
              Contact Us
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-transport-gray p-2 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 px-4 py-6 bg-white border-t animate-fade-in">
              <Link 
                to="/" 
                className="text-transport-gray hover:text-transport-orange font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-transport-gray hover:text-transport-orange font-medium text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('fleet')} 
                className="text-transport-gray hover:text-transport-orange font-medium text-left"
              >
                Our Fleet
              </button>
              <Link 
                to="/footprint" 
                className="text-transport-gray hover:text-transport-orange font-medium text-left flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin size={16} className="mr-1" />
                Footprint
              </Link>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-transport-gray hover:text-transport-orange font-medium text-left"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('director')} 
                className="text-transport-gray hover:text-transport-orange font-medium text-left"
              >
                Our Director
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="bg-transport-orange text-white px-4 py-2 rounded text-center flex items-center justify-center"
              >
                <Phone size={16} className="mr-2" />
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
