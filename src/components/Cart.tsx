import React, { useState } from 'react';
import { useCart } from './CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckout = () => {
    setShowCheckout(true);
    setSelectedItems(cartItems.map(item => item.id));
  };

  const closeDrawer = () => {
    setShowCheckout(false);
  };

  const handleSelect = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
  const subtotal = selectedCartItems.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image1} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Price: ${(item.price ?? 0).toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Continue to Checkout
          </button>
        </>
      )}

      <div className={`checkout-drawer ${showCheckout ? 'checkout-drawer-active' : ''}`}>
        <div className="checkout-header">
          <h3>Checkout</h3>
          <button onClick={closeDrawer} className="close-drawer">✕</button>
        </div>

        <div className="checkout-scrollable">
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelect(item.id)}
                />
                <img src={item.image1} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <button className="remove-link" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <p><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></p>
            <p><span>Tax (10%):</span><span>${tax.toFixed(2)}</span></p>
            <h4><span>Total:</span><span>${total.toFixed(2)}</span></h4>
          </div>
        </div>

        <button className="proceed-btn">Proceed</button>
      </div>
    </div>
  );
}

export default Cart;
