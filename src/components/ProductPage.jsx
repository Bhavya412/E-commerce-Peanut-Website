import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductPage.css';

const productsData = [
  {
    id: 1,
    name: "Organic Peanut Butter",
    price: 250,
    rating: 4.5,
    category: "Butter",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgQ-iITouRZ6ZN5woDpmtWEauCARtMSQdQVQ&s",
  },
  {
    id: 2,
    name: "Roasted Peanuts",
    price: 120,
    rating: 4.2,
    category: "Nuts",
    image: "https://gladful.in/cdn/shop/files/Gladful_5.png?v=1698842499",
  },
  {
    id: 3,
    name: "Peanut Laddu",
    price: 180,
    rating: 4.8,
    category: "Sweets",
    image: "https://india.neelamfoodland.in/cdn/shop/products/IMG_9451_800x.jpg?v=1734379392",
  },
  {
    id: 4,
    name: "Cold Pressed Peanut Oil",
    price: 450,
    rating: 4.6,
    category: "Oil",
    image: "https://www.ulamart.com/media/catalog/product/cache/c75629cecc7438f26ce198480a02fd03/g/r/groundnutoil1-2_1.jpg",
  },
];

function ProductPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortRating, setSortRating] = useState("");

  const filteredProducts = productsData
    .filter(product => {
      return (category === "All" || product.category === category)
        && (minPrice === "" || product.price >= parseFloat(minPrice))
        && (maxPrice === "" || product.price <= parseFloat(maxPrice));
    })
    .sort((a, b) => {
      if (sortRating === "high") return b.rating - a.rating;
      if (sortRating === "low") return a.rating - b.rating;
      return 0;
    });

  return (
    <div className="page-container">
      <aside className="sidebar">
        <h4>Filter By</h4>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option value="Butter">Butter</option>
          <option value="Nuts">Nuts</option>
          <option value="Sweets">Sweets</option>
          <option value="Oil">Oil</option>
        </select>

        <h4>Price</h4>
        <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

        <h4>Sort By Rating</h4>
        <select value={sortRating} onChange={(e) => setSortRating(e.target.value)}>
          <option value="">None</option>
          <option value="high">High to Low</option>
          <option value="low">Low to High</option>
        </select>
      </aside>

      <main className="product-section">
        <div className="top-links">
          <a href="/cart">Cart</a>
          <a href="/login">Login</a>
        </div>

        <h2 className="product-heading">Our Peanut Products</h2>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`, { state: product })}
            >
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <p className="name">{product.name}</p>
                <p className="price">${product.price}</p>
                <p className="rating">Rating: {product.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
