const express = require('express');
const usersControllers = require('../controllers/users-controllers');

// Routing for users-requests to be made here

const router = express.Router();

router.get('/', usersControllers.getAllUsers);

router.get('/:id', usersControllers.getUserById);

router.post('/', usersControllers.createUser);

router.post(':id', usersControllers.updateUserById);

module.exports = router;