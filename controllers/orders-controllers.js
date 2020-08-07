const HttpError = require('../models/http-error');
const Order = require('../models/order');

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

const createOrder = async (req, res, next) => {
    console.log("POST request body: " + req.body);
    const { orderdate, client, productname, pcs } = req.body;
    const createdOrder = new Order({
        orderdate,
        client,
        productname,
        pcs
    });

    try {
        await createdOrder.save();
    } catch (err) {
        const error = HttpError(
            'Creating order failed, please try again ',
            500
        );
        return next(error)
    }
    res
        .status(201)
        .json(createdOrder)
};

const updateOrderById = (req, res, next) => {
    const { pcs } = req.body;
    const orderId = parseInt(req.params.id);

    const updatedOrder = { ...TESTORDERS.find(p => p.id === orderId) };

    const orderIndex = TESTORDERS.findIndex(p => p.id === orderId);
    updatedOrder.pcs = pcs;

    TESTORDERS[orderIndex] = updatedOrder;

    res.status(200)
        .json({ order: updatedOrder });
};

const deleteOrderById = (req, res, next) => {
    const orderId = parseInt(req.params.id);
    TESTORDERS = TESTORDERS.filter(p => p.id !== orderId);
    console.log(TESTORDERS);
    res
        .status(200)
        .json({ message: 'Deleted order' });
};

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
        return next(new HttpError('Order with given id could not be found', 404))
    }
    res.json({ order });
};

exports.getAllOrders = getAllOrders;
exports.getOrderById = getOrderById;
exports.createOrder = createOrder;
exports.updateOrderById = updateOrderById;
exports.deleteOrderById = deleteOrderById;