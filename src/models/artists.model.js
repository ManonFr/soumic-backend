const db = require("./db");

// Fetch all artists with their concert information
exports.getAll = async () => {
  const [rows] = await db.query(`
        SELECT
            artists.id AS artist_id,
            artists.name AS artist_name,
            artists.photo,
            genres.nom AS genre,
            events.date,
            events.start_time,
            events.end_time,
            stages.id AS stage_id,
            stages.name AS stage_name
        FROM events
        JOIN artists ON events.artist_id = artists.id
        JOIN genres ON artists.genre_id = genres.id
        JOIN stages ON events.stage_id = stages.id
        ORDER BY events.date, events.start_time
        `);
  return rows; // Returns an array of enriched artist objects
};

// Create a new artist and the corresponding event
exports.create = async ({
  name,
  photo,
  genre_id,
  date,
  start_time,
  end_time,
  stage_id,
}) => {
  const [artistResult] = await db.query(
    `INSERT INTO artists (name, photo, genre_id) VALUES (?, ?, ?)`,
    [name, photo, genre_id]
  );

  const artistId = artistResult.insertId;

  await db.query(
    `INSERT INTO events (date, start_time, end_time, artist_id, stage_id) VALUES (?, ?, ?, ?, ?)`,
    [date, start_time, end_time, artistId, stage_id]
  );

  return {
    id: artistId,
    name,
    photo,
    genre_id,
    date,
    start_time,
    end_time,
    stage_id,
  };
};

// Update an existing artist and their event
exports.update = async (
  id,
  { name, photo, genre_id, date, start_time, end_time, stage_id }
) => {
  await db.query(
    `UPDATE artists SET name = ?, photo = ?, genre_id = ? WHERE id = ?`,
    [name, photo, genre_id, id]
  );

  await db.query(
    `UPDATE events SET date = ?, start_time = ?, end_time = ?, stage_id = ? WHERE artist_id = ?`,
    [date, start_time, end_time, stage_id, id]
  );

  return { id, name, photo, genre_id, date, start_time, end_time, stage_id };
};

// Delete an artist and their related events
exports.delete = async (id) => {
  await db.query(`DELETE FROM events WHERE artist_id = ?`, [id]);
  await db.query(`DELETE FROM artists WHERE id = ?`, [id]);
  return { delete: true };
};

exports.findByName = async (name) => {
  const [rows] = await db.query("SELECT * FROM artists WHERE name = ?", [name]);
  return rows[0];
};

exports.getOne = async (id) => {
  const [rows] = await db.query("SELECT * FROM artists WHERE id = ?", [id]);
  return rows[0]; // Return artist object or undefined if not found
};
