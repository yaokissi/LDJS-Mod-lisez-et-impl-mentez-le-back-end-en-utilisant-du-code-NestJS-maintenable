# ChâTop - Portail de Location Saisonnière

Application Full-Stack TypeScript (React & NestJS) mettant en relation des locataires et des propriétaires pour des locations saisonnières.

---

## 🛠️ Stack Technologique

### Front-end
* **Framework** : React 19
* **Styling** : TailwindCSS 3.4
* **State & Query** : TanStack Query (React Query)
* **Client HTTP** : Axios

### Back-end
* **Framework** : NestJS 11 (Express)
* **ORM** : Prisma Client
* **Base de données** : MySQL / MariaDB (Driver Adapter `PrismaMariaDb`)
* **Authentification & Sécurité** : Passport JWT, chiffrement `bcrypt`
* **Documentation** : Swagger (OpenAPI 3)

---

## 💾 Procédure d'installation de la Base de Données

Le projet utilise **MySQL** (ou MariaDB) comme système de gestion de base de données.

1. **Création et Importation** : 
   Exécutez le script SQL fourni pour créer la base `chatop_db` et ses tables localement :
   ```bash
   mysql -u root -p < ressources/sql/schema.sql
   ```
2. **Vérification** : 
   Vous pouvez également utiliser le fichier d'export officiel requis pour les livrables : `Kissi_Yao_2_BDD_072026.txt` (contenant le dump DDl).

---

## ⚙️ Configuration et Lancement du Projet Pas-à-Pas

### 1. Démarrage du Back-end (NestJS)

1. Allez dans le dossier `backend` :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Créez un fichier `.env` à la racine de `backend/` et configurez les variables d'environnement :
   ```env
   PORT=3001
   DATABASE_URL="mysql://chatop_user:azerty1@localhost:3306/chatop_db"
   JWT_SECRET="votre_cle_secrete_jwt"
   ```
4. Générez le client Prisma :
   ```bash
   npx prisma generate
   ```
5. Lancez le serveur en mode développement :
   ```bash
   npm run start:dev
   ```
   Le serveur de l'API démarre sur **[http://localhost:3001/api](http://localhost:3001/api)**.

---

### 2. Démarrage du Front-end (React)

1. Ouvrez un nouveau terminal et allez dans le dossier `frontend` :
   ```bash
   cd frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez l'application en mode développement :
   ```bash
   npm run dev
   ```
   L'application sera accessible dans votre navigateur sur **[http://localhost:5173](http://localhost:5173)**.

---

## 📘 Documentation interactive Swagger (URL)

Toutes les routes du back-end sont documentées et prêtes à être testées en ligne via l'interface Swagger.

* **URL du Swagger** : **[http://localhost:3001/api/swagger](http://localhost:3001/api/swagger)**

### Tester les routes privées dans Swagger :
1. Créez un compte via `/api/auth/register` ou connectez-vous via `/api/auth/login`.
2. Copiez le jeton de sécurité (`token`) reçu dans la réponse JSON.
3. Cliquez sur le bouton vert **Authorize** en haut à droite.
4. Collez le jeton dans le champ et validez. Vous pouvez à présent interroger l'ensemble des routes privées (Rentals, User, Messages).
