# ✨ Lueur Analytique

Une solution d'analytics **temps réel**, élégante et auto-hébergée pour vos projets web.

**Lueur Analytique** offre une alternative minimaliste aux solutions complexes. Suivez vos visiteurs et leurs interactions en direct sur un dashboard moderne au design "soft black".

## 🚀 Points Forts

- **⚡ Temps Réel Absolu** : Visualisez chaque vue et chaque clic à la seconde près via WebSockets.
- **🛡️ Confidentialité** : Vos données sont stockées localement dans une base SQLite. Pas de tiers, pas de cookies intrusifs.
- **📉 Performance** : Script de tracking ultra-léger (< 1ko) utilisant `navigator.sendBeacon` pour ne pas ralentir la navigation.
- **🎨 Design Soft Black** : Interface sombre soignée, optimisée pour le monitoring prolongé sans fatigue visuelle.

## 🛠️ Stack Technique

- **Backend** : Node.js, Express
- **Temps Réel** : Socket.IO
- **Base de Données** : SQLite (`better-sqlite3`)
- **Frontend** : HTML5, CSS3 (Variables), JS Vanilla

## 📦 Installation & Lancement

### 1. Prérequis
- Node.js (v14+)
- npm ou pnpm

### 2. Installation
```bash
git clone https://github.com/votre-username/lueur-analytique.git
cd lueur-analytique
npm install
```

### 3. Démarrage
```bash
npm start
```
Le dashboard est disponible sur `http://localhost:3000`.

## 📈 Guide d'Intégration

1. Créez un projet depuis le dashboard pour obtenir votre `site_key`.
2. Copiez le script d'intégration fourni.
3. Collez-le dans la section `<head>` de votre site :

```html
<script 
  src="http://votre-domaine.com/tracker.js" 
  data-site-key="site_votre_cle_unique">
</script>
```

## 📂 Architecture

- `server.js` : Point d'entrée, gestion des routes API et des connexions WebSocket.
- `db.js` : Initialisation et schéma de la base de données.
- `public/` : Fichiers statiques du dashboard et du tracker.
- `analytics.db` : Fichier de base de données généré automatiquement.

## 📝 Licence

Projet distribué sous licence MIT. Développé avec passion pour le web ouvert.
