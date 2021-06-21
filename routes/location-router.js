const locationController = require("./../controllers/location-controller");
const express = require('express');
const locationRouter = express.Router();

/* user module routes */
locationRouter
.route('/')
.get(locationController.getLocations)
.post(locationController.createLocation);

locationRouter
.route('/:id')
.get(locationController.getLocation)
.patch(locationController.updateLocation)
.delete(locationController.deleteLocation);

module.exports = locationRouter;
