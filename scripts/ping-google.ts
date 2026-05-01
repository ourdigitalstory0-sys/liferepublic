import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const keyPath = path.join(process.cwd(), 'service-account.json');

if (!fs.existsSync(keyPath)) {
    console.error('❌ service-account.json not found. Please place your Google Cloud Service Account key in the root directory.');
    process.exit(1);
}

const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/indexing'],
});

const indexing = google.indexing('v3');

async function pingUrl(url: string) {
    try {
        const client = await auth.getClient();
        google.options({ auth: client });

        const res = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: 'URL_UPDATED',
            },
        });

        console.log(`✅ Success: ${url} - Status: ${res.status}`);
    } catch (error: any) {
        console.error(`❌ Error pinging ${url}:`, error.message);
    }
}

// Read Sitemap and ping all URLs
async function pingSitemap() {
    console.log('🚀 Starting Google Indexing API sync...');
    
    // Read the generated sitemap
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
        console.error('❌ sitemap.xml not found. Run npm run build first.');
        process.exit(1);
    }

    const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
    const urls = sitemap.match(/<loc>(.*?)<\/loc>/g)?.map(val => val.replace(/<\/?loc>/g, '')) || [];

    console.log(`📡 Found ${urls.length} URLs in sitemap.`);

    for (const url of urls) {
        await pingUrl(url);
        // Rate limiting: pause briefly between requests
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('🏁 Indexing sync complete.');
}

pingSitemap();
