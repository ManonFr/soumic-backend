const ArtistModel = require("../models/artists.model");

exports.getAllArtists = async (req, res) => {
  try {
    const artists = await ArtistModel.getAll(); // Appelle le modèle
    res.json(artists); // envoie les données JSON au frontend
  } catch (err) {
    console.error("Erreur dans getAllArtists:", err);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération des artistes" });
  }
};
