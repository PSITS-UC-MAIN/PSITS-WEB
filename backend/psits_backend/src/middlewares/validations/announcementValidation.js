import { body, param } from "express-validator";
import { withValidationErrors } from "../validationMiddleware.js";
import AnnouncementModel from "../../models/AnnouncementModel.js";
import { BadRequestError } from "../../errors/customErrors.js";

export const validateAnnouncementBody = withValidationErrors([
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
]);

export const validateAnnouncementId = withValidationErrors([
  param("announcementId")
    .exists()
    .withMessage("Announcement ID must exist")
    .notEmpty()
    .withMessage("Announcement ID is required")
    .isLength(24)
    .withMessage("Announcement ID must contain exactly 24 characters")
    .custom(async (announcementId) => {
      const announcement = await AnnouncementModel.findOne({
        _id: announcementId,
      });
      if (!announcement)
        throw new BadRequestError("Announcement no longer exist");
    }),
]);
