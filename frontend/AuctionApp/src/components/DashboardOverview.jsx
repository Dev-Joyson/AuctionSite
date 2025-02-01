import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PieController, ArcElement } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, PieController, ArcElement);

const DashboardOverview = () => {
  // State for fetched data
  const [stats, setStats] = useState({
    total_users: 0,
    total_products: 0,
    active_auctions: 0,
    finished_auctions: 0,
    product_categories: [],
    product_category_counts: []
  });

  useEffect(() => {
    // Fetch dashboard stats from the backend
    const fetchDashboardStats = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/api/dashboard/", {
          headers: {
            "Authorization": `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  // Data for Bar chart (Product Category stats from backend)
  const barData = {
    labels: stats.product_categories,
    datasets: [
      {
        label: "Total Products by Category",
        data: stats.product_category_counts, // Use the fetched counts
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for Bar chart
  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Data for Pie chart (Users distribution)
  const pieData = {
    labels: ["Admin", "Users"],
    datasets: [
      {
        data: [2, stats.total_users - 2], // Example values, adjust as needed
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Total Users Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Total Users</h3>
          <p className="text-3xl font-semibold text-gray-800">{stats.total_users}</p>
        </div>

        {/* Total Products Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Total Products</h3>
          <p className="text-3xl font-semibold text-gray-800">{stats.total_products}</p>
        </div>

        {/* Active Auctions Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Active Auctions</h3>
          <p className="text-3xl font-semibold text-gray-800">{stats.active_auctions}</p>
        </div>

        {/* Finished Auctions Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Finished Auctions</h3>
          <p className="text-3xl font-semibold text-gray-800">{stats.finished_auctions}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart for Product Categories */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Products by Category</h3>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Pie Chart for User Roles */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">User Roles Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
