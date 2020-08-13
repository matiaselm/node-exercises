const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    address: { type: String, required: true },
    postalnum: { type: Number, required: true },
    city: { type: String, required: true },
    phonenum: { type: Number, required: true }
})

module.exports = mongoose.model('User', userSchema)