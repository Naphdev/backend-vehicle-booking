const mongoose = require("mongoose");
const Booking = require("../models/booking.model");

const getBookings = async () => {
  return await Booking.find()
    .populate("vehicleId")
    .populate("driverId")
    .populate("bookedByUserId");
};

const createBooking = async (data) => {

  const {
    vehicleId,
    driverId,
    bookedByUserId,
    title,
    purpose,
    origin,
    destination,
    startDate,
    endDate,
    tripType,
    stops
  } = data;

  if (!vehicleId || !bookedByUserId || !title || !purpose || !origin || !destination || !startDate || !endDate || !tripType) {
    throw new Error("All fields are required");
  }

  return Booking.create({
    vehicleId,
    driverId,
    bookedByUserId,
    title,
    purpose,
    origin,
    destination,
    startDate,
    endDate,
    tripType,
    stops
  });

};

const getBookingById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("Invalid booking id");
    err.statusCode = 400;
    throw err;
  }

  const booking = await Booking.findById(id)
    .populate("vehicleId")
    .populate("driverId")
    .populate("bookedByUserId");

  if (!booking) {
    const err = new Error("Booking not found");
    err.statusCode = 404;
    throw err;
  }

  return booking;
};

const updateBooking = async (id, data) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("Invalid booking id");
    err.statusCode = 400;
    throw err;
  }

  const booking = await Booking.findById(id);

  if (!booking) {
    const err = new Error("Booking not found");
    err.statusCode = 404;
    throw err;
  }

  if (booking.status === "approved" && data.tripType) {
    const err = new Error("Cannot update trip type after approval");
    err.statusCode = 400;
    throw err;
  }

  // whitelist fields
  const allowedFields = [
    "vehicleId",
    "driverId",
    "title",
    "purpose",
    "origin",
    "destination",
    "startDate",
    "endDate",
    "tripType",
    "stops"
  ];

  // filter data
  const updateData = {};

  Object.keys(data).forEach((key) => {
    if (allowedFields.includes(key)) {
      updateData[key] = data[key];
    }
  });

  const updatedBooking = await Booking
    .findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
    .populate("vehicleId")
    .populate("driverId")
    .populate("bookedByUserId");

  return updatedBooking;
};

const deleteBooking = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("Invalid booking id");
    err.statusCode = 400;
    throw err;
  }

  const booking = await Booking.findById(id);

  if (!booking) {
    const err = new Error("Booking not found");
    err.statusCode = 404;
    throw err;
  }

  await Booking.findByIdAndDelete(id);

  return booking;
};


module.exports = {
  getBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
};


