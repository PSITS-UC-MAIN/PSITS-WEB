import multer from "multer";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const formatImage = async (file) => {
  const webpBuffer = await sharp(file.buffer).webp({ quality: 75 }).toBuffer();

  const uploadedImage = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    if (/\.\bgif\b$/.test(file.originalname) == false) {
      stream.write(webpBuffer);
    } else {
      stream.write(file.buffer);
    }
    stream.end();
  }).then((image) => {
    return image;
  });

  return {
    image: uploadedImage.secure_url,
    imagePublicId: uploadedImage.public_id,
  };
};

export default upload;
