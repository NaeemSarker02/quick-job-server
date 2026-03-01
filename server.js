const app = require("./src/app");
const { connectDB } = require("./src/config/db");

// Only load dotenv for local development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // DB must connect before starting server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1); // Exit if DB connection fails
  }
};

startServer();