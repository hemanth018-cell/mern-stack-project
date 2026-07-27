const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    investorName: {
      type: String,
      required: true,
    },

    organization: {
      type: String,
      required: true,
    },

    sectors: {
      type: String,
      required: true,
    },

    preferredStage: {
      type: String,
      required: true,
      enum: ["Idea", "MVP", "Seed", "Series A", "Series B"],
    },

    minInvestment: {
      type: Number,
      required: true,
    },

    maxInvestment: {
      type: Number,
      required: true,
    },

    preferredLocation: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Investor", investorSchema);