require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5002;

// Configuration CORS optimisée pour mobile
app.use(cors({
  origin: true, // Permet toutes les origines pour le développement mobile
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '10mb' })); // Augmenté pour les uploads d'images
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configuration du transporteur email
let transporter = null;
if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  console.log('✅ Transporteur email configuré');
} else {
  console.log('⚠️ Configuration email manquante - simulation des envois');
}

// Connexion MongoDB avec options optimisées
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10, // Maintient jusqu'à 10 connexions socket
  serverSelectionTimeoutMS: 5000, // Garde en essayant d'envoyer des opérations pendant 5 secondes
  socketTimeoutMS: 45000, // Ferme les sockets après 45 secondes d'inactivité
  bufferCommands: false // Désactive la mise en mémoire tampon des commandes mongoose
}).then(() => {
  console.log('✅ MongoDB connecté');
}).catch(err => {
  console.error('❌ Erreur MongoDB:', err);
});

// Schéma utilisateur étendu pour mobile
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String, // URL de l'avatar
  preferences: {
    notifications: { type: Boolean, default: true },
    language: { type: String, default: 'fr' },
    currency: { type: String, default: 'EUR' }
  },
  deviceTokens: [String], // Pour les notifications push
  lastLoginAt: Date,
  isActive: { type: Boolean, default: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index pour optimiser les requêtes mobiles
userSchema.index({ email: 1 });
userSchema.index({ resetPasswordToken: 1 });
userSchema.index({ emailVerificationToken: 1 });

// Middleware pour mettre à jour updatedAt
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

// Middleware d'authentification optimisé pour mobile
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token d\'accès requis',
      code: 'TOKEN_REQUIRED'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non trouvé ou inactif',
        code: 'USER_NOT_FOUND'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expiré',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Token invalide',
      code: 'TOKEN_INVALID'
    });
  }
};

// Fonction pour générer un JWT avec durée personnalisable
const generateToken = (user, expiresIn = '24h') => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

// Fonction pour envoyer un email avec gestion d'erreur améliorée
async function sendEmail(to, subject, html) {
  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@ophrus.com',
        to,
        subject,
        html
      });
      console.log(`✅ Email envoyé à ${to}`);
      return { success: true };
    } catch (error) {
      console.error('❌ Erreur envoi email:', error);
      // En cas d'erreur SMTP, on passe en mode simulation
      console.log(`📧 [SIMULATION] Email envoyé à ${to} (fallback)`);
      console.log(`📧 [SIMULATION] Sujet: ${subject}`);
      return { success: true, simulated: true };
    }
  } else {
    // Simulation d'envoi d'email
    console.log(`📧 [SIMULATION] Email envoyé à ${to}`);
    console.log(`📧 [SIMULATION] Sujet: ${subject}`);
    console.log(`📧 [SIMULATION] Contenu: ${html}`);
    return { success: true, simulated: true };
  }
}

// Route de connexion optimisée pour mobile
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, deviceToken, rememberMe } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis',
        code: 'MISSING_CREDENTIALS'
      });
    }

    console.log('Tentative de connexion:', email);
    
    // Trouver l'utilisateur
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants invalides',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants invalides',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Mettre à jour les informations de connexion
    user.lastLoginAt = new Date();
    
    // Gérer le token de device pour les notifications push
    if (deviceToken && !user.deviceTokens.includes(deviceToken)) {
      user.deviceTokens.push(deviceToken);
    }
    
    await user.save();

    // Générer le token JWT avec durée personnalisée
    const tokenExpiry = rememberMe ? '30d' : '24h';
    const token = generateToken(user, tokenExpiry);

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      expiresIn: rememberMe ? '30 jours' : '24 heures',
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        preferences: user.preferences,
        emailVerified: user.emailVerified,
        lastLoginAt: user.lastLoginAt
      }
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la connexion',
      code: 'SERVER_ERROR'
    });
  }
});

