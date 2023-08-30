import { body, param, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";

export const withValidationErrors = (validateValues) => {
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
