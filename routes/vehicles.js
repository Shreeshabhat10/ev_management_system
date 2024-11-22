const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// Get All Vehicles
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add New Vehicle
router.post('/', async (req, res) => {
    const vehicle = new Vehicle(req.body);
    try {
        const newVehicle = await vehicle.save();
        res.status(201).json(newVehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;