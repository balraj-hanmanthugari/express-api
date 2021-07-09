const bookingController = require("./../controllers/booking-controller");
const express = require("express");
const bookingRouter = express.Router({ mergeParams: true });

/* tour module routes */
bookingRouter
  .route("/")
  .get(bookingController.getBookings)
  .post(bookingController.createBooking);

bookingRouter
  .route("/:id")
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = bookingRouter;
