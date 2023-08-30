import { body } from "express-validator";
import { BadRequestError } from "../../errors/customErrors.js";
import User from "../../models/UserModel.js";
import { withValidationErrors } from "../validationMiddleware.js";

export const validateRegisterInput = withValidationErrors([
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isLength(8)
    .withMessage("User ID must contain exactly 8 digits")
    .custom(async (userId) => {
      const user = await User.findOne({ userId });
      if (user) throw new BadRequestError("User ID already exists");
    }),
  body("firstname").notEmpty().withMessage("Firstname is required"),
  body("lastname").notEmpty().withMessage("Lastname is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("Email already exists");
    }),
  body("course").notEmpty().withMessage("Course is required"),
  body("year").notEmpty().withMessage("Year is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .isLength({ min: 6 })
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password and confirmPassword do not match"),
]);

export const validateLoginInput = withValidationErrors([
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isLength(8)
    .withMessage("User ID must contain exactly 8 digits"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]);
