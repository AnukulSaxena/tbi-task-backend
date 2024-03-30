import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { userRegisterValidator } from "../validators/auth/user.validators.js";
import { validate } from "../validators/validate.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  userRegisterValidator(),
  validate,
  registerUser
);
export default router;
