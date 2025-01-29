import React, { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal = ({ closeModal }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSwitchToLogin = () => {
    setIsRegister(false);
    setSuccessMessage("Registration successful! Please log in.");
  };

  const handleSwitchToRegister = () => {
    setIsRegister(true);
    setSuccessMessage(""); // Reset success message when switching
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-[450px]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>
        {isRegister ? (
          <RegisterForm switchToLogin={handleSwitchToLogin} />
        ) : (
          <LoginForm
            switchToRegister={handleSwitchToRegister}
            successMessage={successMessage}
            closeModal={closeModal} // Close modal after login
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;
