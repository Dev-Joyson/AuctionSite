import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [recentBids, setRecentBids] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}/`);
      const data = await response.json();
      setProduct(data);

      if (data.end_time) {
        const interval = setInterval(() => {
          const timeLeft = updateRemainingTime(data.end_time);
          if (timeLeft <= 0) {
            clearInterval(interval);
            fetchRecentBids(data.auction_id); // Fetch bids again after countdown ends
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const fetchRecentBids = async (auctionId) => {
    try {
      if (!auctionId) return;
      const response = await fetch(`http://localhost:8000/api/auctions/${auctionId}/bids/`);
      if (!response.ok) throw new Error("Failed to fetch bids");

      const data = await response.json();
      setRecentBids(data.slice(0, 5));

      const topBid = data.reduce(
        (highest, bid) => (parseFloat(bid.bid_amount) > parseFloat(highest.bid_amount) ? bid : highest),
        { bid_amount: 0 }
      );
      if (topBid.username) {
        setWinner(topBid.username);
      }
    } catch (error) {
      console.error("Error fetching bids:", error);
      toast.error("⚠️ Could not fetch bid history.");
    }
  };

  useEffect(() => {
    if (product && product.auction_id) {
      fetchRecentBids(product.auction_id);
    }
  }, [product]);

  const updateRemainingTime = (endTime) => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const timeLeft = end - now;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    } else {
      setRemainingTime('Auction ended');
    }
    return timeLeft;
  };

  const handleBidInput = (event) => {
    setBidAmount(event.target.value);
  };

  const handlePlaceBid = async () => {
    if (!product || !product.auction_id) {
      console.error('Auction ID not found');
      return;
    }

    const startingPrice = parseFloat(product.starting_price);
    const highestBid = recentBids.length > 0 ? Math.max(...recentBids.map(bid => parseFloat(bid.bid_amount))) : 0;

    if (!bidAmount || bidAmount <= 0) {
      toast.warning("⚠️ Please enter a valid bid amount.");
      return;
    }

    if (parseFloat(bidAmount) < Math.max(startingPrice, highestBid)) {
      toast.warning("Your bid must be higher than the starting price and the current highest bid.");
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
      fetchRecentBids(product.auction_id);
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
        <div className="w-full sm:w-1/2 p-4 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full h-auto rounded-xl shadow-lg"
            style={{ maxHeight: "500px" }}
          />
        </div>

        <div className="p-4 border-2 border-gray-300 rounded-xl shadow-lg w-1/3">
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full p-4 text-center bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-lg font text-red-500 uppercase tracking-wide">⏳ Time Remaining:</h2>
              <p className="text-xl font-semibold text-gray-800 mt-2">{remainingTime}</p>
              {remainingTime === "Auction ended" && winner && (
                <p className="text-lg font-semibold text-green-600 mt-2">
                  Winner: {winner}
                </p>
              )}
            </div>

            <div className="w-full p-4">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-gray-500 capitalize mb-4">Category: {product.category}</p>
              <p className="text-green-600 text-xl font-semibold mb-4">Starting Price: Rs {product.starting_price}</p>
            </div>

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

            <div className="w-full mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">📜 Top Bids</h3>
              {recentBids.length === 0 ? (
                <p className="text-gray-500">No bids yet. Be the first!</p>
              ) : (
                <ul className="space-y-2">
                  {recentBids.map((bid, index) => (
                    <li key={index} className="text-gray-800 text-md">
                      <strong>{index + 1}. {bid.username}</strong>: Rs {bid.bid_amount} at {new Date(bid.bid_time).toLocaleString()}
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
