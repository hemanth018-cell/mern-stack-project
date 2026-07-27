const Startup = require("../models/Startup");
const Investor = require("../models/Investor");

const getMatches = async (req, res) => {
  try {
    // Get logged-in user's startup
    const startup = await Startup.findOne({ user: req.user.id });

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: "Startup profile not found",
      });
    }

    // Get all investors
    const investors = await Investor.find();

    const matches = [];

    for (const investor of investors) {
      let score = 0;
      const matchedOn = [];

      // Industry Match
      if (
        investor.sectors &&
        startup.industry &&
        investor.sectors.toLowerCase() ===
          startup.industry.toLowerCase()
      ) {
        score += 40;
        matchedOn.push("Industry");
      }

      // Funding Match
      if (
        startup.fundingRequired >= investor.minInvestment &&
        startup.fundingRequired <= investor.maxInvestment
      ) {
        score += 30;
        matchedOn.push("Funding");
      }

      // Stage Match
      if (
        investor.preferredStage &&
        startup.stage &&
        investor.preferredStage.toLowerCase() ===
          startup.stage.toLowerCase()
      ) {
        score += 20;
        matchedOn.push("Stage");
      }

      // Location Match
      if (
        investor.preferredLocation &&
        startup.location &&
        investor.preferredLocation.toLowerCase() ===
          startup.location.toLowerCase()
      ) {
        score += 10;
        matchedOn.push("Location");
      }

      matches.push({
        investorId: investor._id,
        investorName: investor.investorName,
        organization: investor.organization,
        sectors: investor.sectors,
        preferredStage: investor.preferredStage,
        minInvestment: investor.minInvestment,
        maxInvestment: investor.maxInvestment,
        preferredLocation: investor.preferredLocation,
        score,
        matchedOn,
      });
    }

    // Sort by highest score
    matches.sort((a, b) => b.score - a.score);

    res.status(200).json({
      success: true,
      startup: startup.startupName,
      totalMatches: matches.length,
      matches,
    });
  } catch (error) {
    console.error("Match Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMatches,
};