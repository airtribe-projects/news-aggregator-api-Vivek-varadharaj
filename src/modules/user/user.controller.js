const { getUserById, updateUserById } = require("./user.service.js");
const { status } = require("http-status");

const updateMe = async (req, res, next) => {
  const userId = req.user.userId;
  const updateData = req.body;
  try {
    const updatedUser = await updateUserById(userId, updateData);
    res.status(status.OK).json({
      message: "User updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const user = await getUserById(userId);
    res.status(status.OK).json({
      message: "User retrieved successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getMe, updateMe };
