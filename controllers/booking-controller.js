const catchAsync = require("./../util/error-service").catchAsync;
const Booking = require("./../models/booking-model");
const Tour = require("./../models/tour-model");
const mongoose = require("mongoose");

exports.getBookings = catchAsync(async function (req, res) {
  let bookedTours;
  let userId = req.params.userId;
  if (!req.params.userId) {
    bookedTours = await Booking.find()
      .sort("-createdAt")
      .select("-createdAt -__v");
  } else {
    let bookings = await Booking.find({ user: userId })
      .sort("-createdAt")
      .select("-createdAt -__v");
    let tourIds = [];
    for (let i of bookings) {
      tourIds.push(i.tour);
    }

    bookedTours = await Tour.aggregate([
      {
        $match: { _id: { $in: tourIds } },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: { createdAt: 0, __v: 0 },
      },
      {
        $lookup: {
          from: "locations",
          localField: "locations",
          foreignField: "_id",
          as: "locations",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { guides: "$guides" },
          pipeline: [
            {
              $match: { $expr: { $in: ["$_id", "$$guides"] } },
            },
            {
              $project: { password: 0, createdAt: 0, __v: 0 },
            },
          ],
          as: "guides",
        },
      },
      {
        $lookup: {
          from: "bookings",
          let: { tourId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$user", mongoose.Types.ObjectId(userId)],
                    },
                    {
                      $eq: ["$tour", "$$tourId"],
                    },
                  ],
                },
              },
            },
            {
              $project: { user: 0, tour: 0, createdAt: 0, __v: 0 },
            },
          ],
          as: "bookings",
        },
      },
      {
        $lookup: {
          from: "reviews",
          let: { tourId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$user", mongoose.Types.ObjectId(userId)],
                    },
                    {
                      $eq: ["$tour", "$$tourId"],
                    },
                  ],
                },
              },
            },
            {
              $project: { user: 0, tour: 0, createdAt: 0, __v: 0 },
            },
          ],
          as: "reviews",
        },
      },
    ]);
  }
  //"localField": "_id", "foreignField": "tour"
  res.status(200).json({
    status: "success",
    results: bookedTours.length,
    data: {
      bookings: bookedTours,
    },
  });
});

exports.createBooking = catchAsync(async function (req, res) {
  let booking = await Booking.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      booking: booking,
    },
  });
});

exports.getBooking = catchAsync(async function (req, res) {
  let booking = await Booking.findById(req.params.id).select("-createdAt -__v");
  res.status(200).json({
    status: "success",
    data: {
      booking: booking,
    },
  });
});

exports.updateBooking = catchAsync(async function (req, res) {
  let booking = await Booking.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    data: {
      booking: booking,
    },
  });
});

exports.deleteBooking = catchAsync(async function (req, res) {
  let booking = await Booking.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      booking: booking,
    },
  });
});
