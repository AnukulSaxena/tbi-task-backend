// Import necessary modules
import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  currentUser,
} from "../controllers/user.controller.js";
import {
  userRegisterValidator,
  userChangePasswordValidator,
} from "../validators/auth/user.validators.js";
import { validate } from "../validators/validate.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Create Express router
const router = Router();

// Route to handle user registration
router.route("/register").post(userRegisterValidator(), validate, registerUser);

// Route to handle user login
router.route("/login").post(loginUser);

// Route to handle user logout
router.route("/logout").post(verifyJWT, logoutUser);

// Route to handle password change
router
  .route("/change-password")
  .post(userChangePasswordValidator(), validate, verifyJWT, changePassword);

// Route to retrieve current user information
router.route("/current-user").get(verifyJWT, currentUser);

// Export router
export default router;
