import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Auction from './pages/Auction';
import About from './pages/About';
import Product from './pages/Product';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';

function App() {
  // Directly getting the user role from localStorage
  const userRole = localStorage.getItem('userRole');

  // Log user role for debugging
  console.log("User Role:", userRole);

  return (
    <div>
      <Navbar />
      

      <Routes>
        {/* If user is an Admin, redirect from "/" to "/admin" */}
        <Route 
          path="/" 
          element={userRole === 'Admin' ? <Navigate to="/admin" replace /> : <Home />} 
        />
        
        <Route path='/auctions' element={<Auction />} />
        <Route path='/about' element={<About />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/profile/:id' element={<UserProfile />} />
        <Route path='/contact' element={<Contact />} />
        
        {/* Ensure only Admin users can access the Admin Dashboard */}
        <Route 
          path='/admin' 
          element={userRole === 'Admin' ? <AdminDashboard /> : <Navigate to="/" replace />} 
        />
      </Routes>


      <Footer />
    </div>
  );
}

export default App;
