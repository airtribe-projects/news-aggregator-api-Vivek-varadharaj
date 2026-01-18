const bcrypt = require("bcrypt");
const UserModel = require("../models/user_model");
const { status } = require("http-status");
const { bcryptSaltRounds } = require("../config/env");

const registerUser = async (email, password) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = status.BAD_REQUEST;
    throw error;
  }
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = status.CONFLICT;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(password, bcryptSaltRounds);
  const newUser = UserModel.create({
    email,
    passwordHash: hashedPassword,
  });
  return newUser;
};
module.exports = { registerUser };
