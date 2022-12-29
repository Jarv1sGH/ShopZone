const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authRole } = require("../middleware/authCheck");
//User Routes
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/logout").get(logout);

router.route("/admin/users").get(isAuthenticatedUser, authRole("admin"), getAllUsers);

router.route("/admin/user/:id").get(isAuthenticatedUser, authRole("admin"), getSingleUser);

router.route("/admin/user/:id").put(isAuthenticatedUser, authRole("admin"), updateUserRole);

router.route("/admin/user/:id").delete(isAuthenticatedUser, authRole("admin"), deleteUser);





module.exports = router;
