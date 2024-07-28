import React,{useEffect,useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {auth} from '../src/config/firebase.js'
import SignIn from './components/SignIn.jsx';
import Dashboard from './components/dashbord.jsx';
import Profit from './components/profit.jsx';
import TourRequestsList from './components/req.jsx';


const App = () => {
const [user,setUser]=useState(null)
const [adminAccess, setAdminAccess] = useState(false);
const [loading, setLoading] = useState(true);
useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

    return (

    <Router>
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
        {user && adminAccess }
        <Routes>
          <Route path="/signin" element={<SignIn setAdminAccess={setAdminAccess} />} />
          <Route path="/dashboard" element={user && adminAccess ? <Dashboard /> : <Navigate to="/signin" />} />
          <Route path="/profit" element={user && adminAccess ? <Profit /> : <Navigate to="/signin" />} />
          <Route path="/tour-request" element={user && adminAccess ? <TourRequestsList /> : <Navigate to="/signin" />} />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </>
      )}
    </div>
  </Router>
    )
}

export default App;