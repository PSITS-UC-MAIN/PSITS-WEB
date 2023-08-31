import { StatusCodes } from "http-status-codes";
import OfficeLogModel from "../models/OfficeLogModel.js";
import { UnauthorizedError } from "../errors/customErrors.js";

export const postOfficeLog = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const max = req.headers.maxval ?? new Date().toISOString();
  // default min is 100 days ago
  const min =
    req.headers.minval ?? new Date(new Date().getDate() - 100).toISOString();

  // check if there is a pending log exists, it must be logged of first
  const foundLog = await OfficeLogModel.findOne({
    user: req.user.id,
    loginTime: { $gte: min, $lt: max },
    logoutTime: null,
  });

  if (foundLog) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Cannot override found log, you must logout first" });
  }
  const newLog = OfficeLogModel.create({
    user: req.user.id,
    loginTime: new Date(),
    remarks: req.body.remarks,
  });

  res.status(StatusCodes.OK).json({ message: "New log recorded" });
};

export const patchOfficeLog = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const max = new Date().toISOString();
  // default min is 100 days ago
  const min =
    req.headers.minval ?? new Date(new Date().getDate() - 100).toISOString();

  // check if there is a pending log exists, it must be logged of first
  const foundLog = await OfficeLogModel.findOne({
    user: req.user.id,
    loginTime: { $gte: min, $lt: max },
    logoutTime: null,
  });
  if (!foundLog) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No record found" });
  }

  foundLog.logoutTime = new Date();
  await foundLog.save();

  res.status(StatusCodes.OK).json({ message: "Log was updated" });
};

export const getAllOfficeLogs = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const { option, maxval, minval } = req.headers;

  if (option === "latest") {
    const latestLogs = await OfficeLogModel.find(
      {
        loginTime: { $gte: minval, $lt: maxval },
      },
      "-_id"
    )
      .populate("user", "-_id-isAdmin")
      .exec();
    return res.status(StatusCodes.OK).json({ officeLogs: latestLogs });
  }

  const allLogs = await OfficeLogModel.find({}, "-_id")
    .populate("user", "-_id-isAdmin")
    .exec();

  res.status(StatusCodes.OK).json({ officeLogs: allLogs });
};
