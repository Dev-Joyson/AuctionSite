import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; // Make sure you have axios installed

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    nic_number: "",
    username: "",
    address: "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the Django API for user registration
      const response = await axios.post("http://localhost:8000/api/register/", formData);
      console.log(response.data); // Handle success (like redirecting or showing a message)
    } catch (err) {
      setError("Failed to register. Please check your details and try again.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`flex items-center justify-between text-base py-4 sm:px-[5%] mb-5 bg-white sticky top-0 z-50 shadow-sm ${scrolled ? "bg-opacity-80 backdrop-blur-lg" : ""
          }`}
      >
        <h1 onClick={() => navigate("/")} className="cursor-pointer text-primary text-3xl font-bold">
          BestBid
        </h1>
        <ul className="hidden md:flex gap-5 items-center font-medium">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "text-gray-600")}>
            <li className="py-1">Home</li>
          </NavLink>
          <NavLink to="/auctions" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "text-gray-600")}>
            <li className="py-1">Auctions</li>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "text-gray-600")}>
            <li className="py-1">About</li>
          </NavLink>
          <li
            className="bg-primary text-white px-7 py-2 rounded-lg font-semibold hidden md:block cursor-pointer"
            onClick={() => {
              setShowModal(true);
              setIsRegister(false); // Reset to login form when opening modal
            }}
          >
            Login
          </li>
        </ul>
      </div>

      {/* Login/Register Modal with Animation */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white p-5 rounded-lg shadow-lg w-[450px]"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-center">{isRegister ? "Register" : "Login"}</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {isRegister ? (
                // Register Form
                <form onSubmit={handleSubmit}>

                  <div className="mb-4">

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>

                      <input
                        type="text"
                        placeholder="Enter first name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      />
                    </div>
                    <div>

                      <input
                        type="text"
                        placeholder="Enter last name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      />
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-4">

                    <input
                      type="username"
                      placeholder="Enter username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                    <input
                      type="nic"
                      placeholder="Enter NIC"
                      name="nic_number"
                      value={formData.nic_number}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />


                  </div>

                  <input
                    type="address"
                    placeholder="Enter address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  />


                  <input
                    type="password"
                    placeholder="Enter password"

                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  />


                  <button
                    type="submit"
                    className="w-full bg-primary text-white p-3 rounded-xl font-medium hover:bg-blue-600 transition duration-300"
                  >
                    Register
                  </button>
                  <div className="mt-4 text-center">
                    <span className="text-gray-600">Already have an account? </span>
                    <button
                      onClick={() => setIsRegister(false)}
                      className="text-blue-500 font-semibold hover:underline"
                    >
                      Login
                    </button>
                  </div>
                </form>
              ) : (
                // Login Form
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      placeholder="Enter username"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white p-3 rounded-xl font-medium hover:bg-blue-600 transition duration-300"
                  >
                    Login
                  </button>
                  <div className="mt-4 text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <button
                      onClick={() => setIsRegister(true)}
                      className="text-blue-500 font-semibold hover:underline"
                    >
                      Register
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
