import React, { useState } from 'react';
import './AdminPage.css';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase'; // your initialized Firebase app

const db = getFirestore(app); // Firestore instance

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    cost: "",
    rating: "",
    image1: "",
    image2: "",
    image3: "",
    about: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add product to Firestore collection
      await addDoc(collection(db, "products"), product);
      alert("Product submitted to Firestore successfully!");
      setProduct({
        name: "",
        cost: "",
        rating: "",
        image1: "",
        image2: "",
        image3: "",
        about: ""
      });
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to submit product to Firestore.");
    }
  };

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
        <input type="number" name="cost" placeholder="Product Cost" value={product.cost} onChange={handleChange} required />
        <input
          type="number"
          name="rating"
          placeholder="Product Rating (1 to 5)"
          min="1"
          max="5"
          step="0.1"
          value={product.rating}
          onChange={handleChange}
          required
        />
        <input type="text" name="image1" placeholder="Image URL 1" value={product.image1} onChange={handleChange} required />
        <input type="text" name="image2" placeholder="Image URL 2" value={product.image2} onChange={handleChange} />
        <input type="text" name="image3" placeholder="Image URL 3" value={product.image3} onChange={handleChange} />
        <textarea name="about" placeholder="About the product" value={product.about} onChange={handleChange} rows={5} required />
        <button type="submit">Submit Product</button>
      </form>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="admin-page">
      <h1>Welcome, Admin</h1>
      <ProductForm />
    </div>
  );
}
