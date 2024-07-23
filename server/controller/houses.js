const House = require('../model/houses.js');


exports.createHouse = async (req, res) => {
  try {
    const newHouse = await House.create(req.body);
    res.status(200).json(newHouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllHouses = async (req, res) => {
  try {
    const houses = await House.find().populate('iduser');
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id).populate('iduser');
    if (!house) return res.status(404).json({ message: 'House not found' });
    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateHouseById = async (req, res) => {
  try {
    const updatedHouse = await House.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHouse) return res.status(404).json({ message: 'House not found' });
    res.status(200).json(updatedHouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteHouseById = async (req, res) => {
  try {
    const deletedHouse = await House.findByIdAndDelete(req.params.id);
    if (!deletedHouse) return res.status(404).json({ message: 'House not found' });
    res.status(200).json({ message: 'House deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};