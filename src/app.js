require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://soumic-backoffice.vercel.app",
];

// Badic middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
); // Allows requests from the frontend
app.use(express.json()); // Parses incoming JSON requests

// Routes
const artistRoutes = require("./routes/artists.routes");
app.use("/artists", artistRoutes); // All /artists routes go through this router

const poiRoutes = require("./routes/poi.routes");
app.use("/poi", poiRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

// Exports app for testing
module.exports = app;
