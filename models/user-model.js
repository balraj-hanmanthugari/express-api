const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "user must have first name"],
  },
  lastName: {
    type: String,
    required: [true, "user must have last name"],
  },
  emailId: {
    type: String,
    required: [true, "user must have emailId"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "user must have password"],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "guide", "admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
