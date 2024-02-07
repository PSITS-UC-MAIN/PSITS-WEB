import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";

export const getAllCartItems = async (req, res) => {
  // this fetches the current user's cart
  const cartItems = await User.find({ _id: req.params.userId }, "cart");

  res.status(StatusCodes.OK).json(cartItems);
};

export const createCartItem = async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId })
  const newBody = {...req.body}

  if (!user) throw new NotFoundError("User does not exist")

  const itemIndex = user.cart.findIndex(item => item.merchId.toString() === req.body.merchId.toString())

  if (itemIndex === -1) {
    // this adds the object to the existing user's cart array
    user.cart.push(req.body)
  } else user.cart[itemIndex].quantity += 1

  // this saves the changes
  await user.save()
  res.status(StatusCodes.OK).json({ msg: `${req.body.name} Added to Cart!` })
}

export const updateCartItem = async (req, res) => {
  // get the request's attributes
  const { merchId, quantity, size, color } = req.body;

  // check if the user exists
  const user = await User.findOne({ userId: req.params.userId })
  
  if (!user) throw new NotFoundError("User does not exist")

  // // get the index of the cart item based on parameter - merchId
  const itemIndex = user.cart.findIndex(item => item.merchId.toString() === merchId.toString())

  if (itemIndex === -1) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Cart Item not found!" })

  // update the existing values
  if (quantity) {
    if (user.cart[itemIndex].merchId.toString() === merchId && (user.cart[itemIndex].quantity == 1 && quantity == -1))
      user.cart.splice(itemIndex,1)
    else user.cart[itemIndex].quantity += quantity
  }
  // if (size) user.cart[itemIndex].size = size
  if (size) {
    const sortedSizes = user.cart[itemIndex].stocks.slice().sort((a,b) => {
      if (a.size === size) return -1;
      if (b.size === size) return 1;
      return 0
    });

    user.cart[itemIndex].stocks = sortedSizes
  }
  if (color) user.cart[itemIndex].color = color

  // save changes
  await user.save()
  res.status(StatusCodes.OK).json({ msg: "Item Updated!" })
}

export const deleteCartItem = async (req, res) => {
  // check if the user exists
  const user = await User.findOne({ _id: req.params.userId })

  if (!user) throw new NotFoundError("User does not exist")

  // remove the object via merchId
  user.cart.remove({ merchId: req.params.merchId })

  // save changes
  await user.save()
  res.status(StatusCodes.OK).json({ msg: "Item Removed from Cart!" })
}