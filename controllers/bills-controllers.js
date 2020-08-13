const HttpError = require('../models/http-error');
const Bill = require('../models/bill');

const createBill = async (req, res, next) => {
    console.log("POST request body: " + req.body);
    const { owner, sum, date, topic, paid } = req.body;
    const createdBill = new Bill({
        owner,
        sum,
        date,
        topic,
        paid
    });

    try {
        await createdBill.save();
    } catch (err) {
        const error = new HttpError(
            'Creating bill failed, please try again ',
            500
        );
        return next(error)
    }
    res
        .status(201)
        .json(createdBill)
};

const updateBillById = async (req, res, next) => {
    const { owner, sum, date, topic, paid } = req.body;
    const billId = req.params._id;
    let bill;

    try {
        bill = await Bill.findById(billId);
    } catch (e) {
        const error = new HttpError(
            'Updating bill failed', 500
        );
        return next(error);
    }
    if (bill) {
        bill.owner = owner;
        bill.sum = sum;
        bill.date = date;
        bill.topic = topic;
        bill.paid = paid;
        try {
            await bill.save();
        } catch (e) {
            const error = new HttpError(
                'Updating bill failed', 500
            );
            return next(error);
        }
    } else {
        const error = new HttpError(
            'Could not find that bill', 404
        );
        return next(error);
    }

    res.json({ bill: bill.toObject({ getters: true }) });
};

const deleteBillById = async (req, res, next) => {
    const billId = req.params._id;
    let bill;
    try {
        bill = await Bill.findById(billId);
    } catch (e) {
        const error = new HttpError(
            'Deleting bill failed', 500
        );
        return next(error);
    }
    if (bill) {
        try {
            await bill.remove();
        } catch (e) {
            const error = new HttpError(
                'Deleting bill failed', 500
            );
            return next(error);
        }
    } else {
        const error = new HttpError(
            'Could not find bill', 404
        );
        return next(error);
    }
    res.status(200).json({ message: 'Deleted bill' });
};

const getAllBills = async (req, res, next) => {
    let bills;
    try {
        bills = await Bill.find();
    } catch (e) {
        const error = new HttpError(
            'Cannot fetch all bills', 500
        );
        return next(error);
    }

    if (!bills || bills.length === 0) {
        const error = new HttpError(
            'Could not find any bills',
            404
        );
        return next(error);
    }
    res.json(bills);
};

const getBillById = async (req, res, next) => {
    const billId = req.params._id;
    let bill;

    try {
        bill = await Bill.findById(billId);
    } catch (e) {
        const error = new HttpError(
            'Cannot find a bill',
            500
        );
        return next(error);
    }

    // If the bill requested doesn't exist
    if (!bill) {
        return next(new HttpError(
            'Bill with given id could not be found',
            404));
    }
    res.json({ bill: bill });
};

exports.getAllBills = getAllBills;
exports.getBillById = getBillById;
exports.createBill = createBill;
exports.updateBillById = updateBillById;
exports.deleteBillById = deleteBillById;