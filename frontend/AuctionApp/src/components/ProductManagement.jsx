import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    starting_price: '',
    category: 'others',
    image: '',
    auction_status: 'pending',
    end_time: '',
  });

  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const apiUrl = 'http://127.0.0.1:8000/api/products/';

  // Fetch products from API
  useEffect(() => {
    console.log("Fetching products...");
    axios
      .get(apiUrl, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log("Fetched products successfully:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.response?.data || error.message);
      });
  }, []);

  const handleOpenModal = (product = null) => {
    console.log("Opening modal", product ? `for product ID: ${product.id}` : "to add a new product");
    setCurrentProduct(product);
    setIsModalOpen(true);
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        starting_price: product.starting_price,
        category: product.category,
        image: product.image,
        auction_status: product.auction_status || 'pending',
        end_time: product.auction ? product.auction.end_time : '', // Fetch end_time from the auction
      });
    } else {
      setFormData({
        name: '',
        description: '',
        starting_price: '',
        category: 'others',
        image: '',
        auction_status: 'pending',
        end_time: '',
      });
    }
  };

  const handleCloseModal = () => {
    console.log("Closing modal...");
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating form field: ${name} with value: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data being submitted:", formData); // Log the form data
    
    // Data validation
    if (!formData.name || !formData.starting_price) {
      console.error("Validation failed: Name and Starting Price are required");
      return;
    }

    console.log("Sending data:", formData); // Log the data being sent

    if (currentProduct) {
      // Edit existing product
      console.log(`Editing product with ID: ${currentProduct.id}`);
      axios
        .patch(`${apiUrl}${currentProduct.id}/`, formData, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
          console.log("API response after product update:", response);  // Log full response
          // Check the response data before updating state
          if (response.status === 200 && response.data) {
            console.log("Product updated successfully:", response.data);
            setProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === currentProduct.id ? response.data : product
              )
            );

            // Optionally update auction-related fields after updating product
            if (response.data.auction_id) {
              updateAuction(response.data.auction_id, {
                status: formData.auction_status,
                end_time: formData.end_time,
              });
            }

            handleCloseModal();
          } else {
            console.error("Failed to update product, unexpected response:", response);
          }
        })
        .catch((error) => {
          console.error("Error editing the product:", error.response?.data || error.message);
        });
    } else {
      // Add new product
      console.log("Adding new product...");
      axios
        .post(apiUrl, formData, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
          console.log("New product added successfully:", response.data);
          setProducts((prevProducts) => [...prevProducts, response.data]);

          // After adding product, update auction with the data
          if (response.data.auction_id) {
            updateAuction(response.data.auction_id, {
              status: formData.auction_status,
              end_time: formData.end_time,
            });
          }

          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error adding the product:", error.response?.data || error.message);
        });
    }
  };

  const handleDelete = (productId) => {
    console.log(`Deleting product with ID: ${productId}`);
    axios
      .delete(`${apiUrl}${productId}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(() => {
        console.log(`Product with ID: ${productId} deleted successfully.`);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error(`Error deleting product with ID: ${productId}:`, error.response?.data || error.message);
      });
  };

  // Update auction status and end time
  const updateAuction = (auctionId, auctionData) => {
    const auctionUrl = `http://127.0.0.1:8000/api/auctions/${auctionId}/`;
    axios
      .patch(auctionUrl, auctionData, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log("Auction updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating auction:", error.response?.data || error.message);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
      <button
        onClick={() => handleOpenModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Add New Product
      </button>

      <table className="w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="p-4 text-left">Image</th> {/* Added image column */}
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Auction Status</th>
            <th className="p-4 text-left">End Time</th> {/* Added end time column */}
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Thumbnail style
                />
              </td>
              <td className="p-4">{product.name}</td>
              <td className="p-4">{product.category}</td>
              <td className="p-4">{product.starting_price}</td>
              <td className="p-4">{product.auction_status}</td>
              <td className="p-4">{product.end_time ? new Date(product.end_time).toLocaleString() : "N/A"}</td> {/* End time */}
              <td className="p-4">
                <button
                  onClick={() => handleOpenModal(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">
              {currentProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Starting Price</label>
                <input
                  type="number"
                  name="starting_price"
                  value={formData.starting_price}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="commodities">Commodities</option>
                  <option value="electronics">Electronics</option>
                  <option value="apparels">Apparels</option>
                  <option value="vehicles">Vehicles</option>
                  <option value="property">Property</option>
                  <option value="art">Art</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Auction Status</label>
                <select
                  name="auction_status" // Update the name here to match the field
                  value={formData.auction_status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="finished">Finished</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">End Time</label>
                <input
                  type="datetime-local"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {currentProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
