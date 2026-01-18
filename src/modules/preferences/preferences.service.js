const Preference = require("../../models/preferences.model");

const getPreferencesByUserId = async (userId) => {
  const prefs = await Preference.findOne({ user: userId });

  if (!prefs) {
    return {
      categories: [],
      language: "en",
      country: "us",
      sources: [],
    };
  }

  return prefs;
};

const upsertPreferencesByUserId = async (userId, data) => {
  const allowedFields = ["categories", "language", "country", "sources"];
  const update = {};

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      update[key] = data[key];
    }
  }

  const prefs = await Preference.findOneAndUpdate(
    { user: userId },
    { user: userId, ...update },
    { upsert: true, new: true },
  );

  return prefs;
};

module.exports = {
  getPreferencesByUserId,
  upsertPreferencesByUserId,
};
