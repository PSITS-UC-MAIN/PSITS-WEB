import { Router } from "express";
const router = Router();

import {
  getAllOfficeLogs,
  patchOfficeLog,
  postOfficeLog,
} from "../controllers/officeLogController.js";

import {
  validateOfficeLogBody,
  validateOfficeLogHeader,
} from "../middlewares/validations/officeLogValidation.js";

router
  .route("/")
  .get(validateOfficeLogHeader, getAllOfficeLogs)
  .post(validateOfficeLogBody, postOfficeLog)
  .patch(patchOfficeLog);

export default router;
