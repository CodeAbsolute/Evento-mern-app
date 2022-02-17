const router = require("express").Router();
const {
  signupUser,
  loginUser,
  getUserDetails,
  logout,
  editProfile,
} = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/auth");

// create a new user
router.route("/signup").post(signupUser);

// login an already registered user
router.route("/login").post(loginUser);

// get user details by id
router.route("/me").get(isAuthenticatedUser, getUserDetails);

// logging out the user
router.route("/logout").get(logout);

// only the logged in user can access this route
// view profile of the logged in user
router.route("/profile").get(isAuthenticatedUser, getUserDetails);

// edit profile of the logged in user
router.route("/profile/edit").put(isAuthenticatedUser, editProfile);

module.exports = router;
