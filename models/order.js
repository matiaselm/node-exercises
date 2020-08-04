const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderdate: { type: Date, default: Date.now, required: true },
    client: { type: String, required: true },
    productname: { type: String, required: true },
    pcs: { type: Number, required: true }
})

module.exports = mongoose.model('Order', orderSchema)