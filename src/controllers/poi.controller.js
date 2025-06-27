const PoiModel = require("../models/poi.model");
const { createHttpError } = require("../utils/httpError");

exports.getAllPoi = async (req, res) => {
  try {
    const pois = await PoiModel.getAll();

    // If no POIs found, return a 404 error
    if (!pois || pois.length === 0) {
      throw createHttpError(404, "No points of interest found");
    }

    // Return the list of POIs as JSON
    res.json(pois);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Server error while fetching POIs" });
  }
};
