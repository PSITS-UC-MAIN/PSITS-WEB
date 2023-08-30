import { Router } from "express";
const router = Router();
import {
  getMerchandise,
  createMerchandiseItem,
  updateMerchandiseItemById,
  deleteMerchandiseItemById
} from "../controllers/merchandiseController.js";
import authenticateUser from "./authRouter.js"
import {
  validateMerchandiseItem,
  validateMerchandiseItemRevision,
  validateMerchandiseItemDeletion
} from "../middlewares/merchandiseMiddleware.js";

router.route("/").get(getMerchandise).post(authenticateUser, validateMerchandiseItem, createMerchandiseItem);

router
  .route("/:merchandiseItemId")
  .patch(authenticateUser, validateMerchandiseItemRevision, updateMerchandiseItemById)
  .delete(authenticateUser, validateMerchandiseItemDeletion, deleteMerchandiseItemById);

export default router;
