const winston = require('winston');
const { format, transports } = winston;
const { combine, timestamp, printf, colorize, errors, splat, json } = format;
const path = require('path');
const fs = require('fs');
const DailyRotateFile = require('winston-daily-rotate-file');
const morgan = require('morgan');

// === 1. Création du dossier logs s'il n'existe pas
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// === 2. Définition des niveaux personnalisés
const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  http: 4,
  debug: 5,
  trace: 6
};

winston.addColors({
  fatal: 'red',
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'magenta',
  debug: 'blue',
  trace: 'gray'
});

// === 3. Format pour les logs structurés
const structuredFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  errors({ stack: true }),
  splat(),
  json(),
  format((info) => {
    // Ajouter des métadonnées contextuelles
    info.service = 'ophrus-backend';
    info.version = process.env.npm_package_version || '1.0.0';
    info.environment = process.env.NODE_ENV || 'development';
    info.pid = process.pid;
    info.hostname = require('os').hostname();
    
    // Ajouter un ID de trace unique pour chaque requête
    if (info.traceId) {
      info.traceId = info.traceId;
    }
    
    return info;
  })()
);

// === 4. Format stylé pour la console
const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'HH:mm:ss' }),
  printf(({ timestamp, level, message, stack, traceId, ...meta }) => {
    const traceInfo = traceId ? `[${traceId}] ` : '';
    const metaInfo = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} ${traceInfo}[${level}] ${stack || message}${metaInfo}`;
  })
);

// === 5. Logger principal avec rotation et archivage
const logger = winston.createLogger({
  levels: logLevels,
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: structuredFormat,
  defaultMeta: { service: 'ophrus-backend' },
  transports: [
    // Logs d'erreur avec rotation quotidienne
    new DailyRotateFile({
      filename: path.join(logDir, 'error-%DATE%.log'),
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d'
    }),
    new DailyRotateFile({
      filename: path.join(logDir, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '50m',
      maxFiles: '90d'
    })
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join(logDir, 'exceptions.log') })
  ],
  rejectionHandlers: [
    new transports.File({ filename: path.join(logDir, 'rejections.log') })
  ]
});

// === 5. Console pour environnement dev
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: combine(
      colorize({ all: true }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      logFormat
    ),
    level: 'debug'
  }));
}

// === 6. Middleware HTTP avec Morgan
const morganMiddleware = morgan(
  ':remote-addr - :method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => logger.http(message.trim())
    },
    skip: (req) => ['/health', '/favicon.ico'].includes(req.path)
  }
);

// === 7. Export
module.exports = {
  logger,
  morganMiddleware,
  stream: {
    write: (message) => logger.http(message.trim())
  }
};

      level: 'error',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
      handleExceptions: true,
      handleRejections: true
    }),
    
    // Logs combinés avec rotation
    new DailyRotateFile({
      filename: path.join(logDir, 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '50m',
      maxFiles: '14d'
    }),
    
    // Logs d'audit pour les actions sensibles
    new DailyRotateFile({
      filename: path.join(logDir, 'audit-%DATE%.log'),
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '90d',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        json()
      )
    }),
    
    // Logs de performance
    new DailyRotateFile({
      filename: path.join(logDir, 'performance-%DATE%.log'),
      level: 'http',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '30m',
      maxFiles: '7d'
    })
  ],
  
  // Gestion des exceptions non capturées
  exceptionHandlers: [
    new DailyRotateFile({
      filename: path.join(logDir, 'exceptions-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '30d'
    })
  ],
  
  // Gestion des promesses rejetées
  rejectionHandlers: [
    new DailyRotateFile({
      filename: path.join(logDir, 'rejections-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '30d'
    })
  ]
});

// === 6. Transport console pour le développement
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: consoleFormat,
    level: 'debug'
  }));
}

// === 7. Middleware de traçabilité des requêtes
const requestTracer = (req, res, next) => {
  // Générer un ID unique pour chaque requête
  req.traceId = require('crypto').randomUUID();
  
  // Ajouter l'ID de trace aux headers de réponse
  res.setHeader('X-Trace-Id', req.traceId);
  
  // Logger le début de la requête
  logger.http('Request started', {
    traceId: req.traceId,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    contentLength: req.get('Content-Length'),
    timestamp: new Date().toISOString()
  });
  
  // Capturer le temps de début
  req.startTime = Date.now();
  
  // Intercepter la fin de la réponse
  const originalSend = res.send;
  res.send = function(data) {
    const duration = Date.now() - req.startTime;
    
    logger.http('Request completed', {
      traceId: req.traceId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.get('Content-Length'),
      timestamp: new Date().toISOString()
    });
    
    // Performance warning pour les requêtes lentes
    if (duration > 5000) {
      logger.warn('Slow request detected', {
        traceId: req.traceId,
        method: req.method,
        url: req.originalUrl,
        duration: `${duration}ms`
      });
    }
    
    return originalSend.call(this, data);
  };
  
  next();
};

// === 8. Logger d'audit pour les actions sensibles
const auditLogger = {
  logUserAction: (userId, action, details = {}) => {
    logger.info('User action', {
      category: 'audit',
      userId,
      action,
      details,
      timestamp: new Date().toISOString()
    });
  },
  
  logSecurityEvent: (event, details = {}) => {
    logger.warn('Security event', {
      category: 'security',
      event,
      details,
      timestamp: new Date().toISOString()
    });
  },
  
  logDataAccess: (userId, resource, operation, details = {}) => {
    logger.info('Data access', {
      category: 'data_access',
      userId,
      resource,
      operation,
      details,
      timestamp: new Date().toISOString()
    });
  },
  
  logSystemEvent: (event, details = {}) => {
    logger.info('System event', {
      category: 'system',
      event,
      details,
      timestamp: new Date().toISOString()
    });
  }
};

// === 9. Morgan middleware personnalisé avec traçabilité
const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms [:date[clf]] ":user-agent" :trace-id',
  {
    stream: {
      write: (message) => {
        logger.http(message.trim());
      }
    }
  }
);

// Ajouter le token personnalisé pour l'ID de trace
morgan.token('trace-id', (req) => req.traceId || 'no-trace');

// === 10. Fonctions utilitaires de logging
const logWithContext = (level, message, context = {}) => {
  logger[level](message, {
    ...context,
    timestamp: new Date().toISOString()
  });
};

const logError = (error, context = {}) => {
  logger.error(error.message, {
    stack: error.stack,
    ...context,
    timestamp: new Date().toISOString()
  });
};

const logPerformance = (operation, duration, context = {}) => {
  const level = duration > 1000 ? 'warn' : 'debug';
  logger[level](`Performance: ${operation}`, {
    duration: `${duration}ms`,
    ...context,
    timestamp: new Date().toISOString()
  });
};

// === 11. Export des modules
module.exports = {
  logger,
  auditLogger,
  requestTracer,
  morganMiddleware,
  logWithContext,
  logError,
  logPerformance
};

