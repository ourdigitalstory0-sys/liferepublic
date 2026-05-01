import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAtmos() {
    const targetId = 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi';
    const { data, error } = await supabase.from('projects').select('*').eq('id', targetId).single();
    
    if (error) {
        console.log('Error fetching Atmos:', error.message);
        const { data: all } = await supabase.from('projects').select('id');
        console.log('All IDs in DB:', all?.map(p => p.id));
    } else {
        console.log('Atmos found in DB:', data.id);
    }
}

checkAtmos();
