import { Router } from "express";
const router = Router();
import {
  getMerchandise,
  createMerchandiseItem,
  updateMerchandiseItemById,
  deleteMerchandiseItemById
} from "../controllers/merchandiseController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  validateMerchandiseItem,
  validateMerchandiseItemRevision,
  validateMerchandiseItemDeletion
} from "../middlewares/validations/merchandiseValidation.js";
import upload from "../middlewares/multerMiddleware.js";

router.route("/").get(getMerchandise).post(
  authenticateUser,
  // validateMerchandiseItem,
  upload.single('images'),
  createMerchandiseItem
);

router
  .route("/:merchandiseItemId")
  .patch(authenticateUser, validateMerchandiseItemRevision, updateMerchandiseItemById)
  .delete(authenticateUser, validateMerchandiseItemDeletion, deleteMerchandiseItemById);

export default router;
