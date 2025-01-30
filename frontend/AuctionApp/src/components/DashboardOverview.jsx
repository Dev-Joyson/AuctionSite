import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PieController, ArcElement } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, PieController, ArcElement);

const DashboardOverview = () => {

  // Data for Bar chart (Auction stats)
  const barData = {
    labels: ['Commodities', 'Electronics', 'Apparels', 'Vehicles', 'Property', 'Art', 'Others'],
    datasets: [
      {
        label: 'Total Products by Category',
        data: [10, 15, 8, 12, 6, 4, 9], // Example values
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
    labels: ['Admin', 'Users'],
    datasets: [
      {
        data: [2, 98], // Example values (2 admins and 98 users)
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
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
          <p className="text-3xl font-semibold text-gray-800">100</p> {/* Example value */}
        </div>

        {/* Total Products Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Total Products</h3>
          <p className="text-3xl font-semibold text-gray-800">64</p> {/* Example value */}
        </div>

        {/* Active Auctions Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Active Auctions</h3>
          <p className="text-3xl font-semibold text-gray-800">12</p> {/* Example value */}
        </div>

        {/* Finished Auctions Card */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Finished Auctions</h3>
          <p className="text-3xl font-semibold text-gray-800">32</p> {/* Example value */}
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
