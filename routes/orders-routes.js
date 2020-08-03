const express = require('express');
const ordersControllers = require('../controllers/orders-controllers');

// Routing for orders-resourses to be made here

const router = express.Router();


router.get('/', ordersControllers.getAllOrders);

router.get('/:id', ordersControllers.getOrderById);

module.exports = router;