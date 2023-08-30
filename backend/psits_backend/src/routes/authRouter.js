import { Router } from "express";
const router = Router();
import {
  login,
  loginWithRFID,
  logout,
  register,
} from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
  validateLoginRFIDInput,
} from "../middlewares/validations/authValidation.js";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.post("/login/rfid", validateLoginRFIDInput, loginWithRFID);
router.get("/logout", logout);

export default router;
