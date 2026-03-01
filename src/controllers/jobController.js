const Job = require("../models/Job");

// GET /api/jobs
const getJobs = async (req, res) => {
  try {
    // Extract filters from query string
    const { search, category, location, type } = req.query;

    // Fetch filtered jobs from model
    const jobs = await Job.getAll({ search, category, location, type });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/jobs/:id
const getJobById = async (req, res) => {
  try {
    const job = await Job.getById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/jobs (Admin)
const createJob = async (req, res) => {
  try {
    const insertId = await Job.create(req.body);
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: { id: insertId },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/jobs/:id (Admin)
const deleteJob = async (req, res) => {
  try {
    const affectedRows = await Job.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  deleteJob
};