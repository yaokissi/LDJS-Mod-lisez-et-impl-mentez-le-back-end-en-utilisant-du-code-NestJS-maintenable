# ChâTop - Back-end NestJS API

API REST robuste et modulaire développée pour le projet **ChâTop**, un portail de location saisonnière mettant en relation locataires et propriétaires.

---

## 🛠️ Procédure pas à pas pour installer et lancer le projet

### 1. Installation des dépendances
Assurez-vous d'avoir installé **Node.js 22+**.
Placez-vous à la racine du dossier `backend/` et exécutez la commande d'installation :
```bash
npm install
```

### 2. Configuration des variables d'environnement
Créez un fichier `.env` à la racine du dossier `backend/` :
```env
# Port d'écoute du serveur (Requis 3001 pour le front-end React)
PORT=3001

# Chaîne de connexion à la base de données MySQL
DATABASE_URL="mysql://chatop_user:azerty1@localhost:3306/chatop_db"

# Clé secrète de signature des tokens JWT
JWT_SECRET="votre_cle_secrete_ultra_securisee"
```

### 3. Lancement du serveur

* **Lancement en mode développement (Recommandé)** : 
  Démarre le serveur et compile automatiquement le code à chaque modification :
  ```bash
  npm run start:dev
  ```
  Le serveur démarre sur **[http://localhost:3001/api](http://localhost:3001/api)**.

* **Build et Lancement en production** :
  ```bash
  npm run build
  npm run start
  ```

---

## 💾 Procédure d'installation de la base de données

Le projet utilise **MySQL** (ou MariaDB) comme base de données.

### Méthode 1 : Importation du script SQL de création (Recommandé)
Le script de création officiel **`Kissi_Yao_2_BDD_072026.txt`** est inclus à la racine de ce dossier `backend/`. 

Pour initialiser votre base de données locale :
1. Créez une base de données MySQL nommée `chatop_db` (si ce n'est pas déjà fait).
2. Exécutez le script d'importation dans votre terminal :
   ```bash
   mysql -u [votre_nom_utilisateur] -p < Kissi_Yao_2_BDD_072026.txt
   ```

### Méthode 2 : Synchronisation avec Prisma CLI
Si vous préférez laisser Prisma créer et synchroniser directement la base de données sans exécuter de fichier SQL :
1. Assurez-vous d'avoir configuré le fichier `.env` avec vos accès MySQL.
2. Lancez la commande suivante dans le terminal :
   ```bash
   npx prisma db push
   ```

Dans tous les cas, générez le client Prisma pour initialiser l'ORM :
```bash
npx prisma generate
```

---

## 📘 L'URL du Swagger (Documentation)

L'API est entièrement documentée à l'aide de Swagger (OpenAPI 3).

* **URL du Swagger** : **[http://localhost:3001/api/swagger](http://localhost:3001/api/swagger)**

### Comment tester les routes sécurisées dans Swagger ?
1. Cliquez sur l'endpoint `/api/auth/login` (ou `/api/auth/register`) pour vous connecter/inscrire.
2. Copiez le jeton de sécurité (`token`) reçu dans la réponse JSON.
3. Cliquez sur le bouton vert **Authorize** en haut à droite.
4. Collez le jeton dans le champ et validez. Vous pouvez à présent interroger l'ensemble des routes privées (Rentals, User, Messages) directement depuis l'UI Swagger.

---

## 📂 Structure du code backend

Le code est structuré selon les normes recommandées par NestJS :
* `src/prisma` : Module global gérant la connexion à la base de données.
* `src/auth` : Inscription, Connexion, Profil (JWT Strategy & Guards).
* `src/rentals` : Liste, détails, création (avec upload d'image via Multer) et édition de locations.
* `src/user` : Consultation des fiches utilisateurs.
* `src/messages` : Envoi de messages aux propriétaires.
* `uploads/` : Dossier physique servant les images statiques uploadées.

