const {
  getPreferencesByUserId,
  updatePreferencesByUserId,
} = require("./preferences.service");
const { status } = require("http-status");

const getPreferences = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const preferences = await getPreferencesByUserId(userId);
    res.status(status.OK).json({
      preferences: preferences,
    });
  } catch (error) {
    next(error);
  }
};

const updatePreferences = async (req, res, next) => {
  const userId = req.user.userId;
  const { preferences } = req.body;
  try {
    await updatePreferencesByUserId(userId, preferences);
    res.status(status.OK).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = { getPreferences, updatePreferences };
