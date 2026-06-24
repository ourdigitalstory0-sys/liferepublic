import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

async function fetchImages() {
    const { data, error } = await supabase.from('projects').select('id, title, image');
    if (error) {
        console.error('Error:', error);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
}
fetchImages();
