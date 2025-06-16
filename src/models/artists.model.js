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
