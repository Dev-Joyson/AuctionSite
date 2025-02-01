import React from "react";
import { FaRegHandshake, FaUsers, FaAward, FaLightbulb } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="py-10 mt-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-medium text-center">About Us</h1>
        <p className="text-center text-sm text-gray-600 max-w-lg">
          We’re committed to providing the best experience for our customers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center bg-gray-50 p-6 shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
            <FaRegHandshake className="text-blue-600 text-5xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Trusted Partners</h3>
            <p className="text-sm text-gray-600 mt-2 text-center">
              We’ve built strong partnerships with top companies to deliver the
              best quality service.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-6 shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
            <FaUsers className="text-green-600 text-5xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Community Focused</h3>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Bringing people together and fostering a supportive community is at
              the heart of what we do.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-6 shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
            <FaAward className="text-yellow-600 text-5xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Award Winning</h3>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Recognized for our commitment to excellence and innovation in the
              industry.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-6 shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
            <FaLightbulb className="text-purple-600 text-5xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">Innovative Solutions</h3>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Constantly exploring new ideas and technologies to stay ahead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
