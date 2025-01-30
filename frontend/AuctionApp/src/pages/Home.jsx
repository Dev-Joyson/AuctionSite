import React from 'react'
import Hero from '../components/Hero'
import TopAuctions from '../components/TopAuctions'

const Home = () => {
  return (
    <div>
      <div className='mx-4 sm:mx-[5%]'>
      <Hero />
      <TopAuctions />
      </div>
    </div>
  )
}

export default Home