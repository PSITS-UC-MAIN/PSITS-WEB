import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp"); // public/uploads
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    fs.writeFileSync(`/tmp/${file.originalname}`);
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
