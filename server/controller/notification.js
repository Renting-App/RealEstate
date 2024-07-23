
const Notification = require('../model/notification.js');

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get unread notifications count
const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ isRead: false });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark notifications as read
const markAsRead = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting an array of notification IDs
    await Notification.updateMany({ _id: { $in: ids } }, { isRead: true });
    res.status(200).json({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllNotifications,
  getUnreadCount,
  markAsRead,
};
