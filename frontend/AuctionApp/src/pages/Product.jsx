import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [remainingTime, setRemainingTime] = useState(''); // State to hold remaining time
  const [bidAmount, setBidAmount] = useState(''); // State to handle bid input
  const userId = 1; // Replace this with actual user authentication logic

  useEffect(() => {
    // Fetch product details using the ID
    fetch(`http://localhost:8000/api/products/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Product Data:", data);
        setProduct(data);

        // Start the countdown timer if end_time is available
        if (data.end_time) {
          const interval = setInterval(() => {
            updateRemainingTime(data.end_time);
          }, 1000);

          // Cleanup the interval on component unmount
          return () => clearInterval(interval);
        }
      })
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  const updateRemainingTime = (endTime) => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const timeLeft = end - now;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      setRemainingTime(`${days}d ${hours}h ${minutes}m`);
    } else {
      setRemainingTime('Auction ended');
    }
  };

  const handleBidInput = (event) => {
    setBidAmount(event.target.value);
  };

  const handlePlaceBid = () => {

    if (!product || !product.auction_id) {
      console.error('Auction ID not found');
      return;
    }

    const bidData = {
      user_id: userId,
      amount: bidAmount,
    };

    fetch(`http://localhost:8000/api/auctions/${product.auction_id}/bids/`, {
      method: 'POST',
      headers: {
        
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bidData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Bid placed successfully:', data);
      })
      .catch((error) => console.error('Error placing bid:', error));
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="flex flex-col sm:flex-row gap-10 justify-center">
        {/* Product Image */}
        <div className="w-full sm:w-1/2 p-4 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Product Details & Bid Section */}
        <div className="p-4 border-2 border-gray-300 rounded-xl shadow-lg w-1/3">
          <div className="flex flex-col gap-4 w-full">
            {/* Auction Timer */}
            <div className="w-full p-4 text-center bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-lg font text-red-500 uppercase tracking-wide">⏳ Time Remaining:</h2>
              <p className="text-xl font-semibold text-gray-800 mt-2">{remainingTime}</p>
            </div>

            {/* Product Information */}
            <div className="w-full p-4">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-gray-500 capitalize mb-4">
                Category: {product.category}
              </p>
              <p className="text-green-600 text-xl font-semibold mb-4">
                Starting Price: €{product.starting_price}
              </p>
            </div>

            {/* Bidding Options */}
            <input
              type="number"
              placeholder="Enter your bid"
              value={bidAmount}
              onChange={handleBidInput}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {/* Place bid button */}
            <button
              onClick={handlePlaceBid}
              className="bg-blue-600 w-full text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Place Your Bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
