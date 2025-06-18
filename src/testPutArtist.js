const fetch = require("node-fetch");

async function testUpdateArtist() {
  const artistId = 226;

  const response = await fetch(`http://localhost:3001/artists/${artistId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "DJ Update",
      photo: "https://updated.com/photo.jpg",
      genre_id: 2,
      date: "2025-06-25",
      start_time: "20:30:00",
      end_time: "22:00:00",
      stage_id: 1,
    }),
  });

  const data = await response.json();
  console.log("Mise à jour réussie :", data);
}

testUpdateArtist();
