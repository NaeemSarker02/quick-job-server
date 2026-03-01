const { pool } = require("../config/db");

const Application = {
  // Submit application
  create: async ({ job_id, name, email, resume_link, cover_note }) => {
    const [result] = await pool.execute(
      `INSERT INTO applications 
        (job_id, name, email, resume_link, cover_note) 
       VALUES (?, ?, ?, ?, ?)`,
      [job_id, name, email, resume_link, cover_note]
    );
    return result.insertId;
  },

  // Get all applications for a job
  getByJobId: async (job_id) => {
    const [rows] = await pool.execute(
      "SELECT * FROM applications WHERE job_id = ? ORDER BY created_at DESC",
      [job_id]
    );
    return rows;
  },
};

module.exports = Application;