import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PieController, ArcElement } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, PieController, ArcElement);

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    total_products: 0,
    active_auctions: 0,
    finished_auctions: 0,
    product_categories: [],
    product_category_counts: [],
    admin_count: 0,
    user_count: 0,
  });

  useEffect(() => {
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

  const barData = {
    labels: stats.product_categories,
    datasets: [
      {
        label: "Total Products by Category",
        data: stats.product_category_counts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // const pieData = {
  //   labels: ["Admin", "Users"],
  //   datasets: [
  //     {
  //       data: [stats.admin_count, stats.user_count],
  //       backgroundColor: ["#36A2EB", "#FF6384"],
  //       hoverBackgroundColor: ["#36A2EB", "#FF6384"],
  //     },
  //   ],
  // };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-700">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-4xl font-bold mt-2">{stats.total_users}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold">Total Products</h3>
          <p className="text-4xl font-bold mt-2">{stats.total_products}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold">Active Auctions</h3>
          <p className="text-4xl font-bold mt-2">{stats.active_auctions}</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold">Finished Auctions</h3>
          <p className="text-4xl font-bold mt-2">{stats.finished_auctions}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Products by Category</h3>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">User Roles Distribution</h3>
          <Pie data={pieData} />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardOverview;
