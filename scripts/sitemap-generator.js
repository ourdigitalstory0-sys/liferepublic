import fs from 'fs';
import path from 'path';

// Sovereign Indexing Protocol v6.0
// Optimized for 100% Crawl Indexability & Search Dominance
const DOMAIN = 'https://life-republic.in';

// 1. Resolve Project Slugs
const projectsFilePath = path.join(process.cwd(), 'src', 'data', 'projects.ts');
const projectsContent = fs.readFileSync(projectsFilePath, 'utf-8');
const projectIds = [];
const idRegex = /id:\s*'([^']+)'/g;
let match;
while ((match = idRegex.exec(projectsContent)) !== null) {
    projectIds.push(match[1]);
}

// 2. Resolve Sector & Locality Slugs
const sectorsFilePath = path.join(process.cwd(), 'src', 'data', 'sectors.json');
const sectorsData = JSON.parse(fs.readFileSync(sectorsFilePath, 'utf-8'));

const sectorRoutes = sectorsData.sectors.map(s => ({ path: `/location/${s.slug}`, priority: '0.9' }));
const localityRoutes = sectorsData.localities.map(l => ({ path: `/location/${l.slug}`, priority: '1.0' })); // High Intent Localities
const avenueRoutes = sectorsData.avenues.map(a => ({ path: `/location/${a.slug}`, priority: '0.8' }));

// 3. Define Strategic Static & Programmatic BHK Routes
const coreRoutes = [
    { path: '/', priority: '1.0' },
    { path: '/projects', priority: '0.9' },
    { path: '/location', priority: '0.9' },
    { path: '/2-bhk-flats-in-hinjewadi', priority: '0.9' },
    { path: '/3-bhk-flats-in-hinjewadi', priority: '0.9' },
    { path: '/4-bhk-villas-in-hinjewadi', priority: '0.9' },
    { path: '/amenities', priority: '0.8' },
    { path: '/testimonials', priority: '0.8' },
    { path: '/media-center', priority: '0.8' },
    { path: '/contact', priority: '0.8' },
    { path: '/township-guide', priority: '0.7' },
    { path: '/lifestyle', priority: '0.8' }
];

// 4. Synthesize Master Route Registry
const projectRoutes = projectIds.map(id => ({ path: `/projects/${id}`, priority: '0.9' }));

const allRoutes = [
    ...coreRoutes,
    ...projectRoutes,
    ...sectorRoutes,
    ...localityRoutes,
    ...avenueRoutes
];

// 5. Generate XML Synthesis
const generateSitemap = () => {
    const today = new Date().toISOString().split('T')[0];
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

    allRoutes.forEach(route => {
        xml += `
  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    return xml;
};

// 6. Write to Public Directory
const sitemap = generateSitemap();
fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);

console.log(`
🚀 Sovereign Indexing Synthesis Complete v6.0
--------------------------------------------
Total Routes Captured: ${allRoutes.length}
Projects: ${projectRoutes.length}
Sectors/Localities: ${sectorRoutes.length + localityRoutes.length + avenueRoutes.length}
Programmatic BHKs: 3
Indexing Domain: ${DOMAIN}
--------------------------------------------
✅ sitemap.xml generated in public/ directory.
`);
