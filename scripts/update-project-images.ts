
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { projects } from '../src/data/projects';

// Load environment variables
dotenv.config();

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Map SEO IDs (long) to DB IDs (short)
// This must match src/services/api.ts
const ID_TO_SLUG: Record<string, string> = {
    'duet': 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi',
    'arezo': 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi',
    'canvas': 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi',
    'atmos': 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi',
    '24k-espada': 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi',
    'sound-of-soul': 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi',
    'aros': 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi',
    'qrious': 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi'
};

const SLUG_TO_ID: Record<string, string> = Object.entries(ID_TO_SLUG).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {} as Record<string, string>);

async function updateProjectImages() {
    console.log('🔄 Starting project image update...');

    for (const project of projects) {
        // Use the long slug ID directly
        const dbId = project.id;

        console.log(`Processing project: ${project.title} (DB ID: ${dbId})`);

        const updates = {
            image: project.image,
            master_layout: project.masterLayout,
            floor_plans: project.floorPlans,
            gallery: project.gallery
        };

        const { error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', dbId);

        if (error) {
            console.error(`❌ Failed to update ${dbId}:`, error.message);
        } else {
            console.log(`✅ Updated ${dbId} successfully.`);
        }
    }

    console.log('✨ All updates completed.');
}

updateProjectImages();
