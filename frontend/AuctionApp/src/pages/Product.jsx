import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [remainingTime, setRemainingTime] = useState(''); // State to hold remaining time
  const [bidAmount, setBidAmount] = useState(''); // State to handle bid input
  const [recentBids, setRecentBids] = useState([]); // Store recent 5 bids

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  // ✅ NEW useEffect to fetch recent bids when auction_id becomes available
  useEffect(() => {
    if (product && product.auction_id) {
      fetchRecentBids(product.auction_id);
    }
  }, [product]); // ✅ Watches for `product` changes

  // Fetch product details & bid history
  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}/`);
      const data = await response.json();
      console.log("Product Data:", data);
      setProduct(data);

      if (data.end_time) {
        const interval = setInterval(() => {
          updateRemainingTime(data.end_time);
        }, 1000);
        return () => clearInterval(interval);
      }

    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Fetch last 5 bids
  const fetchRecentBids = async (auctionId) => {
    try {
      if (!auctionId) return;
      const response = await fetch(`http://localhost:8000/api/auctions/${auctionId}/bids/`);
      if (!response.ok) throw new Error("Failed to fetch bids");

      const data = await response.json();
      setRecentBids(data.slice(0, 5)); // Take only last 5 bids

    } catch (error) {
      console.error("Error fetching bids:", error);
      toast.error("⚠️ Could not fetch bid history.");
    }
  };

  // Update countdown timer
  const updateRemainingTime = (endTime) => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const timeLeft = end - now;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); // ✅ Add seconds

      setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`); // ✅ Update UI with seconds
    } else {
      setRemainingTime('Auction ended');
    }
  };


  // Handle bid input
  const handleBidInput = (event) => {
    setBidAmount(event.target.value);
  };

  // Place a bid
  const handlePlaceBid = async () => {
    if (!product || !product.auction_id) {
      console.error('Auction ID not found');
      return;
    }

    if (!bidAmount || bidAmount <= 0) {
      toast.warning("⚠️ Please enter a valid bid amount.");
      return;
    }

    const authToken = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!authToken) {
      toast.error("🔒 Please log in to place a bid.");
      return;
    }

    const bidData = {
      user: parseInt(userId),
      product: product.id,
      auction: product.auction_id,
      bid_amount: parseFloat(bidAmount),
    };

    try {
      const response = await fetch(`http://localhost:8000/api/auctions/${product.auction_id}/bids/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authToken}`,
        },
        body: JSON.stringify(bidData),
      });

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      toast.success("🎉 Bid placed successfully!");
      setBidAmount("");
      fetchRecentBids(product.auction_id); // Refresh bid history

    } catch (error) {
      console.error("Error placing bid:", error);
      toast.error("❌ Failed to place bid. Please try again.");
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-10 p-5">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-col sm:flex-row gap-10 justify-center">
        {/* Product Image */}
        <div className="w-full sm:w-1/2 p-4 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full h-auto rounded-xl shadow-lg"
            style={{ maxHeight: "500px" }}
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
              <p className="text-gray-500 capitalize mb-4">Category: {product.category}</p>
              <p className="text-green-600 text-xl font-semibold mb-4">Starting Price: €{product.starting_price}</p>
            </div>

            {/* Bidding Options */}
            <input
              type="number"
              placeholder="Enter your bid"
              value={bidAmount}
              onChange={handleBidInput}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handlePlaceBid}
              className="bg-blue-600 w-full text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Place Your Bid
            </button>

            {/* Recent Bids Section */}
            <div className="w-full mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">📜 Top Bids</h3>
              {recentBids.length === 0 ? (
                <p className="text-gray-500">No bids yet. Be the first!</p>
              ) : (
                <ul className="space-y-2">
                  {recentBids.map((bid, index) => (
                    <li key={index} className="text-gray-800 text-md">
                      <strong>{index + 1}. {bid.username}</strong>: €{bid.bid_amount} at {new Date(bid.bid_time).toLocaleString()}
                    </li>
                  ))}
                </ul>
              )}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
