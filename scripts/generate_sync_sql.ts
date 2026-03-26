import fs from 'fs';
import path from 'path';
import { projects } from '../src/data/projects';

const outputFile = path.resolve(process.cwd(), 'supabase_migrations/sync_all_projects.sql');

let sqlContent = `-- Synchronize all project images from local data\n\n`;

for (const project of projects) {
    // Image validation helper
    const isValidImage = (imgPath: string | undefined): boolean => {
        if (!imgPath) return false;
        if (imgPath.startsWith('http')) return true;
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
    const escape = (str: string | undefined, isMandatory: boolean = false) => {
        if (!isValidImage(str)) {
            if (isMandatory && str) {
                console.warn(`Warning: Mandatory image file is missing or empty: ${str}`);
                return `'${str.replace(/'/g, "''")}'`;
            }
            return 'NULL';
        }
        return `'${str!.replace(/'/g, "''")}'`;
    };

    const escapeArray = (arr: (string | { url: string })[] | undefined) => {
        if (!arr || arr.length === 0) return "'[]'::jsonb";
        const validArr = arr
            .map(item => (typeof item === 'string' ? item : item.url))
            .filter(img => {
                if (!isValidImage(img)) {
                    console.warn(`Warning: Gallery/FloorPlan image file is missing or empty: ${img}`);
                    return false;
                }
                return true;
            });

        if (validArr.length === 0) return "'[]'::jsonb";
        return `'${JSON.stringify(validArr).replace(/'/g, "''")}'::jsonb`;
    };

    sqlContent += `-- Upserting ${project.title}\n`;
    sqlContent += `INSERT INTO public.projects (id, title, category, location, price, description, overview, features, image, master_layout, floor_plans, gallery, amenities, faqs, theme_color, rera)\n`;
    sqlContent += `VALUES (\n`;
    sqlContent += `  '${project.id}',\n`;
    sqlContent += `  '${project.title.replace(/'/g, "''")}',\n`;
    sqlContent += `  '${project.category.replace(/'/g, "''")}',\n`;
    sqlContent += `  '${project.location.replace(/'/g, "''")}',\n`;
    sqlContent += `  '${project.price.replace(/'/g, "''")}',\n`;
    sqlContent += `  '${project.description.replace(/'/g, "''")}',\n`;
    sqlContent += `  '${(project.overview || '').replace(/'/g, "''")}',\n`;
    sqlContent += `  '${JSON.stringify(project.features).replace(/'/g, "''")}'::jsonb,\n`;
    sqlContent += `  ${escape(project.image, true)},\n`;
    sqlContent += `  ${escape(project.masterLayout)},\n`;
    sqlContent += `  ${escapeArray(project.floorPlans)},\n`;
    sqlContent += `  ${escapeArray(project.gallery)},\n`;
    sqlContent += `  '${JSON.stringify(project.amenities).replace(/'/g, "''")}'::jsonb,\n`;
    sqlContent += `  '${JSON.stringify(project.faqs || []).replace(/'/g, "''")}'::jsonb,\n`;
    sqlContent += `  '${project.themeColor || '#1A2350'}',\n`;
    sqlContent += `  '${(project as any).rera || ''}'\n`;
    sqlContent += `)\n`;
    sqlContent += `ON CONFLICT (id) DO UPDATE SET\n`;
    sqlContent += `  title = EXCLUDED.title,\n`;
    sqlContent += `  category = EXCLUDED.category,\n`;
    sqlContent += `  location = EXCLUDED.location,\n`;
    sqlContent += `  price = EXCLUDED.price,\n`;
    sqlContent += `  description = EXCLUDED.description,\n`;
    sqlContent += `  overview = EXCLUDED.overview,\n`;
    sqlContent += `  features = EXCLUDED.features,\n`;
    sqlContent += `  image = EXCLUDED.image,\n`;
    sqlContent += `  master_layout = EXCLUDED.master_layout,\n`;
    sqlContent += `  floor_plans = EXCLUDED.floor_plans,\n`;
    sqlContent += `  gallery = EXCLUDED.gallery,\n`;
    sqlContent += `  amenities = EXCLUDED.amenities,\n`;
    sqlContent += `  faqs = EXCLUDED.faqs,\n`;
    sqlContent += `  theme_color = EXCLUDED.theme_color,\n`;
    sqlContent += `  rera = EXCLUDED.rera;\n\n`;
}

fs.writeFileSync(outputFile, sqlContent);
console.log(`Generated migration file at ${outputFile}`);
