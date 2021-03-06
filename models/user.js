const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    phone: {
      type: Number,
      required: [true, "Please Enter Your Phone Number"],
      unique: true,
      minLength: [10, "Phone Number cannot exceed 10 characters"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password must be atleast than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);
// checking the password before modifying and hashing using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  console.log(this.password);
});

// JWT TOKEN GENERATOR
// this refers to the user object
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// Compare Password
userSchema.methods.comparePassword = async function (password) {
  // console.log(this.password);
  const result1 = await bcrypt.compare(password, this.password);

  // console.log("result1", result2, this.password);
  return result1;
};

module.exports = new mongoose.model("User", userSchema);
