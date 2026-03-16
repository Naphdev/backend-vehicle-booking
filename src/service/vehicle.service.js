const Vehicle = require("../models/vehicle.model");

const getVehicles = async () => {
  return await Vehicle.find();
};

const createVehicle = async (data) => {
  const { brand, model, licensePlate, type, status, color } = data;

  if (!brand || !model || !licensePlate || !type ) {
    throw new Error("vehicle brand, model, license plate, and type are required");
  }

  return Vehicle.create({
    brand,
    model,
    licensePlate,
    type,
    status,
    color,
  });
};

module.exports = {
  getVehicles,
  createVehicle,
};


