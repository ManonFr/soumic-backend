const express = require("express");
const router = express.Router();
const ArtistController = require("../controllers/artists.controller");

// Quand le front fait un GET sur /artists, on appelle getAllArtists()
router.get("/", ArtistController.getAllArtists);

module.exports = router;
