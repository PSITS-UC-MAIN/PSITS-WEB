import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  avatar: {
    type: String,
    default: process.env.PROFILE_IMG_DEFAULT,
  },
  avatarPublicId: String,
  userId: {
    type: Number,
    required: true,
  },
  rfid: {
    type: String,
    default: "",
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [{}],
  },
  course: {
    type: String,
    default: "BSIT",
  },
  year: {
    type: Number,
    default: 1,
  },
  graduated: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Remove the password in data object when sending the user data
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
