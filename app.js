const express = require('express');
const bodyParser = require('body-parser');

const productsRoutes = require('./routes/products-routes');
const ordersRoutes = require('./routes/orders-routes');

const app = express();
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'Unknown error' })
});

/* 
Middleware: 
    - Server listens to requests made by client
    - These middleware components handle those requests 
*/

// Listening to the port 5000
app.listen(5000);