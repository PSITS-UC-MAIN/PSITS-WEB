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
  size: String,
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