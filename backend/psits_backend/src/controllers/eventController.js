import { StatusCodes } from "http-status-codes";
import Event from "../models/EventModel.js";
import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";

export const getAllEvents = async (req, res) => {
  const events = await Event.find({}).populate("author").exec();

  res.status(StatusCodes.OK).json({ events });
};

export const createEvent = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  req.body.author = req.user.id;

  const event = await Event.create(req.body);
  res.status(StatusCodes.OK).json({ message: "Event created!" });
};

export const updateEventbyId = async (req, res) => {
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  // we don't want to change the author here just in case
  const newObj = { ...req.body };
  delete newObj.author;

  const updatedEvent = await Event.findOneAndUpdate(
    { _id: req.params.eventId },
    newObj,
    {
      new: true,
    }
  );

  if (!updatedEvent) throw new NotFoundError("Event not found!");
  res.status(StatusCodes.OK).json({
    message: "Event updated!",
    event: updatedEvent,
  });
};

export const deleteEventbyId = async (req, res) => {
  //TODO: Validation for params
  if (!req.user.isAdmin) throw new UnauthorizedError("Unauthorized!");

  const removedEvent = await Event.findOneAndDelete({
    _id: req.params.eventId,
  });

  if (!removedEvent) throw new NotFoundError("Event not found!");

  res.status(StatusCodes.OK).json({ message: "Event deleted!", removedEvent });
};
