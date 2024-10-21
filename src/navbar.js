// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className={`flex justify-between items-center p-4 bg-transparent`}>
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          src={darkMode ? '/images/image2.png' : '/images/image.png'}
          alt="Logo"
          className="h-12 w-auto"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/research-steps" className={`hover:text-blue-400 ${darkMode ? 'text-gray-300' : 'text-black'}`}>
          Research Steps
        </Link>
        <Link to="/researcher-tools" className={`hover:text-blue-400 ${darkMode ? 'text-gray-300' : 'text-black'}`}>
          Researcher Tools
        </Link>
        <Link to="/journal-services" className={`hover:text-blue-400 ${darkMode ? 'text-gray-300' : 'text-black'}`}>
          Journal Services
        </Link>

        {/* Toggle for dark/light mode */}
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              className="hidden"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <div
              className={`block w-14 h-8 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
            ></div>
            <div
              className={`absolute left-1 top-1 w-6 h-6 rounded-full shadow transition-transform duration-300 ${
                darkMode ? 'transform translate-x-6 bg-white' : 'bg-white'
              }`}
            ></div>
          </div>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
