const ArtistModel = require("../models/artists.model");
const { createHttpError } = require("../utils/httpError");

// GET /artists - Fetch all artists with their concert info
exports.getAllArtists = async (req, res) => {
  try {
    const artists = await ArtistModel.getAll();

    // If no artists found, return a 404 error
    if (!artists || artists.length === 0) {
      throw createHttpError(404, "No artists found");
    }

    // Return the list of artists as JSON
    res.json(artists);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      error: err.message || "Server error while fetching artists",
    });
  }
};

// POST /artists - Create a new artist and related concert
exports.createArtist = async (req, res) => {
  try {
    const { name, photo, genre_id, date, start_time, end_time, stage_id } =
      req.body;

    // Check for required fields
    if (
      !name ||
      !photo ||
      !genre_id ||
      !date ||
      !start_time ||
      !end_time ||
      !stage_id
    ) {
      throw createHttpError(400, "Missing required fields");
    }

    // Check for duplicate artist by name
    const existing = await ArtistModel.findByName(name);
    if (existing) {
      throw createHttpError(409, "Artist already exists");
    }

    // Create the artist and associated concert
    const result = await ArtistModel.create({
      name,
      photo,
      genre_id,
      date,
      start_time,
      end_time,
      stage_id,
    });

    // Respond with 201 Created
    res.status(201).json(result);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Server error while creating artist" });
  }
};

// PUT/artists/:id - Update an existing artist and concert
exports.updateArtist = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, photo, genre_id, date, start_time, end_time, stage_id } =
      req.body;

    // Check if the artist exists before updating
    const existing = await ArtistModel.getOne(id);
    if (!existing) {
      throw createHttpError(404, "Artist not found");
    }

    // Update artist and concert
    const result = await ArtistModel.update(id, {
      name,
      photo,
      genre_id,
      date,
      start_time,
      end_time,
      stage_id,
    });

    // Return the updated object
    res.json(result);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Server error while updating artist" });
  }
};

// DELETE/artists/:id - Delete an existing artist and their concert
exports.deleteArtist = async (req, res) => {
  try {
    const artistId = req.params.id;

    // Check if the artist exists
    const existing = await ArtistModel.getOne(artistId);
    if (!existing) {
      throw createHttpError(404, "Artist not found");
    }

    // Delete artist and related concert
    await ArtistModel.delete(artistId);

    // Return 204 No Content
    res.status(204).send();
  } catch (err) {
    res.status(err.statusCode || 500).json({
      error: err.message || "Server error while deleting artist",
    });
  }
};
