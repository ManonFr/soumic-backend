const db = require("./db");

// Fonction qui récupère tous les artistes + infos de leur concert
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
  return rows; // Retourne un tableau d'artistes enrichis
};

// Créer artiste et event correspondant
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

// Modifier artiste et event correspondant
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

// Supprimer artiste et event(s)
exports.delete = async (id) => {
  await db.query(`DELETE FROM events WHERE artist_id = ?`, [id]);
  await db.query(`DELETE FROM artists WHERE id = ?`, [id]);
};
