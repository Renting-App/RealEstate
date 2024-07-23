const TourRequest = require('../model/req.js');

const createTourRequest = async (req, res) => {
  try {
    const tourRequest = await TourRequest.create(req.body);
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

module.exports = {
  createTourRequest,
  getAllTourRequests,
  getTourRequestById,
  updateTourRequest,
  deleteTourRequest,
};
