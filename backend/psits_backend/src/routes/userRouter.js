import { Router } from "express";
const router = Router();
import {
  getCurrentUser,
  updateCurrentUser,
  getAllUser,
  getUserbyId,
  updateUserbyId,
  deleteUserbyId,
} from "../controllers/userController.js";
import {
  validateUserBodyPatch,
  validateUserParam,
} from "../middlewares/validations/userValidation.js";
import upload from "../middlewares/multerMiddleware.js";

router
  .route("/current-user")
  .get(getCurrentUser)
  .patch(upload.single("avatar"), updateCurrentUser);

router.route("/").get(getAllUser);

router
  .route("/:userId")
  .get(validateUserParam, getUserbyId)
  .patch(validateUserParam, validateUserBodyPatch, updateUserbyId)
  .delete(validateUserParam, deleteUserbyId);

export default router;
