import fs from 'fs';
import path from 'path';
import https from 'https';

const images = [
  { url: 'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.027810155315627583.png', dest: '24k-espada-thumb.jpg' },
  { url: 'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.0852377534066876.jpg', dest: 'aros-thumb.jpg' },
  { url: 'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.44653224666085267.png', dest: 'atmos-thumb.jpg' },
  { url: 'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.056632375187106176.jpg', dest: 'canvas-thumb.jpg' },
  { url: 'https://tjgrjtdudzupmzkmjfiu.supabase.co/storage/v1/object/public/projects/0.567025112139025.jpg', dest: 'duet-thumb.jpg' }
];

const download = (url: string, dest: string) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(true);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

async function run() {
    const outputDir = path.resolve(process.cwd(), 'public/images/home');
    for (const img of images) {
        const destPath = path.join(outputDir, img.dest);
        console.log(`Downloading ${img.url} -> ${destPath}`);
        await download(img.url, destPath);
        console.log(`✅ Saved ${img.dest}`);
    }
}

run().catch(console.error);
