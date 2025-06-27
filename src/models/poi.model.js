const db = require("./db");

exports.getAll = async () => {
  // Fetch all stages
  // Used later to distinguish stages from other POIs
  const [stages] = await db.query(`
        SELECT
            id,
            name,
            latitude,
            longitude,
            'stage' AS type
            FROM stages
            `);

  // Fetch all other POIs
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

  // Combine stages and amenities into a single array
  return [...stages, ...amenities];
};
