import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
// import ProductManager from './ItsMeDaddy/ProductManager.jsx';

function App() {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      <Footer />
      {/* <ProductManager /> */}
    </div>
  );
}

export default App;