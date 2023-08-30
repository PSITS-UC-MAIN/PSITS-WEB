import { Router } from "express";
const router = Router();
import {
  getAllAnnouncement,
  createAnnouncement,
  updateAnnouncementbyId,
  deleteAnnouncementbyId,
} from "../controllers/announcementController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  validateAnnouncementBody,
  validateAnnouncementId,
} from "../middlewares/validations/announcementValidation.js";

router
  .route("/")
  .get(getAllAnnouncement)
  .post(authenticateUser, validateAnnouncementBody, createAnnouncement);

router
  .route("/:announcementId")
  .patch(
    authenticateUser,
    validateAnnouncementId,
    validateAnnouncementBody,
    updateAnnouncementbyId
  )
  .delete(authenticateUser, validateAnnouncementId, deleteAnnouncementbyId);

export default router;
