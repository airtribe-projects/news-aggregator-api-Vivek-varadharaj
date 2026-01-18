const {
  getPreferencesByUserId,
  upsertPreferencesByUserId,
} = require("./preferences.service");
const { status } = require("http-status");

const getPreferences = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const preferences = await getPreferencesByUserId(userId);
    res.status(status.OK).json({
      message: "Preferences retrieved successfully",
      success: true,
      data: preferences,
    });
  } catch (error) {
    next(error);
  }
};

const upsertPreferences = async (req, res, next) => {
  const userId = req.user.userId;
  const preferencesData = req.body;
  try {
    const updatedPreferences = await upsertPreferencesByUserId(
      userId,
      preferencesData,
    );
    res.status(status.OK).json({
      message: "Preferences updated successfully",
      success: true,
      data: updatedPreferences,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPreferences, upsertPreferences };
