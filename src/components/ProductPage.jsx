import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../Firebase';
import { AuthContext } from './AuthContext';
import './ProductPage.css';

const db = getFirestore(app); // ✅ Firestore instance

function ProductPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortRating, setSortRating] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { isLoggedIn, userEmail, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/userlogin");
  };

  const getUserName = (email) => {
    if (!email) return "";
    const namePart = email.split("@")[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  // ✅ Fetch product data from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const productList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Apply filters & sorting
  const filteredProducts = products
    .filter(product => {
      return (category === "All" || product.category === category)
        && (minPrice === "" || product.cost >= parseFloat(minPrice))
        && (maxPrice === "" || product.cost <= parseFloat(maxPrice));
    })
    .sort((a, b) => {
      if (sortRating === "high") return b.rating - a.rating;
      if (sortRating === "low") return a.rating - b.rating;
      return 0;
    });

  return (
    <div className="page-container">
      <aside className="sidebar">
        <h4>Filters</h4>

        <div className="filter-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            <option value="Butter">Butter</option>
            <option value="Nuts">Nuts</option>
            <option value="Sweets">Sweets</option>
            <option value="Oil">Oil</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Price Range</label>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Sort by Rating</label>
          <select value={sortRating} onChange={(e) => setSortRating(e.target.value)}>
            <option value="">None</option>
            <option value="high">High to Low</option>
            <option value="low">Low to High</option>
          </select>
        </div>
      </aside>

      <main className="product-section">
        <div className="top-links">
          {isLoggedIn ? (
            <div
              className="user-dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <span className="greeting">Hi, {getUserName(userEmail)} 👋</span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate("/cart")}>Go to Cart</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/userlogin">Login</Link>
          )}
        </div>

        <h2 className="product-heading">Our Peanut Products</h2>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`, { state: product })}
            >
              <img src={product.image1} alt={product.name} className="product-image" />
              <div className="product-info">
                <p className="name">{product.name}</p>
                <p className="price">₹{product.cost}</p>
                <p className="rating">Rating: {product.rating}</p>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <p className="no-products">No products found with selected filters.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
