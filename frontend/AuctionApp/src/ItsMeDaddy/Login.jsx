import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    try {
      console.log("Sending login request with:", { email, password }); // Log request data
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.user_role);
        onLogin(data.user_role);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "8px" }}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "8px" }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default Login;
