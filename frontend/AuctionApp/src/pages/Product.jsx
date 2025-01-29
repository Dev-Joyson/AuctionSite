import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details using the ID
    fetch(`http://localhost:8000/api/products/${id}/`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    // <div className="container mx-auto mt-10 p-5">
      <div className="flex flex-col sm:flex-row gap-10">
        <div>
        <img
            src={product.image}
            alt={product.name}
            className="w-1/3 rounded-xl"
          />
        </div>

        <div className="flex flex-col w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-gray-500 capitalize mb-4">Category: {product.category}</p>
          <p className="text-green-600 text-xl font-semibold mb-4">
            Starting Price: ${product.starting_price}
          </p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Place Your Bid
          </button>
        </div>
      </div>
    // </div>
  );
};

export default Product;
