import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Left Section */}
        <p className="text-sm">&copy; {new Date().getFullYear()} BestBid. All Rights Reserved.</p>

        {/* Center Links */}
        <div className="flex space-x-4 text-sm mt-3 md:mt-0">
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
          <span>|</span>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>

        {/* Right Section - Social Media Icons */}
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="https://facebook.com" className="hover:text-gray-400">
            <i className="fab fa-facebook-f text-lg"></i>
          </a>
          <a href="https://twitter.com" className="hover:text-gray-400">
            <i className="fab fa-twitter text-lg"></i>
          </a>
          <a href="https://instagram.com" className="hover:text-gray-400">
            <i className="fab fa-instagram text-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
