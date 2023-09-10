import { StatusCodes } from "http-status-codes";
import Announcement from "../models/AnnouncementModel.js";
import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";
import { v2 as cloudinary } from "cloudinary";
import { formatImage } from "../middlewares/multerMiddleware.js";

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

  if (req.file) {
    newBody = JSON.parse(req.body.announcement);

    const response = await formatImage(req.file);

    newBody.image = response.image;
    newBody.imagePublicId = response.imagePublicId;
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

  const findAnnouncement = await Announcement.find({
    _id: req.params.announcementId,
  });

  await cloudinary.uploader.destroy(findAnnouncement[0].imagePublicId);

  //TODO: Validation for body data
  const removedAnnouncement = await Announcement.findOneAndDelete({
    _id: req.params.announcementId,
  });

  if (!removedAnnouncement) throw new NotFoundError("Announcement not found!");

  res
    .status(StatusCodes.OK)
    .json({ message: "Announcement deleted!", removedAnnouncement });
};
