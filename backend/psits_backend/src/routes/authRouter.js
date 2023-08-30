import { Router } from "express";
const router = Router();
import { login, logout, register } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middlewares/validations/authValidation.js";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;
