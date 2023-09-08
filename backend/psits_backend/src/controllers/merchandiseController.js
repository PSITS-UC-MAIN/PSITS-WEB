import { StatusCodes } from "http-status-codes";
import Merchandise from "../models/MerchandiseModel.js";
import { UnauthorizedError } from "../errors/customErrors.js";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";
import webp from 'webp-converter';
import User from "../models/UserModel.js";

export const getMerchandise = async (req, res) => {
  const merchandise = await Merchandise.find({});

  res.status(StatusCodes.OK).json({ merchandise });
};

export const createMerchandiseItem = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  let newBody = { ...req.body };
  
  if (req.files) {
    newBody = JSON.parse(req.body.merch);
    
    let uploadedImages = []

    // initialize needed regular expressions
    const re = /\.[^/.]+$/

    // convert if files are not in webp format
    for(let i = 0; i < req.files.length; i++) {
      if (!/\.webp$/.test(req.files[i].filename))
        await webp.cwebp(req.files[i].path,`${req.files[i].path.replace(re, '')}.webp`,"-q 75")
    }
    
    // upload the images to cloudinary
    for(let i = 0; i < req.files.length; i++) {
      const uploadedImage = await cloudinary.uploader.upload(`${req.files[i].path.replace(re, '')}.webp`) // this uploads the webp file
      uploadedImages.push({
        image: uploadedImage.secure_url,
        imagePublicId: uploadedImage.public_id
      })
    }
    // delete the images in the public folder
    for(let i = 0; i < req.files.length; i++) {
      // the code below removes the original file and the converted file
      await fs.unlink(req.files[i].path)
      await fs.unlink(`${req.files[i].path.replace(re, '')}.webp`)
    }

    newBody.images = uploadedImages
  }

  await Merchandise.create(newBody);
  res.status(StatusCodes.OK).json({ msg: "Merchandise Item Created!" })
}

export const updateMerchandiseItemById = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  let newObj = { ...req.body };
  const re = /\.[^/.]+$/
  let uploadedImages = []

  // check if uploaded images contain values
  if (req.files.length > 0) {
    // if yes, delete images in the cloud via public id
    for(let i = 0; i < newObj.image.length; i++) {
      await cloudinary.uploader.destroy(newObj.imagePublicId[i])
    }

    // prepare merch data by initially parsing it
    newObj = JSON.parse(req.body.merch);

    // convert files to webp
    for(let i = 0; i < req.files.length; i++) {
      if (!/\.webp$/.test(req.files[i].filename))
        await webp.cwebp(req.files[i].path,`${req.files[i].path.replace(re, '')}.webp`,"-q 75")
    }

    // then upload the converted new images
    for(let i = 0; i < req.files.length; i++) {
      const uploadedImage = await cloudinary.uploader.upload(`${req.files[i].path.replace(re, '')}.webp`) // this uploads the webp file
      uploadedImages.push({
        image: uploadedImage.secure_url,
        imagePublicId: uploadedImage.public_id
      })
    }

    // then remove the files from the local storage via public/uploads
    for(let i = 0; i < req.files.length; i++) {
      await fs.unlink(req.files[i].path)
      await fs.unlink(`${req.files[i].path.replace(re, '')}.webp`)
    }

    // insert the new object attributes to the images array
    newObj.images = uploadedImages
  } else {
    for(let i = 0; i < newObj.image.length; i++) {
      uploadedImages.push({
        image: newObj.image[i],
        imagePublicId: newObj.imagePublicId[i]
      })
    }
    newObj = JSON.parse(req.body.merch);
    newObj.images = uploadedImages
  }

  // update the database data
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

  const findMerch = await Merchandise.find({ _id: req.params.merchandiseItemId })
  for (let i = 0; i < findMerch[0].images.length; i++) {
    await cloudinary.uploader.destroy(findMerch[0].images[i].imagePublicId)
  }

  const removedMerchandiseItem = await Merchandise.findOneAndDelete({
    _id: req.params.merchandiseItemId,
  });

  // this part deletes the merchandise Item from everyone else's cart
  const users = await User.find({}, "cart"); // hide password
  let itemIndex = null
  for (let i = 0; i < users.length; i++) {
    itemIndex = users[i].cart.findIndex(item => item.merchId.toString() === req.params.merchandiseItemId)
    users[i].cart.splice(itemIndex)
    await users[i].save()
  }

  res.status(StatusCodes.OK).json({ message: "Merchandise Item deleted!", removedMerchandiseItem });
};