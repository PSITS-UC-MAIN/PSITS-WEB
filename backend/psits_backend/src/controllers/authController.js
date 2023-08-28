import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  //TODO: Validation for body data

  const existingUserId = await User.findOne({ user_id: req.body.user_id });
  const existingMail = await User.findOne({ email: req.body.email });

  if (existingUserId) {
    return res.status(StatusCodes.CONFLICT).json({
      message:
        "Failed to created account, id is already exists in the database.",
    });
  } else if (existingMail) {
    return res.status(StatusCodes.CONFLICT).json({
      message:
        "Failed to created account, email is already exists in the database.",
    });
  }

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User account created!" });
};

export const login = async (req, res) => {
  //TODO: Validation for body data

  const user = await User.findOne({ user_id: req.body.user_id });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser)
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "Invalid credentials." });

  const token = createJWT({ userId: user.user_id, isAdmin: user.isAdmin });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "User logged in!" });
};

export const logout = (req, res) => {
  //TODO: Validation for body data

  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out!" });
};
