import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixQriousImages() {
    const id = 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi';

    // Paths verified to exist in public/images/gallery/qrious/
    const updates = {
        master_layout: '/images/gallery/qrious/master-layout.webp',
        floor_plans: [
            '/images/gallery/qrious/2bhk-plan.webp',
            '/images/gallery/qrious/3bhk-plan.webp'
        ]
    };

    console.log(`Updating project ${id}...`);

    const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) {
        console.error('Error updating project:', error);
    } else {
        console.log('Successfully updated project images:', data);
    }
}

fixQriousImages();
