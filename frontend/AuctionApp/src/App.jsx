import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auction from './pages/Auction';
import About from './pages/About';
import Product from './pages/Product';
import ProductManager from './ItsMeDaddy/ProductManager.jsx';
import Register from './ItsMeDaddy/Register.jsx';
import Login from './ItsMeDaddy/Login.jsx';
import Authentication from './ItsMeDaddy/Authendication.jsx';

function App() {
  

  return (
    <Authentication/>
  );
}

export default App;
