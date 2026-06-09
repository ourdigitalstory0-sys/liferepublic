import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const targetDir = path.join(process.cwd(), 'src');
const files = getAllFiles(targetDir);

// Supabase URL regex
const supabaseRegex = /https:\/\/tjgrjtdudzupmzkmjfiu\.supabase\.co\/storage\/v1\/object\/public\/projects\/[^'"\s`]+/g;

let totalReplaced = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Ignore lib/supabase.ts which has the actual URL constant
    if (file.includes('lib/supabase.ts')) return;

    if (supabaseRegex.test(content)) {
        console.log(`Fixing broken links in: ${file}`);
        
        // Smart replacement logic
        content = content.replace(supabaseRegex, (match) => {
            totalReplaced++;
            // If it's a known background or hero component
            if (file.includes('Home.tsx') || file.includes('Connectivity.tsx') || file.includes('LocationLanding.tsx')) {
                return '/images/aerial-night.png';
            }
            // If it's a project card or layout
            if (file.includes('ProjectCard.tsx') || file.includes('MasterPlan.tsx')) {
                return '/images/home/master-layout-full.jpg';
            }
            // If it's a testimonial
            if (file.includes('Testimonials.tsx')) {
                return '/images/home/atmos-thumb.jpg';
            }
            // Default fallback
            return '/images/aerial-sunset.png';
        });

        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log(`✅ Fixed ${totalReplaced} broken image links.`);
