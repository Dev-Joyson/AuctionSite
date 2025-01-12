import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <div className='flex justify-between text-base py-3 border-b border-b-gray-300'>
      <h1 className='text-primary text-3xl font-bold'>BestBid</h1>
      
        <ul className='hidden md:flex gap-5 items-center font-medium'>
          <NavLink to='/'>
            <li className='py-1 text-gray-600'>Home</li>
          </NavLink>
          <NavLink to='auctions'>
            <li className='py-1 text-gray-600'>Auctions</li>
          </NavLink>
          <NavLink to='about'>
            <li className='py-1 text-gray-600'>About</li>
          </NavLink>
          <NavLink to='login'>
            <li className='bg-primary text-white px-7 py-2 rounded-lg font-semibold hidden md:block'>Login</li>
          </NavLink>
        </ul>
      
    </div>
  )
}

export default Navbar