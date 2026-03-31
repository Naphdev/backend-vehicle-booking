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
    stops,
    status
  } = data; 

  const newStart = new Date(startDate);
  const newEnd = new Date(endDate);

  if (!vehicleId || !bookedByUserId || !title || !purpose || !origin || !destination || !startDate || !endDate || !tripType) {
    throw new Error("All fields are required");
  }

  if (newStart >= newEnd) {
    throw new Error("วันที่เริ่มต้นต้องอยู่ก่อนวันที่สิ้นสุด");
  }

  // ตรวจสอบว่ารถคันนี้ถูกจองในช่วงเวลาเดียวกันหรือไม่
  const vehicleConflict = await Booking.findOne({
    vehicleId: vehicleId,
    startDate: { $lt: newEnd },
    endDate: { $gt: newStart }
  });

  // ตรวจสอบว่าคนขับรถคนนี้ถูกจองในช่วงเวลาเดียวกันหรือไม่
  const driverConflict = await Booking.findOne({
    driverId: driverId,
    startDate: { $lt: newEnd },
    endDate: { $gt: newStart }
  });

    const errors = {
    vehicle: false,
    driver: false,
    vehicleTime: null,
    driverTime: null
  };

  if (vehicleConflict) {
    errors.vehicle = true;
    errors.vehicleTime = {
      start: vehicleConflict.startDate,
      end: vehicleConflict.endDate
    };
  }

  if (driverConflict) {
    errors.driver = true;
    errors.driverTime = {
      start: driverConflict.startDate,
      end: driverConflict.endDate
    };
  }

  if (errors.vehicle || errors.driver) {
    throw {
      code: 'CONFLICT',
      ...errors
    };
  }
  
  const booking = new Booking({
    vehicleId,  
    driverId,
    bookedByUserId,
    title,
    purpose,
    origin, 
    destination,
    startDate: newStart,
    endDate: newEnd,
    tripType,
    stops,
    status,
  });

  booking.bookingNumber = "BK-" + booking._id.toString().slice(-6).toUpperCase();

  await booking.save();

  return booking



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

    if (booking.startDate > booking.endDate) {
    throw new Error("Start date must be before end date");
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
    "stops",
    "status",
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
      { returnDocument: 'after', runValidators: true }
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


