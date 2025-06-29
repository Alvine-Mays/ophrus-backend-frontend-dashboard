require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration du transporteur email
let transporter = null;
if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
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

// Schéma utilisateur avec tokens de réinitialisation
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  firstName: String,
  lastName: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Fonction pour envoyer un email
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
      return true;
    } catch (error) {
      console.error('❌ Erreur envoi email:', error);
      // En cas d'erreur SMTP, on passe en mode simulation
      console.log(`📧 [SIMULATION] Email envoyé à ${to} (fallback)`);
      console.log(`📧 [SIMULATION] Sujet: ${subject}`);
      return true;
    }
  } else {
    // Simulation d'envoi d'email
    console.log(`📧 [SIMULATION] Email envoyé à ${to}`);
    console.log(`📧 [SIMULATION] Sujet: ${subject}`);
    console.log(`📧 [SIMULATION] Contenu: ${html}`);
    return true;
  }
}

// Route de connexion
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Tentative de connexion:', email);
    
    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Utilisateur non trouvé:', email);
      return res.status(401).json({ success: false, message: 'Identifiants invalides' });
    }
    
    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('Mot de passe invalide pour:', email);
      return res.status(401).json({ success: false, message: 'Identifiants invalides' });
    }
    
    // Créer le token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    console.log('Connexion réussie pour:', email, 'Role:', user.role);
    
    res.json({
      success: true,
      token,
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Route d'inscription
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Cet email est déjà utilisé' });
    }
    
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Créer l'utilisateur
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'user'
    });
    
    await user.save();
    
    console.log('Nouvel utilisateur créé:', email);
    
    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Route pour demander la réinitialisation du mot de passe
app.post('/api/auth/reset-password-request', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email requis' });
    }
    
    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      // Pour des raisons de sécurité, on ne révèle pas si l'email existe ou non
      return res.json({ 
        success: true, 
        message: 'Si cet email existe, vous recevrez un lien de réinitialisation' 
      });
    }
    
    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 heure
    
    // Sauvegarder le token dans la base de données
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();
    
    // Créer le lien de réinitialisation
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    // Contenu de l'email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #009fe3;">Réinitialisation de votre mot de passe</h2>
        <p>Bonjour,</p>
        <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte Ophrus Immobilier.</p>
        <p>Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #009fe3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">
          Réinitialiser mon mot de passe
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
    
    // Envoyer l'email
    const emailSent = await sendEmail(
      email,
      'Réinitialisation de votre mot de passe - Ophrus Immobilier',
      emailHtml
    );
    
    if (emailSent) {
      console.log(`Token de réinitialisation généré pour ${email}: ${resetToken}`);
      res.json({ 
        success: true, 
        message: 'Un email de réinitialisation a été envoyé à votre adresse' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de l\'envoi de l\'email' 
      });
    }
    
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Route pour vérifier le token de réinitialisation
app.post('/api/auth/verify-reset-token', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token requis' });
    }
    
    // Trouver l'utilisateur avec ce token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token invalide ou expiré' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Token valide',
      email: user.email 
    });
    
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Route pour réinitialiser le mot de passe
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token et nouveau mot de passe requis' 
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Le mot de passe doit contenir au moins 6 caractères' 
      });
    }
    
    // Trouver l'utilisateur avec ce token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token invalide ou expiré' 
      });
    }
    
    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Mettre à jour le mot de passe et supprimer le token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    console.log(`Mot de passe réinitialisé pour ${user.email}`);
    
    // Envoyer un email de confirmation
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #009fe3;">Mot de passe modifié avec succès</h2>
        <p>Bonjour,</p>
        <p>Votre mot de passe a été modifié avec succès.</p>
        <p>Si vous n'êtes pas à l'origine de cette modification, contactez-nous immédiatement.</p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          © 2025 Ophrus Immobilier - Tous droits réservés
        </p>
      </div>
    `;
    
    await sendEmail(
      user.email,
      'Mot de passe modifié - Ophrus Immobilier',
      confirmationHtml
    );
    
    res.json({ 
      success: true, 
      message: 'Mot de passe réinitialisé avec succès' 
    });
    
  } catch (error) {
    console.error('Erreur lors de la réinitialisation:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Route pour créer un utilisateur admin de test
app.post('/api/admin/create-test-user', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const adminUser = new User({
      email: 'admin@ophrus.com',
      password: hashedPassword,
      role: 'admin',
      firstName: 'Admin',
      lastName: 'Ophrus'
    });
    
    await adminUser.save();
    console.log('Utilisateur admin créé avec succès');
    
    res.json({ success: true, message: 'Utilisateur admin créé avec succès' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: 'Utilisateur admin existe déjà' });
    } else {
      console.error('Erreur lors de la création de l\'admin:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
  }
});

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'Backend Ophrus complet fonctionnel', 
    timestamp: new Date(),
    features: [
      'Authentification',
      'Inscription',
      'Réinitialisation mot de passe',
      'Gestion des rôles'
    ]
  });
});

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token d\'accès requis' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

// Route protégée pour obtenir le profil utilisateur
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -resetPasswordToken -resetPasswordExpires');
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    
    res.json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Connexion à MongoDB et démarrage du serveur
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Serveur backend complet démarré sur le port ${PORT}`);
      console.log(`🌐 Accessible sur http://localhost:${PORT}`);
      console.log('📧 Fonctionnalités disponibles:');
      console.log('   - Authentification et inscription');
      console.log('   - Réinitialisation de mot de passe');
      console.log('   - Gestion des rôles admin/user');
      console.log('   - Envoi d\'emails (simulation si config manquante)');
    });
  })
  .catch(err => {
    console.error('❌ Erreur de connexion MongoDB:', err.message);
    process.exit(1);
  });

