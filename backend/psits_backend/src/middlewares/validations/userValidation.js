import { body, param, cookie } from "express-validator";
import { BadRequestError, NotFoundError } from "../../errors/customErrors.js";
import User from "../../models/UserModel.js";
import { withValidationErrors } from "../validationMiddleware.js";

export const validateUserParam = withValidationErrors([
  param("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isLength(8)
    .withMessage("User ID must contain exactly 8 digits")
    .isNumeric()
    .withMessage("User ID must be numeric")
    .custom(async (userId) => {
      const user = await User.findOne({ userId });
      if (!user) throw new NotFoundError("User ID does not exist");
    }),
]);

export const validateUserBodyPatch = withValidationErrors([
  body("userId")
    .optional()
    .custom((userId) => {
      if (userId) throw new BadRequestError("User ID should be removed");
    }),
  body("rfid")
    .optional()
    .isLength({ min: 3 })
    .withMessage("RFID value too short")
    .isNumeric()
    .withMessage("RFID must be numeric"),
  body("firstname")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Firstname must contain at least 2 characters"),
  body("lastname")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Lastname must contain at least 2 characters"),
  body("birthdate")
    .optional()
    .isDate()
    .withMessage("Birthdate must be in YYYY/MM/DD format"),
  body("email").optional().isEmail().withMessage("Email is invalid"),
  body("password")
    .optional()
    .custom((password) => {
      if (password) throw new BadRequestError("Password should be removed");
    }),
  body("profile_img_link")
    .optional()
    .isURL()
    .withMessage("ProfileImageLink value must be a Url"),
  body("course").optional(),
  body("year").optional(),
  body("graduated")
    .optional()
    .isBoolean()
    .withMessage("Graduated value must be of boolean type"),
  body("isAdmin")
    .optional()
    .isBoolean()
    .withMessage("IsAdmin value must be of boolean type"),
]);
