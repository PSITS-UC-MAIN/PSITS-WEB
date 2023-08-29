import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ userId: req.user.userId });
  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getAllUser = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const users = await User.find({}, "-password"); // hide password

  res.status(StatusCodes.OK).json({ users });
};

//TODO: Validation for params
export const getUserbyId = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const user = await User.findOne({ userId: req.params.userId }, "-password");

  if (!user) throw new NotFoundError("User not found!");

  res.status(StatusCodes.OK).json({ user });
};

//TODO: Validation for body data
export const updateUserbyId = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  // we don't want to edit the password of user here just in case
  const newObj = { ...req.body };
  delete newObj.password;

  const updatedUser = await User.findOneAndUpdate(
    { userId: req.params.userId },
    newObj,
    {
      new: true,
    }
  );

  if (!updatedUser) throw new NotFoundError("User not found!");

  res
    .status(StatusCodes.OK)
    .json({ message: "User updated!", user: updatedUser });
};

export const deleteUserbyId = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  //TODO: Validation for body data
  const removedUser = await User.findOneAndDelete({
    userId: req.params.userId,
  });

  if (!removedUser) throw new NotFoundError("User not found!");

  res.status(StatusCodes.OK).json({ message: "User deleted!", removedUser });
};
