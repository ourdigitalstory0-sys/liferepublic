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

async function listAllProjects() {
    console.log('Fetching all project IDs from Supabase...');
    const { data, error } = await supabase
        .from('projects')
        .select('id, title');

    if (error) {
        console.error('Error:', error);
    } else if (data) {
        console.log(`Found ${data.length} projects:`);
        data.forEach(p => console.log(`- ${p.id} (${p.title})`));
    }
}

listAllProjects();
