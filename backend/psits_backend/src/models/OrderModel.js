import mongoose from "mongoose";
import { CartSchema } from "./UserModel.js";
const Schema = mongoose.Schema;

const OrderModel = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  cartItems: [CartSchema],
  orderStatus: {
    type: String,
    enum: ["ORDERED", "PENDING", "CLAIMED", "CANCELLED"],
    default: "ORDERED",
  },
  additionalInfo: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Order", OrderModel);
