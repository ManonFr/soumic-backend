const fetch = require("node-fetch");

async function testDeleteArtist() {
  const artistId = 226;

  const response = await fetch(`http://localhost:3001/artists/${artistId}`, {
    method: "DELETE",
  });

  if (response.status === 204) {
    console.log("Artiste avec l'ID ${artistId} supprimé avec succès");
  } else {
    const error = await response.json();
    console.error("Erreur pendant la suppression :", error);
  }
}

testDeleteArtist();
