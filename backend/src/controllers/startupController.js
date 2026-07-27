const Startup = require("../models/Startup");

// Create Startup
const createStartup = async (req, res) => {
  try {
    const {
      startupName,
      founder,
      industry,
      stage,
      fundingRequired,
      location,
      description,
    } = req.body;

    // Check if startup already exists for this user
    const existingStartup = await Startup.findOne({ user: req.user.id });

    if (existingStartup) {
      return res.status(400).json({
        success: false,
        message: "Startup profile already exists",
      });
    }

    const startup = await Startup.create({
      user: req.user.id,
      startupName,
      founder,
      industry,
      stage,
      fundingRequired,
      location,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Startup created successfully",
      startup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User Startup
const getStartup = async (req, res) => {
  try {
    const startup = await Startup.findOne({ user: req.user.id });

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: "Startup not found",
      });
    }

    res.status(200).json({
      success: true,
      startup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Startup
const updateStartup = async (req, res) => {
  try {
    const startup = await Startup.findOne({ user: req.user.id });

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: "Startup not found",
      });
    }

    const {
      startupName,
      founder,
      industry,
      stage,
      fundingRequired,
      location,
      description,
    } = req.body;

    startup.startupName = startupName || startup.startupName;
    startup.founder = founder || startup.founder;
    startup.industry = industry || startup.industry;
    startup.stage = stage || startup.stage;
    startup.fundingRequired =
      fundingRequired || startup.fundingRequired;
    startup.location = location || startup.location;
    startup.description = description || startup.description;

    await startup.save();

    res.status(200).json({
      success: true,
      message: "Startup updated successfully",
      startup,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Startup
const deleteStartup = async (req, res) => {
  try {
    const startup = await Startup.findOne({ user: req.user.id });

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: "Startup not found",
      });
    }

    await Startup.findByIdAndDelete(startup._id);

    res.status(200).json({
      success: true,
      message: "Startup deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createStartup,
  getStartup,
  updateStartup,
  deleteStartup,
};