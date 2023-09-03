import { StatusCodes } from "http-status-codes";
import Announcement from "../models/AnnouncementModel.js";
import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

export const getAllAnnouncement = async (req, res) => {
  const announcements = await Announcement.find({})
    .sort({ creationDate: "desc" })
    .populate("author")
    .exec();

  res.status(StatusCodes.OK).json({ announcements });
};

export const createAnnouncement = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  let newBody = { ...req.body };
  console.log(newBody);

  if (req.file) {
    console.log(req.file);
    newBody = JSON.parse(req.body.announcement);

    // upload the image to cloudinary
    const response = await cloudinary.uploader.upload(req.file.path);
    // delete the image in the public folder
    await fs.unlink(req.file.path);
    newBody.image = response.secure_url;
    newBody.imagePublicId = response.public_id;
  }

  newBody.author = req.user.id;

  const announcement = await Announcement.create(newBody);
  res.status(StatusCodes.OK).json({ message: "Announcement created!" });
};

export const updateAnnouncementbyId = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  // we don't want to change the author here just in case
  const newObj = { ...req.body };
  delete newObj.author;

  const updatedAnnouncement = await Announcement.findOneAndUpdate(
    { _id: req.params.announcementId },
    newObj,
    {
      new: true,
    }
  );

  if (!updatedAnnouncement) throw new NotFoundError("Announcement not found!");
  res.status(StatusCodes.OK).json({
    message: "Announcement updated!",
    announcement: updatedAnnouncement,
  });
};

export const deleteAnnouncementbyId = async (req, res) => {
  //TODO: Validation for params
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  //TODO: Validation for body data
  const removedAnnouncement = await Announcement.findOneAndDelete({
    _id: req.params.announcementId,
  });

  if (!removedAnnouncement) throw new NotFoundError("Announcement not found!");

  res
    .status(StatusCodes.OK)
    .json({ message: "Announcement deleted!", removedAnnouncement });
};
