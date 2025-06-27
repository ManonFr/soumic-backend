const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load environment variables based on NODE_ENV
const env = process.env.NODE_ENV;
dotenv.config({ path: `.env.${env}` });

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Exports the pool using .promise to enable async/await
module.exports = pool.promise();