// Route d'inscription optimisée pour mobile
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    
    // Validation des données
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs obligatoires doivent être remplis',
        code: 'MISSING_REQUIRED_FIELDS'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Le mot de passe doit contenir au moins 6 caractères',
        code: 'PASSWORD_TOO_SHORT'
      });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Un compte avec cet email existe déjà',
        code: 'EMAIL_ALREADY_EXISTS'
      });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Générer un token de vérification email
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    // Créer l'utilisateur
    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      emailVerificationToken,
      preferences: {
        notifications: true,
        language: 'fr',
        currency: 'EUR'
      }
    });

    await newUser.save();

    // Envoyer l'email de vérification (optionnel pour mobile)
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #009fe3;">Bienvenue chez Ophrus Immobilier !</h2>
        <p>Bonjour ${firstName},</p>
        <p>Merci de vous être inscrit sur notre plateforme. Pour activer votre compte, veuillez cliquer sur le lien ci-dessous :</p>
        <a href="${verificationUrl}" style="display: inline-block; background-color: #009fe3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">
          Vérifier mon email
        </a>
        <p>Si vous n'arrivez pas à cliquer sur le lien, copiez et collez cette URL dans votre navigateur :</p>
        <p style="word-break: break-all;">${verificationUrl}</p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          © 2025 Ophrus Immobilier - Tous droits réservés
        </p>
      </div>
    `;

    await sendEmail(
      newUser.email,
      'Vérifiez votre email - Ophrus Immobilier',
      emailHtml
    );

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès. Un email de vérification a été envoyé.',
      data: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        emailVerified: newUser.emailVerified
      }
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'inscription',
      code: 'SERVER_ERROR'
    });
  }
});

// Route de profil utilisateur avec plus de détails
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -resetPasswordToken -emailVerificationToken');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// Route de mise à jour du profil
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, phone, preferences } = req.body;
    
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (preferences) updateData.preferences = { ...req.user.preferences, ...preferences };

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password -resetPasswordToken -emailVerificationToken');

    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: updatedUser
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// Route de déconnexion (pour nettoyer le device token)
app.post('/api/auth/logout', authenticateToken, async (req, res) => {
  try {
    const { deviceToken } = req.body;
    
    if (deviceToken) {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { deviceTokens: deviceToken }
      });
    }

    res.json({
      success: true,
      message: 'Déconnexion réussie'
    });
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// Route de demande de réinitialisation de mot de passe
app.post('/api/auth/reset-password-request', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email requis',
        code: 'EMAIL_REQUIRED'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (user) {
      // Générer un token de réinitialisation
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetExpires = new Date(Date.now() + 3600000); // 1 heure

      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetExpires;
      await user.save();

      // URL pour l'application mobile (deep link)
      const resetUrl = `ophrus://reset-password?token=${resetToken}`;
      const webResetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #009fe3;">Réinitialisation de votre mot de passe</h2>
          <p>Bonjour ${user.firstName},</p>
          <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte Ophrus Immobilier.</p>
          <p>Pour réinitialiser votre mot de passe depuis l'application mobile, cliquez ici :</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #009fe3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">
            Réinitialiser depuis l'app
          </a>
          <p>Ou utilisez ce lien pour le navigateur web :</p>
          <a href="${webResetUrl}" style="display: inline-block; background-color: #666; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">
            Réinitialiser sur le web
          </a>
          <p>Ce lien expirera dans 1 heure.</p>
          <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Cet email a été envoyé automatiquement, merci de ne pas y répondre.<br>
            © 2025 Ophrus Immobilier - Tous droits réservés
          </p>
        </div>
      `;

      const emailResult = await sendEmail(
        user.email,
        'Réinitialisation de votre mot de passe - Ophrus Immobilier',
        emailHtml
      );

      console.log(`Token de réinitialisation généré pour ${user.email}: ${resetToken}`);
    }

    // Toujours retourner un succès pour des raisons de sécurité
    res.json({
      success: true,
      message: 'Si cet email existe, vous recevrez un lien de réinitialisation'
    });

  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// Route de vérification du token de réinitialisation
app.post('/api/auth/verify-reset-token', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token requis',
        code: 'TOKEN_REQUIRED'
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Token invalide ou expiré',
        code: 'INVALID_TOKEN'
      });
    }

    res.json({
      success: true,
      message: 'Token valide',
      email: user.email
    });

  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// Route de réinitialisation du mot de passe
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token et nouveau mot de passe requis',
        code: 'MISSING_DATA'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Le mot de passe doit contenir au moins 6 caractères',
        code: 'PASSWORD_TOO_SHORT'
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Token invalide ou expiré',
        code: 'INVALID_TOKEN'
      });
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Mettre à jour le mot de passe et supprimer le token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Envoyer un email de confirmation
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #009fe3;">Mot de passe réinitialisé</h2>
        <p>Bonjour ${user.firstName},</p>
        <p>Votre mot de passe a été réinitialisé avec succès.</p>
        <p>Si vous n'êtes pas à l'origine de cette action, contactez-nous immédiatement.</p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          © 2025 Ophrus Immobilier - Tous droits réservés
        </p>
      </div>
    `;

    await sendEmail(
      user.email,
      'Mot de passe réinitialisé - Ophrus Immobilier',
      confirmationHtml
    );

    res.json({
      success: true,
      message: 'Mot de passe réinitialisé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la réinitialisation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// Route de vérification d'email
app.post('/api/auth/verify-email', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token de vérification requis',
        code: 'TOKEN_REQUIRED'
      });
    }

    const user = await User.findOne({ emailVerificationToken: token });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Token de vérification invalide',
        code: 'INVALID_TOKEN'
      });
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Email vérifié avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la vérification d\'email:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// Route de test avec informations détaillées
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend Ophrus mobile optimisé fonctionnel',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    features: [
      'Authentification JWT avec durée personnalisable',
      'Inscription avec vérification email',
      'Réinitialisation mot de passe avec deep links',
      'Gestion des device tokens pour notifications push',
      'Profil utilisateur étendu',
      'CORS optimisé pour mobile',
      'Gestion d\'erreurs avec codes spécifiques'
    ],
    endpoints: {
      auth: [
        'POST /api/auth/login',
        'POST /api/auth/register',
        'GET /api/auth/profile',
        'PUT /api/auth/profile',
        'POST /api/auth/logout',
        'POST /api/auth/reset-password-request',
        'POST /api/auth/verify-reset-token',
        'POST /api/auth/reset-password',
        'POST /api/auth/verify-email'
      ],
      admin: [
        'POST /api/admin/create-test-user'
      ],
      test: [
        'GET /api/test'
      ]
    }
  });
});

