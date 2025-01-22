import React, { useState } from 'react';
import Login from './Login.jsx';

const Authentication = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  // Handle login to set user role
  const handleLogin = (role) => {
    setUserRole(role);
  };

  // Handle logout functionality
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        alert("Logout successful");
        setUserRole(null);
      } else {
        alert("Failed to logout. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Render for Admin
  if (userRole === "Admin") {
    return (
      <div>
        <h1>Welcome Admin</h1>
        <button
          onClick={handleLogout}
          style={logoutButtonStyle}
        >
          Logout
        </button>
      </div>
    );
  }

  // Render for User
  if (userRole === "User") {
    return (
      <div>
        <h1>Welcome User</h1>
        <button
          onClick={handleLogout}
          style={logoutButtonStyle}
        >
          Logout
        </button>
      </div>
    );
  }

  // Render Login if no user role
  return <Login onLogin={handleLogin} />;
};

// Styling for the logout button
const logoutButtonStyle = {
  padding: "10px 15px",
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "20px",
};

export default Authentication;
