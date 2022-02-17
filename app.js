const express = require("express");
const app = express();
const ErrorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
// Route imports
const user = require("./routes/user.js");
const event = require("./routes/event.js");

// parsing the body to json format
app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
// parsing the cookies
app.use(cookieParser());
// app.use(cors());

// route middlewares
app.use("/api", user);
app.use("/api", event);

// Middlewares for errors
app.use(ErrorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}

module.exports = app;
