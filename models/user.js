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

userSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) return next();
  {
    try {
      // hash Password generation
      const salt = await bcrypt.genSalt(10);
      // hashes password generation
      const hashedPassword = await bcrypt.hash(person.password, salt);

      // override the plain password with the hashed one
      person.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  }
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
