import React, { useState } from 'react';
import { auth, firestore  } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore';

import './signin.css'; 

const SignIn = ({setAdminAccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const adminDocRef = doc(firestore, 'admin', 'admin');
      const adminDoc = await getDoc(adminDocRef);

      if (adminDoc.exists()) {
        const adminData = adminDoc.data();
        if (adminData.email === email && adminData.password === password) {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          setAdminAccess(true);
          console.log('Admin signed in');
          navigate('/dashboard');
        } else {
          setAdminAccess(false);
          setError('Incorrect email or password.');
        }
      } else {
        setAdminAccess(false);
        setError('Admin record not found.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Failed to sign in. Please try again.');
    }
  };
 

return (
  <div className="sign-in-container">
    <form className="sign-in-form" onSubmit={handleSignIn}>
      <h1>Sign In</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign In</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  </div>
);
};
export default SignIn;
