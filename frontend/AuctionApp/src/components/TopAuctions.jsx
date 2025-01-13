import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const TopAuctions = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 8)))
      .catch((error) => console.error('Error fetching products:', error))
  }, [])

  return (
    <div className="flex flex-col my-20 gap-2 text-gray-900" id='auctions'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className="text-3xl font-medium text-center">Featured Auctions</h1>
        <p className='sm:w-1/3 text-sm text-center mb-8'>Discover an Exciting Range of Premium Auction Listings, Exclusive Deals for Every Enthusiast and Collector!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:translate-y-[-5px] transition-all duration-500 flex flex-col justify-between mb-8"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-2 flex flex-col flex-grow">
              <h2 className="text-lg font-medium mb-2">{product.name}</h2>
              <p className="text-sm text-gray-600 flex-grow">
                {product.description.length > 50
                  ? `${product.description.substring(0, 50)}...`
                  : product.description}
              </p>
              <p className="text-sm text-gray-500 capitalize mt-1">
                Category: {product.category}
              </p>
              <p className="text-sm font-semibold text-green-600 mt-2">
                ${product.starting_price}
              </p>
            </div>
            <div className="p-1 flex justify-end">
              <button onClick={() => navigate(`/product/${product.id}`)} className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                Bid Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-row justify-end'>
        <button onClick={()=>navigate('/auctions')} className='bg-blue-100 px-7 py-2 rounded-lg text-sm'>More</button>
      </div>
    </div>

  )
}

export default TopAuctions