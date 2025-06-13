const express = require("express");
const cors = require("cors");

const app = express();

// Middleware de base
app.use(cors()); // Autorise les appels depuis le front
app.use(express.json()); // Permet de lire les requêtes JSON

// Routes
const artistRoutes = require("./routes/artists.routes");
app.use("/artists", artistRoutes); // Toutes les routes /artists iront dans ce fichier

const poiRoutes = require("./routes/poi.routes");
app.use("/poi", poiRoutes);

module.exports = app;
