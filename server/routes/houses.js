const router = require('express').Router();
const houseController = require('../controllers/houses.js')


router.post('/addhouse', houseController.addHouse);
router.get('/gethouse', houseController.getAllHouses);
router.get('/gethouse/:id', houseController.getHouseById);
router.delete('/deletehouse/:id',houseController.deleteHouseById);
router.put('/updatehouse/:id',houseController.updateHouseById);


module.exports = router;