# 🚀 Système de Suggestions - Projet Angular

![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

Application web moderne de gestion de suggestions développée avec Angular pour le cours d'Initiation aux Applications Client.

## ✨ Fonctionnalités

### 🎯 Workshop 1 - Bases d'Angular
- **Configuration de l'environnement** Angular CLI
- **Création de composants** : Header, Footer
- **Initialisation** d'un projet Angular moderne

### 🔧 Workshop 2 - Manipulation des Composants
- **Composants Angular** : Header, Footer, ListSuggestion
- **Data Binding** complet :
  - Interpolation `{{ }}`
  - Property binding `[ ]`
  - Event binding `( )`
  - Two-way binding `[(ngModel)]`
- **Directives** :
  - `*ngFor` pour les listes
  - `*ngIf` pour l'affichage conditionnel
  - `[ngClass]` pour les classes dynamiques
- **Interface TypeScript** : Modèle `Suggestion`
- **Fonctionnalités interactives** :
  - Filtrage des suggestions par catégorie
  - Recherche en temps réel
  - Boutons Like et Favoris
  - Gestion des états (acceptée/refusée/en attente)

### 🗺️ Workshop 3 - Routage et Lazy Loading
- **Routage Angular** avec `RouterModule`
- **Lazy Loading** des modules :
  - Module `Suggestions` chargé uniquement sur `/suggestions`
  - Module `Users` chargé uniquement sur `/users`
- **Navigation SPA** :
  - Page d'accueil (`/home`)
  - Liste des suggestions (`/suggestions`)
  - Détails d'une suggestion (`/suggestions/:id`)
  - Page 404 (`/**`)
- **Services de routage** :
  - `ActivatedRoute` pour les paramètres
  - `Router` pour la navigation programmatique


