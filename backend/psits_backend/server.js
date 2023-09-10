import "express-async-errors";
import cors from "cors";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import config from "./src/utils/Config.js";
import database from "./src/MongoDB.js";

// routers
import v2AuthRouter from "./src/routes/authRouter.js";
import v2UserRouter from "./src/routes/userRouter.js";
import v2AnnouncementRouter from "./src/routes/announcementRouter.js";
import v2EventRouter from "./src/routes/eventRouter.js";
import v2MerchandiseRouter from "./src/routes/merchandiseRouter.js";
import v2StatRouter from "./src/routes/statRouter.js";
import v2OfficeLogRouter from "./src/routes/officelogRouter.js";
import v2CartRouter from "./src/routes/cartRouter.js";
import v2OrderRouter from "./src/routes/orderRouter.js";

import homeRouter from "./src/routes/main.js";

// public
import { dirname } from "path";
import { fileURLToPath } from "url";

// middleware
import { authenticateUser } from "./src/middlewares/authMiddleware.js";
import errorHandlerMiddleware from "./src/middlewares/errorHandlerMiddleware.js";

const app = express();

// create a public folder for files

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

let PORT = config.PORT;

const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares
app.use(
  cors({
    origin: [...config.getCorsOrigin()],
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(cookieParser()); // allow node to read cookies
app.use(express.json()); // uses JSON as payload
app.use(compression()); // compresses all routes

// routes
app.use("/", homeRouter);
app.use("/api/v2/auth", v2AuthRouter);
app.use("/api/v2/user", authenticateUser, v2UserRouter);
app.use("/api/v2/announcement", v2AnnouncementRouter);
app.use("/api/v2/event", v2EventRouter);
app.use("/api/v2/merch", v2MerchandiseRouter);
app.use("/api/v2/stat", authenticateUser, v2StatRouter);
app.use("/api/v2/officelog", authenticateUser, v2OfficeLogRouter);
app.use("/api/v2/cart", v2CartRouter);
app.use("/api/v2/order", v2OrderRouter);

// throw error in json format if route not exist
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

// throw all errors in json format and not break the server
app.use(errorHandlerMiddleware);

// run database
database();

// start the server
const server = app.listen(PORT, () => {
  console.log(`Server has started, running on port: ${PORT}`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

export default app;
