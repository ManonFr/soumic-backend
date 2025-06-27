// Handles admin login logic: checking credentials and password hash
const AdminModel = require("../models/admin.model");
const bcrypt = require("bcrypt");
const { createHttpError } = require("../utils/httpError");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for required fields
    if (!username || !password) {
      throw createHttpError(400, "Username and password are required");
    }

    // Look up the admin in the database
    const admin = await AdminModel.findByUsername(username);
    if (!admin) {
      throw createHttpError(401, "Invalid username or password");
    }

    // Compare the password to the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
    if (!isPasswordValid) {
      throw createHttpError(401, "Invalid username or password");
    }

    // If everything is valid, return a success message
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Login error" });
  }
};
