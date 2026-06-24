import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { projectsRegistry } from '../src/data/projects';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

async function syncProjects() {
    console.log(`Starting synchronization of ${projectsRegistry.length} projects to Supabase...`);
    
    for (const project of projectsRegistry) {
        const payload = {
            id: project.id,
            title: project.title,
            category: project.category,
            location: project.location,
            price: project.price,
            image: project.image,
            overview: project.overview,
            status: 'New Launch', // Default status or derive from category
            features: project.features,
            amenities: project.amenities,
            theme_color: project.themeColor,
            master_layout: project.masterLayout,
            floor_plans: project.floorPlans,
            gallery: project.gallery || []
        };

        const { error } = await supabase
            .from('projects')
            .upsert(payload, { onConflict: 'id' });

        if (error) {
            console.error(`❌ Error syncing project ${project.id}:`, error.message);
        } else {
            console.log(`✅ Synced project: ${project.id}`);
        }
    }
    
    console.log('Synchronization complete.');
}

syncProjects();
