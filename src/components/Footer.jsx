import { Link } from "react-router-dom";
import React from 'react';

const Footer = () => {

  const mainLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-red-500">BUNAI</span>
              <span className="ml-2 text-xs bg-red-600 text-white px-2 py-1 rounded-full uppercase tracking-wider">Tribal</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering tribal artisans by connecting their authentic, handcrafted creations with a global audience.
            </p>
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-400">Your trusted tribal marketplace</span>
              <span className="text-xs text-gray-500">Handcrafted with ❤️ in India</span>
            </div>
          </div>
          {/* Main Links */}
          <div>
            <h3 className="text-white font-medium mb-4 text-lg relative pb-2">
              Explore
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-red-500"></span>
            </h3>
            <ul className="space-y-3">
              {mainLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Legal Links */}
          <div>
            <h3 className="text-white font-medium mb-4 text-lg relative pb-2">
              Legal
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-red-500"></span>
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center group"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright & Credits */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Bunai Tribal Marketplace. All rights reserved.
          </p>
          <p className="text-center text-gray-500 text-xs">
            Designed & built by the Bunai Team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
