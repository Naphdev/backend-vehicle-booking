const Driver = require("../models/driver.model");

const getDrivers = async () => {
  return await Driver.find();
};

const createDriver = async (data) => {
  const { name, status, lineId, phone } = data;

  if (!name || !phone) {
    throw new Error("Driver name and phone number are required");
  }

  return Driver.create({
    name,
    status,
    lineId,
    phone,
  });
};

module.exports = {
  getDrivers,
  createDriver,
};


