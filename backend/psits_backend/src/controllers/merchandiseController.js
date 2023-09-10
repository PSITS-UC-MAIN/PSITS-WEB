import { StatusCodes } from "http-status-codes";
import Merchandise from "../models/MerchandiseModel.js";
import { UnauthorizedError } from "../errors/customErrors.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/UserModel.js";
import { formatImage } from "../middlewares/multerMiddleware.js";

export const getMerchandise = async (req, res) => {
  const merchandise = await Merchandise.find({});

  res.status(StatusCodes.OK).json({ merchandise });
};

export const getMerchandiseById = async (req, res) => {
  const { merchandiseItemId } = req.params;

  const item = await Merchandise.findOne({ name: merchandiseItemId });

  res.status(StatusCodes.OK).json({ item });
};

export const createMerchandiseItem = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  let newBody = { ...req.body };

  if (req.files) {
    let uploadedImages = [];

    newBody = JSON.parse(req.body.merch);
    
    for (let i = 0; i < req.files.length; i++) {
      uploadedImages.push(await formatImage(req.files[i]));
    }
    
    newBody.images = uploadedImages;
  }

  await Merchandise.create(newBody);
  res.status(StatusCodes.OK).json({ msg: "Merchandise Item Created!" });
};

export const updateMerchandiseItemById = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  let newObj = { ...req.body };
  let uploadedImages = [];

  if (req.files.length > 0) {
    for (let i = 0; i < newObj.image.length; i++) {
      await cloudinary.uploader.destroy(newObj.imagePublicId[i]);
    }

    newObj = JSON.parse(req.body.merch);

    for (let i = 0; i < req.files.length; i++) {
      uploadedImages.push(await formatImage(req.files[i]));
    }

    newObj.images = uploadedImages;
  } else {
    for (let i = 0; i < newObj.image.length; i++) {
      uploadedImages.push({
        image: newObj.image[i],
        imagePublicId: newObj.imagePublicId[i],
      });
    }
    newObj = JSON.parse(req.body.merch);
    newObj.images = uploadedImages;
  }

  const updatedMerchandiseItem = await Merchandise.findOneAndUpdate(
    { _id: req.params.merchandiseItemId },
    newObj,
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({
    message: "Merchandise Item updated!",
    merchandiseItem: updatedMerchandiseItem,
  });
};

export const deleteMerchandiseItemById = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const findMerch = await Merchandise.find({
    _id: req.params.merchandiseItemId,
  });
  for (let i = 0; i < findMerch[0].images.length; i++) {
    await cloudinary.uploader.destroy(findMerch[0].images[i].imagePublicId);
  }

  const removedMerchandiseItem = await Merchandise.findOneAndDelete({
    _id: req.params.merchandiseItemId,
  });

  const users = await User.find({}, "cart");
  let itemIndex = null;
  for (let i = 0; i < users.length; i++) {
    itemIndex = users[i].cart.findIndex(
      (item) => item.merchId.toString() === req.params.merchandiseItemId
    );
    users[i].cart.splice(itemIndex);
    await users[i].save();
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Merchandise Item deleted!", removedMerchandiseItem });
};
