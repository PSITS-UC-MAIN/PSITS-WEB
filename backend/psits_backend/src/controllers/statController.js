import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Order from "../models/OrderModel.js";
import Announcement from "../models/AnnouncementModel.js";
import Event from "../models/EventModel.js";
import Merchandise from "../models/MerchandiseModel.js";

export const getAllStats = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const users = await User.countDocuments();
  const orders = await Order.countDocuments();
  const announcements = await Announcement.countDocuments();
  const events = await Event.countDocuments();
  const merchandise = await Merchandise.countDocuments();

  res
    .status(StatusCodes.OK)
    .json({ users, orders, announcements, events, merchandise });
};
