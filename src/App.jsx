import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductPage from './components/ProductPage';
import ProductDetail from './components/ProductDetail';
import AdminPage from './components/AdminPage';
import { AuthProvider } from './components/AuthContext';
import { CartProvider } from './components/CartContext'; 
import Cart from './components/Cart'
import UserLogin from './components/UserLogin';
// ftf yfkut jdcfnm 
function App() {
  return (
    <AuthProvider>
      <CartProvider> 
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart/>}/>
           <Route path="/userlogin" element={<UserLogin/>}/>
           <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;