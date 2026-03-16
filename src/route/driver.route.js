const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driver.controller");

router.get("/", driverController.getDrivers);
router.post("/", driverController.createDriver);

module.exports = router;
