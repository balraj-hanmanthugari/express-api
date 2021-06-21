const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const LocationModel = mongoose.model('Location', locationSchema);

module.exports = LocationModel;