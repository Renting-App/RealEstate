const TourRequest = require('../model/req.js');
let notifications = []; 
let unreadCount = 0; 

const createTourRequest = async (req, res) => {
  try {
    const tourRequest = await TourRequest.create(req.body);
   
    notifications.push({
      type: 'Tour Request',
      message: `New tour request from ${req.body.name} for ${req.body.residence.title}`,
      read: false 
    });
    unreadCount++; 
    res.status(200).send(tourRequest);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllTourRequests = async (req, res) => {
  try {
    const tourRequests = await TourRequest.find();
    res.status(200).send(tourRequests);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getTourRequestById = async (req, res) => {
  try {
    const tourRequest = await TourRequest.findById(req.params.id);
    if (!tourRequest) {
      return res.status(404).send({ message: 'Tour request not found' });
    }
    res.status(200).send(tourRequest);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateTourRequest = async (req, res) => {
  try {
    const tourRequest = await TourRequest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tourRequest) {
      return res.status(404).send({ message: 'Tour request not found' });
    }
    res.status(200).send(tourRequest);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteTourRequest = async (req, res) => {
  try {
    const tourRequest = await TourRequest.findByIdAndDelete(req.params.id);
    if (!tourRequest) {
      return res.status(404).send({ message: 'Tour request not found' });
    }
    res.status(200).send({ message: 'Tour request deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getNotifications = async (req, res) => {
  try {
    res.status(200).send({ notifications, unreadCount });
  } catch (error) {
    res.status(400).send(error);
  }
};

const markNotificationsAsRead = async (req, res) => {
  try {
    notifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    unreadCount = 0; 
    res.status(200).send({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createTourRequest,
  getAllTourRequests,
  getTourRequestById,
  updateTourRequest,
  deleteTourRequest,
  getNotifications,
  markNotificationsAsRead 
};
