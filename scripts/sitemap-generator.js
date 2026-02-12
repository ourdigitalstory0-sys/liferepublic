
import fs from 'fs';
import path from 'path';
// Removed import to avoid module issues in standalone script run 
// Since this is a js script, we might need to duplicate data or read it differently if we don't use ts-node.
// For simplicity, I will hardcode the static routes and fetch projects if I can, or just mock them if I can't import straightforwardly.
// Actually, I can't easily import .ts file in .js without type stripping.
// I'll regex read the projects.ts file or just rely on manual list for this script if it's too complex.
// BUT, the better way is to make this a .ts script and restart/run with ts-node if available, OR just read the file content and parse.

// Let's try to make it simple. I'll read projects.ts content and regex the IDs.

const projectsFilePath = path.join(process.cwd(), 'src', 'data', 'projects.ts');
const projectsContent = fs.readFileSync(projectsFilePath, 'utf-8');

// Regex to find IDs: id: '...'
const projectIds = [];
const idRegex = /id:\s*'([^']+)'/g;
let match;
while ((match = idRegex.exec(projectsContent)) !== null) {
    projectIds.push(match[1]);
}

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
    '/location/flats-near-marunji'
];

// Generate XML
const generateSitemap = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static Routes
    staticRoutes.forEach(route => {
        xml += `
  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // Project Routes
    projectIds.forEach(id => {
        xml += `
  <url>
    <loc>${DOMAIN}/projects/${id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    return xml;
};

const sitemap = generateSitemap();
fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated successfully with ' + (staticRoutes.length + projectIds.length) + ' URLs.');
