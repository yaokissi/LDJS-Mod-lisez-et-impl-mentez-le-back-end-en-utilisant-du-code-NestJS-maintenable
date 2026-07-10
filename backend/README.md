# ChâTop - Back-end NestJS API

API REST robuste et modulaire développée pour le projet **ChâTop**, un portail de location saisonnière mettant en relation locataires et propriétaires.

## 🛠️ Stack Technologique

* **Framework** : NestJS 11 (Express)
* **Langage** : TypeScript 5
* **ORM & Base de données** : Prisma avec MySQL / MariaDB (Driver Adapter `PrismaMariaDb`)
* **Sécurité** : Passport + JWT, chiffrement des mots de passe avec `bcrypt`
* **Validation** : `class-validator` & `class-transformer`
* **Documentation** : Swagger (OpenAPI 3)

---

## ⚙️ Prérequis et Installation

### 1. Cloner et configurer le projet
Assurez-vous d'avoir installé **Node.js 22+** et **MySQL / MariaDB**.

Installez les dépendances à la racine du dossier `backend/` :
```bash
npm install
```

### 2. Configurer les variables d'environnement
Créez un fichier `.env` à la racine du dossier `backend/` sur le modèle suivant :
```env
# Port d'écoute du serveur (Requis 3001 pour le front-end React)
PORT=3001

# Chaîne de connexion à la base de données MySQL
DATABASE_URL="mysql://root:mot_de_passe@localhost:3306/chatop_db"

# Clé secrète de signature des tokens JWT
JWT_SECRET="votre_cle_secrete_ultra_securisee"
```

### 3. Base de données et Prisma
1. Importez le schéma SQL dans votre base de données locale depuis le fichier `ressources/sql/schema.sql`.
2. Générer le client Prisma en exécutant :
   ```bash
   npx prisma generate
   ```

---

## 🚀 Lancement de l'application

### Lancement en mode développement (Watch)
Démarre le serveur et compile automatiquement le code à chaque modification :
```bash
npm run start:dev
```
Le serveur démarrera sur **[http://localhost:3001/api](http://localhost:3001/api)**.

### Build et Lancement en production
```bash
npm run build
npm run start
```

---

## 📘 Documentation interactive Swagger

L'API est entièrement documentée à l'aide de Swagger (OpenAPI 3). 

* **URL de la documentation** : **[http://localhost:3001/api/swagger](http://localhost:3001/api/swagger)**

### Comment tester les routes sécurisées dans Swagger ?
1. Cliquez sur l'endpoint `/api/auth/login` (ou `/api/auth/register`) pour vous connecter/inscrire.
2. Copiez le jeton (`token`) reçu dans la réponse de succès.
3. Cliquez sur le bouton vert **Authorize** en haut à droite de l'interface Swagger.
4. Collez votre token dans le champ et validez.
5. Vous pouvez désormais tester l'ensemble des routes privées (Locations, Messages, etc.) directement depuis Swagger.

---

## 📂 Structure du code backend

Le code est structuré selon les normes recommandées par NestJS :
* `src/prisma` : Module global gérant la connexion à la base de données.
* `src/auth` : Inscription, Connexion, Profil (JWT Strategy & Guards).
* `src/rentals` : Liste, détails, création (avec upload d'image via Multer) et édition de locations.
* `src/user` : Consultation des fiches utilisateurs.
* `src/messages` : Envoi de messages aux propriétaires.
* `uploads/` : Dossier physique servant les images statiques uploadées.
