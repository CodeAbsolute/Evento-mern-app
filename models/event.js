const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, "Please Enter Your event Name"],
      maxLength: [50, "event Name cannot exceed 50 characters"],
    },
    eventDescription: {
      type: String,
      required: [true, "Please Enter Your event Description"],
      maxLength: [500, "event Description cannot exceed 30 characters"],
    },
    eventPrice: {
      type: Number,
      default: 0,
      max: [10000, "event Price cannot exceed 10000"],
    },
    eventBannerImage: [
      {
        public_id: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          // required: true,
        },
      },
    ],
    eventType: [
      {
        type: String,
        required: [true, "Please Enter Your event Type"],
      },
    ],
    eventDateandTime: {
      type: Date,
      required: [true, "Please Enter Your event Date and Time"],
    },
    eventAddress: {
      type: String,
      required: [true, "Please Enter Your event Address"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Event", eventSchema);
