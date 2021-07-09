const reviewController = require("./../controllers/review-controller");
const express = require("express");
const reviewRouter = express.Router({ mergeParams: true });

/* tour module routes */
reviewRouter
  .route("/")
  .get(reviewController.getReviews)
  .post(reviewController.createReview);

reviewRouter
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = reviewRouter;
