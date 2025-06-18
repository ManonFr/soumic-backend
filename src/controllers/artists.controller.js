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

// POST/artists
exports.createArtist = async (req, res) => {
  try {
    const { name, photo, genre_id, date, start_time, end_time, stage_id } =
      req.body;
    const result = await ArtistModel.create({
      name,
      photo,
      genre_id,
      date,
      start_time,
      end_time,
      stage_id,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error("Erreur dans createArtist:", err);
    res.statut(500).json({ error: "Erreur lors de la création de l'artiste" });
  }
};

// PUT/artists/:id
exports.updateArtist = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, photo, genre_id, date, start_time, end_time, stage_id } =
      req.body;
    const result = await ArtistModel.update(id, {
      name,
      photo,
      genre_id,
      date,
      start_time,
      end_time,
      stage_id,
    });
    res.json(result);
  } catch (err) {
    console.error("Erreur dans updateArtist:", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'artiste" });
  }
};

// DELETE/artists/:id
exports.deleteArtist = async (req, res) => {
  try {
    const artistId = req.params.id;

    await ArtistModel.delete(artistId);

    res.status(204).send();
  } catch (err) {
    console.error("Erreur dans deleteArtist:", err);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'artiste" });
  }
};
