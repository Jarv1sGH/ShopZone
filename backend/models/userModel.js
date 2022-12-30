const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [25, "Name cannot exceed 30 characters"],
    minLength: [3, "Name should contain atleast 3 characters"],
  },

  email: {
    type: String,
    required: [true, "Please enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should conatain atleast 8 characters"],
    select: false,
  },

  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,

  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JSON WEB TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7 days",
  });
};

//Comparing entered passsword with stored password
userSchema.methods.comparePassword = async function (Password) {
  return await bcrypt.compare(Password, this.password);
};

// Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  //Token Generation
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing using "sha256"{Secure Hash Algorithm}  and adding to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // converting to milliseconds
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
