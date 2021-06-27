const catchAsync = require('./../util/error-service').catchAsync;
const Location = require('../models/location-model');

exports.getLocations = catchAsync(async function(req, res) {
    let locations = await Location.find().sort('-createdAt').select('-createdAt -__v');
    res.status(200).json({
        status: 'success',
        results: locations.length,
        data: {
            locations
        }
    });
});

exports.createLocation = catchAsync(async function(req, res) {
    console.log(req.body);
    let location = await new Location(req.body).save();
    console.log(location);
    res.status(200).json({
        status: 'success',
        data: {
            location
        }
    });
});

exports.getLocation = catchAsync(async function(req, res) {
    let location = await Location.findById(req.params.id).select('-createdAt -__v');
    res.status(200).json({
        status: 'success',
        data: {
            location
        }
    });
});

exports.updateLocation = catchAsync(async function(req, res) {
    let location = await Location.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
        status: 'success',
        data: {
            location
        }
    });
});

exports.deleteLocation = catchAsync(async function(req, res) {
    let location = await Location.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            location
        }
    });
});