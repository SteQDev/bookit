import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";

// get all room => /api/rooms
const allRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({
      sucess: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error.message,
    });
  }
};
// create new room => /api/rooms
const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);

    res.status(200).json({
      sucess: true,
      room,
    });
  } catch (error) {
    res.status(404).json({
      sucess: false,
      error: error.message,
    });
  }
};
// get room details => /api/:id
const getSingleRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);

    if (!room) {
      return next(new ErrorHandler("room not found with this ID", 404));
    }
    res.status(200).json({
      sucess: true,
      room,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error.message,
    });
  }
};

// update a room details
const updateRoom = async (req, res, next) => {
  try {
    let room = await Room.findById(req.query.id);

    if (!room) {
      return next(new ErrorHandler("room not found with this ID", 404));
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      sucess: true,
      room,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error.message,
    });
  }
};

// delete a room
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);

    if (!room) {
      return next(new ErrorHandler("room not found with this ID", 404));
    }

    await room.remove();
    res.status(200).json({
      sucess: true,
      message: "Room removed successfully",
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error.message,
    });
  }
};

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
