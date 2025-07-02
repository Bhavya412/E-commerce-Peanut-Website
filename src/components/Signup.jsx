// Signup.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; // make sure path is correct
import './UserLogin.css';
import { ref, set } from 'firebase/database';


const isValidEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const sanitize = email => email.replace(/[.#$[\]]/g, c =>
  ({ '.': '(dot)', '#': '(hash)', '$': '(dollar)', '[': '(open)', ']': '(close)' })[c]
);

const Signup = ({ switchToLogin }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [msg, setMsg] = useState('');

  // ✅ Trigger browser notification
  const showNotification = (title, body) => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(title, { body });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification(title, { body });
          }
        });
      }
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (!isValidEmail(email)) return setMsg('Invalid email format.');
    if (pass.length < 6) return setMsg('Password must be at least 6 characters.');
    if (pass !== confirmPass) return setMsg('Passwords do not match.');

    try {
  await createUserWithEmailAndPassword(auth, email, pass);

  const sanitizedKey = sanitize(email.trim());

  // ✅ Isolate DB write error
  try {
    await set(ref(db, `users/${sanitizedKey}`), {
      email,
      password: pass
    });
  } catch (dbErr) {
    console.error("Failed to save in Realtime DB:", dbErr);
  }

  setMsg('Signup successful!');
  showNotification("Signup Complete", "Account created successfully!");
  setTimeout(() => switchToLogin(), 1500);
} catch (err) {
  console.error(err);
  if (err.code === "auth/email-already-in-use") {
    setMsg("Account already exists.");
  } else {
    setMsg("An error occurred. Please try again.");
  }
}
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo" />
      </div>
      <div className="login-right">
        <div className="user-login">
          <h2>Sign Up</h2>
          <form onSubmit={onSubmit}>
            <input type="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} required />
            <input type="password" value={pass} placeholder="Password" onChange={e => setPass(e.target.value)} required />
            <input type="password" value={confirmPass} placeholder="Confirm Password" onChange={e => setConfirmPass(e.target.value)} required />
            <button type="submit">Sign Up</button>
          </form>
          <p>{msg}</p>
          <p>
            Already have an account?
            <button type="button" onClick={switchToLogin}>Login</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
