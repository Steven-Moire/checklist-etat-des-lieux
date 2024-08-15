const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Lire le fichier JSON
const jsonFile = 'items.json'; // Chemin vers le fichier JSON
const dbFile = 'checklist.db'; // Nom du fichier de base de données SQLite

// Charger les données JSON
const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

// Ouvrir une connexion à la base de données SQLite
let db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error('Erreur lors de l\'ouverture de la base de données:', err.message);
    } else {
        console.log('Connexion à la base de données réussie.');
    }
});

// Créer la table si elle n'existe pas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL,
        checked BOOLEAN NOT NULL DEFAULT 0
    )`);

    // Préparer l'insertion des données
    let stmt = db.prepare('INSERT INTO items (label) VALUES (?)');
    data.forEach(item => {
        stmt.run(item);
    });

    stmt.finalize(() => {
        console.log('Données insérées avec succès.');
    });
});

// Fermer la connexion
db.close((err) => {
    if (err) {
        console.error('Erreur lors de la fermeture de la base de données:', err.message);
    } else {
        console.log('Connexion à la base de données fermée.');
    }
});
