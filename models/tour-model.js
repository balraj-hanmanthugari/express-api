const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "tour must have name"],
    },
    duration: {
      type: String,
      required: [true, "tour must have duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "tour should have max group size"],
    },
    category: {
      type: String,
      required: [true, "tour should have category"],
      enum: ["domestic", "international"],
    },
    price: {
      type: Number,
      required: [true, "tour should have price"],
    },
    images: [
      {
        type: String,
      },
    ],
    reviewQuantity: {
      type: Number,
      default: 0,
    },
    ratingAverage: {
      type: Number,
      default: 0,
    },
    startDates: [String],
    locations: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Location",
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const TourModel = mongoose.model("Tour", tourSchema);

module.exports = TourModel;
