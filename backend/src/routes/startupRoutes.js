const express = require("express");
const router = express.Router();

const {
  createStartup,
  getStartup,
  updateStartup,
  deleteStartup,
} = require("../controllers/startupController");

const { protect } = require("../middleware/authMiddleware");

// Create Startup
router.post("/", protect, createStartup);

// Get My Startup
router.get("/me", protect, getStartup);

// Update Startup
router.put("/", protect, updateStartup);

// Delete Startup
router.delete("/", protect, deleteStartup);

module.exports = router;