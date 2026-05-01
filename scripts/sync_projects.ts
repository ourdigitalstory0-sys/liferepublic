import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { projects } from '../src/data/projects';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function sync() {
    console.log('--- SYNC START ---');
    
    const { data: dbProjects } = await supabase.from('projects').select('id');
    const dbIds = dbProjects?.map(p => p.id) || [];
    
    console.log('Supabase IDs:', dbIds);
    console.log('Registry IDs:', projects.map(p => p.id));
    
    for (const project of projects) {
        if (!dbIds.includes(project.id)) {
            console.log(`Adding ${project.id} to Supabase...`);
            const { error } = await supabase.from('projects').insert({
                id: project.id,
                title: project.title,
                category: project.category,
                location: project.location,
                price: project.price,
                image: project.image,
                description: project.description,
                overview: project.overview,
                features: project.features,
                amenities: project.amenities,
                master_layout: project.masterLayout,
                floor_plans: project.floorPlans?.map(fp => fp.image),
                gallery: project.gallery,
                theme_color: project.themeColor
            });
            if (error) console.error(`Error adding ${project.id}:`, error);
        } else {
            console.log(`Project ${project.id} already in Supabase. Updating...`);
             const { error } = await supabase.from('projects').update({
                title: project.title,
                category: project.category,
                location: project.location,
                price: project.price,
                image: project.image,
                description: project.description,
                overview: project.overview,
                features: project.features,
                amenities: project.amenities,
                master_layout: project.masterLayout,
                floor_plans: project.floorPlans?.map(fp => fp.image),
                gallery: project.gallery,
                theme_color: project.themeColor
            }).eq('id', project.id);
            if (error) console.error(`Error updating ${project.id}:`, error);
        }
    }
    console.log('--- SYNC END ---');
}

sync();
