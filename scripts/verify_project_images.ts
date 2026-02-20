import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

async function verifyImages() {
    const idsToCheck = [
        'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi',
        'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi',
        'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi'
    ];

    const { data, error } = await supabase
        .from('projects')
        .select('id, title, image, master_layout, floor_plans')
        .in('id', idsToCheck);

    if (error) {
        console.error('Error:', error);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
}

verifyImages();
