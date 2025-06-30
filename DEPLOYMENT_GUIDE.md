# Guide de Déploiement des Backends Ophrus Immobilier

Ce guide explique comment déployer les deux serveurs backend Node.js (Web et Mobile) de l'application Ophrus Immobilier en production, en utilisant PM2 pour la gestion des processus et Nginx comme proxy inverse pour les rendre accessibles via des sous-domaines ou des chemins différents.

## Prérequis

*   Un serveur Linux (VPS comme DigitalOcean, AWS EC2, etc.)
*   Node.js (version 18+ recommandée) et un gestionnaire de paquets (npm ou pnpm) installés
*   MongoDB installé et en cours d'exécution (ou MongoDB Atlas pour la production)
*   PM2 installé globalement (`npm install -g pm2`)
*   Nginx installé (`sudo apt update && sudo apt install nginx`)
*   Un nom de domaine (ex: `ophrus.com`) et des sous-domaines (ex: `api.ophrus.com`, `mobile-api.ophrus.com`) pointant vers l'adresse IP de votre serveur.

## Étape 1 : Préparer les Fichiers du Backend sur le Serveur

1.  **Transférer le dossier `Ophrus-immo`** : Copiez l'intégralité du dossier `Ophrus-immo` de votre projet GitHub vers un emplacement sur votre serveur (par exemple, `/var/www/ophrus-backend/`).

    ```bash
    # Exemple de clone si vous n'avez pas encore le code sur le serveur
    cd /var/www/
    git clone https://github.com/Alvine-Mays/ophrus-backend-frontend-dashboard.git ophrus-backend-project
    cd ophrus-backend-project/Ophrus-immo
    ```

2.  **Installer les dépendances** :

    ```bash
    cd /var/www/ophrus-backend-project/Ophrus-immo
    npm install # ou pnpm install
    ```

3.  **Créer et configurer le fichier `.env`** :
    *   Créez un fichier `.env` dans le dossier `Ophrus-immo`.
    *   **TRÈS IMPORTANT : Utilisez des valeurs de production sécurisées !**

    ```dotenv
    # /var/www/ophrus-backend-project/Ophrus-immo/.env

    MONGO_URI=mongodb://localhost:27017/ophrus_immo_db # Ou votre URI MongoDB Atlas
    JWT_SECRET=VOTRE_SECRET_JWT_TRES_LONG_ET_UNIQUE_POUR_PRODUCTION # Générez une nouvelle clé très forte
    NODE_ENV=production

    # Configuration Email (utilisez vos vrais identifiants SMTP de production)
    EMAIL_HOST=smtp.votrefournisseur.com
    EMAIL_PORT=587
    EMAIL_USER=votre_email@domaine.com
    EMAIL_PASS=votre_mot_de_passe_app_email
    EMAIL_FROM=noreply@votre-domaine.com

    # URL du frontend web (pour les liens de réinitialisation d'email)
    FRONTEND_WEB_URL=https://votre-site-web.com

    # URL du frontend mobile (pour les deep links de réinitialisation d'email)
    FRONTEND_MOBILE_URL=ophrus://

    # Configuration Cloudinary (si utilisée)
    CLOUDINARY_CLOUD_NAME=votre_cloud_name
    CLOUDINARY_API_KEY=votre_api_key
    CLOUDINARY_API_SECRET=votre_api_secret
    ```

## Étape 2 : Démarrer les Serveurs avec PM2

PM2 est un gestionnaire de processus pour Node.js qui permet de garder vos applications en ligne en permanence, de les redémarrer en cas de crash, et de gérer les logs.

1.  **Naviguez dans le dossier du backend** :

    ```bash
    cd /var/www/ophrus-backend-project/Ophrus-immo
    ```

2.  **Démarrez `server-complete.js` (pour le Web)** :

    ```bash
    pm2 start server-complete.js --name "ophrus-backend-web" --watch
    ```
    *   `--name "ophrus-backend-web"` : Donne un nom facile à identifier au processus.
    *   `--watch` : Redémarre l'application si des fichiers changent (peut être omis en production).

3.  **Démarrez `server-mobile-optimized.js` (pour le Mobile)** :

    ```bash
    pm2 start server-mobile-optimized.js --name "ophrus-backend-mobile" --watch
    ```

4.  **Vérifiez l'état de PM2** :

    ```bash
    pm2 list
    ```
    Vous devriez voir les deux processus (`ophrus-backend-web` et `ophrus-backend-mobile`) listés comme étant en cours d'exécution.

5.  **Sauvegardez la configuration PM2** (pour qu'ils redémarrent après un reboot du serveur) :

    ```bash
    pm2 save
    pm2 startup
    ```
    Suivez les instructions fournies par `pm2 startup` pour configurer le démarrage automatique.

## Étape 3 : Configurer Nginx comme Proxy Inverse

Nginx va écouter les requêtes HTTP/HTTPS sur les ports 80/443 et les rediriger vers les ports internes de vos serveurs Node.js (5002 et 5003). Cela permet de ne pas exposer directement vos applications Node.js et de gérer le SSL (HTTPS) facilement.

1.  **Créez un fichier de configuration Nginx** pour votre site. Par exemple, `sudo nano /etc/nginx/sites-available/ophrus.conf`.

2.  **Collez la configuration suivante** (adaptez les noms de domaine à vos besoins) :

    ```nginx
    # Configuration pour le backend Web
    server {
        listen 80;
        server_name api.ophrus.com;

        location / {
            proxy_pass http://localhost:5002;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    # Configuration pour le backend Mobile
    server {
        listen 80;
        server_name mobile-api.ophrus.com;

        location / {
            proxy_pass http://localhost:5003;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```

3.  **Activez la configuration** :

    ```bash
    sudo ln -s /etc/nginx/sites-available/ophrus.conf /etc/nginx/sites-enabled/
    ```

4.  **Testez la configuration Nginx** :

    ```bash
    sudo nginx -t
    ```
    Si tout est correct, vous devriez voir `syntax is ok` et `test is successful`.

5.  **Redémarrez Nginx** :

    ```bash
    sudo systemctl restart nginx
    ```

## Étape 4 : Configurer HTTPS (Recommandé pour la Production)

Pour la sécurité, il est crucial d'utiliser HTTPS. Le moyen le plus simple est d'utiliser Certbot avec Let's Encrypt.

1.  **Installez Certbot** :

    ```bash
    sudo snap install core; sudo snap refresh core
    sudo snap install --classic certbot
    sudo ln -s /snap/bin/certbot /usr/bin/certbot
    ```

2.  **Obtenez les certificats SSL** pour vos domaines :

    ```bash
    sudo certbot --nginx -d api.ophrus.com -d mobile-api.ophrus.com
    ```
    Suivez les instructions. Certbot modifiera automatiquement votre configuration Nginx pour inclure le SSL et la redirection HTTP vers HTTPS.

## Étape 5 : Mettre à jour les URLs dans vos Frontends

Enfin, vous devrez mettre à jour les URLs de base de vos API dans vos applications frontend et mobile pour qu'elles pointent vers vos nouveaux domaines de production (par exemple, `https://api.ophrus.com/api` et `https://mobile-api.ophrus.com/api`).

Ce guide est également disponible dans votre dépôt GitHub à la racine du projet.

