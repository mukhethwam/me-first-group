
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-transport-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Me First Group</h3>
            <p className="mb-4">
              Specialized transport solutions for mining commodities, delivering reliability and efficiency with our 34-ton side tipper fleet.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-transport-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-transport-orange transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-transport-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-transport-orange transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-transport-orange transition-colors">Home</Link>
              </li>
              <li>
                <a href="#services" className="hover:text-transport-orange transition-colors">Services</a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-transport-orange transition-colors">Our Fleet</a>
              </li>
              <li>
                <a href="#about" className="hover:text-transport-orange transition-colors">About Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-transport-orange transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-transport-orange transition-colors">Mining Commodity Transport</a>
              </li>
              <li>
                <a href="#services" className="hover:text-transport-orange transition-colors">Bulk Material Haulage</a>
              </li>
              <li>
                <a href="#services" className="hover:text-transport-orange transition-colors">Custom Logistics Solutions</a>
              </li>
              <li>
                <a href="#services" className="hover:text-transport-orange transition-colors">Time-Sensitive Deliveries</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
            <address className="not-italic">
              <p className="mb-2">123 Transport Avenue</p>
              <p className="mb-2">Mining District, South Africa</p>
              <p className="mb-2">Phone: +27 12 345 6789</p>
              <p>Email: info@mefirstgroup.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center md:flex md:justify-between md:text-left">
          <p>&copy; {new Date().getFullYear()} Me First Group. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="hover:text-transport-orange transition-colors mx-3 md:ml-6 md:mr-0">Privacy Policy</a>
            <a href="#" className="hover:text-transport-orange transition-colors mx-3 md:ml-6 md:mr-0">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
