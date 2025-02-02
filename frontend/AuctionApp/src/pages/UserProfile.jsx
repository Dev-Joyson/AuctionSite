import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const { id } = useParams(); // User ID from the URL
  const [user, setUser] = useState(null);
  const [bids, setBids] = useState([]); // Store user's recent bids
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Manage edit mode
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      fetchUserProfile(id);
    } else {
      toast.error("User ID is missing from the URL.");
    }
  }, [id]);

  const fetchUserProfile = async (userId) => {
    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        toast.error("🔒 Please log in.");
        return;
      }

      // Fetch user data by ID
      const userResponse = await fetch(`http://localhost:8000/api/users/${userId}/`, {
        headers: { Authorization: `Token ${authToken}` },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await userResponse.json();
      setUser(userData);
      setUserDetails({
        username: userData.username,
        email: userData.email,
        address: userData.address || "",
      });

      // Fetch user's recent bids
      const bidsResponse = await fetch(`http://localhost:8000/api/users/${userId}/bids/`, {
        headers: { Authorization: `Token ${authToken}` },
      });

      if (!bidsResponse.ok) {
        throw new Error("Failed to fetch user's bids");
      }

      const bidsData = await bidsResponse.json();
      setBids(bidsData);
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("⚠️ Could not load user profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/users/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("⚠️ Could not update profile.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p className="text-center text-gray-500">User not found.</p>;

  return (
    <div className="container mx-auto mt-10 p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-col sm:flex-row">
        {/* Profile Section */}
        <div className="w-full sm:w-1/3 text-center p-4 border-r">
          <img
            src={user.profile_image || "https://media.istockphoto.com/vectors/profile-icon-male-avatar-portrait-casual-person-vector-id530829125?k=6&m=530829125&s=612x612&w=0&h=Z76VH4c_W2aJ6UdUnjuCtLssjlFVNwNEns5VVNpH1Mg="}
            alt="Profile"
            className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 shadow-md"
          />
          <h2 className="text-2xl font-semibold mt-4">{user.username}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-400">{user.address || "No address provided"}</p>

          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            onClick={handleEditClick}
          >
            ✏️ {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* User Details & Recent Bids */}
        <div className="w-full sm:w-2/3 p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📜 Recent Bidding Activity</h3>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={userDetails.username}
                    onChange={handleChange}
                    className="w-full p-2 mt-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                    className="w-full p-2 mt-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={userDetails.address}
                    onChange={handleChange}
                    className="w-full p-2 mt-2 border rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <ul className="space-y-3">
              {bids.map((bid, index) => (
                <li key={index} className="flex justify-between p-3 bg-gray-100 rounded-lg shadow">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">Bid ID: {bid.product}</span>
                    <span className="font-medium text-gray-800">Product Name: {bid.product_name}</span>
                    <span className="text-blue-600 font-semibold">€{bid.bid_amount}</span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(bid.bid_time).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
