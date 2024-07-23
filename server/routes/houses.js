const express = require('express');
const router = express.Router();
const houseController = require('../controller/houses.js');

router.post('/addhouse', houseController.createHouse);
router.get('/houses', houseController.getAllHouses);
router.get('/houses/:id', houseController.getHouseById);
router.put('/houses/:id', houseController.updateHouseById);
router.delete('/deletehouse/:id', houseController.deleteHouseById);

module.exports = router;

