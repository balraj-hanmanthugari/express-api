const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../util/error-service").catchAsync;

exports.checkEmailId = catchAsync(async function(req, res) {
  let isEmailExists = false;
  const user = await User.findOne({
    emailId: req.body.emailId
  });
  res.status(200).json({
    status: "success",
    data: {
      isEmailExists: user ? true : false
    }
  });
});

exports.registerUser = catchAsync(async function(req, res) {
  const userModel = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
    password: req.body.password
  });
  let user = await userModel.save();
  res.status(200).json({
    status: "success",
    data: {
      user: user
    }
  });
});

exports.loginUser = catchAsync(async function(req, res) {
  let token;
  let user = await User.findOne({
    emailId: req.body.emailId,
    password: req.body.password
  });
  if (user) {
    token = jwt.sign({ subject: req.body.emailId }, "secret");
  } else [(token = null)];
  res.status(200).json({
    status: "success",
    data: {
      token: token,
      user: user
    }
  });
});

exports.logoutUser = function(req, res) {
  res.status(200).json({
    status: "success",
    data: {}
  });
};
