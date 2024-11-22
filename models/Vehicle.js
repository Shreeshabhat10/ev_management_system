const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    model: { type: String, required: true },
    brand: { type: String, required: true },
    range: { type: Number, required: true },
    price: { type: Number, required: true },
    battery: { type: String, required: true },
    motor: { type: String, required: true }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;