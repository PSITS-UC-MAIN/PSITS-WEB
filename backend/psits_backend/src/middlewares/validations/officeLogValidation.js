import { body, header } from "express-validator";
import { withValidationErrors } from "../validationMiddleware.js";

export const validateOfficeLogHeader = withValidationErrors([
  header("option").optional(),
  header("maxval")
    .default(new Date().toISOString())
    .isISO8601()
    .withMessage("MaxVal must be of Date.ISO_String"),
  header("minval")
    .default(
      new Date(new Date().setDate(new Date().getDate() - 2)).toISOString()
    )
    .isISO8601()
    .withMessage("MaxVal must be of Date.ISO_String"),
]);

export const validateOfficeLogBody = withValidationErrors([
  body("remarks")
    .notEmpty()
    .withMessage("Remarks is required")
    .isLength({ min: 3 })
    .withMessage("Remarks must contain at least 3 characters"),
]);
