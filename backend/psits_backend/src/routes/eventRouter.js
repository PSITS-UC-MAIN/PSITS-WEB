import { Router } from "express";
const router = Router();
import {
  getAllEvents,
  createEvent,
  updateEventbyId,
  deleteEventbyId,
} from "../controllers/eventController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

router.route("/").get(getAllEvents).post(authenticateUser, createEvent);

router
  .route("/:eventId")
  .patch(authenticateUser, updateEventbyId)
  .delete(authenticateUser, deleteEventbyId);

export default router;
