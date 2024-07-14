const House = require("../models/houses");
const { Op } = require("sequelize");

const addHouse = async (req, res) => {
  try {
    const {
      address,
      price,
      description,
      contact_info,
      category,
      images,
      iduser,
      operation,
      size,
      date_of_creation,
      rooms,
      bathrooms,
      visits,
      amenities,// Include amenities here
      location,
      subLocation,
      favourite
    } = req.body;
    const newHouse = await House.create({
      address,
      price,
      description,
      contact_info,
      category,
      images,
      iduser,
      operation,
      size,
      date_of_creation,
      rooms,
      bathrooms,
      visits,
      amenities,
      location,
      subLocation,
      favourite
    });
    res.status(201).json(newHouse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add house" });
  }
};

const getAllHouses = async (req, res) => {
  try {
    const houses = await House.findAll();
    res.json(houses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getHouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const house = await House.findByPk(id);
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }
    res.json(house);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteHouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await House.destroy({
      where: {
        idhouses: id,
      },
    });
    if (deletedCount === 0) {
      return res.status(404).json({ message: "House not found" });
    }
    res.json({ message: "House deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete house" });
  }
};

const updateHouseById = async (req, res) => {
  const { id } = req.params;
  const {
    address,
    price,
    description,
    contact_info,
    status,
    notification,
    category,
    images,
    operation,
    size,
    date_of_creation,
    rooms,
    bathrooms,
    amenities,
    location,
    subLocation,
    favourite
  } = req.body;

  try {
    let house = await House.findByPk(id);

    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }

    house.address = address;
    house.price = price;
    house.description = description;
    house.contact_info = contact_info;
    house.status = status;
    house.notification = notification;
    house.category = category;
    house.images = images;
    house.operation = operation;
    house.size = size;
    house.date_of_creation = date_of_creation;
    house.rooms = rooms;
    house.bathrooms = bathrooms;
    house.amenities = amenities;
    house.location = location;
    house.subLocation = subLocation;
    house.favourite=favourite

    await house.save();

    res.json(house);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update house" });
  }
};



module.exports = {
  addHouse,
  getAllHouses,
  getHouseById,
  deleteHouseById,
  updateHouseById,
 
};
