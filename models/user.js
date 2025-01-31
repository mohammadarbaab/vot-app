const mongoose = require("mongoose");
// const bcrypt=require('bcrypt');

// Define the person schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  age: {
    type: Number,
    required: true,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  aadharCardNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
