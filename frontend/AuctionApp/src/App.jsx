import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Auction from './pages/Auction';
import About from './pages/About';
// import ProductManager from './ItsMeDaddy/ProductManager.jsx';

function App() {
  return (
    <div className='mx-4 sm:mx-[5%]'>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/auctions' element={<Auction />} />
          <Route path='/about' element={<About />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;