import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]); // Ensure it's an empty array initially
  const [product, setProduct] = useState({
    name: '',
    description: '',
    starting_price: '',
    category: 'others',
    image: 'https://cdn2.iconfinder.com/data/icons/creative-icons-2/64/PACKAGING_DESIGN-1024.png', // Default image URL
  });
  const [isEdit, setIsEdit] = useState(false);
  const [productId, setProductId] = useState(null);

  // Fetch all products on initial load
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => {
        setProducts(response.data || []); // Ensure it's an array
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Fetch product details if editing
  useEffect(() => {
    if (productId) {
      setIsEdit(true);
      axios.get(`http://127.0.0.1:8000/api/products/${productId}/`)
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
        });
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = isEdit ? `http://127.0.0.1:8000/api/products/${productId}/` : 'http://127.0.0.1:8000/api/products/';
    const method = isEdit ? 'put' : 'post';

    axios({
      method,
      url: apiUrl,
      data: product,
    })
      .then(response => {
        alert('Product saved successfully');
        // Refresh product list after submission
        setProduct({
          name: '',
          description: '',
          starting_price: '',
          category: 'others',
          image: 'https://cdn2.iconfinder.com/data/icons/creative-icons-2/64/PACKAGING_DESIGN-1024.png',
        });
        setIsEdit(false);
        setProductId(null);
        axios.get('http://127.0.0.1:8000/api/products/')
          .then(response => {
            setProducts(response.data || []); // Ensure it's an array
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      })
      .catch(error => {
        alert('Error saving product');
        console.error('Error:', error);
      });
  };

  const handleEdit = (id) => {
    setProductId(id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/products/${id}/`)
      .then(() => {
        alert('Product deleted successfully');
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        alert('Error deleting product');
        console.error('Error:', error);
      });
  };

  return (
    <div className="product-management">
      <h1>Product Management</h1>

      {/* Product Form (Create/Edit) */}
      <form onSubmit={handleSubmit} className="product-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Starting Price:</label>
          <input
            type="number"
            name="starting_price"
            value={product.starting_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
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
        <div>
          <label>Image URL:</label>
          <input
            type="url"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
          <p>Enter an image URL</p>
        </div>
        <div>
          <button type="submit">{isEdit ? 'Update Product' : 'Create Product'}</button>
        </div>
      </form>

      {/* Product List */}

<div 
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
  }}
>
  {Array.isArray(products) && products.map((product) => (
    <div 
      key={product.id} 
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        width: '250px',
        padding: '15px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        backgroundColor: '#fff',
      }}
    >
      <img 
        src={product.image} 
        alt={product.name} 
        style={{
          width: '150px',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '10px',
          marginBottom: '10px',
        }} 
      />
      <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.name}</h3>
      <p style={{ fontSize: '14px', color: '#555' }}>{product.description}</p>
      <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '10px 0' }}>
        LKR {product.starting_price}
      </p>
      <p style={{ color: '#007BFF', fontSize: '14px' }}>
        Category: {product.category}
      </p>
      <div style={{ marginTop: '15px' }}>
        <button 
          onClick={() => handleEdit(product.id)} 
          style={{
            marginRight: '10px',
            padding: '8px 12px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Edit
        </button>
        <button 
          onClick={() => handleDelete(product.id)} 
          style={{
            padding: '8px 12px',
            border: 'none',
            backgroundColor: '#FF4D4F',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>


    </div>
  );
};

export default ProductManagement;
