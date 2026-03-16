const mongoose = require("mongoose");

const StopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const BookingSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },

  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },

  bookedByUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  purpose: {
    type: String,
    required: true
  },

  origin: {
    type: String,
    required: true
  },

  destination: {
    type: String,
    required: true
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  tripType: {
    type: String,
    enum: ["one-way", "round-trip", "multi-stop"],
    required: true,
  },

  stops: [StopSchema],

  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "cancelled", "completed"],
    default: "pending"
  },
});

module.exports = mongoose.model("Booking", BookingSchema);


