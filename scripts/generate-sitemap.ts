import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const DOMAIN = 'https://life-republic.in';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

// Load sectors data
const sectorsData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/data/sectors.json'), 'utf-8'));

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

const staticRoutes = [
    '/',
    '/projects',
    '/amenities',
    '/contact',
    '/about',
    '/privacy',
    '/terms',
    '/location',
    '/nri-corner',
    '/testimonials',
    '/media-center',
    '/township-intelligence',
    '/nri-investment-guide',
    '/connectivity',
    '/lifestyle',
    '/sustainability',
    '/community-hub',
    '/sitemap',
    '/township-guide',
    // BHK & Property Type Landing Pages
    '/2-bhk-flats-in-hinjewadi',
    '/3-bhk-flats-in-hinjewadi',
    '/4-bhk-flats-in-hinjewadi',
    '/1-bhk-flats-in-hinjewadi',
    '/row-houses-in-life-republic',
    '/luxury-villas-near-hinjewadi',
    '/plots-in-hinjewadi',
    // Core Location Landing Pages
    '/location/flats-near-hinjewadi',
    '/location/flats-near-tathawade',
    '/location/flats-near-punawale',
    '/location/flats-near-wakad',
    '/location/flats-near-marunji',
    '/location/flats-near-marunji-road',
    '/location/ready-possession-flats-hinjewadi',
    // Expanded PSEO Landing Pages (Phase 6 - Keyword Dominance)
    '/location/affordable-flats-in-hinjewadi',
    '/location/luxury-apartments-hinjewadi',
    '/location/new-launch-projects-hinjewadi',
    '/location/under-construction-flats-hinjewadi',
    '/location/flats-near-rajiv-gandhi-infotech-park',
    '/location/flats-near-mann-hinjewadi',
    '/location/flats-near-maan-hinjewadi',
    '/location/property-in-hinjewadi-phase-3',
    '/location/flats-near-wakad-hinjewadi-road',
    '/location/kolte-patil-life-republic-price',
    '/location/kolte-patil-life-republic-reviews',
    '/location/kolte-patil-life-republic-master-plan',
    '/location/flats-in-hinjewadi-under-50-lakhs',
    '/location/flats-in-hinjewadi-under-80-lakhs',
    '/location/flats-in-hinjewadi-under-1-crore',
    '/location/township-in-hinjewadi-pune',
    '/location/rera-approved-flats-hinjewadi',
    '/location/flats-near-pimpri-chinchwad',
    '/location/flats-near-baner-pune',
    '/location/flats-near-balewadi-pune',
    '/location/investment-property-hinjewadi-pune',
    '/location/nri-property-investment-pune',
    '/location/smart-homes-hinjewadi-pune',
    '/location/row-houses-hinjewadi-pune',
    '/location/penthouse-in-hinjewadi',
    '/location/flats-near-mumbai-pune-expressway',
    '/location/flats-near-hinjewadi-metro-station',
    '/location/gated-community-hinjewadi-pune',
    '/location/family-flats-hinjewadi',
    '/location/resale-flats-life-republic',
    '/location/rental-flats-life-republic-hinjewadi',
    '/location/kolte-patil-hinjewadi-pune',
];

// Add sector-based routes from sectors.json
const sectorRoutes = [
    ...sectorsData.sectors.map((s: any) => `/location/${s.slug}`),
    ...sectorsData.avenues.map((a: any) => `/location/${a.slug}`),
    ...sectorsData.localities.map((l: any) => `/location/${l.slug}`),
];

const ID_TO_SLUG: Record<string, string> = {
    'duet': 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi',
    'arezo': 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi',
    'canvas': 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi',
    'atmos': 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi',
    '24k-espada': 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi',
    'sound-of-soul': 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi',
    'aros': 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi',
    'universe': 'kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi',
    'first-avenue': 'kolte-patil-life-republic-first-avenue-premium-2-3-bhk-hinjewadi',
    'villas': 'kolte-patil-life-republic-villas-hinjewadi',
    'bungalows': 'kolte-patil-life-republic-bungalows-hinjewadi',
    'echoes': 'kolte-patil-life-republic-echoes-new-launch-2-2-5-bhk-hinjewadi',
    'qrious': 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi'
};

async function generateSitemap() {
    console.log('🗺️  Generating Sitemap...');

    let projectRoutes: string[] = [];

    // Fetch projects from Supabase
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('id');

            if (error) throw error;

            if (data) {
                console.log(`📡 Fetched ${data.length} projects from database.`);
                projectRoutes = data.map(p => {
                    const slug = ID_TO_SLUG[p.id] || p.id;
                    return `/projects/${slug}`;
                });
            }
        } catch (error) {
            console.error('❌ Error fetching projects from Supabase:', error);
        }
    }

    // Self-healing fallback: Ensure all projects from local data are included
    if (projectRoutes.length < 13) {
        console.log('🛡️  Sitemap Health Check: Database count low. Merging local projects...');
        const { projects: localProjects } = await import('../src/data/projects');
        localProjects.forEach(lp => {
            const route = `/projects/${lp.id}`;
            if (!projectRoutes.includes(route)) {
                projectRoutes.push(route);
            }
        });
    }

    const allRoutes = [...staticRoutes, ...sectorRoutes, ...projectRoutes];

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : (route.startsWith('/projects/') || route.startsWith('/location/')) ? '0.9' : '0.8'}</priority>
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

# Disallow sensitive paths
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*
Disallow: /search?*
Disallow: /?*
Disallow: /*?utm_*
Disallow: /*?fbclid*

# Host
Host: ${DOMAIN}
`;
    fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsContent);
    console.log('✅ robots.txt generated.');
}

try {
    if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }
    await generateSitemap();
    generateRobots();
    console.log('✨ SEO assets updated successfully.');
} catch (error) {
    console.error('❌ Failed to generate SEO assets:', error);
    process.exit(1);
}
