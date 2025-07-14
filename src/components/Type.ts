export type Product = {
  id: string;
  name: string;
  price?: number; // Use price as the main field, make it optional if needed
  cost?: number;  // Keep cost if used elsewhere, make it optional
  rating?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  about?: string;
  // Add other fields as needed
};


export type CartItem = Product & { quantity: number };

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  buyNow: (product: Product, quantity: number) => void;
};
