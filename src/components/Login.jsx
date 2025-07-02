// Login.jsx
import React, { useState, useContext } from 'react';
import { ref, get, child } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase"; // ✅ make sure it's lowercase
import { AuthContext } from './AuthContext';
import './UserLogin.css';
import ProductPage from './ProductPage';


const sanitize = email => email.replace(/[.#$[\]]/g, c =>
  ({ '.': '(dot)', '#': '(hash)', '$': '(dollar)', '[': '(open)', ']': '(close)' })[c]
);

const isValidEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = ({ switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState('');
  const { login, setUserEmail } = useContext(AuthContext); // ✅ context holds login state
  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    const key = sanitize(email.trim());

    if (!isValidEmail(email)) return setMsg('Invalid email format.');
    if (pass.length < 6) return setMsg('Password must be at least 6 characters.');

    const userRef = ref(db);
    const userPath = `users/${key}`;

    try {
      const snapshot = await get(child(userRef, userPath));
      if (!snapshot.exists()) {
        setMsg('No account found.');
      } else {
        const user = snapshot.val();
        if (user.password === pass) {
          login(email);               // ✅ call login from context
          setUserEmail(email);        // ✅ save email to context
          setMsg('Login successful!');
          setTimeout(() => navigate("/products"), 500); // ✅ redirect
        } else {
          setMsg('Incorrect password.');
        }
      }
    } catch (err) {
      console.error(err);
      setMsg('An error occurred. Please try again.');
    }
 

  };

  

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo" />
      </div>
      <div className="login-right">
        <div className="user-login">
          <h2>Login</h2>
          <form onSubmit={onSubmit}>
            <input type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} required />
            <input type="password" value={pass} placeholder="Password" onChange={e => setPass(e.target.value)} required />
            <button type="submit" >Login</button>
          </form>
          <p>{msg}</p>
          <p>
            Don't have an account?
            <button type="button" onClick={switchToSignup}>Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
