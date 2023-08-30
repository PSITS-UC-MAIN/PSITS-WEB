import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
  photo_img_links: {
    type: Array,
    required: false,
    default: new Array(),
  },
});

export default mongoose.model("Announcement", AnnouncementSchema);
