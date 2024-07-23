const mongoose = require('mongoose');

const tourRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  selectedVisitDate: {
    type: String,
    required: true,
  },
  residence: {
    title: {
      type: String,
      required: true,
    },
    visits: [String],
  },
});

const TourRequest = mongoose.model('TourRequest', tourRequestSchema);

module.exports = TourRequest;
