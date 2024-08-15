const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Configurez Body-Parser
app.use(bodyParser.json());

// Servir les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Créez une connexion à la base de données SQLite
const db = new sqlite3.Database('./checklist.db', (err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données:', err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
  }
});

// Route pour obtenir les items
app.get('/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json({ items: rows });
  });
});

// Route pour mettre à jour un item
app.post('/items', (req, res) => {
  const { id, label, checked } = req.body;
  db.run('INSERT OR REPLACE INTO items (id, label, checked) VALUES (?, ?, ?)', [id, label, checked], function(err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message: 'Item mis à jour', changes: this.changes });
  });
});

// Démarrez le serveur
app.listen(port, () => {
  console.log(`Serveur Express en écoute sur http://localhost:${port}`);
});
