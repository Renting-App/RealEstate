const express = require('express');
const router = express.Router();
const reqController = require('../controller/req.js');

router.post('/addreq', reqController.createTourRequest);
router.get('/reqs', reqController.getAllTourRequests);
router.get('/req/:id', reqController.getTourRequestById);
router.put('/updatereq/:id', reqController.updateTourRequest);
router.delete('/deletereq/:id', reqController.deleteTourRequest);

module.exports = router;
