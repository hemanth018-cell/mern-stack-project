const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const startupRoutes = require("./routes/startupRoutes");
const investorRoutes = require("./routes/investorRoutes");
const matchRoutes = require("./routes/matchRoutes");

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 AI Startup Funding Platform API is Running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Startup Routes
app.use("/api/startup", startupRoutes);

// Investor Routes
app.use("/api/investor", investorRoutes);

// Match Routes
app.use("/api/match", matchRoutes);

// Handle Unknown Routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});