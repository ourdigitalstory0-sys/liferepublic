import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { projects } from '../src/data/projects';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncAllProjects() {
    console.log(`Starting sync for ${projects.length} projects...`);

    for (const project of projects) {
        console.log(`Syncing project: ${project.title} (${project.id})`);

        // Prepare update object with correct local paths
        const updates = {
            image: project.image,
            master_layout: project.masterLayout,
            floor_plans: project.floorPlans,
            gallery: project.gallery,
            // Also sync other fields to be safe/consistent
            title: project.title,
            category: project.category,
            location: project.location,
            price: project.price,
            description: project.description,
            amenities: project.amenities,
            features: project.features,
            overview: project.overview,
            theme_color: project.themeColor
        };

        const { error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', project.id);

        if (error) {
            console.error(`❌ Error updating ${project.id}:`, error.message);
        } else {
            console.log(`✅ Updated ${project.id}`);
        }
    }
    console.log('Sync complete.');
}

syncAllProjects();
