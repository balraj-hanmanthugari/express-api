const Tour = require('./../models/tour-model');
const Booking = require('./../models/booking-model');
const catchAsync = require('./../util/error-service').catchAsync;

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

exports.getTour = catchAsync(async function(req, res) {
    let tour = await Tour.findOne({category: req.params.id})
    .select('-createdAt -__v')
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