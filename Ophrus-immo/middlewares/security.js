const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const disposableDomains = require('disposable-email-domains');
const { logger, morganMiddleware } = require('../utils/logging'); 
const xss = require('xss');
const slowDown = require('express-slow-down');

// Configuration XSS
const xssOptions = {
  whiteList: {}, // Aucun tag autorisé
  stripIgnoreTag: true, // Supprimer les tags non autorisés
  stripIgnoreTagBody: ['script'] // Supprimer le contenu des scripts
};

// Fonction qui vérifie si l'email est temporaire
const isTempEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const domain = email.split('@')[1]?.toLowerCase();
  return disposableDomains.includes(domain);
};

// Middleware XSS personnalisé renforcé
const xssProtection = (req, res, next) => {
  try {
    // Nettoyage des query params
    if (req.query) {
      for (const key in req.query) {
        if (typeof req.query[key] === 'string') {
          req.query[key] = xss(req.query[key], xssOptions);
        }
      }
    }

    // Nettoyage du body
    if (req.body) {
      for (const key in req.body) {
        if (typeof req.body[key] === 'string') {
          req.body[key] = xss(req.body[key], xssOptions);
        }
      }
    }

    // Nettoyage des headers sensibles
    const sensitiveHeaders = ['x-forwarded-for', 'user-agent', 'referer'];
    sensitiveHeaders.forEach(header => {
      if (req.headers[header] && typeof req.headers[header] === 'string') {
        req.headers[header] = xss(req.headers[header], xssOptions);
      }
    });

    next();
  } catch (err) {
    logger.error('Erreur XSS Protection:', err);
    next(err);
  }
};

