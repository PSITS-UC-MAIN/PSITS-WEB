import { Router } from "express";
const router = Router();
import {
  getAllAnnouncement,
  createAnnouncement,
  updateAnnouncementbyId,
  deleteAnnouncementbyId,
} from "../controllers/announcementController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .get(getAllAnnouncement)
  .post(authenticateUser, createAnnouncement);

router
  .route("/:announcementId")
  .patch(authenticateUser, updateAnnouncementbyId)
  .delete(authenticateUser, deleteAnnouncementbyId);

export default router;
