import mongoose from "mongoose";
import { GenerateReference } from "../utils/ServerUtils.js";
const Schema = mongoose.Schema;

const OrderModel = new mongoose.Schema({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  merch_id: {
    type: Schema.Types.ObjectId,
    ref: "Merchandise",
    required: true,
  },
  price: {
    type: Number,
    required: false,
    default: 0,
  },
  reference: {
    type: String,
    required: false,
    default: GenerateReference(),
  },
  information: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: false,
    default: "N/A",
  },
  color: {
    type: String,
    required: false,
    default: "N/A",
  },
  style: {
    type: String,
    required: false,
    default: "N/A",
  },
  status: {
    type: String,
    required: false,
    default: "ORDERED",
  },
  review: {
    type: String,
    required: false,
    default: "",
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  quantity: {
    type: Number,
    required: false,
    default: 1,
  },
});

export default mongoose.model("Order", OrderModel);
