const Preference = require("../../models/preferences.model");

const getPreferencesByUserId = async (userId) => {
  const prefs = await Preference.findOne({ user: userId });

  if (!prefs) {
    return [];
  }

  return prefs.preferences || [];
};

const updatePreferencesByUserId = async (userId, preferences) => {
  if (!Array.isArray(preferences)) {
    const error = new Error("Preferences must be an array");
    error.statusCode = 400;
    throw error;
  }

  await Preference.findOneAndUpdate(
    { user: userId },
    { user: userId, preferences: preferences },
    { upsert: true, new: true },
  );
};

module.exports = {
  getPreferencesByUserId,
  updatePreferencesByUserId,
};
