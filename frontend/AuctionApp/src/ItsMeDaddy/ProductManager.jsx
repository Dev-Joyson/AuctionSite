import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/products/";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    starting_price: "",
    category: "others",  // Default to 'others'
  });
  const [editProduct, setEditProduct] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);  // Fetch products whenever the filters change

  const fetchProducts = async () => {
    try {
      // Construct the query string with filters
      const queryParams = new URLSearchParams();
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.minPrice) queryParams.append("min_price", filters.minPrice);
      if (filters.maxPrice) queryParams.append("max_price", filters.maxPrice);

      const response = await axios.get(`${API_URL}?${queryParams.toString()}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const createProduct = async () => {
    try {
      const response = await axios.post(API_URL, newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: "", description: "", starting_price: "", category: "others" });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const updateProduct = async (id) => {
    try {
      const response = await axios.put(`${API_URL}${id}/`, editProduct);
      setProducts(
        products.map((product) => (product.id === id ? response.data : product))
      );
      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleInputChange = (e, setState, currentState) => {
    const { name, value } = e.target;
    setState({ ...currentState, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <h1>Product Manager</h1>

      {/* Filter Section */}
      <div>
        <h2>Filter Products</h2>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          <option value="commodities">Commodities</option>
          <option value="electronics">Electronics</option>
          <option value="apparels">Apparels</option>
          <option value="vehicles">Vehicles</option>
          <option value="property">Property</option>
          <option value="art">Art</option>
          <option value="others">Others</option>
        </select>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
      </div>

      {/* Add New Product Section */}
      <div>
        <h2>Add New Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => handleInputChange(e, setNewProduct, newProduct)}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => handleInputChange(e, setNewProduct, newProduct)}
        />
        <input
          type="number"
          name="starting_price"
          placeholder="Starting Price"
          value={newProduct.starting_price}
          onChange={(e) => handleInputChange(e, setNewProduct, newProduct)}
        />
        <select
          name="category"
          value={newProduct.category}
          onChange={(e) => handleInputChange(e, setNewProduct, newProduct)}
        >
          <option value="commodities">Commodities</option>
          <option value="electronics">Electronics</option>
          <option value="apparels">Apparels</option>
          <option value="vehicles">Vehicles</option>
          <option value="property">Property</option>
          <option value="art">Art</option>
          <option value="others">Others</option>
        </select>
        <button onClick={createProduct}>Add Product</button>
      </div>

      {/* Product List */}
      <div>
        <h2>Product List</h2>
        {products.map((product) => (
          <div key={product.id}>
            {editProduct && editProduct.id === product.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={editProduct.name}
                  onChange={(e) => handleInputChange(e, setEditProduct, editProduct)}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={editProduct.description}
                  onChange={(e) => handleInputChange(e, setEditProduct, editProduct)}
                />
                <input
                  type="number"
                  name="starting_price"
                  placeholder="Starting Price"
                  value={editProduct.starting_price}
                  onChange={(e) => handleInputChange(e, setEditProduct, editProduct)}
                />
                <select
                  name="category"
                  value={editProduct.category}
                  onChange={(e) => handleInputChange(e, setEditProduct, editProduct)}
                >
                  <option value="commodities">Commodities</option>
                  <option value="electronics">Electronics</option>
                  <option value="apparels">Apparels</option>
                  <option value="vehicles">Vehicles</option>
                  <option value="property">Property</option>
                  <option value="art">Art</option>
                  <option value="others">Others</option>
                </select>
                <button onClick={() => updateProduct(product.id)}>Save</button>
                <button onClick={() => setEditProduct(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.starting_price}</p>
                <p>{product.category}</p>
                <button onClick={() => setEditProduct(product)}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
