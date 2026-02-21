import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProject() {
    const slug = 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi';

    const dbId = slug;
    console.log(`Checking project with DB ID: ${dbId}`);

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', dbId)
        .single();

    if (error) {
        console.error('Error fetching project:', error);
    } else {
        console.log('Project Data:', JSON.stringify(data, null, 2));
    }
}

checkProject();
