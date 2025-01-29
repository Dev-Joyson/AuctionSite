import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Auction from './pages/Auction';
import About from './pages/About';
import Product from './pages/Product';
import Login from './ItsMeDaddy/Login';

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setUserRole(role);
    if (role === "Admin") {
      navigate("/admin-dashboard"); // Redirect Admin to dashboard
    } else {
      navigate("/"); // Redirect User to Home
    }
  };

  return (
    <div>
      <Navbar />
      <div className='mx-4 sm:mx-[5%]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auctions' element={<Auction />} />
          <Route path='/about' element={<About />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
