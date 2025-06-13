const db = require("./db");

exports.getAll = async () => {
  // On récupère les scènes
  const [stages] = await db.query(`
        SELECT
            id,
            name,
            latitude,
            longitude,
            'stage' AS type
            FROM stages
            `);

  // On récupère les autres POIs
  const [amenities] = await db.query(`
        SELECT
            amenities.id,
            amenities.name,
            amenities.latitude,
            amenities.longitude,
            amenities.description,
        poi.category AS type
        FROM amenities
        JOIN poi ON amenities.poi_id = poi.id
        `);

  // On combine les deux
  return [...stages, ...amenities];
};
