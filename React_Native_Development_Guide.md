# Guide de Développement Mobile - Ophrus Immobilier React Native/Expo

## Vue d'ensemble du Projet Mobile

L'application mobile Ophrus Immobilier sera développée avec React Native et Expo, offrant une expérience utilisateur native sur iOS et Android. L'application se connectera au backend Node.js optimisé pour mobile via des API REST sécurisées.

### Architecture Recommandée

```
ophrus-mobile-app/
├── src/
│   ├── components/          # Composants réutilisables
│   ├── screens/            # Écrans de l'application
│   ├── navigation/         # Configuration de navigation
│   ├── services/           # Services API et logique métier
│   ├── contexts/           # Contexts React (Auth, Theme, etc.)
│   ├── hooks/              # Hooks personnalisés
│   ├── utils/              # Utilitaires et helpers
│   ├── constants/          # Constantes et configuration
│   └── assets/             # Images, fonts, etc.
├── app.json                # Configuration Expo
├── package.json            # Dépendances
└── README.md              # Documentation
```

## Configuration Initiale

### 1. Initialisation du Projet Expo

```bash
# Installer Expo CLI globalement
npm install -g @expo/cli

# Créer le projet
npx create-expo-app ophrus-mobile-app --template blank

# Naviguer dans le dossier
cd ophrus-mobile-app

# Installer les dépendances essentielles
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install @react-native-async-storage/async-storage
npm install axios
npm install react-native-paper
npm install expo-secure-store
npm install expo-notifications
npm install expo-linking
npm install expo-image-picker
npm install expo-location
npm install react-native-maps
```

### 2. Configuration app.json

```json
{
  "expo": {
    "name": "Ophrus Immobilier",
    "slug": "ophrus-immobilier",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#009fe3"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.ophrus.immobilier",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "Cette app utilise la localisation pour trouver des propriétés près de vous.",
        "NSCameraUsageDescription": "Cette app utilise l'appareil photo pour prendre des photos de propriétés.",
        "NSPhotoLibraryUsageDescription": "Cette app accède à vos photos pour sélectionner des images de propriétés."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#009fe3"
      },
      "package": "com.ophrus.immobilier",
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "scheme": "ophrus",
    "notification": {
      "icon": "./assets/notification-icon.png",
      "color": "#009fe3"
    }
  }
}
```

## Structure des Écrans

### Écrans d'Authentification

#### 1. LoginScreen.js
```javascript
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, Card, HelperText } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password, rememberMe);
      if (!result.success) {
        Alert.alert('Erreur de connexion', result.message);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Connexion</Title>
          
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          
          <TextInput
            label="Mot de passe"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />
          
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Se connecter
          </Button>
          
          <Button
            mode="text"
            onPress={() => navigation.navigate('Register')}
            style={styles.linkButton}
          >
            Créer un compte
          </Button>
          
          <Button
            mode="text"
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.linkButton}
          >
            Mot de passe oublié ?
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#009fe3',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#009fe3',
  },
  linkButton: {
    marginTop: 8,
  },
});

export default LoginScreen;
```

### Écrans Principaux

#### 2. HomeScreen.js
```javascript
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const onRefresh = async () => {
    setRefreshing(true);
    // Logique de rafraîchissement des données
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Title style={styles.welcome}>
          Bonjour {user?.firstName} !
        </Title>
        <Paragraph style={styles.subtitle}>
          Trouvez votre propriété idéale
        </Paragraph>
      </View>

      <Searchbar
        placeholder="Rechercher une propriété..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <View style={styles.quickActions}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Properties')}
          style={styles.actionButton}
        >
          Voir toutes les propriétés
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Favorites')}
          style={styles.actionButton}
        >
          Mes favoris
        </Button>
      </View>

      {/* Liste des propriétés récentes */}
      <Title style={styles.sectionTitle}>Propriétés récentes</Title>
      {/* Composants de propriétés */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#009fe3',
  },
  welcome: {
    color: 'white',
    fontSize: 24,
  },
  subtitle: {
    color: 'white',
    opacity: 0.9,
  },
  searchbar: {
    margin: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  sectionTitle: {
    padding: 16,
    paddingBottom: 8,
  },
});

export default HomeScreen;
```

