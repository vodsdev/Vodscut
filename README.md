# ✨ Lueur Analytique

Une solution d'analytics légère, élégante et en temps réel pour vos sites web.

**Lueur Analytique** vous permet de suivre les vues de pages et les clics en direct via un dashboard sombre ("soft black") minimaliste.

## 🚀 Fonctionnalités

- **Temps Réel** : Visualisez les événements instantanément grâce aux WebSockets (Socket.IO).
- **Léger** : Un script de tracking minuscule sans dépendances externes.
- **Auto-hébergé** : Vos données restent chez vous (SQLite).
- **Dashboard Élégant** : Interface moderne optimisée pour le confort visuel.
- **Multi-sites** : Gérez plusieurs sites depuis une seule instance.

## 🛠️ Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-username/lueur-analytique.git
   cd lueur-analytique
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Démarrez le serveur :
   ```bash
   npm start
   ```

Le dashboard sera accessible sur `http://localhost:3000`.

## 📈 Utilisation

1. Ouvrez le dashboard.
2. Créez un nouveau site en lui donnant un nom.
3. Copiez le code d'intégration généré.
4. Collez-le dans le `<head>` de votre site web.

## 📁 Structure du projet

- `server.js` : Serveur Express & Socket.IO.
- `db.js` : Configuration SQLite avec `better-sqlite3`.
- `public/index.html` : Dashboard analytics.
- `public/tracker.js` : Script client à intégrer.

## 📝 Licence

Ce projet est sous licence MIT. Libre à vous de l'utiliser et de le modifier !
