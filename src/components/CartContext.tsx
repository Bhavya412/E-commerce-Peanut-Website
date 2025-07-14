import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './Type';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../Firebase';
 // your firebase config

export type CartItem = Product & { quantity: number };

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  buyNow: (product: Product, quantity: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const db = getDatabase(app);
  const auth = getAuth(app);

  // Get current logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Load cart data from Firebase when user logs in
  useEffect(() => {
    if (user) {
      const emailKey = encodeURIComponent(user.email || 'guest');
      const cartRef = ref(db, `carts/${emailKey}`);
      onValue(cartRef, (snapshot) => {
        const data = snapshot.val();
        if (data) setCartItems(data);
      });
    }
  }, [user]);

  const updateDatabase = (items: CartItem[]) => {
    if (!user) return;
    const emailKey = encodeURIComponent(user.email || 'guest');
    const cartRef = ref(db, `carts/${emailKey}`);
    set(cartRef, items);
  };

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const updated = [...prevItems];
      const existing = updated.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        updated.push({ ...product, quantity });
      }
      updateDatabase(updated);
      return updated;
    });
  };
//hkugigigkgh
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => {
      const updated = prevItems.filter((item) => item.id !== id);
      updateDatabase(updated);
      return updated;
    });
  };

  const buyNow = (product: Product, quantity: number) => {
    const updated = [{ ...product, quantity }];
    setCartItems(updated);
    updateDatabase(updated);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, buyNow }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
