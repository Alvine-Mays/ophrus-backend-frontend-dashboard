require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Schéma utilisateur simplifié
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  firstName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Route de connexion admin
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
    res.status(500).json({ message: 'Erreur serveur' });
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
    
    res.json({ message: 'Utilisateur admin créé avec succès' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Utilisateur admin existe déjà' });
    } else {
      console.error('Erreur lors de la création de l\'admin:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
});

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend Ophrus fonctionnel', timestamp: new Date() });
});

// Connexion à MongoDB et démarrage du serveur
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Serveur backend démarré sur le port ${PORT}`);
      console.log(`🌐 Accessible sur http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur de connexion MongoDB:', err.message);
    process.exit(1);
  });

