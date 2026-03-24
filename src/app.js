const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookingRoutes = require("./route/booking.route");
const userRoutes = require("./route/user.route");
const vehicleRoutes = require("./route/vehicle.route");
const driverRoutes = require("./route/driver.route");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URI,{
      family: 4
    }
  )
  .then(() => console.log("connection sucessfully!"))
  .catch((err) => console.error(err));

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Welcome to my API!");
  res.send("Welcome to my API!");
});

app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);

module.exports = app;

