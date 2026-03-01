const Application = require("../models/Application");
const Job = require("../models/Job");

// POST /api/applications
const submitApplication = async (req, res) => {
  try {
    const { job_id } = req.body;

    // Check if job exists
    const job = await Job.getById(job_id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const insertId = await Application.create(req.body);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: { id: insertId },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/jobs/:id/applications  (Admin)
const getJobApplications = async (req, res) => {
  try {
    const applications = await Application.getByJobId(req.params.id);

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitApplication, getJobApplications };