## Services et Utilitaires

### Service d'Authentification Avancé

```javascript
// services/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import apiClient from './apiClient';

class AuthService {
  constructor() {
    this.TOKEN_KEY = 'userToken';
    this.USER_KEY = 'userData';
    this.DEVICE_TOKEN_KEY = 'deviceToken';
  }

  // Stockage sécurisé pour les tokens sensibles
  async setSecureItem(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      // Fallback vers AsyncStorage si SecureStore échoue
      await AsyncStorage.setItem(key, value);
    }
  }

  async getSecureItem(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      // Fallback vers AsyncStorage
      return await AsyncStorage.getItem(key);
    }
  }

  async removeSecureItem(key) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      await AsyncStorage.removeItem(key);
    }
  }

  async login(email, password, rememberMe = false, deviceToken = null) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
        rememberMe,
        deviceToken,
      });

      if (response.data.success) {
        const { token, data: userData } = response.data;
        
        // Stocker le token de manière sécurisée
        await this.setSecureItem(this.TOKEN_KEY, token);
        await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(userData));
        
        if (deviceToken) {
          await AsyncStorage.setItem(this.DEVICE_TOKEN_KEY, deviceToken);
        }
        
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
        code: error.response?.data?.code,
      };
    }
  }

  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      
      return {
        success: response.data.success,
        message: response.data.message,
        user: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de l\'inscription',
        code: error.response?.data?.code,
      };
    }
  }

  async logout() {
    try {
      const deviceToken = await AsyncStorage.getItem(this.DEVICE_TOKEN_KEY);
      
      // Informer le serveur de la déconnexion
      await apiClient.post('/auth/logout', { deviceToken });
    } catch (error) {
      console.warn('Erreur lors de la déconnexion serveur:', error);
    } finally {
      // Nettoyer le stockage local
      await this.removeSecureItem(this.TOKEN_KEY);
      await AsyncStorage.multiRemove([this.USER_KEY, this.DEVICE_TOKEN_KEY]);
    }
  }

  async getCurrentUser() {
    try {
      const token = await this.getSecureItem(this.TOKEN_KEY);
      if (!token) return null;

      const response = await apiClient.get('/auth/profile');
      
      if (response.data.success) {
        const userData = response.data.data;
        await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(userData));
        return userData;
      }
      
      return null;
    } catch (error) {
      if (error.response?.data?.code === 'TOKEN_EXPIRED') {
        await this.logout();
      }
      return null;
    }
  }

  async updateProfile(updateData) {
    try {
      const response = await apiClient.put('/auth/profile', updateData);
      
      if (response.data.success) {
        const userData = response.data.data;
        await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(userData));
        return {
          success: true,
          user: userData,
        };
      }
      
      return {
        success: false,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour',
      };
    }
  }

  async isAuthenticated() {
    const token = await this.getSecureItem(this.TOKEN_KEY);
    return !!token;
  }

  async getStoredUser() {
    try {
      const userJson = await AsyncStorage.getItem(this.USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      return null;
    }
  }
}

export default new AuthService();
```

## Gestion des Notifications Push

### Configuration des Notifications

```javascript
// services/notificationService.js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService {
  async registerForPushNotifications() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#009fe3',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        alert('Échec de l\'obtention du token de notification push!');
        return;
      }
      
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })).data;
    } else {
      alert('Doit utiliser un appareil physique pour les notifications push');
    }

    return token;
  }

  async schedulePushNotification(title, body, data = {}) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: { seconds: 2 },
    });
  }
}

export default new NotificationService();
```

## Deep Links et Navigation

### Configuration des Deep Links

