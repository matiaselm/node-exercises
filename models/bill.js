const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = new Schema({
    owner: { type: mongoose.Types.ObjectId },
    sum: { type: Number, required: true },
    date: { type: String, default: "2020-04-04", required: true },
    topic: { type: String, default: "no topic", required: true },
    paid: { type: Boolean, default: false, required: true },
})

module.exports = mongoose.model('Bill', billSchema)