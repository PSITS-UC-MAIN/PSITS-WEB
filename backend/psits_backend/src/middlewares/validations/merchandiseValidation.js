import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors/customErrors.js";
import Merchandise from '../../models/MerchandiseModel.js'
import { withValidationErrors } from "../validationMiddleware.js";

export const validateMerchandiseItem = withValidationErrors([
  body("name").notEmpty().withMessage("Item name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("images").notEmpty().withMessage("Images are required")
]);

export const validateMerchandiseItemRevision = withValidationErrors([
  body("name").notEmpty().withMessage("Item name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("images").notEmpty().withMessage("Images are required"),
  param("merchandiseItemId")
    .custom(async (merchandiseItemId) => {
      try{
        await Merchandise.findOne({ _id: merchandiseItemId })
      } catch {
        throw new NotFoundError("Merchandise Item not found")        
      }
    })
])

export const validateMerchandiseItemDeletion = withValidationErrors([
  param("merchandiseItemId")
    .custom(async (merchandiseItemId) => {
      try{
        await Merchandise.findOne({ _id: merchandiseItemId })
      } catch {
        throw new NotFoundError("Merchandise Item not found")        
      }
    })
]);