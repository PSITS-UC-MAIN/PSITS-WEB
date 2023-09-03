import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  image: String,
  imagePublicId: String,
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
});

export default mongoose.model("Announcement", AnnouncementSchema);
