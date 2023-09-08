import { Router } from "express";
const router = Router();
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  getAllCartItems,
  createCartItem,
  deleteCartItem,
  updateCartItem
} from "../controllers/cartController.js";

router
  .route("/:userId")
  .get(getAllCartItems)
  .post(authenticateUser, createCartItem)
  .patch(authenticateUser, updateCartItem)

router
  .route("/:userId/:merchId")
  .delete(authenticateUser, deleteCartItem);

export default router;
