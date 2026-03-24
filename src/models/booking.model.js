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

  bookingNumber: {
    type: String,
    required: true,
    unique: true,
  },
  
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
    enum: ["pending", "approved", "cancelled", "completed"],
    default: "pending"
   },
  }, 
  {
    timestamps: true
  }
);


BookingSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = mongoose.model("Booking", BookingSchema);


