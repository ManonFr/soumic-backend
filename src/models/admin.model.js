// Accesses the database to find an admin by username
const db = require("./db");

exports.findByUsername = async (username) => {
  const [rows] = await db.query("SELECT * FROM admin WHERE username = ?", [
    username,
  ]);
  return rows[0]; // returns undefined if not found
};
