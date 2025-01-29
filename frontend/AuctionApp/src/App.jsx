import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Auction from './pages/Auction';
import About from './pages/About';
import Product from './pages/Product';
import Login from './ItsMeDaddy/Login';


function App() {
  return (

    <Login/>
    // <div>
    //   <Navbar />
    //   <div className='mx-4 sm:mx-[5%]'>
    //     <Routes>
    //       <Route path='/' element={<Home />} />
    //       <Route path='/auctions' element={<Auction />} />
    //       <Route path='/about' element={<About />} />
    //       <Route path='/product/:id' element={<Product />} />
    //     </Routes>
    //     <Footer />
    //   </div>
     
    // </div>

  );
}

export default App;
