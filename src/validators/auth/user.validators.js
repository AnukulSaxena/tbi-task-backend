// Import necessary modules
import { body } from "express-validator";

// Define userRegisterValidator function to validate user registration data
const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Invalid Email"),
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

// Define userChangePasswordValidator function to validate password change data
const userChangePasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage("New password is required"),
  ];
};

// Export validation functions
export { userRegisterValidator, userChangePasswordValidator };
