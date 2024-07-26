import React,{useEffect,useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {auth} from '../src/config/firebase.js'
import SignIn from './components/SignIn.js';
import Home from './components/dashbord.jsx';
import Profit from './components/profit.jsx';
// import TourRequestsList from './components/req.jsx';

const App = () => {
const [user,setUser]=useState(null)
useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

    return (
//         <Router>
//             <Routes>
//                 <Route path="/signin" component={SignIn} />
//                 <Route path="/" element={<AdminDashboard />} />
//                 <Route path="/tour-request" element={<TourRequestsList />} />
//             </Routes>
//         </Router>
//     );
// };
<Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Home" element={user ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/profit" element={user ? <Profit /> : <Navigate to="/signin" />} />
        <Route path="*" element={<Navigate to={user ? "/home" : "/signin"} />} />

      </Routes>
    </Router>
    )
}

export default App;