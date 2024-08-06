// Profit.js
import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../config/firebase';

const Profit = () => {
  const [profit, setProfit] = useState(0);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const adminRef = firestore.collection('admin').doc(user.uid);
        const doc = await adminRef.get();
        if (doc.exists) {
          setProfit(doc.data().profit);
        } else {
          setError('Admin data not found.');
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const updateProfit = async (value) => {
    try {
      const adminRef = firestore.collection('admins').doc(user.uid);
      await adminRef.update({ profit: firestore.FieldValue.increment(value) });
      const updatedDoc = await adminRef.get();
      setProfit(updatedDoc.data().profit);

      // Set notification message
      setNotification(`A percentage of ${value} DT added to the profit.`);
      setTimeout(() => {
        setNotification('');
      }, 3000); // Hide notification after 3 seconds
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAdd = () => {
    updateProfit(Number(amount));
    setAmount('');
  };

  const handleSubtract = () => {
    updateProfit(-Number(amount));
    setAmount('');
  };

  return (
    <div>
      <h1>Admin Profit: {profit} DT</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {notification && <p style={{ color: 'green' }}>{notification}</p>}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleSubtract}>Subtract</button>
    </div>
  );
};

export default Profit;
