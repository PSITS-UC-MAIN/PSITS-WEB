import { StatusCodes } from "http-status-codes";
import Merchandise from "../models/MerchandiseModel.js";
import { UnauthorizedError } from "../errors/customErrors.js";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

export const getMerchandise = async (req, res) => {
  const merchandise = await Merchandise.find({});

  res.status(StatusCodes.OK).json({ merchandise });
};

export const createMerchandiseItem = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  let newBody = { ...req.body };
  
  if (req.file) {
    newBody = JSON.parse(req.body.merch);
    
    // upload the image to cloudinary
    const response = await cloudinary.uploader.upload(req.file.path);
    // delete the image in the public folder
    await fs.unlink(req.file.path);
    newBody.images = [{
      image: response.secure_url,
      imagePublicId: response.public_id
    }]
  }

  await Merchandise.create(newBody);
  res.status(StatusCodes.OK).json({ msg: "Merchandise Item Created!" })
}

export const updateMerchandiseItemById = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const newObj = { ...req.body };

  const updatedMerchandiseItem = await Merchandise.findOneAndUpdate(
    { _id: req.params.merchandiseItemId },
    newObj,
    {
        new: true,
    }
  )

  res.status(StatusCodes.OK).json({
    message: "Merchandise Item updated!",
    merchandiseItem: updatedMerchandiseItem,
  });
}

export const deleteMerchandiseItemById = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const removedMerchandiseItem = await Merchandise.findOneAndDelete({
    _id: req.params.merchandiseItemId,
  });

  res.status(StatusCodes.OK).json({ message: "Merchandise Item deleted!", removedMerchandiseItem });
};