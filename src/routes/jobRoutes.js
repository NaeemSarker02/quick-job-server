const express = require("express");
const router = express.Router();
const { getJobs, getJobById, createJob, deleteJob } = require("../controllers/jobController");
const { getJobApplications } = require("../controllers/applicationController");
const { validateJob } = require("../middleware/validate");

// Routes
router.get("/", getJobs); 
router.get("/:id", getJobById);
router.post("/", validateJob, createJob);
router.delete("/:id", deleteJob);
router.get("/:id/applications", getJobApplications);  // Admin view applications for a specific job

module.exports = router;