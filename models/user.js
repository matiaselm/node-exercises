const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 4 },
    address: { type: String, required: true },
    postalnum: { type: Number, required: true },
    city: { type: String, required: true },
    phonenum: { type: Number, required: true },
    bills: { type: Boolean, default: false, required: true }
})

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema)