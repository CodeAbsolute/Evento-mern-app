const ErrorHander = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// to check if the user is logged in or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  console.log("token", token);
  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  // verifying the token and getting the user id
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(`decoded data : ${decodedData}`);
  req.user = await User.findById(decodedData.id);

  next();
});
