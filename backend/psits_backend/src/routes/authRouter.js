import { Router } from "express";
const router = Router();
import {
  login,
  loginWithRFID,
  logout,
  register,
  resetPassword,
  forgotPassword,
} from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
  validateLoginRFIDInput,
} from "../middlewares/validations/authValidation.js";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.post("/login/rfid", validateLoginRFIDInput, loginWithRFID);
router.post("/forgot-password/:userId", forgotPassword);
router.post("/reset-password/:userId/:token", resetPassword);
router.post("/logout", logout);

export default router;
