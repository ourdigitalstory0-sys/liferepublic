import fs from 'fs';
import path from 'path';
import { projects } from '../src/data/projects';

const outputFile = path.resolve(process.cwd(), 'supabase_migrations/sync_all_projects.sql');

let sqlContent = `-- Synchronize all project images from local data\n\n`;

for (const project of projects) {
    // Escape single quotes in strings
    const escape = (str: string | undefined) => str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
    const escapeArray = (arr: string[] | undefined) => {
        if (!arr || arr.length === 0) return "'[]'::jsonb";
        return `'${JSON.stringify(arr).replace(/'/g, "''")}'::jsonb`;
    };

    sqlContent += `-- Updating ${project.title}\n`;
    sqlContent += `UPDATE public.projects\n`;
    sqlContent += `SET\n`;
    sqlContent += `  image = ${escape(project.image)},\n`;
    sqlContent += `  master_layout = ${escape(project.masterLayout)},\n`;
    sqlContent += `  floor_plans = ${escapeArray(project.floorPlans)},\n`;
    sqlContent += `  gallery = ${escapeArray(project.gallery ? project.gallery.map(g => typeof g === 'string' ? g : g.url) : [])}\n`;
    sqlContent += `WHERE id = '${project.id}';\n\n`;
}

fs.writeFileSync(outputFile, sqlContent);
console.log(`Generated migration file at ${outputFile}`);
