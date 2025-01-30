import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Auction from './pages/Auction';
import About from './pages/About';
import Product from './pages/Product';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';


function App() {
  return (
    <div>
      <Navbar />
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auctions' element={<Auction />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/admin' element={<AdminDashboard />} />
        </Routes>
        <Footer />
      
     
    </div>

  );
}

export default App;
