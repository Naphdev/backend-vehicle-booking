const vehicleService = require("../service/vehicle.service");

const getVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getVehicles();
    res.status(200).json({
      success: true,
      message: "Vehicles fetched successfully",
      data: vehicles,
    });
  } catch (error) {
    console.log("Error fetching vehicles:", error);
    return res.status(500).json({
      success: false,
      error: error?.message ?? String(error),
    });
  }
};

const createVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicle,
    });
  } catch (error) {
    console.log("Error creating vehicle:", error);
    return res.status(500).json({
      success: false,
      error: error?.message ?? String(error),
    });
  }
};


module.exports = { getVehicles, createVehicle };
