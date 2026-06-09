import fs from 'fs';
import path from 'path';

console.log('🛡️  Starting Sovereign Anomaly & SEO Audit...');

const DIST_DIR = path.resolve(process.cwd(), 'dist');
let errorCount = 0;
let fileCount = 0;

// Walk the directory recursively to find all .html files
function walkDir(dir: string, callback: (filepath: string) => void) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walkDir(filepath, callback);
        } else if (filepath.endsWith('.html')) {
            callback(filepath);
        }
    }
}

// Validation Regexes
const titleRegex = /<title>(.*?)<\/title>/i;
const descRegex = /<meta name="description" content="(.*?)"/i;
const supabaseBrokenRegex = /https:\/\/tjgrjtdudzupmzkmjfiu\.supabase\.co\/storage\/v1\/object\/public\/projects\/[^'"\s`]+/i;

// Audit HTML files
walkDir(DIST_DIR, (filepath) => {
    fileCount++;
    const content = fs.readFileSync(filepath, 'utf8');
    const relativePath = path.relative(DIST_DIR, filepath);
    
    // Skip the generic index.html fallback if it's identical
    if (relativePath === 'index.html' && !content.includes('<!--app-html-->') && content.length < 500) {
        return; 
    }

    // Skip Google Site Verification files
    if (relativePath.startsWith('google') || relativePath.startsWith('server/google')) {
        return;
    }

    // 1. Check SEO Metadata
    const titleMatch = content.match(titleRegex);
    const descMatch = content.match(descRegex);

    if (!titleMatch || !titleMatch[1] || titleMatch[1].trim() === '') {
        console.error(`❌ [Anomaly: SEO] Missing or empty <title> in ${relativePath}`);
        errorCount++;
    }

    if (!descMatch || !descMatch[1] || descMatch[1].trim() === '') {
        console.error(`❌ [Anomaly: SEO] Missing or empty meta description in ${relativePath}`);
        errorCount++;
    }

    // 2. Check for Broken Supabase Links
    if (supabaseBrokenRegex.test(content)) {
        console.error(`❌ [Anomaly: Structural] Dead Supabase image link detected in ${relativePath}`);
        errorCount++;
    }

    // 3. Check for empty App render (indicating an API failure during SSR)
    if (content.includes('<div id="root"></div>') || content.includes('<div id="root" data-reactroot=""></div>')) {
        console.warn(`⚠️  [Anomaly Warning] Empty React root detected in ${relativePath}. Check SSR rendering.`);
        // We won't strictly fail the build for this yet unless it's a known gap
    }
});

console.log(`\n📊 Sovereign Audit Summary:`);
console.log(`   Files Scanned: ${fileCount}`);
console.log(`   Anomalies Detected: ${errorCount}`);

if (errorCount > 0) {
    console.error('\n🚨 CRITICAL: Sovereign Auditor detected architectural anomalies. Build aborted to prevent deployment of broken state.');
    process.exit(1);
} else {
    console.log('\n✅ Sovereign Audit Passed: Zero anomalies detected. System is cleared for deployment.');
    process.exit(0);
}
