#!/usr/bin/env node
/**
 * Sovereign Google Indexing API - Batch URL Submission
 * Submits all sitemap URLs to Google for instant indexing.
 * 
 * Usage: node scripts/google-index.js [path-to-service-account.json]
 * 
 * Requirements:
 * - Google Service Account JSON key with Indexing API access
 * - Site verified in Google Search Console
 * - Service account added as site owner in Search Console
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://life-republic.in';

// Find service account key
const keyArg = process.argv[2];
const KEY_PATHS = [
    keyArg,
    path.resolve(__dirname, '../service-account.json'),
    path.resolve(process.env.HOME || '', 'Downloads/eminent-bond-433313-m2-6962fc10920c.json'),
    path.resolve(process.env.HOME || '', 'Downloads/eminent-bond-433313-m2-273b89f77a58.json'),
    path.resolve(process.env.HOME || '', 'Downloads/eminent-bond-433313-m2-e194fe0c671f.json'),
].filter(Boolean);

function findKey() {
    for (const p of KEY_PATHS) {
        if (fs.existsSync(p)) {
            console.log(`🔑 Using key: ${path.basename(p)}`);
            return p;
        }
    }
    return null;
}

// Parse sitemap.xml to extract all URLs
function parseSitemapUrls() {
    const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
        console.error('❌ sitemap.xml not found. Run generate-sitemap first.');
        process.exit(1);
    }
    const content = fs.readFileSync(sitemapPath, 'utf-8');
    const urls = [];
    const regex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        urls.push(match[1]);
    }
    return urls;
}

async function indexUrls(keyPath) {
    const key = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));

    const auth = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        ['https://www.googleapis.com/auth/indexing'],
        null
    );

    const indexing = google.indexing({ version: 'v3', auth });

    const urls = parseSitemapUrls();
    console.log(`\n📡 Submitting ${urls.length} URLs to Google Indexing API...\n`);

    let success = 0;
    let failed = 0;
    const errors = [];

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        try {
            await indexing.urlNotifications.publish({
                requestBody: {
                    url: url,
                    type: 'URL_UPDATED',
                },
            });
            success++;
            console.log(`  ✅ [${i + 1}/${urls.length}] ${url}`);

            // Rate limiting: 2 requests per second max
            if (i < urls.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        } catch (err) {
            failed++;
            const msg = err.message || String(err);
            errors.push({ url, error: msg });
            console.log(`  ❌ [${i + 1}/${urls.length}] ${url} → ${msg.substring(0, 80)}`);

            // Back off on rate limit
            if (msg.includes('429') || msg.includes('Rate')) {
                console.log('  ⏳ Rate limited. Waiting 30s...');
                await new Promise(resolve => setTimeout(resolve, 30000));
            }
        }
    }

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`📊 Indexing Report`);
    console.log(`${'═'.repeat(60)}`);
    console.log(`  Total URLs:  ${urls.length}`);
    console.log(`  ✅ Success:  ${success}`);
    console.log(`  ❌ Failed:   ${failed}`);
    console.log(`${'═'.repeat(60)}\n`);

    if (errors.length > 0) {
        const logPath = path.resolve(__dirname, '../indexing-errors.log');
        fs.writeFileSync(logPath, JSON.stringify(errors, null, 2));
        console.log(`📝 Error log saved to: ${logPath}`);
    }
}

async function main() {
    console.log('🌐 Sovereign Google Indexing API - Life Republic');
    console.log('================================================\n');

    const keyPath = findKey();
    if (!keyPath) {
        console.error('❌ No service account key found.');
        console.log('\nPlace your Google Service Account JSON key at:');
        console.log('  - ./service-account.json');
        console.log('  - Or pass as argument: node scripts/google-index.js path/to/key.json');
        console.log('\nSetup steps:');
        console.log('  1. Go to Google Cloud Console → APIs → Enable "Web Search Indexing API"');
        console.log('  2. Create a Service Account and download the JSON key');
        console.log('  3. Go to Google Search Console → Settings → Users → Add the service account email as Owner');
        process.exit(1);
    }

    await indexUrls(keyPath);
}

main().catch(err => {
    console.error('Fatal error:', err.message);
    process.exit(1);
});
