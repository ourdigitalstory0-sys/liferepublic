
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import { projects } from '../src/data/projects';

const DOMAIN = 'http://localhost:4173'; // Vite preview default port
const OUT_DIR = path.resolve(process.cwd(), 'dist');

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

const routes = [
    ...staticRoutes.filter(r => r !== '/'),
    ...projects.map((p) => `/projects/${p.id}`),
    '/', // Render homepage last to preserve SPA shell for other routes
];

async function prerender() {
    console.log('🏗️  Starting Prerendering...');

    // Start Static Server (serve)
    const previewServer = spawn('npx', ['serve', '-s', 'dist', '-l', '4173'], {
        stdio: 'inherit',
        shell: true,
    });

    // Give server time to start
    await new Promise((resolve) => setTimeout(resolve, 3000));

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage', // Critical for CI environments with limited shared memory
                '--disable-gpu',
                '--no-zygote',
                '--single-process'
            ],
            // executablePath: process.env.CHROME_BIN || undefined // Optional: use system chrome if available
        });
    } catch (error) {
        console.error('❌ Failed to launch Puppeteer:', error);
        previewServer.kill();
        process.exit(1);
    }

    for (const route of routes) {
        const page = await browser.newPage();
        try {
            // Set viewport for consistent rendering
            await page.setViewport({ width: 1280, height: 800 });

            const url = `${DOMAIN}${route}`;
            console.log(`Rendering: ${route}`);

            await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

            // Wait for some selector to ensure app is mounted (e.g., #root or title)
            await page.waitForSelector('#root');

            // Helper to fix relative paths for production
            await page.evaluate(() => {
                // Fix scripts
                document.querySelectorAll('script[src^="/"]').forEach((el) => {
                    el.setAttribute('src', 'https://life-republic.in' + el.getAttribute('src'));
                });
                // Fix links
                document.querySelectorAll('link[href^="/"]').forEach((el) => {
                    el.setAttribute('href', 'https://life-republic.in' + el.getAttribute('href'));
                });
                // Fix images
                document.querySelectorAll('img[src^="/"]').forEach((el) => {
                    el.setAttribute('src', 'https://life-republic.in' + el.getAttribute('src'));
                });
            });

            const content = await page.content();

            // Determine output path
            const filePath = route === '/'
                ? path.join(OUT_DIR, 'index.html')
                : path.join(OUT_DIR, route, 'index.html');

            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(filePath, content);

        } catch (e) {
            console.error(`Failed to render ${route}:`, e);
        } finally {
            await page.close();
        }
    }

    await browser.close();
    previewServer.kill();
    console.log('✅ Prerendering Complete!');
    process.exit(0);
}

prerender();
