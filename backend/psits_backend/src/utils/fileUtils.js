import fs from "fs";

// create a directory if not exist
export const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
