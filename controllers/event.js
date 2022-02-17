const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Event = require("../models/event");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");

// Create event -- Admin
exports.createEvent = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  // console.log(
  //   "req.body.images: ",
  //   req.body.eventImages,
  //   "req.body.eventImages.length: ",
  //   req.body.eventImages.length
  // );
  if (typeof req.body.eventBannerImage === "string") {
    images.push(req.body.eventBannerImage);
  } else {
    images = req.body.eventBannerImage;
  }
  // console.log("images: ", images);

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "event-images",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  // console.log("req.body: ", req.body);

  req.body.eventBannerImage = imagesLinks;
  req.body.user = req.user.id;
  // create a new event and save it to the database
  const event = new Event(req.body);
  await event.save();
  console.log("event :>> ", event);
  res.status(201).json({
    success: true,
    event,
  });
});

// getting all events from database
exports.getAllEvents = catchAsyncErrors(async (req, res, next) => {
  // for pagination
  // const resultPerPage = 4;
  const getEvents = await Event.find();

  console.log("events: ", getEvents);

  res.status(200).json({
    success: true,
    events: getEvents,
    eventsCount: getEvents.length,
  });
});

// getting logged in user events
exports.getMyEvents = catchAsyncErrors(async (req, res, next) => {
  // finding the event from the events db
  console.log("inside route", req.body, req.user.id);

  let event = await Event.find({ user: req.user.id });
  console.log(`event: ${event}`);
  if (!event) next(new ErrorHandler("No Events Yet ! Create One", 404));
  res.status(200).json({
    success: true,
    message: "My Created events.",
    events: event,
  });
});
// getting a single event details
exports.getSingleEvent = catchAsyncErrors(async (req, res, next) => {
  // finding the event from the events db
  console.log("inside route", req.body, req.params);

  let event = await Event.findById(req.params.eid);
  console.log(`event: ${event}`);
  if (!event) next(new ErrorHandler("couldn't find event", 404));
  res.status(200).json({
    success: true,
    message: "event Details: ",
    event,
  });
});
