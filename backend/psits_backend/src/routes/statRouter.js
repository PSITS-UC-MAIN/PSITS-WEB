import { Router } from "express";
const router = Router();
import { getAllStats } from "../controllers/statController.js";

router.route("/").get(getAllStats);

export default router;
