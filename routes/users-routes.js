const express = require('express');
const usersControllers = require('../controllers/users-controllers');

// Routing for users-requests to be made here

const router = express.Router();

router.get('/', usersControllers.getAllUsers);

router.get('/:_id', usersControllers.getUserById);

router.get('/uid/:uid', usersControllers.getUserByUid);

router.get('/phone/:phonenum', usersControllers.getUsersByPhone);

router.get('/name/:name', usersControllers.getUsersByName);

router.post('/login/', usersControllers.login);

router.post('/', usersControllers.createUser);

router.patch('/:_id', usersControllers.updateUserById);

router.delete('/:_id', usersControllers.deleteUserById);

module.exports = router;