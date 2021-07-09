const catchAsync = require("./../util/error-service").catchAsync;
const Review = require("../models/review-model");
const Tour = require("./../models/tour-model");
const mongoose = require("mongoose");

exports.getReviews = catchAsync(async function (req, res) {
  let reviews = await Review.find()
    .sort("-createdAt")
    .select("-createdAt -__v");
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews: reviews,
    },
  });
});

exports.createReview = catchAsync(async function (req, res) {
  let review = await new Review(req.body).save();

  let tourRatings = await Review.aggregate([
    {
      $match: { tour: mongoose.Types.ObjectId(req.body.tour) },
    },
    {
      $group: {
        _id: "$tour",
        ratingAverage: { $avg: "$rating" },
        reviewQuantity: { $sum: "$rating" },
      },
    },
  ]);

  let updatedTourRating = await Tour.findByIdAndUpdate(
    tourRatings[0]._id,
    {
      ratingAverage: tourRatings[0].ratingAverage,
      reviewQuantity: tourRatings[0].reviewQuantity,
    },
    {
      upsert: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      review: review,
    },
  });
});

exports.getReview = catchAsync(async function (req, res) {
  let review = await Review.findById(req.params.id).select("-createdAt -__v");
  res.status(200).json({
    status: "success",
    data: {
      review: review,
    },
  });
});

exports.updateReview = catchAsync(async function (req, res) {
  let review = await Review.findByIdAndUpdate(req.params.id, req.body);

  let tourRatings = await Review.aggregate([
    {
      $match: { tour: mongoose.Types.ObjectId(req.body.tour) },
    },
    {
      $group: {
        _id: "$tour",
        ratingAverage: { $avg: "$rating" },
      },
    },
  ]);

  let updatedTourRating = await Tour.findByIdAndUpdate(
    tourRatings[0]._id,
    {
      ratingAverage: tourRatings[0].ratingAverage,
      reviewQuantity: tourRatings[0].reviewQuantity,
    },
    {
      upsert: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      review: review,
    },
  });
});

exports.deleteReview = catchAsync(async function (req, res) {
  let review = await Review.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      review: review,
    },
  });
});
