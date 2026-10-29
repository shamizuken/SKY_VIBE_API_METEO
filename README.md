# 🌤️ SkyVibe - Dashboard météo contextuel

> Une application web interactive développée dans le cadre de l'apprentissage de JavaScript moderne et de la consommation d'APIs REST. SkyVibe récupère la météo en temps réel d'une ville et adapte dynamiquement l'interface visuelle ainsi que ses recommandations d'activités.

---

## 🚀 Fonctionnalités
* **Recherche géographique dynamique** par nom de ville.
* **Affichage en temps réel** de la température et des conditions météorologiques.
* **Dynamic UI System :** Le fond d'écran (dégradé CSS) et l'ambiance visuelle changent automatiquement selon le type de temps.
* **Recommandations contextuelles :** Suggestions d'activités ou de tenues adaptées (chocolat chaud, terrasse, etc.).
* **Design moderne & Responsive** inspiré du Glassmorphism (`backdrop-filter`).

---

## 💻 Stack technique
* **HTML5** (Structure sémantique)
* **CSS3** (Flexbox, Variables, Transitions fluides, Glassmorphism)
* **JavaScript (ES6+)** (Asynchronisme, Manipulation du DOM)
* **API Externe :** Open-Meteo & Open-Meteo Geocoding (Gratuit, sans clé d'API)
* **Icônes :** FontAwesome

---

## 🧠 Ce que j'ai appris et mis en pratique

Ce projet m'a permis de consolider des concepts fondamentaux du développement Front-End moderne :

1. **Gestion de l'asynchronisme (`async`/`await`) :**
   * Comprendre comment interroger un serveur distant et attendre la réponse sans bloquer l'interface utilisateur.
2. **Consommation d'APIs REST :**
   * Enchaînement de deux requêtes `fetch` (une première pour convertir le nom de la ville en coordonnées GPS via le géocodage, puis une seconde pour récupérer la météo).
3. **Sécurité et gestion des erreurs (`try...catch`) :**
   * Mise en place de blocs de sécurité pour anticiper les pannes réseau ou les erreurs de saisie utilisateur (ex: ville introuvable).
4. **Optimisation logique (`Array.prototype.includes()`) :**
   * Utilisation de `.includes()` pour regrouper plusieurs codes météo similaires dans une seule condition, rendant le code JavaScript beaucoup plus propre et lisible.
5. **Liaison DOM & CSS Dynamique :**
   * Modification programmée des classes du `document.body` en fonction des données reçues pour déclencher des transitions de design fluides.

---
## 🧩 Problèmes rencontrés et solutions

Durant le développement de SkyVibe, j'ai dû faire face à quelques défis techniques :
1. La gestion des codes météo invisibles (Le piège du fond mauve) :

* Le problème : Au début, certaines villes (comme Paris ou Séoul) affichaient toujours le fond mauve par défaut, car les codes météo renvoyés par l'API (comme 2 ou 3 pour un ciel nuageux) pointaient par erreur vers une classe CSS inexistante ou déjà utilisée.

* La solution : J'ai analysé les retours de la console (console.log) pour identifier précisément les codes manquants, puis j'ai créé une classe CSS dédiée (.weather-cloudy) et amélioré la logique de filtrage avec des plages de valeurs (>= et <=) pour couvrir l'ensemble des cas de l'API Open-Meteo.

2. L'enchaînement des requêtes asynchrones (Fetch en cascade) :

* Le problème : L'API météo avait impérativement besoin de la latitude et de la longitude, alors que l'utilisateur ne saisissait que le nom d'une ville.

* La solution : J'ai structuré un code asynchrone avec async/await pour enchaîner deux requêtes distinctes : d'abord interroger l'API de géocodage pour récupérer les coordonnées GPS, puis injecter dynamiquement ces coordonnées dans l'URL de l'API météo.

---

## 🔗 Lien du projet
