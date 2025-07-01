/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ophrus-immobilier.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/api/*', '/dashboard/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/private/']
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/', '/private/']
      }
    ],
    additionalSitemaps: [
      'https://ophrus-immobilier.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Configuration personnalisée pour différents types de pages
    const defaultConfig = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }

    // Priorités personnalisées selon le type de page
    if (path === '/') {
      return {
        ...defaultConfig,
        priority: 1.0,
        changefreq: 'daily',
      }
    }

    if (path.startsWith('/proprietes/') && path !== '/proprietes') {
      return {
        ...defaultConfig,
        priority: 0.9,
        changefreq: 'weekly',
      }
    }

    if (path === '/proprietes') {
      return {
        ...defaultConfig,
        priority: 0.8,
        changefreq: 'daily',
      }
    }

    if (path === '/a-propos' || path === '/contact') {
      return {
        ...defaultConfig,
        priority: 0.7,
        changefreq: 'monthly',
      }
    }

    return defaultConfig
  },
  additionalPaths: async (config) => {
    // Ajouter dynamiquement les pages de propriétés
    const properties = [1, 2] // IDs des propriétés
    
    return properties.map((id) => ({
      loc: `/proprietes/${id}`,
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    }))
  }
}

