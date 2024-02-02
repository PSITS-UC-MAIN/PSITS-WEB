import {
  getCurrentUserOrders,
  getAllOrders,
  createOrder,
  updateOrder,
  getOrderById,
} from "../controllers/orderController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { Router } from "express";
const router = Router();

router.route("/").get(authenticateUser, getAllOrders);

router
  .route("/:userId")
  .get(authenticateUser, getCurrentUserOrders)
  .patch(authenticateUser, updateOrder)
  .post(authenticateUser, createOrder);

router.route("/single/:orderId").get(authenticateUser, getOrderById);

export default router;
