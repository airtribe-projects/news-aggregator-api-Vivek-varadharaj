const { registerUser, loginUser } = require("./auth.service.js");
const { status } = require("http-status");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await registerUser(email, password);
    res.status(status.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(status.OK).json({
      success: true,
      message: "User logged in successfully",
      data: {
        id: user._id,
        email: user.email,
        token: user.token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
