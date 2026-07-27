const express = require("express");
const router = express.Router();

const {
  createInvestor,
  getInvestor,
  updateInvestor,
  deleteInvestor,
} = require("../controllers/investorController");

const { protect } = require("../middleware/authMiddleware");

// Create Investor
router.post("/", protect, createInvestor);

// Get My Investor
router.get("/me", protect, getInvestor);

// Update Investor
router.put("/", protect, updateInvestor);

// Delete Investor
router.delete("/", protect, deleteInvestor);

module.exports = router;