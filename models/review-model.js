const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "review is required"],
  },
  rating: {
    type: Number,
    required: [true, "rating is required"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: [true, "user id is required"],
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
    require: [true, "tour id is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
