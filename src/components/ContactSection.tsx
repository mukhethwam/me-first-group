import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Contact Us</h2>
          <p className="text-lg text-transport-gray max-w-3xl mx-auto">
            Reach out to our team for inquiries about our transport services or to request a quote for your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="section-subtitle">Get In Touch</h3>
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-transport-blue bg-opacity-10 p-3 rounded-full mr-4 text-transport-blue">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Location</h4>
                  <p className="text-transport-gray">6 Marlu Road, Selcourt, Springs, 1559, South Africa</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-transport-blue bg-opacity-10 p-3 rounded-full mr-4 text-transport-blue">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-transport-gray">078 171 7615 / 072 018 8078</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-transport-blue bg-opacity-10 p-3 rounded-full mr-4 text-transport-blue">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-transport-gray">mefirstgp@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-transport-blue bg-opacity-10 p-3 rounded-full mr-4 text-transport-blue">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Operating Hours</h4>
                  <p className="text-transport-gray">Monday - Friday: 7:00 AM - 6:00 PM</p>
                  <p className="text-transport-gray">Saturday: 8:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="section-subtitle">Send Us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-transport-gray mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-transport-blue focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-transport-gray mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-transport-blue focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-transport-gray mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-transport-blue focus:border-transparent"
                  placeholder="Subject"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-transport-gray mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-transport-blue focus:border-transparent"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="bg-transport-orange text-white px-6 py-3 rounded-md font-medium w-full md:w-auto hover:bg-opacity-90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
