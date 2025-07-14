import React, { useState } from 'react';
import './AdminPage.css';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../Firebase'; // ✅ Your initialized Firebase app

const db = getFirestore(app); // ✅ Firestore instance

function ProductForm() {
  const [product, setProduct] = useState({
    productId: "",
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
    if (!product.productId) {
      alert("Please provide a Product ID.");
      return;
    }

    await setDoc(doc(db, "products", product.productId), {
      name: product.name,
      cost: parseFloat(product.cost),
      rating: parseFloat(product.rating),
      image1: product.image1,
      image2: product.image2,
      image3: product.image3,
      about: product.about,
      id: product.productId, // ✅ Store it in the doc too (optional but useful)
    });

    alert("Product added with custom ID!");
    setProduct({
      productId: "",
      name: "",
      cost: "",
      rating: "",
      image1: "",
      image2: "",
      image3: "",
      about: ""
    });
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Failed to add product.");
  }
};

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
        <input type="text" name="productId" placeholder="Product ID" value={product.productId} onChange={handleChange} required />
        <input type="number" name="cost" placeholder="Product Cost" value={product.cost} onChange={handleChange} required />
        <input type="number" name="rating" placeholder="Rating (1-5)" min="1" max="5" step="0.1" value={product.rating} onChange={handleChange} required />
        <input type="text" name="image1" placeholder="Image URL 1" value={product.image1} onChange={handleChange} required />
        <input type="text" name="image2" placeholder="Image URL 2" value={product.image2} onChange={handleChange} />
        <input type="text" name="image3" placeholder="Image URL 3" value={product.image3} onChange={handleChange} />
        <textarea name="about" placeholder="About the product" value={product.about} onChange={handleChange} rows={4} required />
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
