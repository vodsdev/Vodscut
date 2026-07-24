const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// --- API REST ---

// Enregistrer un site (génère une clé unique)
app.post('/api/sites', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Le nom du site est requis' });
  
  const siteKey = 'site_' + Math.random().toString(36).substr(2, 9);
  try {
    db.prepare('INSERT INTO sites (site_key, name) VALUES (?, ?)').run(siteKey, name);
    res.json({ site_key: siteKey, name });
  } catch (e) {
    res.status(500).json({ error: 'Erreur lors de la création du site' });
  }
});

// Recevoir un événement (view ou click)
app.post('/api/event', (req, res) => {
  const { site_key, url, event_type } = req.body;
  if (!site_key || !url || !event_type) {
    return res.status(400).json({ error: 'Paramètres manquants' });
  }
  
  try {
    const stmt = db.prepare('INSERT INTO events (site_key, url, event_type) VALUES (?, ?, ?)');
    stmt.run(site_key, url, event_type);

    // Émettre l'événement en temps réel vers le dashboard
    io.emit('new_event', { site_key, url, event_type, timestamp: new Date().toISOString() });

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'événement' });
  }
});

// Récupérer les stats groupées par URL pour un site donné
app.get('/api/stats/:site_key', (req, res) => {
  const { site_key } = req.params;
  try {
    const views = db.prepare(
      "SELECT url, COUNT(*) as count FROM events WHERE site_key = ? AND event_type = 'view' GROUP BY url"
    ).all(site_key);
    const clicks = db.prepare(
      "SELECT url, COUNT(*) as count FROM events WHERE site_key = ? AND event_type = 'click' GROUP BY url"
    ).all(site_key);
    res.json({ site_key, views, clicks });
  } catch (e) {
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
});

// Liste de tous les sites
app.get('/api/sites', (req, res) => {
  try {
    const sites = db.prepare('SELECT * FROM sites').all();
    res.json(sites);
  } catch (e) {
    res.status(500).json({ error: 'Erreur lors de la récupération des sites' });
  }
});

// --- Socket.IO ---
io.on('connection', (socket) => {
  console.log('Un client s\'est connecté au dashboard');
});

// Démarrage
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Lueur Analytique en écoute sur http://localhost:${PORT}`);
});
