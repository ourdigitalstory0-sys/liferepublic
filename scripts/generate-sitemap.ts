import fs from 'fs';
import path from 'path';
import { projects } from '../src/data/projects';

const DOMAIN = 'https://life-republic.in';

const staticRoutes = [
    '/',
    '/projects',
    '/amenities',
    '/contact',
    '/about',
    '/privacy',
    '/terms',
    '/location',
    '/2-bhk-flats-in-hinjewadi',
    '/3-bhk-flats-in-hinjewadi',
    '/4-bhk-flats-in-hinjewadi',
    '/nri-corner',
    '/testimonials',
    '/media-center',
    '/location/flats-near-hinjewadi',
    '/location/flats-near-tathawade',
    '/location/flats-near-punawale',
    '/location/flats-near-wakad',
    '/location/flats-near-marunji',
];

function generateSitemap() {
    const urls = [];

    // Add static routes
    staticRoutes.forEach((route) => {
        urls.push({
            loc: `${DOMAIN}${route === '/' ? '' : route}`,
            lastmod: new Date().toISOString().split('T')[0],
            changefreq: 'weekly',
            priority: route === '/' ? '1.0' : '0.8',
        });
    });

    // Add project routes
    projects.forEach((project) => {
        urls.push({
            loc: `${DOMAIN}/projects/${project.id}`,
            lastmod: new Date().toISOString().split('T')[0],
            changefreq: 'weekly',
            priority: '0.9',
        });
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
            .map(
                (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
            )
            .join('')}
</urlset>`;

    const publicDir = path.resolve(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ sitemap.xml generated successfully!');
}

function generateRobots() {
    const robots = `User-agent: *
Allow: /
Sitemap: ${DOMAIN}/sitemap.xml
`;

    const publicDir = path.resolve(process.cwd(), 'public');
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
    console.log('✅ robots.txt generated successfully!');
}

try {
    generateSitemap();
    generateRobots();
} catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
}
