const express = require('express');
const router = express.Router();
const notifiController = require('../controller/notification.js');

router.get('/', notifiController.getAllNotifications);
router.get('/unreadcount', notifiController.getUnreadCount);
router.post('/markasread', notifiController.markAsRead);

module.exports = router;
