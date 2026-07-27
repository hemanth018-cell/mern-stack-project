const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startupName: {
      type: String,
      required: true,
    },

    founder: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      required: true,
    },

    stage: {
      type: String,
      required: true,
      enum: ["Idea", "MVP", "Seed", "Series A", "Series B"],
    },

    fundingRequired: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Startup", startupSchema);