import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const DOMAIN = 'https://life-republic.in';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️  Missing Supabase credentials in .env. Sitemap will rely on static routes only.');
}

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

const ID_TO_SLUG: Record<string, string> = {
    'duet': 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi',
    'arezo': 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi',
    'canvas': 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi',
    'atmos': 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi',
    '24k-espada': 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi',
    'sound-of-soul': 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi',
    'aros': 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi',
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
            // Fallback could be implemented here if needed, but for now we warn
        }
    }

    const allRoutes = [...staticRoutes, ...projectRoutes];

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
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
    await generateSitemap();
    generateRobots();
    console.log('✨ SEO assets updated successfully.');
} catch (error) {
    console.error('❌ Failed to generate SEO assets:', error);
    process.exit(1);
}
