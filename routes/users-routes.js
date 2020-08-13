const express = require('express');
const usersControllers = require('../controllers/users-controllers');

// Routing for users-requests to be made here

const router = express.Router();

router.get('/', usersControllers.getAllUsers);

router.get('/:_id', usersControllers.getUserById);

router.post('/', usersControllers.createUser);

router.patch(':_id', usersControllers.updateUserById);

router.delete('/:_id', usersControllers.deleteUserById);

module.exports = router;