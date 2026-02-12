
import fs from 'fs';
import path from 'path';
import { projects } from '../src/data/projects';

const DOMAIN = 'https://life-republic.in';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

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
    console.log('🗺️  Generating Sitemap...');

    const projectRoutes = projects.map(p => `/projects/${p.id}`);
    const allRoutes = [...staticRoutes, ...projectRoutes];

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : route.startsWith('/projects/') ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapContent);
    console.log(`✅ Sitemap generated with ${allRoutes.length} URLs.`);
}

function generateRobots() {
    console.log('🤖 Generating robots.txt...');
    const robotsContent = `User-agent: *
Allow: /
Sitemap: ${DOMAIN}/sitemap.xml
`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsContent);
    console.log('✅ robots.txt generated.');
}

try {
    if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }
    generateSitemap();
    generateRobots();
    console.log('✨ SEO assets updated successfully.');
} catch (error) {
    console.error('❌ Failed to generate SEO assets:', error);
    process.exit(1);
}
