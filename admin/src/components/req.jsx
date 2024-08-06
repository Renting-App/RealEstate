import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TourRequestsList.css';

const TourRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5800/reqs');
        setRequests(response.data);
      } catch (error) {
        setError('Failed to fetch requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.delete(`http://localhost:5800/deletereq/${id}`);
      setRequests(requests.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Failed to approve request:', error);
      setError('Failed to approve request.');
    }
  };

  // const handleCancel = (id) => {
   
  //   console.log(`Cancelled request with id: ${id}`);
  // };

  if (loading) return <div className="loading-text">Loading...</div>;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <div className="container">
      <h1>Tour Requests</h1>
      <ul className="request-list">
        {requests.map((item) => (
          <li key={item._id} className="request-item">
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Phone:</strong> {item.phone}</p>
            <p><strong>Message:</strong> {item.message}</p>
            <p><strong>Visit Date:</strong> {item.selectedVisitDate}</p>
            <p><strong>Residence:</strong> {item.residence.title}</p>
            <button onClick={() => handleApprove(item._id)} className="approve-button">Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourRequestsList;
