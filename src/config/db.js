const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,           // Railway host
  user: process.env.DB_USER,           // DB user
  password: process.env.DB_PASSWORD,   // DB password
  database: process.env.DB_NAME,       // DB name
  port: process.env.DB_PORT || 3306,   // DB port (Railway often gives custom port)
  waitForConnections: true,
  connectionLimit: 10,                 // Max 10 simultaneous connections
  queueLimit: 0                        // Unlimited queue
});

// Function to test DB connection
const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`✅ MySQL Connected Successfully to ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}`);
    connection.release();
  } catch (error) {
    console.error("❌ MySQL Connection Failed:", error.message);
    process.exit(1); // Stop server if DB connection fails
  }
};

module.exports = { pool, connectDB };