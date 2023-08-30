import { StatusCodes } from "http-status-codes";
import Merchandise from "../models/MerchandiseModel.js";
import { UnauthorizedError } from "../errors/customErrors.js";

export const getMerchandise = async (req, res) => {
  const merchandise = await Merchandise.find({});

  res.status(StatusCodes.OK).json({ merchandise });
};

export const createMerchandiseItem = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  await Merchandise.create(req.body);
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