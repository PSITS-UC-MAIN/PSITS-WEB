import mongoose, { Schema } from "mongoose";

const OfficeLogModel = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  loginTime: {
    type: Date,
    required: false,
    default: new Date(),
  },
  logoutTime: {
    type: Date,
    required: false,
    default: null,
  },
  remarks: {
    type: String,
    required: true,
    default: "",
  },
});

export default mongoose.model("OfficeLog", OfficeLogModel);
