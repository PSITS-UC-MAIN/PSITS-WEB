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

  delete newBody.images;

  if (req.files) {
    let uploadedImages = [];

    newBody = JSON.parse(req.body.announcement);

    for (let i = 0; i < req.files.length; i++) {
      uploadedImages.push(await formatImage(req.files[i]));
    }

    newBody.images = uploadedImages;
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
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const findAnnouncement = await Announcement.find({
    _id: req.params.announcementId,
  });

  for (let i = 0; i < findAnnouncement[0].images.length; i++) {
    await cloudinary.uploader.destroy(
      findAnnouncement[0].images[i].imagePublicId
    );
  }

  const removedAnnouncement = await Announcement.findOneAndDelete({
    _id: req.params.announcementId,
  });

  if (!removedAnnouncement) throw new NotFoundError("Announcement not found!");

  res
    .status(StatusCodes.OK)
    .json({ message: "Announcement deleted!", removedAnnouncement });
};
