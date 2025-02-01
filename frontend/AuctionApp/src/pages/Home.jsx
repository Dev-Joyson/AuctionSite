import React from 'react'
import Hero from '../components/Hero'
import TopAuctions from '../components/TopAuctions'
import AboutUs from '../components/AboutUs'

const Home = () => {
  return (
    <div>
      <div className='mx-4 sm:mx-[5%]'>
      <Hero />
      <AboutUs />
      <TopAuctions />
      </div>
    </div>
  )
}

export default Home