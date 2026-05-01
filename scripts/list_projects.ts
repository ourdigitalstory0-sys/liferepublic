import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

/**
 * Sovereign Audit Script v6.0
 * Performs a high-fidelity consistency check between Supabase and local data.
 */

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('CRITICAL: Missing Sovereign Credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSovereignAudit() {
    console.log('\n🏛️  Life Republic Sovereign Registry Audit [2026]');
    console.log('--------------------------------------------------');
    
    // 1. Fetch Remote State
    const { data: remoteProjects, error } = await supabase
        .from('projects')
        .select('*');

    if (error) {
        console.error('Remote Fetch Error:', error);
        return;
    }

    console.log(`📡 Remote Projects Found: ${remoteProjects.length}`);

    // 2. Load Sector Registry (JSON)
    const sectorsPath = path.resolve(process.cwd(), 'src/data/sectors.json');
    const sectorsData = JSON.parse(fs.readFileSync(sectorsPath, 'utf8'));
    console.log(`📁 Sector Registry Indexed: ${sectorsData.sectors.length} clusters`);

    // 3. Perform Consistency Synthesis
    console.log('\n🔍 Integrity Check Initiated...');
    
    let anomalies = 0;
    remoteProjects.forEach(remote => {
        // Check for relative asset paths (Sovereign Security)
        if (remote.image && remote.image.includes('http') && remote.image.includes('supabase.co')) {
            console.log(`⚠️  [PATH ANOMALY] Project ${remote.id} uses absolute Supabase URL. Should be normalized.`);
            anomalies++;
        }

        // Check for RERA IDs
        if (!remote.features.some(f => f.toLowerCase().includes('rera'))) {
            console.log(`⚠️  [COMPLIANCE ANOMALY] Project ${remote.id} missing RERA identifier in features.`);
            anomalies++;
        }

        // Check against Sector Slugs
        const match = sectorsData.sectors.find(s => remote.id.includes(s.id));
        if (!match) {
            console.log(`ℹ️  [REGISTRY MISS] Project ${remote.id} not explicitly mapped in sectors.json`);
        }
    });

    console.log('\n--------------------------------------------------');
    if (anomalies === 0) {
        console.log('✅ SOVEREIGN REGISTRY INTEGRITY: 100%');
        console.log('🚀 SYSTEM READY FOR 2026 DEPLOYMENT');
    } else {
        console.log(`❌ AUDIT FAILED: ${anomalies} anomalies detected.`);
    }
}

runSovereignAudit();
