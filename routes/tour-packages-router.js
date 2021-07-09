const tourPackagesController = require("./../controllers/tour-packages-controller");
const bookingRouter = require("./booking-router");
const express = require("express");
const tourPackagesRouter = express.Router();

tourPackagesRouter.use("/bookings", bookingRouter);

/* tour module routes */
tourPackagesRouter.route("/").get(tourPackagesController.getTours);

tourPackagesRouter.route("/:id").get(tourPackagesController.getTour);

module.exports = tourPackagesRouter;
