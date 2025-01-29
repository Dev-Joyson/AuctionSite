import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ switchToLogin }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register/", formData);
      switchToLogin();
    } catch (err) {
      setError("Failed to register. Please check your details and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                  
                  <div className=" grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Enter first name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
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
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="username"
                      placeholder="Enter username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <input
                      type="nic"
                      placeholder="Enter NIC"
                      name="nic_number"
                      value={formData.nic_number}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
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
  );
};

export default RegisterForm;
