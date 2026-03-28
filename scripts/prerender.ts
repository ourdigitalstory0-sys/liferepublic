import path from 'path';
import fs from 'fs';
import { projects } from '../src/data/projects';

const OUT_DIR = path.resolve(process.cwd(), 'dist');
const SSR_BUNDLE_PATH = path.join(OUT_DIR, 'server/entry-server.js');

// Load sectors data
const sectorsData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/data/sectors.json'), 'utf-8'));

const staticRoutes = [
    '/',
    '/projects',
    '/amenities',
    '/contact',
    '/about',
    '/privacy',
    '/terms',
    '/location',
    '/connectivity',
    '/2-bhk-flats-in-hinjewadi',
    '/3-bhk-flats-in-hinjewadi',
    '/4-bhk-flats-in-hinjewadi',
    '/nri-corner',
    '/testimonials',
    '/media-center',
    '/township-intelligence',
    '/nri-investment-guide',
    '/lifestyle',
    '/sustainability',
    '/community-hub',
];

const sectorRoutes = [
    ...sectorsData.sectors.map((s: any) => `/location/${s.slug}`),
    ...sectorsData.avenues.map((a: any) => `/location/${a.slug}`),
    ...sectorsData.localities.map((l: any) => `/location/${l.slug}`),
];

// Add specific location landing pages (from App.tsx)
const specialLocationRoutes = [
    '/location/flats-near-hinjewadi',
    '/location/flats-near-tathawade',
    '/location/flats-near-punawale',
    '/location/flats-near-wakad',
    '/location/flats-near-marunji',
];

const routes = [
    ...staticRoutes,
    ...projects.map((p) => `/projects/${p.id}`),
    ...sectorRoutes,
    ...specialLocationRoutes,
];

async function prerender() {
    console.log('🏗️  Starting SSR-based Prerendering...');

    if (!fs.existsSync(SSR_BUNDLE_PATH)) {
        console.error(`❌ SSR Bundle not found at ${SSR_BUNDLE_PATH}. Did you run "vite build --ssr"?`);
        process.exit(1);
    }

    const template = fs.readFileSync(path.join(OUT_DIR, 'index.html'), 'utf-8');
    
    // Dynamically import the SSR bundle
    // Node.js requires an absolute path with file:// for dynamic imports in some environments
    const { render } = await import(`file://${SSR_BUNDLE_PATH}`);

    console.log(`🚀 Rendering ${routes.length} routes...`);

    for (const route of routes) {
        try {
            console.log(`Rendering: ${route}`);
            const { html: appHtml, head: headHtml } = await render(route);

            const renderedHtml = template
                .replace('<!--app-head-->', headHtml || '')
                .replace('<!--app-html-->', appHtml || '');

            const filePath = route === '/'
                ? path.join(OUT_DIR, 'index.html')
                : path.join(OUT_DIR, route, 'index.html');

            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            
            fs.writeFileSync(filePath, renderedHtml);
            
        } catch (e) {
            console.error(`⚠️ Failed to render ${route}:`, e);
        }
    }

    console.log('✅ SSG Prerendering Finished.');
    process.exit(0);
}

prerender().catch(err => {
    console.error('❌ Critical error during SSG:', err);
    process.exit(1);
});
