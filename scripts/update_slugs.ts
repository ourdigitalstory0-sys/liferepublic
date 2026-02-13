
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { projects } from '../src/data/projects.ts';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
// Using Service Role Key would be better for RLS bypass, but ANON might work if policies allow
// Ideally user should provide SERVICE_ROLE_KEY if RLS blocks update, or we sign in.
// For now trying with ANON key.

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateSlugs() {
    console.log('Starting slug migration...');

    // 1. Fetch existing projects
    const { data: existingProjects, error: fetchError } = await supabase
        .from('projects')
        .select('*');

    if (fetchError) {
        console.error('Error fetching projects:', fetchError);
        return;
    }

    console.log(`Found ${existingProjects.length} projects in DB.`);

    for (const localProject of projects) {
        // Find matching project in DB by Title (assuming titles are unique and stable)
        const dbProject = existingProjects.find(p => p.title === localProject.title);

        if (!dbProject) {
            console.log(`[Create] Project not found in DB: ${localProject.title}. Creating...`);
            // Insert new project with correct ID
            const { error: insertError } = await supabase
                .from('projects')
                .insert({
                    id: localProject.id,
                    title: localProject.title,
                    category: localProject.category,
                    location: localProject.location,
                    price: localProject.price,
                    image: localProject.image,
                    description: localProject.description,
                    overview: localProject.overview,
                    features: localProject.features,
                    amenities: localProject.amenities,
                    master_layout: localProject.masterLayout,
                    floor_plans: localProject.floorPlans,
                    gallery: localProject.gallery,
                    theme_color: localProject.themeColor
                });
            if (insertError) console.error(`Failed to create ${localProject.title}:`, insertError);
            else console.log(`Created ${localProject.title}`);
            continue;
        }

        if (dbProject.id === localProject.id) {
            console.log(`[Skip] Slug matches for: ${localProject.title}`);
            continue;
        }

        console.log(`[Update] Migrating slug for "${localProject.title}"`);
        console.log(`  Old: ${dbProject.id}`);
        console.log(`  New: ${localProject.id}`);

        // Strategy: Create new record with new ID, Update leads, Delete old record
        // 1. Insert new record (copy of localProject to ensure latest data + new ID)
        const { error: insertNewError } = await supabase
            .from('projects')
            .insert({
                id: localProject.id, // NEW ID
                title: localProject.title,
                category: localProject.category,
                location: localProject.location,
                price: localProject.price,
                image: localProject.image,
                description: localProject.description,
                overview: localProject.overview,
                features: localProject.features,
                amenities: localProject.amenities,
                master_layout: localProject.masterLayout,
                floor_plans: localProject.floorPlans,
                gallery: localProject.gallery,
                theme_color: localProject.themeColor
            });

        if (insertNewError) {
            console.error(`  Failed to insert new record:`, insertNewError);
            continue;
        }

        // 2. Update Leads to point to new ID
        const { error: updateLeadsError } = await supabase
            .from('leads')
            .update({ project_id: localProject.id })
            .eq('project_id', dbProject.id);

        if (updateLeadsError) {
            console.error(`  Failed to update leads:`, updateLeadsError);
            // Abort deletion of old record if leads transfer failed
            continue;
        }

        // 3. Delete old record
        const { error: deleteError } = await supabase
            .from('projects')
            .delete()
            .eq('id', dbProject.id);

        if (deleteError) {
            console.error(`  Failed to delete old record:`, deleteError);
        } else {
            console.log(`  Successfully migrated "${localProject.title}"`);
        }
    }
}

migrateSlugs();
