import fs from 'fs';
import path from 'path';
import { projects } from '../src/data/projects';

const outputFile = path.resolve(process.cwd(), 'supabase_migrations/sync_all_projects.sql');

let sqlContent = `-- Synchronize all project images from local data\n\n`;

for (const project of projects) {
    // Image validation helper
    const isValidImage = (imgPath: string | undefined): boolean => {
        if (!imgPath) return false;
        const decodedPath = decodeURIComponent(imgPath);
        const fullPath = path.join(process.cwd(), 'public', decodedPath);
        try {
            const stats = fs.statSync(fullPath);
            return stats.size > 0;
        } catch (e) {
            return false;
        }
    };

    // Escape single quotes in strings and handle invalid images
    const escape = (str: string | undefined) => {
        if (!isValidImage(str)) return 'NULL';
        return `'${str!.replace(/'/g, "''")}'`;
    };

    const escapeArray = (arr: (string | { url: string })[] | undefined) => {
        if (!arr || arr.length === 0) return "'[]'::jsonb";
        const validArr = arr
            .map(item => (typeof item === 'string' ? item : item.url))
            .filter(isValidImage);

        if (validArr.length === 0) return "'[]'::jsonb";
        return `'${JSON.stringify(validArr).replace(/'/g, "''")}'::jsonb`;
    };

    sqlContent += `-- Updating ${project.title}\n`;
    sqlContent += `UPDATE public.projects\n`;
    sqlContent += `SET\n`;
    sqlContent += `  image = ${escape(project.image)},\n`;
    sqlContent += `  master_layout = ${escape(project.masterLayout)},\n`;
    sqlContent += `  floor_plans = ${escapeArray(project.floorPlans)},\n`;
    sqlContent += `  gallery = ${escapeArray(project.gallery)}\n`;
    sqlContent += `WHERE id = '${project.id}';\n\n`;
}

fs.writeFileSync(outputFile, sqlContent);
console.log(`Generated migration file at ${outputFile}`);
