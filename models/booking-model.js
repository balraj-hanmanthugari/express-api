const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: [true, 'user id is required']
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        require: [true, 'tour id is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    paid: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const bookingModel = mongoose.model('Booking', bookingSchema);

module.exports = bookingModel;