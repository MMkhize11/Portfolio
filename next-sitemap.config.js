/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.mpumelelomkhize.com',
  generateRobotsTxt: true, // Automatically generate robots.txt
  generateIndexSitemap: false, // Don't generate index sitemap
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'], // Exclude server-side sitemap
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
} 