import React from 'react'
import heroImg from '../assets/heroImg2.jpg'


const Hero = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap px-6 md:px-10 lg:px-20 mt-5'>

            {/* -------------- Left Side ----------------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw]'>
                <p className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight lg:leading-tight md:leading-tight'>Your <span className='text-primary'>Gateway</span> For <br />Extraordinary Auctions.</p>
                <p>Discover exclusive deals, rare finds, and unique treasures. Join the excitement and start bidding today!</p>
                <a href='#auctions' className="bg-transparent hover:bg-primary text-primary font-semibold hover:text-white py-2 px-4 border border-primary hover:border-transparent rounded-lg">Explore Now</a>
            </div>

            {/* -------------- Left Side ----------------- */}
            <div className='md:w-1/2'>
                <img className='w-full bottom-0 h-auto rounded-xl' src={heroImg}/>
                
            </div>

        </div>
    )
}

export default Hero