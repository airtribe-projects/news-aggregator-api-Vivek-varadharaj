const bcrypt = require("bcrypt");
const UserModel = require("../../models/user_model");
const { status } = require("http-status");
const { bcryptSaltRounds } = require("../../config/env");
const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../../config/jwt");

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

const loginUser = async (email, password) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = status.BAD_REQUEST;
    throw error;
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = status.UNAUTHORIZED;
    throw error;
  }
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = status.UNAUTHORIZED;
    throw error;
  }

  const token = jwt.sign({ userId: user._id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
  user.token = token;
  return user;
};

module.exports = { registerUser, loginUser };
