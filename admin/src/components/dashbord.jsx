import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import dashboardIcon from './img/icons8-dashboard-layout-24.png';
import homeIcon from './img/icons8-home-page-24.png';
import profileIcon from './img/icons8-administrator-male-24.png';
import messageIcon from './img/icons8-comments-24.png';
import paymentIcon from './img/icons8-clock-24.png';
import postRequestIcon from './img/icons8-task-24.png';
import supportIcon from './img/icons8-help-24.png';
import privacyIcon from './img/icons8-privacy-24.png';
import searchIcon from './img/icons8-search-24.png';
import alarmIcon from './img/icons8-alarm-24.png';
import avatar from './img/avater.jpeg';

const AdminDashboard = () => {
    return (
        <div className="container grid grid-container">
            <div className="side-bar">
                <h2>
                    <img src={dashboardIcon} alt="Dashboard Icon" />Dashboard
                </h2>
                <ul>
                    <li><Link to="/"><img src={homeIcon} alt="Home page" />Home</Link></li>
                    <li><Link to="#"><img src={profileIcon} alt="Profile" />Profile</Link></li>
                    <li><Link to="/tour-request"><img src={messageIcon} alt="Tour Request" />Tour Request</Link></li>
                    <li><Link to="#"><img src={paymentIcon} alt="Payment" />Payment</Link></li>
                    <li><Link to="#"><img src={postRequestIcon} alt="Post Request" />Post Request</Link></li>
                    <li><Link to="#"><img src={supportIcon} alt="Support" />Support</Link></li>
                    <li><Link to="#"><img src={privacyIcon} alt="Privacy" />Privacy</Link></li>
                </ul>
            </div>

            <div className="main grid">
                <nav>
                    <div className="first">
                        <img src={searchIcon} alt="Search Icon" />
                        <input type="text" />
                    </div>
                    <div className="end">
                        <img src={alarmIcon} alt="Alarm Icon" />
                        <img style={{ width: '50px', borderRadius: '50%' }} src={avatar} alt="Avatar" />
                        <p className="bold">Admin</p>
                    </div>
                    <div className="row1">
                        <img style={{ width: '50px', borderRadius: '50%' }} src={avatar} alt="Avatar" />
                        <h4>Hi dear, admin@gmail.com</h4>
                    </div>
                    <ul className="row2">
                        <li><Link to="#">New</Link></li>
                        <li><Link to="#">Upload</Link></li>
                        <li><Link to="#">Share</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default AdminDashboard;