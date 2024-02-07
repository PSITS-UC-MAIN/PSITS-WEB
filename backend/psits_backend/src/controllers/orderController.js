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
    $or: [
      { orderId: { $regex: search, $options: "i" } },
      { orderStatus: { $regex: search, $options: "i" } },
    ],
  })
    .skip(page * limit)
    .limit(limit)
    .populate("userId")
    .sort({ orderDate: "desc" });

  const total = await User.countDocuments({
    orderId: { $regex: search, $options: "i" },
    orderStatus: { $regex: search, $options: "i" },
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

export const getOrderById = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const order = await Order.findOne({ orderId: req.params.orderId });

  res.status(StatusCodes.OK).json({ order });
};

export const getCurrentUserOrders = async (req, res) => {
  const userOrders = await Order.find({ userId: req.params.userId }).sort({
    orderDate: "desc",
  });

  res.status(StatusCodes.OK).json({ userOrders });
};

export const createOrder = async (req, res) => {
  let newBody = { ...req.body };

  newBody.cartItems.forEach((item, index) => {
    item.stocks = item.stocks.filter((a,b) => b === 0);
  })

  const userId = req.params.userId;
  const randomID = nanoid(5);
  const user = await User.findOne({ _id: req.params.userId });

  user.cart = [];

  await user.save();

  newBody.userId = userId;
  newBody.orderId = randomID;

  await Order.create(newBody);

  newBody.cartItems.forEach(async (item) => {
    let merch = null

    merch = await Merchandise.findOne({ _id: item.merchId });

    const filteredSize = merch.stocks.filter((i) => i.size === item.stocks[0].size);
    filteredSize[0].quantity = filteredSize[0].quantity - item.quantity
    
    await merch.save();
  });

  res.status(StatusCodes.OK).json({ msg: "Order created!" });
};

export const updateOrder = async (req, res) => {
  const { orderStatus, additionalInfo, orderId } = req.body;
  
  const updatedOrder = await Order.findOne({ _id: orderId });
  
  if (orderStatus) updatedOrder.orderStatus = orderStatus;
  if (additionalInfo) updatedOrder.additionalInfo = additionalInfo;

  if (updatedOrder.orderStatus == "CANCELLED") {
    let merch = null

    updatedOrder.cartItems.forEach(async (item) => {
      merch = await Merchandise.findOne({ _id: item.merchId });

      let temp = merch.stocks.filter((stock) => stock.size === item.stocks[0].size)
      temp.forEach((stock) => stock.quantity += item.quantity)

      await merch.save();
    });
  }

  await updatedOrder.save();
  res.status(StatusCodes.OK).json({ msg: "Order Updated!" });
};
