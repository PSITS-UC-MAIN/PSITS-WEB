import mongoose from "mongoose";

const SchoolEventModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: false,
    default: new Date(),
  },
  eventDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  content: {
    type: String,
    required: true,
  },
  photo_img_links: {
    type: Array,
    required: false,
    default: new Array(),
  },
});

export default mongoose.model("SchoolEvent", SchoolEventModel);
