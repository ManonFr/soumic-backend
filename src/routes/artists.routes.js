const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artists.controller");

router.get("/", artistController.getAllArtists);
router.post("/", artistController.createArtist);
router.put("/:id", artistController.updateArtist);
router.delete("/:id", artistController.deleteArtist);

module.exports = router;
