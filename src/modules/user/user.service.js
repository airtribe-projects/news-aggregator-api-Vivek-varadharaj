const userModel = require("../../models/user_model");
const status = require("http-status");

const getUserById = async (userId) => {
  const user = await userModel.findById(userId).select("-passwordHash -__v");
  if (!user) {
    error = new Error("User not found");
    error.statusCode = status.NOT_FOUND;
  }
  return user;
};

const updateUserById = async (userId, updateData) => {
  const allowedUpdates = ["email"];
  const filteredUpdateData = {};
  for (const key of Object.keys(updateData)) {
    if (allowedUpdates.includes(key)) {
      filteredUpdateData[key] = updateData[key];
    }
  }
  const updatedUser = await userModel
    .findByIdAndUpdate(
      userId,
      { $set: filteredUpdateData },
      { new: true, runValidators: true },
    )
    .select("-passwordHash -__v");
  if (!updatedUser) {
    error = new Error("User not found");
    error.statusCode = status.NOT_FOUND;
  }
  return updatedUser;
};

module.exports = { getUserById, updateUserById };
