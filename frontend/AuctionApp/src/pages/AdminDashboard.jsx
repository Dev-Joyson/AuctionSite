import { useState } from 'react';
import { FaUsers, FaGavel, FaChartPie } from 'react-icons/fa';
import DashboardOverview from '../components/DashboardOverview';
import UserManagement from '../components/UserManagement';
import ProductManagement from '../components/ProductManagement';
import AddProduct from '../components/AddProduct';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'products':
        return <ProductManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-semibold">Admin Dashboard</div>
        <div className="flex-1">
          <button className="p-4 flex items-center" onClick={() => setActiveTab('overview')}>
            <FaChartPie className="mr-2" /> Overview
          </button>
          <button className="p-4 flex items-center" onClick={() => setActiveTab('users')}>
            <FaUsers className="mr-2" /> Manage Users
          </button>
          <button className="p-4 flex items-center" onClick={() => setActiveTab('products')}>
            <FaGavel className="mr-2" /> Manage Products
          </button>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
