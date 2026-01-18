const bcrypt = require("bcrypt");
const UserModel = require("../../models/user_model");
const PreferenceModel = require("../../models/preferences.model");
const { status } = require("http-status");
const { bcryptSaltRounds } = require("../../config/env");
const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../../config/jwt");

const signupUser = async (name, email, password, preferences = []) => {
  if (!name || !email || !password) {
    const error = new Error("Name, email and password are required");
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
  const newUser = await UserModel.create({
    name,
    email,
    passwordHash: hashedPassword,
  });
  
  // Create preferences if provided
  if (preferences && preferences.length > 0) {
    await PreferenceModel.create({
      user: newUser._id,
      preferences: preferences,
    });
  }
  
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
  
  return token;
};

module.exports = { signupUser, loginUser };