module.exports = {
  morgan: morganMiddleware,
  xssProtection, // Export du nouveau middleware XSS

  secureHeaders: helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"]
      }
    },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    frameguard: { action: 'deny' },
    referrerPolicy: { policy: 'same-origin' }
  }),

  limiter: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      status: 429,
      error: 'Trop de requêtes depuis cette IP. Réessayez plus tard.'
    },
    handler: (req, res, next, options) => {
      logger.warn(`Rate limit exceeded - IP: ${req.ip} Path: ${req.originalUrl}`);
      res.status(options.statusCode).json(options.message);
    }
  }),

  preventHPP: hpp(),

  corsOptions: cors({
    origin: (origin, callback) => {
      const whitelist = [
        'http://localhost:3000', 
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'https://app.monsite.com',
        process.env.FRONTEND_URL
      ].filter(Boolean);
      
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked for origin: ${origin}`);
        callback(new Error('Origine non autorisée'));
      }
    },
    methods: ['GET','POST','PUT','DELETE','PATCH'],
    credentials: true,
    optionsSuccessStatus: 200
  }),

  // Protection XSS
  xssClean: xss(),

  // Validateurs
  validateUser: [
    body('telephone')
      .custom(value => {
        let phone = parsePhoneNumberFromString(value, 'CG');
        if (phone && phone.isValid() && phone.country === 'CG') return true;
        phone = parsePhoneNumberFromString(value);
        if (!phone || !phone.isValid()) {
          if (!value.startsWith('+')) {
            throw new Error("Veuillez ajouter l'indicatif international (ex: +33)");
          }
          throw new Error('Numéro de téléphone invalide');
        }
        return true;
      }),
    body('nom')
      .trim()
      .isString().withMessage('Le nom doit être une chaîne de caractères')
      .isLength({ min: 2 }).withMessage('Le nom est trop court'),
    body('email')
      .normalizeEmail()
      .isEmail().withMessage('Email invalide')
      .bail()
      .custom(email => {
        if (isTempEmail(email)) {
          throw new Error('Les emails temporaires sont interdits');
        }
        return true;
      }),
    body('password')
      .isLength({ min: 8 }).withMessage('Le mot de passe doit faire au moins 8 caractères')
      .matches(/[A-Z]/).withMessage('Doit contenir au moins une majuscule')
      .matches(/[a-z]/).withMessage('Doit contenir au moins une minuscule')
      .matches(/[0-9]/).withMessage('Doit contenir au moins un chiffre')
      .matches(/\W/).withMessage('Doit contenir au moins un caractère spécial'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.warn('Validation failed', { 
          path: req.path, 
          errors: errors.array(),
          ip: req.ip
        });
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],

  // Validation login
  validateLogin: [
    body('email').normalizeEmail().isEmail().withMessage('Email invalide'),
    body('password').notEmpty().withMessage('Mot de passe requis'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.warn('Login validation failed', { 
          email: req.body.email,
          ip: req.ip 
        });
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],

  // Validation reset-request
  validateResetRequest: [
    body('email').normalizeEmail().isEmail().withMessage('Email invalide'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    }
  ],

  // Validation reset-verify
  validateResetVerify: [
    body('email').normalizeEmail().isEmail().withMessage('Email invalide'),
    body('code').isLength({ min: 4 }).withMessage('Code requis'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    }
  ],

  // Validation reset-password
  validateResetPassword: [
    body('email').normalizeEmail().isEmail().withMessage('Email invalide'),
    body('code').notEmpty().withMessage('Code requis'),
    body('newPassword')
      .isLength({ min: 8 }).withMessage('Le mot de passe doit faire au moins 8 caractères')
      .matches(/[A-Z]/).withMessage('Doit contenir au moins une majuscule')
      .matches(/[a-z]/).withMessage('Doit contenir au moins une minuscule')
      .matches(/[0-9]/).withMessage('Doit contenir au moins un chiffre')
      .matches(/\W/).withMessage('Doit contenir au moins un caractère spécial'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    }
  ],

  // Limite de requêtes de réinitialisation
  resetRequestLimiter: rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: {
      message: "Trop de tentatives de réinitialisation. Réessayez dans une heure."
    },
    handler: (req, res, next, options) => {
      logger.warn(`Password reset flood - IP: ${req.ip} Email: ${req.body.email}`);
      res.status(options.statusCode).json(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false
  })
};
// Rate limiting spécialisé pour l'authentification
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives par IP
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.'
  },
  handler: (req, res, next, options) => {
    logger.warn(`Auth rate limit exceeded`, {
      ip: req.ip,
      path: req.originalUrl,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    });
    res.status(options.statusCode).json(options.message);
  }
});

// Rate limiting pour les actions sensibles (reset password, etc.)
const sensitiveActionsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 3, // 3 tentatives par heure
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Trop de tentatives pour cette action. Réessayez dans 1 heure.'
  },
  handler: (req, res, next, options) => {
    logger.warn(`Sensitive action rate limit exceeded`, {
      ip: req.ip,
      path: req.originalUrl,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    });
    res.status(options.statusCode).json(options.message);
  }
});

// Middleware de ralentissement progressif
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // Commencer à ralentir après 50 requêtes
  delayMs: 500, // Ajouter 500ms de délai par requête supplémentaire
  maxDelayMs: 20000, // Délai maximum de 20 secondes
  onLimitReached: (req, res, options) => {
    logger.warn(`Speed limit reached`, {
      ip: req.ip,
      path: req.originalUrl,
      delay: options.delay
    });
  }
});

// Middleware de protection CSRF simple
const csrfProtection = (req, res, next) => {
  // Vérifier les méthodes sensibles
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    const origin = req.get('Origin');
    const referer = req.get('Referer');
    
    // Vérifier que la requête vient d'une origine autorisée
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      process.env.FRONTEND_URL,
      process.env.DASHBOARD_URL
    ].filter(Boolean);
    
    if (!origin && !referer) {
      logger.warn('CSRF: Missing Origin and Referer headers', {
        ip: req.ip,
        method: req.method,
        path: req.originalUrl
      });
      return res.status(403).json({
        success: false,
        message: 'Requête non autorisée'
      });
    }
    
    const requestOrigin = origin || (referer ? new URL(referer).origin : null);
    
    if (requestOrigin && !allowedOrigins.includes(requestOrigin)) {
      logger.warn('CSRF: Invalid origin', {
        ip: req.ip,
        method: req.method,
        path: req.originalUrl,
        origin: requestOrigin
      });
      return res.status(403).json({
        success: false,
        message: 'Origine non autorisée'
      });
    }
  }
  
  next();
};

// Middleware de détection d'attaques par injection
const injectionProtection = (req, res, next) => {
  const suspiciousPatterns = [
    /(\$where|\$ne|\$gt|\$lt|\$gte|\$lte|\$in|\$nin|\$regex)/i, // MongoDB injection
    /(union|select|insert|update|delete|drop|create|alter|exec|script)/i, // SQL injection
    /(<script|javascript:|vbscript:|onload|onerror|onclick)/i, // XSS patterns
    /(\.\.\/|\.\.\\|\/etc\/|\/proc\/|\/sys\/)/i // Path traversal
  ];
  
  const checkValue = (value, path = '') => {
    if (typeof value === 'string') {
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(value)) {
          logger.warn('Injection attempt detected', {
            ip: req.ip,
            path: req.originalUrl,
            field: path,
            value: value.substring(0, 100),
            pattern: pattern.toString()
          });
          return false;
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      for (const [key, val] of Object.entries(value)) {
        if (!checkValue(val, `${path}.${key}`)) {
          return false;
        }
      }
    }
    return true;
  };
  
  // Vérifier le body
  if (req.body && !checkValue(req.body, 'body')) {
    return res.status(400).json({
      success: false,
      message: 'Contenu de requête invalide'
    });
  }
  
  // Vérifier les query parameters
  if (req.query && !checkValue(req.query, 'query')) {
    return res.status(400).json({
      success: false,
      message: 'Paramètres de requête invalides'
    });
  }
  
  next();
};

// Exporter les nouveaux middlewares
module.exports = {
  ...module.exports,
  authLimiter,
  sensitiveActionsLimiter,
  speedLimiter,
  csrfProtection,
  injectionProtection
};

