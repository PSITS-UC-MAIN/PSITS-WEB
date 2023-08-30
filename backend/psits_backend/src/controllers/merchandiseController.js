import { StatusCodes } from "http-status-codes";
import Merchandise from "../models/MerchandiseModel.js";

export const getMerchandise = async (req, res) => {
  const merchandise = await Merchandise.find({});

  res.status(StatusCodes.OK).json({ merchandise });
};

export const createMerchandiseItem = async (req, res) => {
  await Merchandise.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Merchandise Item Created!" })
}

export const updateMerchandiseItemById = async (req, res) => {
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
  const removedMerchandiseItem = await Merchandise.findOneAndDelete({
    _id: req.params.merchandiseItemId,
  });

  res.status(StatusCodes.OK).json({ message: "Merchandise Item deleted!", removedMerchandiseItem });
};