const { signupUser, loginUser } = require("./auth.service.js");
const { status } = require("http-status");

const signup = async (req, res, next) => {
  try {
    const { name, email, password, preferences } = req.body;
    await signupUser(name, email, password, preferences);
    res.status(status.OK).json({});
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(status.OK).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };
