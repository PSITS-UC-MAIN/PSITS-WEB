import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import { BadRequestError } from "../errors/customErrors.js";

export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ message: "User account created!" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ userId: req.body.userId });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser)
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Invalid credentials." });

  const token = createJWT({
    userId: user.userId,
    isAdmin: user.isAdmin,
    id: user._id,
  });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ message: "User logged in!" });
};

export const loginWithRFID = async (req, res) => {
  const user = await User.findOne({ rfid: req.body.rfid });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser)
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Invalid credentials." });

  const token = createJWT({
    userId: user.userId,
    isAdmin: user.isAdmin,
    id: user._id,
  });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ message: "User logged in!" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ message: "User logged out!" });
};
