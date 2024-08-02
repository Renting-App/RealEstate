const express = require("express");
const router = express.Router();
const houseController = require("../controller/houses.js");

// Existing routes
router.post("/addhouse", houseController.createHouse);
router.get("/houses", houseController.getAllHouses);
router.get("/houses/:id", houseController.getHouseById);
router.put("/houses/:id", houseController.updateHouseById);
router.delete("/deletehouse/:id", houseController.deleteHouseById);

// New routes for incrementing popular and recommended fields
router.post("/houses/:id/increment-popular", houseController.incrementPopular);
router.post(
  "/houses/:id/increment-recommended",
  houseController.incrementRecommended
);

module.exports = router;
