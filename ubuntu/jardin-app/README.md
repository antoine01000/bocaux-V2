# Jardin App - Application de Gestion de Bocaux et Graines

Cette application mobile intuitive permet de gérer efficacement un stock de bocaux de cuisine faits maison ainsi qu'une collection de graines de légumes.

## Fonctionnalités

### Gestion des Bocaux
- Enregistrement des bocaux avec nom, dates, quantité et photo
- Recherche avancée par nom, date ou contenu
- Notifications pour les dates limites de consommation

### Gestion des Graines
- Catalogage des graines avec variété, dates, quantité et photo
- Recherche et tri avancés
- Alertes pour les stocks faibles

## Technologies utilisées

- Frontend: React, React Router, Styled Components
- Backend: Supabase (PostgreSQL, Auth, Storage)
- Déploiement: Netlify

## Installation et démarrage local

1. Cloner le dépôt
```
git clone <url-du-repo>
cd jardin-app
```

2. Installer les dépendances
```
cd frontend
npm install
```

3. Configurer les variables d'environnement
Créez un fichier `.env` dans le dossier `frontend` avec les informations suivantes:
```
VITE_SUPABASE_URL=https://iunfihikvlarustuhamo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1bmZpaGlrdmxhcnVzdHVoYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMTUyMTksImV4cCI6MjA1NDY5MTIxOX0.NgFr1RMhT4eoOJgps73LFOHUexZ6vFCtejcBBqylRXI
```

4. Démarrer l'application en mode développement
```
npm run dev
```

## Déploiement sur Netlify

### Option 1: Déploiement via l'interface Netlify

1. Créez un compte sur [Netlify](https://www.netlify.com/)
2. Cliquez sur "New site from Git"
3. Connectez votre dépôt Git
4. Configurez les paramètres de build:
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`
5. Ajoutez les variables d'environnement:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
6. Cliquez sur "Deploy site"

### Option 2: Déploiement via Netlify CLI

1. Installez Netlify CLI
```
npm install -g netlify-cli
```

2. Connectez-vous à votre compte Netlify
```
netlify login
```

3. Initialisez votre projet
```
netlify init
```

4. Déployez votre site
```
netlify deploy --prod
```

## Structure du projet

```
jardin-app/
├── frontend/               # Code source frontend
│   ├── public/             # Ressources statiques
│   ├── src/                # Code source React
│   │   ├── components/     # Composants réutilisables
│   │   ├── context/        # Contextes React
│   │   ├── hooks/          # Hooks personnalisés
│   │   ├── pages/          # Pages de l'application
│   │   ├── utils/          # Utilitaires
│   │   ├── App.jsx         # Composant principal
│   │   └── main.jsx        # Point d'entrée
│   ├── index.html          # Template HTML
│   ├── package.json        # Dépendances
│   └── vite.config.js      # Configuration Vite
├── backend/                # Scripts backend
│   └── schema.sql          # Schéma de la base de données
├── docs/                   # Documentation
└── netlify.toml            # Configuration Netlify
```
