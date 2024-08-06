import React, { useState, useEffect } from 'react';
import { Link,Navigate,useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { firestore } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
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

const Dashboard = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    const toggleNotification = () => {
        setShowNotification(!showNotification);
        if (!showNotification) {
            markNotificationsAsRead();
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await fetch('http://localhost:5800/notifications');
            const data = await response.json();
            setNotifications(data.notifications);
            setUnreadCount(data.unreadCount);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markNotificationsAsRead = async () => {
        try {
            await fetch('http://localhost:5800/notifications/mark-as-read', {
                method: 'POST'
            });
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };
    const fetchUserCount = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'users'));
            setUserCount(querySnapshot.size);
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };

    const Logout = async () => {
        try {
            await auth.signOut();
            Navigate('/signin');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        fetchUserCount();
    }, []);

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
                    <li><Link to="/ManagePosts"><img src={postRequestIcon} alt="Post Request" />Post Request</Link></li>
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
                    <div className="user-count">
                    <h2>Total Users: {userCount}</h2>
                </div>
                    <div className="end">
                        <div style={{ position: 'relative' }}>
                            <img src={alarmIcon} alt="Alarm Icon" onClick={toggleNotification} />
                            {unreadCount > 0 && (
                                <span className="notification-counter">{unreadCount}</span>
                            )}
                        </div>
                        <img style={{ width: '50px', borderRadius: '50%' }} src={avatar} alt="Avatar" />
                        <p className="bold">Admin</p>
                        <button onClick={Logout}>Logout</button>

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

                {showNotification && (
                    <div className="notification">
                        <p>New Post Request Notification</p>
                        <ul>
                            {notifications.map((notification, index) => (
                                <li key={index}>{notification.message}</li>
                            ))}
                        </ul>
                    </div>
                )}
                 
            </div>
        </div>
    );
};

export default Dashboard;
