require("dotenv").config();
const db = require("./models/db");

(async () => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("Connexion réussie ! Résultat:", rows[0].result);
  } catch (err) {
    console.log("Erreur de connexion...", err);
  }
})();
