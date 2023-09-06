import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  imagePublicId: {
    type: String,
    required: true,
  },
});

const MerchandiseModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  stocks: {
    type: Number,
    default: 0,
  },
  images: [ImageSchema],
  size: {
    type: String,
    enum: ["small", "medium", "large", "extra-large"],
    default: "small",
  },
  color: String,
  ratings: {
    type: Number,
    default: 0,
  },
  showPublic: {
    type: Boolean,
  },
});

export default mongoose.model("Merchandise", MerchandiseModel);