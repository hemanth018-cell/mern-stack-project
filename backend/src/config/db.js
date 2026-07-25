const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("========== FULL ERROR ==========");
    console.error(err);
    console.error("================================");
    process.exit(1);
  }
};

module.exports = connectDB;