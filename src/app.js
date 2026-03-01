const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// ─── Middleware ──────────────────────────────────────
// Dynamic CORS for local dev + all Vercel deploys
const allowedOrigins = [
  "http://localhost:5173" // local dev
  // Add more fixed production URLs if needed
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (Postman, server-to-server)
    if (!origin) return callback(null, true);

    // allow local dev OR any Vercel preview/production deploy with "quick-job-client" in URL
    if (
      allowedOrigins.includes(origin) ||
      origin.includes("quick-job-client")
    ) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: Not allowed by server"));
    }
  },
  credentials: true // allow cookies / auth headers if needed
}));

// Parse JSON
app.use(express.json());

// ─── Health Check ───────────────────────────────────
app.get("/", (req, res) => {
  res.json({ success: true, message: "QuickHire API is running 🚀" });
});

// ─── API Routes ─────────────────────────────────────
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// ─── 404 Handler ────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Global Error Handler ───────────────────────────
app.use(errorHandler);

module.exports = app;