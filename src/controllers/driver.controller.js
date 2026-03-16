const driverService = require("../service/driver.service");

const getDrivers = async (req, res) => {
  try {
    const drivers = await driverService.getDrivers();
    res.status(200).json({
      success: true,
      message: "Drivers fetched successfully",
      data: drivers,
    });
  } catch (error) {
    console.log("Error fetching drivers:", error);
    return res.status(500).json({
      success: false,
      error: error?.message ?? String(error),
    });
  }
};

const createDriver = async (req, res) => {
  try {
    const driver = await driverService.createDriver(req.body);
    res.status(201).json({
      success: true,
      message: "Driver created successfully",
      data: driver,
    });
  } catch (error) {
    console.log("Error creating driver:", error);
    return res.status(500).json({
      success: false,
      error: error?.message ?? String(error),
    });
  }
};


module.exports = { getDrivers, createDriver };
