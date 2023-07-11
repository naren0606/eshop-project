import React, { useState } from 'react';
import axios from 'axios';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [availableItems, setAvailableItems] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [manufacturer, setManufacturer] = useState('');

  const categories = ["Apparel", "Automotive", "Electronics", "Hardware"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      price,
      description,
      category,
      availableItems,
      createdAt,
      imageUrl,
      manufacturer
    };

    try {
      await axios.post('http://localhost:3001/api/v1/products', newProduct);
      // Reset form inputs
      setProductName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setAvailableItems('');
      setCreatedAt('');
      setImageUrl('');
      setManufacturer('');
      console.log('Product added successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />

        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Available Items:</label>
        <input type="number" value={availableItems} onChange={(e) => setAvailableItems(e.target.value)} required />

        <label>Created At:</label>
        <input type="text" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} required />

        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />

        <label>Manufacturer:</label>
        <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} required />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProducts;
