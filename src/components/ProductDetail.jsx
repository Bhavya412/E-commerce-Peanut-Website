import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './ProductDetail.css';

function ProductDetail() {
  const { state: product } = useLocation();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [accordionOpen, setAccordionOpen] = useState(null);

  if (!product) return <p>Product not found.</p>;

  const images = product.images || [
    product.image,
    `${product.image}?1`,
    `${product.image}?2`,
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === 'inc' ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const toggleAccordion = (index) => {
    setAccordionOpen(accordionOpen === index ? null : index);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const accordionData = [
    {
      title: 'Product Info',
      content:
        'Our NutriPeanut Butter is a smooth, creamy spread made from high-quality, dry-roasted peanuts. With no added sugar or artificial ingredients, it\'s perfect for fitness lovers, kids, and anyone looking for a wholesome snack. It\'s vegan, gluten-free, and keto-friendly.',
    },
    {
      title: 'Ingredients',
      content:
        'Only one ingredient: 100% premium roasted peanuts. No salt, no sugar, no palm oil, and no preservatives. This product is a clean source of natural plant-based protein and healthy fats.',
    },
    {
      title: 'Nutritional Facts',
      content:
        'Serving Size: 2 tbsp (32g)\n• Calories: 190\n• Protein: 8g\n• Total Fat: 16g (2g saturated fat)\n• Carbohydrates: 6g (2g fiber, 1g sugar)\n• Sodium: 0mg\n• Cholesterol: 0mg',
    },
    {
      title: 'Usage',
      content:
        'Spread it on toast, blend into smoothies, bake into cookies, or enjoy it by the spoonful. Great for making protein bars, salad dressings, and even satay sauces. Perfect pre- or post-workout.',
    },
    {
      title: 'Storage Instructions',
      content:
        'Store in a cool, dry place away from sunlight. Once opened, refrigerate to maintain freshness. Natural oil separation may occur—just stir before use. Best consumed within 3 months of opening.',
    },
    {
      title: 'Return Policy',
      content:
        'We offer a 7-day return window if the product is unopened and in original packaging. To initiate a return, contact our customer support. Refunds are processed within 3–5 business days.',
    },
    {
      title: 'Shipping',
      content:
        'Orders are dispatched within 24 hours and typically delivered in 2–5 business days. Free shipping for orders above ₹500. Track your order using the tracking ID sent via SMS/email.',
    },
  ];

  return (
    <div className="detail-container">
      <div className="top-bar">
        <h1 className="site-title">NutriPeanut</h1>
        <div className="cart-count" onClick={() => navigate('/cart')}>
          Cart ({cartCount})
        </div>
      </div>

      <div className="product-detail">
        <div className="image-gallery">
          <div className="main-image-wrapper">
            <button className="slide-btn left" onClick={handlePrev}>
              &lt;
            </button>
            <img src={images[currentIndex]} alt="Main" className="main-image" />
            <button className="slide-btn right" onClick={handleNext}>
              &gt;
            </button>
          </div>

          <div className="thumbnail-row">
            {images.slice(0, 3).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumb ${idx}`}
                className={`thumbnail ${images[currentIndex] === img ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>

        <div className="info-section">
          <h2>{product.name}</h2>
          <p className="price">${product.price}</p>
          <p className="rating">Rating: {product.rating}</p>
          <p className="description">
            A creamy, protein-rich peanut butter made from the finest roasted peanuts. Perfect for
            health enthusiasts, gym-goers, and anyone who loves a healthy snack!
          </p>

          <div className="quantity-controls">
            <h4>Quantity:</h4>
            <button onClick={() => handleQuantityChange('dec')}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange('inc')}>+</button>
          </div>

          <div className="actions">
            <button className="add-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="accordion-section">
        {accordionData.map((section, index) => (
          <div key={index} className="accordion-line">
            <div className="accordion-title" onClick={() => toggleAccordion(index)}>
              <h4>{section.title}</h4>
              <span>{accordionOpen === index ? '-' : '+'}</span>
            </div>
            {accordionOpen === index && (
              <div className="accordion-content">{section.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetail;