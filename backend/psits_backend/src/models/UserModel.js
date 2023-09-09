import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
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
  image: String,
  name: String
})

export { CartSchema }

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
    type: [CartSchema],
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
  showPublic: {
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
