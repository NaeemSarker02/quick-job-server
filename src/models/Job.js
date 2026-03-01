const { pool } = require("../config/db");

const Job = {
  // Get all jobs with optional search & filter
  getAll: async ({ search, category, location, type }) => { // Added 'type' here
    let query = "SELECT * FROM jobs WHERE 1=1";
    const params = [];

    if (search) {
      query += " AND (title LIKE ? OR company LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }
    if (category) {
      query += " AND category = ?";
      params.push(category);
    }
    if (location) {
      query += " AND location LIKE ?";
      params.push(`%${location}%`);
    }
    // New: Filter by Job Type (Full-time, Remote, etc.)
    if (type) {
      query += " AND type = ?";
      params.push(type);
    }

    query += " ORDER BY created_at DESC";
    const [rows] = await pool.execute(query, params);
    return rows;
  },

  // Get single job by ID
  getById: async (id) => {
    const [rows] = await pool.execute(
      "SELECT * FROM jobs WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  // ... (create and delete functions will remain same)
  create: async ({ title, company, location, category, type, salary, description, requirements }) => {
    const [result] = await pool.execute(
      `INSERT INTO jobs 
        (title, company, location, category, type, salary, description, requirements) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, company, location, category, type, salary, description, requirements]
    );
    return result.insertId;
  },

  delete: async (id) => {
    const [result] = await pool.execute(
      "DELETE FROM jobs WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  },
};

module.exports = Job;