import { StatusCodes } from 'http-status-codes';
import Order from '../models/OrderModel.js'
import User from '../models/UserModel.js'
import Merchandise from '../models/MerchandiseModel.js';

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).sort({ orderDate: "desc" });

  res.status(StatusCodes.OK).json({ orders });
};

export const getCurrentUserOrders = async (req, res) => {
  const userOrders = await Order.find({ userId: req.params.userId }).sort({ orderDate: "desc" });
  
  res.status(StatusCodes.OK).json({ userOrders });
}

export const createOrder = async (req, res) => {
  let newBody = {...req.body};
  const userId = req.params.userId;
  const user = await User.findOne({ _id: req.params.userId });

  user.cart = [];

  await user.save();

  newBody.userId = userId;

  await Order.create(newBody);
  res.status(StatusCodes.OK).json({ msg: "Order created!" });
}

export const updateOrder = async (req, res) => {
  const { orderStatus, additionalInfo, orderId } = req.body;
  const updatedOrder = await Order.findOne({ _id: orderId });

  if (orderStatus) updatedOrder.orderStatus = orderStatus;
  if (additionalInfo) updatedOrder.additionalInfo = additionalInfo;
  
  if (updatedOrder.orderStatus == "CLAIMED") {
    let merch = null
    updatedOrder.cartItems.forEach(async item => {
      merch = await Merchandise.findOne({ _id: item.merchId });
      merch.stocks = merch.stocks - 1;
      await merch.save();
    })
  }

  await updatedOrder.save();
  res.status(StatusCodes.OK).json({ msg: "Order Updated!" });
}