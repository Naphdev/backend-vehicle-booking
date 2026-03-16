const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "in-use", "maintenance"],
      default: "available",
    },

    color: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);