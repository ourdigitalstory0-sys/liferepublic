import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { projects } from '../src/data/projects';
import fs from 'fs';
import path from 'path';

dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

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
    console.log('Starting Supabase Sync...');
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
            console.error(`Error syncing ${project.id}:`, error.message);
        } else {
            console.log(`Successfully synced ${project.id}`);
        }
    }
    console.log('Sync Complete.');
}

syncProjects();
