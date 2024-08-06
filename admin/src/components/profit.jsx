import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import "./AdminProfit.css";

const Profit = () => {
  const [profit, setProfit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfit = async () => {
      try {
        const adminDocRef = doc(firestore, "admin", "adminDocumentID");
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists()) {
          setProfit(adminDoc.data().profit);
        } else {
          console.error("Admin document not found!");
        }
      } catch (error) {
        console.error("Error fetching profit:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfit();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-profit-container">
      <div className="profit-card">
        <h2 className="profit-title">Admin Profit</h2>
        <p className="profit-amount">
          {profit !== null ? `${profit} DT` : "No data available"}
        </p>
      </div>
    </div>
  );
};

export default Profit;
