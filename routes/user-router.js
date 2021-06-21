const userController = require("./../controllers/user-controller");
const bookingRouter = require('./booking-router');
const reviewRouter = require('./review-router');
const express = require('express');
const userRouter = express.Router();

userRouter.use('/:userId/bookings', bookingRouter);
userRouter.use('/reviews', reviewRouter);

/* user module routes */
userRouter
.route('/')
.get(userController.getUsers)
.post(userController.createUser)

userRouter
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = userRouter;
