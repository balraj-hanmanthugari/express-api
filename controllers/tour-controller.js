const Tour = require('./../models/tour-model');
const catchAsync = require('./../util/catch-async');

exports.getTours = catchAsync(async function(req, res) {
    let tours = await Tour.find().sort('-createdAt')
    .select('-createdAt -__v')
    .populate({
        path: 'locations',
        select: '-__v -createdAt'
    })
    .populate({
        path: 'guides',
        select: '-__v -createdAt'
    });
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    });
});

exports.createTour = catchAsync(async function(req, res) {
    let tour = await new Tour(req.body).save();
    console.log(tour);
    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });
});

exports.getTour = catchAsync(async function(req, res) {
    let tour = await (await Tour.findById(req.params.id)
    .select('-createdAt -__v'))
    .populate({
        path: 'locations',
        select: '-__v -createdAt'
    })
    .populate({
        path: 'guides',
        select: 'name'
    });

    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });
});

exports.updateTour = catchAsync(async function(req, res) {
    let tour = await Tour.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });
});

exports.deleteTour = catchAsync(async function(req, res) {
    let tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });
});