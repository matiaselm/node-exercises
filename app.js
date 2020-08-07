const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require('./routes/products-routes');
const ordersRoutes = require('./routes/orders-routes');
const HttpError = require('./models/http-error');

const app = express();

// For POST-methods to work
app.use(bodyParser.json());

// Allow CORS-requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next(); //Continue to the next middleware
});

app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find route', 404);
    throw error;
});

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

mongoose
    .connect('mongodb+srv://dbuser:7uggMUxVa7s8Ki4@cluster0.mz3t1.gcp.mongodb.net/OrderDB?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {
        app.listen(5000);
    })
    .catch((e) => {
        return console.log(e);
    });