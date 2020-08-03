const express = require('express');

// Routing for products-resourses to be made here

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('GET request in products');
    res.json({ message: 'GET working' });
});

module.exports = router;