const {
  createEvent,
  getAllEvents,
  getMyEvents,
  getSingleEvent,
} = require("../controllers/event");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = require("express").Router();

// create a event route
router.route("/events/create").post(isAuthenticatedUser, createEvent);

// browse all events route
router.route("/events").get(getAllEvents);
// browse all of logged in user details
router.route("/events/me").get(isAuthenticatedUser, getMyEvents);

// browse single events route
router.route("/events/:eid").get(getSingleEvent);
module.exports = router;
