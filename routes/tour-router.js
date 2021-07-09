const tourController = require("./../controllers/tour-controller");
const bookingRouter = require("./booking-router");
const reviewRouter = require("./review-router");
const express = require("express");
const tourRouter = express.Router();

tourRouter.use("/bookings", bookingRouter);
tourRouter.use("/reviews", reviewRouter);

/* tour module routes */
tourRouter
  .route("/")
  .get(tourController.getTours)
  .post(tourController.createTour);

tourRouter
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
