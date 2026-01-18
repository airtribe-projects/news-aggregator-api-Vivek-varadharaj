const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    language: {
      type: String,
      default: "en",
    },
    country: {
      type: String,
      default: "us",
    },
    sources: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Preference", preferenceSchema);
