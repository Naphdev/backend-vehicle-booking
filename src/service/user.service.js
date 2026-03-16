const User = require("../models/user.model");

const getUsers = async () => {
  return await User.find();
};

const createUser = async (data) => {
  const { name, department, phone } = data;

  if (!name || !department) {
    const err = new Error("Name and department are required");
    err.statusCode = 400;
    throw err;
  }

  return User.create({
    name,
    department,
    phone,
  });
};

module.exports = {
  getUsers,
  createUser,
};


