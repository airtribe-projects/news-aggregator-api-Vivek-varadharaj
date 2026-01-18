const { registerUser } = require("./auth.service");
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

module.exports = { register };
