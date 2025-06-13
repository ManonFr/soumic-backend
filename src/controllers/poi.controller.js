const PoiModel = require("../models/poi.model");

exports.getAllPoi = async (req, res) => {
  try {
    const pois = await PoiModel.getAll();
    res.json(pois);
  } catch (err) {
    console.error("Erreur dans getAllPoi:", err);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération des POIs" });
  }
};
