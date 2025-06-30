# Documentation API Backend - Ophrus Immobilier Mobile

## Vue d'ensemble

Cette documentation présente l'API REST du backend Ophrus Immobilier, spécialement conçue pour être consommée par une application mobile React Native/Expo. L'API fournit toutes les fonctionnalités nécessaires pour l'authentification, la gestion des utilisateurs, la réinitialisation de mot de passe, et la gestion des propriétés immobilières.

### URL de Base

**Développement Local :** `http://localhost:5002/api`
**Production :** `https://votre-domaine.com/api`

### Authentification

L'API utilise l'authentification par JSON Web Token (JWT). Une fois connecté, le token doit être inclus dans l'en-tête `Authorization` de toutes les requêtes vers les routes protégées :

```
Authorization: Bearer <votre_jwt_token>
```

### Format des Réponses

Toutes les réponses de l'API suivent un format standardisé :

```json
{
  "success": true|false,
  "message": "Message descriptif",
  "data": { /* Données de la réponse */ },
  "error": "Message d'erreur (si applicable)"
}
```

## Routes d'Authentification

### 1. Inscription d'un Utilisateur

**Endpoint :** `POST /api/auth/register`

**Description :** Permet à un nouvel utilisateur de créer un compte.

**Corps de la Requête :**
```json
{
  "email": "user@example.com",
  "password": "motdepasse123",
  "firstName": "Prénom",
  "lastName": "Nom"
}
```

**Réponse de Succès (201) :**
```json
{
  "success": true,
  "message": "Compte créé avec succès",
  "data": {
    "id": "user_id_mongodb",
    "email": "user@example.com",
    "firstName": "Prénom",
    "lastName": "Nom"
  }
}
```

**Erreurs Possibles :**
- `400` : Email déjà utilisé
- `400` : Données manquantes ou invalides
- `500` : Erreur serveur

### 2. Connexion d'un Utilisateur

**Endpoint :** `POST /api/auth/login`

**Description :** Authentifie un utilisateur et retourne un JWT pour les requêtes ultérieures.

**Corps de la Requête :**
```json
{
  "email": "user@example.com",
  "password": "motdepasse123"
}
```

