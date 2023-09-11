import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import { v2 as cloudinary } from "cloudinary";
import { formatImage } from "../middlewares/multerMiddleware.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ userId: req.user.userId });
  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateCurrentUser = async (req, res) => {
  let newUser = { ...req.body };
  delete newUser.password;
  delete newUser.avatar;

  if (req.file) {
    const file = await formatImage(req.file);
    newUser = JSON.parse(req.body.user);

    newUser.avatar = file.image;
    newUser.avatarPublicId = file.imagePublicId;
  }

  const updatedUser = await User.findOneAndUpdate(
    { userId: req.user.userId },
    newUser
  );

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ message: "Profile updated!" });
};

export const getAllUser = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const users = await User.find({}, "-password"); // hide password

  res.status(StatusCodes.OK).json({ users });
};

export const getUserbyId = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const user = await User.findOne({ userId: req.params.userId }, "-password");

  if (!user) throw new NotFoundError("User not found!");

  res.status(StatusCodes.OK).json({ user });
};

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

  const removedUser = await User.findOneAndDelete({
    userId: req.params.userId,
  });

  if (!removedUser) throw new NotFoundError("User not found!");

  res.status(StatusCodes.OK).json({ message: "User deleted!", removedUser });
};
