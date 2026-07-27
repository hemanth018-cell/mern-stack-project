const Investor = require("../models/Investor");

// Create Investor Profile
const createInvestor = async (req, res) => {
  try {
    const {
      investorName,
      organization,
      sectors,
      preferredStage,
      minInvestment,
      maxInvestment,
      preferredLocation,
      bio,
    } = req.body;

    // Check if investor profile already exists
    const existingInvestor = await Investor.findOne({ user: req.user.id });

    if (existingInvestor) {
      return res.status(400).json({
        success: false,
        message: "Investor profile already exists",
      });
    }

    const investor = await Investor.create({
      user: req.user.id,
      investorName,
      organization,
      sectors,
      preferredStage,
      minInvestment,
      maxInvestment,
      preferredLocation,
      bio,
    });

    res.status(201).json({
      success: true,
      message: "Investor profile created successfully",
      investor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in Investor Profile
const getInvestor = async (req, res) => {
  try {
    const investor = await Investor.findOne({ user: req.user.id });

    if (!investor) {
      return res.status(404).json({
        success: false,
        message: "Investor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      investor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Investor Profile
const updateInvestor = async (req, res) => {
  try {
    const investor = await Investor.findOne({ user: req.user.id });

    if (!investor) {
      return res.status(404).json({
        success: false,
        message: "Investor profile not found",
      });
    }

    const {
      investorName,
      organization,
      sectors,
      preferredStage,
      minInvestment,
      maxInvestment,
      preferredLocation,
      bio,
    } = req.body;

    investor.investorName = investorName || investor.investorName;
    investor.organization = organization || investor.organization;
    investor.sectors = sectors || investor.sectors;
    investor.preferredStage = preferredStage || investor.preferredStage;
    investor.minInvestment = minInvestment || investor.minInvestment;
    investor.maxInvestment = maxInvestment || investor.maxInvestment;
    investor.preferredLocation =
      preferredLocation || investor.preferredLocation;
    investor.bio = bio || investor.bio;

    await investor.save();

    res.status(200).json({
      success: true,
      message: "Investor profile updated successfully",
      investor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Investor Profile
const deleteInvestor = async (req, res) => {
  try {
    const investor = await Investor.findOne({ user: req.user.id });

    if (!investor) {
      return res.status(404).json({
        success: false,
        message: "Investor profile not found",
      });
    }

    await Investor.findByIdAndDelete(investor._id);

    res.status(200).json({
      success: true,
      message: "Investor profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInvestor,
  getInvestor,
  updateInvestor,
  deleteInvestor,
};