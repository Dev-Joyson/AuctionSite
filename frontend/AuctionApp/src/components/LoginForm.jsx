import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ successMessage, switchToRegister, closeModal }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Function to fetch user details after login
    const fetchUserDetails = async (userId, token) => {
        if (!token) {
            console.error("No authentication token found!");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`,  // ✅ Use 'Token' (not 'Bearer')
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const userData = await response.json();

                // ✅ Store user details in localStorage
                localStorage.setItem("firstname", userData.first_name);
                localStorage.setItem("lastname", userData.last_name);
                localStorage.setItem("email", userData.email);

                console.log("User Details Stored in localStorage:");
                console.log("First Name:", localStorage.getItem("firstname"));
                console.log("Last Name:", localStorage.getItem("lastname"));
                console.log("Email:", localStorage.getItem("email"));
            } else {
                console.error("Failed to fetch user details:", await response.text());
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };





    // Function to handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); // ✅ Start loading animation

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // ✅ Store login token and user info
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user_id);
                localStorage.setItem("userRole", data.user_role);

                console.log("User ID:", data.user_id);
                console.log("User Role:", localStorage.getItem("userRole"));

                // ✅ Wait for user details before reloading
                await fetchUserDetails(data.user_id, data.token);

                setLoading(false); // ✅ Stop loading animation
                if (closeModal) closeModal(); // ✅ Close login modal if it's open

                navigate("/");
                window.location.reload(); // ✅ Refresh the page after everything is set
            } else {
                setError(data.error || "Invalid email or password");
                setLoading(false); // ✅ Stop loading on error
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
            setLoading(false); // ✅ Ensure loading stops on error
        }
    };



    return (
        <form onSubmit={handleLogin} className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            {successMessage && (
                <p className="bg-green-500 text-white text-center p-2 mb-4 rounded-md">
                    {successMessage}
                </p>
            )}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-xl font-medium hover:bg-blue-700 transition duration-300 flex justify-center items-center"
                disabled={loading} // ✅ Disable button while loading
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
