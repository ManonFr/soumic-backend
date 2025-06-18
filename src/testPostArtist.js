const fetch = require("node-fetch");

async function testCreateArtist() {
  console.log("Envoi de la requête POST...");

  try {
    const response = await fetch("http://localhost:3001/artists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "DJ Terminal",
        photo: "https://example.com/photo.jpg",
        genre_id: 1,
        date: "2025-06-22",
        start_time: "19:00:00",
        end_time: "20:00:00",
        stage_id: 2,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Réponse du backend :", data);
  } catch (error) {
    console.error("Erreur :", error.message);
  }
}

testCreateArtist();
