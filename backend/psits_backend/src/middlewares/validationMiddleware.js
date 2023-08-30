import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import mongoose from "mongoose";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        // const firstMessage = errorMessages[0];
        // console.log(Object.getPrototypeOf(firstMessage));
        // if (errorMessages[0].startsWith("Not authorized!")) {
        //   throw new UnauthorizedError("Not authorized to access this route!");
        // }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

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
