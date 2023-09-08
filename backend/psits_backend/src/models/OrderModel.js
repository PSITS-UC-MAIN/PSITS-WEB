import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderModel = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      merchId: {
        type: Schema.Types.ObjectId,
        ref: "Merchandise",
        required: true,
      },
      price: {
        type: String,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
      size: {
        type: String,
        require: true,
      },
      color: String,
    },
  ],
  orderStatus: {
    type: String,
    enum: ["CANCELLED", "PENDING", "CLAIMED"],
    default: "PENDING",
  },
  additionalInfo: {
    type: String,
  },
});

export default mongoose.model("Order", OrderModel);