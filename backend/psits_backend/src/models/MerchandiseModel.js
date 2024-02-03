import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["XS", "SM", "MD", "LG", "XL", "XXL"],
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

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
  stocks: [StockSchema],
  images: [ImageSchema],
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
