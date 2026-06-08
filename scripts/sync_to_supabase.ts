import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { projects } from '../src/data/projects';
import fs from 'fs';
import path from 'path';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("CRITICAL ERROR: Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
    process.exit(1);
}

// Security Hardening: Use the Service Role Key for backend administrative writes
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const isValidImage = (imgPath: string | undefined): boolean => {
    if (!imgPath) return false;
    if (imgPath.startsWith('http')) return true;
    const fullPath = path.join(process.cwd(), 'public', imgPath);
    try {
        const stats = fs.statSync(fullPath);
        return stats.size > 0;
    } catch (e) {
        return false;
    }
};

async function syncProjects() {
    console.log('Starting Supabase Sync with Service Role Privileges...');
    let hasErrors = false;

    for (const project of projects) {
        console.log(`Syncing ${project.title}...`);
        
        const insertData: any = {
            id: project.id,
            title: project.title,
            category: project.category,
            location: project.location,
            price: project.price,
            description: project.description,
            overview: project.overview,
            features: project.features,
            image: isValidImage(project.image) ? project.image : null,
            master_layout: isValidImage(project.masterLayout) ? project.masterLayout : null,
            floor_plans: (project.floorPlans || []).map(fp => typeof fp === 'string' ? fp : (fp as any).url).filter(img => isValidImage(img)),
            gallery: (project.gallery || []).map(g => typeof g === 'string' ? g : (g as any).url).filter(img => isValidImage(img)),
            amenities: project.amenities,
            theme_color: project.themeColor
        };

        const { error } = await supabase
            .from('projects')
            .upsert(insertData, { onConflict: 'id' });

        if (error) {
            console.error(`CRITICAL ERROR syncing ${project.id}:`, error.message);
            hasErrors = true;
        } else {
            console.log(`Successfully synced ${project.id}`);
        }
    }
    
    if (hasErrors) {
        console.error('Sync failed for one or more projects. Failing the CI/CD pipeline.');
        process.exit(1);
    } else {
        console.log('Sync Complete. All projects successfully securely written to database.');
    }
}

syncProjects();
