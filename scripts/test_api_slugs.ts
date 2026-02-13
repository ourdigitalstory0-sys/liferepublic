
import { api } from '../src/services/api';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

async function testSlugs() {
    console.log('Testing getAll()...');
    try {
        const projects = await api.projects.getAll();
        console.log('Project IDs returned by getAll:');
        projects.forEach(p => console.log(` - ${p.id}`));

        const longSlug = 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi';
        console.log(`\nTesting getById('${longSlug}')...`);
        const project = await api.projects.getById(longSlug);
        console.log('Project fetched successfully!');
        console.log(`ID: ${project.id}`);
        console.log(`Title: ${project.title}`);

    } catch (error) {
        console.error('Test failed:', error);
    }
}

testSlugs();
