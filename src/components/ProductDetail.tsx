import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../Firebase";
import { useCart } from "./CartContext";
import "./ProductDetail.css";
import { Product } from "./Type";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(app);

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null);

  // ✅ Fetch product by ID
  useEffect(() => {
    if (!productId) {
      console.error("No productId provided in URL");
      return;
    }

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({
            id: docSnap.id,
            ...(docSnap.data() as Omit<Product, "id">),
          });
        } else {
          console.error("No such product!");
        }
      } catch (error) {
        console.error("Error getting product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // ✅ Set up auto-scrolling once product is loaded
  useEffect(() => {
    if (!product) return;

    const images = [product.image1, product.image2, product.image3].filter(
      Boolean
    );
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [product]);

  if (!product) return <p>Loading product...</p>;

  const images = [product.image1, product.image2, product.image3].filter(
    Boolean
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleQuantityChange = (type: "inc" | "dec") => {
    setQuantity((prev) => (type === "inc" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const toggleAccordion = (index: number) => {
    setAccordionOpen(accordionOpen === index ? null : index);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const accordionData = [
    {
      title: "About",
      content: product.about || "No additional info available.",
    },
    {
      title: "Return Policy",
      content:
        "We offer a 7-day return window if the product is unopened and in original packaging.",
    },
    {
      title: "Shipping",
      content:
        "Orders are dispatched within 24 hours and delivered in 2–5 business days.",
    },
  ];

  const handleCartClick = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/cart");
    } else {
      navigate("/userlogin");
    }
  });
};


  return (
    <div className="detail-container">
      <div className="top-bar">
        <h1 className="site-title">NutriPeanut</h1>
        <div className="cart-count" onClick={handleCartClick}>
          Cart ({cartCount})
        </div>
      </div>

      <div className="product-detail">
        <div className="image-gallery">
          <div className="main-image-wrapper">
            <button className="slide-btn left" onClick={handlePrev}>
              &lt;
            </button>
            <img
              src={images[currentIndex]}
              alt="Product"
              className="main-image"
            />
            <button className="slide-btn right" onClick={handleNext}>
              &gt;
            </button>
          </div>

          <div className="thumbnail-row">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumb ${idx}`}
                className={`thumbnail ${
                  images[currentIndex] === img ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>

        <div className="info-section">
          <h2>{product.name}</h2>
          <p className="price">₹{product.cost}</p>
          <p className="rating">Rating: {product.rating}</p>
          <p className="description">
            {product.about || "A delicious peanut product."}
          </p>

          <div className="quantity-controls">
            <h4>Quantity:</h4>
            <button onClick={() => handleQuantityChange("dec")}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange("inc")}>+</button>
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
            <div
              className="accordion-title"
              onClick={() => toggleAccordion(index)}
            >
              <h4>{section.title}</h4>
              <span>{accordionOpen === index ? "-" : "+"}</span>
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
