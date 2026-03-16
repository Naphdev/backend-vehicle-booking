const userService = require("../service/user.service");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      error: error?.message ?? String(error),
    });
  }
};


const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });

  } catch (error) {
    console.log("Error creating user:", error);

    if (error?.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: error?.message ?? String(error),
    });
  }
};



module.exports = { createUser, getUsers };


