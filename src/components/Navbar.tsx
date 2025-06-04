
import React, { useState, useEffect, useCallback } from "react";
import { Menu, X, Phone, MapPin, Truck, Users } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Throttle scroll events to prevent vibration
  const throttleScroll = useCallback(() => {
    let ticking = false;
    
    const updateScrollState = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
      ticking = false;
    };

    return () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = throttleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [throttleScroll]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-200 ease-out ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4">
        <div className={`flex justify-between items-center transition-all duration-200 ease-out ${isScrolled ? 'py-2' : 'py-4'}`}>
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/5e0c66c3-0eee-4e98-8870-06dde2529bcb.png" 
                alt="Me First Group" 
                className={`transition-all duration-200 ease-out ${isScrolled ? 'h-10' : 'h-12'} w-auto`}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-transport-gray hover:text-transport-orange font-medium transition-colors duration-200">
              Home
            </Link>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-transport-gray hover:text-transport-orange font-medium transition-colors duration-200"
            >
              Services
            </button>
            <Link 
              to="/fleet" 
              className="text-transport-gray hover:text-transport-orange font-medium transition-colors duration-200 flex items-center"
              onClick={() => window.scrollTo(0, 0)}
            >
              <Truck size={16} className="mr-1" />
              Our Fleet
            </Link>
            <Link 
              to="/footprint" 
              className="text-transport-gray hover:text-transport-orange font-medium transition-colors duration-200 flex items-center"
              onClick={() => window.scrollTo(0, 0)}
            >
              <MapPin size={16} className="mr-1" />
              Footprint
            </Link>
            <Link 
              to="/about" 
              className="text-transport-gray hover:text-transport-orange font-medium transition-colors duration-200"
              onClick={() => window.scrollTo(0, 0)}
            >
              About Us
            </Link>
            <Link 
              to="/director" 
              className="text-transport-gray hover:text-transport-orange font-medium transition-colors duration-200 flex items-center"
              onClick={() => window.scrollTo(0, 0)}
            >
              <Users size={16} className="mr-1" />
              Our Team
            </Link>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-transport-orange text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-200 flex items-center"
            >
              <Phone size={16} className="mr-2" />
              Contact Us
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-transport-gray p-2 focus:outline-none transition-colors duration-200"
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
                className="text-transport-gray hover:text-transport-orange font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-transport-gray hover:text-transport-orange font-medium text-left transition-colors duration-200"
              >
                Services
              </button>
              <Link 
                to="/fleet" 
                className="text-transport-gray hover:text-transport-orange font-medium text-left flex items-center transition-colors duration-200"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                <Truck size={16} className="mr-1" />
                Our Fleet
              </Link>
              <Link 
                to="/footprint" 
                className="text-transport-gray hover:text-transport-orange font-medium text-left flex items-center transition-colors duration-200"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                <MapPin size={16} className="mr-1" />
                Footprint
              </Link>
              <Link 
                to="/about" 
                className="text-transport-gray hover:text-transport-orange font-medium text-left transition-colors duration-200"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                About Us
              </Link>
              <Link 
                to="/director" 
                className="text-transport-gray hover:text-transport-orange font-medium text-left flex items-center transition-colors duration-200"
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                <Users size={16} className="mr-1" />
                Our Team
              </Link>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="bg-transport-orange text-white px-4 py-2 rounded text-center flex items-center justify-center transition-all duration-200"
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
