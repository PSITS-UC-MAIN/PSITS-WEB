import { StatusCodes } from "http-status-codes";
import Order from "../models/OrderModel.js";
import User from "../models/UserModel.js";
import Merchandise from "../models/MerchandiseModel.js";
import { nanoid } from "nanoid";

export const getAllOrders = async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 15;
  const search = req.query.search || "";

  const orders = await Order.find({
    $or: [{ orderId: { $regex: search, $options: "i" } }],
  })
    .skip(page * limit)
    .limit(limit)
    .populate("userId")
    .sort({ orderDate: "desc" });

  const total = await User.countDocuments({
    orderId: { $regex: search, $options: "i" },
  });
  const response = {
    error: false,
    total,
    page: page + 1,
    limit,
    orders,
  };

  res.status(StatusCodes.OK).json(response);
};

export const getCurrentUserOrders = async (req, res) => {
  const userOrders = await Order.find({ userId: req.params.userId }).sort({
    orderDate: "desc",
  });

  res.status(StatusCodes.OK).json({ userOrders });
};

export const createOrder = async (req, res) => {
  let newBody = { ...req.body };
  const userId = req.params.userId;
  const randomID = nanoid(5);
  const user = await User.findOne({ _id: req.params.userId });

  user.cart = [];

  await user.save();

  newBody.userId = userId;
  newBody.orderId = randomID;

  await Order.create(newBody);
  res.status(StatusCodes.OK).json({ msg: "Order created!" });
};

export const updateOrder = async (req, res) => {
  const { orderStatus, additionalInfo, orderId } = req.body;
  const updatedOrder = await Order.findOne({ _id: orderId });

  if (orderStatus) updatedOrder.orderStatus = orderStatus;
  if (additionalInfo) updatedOrder.additionalInfo = additionalInfo;

  if (updatedOrder.orderStatus == "CLAIMED") {
    let merch = null;
    updatedOrder.cartItems.forEach(async (item) => {
      merch = await Merchandise.findOne({ _id: item.merchId });
      merch.stocks = merch.stocks - 1;
      await merch.save();
    });
  }

  await updatedOrder.save();
  res.status(StatusCodes.OK).json({ msg: "Order Updated!" });
};
