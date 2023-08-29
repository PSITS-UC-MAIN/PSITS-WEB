import { Router } from "express";
const router = Router();
import {
  getCurrentUser,
  getAllUser,
  getUserbyId,
  updateUserbyId,
  deleteUserbyId,
} from "../controllers/userController.js";

router.route("/current-user").get(getCurrentUser);
router.route("/").get(getAllUser);
router
  .route("/:userId")
  .get(getUserbyId)
  .patch(updateUserbyId)
  .delete(deleteUserbyId);

export default router;
