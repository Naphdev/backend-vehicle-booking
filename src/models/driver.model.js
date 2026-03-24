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
    
    qrcodeUrl: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
);

DriverSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});
module.exports = mongoose.model("Driver", DriverSchema);