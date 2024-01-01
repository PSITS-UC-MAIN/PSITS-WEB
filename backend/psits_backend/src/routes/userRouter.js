import { Router } from "express";
const router = Router();
import {
  getCurrentUser,
  updateCurrentUser,
  getAllUser,
  getAllUserPublic,
  getUserbyId,
  updateUserbyId,
  deleteUserbyId,
} from "../controllers/userController.js";

import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  validateUserBodyPatch,
  validateUserParam,
} from "../middlewares/validations/userValidation.js";
import upload from "../middlewares/multerMiddleware.js";

router
  .route("/current-user")
  .get(authenticateUser, getCurrentUser)
  .patch(upload.single("avatar"), updateCurrentUser);

router.route("/").get(authenticateUser, getAllUser);
router.route("/public").get(getAllUserPublic);

router
  .route("/:userId")
  .get(authenticateUser, validateUserParam, getUserbyId)
  .patch(
    authenticateUser,
    validateUserParam,
    validateUserBodyPatch,
    updateUserbyId
  )
  .delete(authenticateUser, validateUserParam, deleteUserbyId);

export default router;