**Réponse de Succès (200) :**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "user_id_mongodb",
    "email": "user@example.com",
    "role": "user",
    "firstName": "Prénom",
    "lastName": "Nom"
  }
}
```

**Erreurs Possibles :**
- `401` : Identifiants invalides
- `500` : Erreur serveur

### 3. Profil Utilisateur (Route Protégée)

**Endpoint :** `GET /api/auth/profile`

**Description :** Récupère les informations du profil de l'utilisateur connecté.

**En-têtes Requis :**
```
Authorization: Bearer <jwt_token>
```

**Réponse de Succès (200) :**
```json
{
  "success": true,
  "data": {
    "id": "user_id_mongodb",
    "email": "user@example.com",
    "role": "user",
    "firstName": "Prénom",
    "lastName": "Nom",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Erreurs Possibles :**
- `401` : Token manquant ou invalide
- `404` : Utilisateur non trouvé
- `500` : Erreur serveur

## Routes de Réinitialisation de Mot de Passe

### 4. Demande de Réinitialisation

**Endpoint :** `POST /api/auth/reset-password-request`

**Description :** Envoie un email avec un lien de réinitialisation de mot de passe.

**Corps de la Requête :**
```json
{
  "email": "user@example.com"
}
```

**Réponse de Succès (200) :**
```json
{
  "success": true,
  "message": "Un email de réinitialisation a été envoyé à votre adresse"
}
```

**Note :** Pour des raisons de sécurité, l'API retourne toujours un message de succès, même si l'email n'existe pas dans la base de données.

### 5. Vérification du Token de Réinitialisation

**Endpoint :** `POST /api/auth/verify-reset-token`

**Description :** Vérifie la validité d'un token de réinitialisation.

**Corps de la Requête :**
```json
{
  "token": "token_de_reinitialisation"
}
```

**Réponse de Succès (200) :**
```json
{
  "success": true,
  "message": "Token valide",
  "email": "user@example.com"
}
```

**Erreurs Possibles :**
- `400` : Token invalide ou expiré
- `500` : Erreur serveur

### 6. Réinitialisation du Mot de Passe

**Endpoint :** `POST /api/auth/reset-password`

**Description :** Réinitialise le mot de passe avec un token valide.

**Corps de la Requête :**
```json
{
  "token": "token_de_reinitialisation",
  "newPassword": "nouveaumotdepasse123"
}
```

**Réponse de Succès (200) :**
```json
{
  "success": true,
  "message": "Mot de passe réinitialisé avec succès"
}
```

**Erreurs Possibles :**
- `400` : Token invalide ou expiré
- `400` : Mot de passe trop court (minimum 6 caractères)
- `500` : Erreur serveur

## Routes Administratives

### 7. Création d'un Utilisateur Admin de Test

**Endpoint :** `POST /api/admin/create-test-user`

**Description :** Crée un utilisateur administrateur pour les tests (développement uniquement).

**Réponse de Succès (200) :**
```json
{
  "success": true,
  "message": "Utilisateur admin créé avec succès"
}
```

**Identifiants Créés :**
- Email : `admin@ophrus.com`
- Mot de passe : `password123`
- Rôle : `admin`

## Route de Test

### 8. Test de Connectivité

**Endpoint :** `GET /api/test`

**Description :** Vérifie que l'API est opérationnelle.

**Réponse de Succès (200) :**
```json
{
  "success": true,
  "message": "Backend Ophrus complet fonctionnel",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "features": [
    "Authentification",
    "Inscription",
    "Réinitialisation mot de passe",
    "Gestion des rôles"
  ]
}
```

## Gestion des Erreurs

### Codes de Statut HTTP

- `200` : Succès
- `201` : Créé avec succès
- `400` : Requête invalide (données manquantes ou incorrectes)
- `401` : Non autorisé (authentification requise ou invalide)
- `403` : Interdit (permissions insuffisantes)
- `404` : Ressource non trouvée
- `500` : Erreur serveur interne

### Format des Erreurs

```json
{
  "success": false,
  "message": "Description de l'erreur",
  "error": "Détails techniques (optionnel)"
}
```

## Sécurité

### Authentification JWT

- **Durée de vie :** 24 heures
- **Algorithme :** HS256
- **Contenu du payload :**
  ```json
  {
    "userId": "user_id_mongodb",
    "email": "user@example.com",
    "role": "user|admin",
    "iat": 1640995200,
    "exp": 1641081600
  }
  ```

### Hachage des Mots de Passe

- **Algorithme :** bcrypt
- **Rounds :** 10
- Les mots de passe ne sont jamais stockés en clair

### Tokens de Réinitialisation

- **Génération :** `crypto.randomBytes(32).toString('hex')`
- **Durée de vie :** 1 heure
- **Usage unique :** Le token est supprimé après utilisation

## Configuration CORS

L'API est configurée pour accepter les requêtes cross-origin, ce qui permet à l'application mobile de communiquer avec le backend depuis n'importe quel domaine.

## Variables d'Environnement Requises

```env
MONGO_URI=mongodb://localhost:27017/ophrus_immo_db
JWT_SECRET=your_jwt_secret_key_ophrus_2025_secure
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Configuration Email (optionnelle)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@ophrus.com

# Configuration Cloudinary (pour les images)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```



## Intégration React Native/Expo

### Configuration du Client API

Pour React Native/Expo, nous recommandons d'utiliser `axios` pour les requêtes HTTP. Voici un exemple de configuration :

```javascript
// api/client.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5002/api' 
  : 'https://votre-domaine.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter automatiquement le token JWT
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      // Rediriger vers l'écran de connexion
      // NavigationService.navigate('Login');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Service d'Authentification

```javascript
// services/authService.js
import apiClient from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const { token, data: userData } = response.data;
        
        // Stocker le token et les données utilisateur
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        
        return {
          success: true,
          user: userData,
          token,
        };
      }
      
      return {
        success: false,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur de connexion',
      };
    }
  }

  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      
      if (response.data.success) {
        return {
          success: true,
          user: response.data.data,
        };
      }
      
      return {
        success: false,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de l\'inscription',
      };
    }
  }

  async logout() {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userData']);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Erreur lors de la déconnexion' };
    }
  }

  async getCurrentUser() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return null;

      const response = await apiClient.get('/auth/profile');
      
      if (response.data.success) {
        return response.data.data;
      }
      
      return null;
    } catch (error) {
      // Token invalide ou expiré
      await this.logout();
      return null;
    }
  }

  async isAuthenticated() {
    const token = await AsyncStorage.getItem('userToken');
    return !!token;
  }

  async requestPasswordReset(email) {
    try {
      const response = await apiClient.post('/auth/reset-password-request', {
        email,
      });
      
      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la demande',
      };
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const response = await apiClient.post('/auth/reset-password', {
        token,
        newPassword,
      });
      
      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la réinitialisation',
      };
    }
  }
}

export default new AuthService();
```

### Context d'Authentification React Native

```javascript
// contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../services/authService';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      const currentUser = await authService.getCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const result = await authService.login(email, password);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la connexion',
      };
    }
  };

  const register = async (userData) => {
    try {
      const result = await authService.register(userData);
      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de l\'inscription',
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la déconnexion',
      };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuthState,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Gestion de la Navigation Conditionnelle

```javascript
// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';

// Écrans d'authentification
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Écrans principaux
import HomeScreen from '../screens/main/HomeScreen';
import PropertiesScreen from '../screens/main/PropertiesScreen';
import FavoritesScreen from '../screens/main/FavoritesScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Properties" component={PropertiesScreen} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Écran de chargement
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
```

### Dépendances Recommandées

Pour votre projet React Native/Expo, voici les dépendances recommandées :

```json
{
  "dependencies": {
    "@react-native-async-storage/async-storage": "^1.19.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/stack": "^6.3.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "axios": "^1.6.0",
    "expo": "~49.0.0",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.0",
    "react-native-paper": "^5.10.0",
    "react-native-vector-icons": "^10.0.0",
    "react-native-safe-area-context": "4.6.3",
    "react-native-screens": "~3.22.0"
  }
}
```

### Configuration de Développement

Pour tester avec votre backend local depuis un appareil physique ou un émulateur :

1. **Émulateur Android/iOS :** Utilisez `http://localhost:5002/api`
2. **Appareil physique :** Remplacez `localhost` par l'adresse IP de votre machine de développement (ex: `http://192.168.1.100:5002/api`)

### Gestion des États de Connexion

L'application mobile maintient automatiquement l'état de connexion grâce à :

1. **AsyncStorage :** Stockage persistant du token JWT et des données utilisateur
2. **Intercepteurs Axios :** Ajout automatique du token aux requêtes
3. **Context React :** Gestion globale de l'état d'authentification
4. **Navigation conditionnelle :** Affichage des écrans appropriés selon l'état de connexion

L'utilisateur reste connecté jusqu'à ce qu'il se déconnecte explicitement ou que le token expire (24 heures).

