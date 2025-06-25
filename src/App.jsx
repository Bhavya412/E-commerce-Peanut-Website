import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductPage from './components/ProductPage';
import ProductDetail from './components/ProductDetail';
import { AuthProvider } from './components/AuthContext';
import { CartProvider } from './components/CartContext'; 
import Cart from './components/Cart'

function App() {
  return (
    <AuthProvider>
      <CartProvider> 
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
