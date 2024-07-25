import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/dashbord.jsx';
import TourRequestsList from './components/req.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/tour-request" element={<TourRequestsList />} />
            </Routes>
        </Router>
    );
};

export default App;