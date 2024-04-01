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
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router
  .route("/register")
  .post(
    upload.single("avatar"),
    userRegisterValidator(),
    validate,
    registerUser
  );
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router
  .route("/change-password")
  .post(userChangePasswordValidator(), validate, verifyJWT, changePassword);
router.route("/current-user").get(verifyJWT, currentUser);

export default router;
