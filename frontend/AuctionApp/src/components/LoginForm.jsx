import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ successMessage, switchToRegister, closeModal }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); 

        try {
            const response = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user_id);
                localStorage.setItem("userRole", data.user_role);
                console.log("Saving:", data.first_name);

                localStorage.setItem("firstname", data.first_name);
                console.log("First Name:", data.first_name);
                setTimeout(() => {
                    setLoading(false);
                    if (closeModal) closeModal(); 
                    navigate("/");
                    window.location.reload();
                }, 500);
            } else {
                setError("Incorrect email or password. Please try again."); // Error message for invalid credentials
                setLoading(false);
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="p-6">
            {successMessage && (
                <p className="bg-green-500 text-white text-center p-2 mb-4 rounded-md">
                    {successMessage}
                </p>
            )}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                    type="text"
                    placeholder="Enter username"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-primary text-white p-3 rounded-xl font-medium hover:bg-blue-600 transition duration-300 flex justify-center items-center"
                disabled={loading}
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-2 border-2 border-t-white border-gray-200 rounded-full" viewBox="0 0 24 24"></svg>
                ) : (
                    "Login"
                )}
            </button>
            {error && <p className="text-red-500 text-center mt-3">{error}</p>} 
            
            <div className="mt-4 text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <button
                    onClick={switchToRegister}
                    className="text-blue-500 font-semibold hover:underline"
                >
                    Register
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
