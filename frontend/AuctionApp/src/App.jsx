import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Auction from './pages/Auction';
import About from './pages/About';
import Product from './pages/Product';
import ProductManager from './ItsMeDaddy/ProductManager.jsx';
import Register from './ItsMeDaddy/Register.jsx';

function App() {
  return (
<<<<<<< HEAD
    <div>
    <Navbar />
    <div className='mx-4 sm:mx-[5%]'>
      
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/auctions' element={<Auction />} />
          <Route path='/about' element={<About />} />
          <Route path='/product/:id' element={<Product />} />
        </Routes>
      <Footer />
    </div>
    </div>
=======
    // <div className='mx-4 sm:mx-[5%]'>
    //   <Navbar />
    //     <Routes>
    //       <Route path='/' element={<Home />}/>
    //       <Route path='/auctions' element={<Auction />} />
    //       <Route path='/about' element={<About />} />
    //       <Route path='/product/:id' element={<Product />} />
    //     </Routes>
    //   <Footer />
    // </div>

    // <ProductManager/>
    <Register/>
>>>>>>> 826ec3fd24bdbb3d18c12e1a02bc6c9c5e279af8
  );
}

export default App;