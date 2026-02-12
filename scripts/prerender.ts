
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
        stdio: 'pipe',
        shell: true,
        detached: true, // Critical: Allows killing the entire process tree (shell + serve)
    });

    previewServer.stdout.on('data', (data) => console.log(`[Server]: ${data}`));
    previewServer.stderr.on('data', (data) => console.error(`[Server Error]: ${data}`));

    // Wait for server to be ready
    console.log('⏳ Waiting for server to start...');
    const waitForServer = async (retries = 20) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(DOMAIN);
                if (response.ok) {
                    console.log('✅ Server is up!');
                    return true;
                }
            } catch (e) {
                // Ignore error and retry
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        return false;
    };

    const isServerUp = await waitForServer();
    if (!isServerUp) {
        console.error('❌ Server failed to start within timeout. Prerendering skipped (falling back to SPA).');
        if (previewServer.pid) process.kill(-previewServer.pid); // Kill process group
        process.exit(0);
    }

    let browser;
    try {
        console.log('🚀 Launching Puppeteer...');
        browser = await puppeteer.launch({
            headless: true,
            dumpio: true, // Log browser output
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--no-zygote',
                '--single-process',
                '--disable-extensions'
            ],
        });
    } catch (error) {
        console.error('❌ Failed to launch Puppeteer. Prerendering skipped (falling back to SPA).', error);
        if (previewServer.pid) process.kill(-previewServer.pid);
        process.exit(0);
    }

    try {
        for (const route of routes) {
            // ... (rest of the loop is fine, inner catch already handles route errors)
            const page = await browser.newPage();
            try {
                await page.setViewport({ width: 1280, height: 800 });
                const url = `${DOMAIN}${route}`;
                console.log(`Rendering: ${route}`);
                await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
                await page.waitForSelector('#root', { timeout: 10000 });

                await page.evaluate(() => {
                    document.querySelectorAll('script[src^="/"]').forEach((el) => {
                        el.setAttribute('src', 'https://life-republic.in' + el.getAttribute('src'));
                    });
                    document.querySelectorAll('link[href^="/"]').forEach((el) => {
                        el.setAttribute('href', 'https://life-republic.in' + el.getAttribute('href'));
                    });
                    document.querySelectorAll('img[src^="/"]').forEach((el) => {
                        el.setAttribute('src', 'https://life-republic.in' + el.getAttribute('src'));
                    });
                });

                const content = await page.content();
                const filePath = route === '/'
                    ? path.join(OUT_DIR, 'index.html')
                    : path.join(OUT_DIR, route, 'index.html');

                const dir = path.dirname(filePath);
                if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
                fs.writeFileSync(filePath, content);

            } catch (e) {
                console.error(`⚠️ Failed to render ${route}:`, e);
            } finally {
                await page.close();
            }
        }
    } catch (e) {
        console.error('❌ Critical error during rendering loop:', e);
    } finally {
        if (browser) await browser.close();

        console.log('🛑 Stopping server...');
        if (previewServer.pid) {
            try {
                process.kill(-previewServer.pid); // Kill the process group
            } catch (e) {
                console.error('⚠️ Failed to kill server process group:', e);
            }
        }

        console.log('✅ Prerendering Finished (or skipped gracefully).');
        process.exit(0);
    }
}

prerender();
