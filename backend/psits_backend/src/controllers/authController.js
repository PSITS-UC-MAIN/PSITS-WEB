import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import {
  createJWT,
  createJWTResetPassword,
  verifyJWT,
} from "../utils/tokenUtils.js";
import { sendMail } from "../utils/mailerUtils.js";

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
    sameSite: "lax",
  });
  res.status(StatusCodes.OK).json({ message: "User logged in!" });
};

// office management route
export const loginWithRFID = async (req, res) => {
  const user = await User.findOne({ rfid: req.body.rfid });

  let isValidUser = null;
  if (req.body.password)
    isValidUser =
      user && (await comparePassword(req.body.password, user.password));
  else isValidUser = user;

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
    sameSite: "none",
  });
  res.status(StatusCodes.OK).json({ message: "User logged in!", token });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ message: "User logged out!" });
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ userId: req.params.userId });

  if (!user)
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "User not found!." });

  const token = createJWTResetPassword({
    userId: user.userId,
    id: user._id,
  });

  // // we multiply to 1000 to make it milliseconds
  // const oneHour = 1000 * 60 * 60;

  // res.cookie("token", token, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + oneHour),
  //   secure: process.env.NODE_ENV === "production",
  // });

  try {
    sendMail({
      token,
      userId: user.userId,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ message: "Something went wrong!" });
  }

  res.status(StatusCodes.OK).json({ message: " successfully!" });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;

  console.log(req.body);
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const { userId } = verifyJWT(token);

  const user = await User.findOneAndUpdate(
    { userId: userId },
    { password: req.body.password }
  );

  if (!user)
    return res
      .status(StatusCodes.CONFLICT)
      .json({ message: "User not found!." });

  res.status(StatusCodes.OK).json({ message: "Reset password successfully!" });
};
