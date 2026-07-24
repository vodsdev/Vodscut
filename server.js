const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const db = require('./db');

const app = express();
const server = http.createServer(app);

// Configuration Socket.IO avec support CORS pour le dashboard
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// --- API REST ---

/**
 * Enregistrer un nouveau site
 * POST /api/sites
 * Body: { name: string }
 */
app.post('/api/sites', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Le nom du site est requis' });
  }

  const siteKey = 'site_' + Math.random().toString(36).substr(2, 9);
  try {
    const stmt = db.prepare('INSERT INTO sites (site_key, name) VALUES (?, ?)');
    stmt.run(siteKey, name);
    res.json({ site_key: siteKey, name });
  } catch (e) {
    console.error('Erreur lors de la création du site:', e);
    res.status(500).json({ error: 'Erreur lors de la création du site ou clé déjà existante' });
  }
});

/**
 * Recevoir un événement (vue ou clic)
 * POST /api/event
 * Body: { site_key: string, url: string, event_type: 'view' | 'click' }
 */
app.post('/api/event', (req, res) => {
  const { site_key, url, event_type } = req.body;
  
  if (!site_key || !url || !event_type) {
    return res.status(400).json({ error: 'Paramètres manquants (site_key, url, event_type requis)' });
  }

  try {
    // Vérifier si le site existe (optionnel mais recommandé)
    const site = db.prepare('SELECT * FROM sites WHERE site_key = ?').get(site_key);
    if (!site) {
      return res.status(404).json({ error: 'Clé de site invalide' });
    }

    const stmt = db.prepare('INSERT INTO events (site_key, url, event_type) VALUES (?, ?, ?)');
    stmt.run(site_key, url, event_type);

    // Émettre l'événement en temps réel vers le dashboard
    io.emit('new_event', { 
      site_key, 
      url, 
      event_type, 
      timestamp: new Date().toISOString() 
    });

    res.json({ success: true });
  } catch (e) {
    console.error('Erreur lors de l\'enregistrement de l\'événement:', e);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

/**
 * Récupérer les statistiques pour un site
 * GET /api/stats/:site_key
 */
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
    console.error('Erreur lors de la récupération des statistiques:', e);
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
});

/**
 * Liste de tous les sites enregistrés
 * GET /api/sites
 */
app.get('/api/sites', (req, res) => {
  try {
    const sites = db.prepare('SELECT * FROM sites ORDER BY id DESC').all();
    res.json(sites);
  } catch (e) {
    console.error('Erreur lors de la récupération des sites:', e);
    res.status(500).json({ error: 'Erreur lors de la récupération des sites' });
  }
});

// --- Socket.IO ---
io.on('connection', (socket) => {
  console.log('Dashboard connecté:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Dashboard déconnecté');
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`
  🚀 Lueur Analytique démarrée !
  📡 Dashboard : http://localhost:${PORT}
  🛠️  API REST : http://localhost:${PORT}/api
  `);
});
