import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/dashbord.jsx';
import TourRequestsList from './components/req.jsx';
import ManagePosts from './components/PostPropertyAdmin.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/tour-request" element={<TourRequestsList />} />
                <Route path="/ManagePosts" element={<ManagePosts/>} />
            </Routes>
        </Router>
    );
};

export default App;