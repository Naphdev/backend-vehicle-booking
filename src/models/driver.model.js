const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "on-leave"],
      default: "active",
      required: true,
    },

    lineId: {
      type: String,
    },

    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Driver", DriverSchema);