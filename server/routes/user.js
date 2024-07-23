const express = require('express');
const router = express.Router();
const userController = require('../controller/user.js');

router.post('/adduser', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
