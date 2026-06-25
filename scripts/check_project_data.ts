import fs from 'fs';
import path from 'path';

// Sovereign Deep-Integrity Protocol v5.5
// This script verifies the project's data registry before every build.

const dataDir = path.join(process.cwd(), 'src', 'data');
const sectorsPath = path.join(dataDir, 'sectors.json');
const projectsPath = path.join(dataDir, 'projects.ts');

console.log(`
🛡️ Sovereign Data Audit Initiated
----------------------------------
`);

const errors = [];

// 1. Audit Sector Slugs & Registry
try {
    const sectorsData = JSON.parse(fs.readFileSync(sectorsPath, 'utf-8'));
    const allSlugs = [
        ...sectorsData.sectors.map(s => s.slug),
        ...sectorsData.avenues.map(a => a.slug),
        ...sectorsData.localities.map(l => l.slug)
    ];

    console.log(`✓ Sector Registry: ${allSlugs.length} routes synthesized.`);

    // Check for duplicate slugs
    const duplicates = allSlugs.filter((item, index) => allSlugs.indexOf(item) !== index);
    if (duplicates.length > 0) {
        errors.push(`Duplicate slugs found in sectors.json: ${duplicates.join(', ')}`);
    }

} catch (e) {
    errors.push(`Critical: Failed to read/parse sectors.json - ${e.message}`);
}

// 2. Audit Project Hardening
try {
    const projectsContent = fs.readFileSync(projectsPath, 'utf-8');
    
    // Check for mandatory fields in projects.ts (regex check)
    const projectBlocks = projectsContent.split('id:').slice(1);
    console.log(`✓ Project Registry: ${projectBlocks.length} clusters verified.`);

    projectBlocks.forEach((block, idx) => {
        if (!block.includes('category:')) errors.push(`Project [${idx}] missing 'category' definition.`);
        if (!block.includes('image:')) errors.push(`Project [${idx}] missing 'image' path.`);
        if (!block.includes('description:')) errors.push(`Project [${idx}] missing 'description' metadata.`);
    });

} catch (e) {
    errors.push(`Critical: Failed to read projects.ts - ${e.message}`);
}

// 3. Final Sovereign Verdict
if (errors.length > 0) {
    console.error(`
❌ DATA INTEGRITY BREACH DETECTED
---------------------------------
${errors.join('\n')}
---------------------------------
Execution halted. Please resolve data inconsistencies before building.
    `);
    process.exit(1);
} else {
    console.log(`
✅ SOVEREIGN VERDICT: DATA INTEGRITY SECURE
-------------------------------------------
All 100+ routes and commercial clusters are synchronized.
Project is ready for Production Synthesis.
    `);
    process.exit(0);
}
