import { StatusCodes } from "http-status-codes";
import Announcement from "../models/AnnouncementModel.js";
import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";

export const getAllAnnouncement = async (req, res) => {
  const announcements = await Announcement.find({}).populate("author").exec();

  res.status(StatusCodes.OK).json({ announcements });
};

export const createAnnouncement = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  req.body.author = req.user.id;

  const announcement = await Announcement.create(req.body);
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
