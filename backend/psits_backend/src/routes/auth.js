import express from "express";
import {
  GetUserPassMiddleware,
  GenerateToken,
  GetAuthToken,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", GetUserPassMiddleware, GenerateToken, (req, res) => {
  if (!res.AuthToken)
    return res.status(500).json({
      StatusCode: 500,
      message: "Server failed to generate authentication token.",
    });

  return res
    .status(200)
    .json({ AuthToken: res.AuthToken, StatusCode: 200, message: "Authorized" });
});

router.get("/validate", GetAuthToken, (req, res) => {
  let message = "AuthToken was verified";

  if (res.AuthExpired) {
    message = "AuthToken was expired";
  }
  let expireTime = Math.ceil(res.ExpireTime / 1000 / 60);
  expireTime = expireTime > 0 ? expireTime : 0;

  res.status(200).json({
    IsExpired: res.AuthExpired,
    ExpireTime: `${expireTime} min`,
    message,
    StatusCode: 200,
  });
});

export default router;
