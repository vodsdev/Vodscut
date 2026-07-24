# 🚀 Vodscut : Solution d'Analyse de Trafic Web en Temps Réel

**Vodscut** est une plateforme d'analyse de trafic web conçue pour les entreprises, offrant une visibilité instantanée sur l'engagement des utilisateurs. Cette solution auto-hébergée fournit des données de vues de pages et de clics en temps réel, présentées via un tableau de bord intuitif et sécurisé.

## ✨ Avantages Clés pour l'Entreprise

- **Analyse en Temps Réel** : Suivez les interactions des utilisateurs (vues, clics) au moment où elles se produisent, permettant des réactions rapides et informées.
- **Souveraineté des Données** : Toutes les données sont stockées localement sur votre infrastructure (SQLite), garantissant une conformité totale avec les réglementations de confidentialité (ex: RGPD) et une maîtrise complète de vos informations.
- **Performance Optimale** : Le script de tracking est ultra-léger et utilise des technologies modernes comme `navigator.sendBeacon` pour minimiser l'impact sur les performances de votre site web.
- **Tableau de Bord Professionnel** : Une interface utilisateur épurée et ergonomique, avec un thème sombre, conçue pour une lecture claire et une prise de décision efficace.
- **Gestion Multi-Projets** : Centralisez l'analyse de plusieurs sites web ou applications au sein d'une seule instance Vodscut.
- **Extensibilité** : Une architecture modulaire basée sur Node.js, Express et Socket.IO, facilitant l'intégration avec d'autres systèmes et l'ajout de fonctionnalités personnalisées.

## 🛠️ Stack Technologique

- **Backend** : Node.js, Express.js
- **Communication Temps Réel** : Socket.IO (WebSockets)
- **Base de Données** : SQLite (fichier local, haute performance et faible maintenance)
- **Frontend** : HTML5, CSS3 (Vanilla), JavaScript (Vanilla)

## 📦 Installation et Déploiement

### 1. Prérequis
- Node.js (version 14 ou supérieure)
- npm (Node Package Manager)

### 2. Démarrage Rapide

Clonez le dépôt Vodscut :
```bash
git clone https://github.com/vodsdev/Vodscut.git
cd Vodscut
```

Installez les dépendances :
```bash
npm install
```

Lancez le serveur :
```bash
npm start
```

Le tableau de bord sera accessible via votre navigateur à l'adresse `http://localhost:3000`.

## 📈 Intégration de Vos Projets Web

1. **Création d'un Projet** : Accédez au tableau de bord Vodscut et utilisez l'interface pour enregistrer un nouveau projet. Une `site_key` unique vous sera attribuée.
2. **Intégration du Script** : Copiez le fragment de code JavaScript fourni par le tableau de bord.
3. **Déploiement sur Votre Site** : Insérez ce script dans la section `<head>` de chaque page de votre site web que vous souhaitez monitorer. Assurez-vous de remplacer `votre-domaine.com` par l'URL de votre instance Vodscut et `site_votre_cle_unique` par la `site_key` générée.

```html
<script 
  src="http://votre-domaine.com/tracker.js" 
  data-site-key="site_votre_cle_unique">
</script>
```

## 📂 Structure du Projet

```
Vodscut/
├── server.js           # Serveur principal (API REST & Socket.IO)
├── db.js               # Configuration et initialisation de la base de données SQLite
├── package.json        # Métadonnées et dépendances du projet
├── .gitignore          # Fichiers et dossiers à ignorer par Git
└── public/
    ├── index.html      # Tableau de bord d'administration
    └── tracker.js      # Script de tracking client
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des issues ou des pull requests pour améliorer Vodscut.

## ⚖️ Licence

Ce projet est distribué sous la licence MIT. Voir le fichier `LICENSE` pour plus de détails.
