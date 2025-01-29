import React from "react";

const LoginForm = ({ switchToRegister }) => {
  return (
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
        <button onClick={switchToRegister} className="text-blue-500 font-semibold hover:underline">
          Register
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