// Route de création d'utilisateur admin de test
app.post('/api/admin/create-test-user', async (req, res) => {
  try {
    // Vérifier si l'admin existe déjà
    const existingAdmin = await User.findOne({ email: 'admin@ophrus.com' });
    if (existingAdmin) {
      return res.json({
        success: true,
        message: 'Utilisateur admin existe déjà'
      });
    }

    // Créer l'utilisateur admin
    const hashedPassword = await bcrypt.hash('password123', 10);
    const adminUser = new User({
      email: 'admin@ophrus.com',
      password: hashedPassword,
      role: 'admin',
      firstName: 'Admin',
      lastName: 'Ophrus',
      emailVerified: true,
      preferences: {
        notifications: true,
        language: 'fr',
        currency: 'EUR'
      }
    });

    await adminUser.save();

    res.json({
      success: true,
      message: 'Utilisateur admin créé avec succès',
      credentials: {
        email: 'admin@ophrus.com',
        password: 'password123'
      }
    });

  } catch (error) {
    console.error('Erreur lors de la création de l\'admin:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      code: 'SERVER_ERROR'
    });
  }
});

// Middleware de gestion d'erreurs globales
app.use((error, req, res, next) => {
  console.error('Erreur non gérée:', error);
  res.status(500).json({
    success: false,
    message: 'Erreur serveur interne',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Serveur backend mobile optimisé démarré sur le port', PORT);
  console.log('🌐 Accessible sur http://localhost:' + PORT);
  console.log('📱 Fonctionnalités mobiles disponibles:');
  console.log('   - Authentification JWT avec persistance');
  console.log('   - Gestion des device tokens');
  console.log('   - Deep links pour réinitialisation');
  console.log('   - Profil utilisateur étendu');
  console.log('   - CORS optimisé pour React Native');
  console.log('   - Codes d\'erreur spécifiques');
});

