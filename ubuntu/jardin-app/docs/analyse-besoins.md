# Analyse des besoins - Application de Gestion de Bocaux et Graines

## Objectif de l'application
Développer une application mobile intuitive et facile à utiliser pour gérer efficacement un stock de bocaux de cuisine faits maison ainsi qu'une collection de graines de légumes.

## Fonctionnalités principales

### 1. Gestion des Bocaux

#### Données à enregistrer pour chaque bocal
- Nom de la préparation
- Date de fabrication
- Date limite de consommation conseillée
- Quantité disponible
- Photo optionnelle du bocal
- Remarques ou notes particulières

#### Fonctionnalités spécifiques
- Fonction de recherche rapide par nom, date ou contenu
- Notifications optionnelles pour signaler les dates limites approchant

### 2. Gestion des Graines de légumes

#### Données à enregistrer pour chaque variété de graines
- Nom et variété du légume
- Date de récolte des graines
- Date limite d'utilisation optimale
- Quantité en stock
- Photo représentant clairement la variété
- Remarques ou informations supplémentaires
  - Conditions de conservation
  - Origine des graines
  - Rendement observé

#### Fonctionnalités spécifiques
- Fonction de recherche et de tri par nom, date ou variété
- Alertes optionnelles pour les stocks faibles ou dates limites proches

## Exigences techniques

### Interface utilisateur
- Navigation facile entre les deux grandes fonctionnalités
- Visualisation claire et esthétique des photos associées à chaque élément
- Interface intuitive et facile à utiliser

### Stockage et synchronisation
- Sauvegarde régulière des données
- Synchronisation possible entre plusieurs appareils

### Technologies requises
- Backend: Supabase
  - URL: https://iunfihikvlarustuhamo.supabase.co
  - API Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1bmZpaGlrdmxhcnVzdHVoYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMTUyMTksImV4cCI6MjA1NDY5MTIxOX0.NgFr1RMhT4eoOJgps73LFOHUexZ6vFCtejcBBqylRXI
- Déploiement: Netlify

## Structure de la base de données

### Table "bocaux"
- id (UUID, clé primaire)
- nom (VARCHAR, obligatoire)
- date_fabrication (DATE, obligatoire)
- date_limite_consommation (DATE, optionnel)
- quantite (INTEGER, obligatoire)
- photo_url (TEXT, optionnel)
- remarques (TEXT, optionnel)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Table "graines"
- id (UUID, clé primaire)
- nom (VARCHAR, obligatoire)
- variete (VARCHAR, obligatoire)
- date_recolte (DATE, obligatoire)
- date_limite_utilisation (DATE, optionnel)
- quantite (INTEGER, obligatoire)
- photo_url (TEXT, optionnel)
- remarques (TEXT, optionnel)
- conditions_conservation (TEXT, optionnel)
- origine (TEXT, optionnel)
- rendement (TEXT, optionnel)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
