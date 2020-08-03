const HttpError = require('../models/http-error');

const TESTORDERS = [
    {
        "id": 1,
        "orderdate": "2020-04-01",
        "client": "Pekka",
        "productname": "Sukset",
        "pcs": 2
    },
    {
        "id": 2,
        "orderdate": "2020-02-01",
        "client": "Maija",
        "productname": "Luistimet",
        "pcs": 1
    }
];

const getAllOrders = (req, res, next) => {
    console.log('GET request in orders');
    res.json(TESTORDERS);
};

const getOrderById = (req, res, next) => {
    const orderid = parseInt(req.params.id);
    const order = TESTORDERS.find(p => {
        return p.id === orderid;
    });

    // If the order requested doesn't exist
    if (!order) {
        return next(new HttpError('Order could not be found', 404))
    }
    res.json({ order });
};

exports.getAllOrders = getAllOrders;
exports.getOrderById = getOrderById;
