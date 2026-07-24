const Database = require('better-sqlite3');
const db = new Database('analytics.db');

// Création des tables avec gestion des erreurs
try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS sites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      site_key TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      site_key TEXT NOT NULL,
      url TEXT NOT NULL,
      event_type TEXT NOT NULL,   -- 'view' ou 'click'
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(site_key) REFERENCES sites(site_key)
    );
  `);
  console.log('Base de données initialisée avec succès.');
} catch (error) {
  console.error('Erreur lors de l\'initialisation de la base de données:', error);
}

module.exports = db;
