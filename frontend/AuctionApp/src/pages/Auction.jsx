import React, { useEffect, useState } from 'react';

const Auction = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // To track selected category

  useEffect(() => {
    // Fetch the products
    fetch('http://localhost:8000/api/products/')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initially show all products
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Function to filter products based on category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredProducts(products); // Show all products when no category is selected
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      <p>Browse through the product categories.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* Categories List */}
        <div className="flex flex-col gap-4 text-sm w-1/6">
          <button
            className={`px-4 py-2 rounded ${selectedCategory === '' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryClick('')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedCategory === 'electronics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryClick('electronics')}
          >
            Electronics
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedCategory === 'antiques' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryClick('antiques')}
          >
            Antiques
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedCategory === 'furniture' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryClick('furniture')}
          >
            Furniture
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedCategory === 'jewelry' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryClick('jewelry')}
          >
            Jewelry
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedCategory === 'collectibles' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryClick('collectibles')}
          >
            Collectibles
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:translate-y-[-5px] transition-all duration-500 flex flex-col justify-between"
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
                <button className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                  Bid Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auction;
