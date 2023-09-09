import { getCurrentUserOrders, getAllOrders, createOrder, updateOrder } from "../controllers/orderController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { Router } from "express";
const router = Router();

router.route("/").get(authenticateUser,getAllOrders)

router
  .route("/:userId")
  .get(authenticateUser,getCurrentUserOrders)
  .patch(authenticateUser,updateOrder)
  .post(authenticateUser,createOrder)

export default router;
