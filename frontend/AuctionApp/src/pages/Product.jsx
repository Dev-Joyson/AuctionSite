// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const Product = () => {
//   const { id } = useParams(); // Get the product ID from the URL
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     // Fetch product details using the ID
//     fetch(`http://localhost:8000/api/products/${id}/`)
//       .then((response) => response.json())
//       .then((data) => setProduct(data))
//       .catch((error) => console.error('Error fetching product details:', error));
//   }, [id]);

//   if (!product) {
//     return <p>Loading...</p>;
//   }

//   return (
//     // <div className="container mx-auto mt-10 p-5">
//       <div className="flex flex-col sm:flex-row gap-10">
//         <div>
//         <img
//             src={product.image}
//             alt={product.name}
//             className="w-1/3 rounded-xl"
//           />
//         </div>

//         <div className="flex flex-col w-1/2">
//           <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
//           <p className="text-gray-600 mb-4">{product.description}</p>
//           <p className="text-gray-500 capitalize mb-4">Category: {product.category}</p>
//           <p className="text-green-600 text-xl font-semibold mb-4">
//             Starting Price: ${product.starting_price}
//           </p>
//           <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//             Place Your Bid
//           </button>
//         </div>
//       </div>
//     // </div>
//   );
// };

// export default Product;



// ----------------------------------------------------------------




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const Product = () => {
//   const { id } = useParams(); // Get the product ID from the URL
//   const [product, setProduct] = useState(null);
//   const [bidAmount, setBidAmount] = useState(''); // State to handle bid input

//   useEffect(() => {
//     // Fetch product details using the ID
//     fetch(`http://localhost:8000/api/products/${id}/`)
//       .then((response) => response.json())
//       .then((data) => setProduct(data))
//       .catch((error) => console.error('Error fetching product details:', error));
//   }, [id]);

//   const handleBidInput = (event) => {
//     setBidAmount(event.target.value); // Update bid amount as user types
//   };

//   const handlePlaceBid = () => {
//     console.log('Placing bid:', bidAmount); // Replace with actual bid logic
//     // You can add further logic to place the bid using bidAmount
//   };

//   if (!product) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="container mx-auto mt-10 p-5">
//       <div className="flex flex-col sm:flex-row gap-10 justify-center">
//         {/* Product Image */}
//         <div className="w-full sm:w-1/2 p-4 flex justify-center">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="max-w-full h-auto rounded-xl shadow-lg"
//           />
//         </div>

//         {/* Product Details & Bid Section */}
//         <div className="p-4 border-2 border-gray-300 rounded-xl shadow-lg w-1/3">
//         <div className="flex flex-col gap-4 w-full">
//           {/* Product Information */}
//           <div className="w-full p-4">
//             <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//             <p className="text-gray-600 mb-4">{product.description}</p>
//             <p className="text-gray-500 capitalize mb-4">
//               Category: {product.category}
//             </p>
//             <p className="text-green-600 text-xl font-semibold mb-4">
//               Starting Price: €{product.starting_price}
//             </p>
//           </div>

//           {/* Bidding Options */}
          
//             {/* <p className="text-4xl font-bold text-gray-800 mb-4">
//               € {product.starting_price}
//             </p> */}
//             {/* Input for bid amount */}
//             <input
//               type="number"
//               placeholder="Enter your bid"
//               value={bidAmount}
//               onChange={handleBidInput}
//               className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//             />
//             {/* Place bid button */}
//             <button
//               onClick={handlePlaceBid}
//               className="bg-blue-600 w-full text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition"
//             >
//               Place Your Bid
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [auction, setAuction] = useState(null); // State to hold auction data
  const [bidAmount, setBidAmount] = useState(''); // State to handle bid input
  const [remainingTime, setRemainingTime] = useState(''); // State to hold remaining time

  useEffect(() => {
    // Fetch product details using the ID
    fetch(`http://localhost:8000/api/products/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Product Data:", data);
        setProduct(data);

        // Assuming the first auction is the relevant one
        if (data.auctions.length > 0) {
          setAuction(data.auctions[0]); // Set the auction details

          // Start the countdown timer
          const interval = setInterval(() => {
            updateRemainingTime(data.auctions[0].end_time);
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
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
    } else {
      setRemainingTime('Auction ended');
    }
  };

  const handleBidInput = (event) => {
    setBidAmount(event.target.value); // Update bid amount as user types
  };

  const handlePlaceBid = () => {
    console.log('Placing bid:', bidAmount); // Replace with actual bid logic
    // You can add further logic to place the bid using bidAmount
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
            {auction && (
              <div className="w-full p-4">
                <h2 className="text-2xl font-bold text-red-600">Time Remaining: {remainingTime}</h2>
              </div>
            )}

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



