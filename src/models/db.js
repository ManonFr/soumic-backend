const mysql = require("mysql2");
require("dotenv").config();

// Création d'une pool de connexions MySQL

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// On utilise .promise() pour pouvoir faire du async/await
module.exports = pool.promise(); // On exporte la pool en mode "promesse" pour pouvoir utiliser async/await