```javascript
// navigation/LinkingConfiguration.js
import * as Linking from 'expo-linking';

const linking = {
  prefixes: [Linking.createURL('/'), 'ophrus://'],
  config: {
    screens: {
      Auth: {
        screens: {
          ResetPassword: 'reset-password',
          VerifyEmail: 'verify-email',
        },
      },
      Main: {
        screens: {
          Home: 'home',
          Properties: 'properties',
          PropertyDetail: 'property/:id',
          Favorites: 'favorites',
          Profile: 'profile',
        },
      },
    },
  },
};

export default linking;
```

## Recommandations de Développement

### 1. Structure du Code

- **Composants réutilisables** : Créez des composants UI réutilisables (PropertyCard, SearchBar, etc.)
- **Hooks personnalisés** : Utilisez des hooks pour la logique métier (useProperties, useSearch, etc.)
- **Services séparés** : Séparez la logique API de la logique UI
- **Constants** : Centralisez les constantes (couleurs, tailles, URLs)

### 2. Performance

- **Lazy Loading** : Chargez les écrans à la demande
- **Optimisation des images** : Utilisez expo-image pour de meilleures performances
- **Mise en cache** : Implémentez une stratégie de cache pour les données
- **Pagination** : Paginez les listes de propriétés

### 3. UX/UI

- **Design System** : Utilisez React Native Paper pour la cohérence
- **Animations** : Ajoutez des animations fluides avec react-native-reanimated
- **Feedback utilisateur** : Implémentez des états de chargement et messages d'erreur
- **Accessibilité** : Ajoutez les props d'accessibilité nécessaires

### 4. Sécurité

- **Stockage sécurisé** : Utilisez expo-secure-store pour les données sensibles
- **Validation** : Validez toutes les entrées utilisateur
- **HTTPS** : Utilisez toujours HTTPS pour les communications
- **Tokens** : Gérez correctement l'expiration des tokens

### 5. Tests

- **Tests unitaires** : Testez la logique métier avec Jest
- **Tests d'intégration** : Testez les flux utilisateur complets
- **Tests sur appareils** : Testez sur différents appareils et versions OS

## Intégration AI (Recommandation)

Basé sur vos préférences pour l'intégration AI dès le départ, voici quelques suggestions :

### 1. Recherche Intelligente

```javascript
// services/aiService.js
import { translate } from 'react-native-translate';

class AIService {
  async enhanceSearch(query, userPreferences) {
    // Utiliser LibreTranslate pour la traduction automatique
    const translatedQuery = await this.translateQuery(query);
    
    // Logique de recherche intelligente basée sur les préférences
    return {
      originalQuery: query,
      enhancedQuery: translatedQuery,
      suggestions: this.generateSuggestions(query, userPreferences),
    };
  }

  async translateQuery(query) {
    try {
      // Intégration avec LibreTranslate (gratuit)
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        body: JSON.stringify({
          q: query,
          source: 'auto',
          target: 'fr',
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      const result = await response.json();
      return result.translatedText;
    } catch (error) {
      console.warn('Erreur de traduction:', error);
      return query;
    }
  }
}

export default new AIService();
```

### 2. Recommandations de Propriétés

Implémentez un système de recommandations basé sur :
- L'historique de recherche
- Les propriétés favorites
- La localisation
- Les préférences utilisateur

## Déploiement

### 1. Build de Développement

```bash
# Démarrer le serveur de développement
npx expo start

# Pour iOS
npx expo start --ios

# Pour Android
npx expo start --android
```

### 2. Build de Production

```bash
# Installer EAS CLI
npm install -g @expo/eas-cli

# Configurer EAS
eas build:configure

# Build pour iOS et Android
eas build --platform all

# Soumettre aux stores
eas submit --platform ios
eas submit --platform android
```

Cette architecture et ces recommandations vous fourniront une base solide pour développer l'application mobile Ophrus Immobilier avec React Native et Expo, en tirant parti du backend optimisé que j'ai créé.

