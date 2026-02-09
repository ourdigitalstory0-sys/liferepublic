import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { projects } from '../../data/projects';
import { Button } from '../ui/Button';

export const DataMigration = () => {
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleMigration = async () => {
        if (!confirm('This will overwrite existing projects in the database with the same ID. Continue?')) return;

        setLoading(true);
        setStatus('Starting migration...');

        let successCount = 0;
        let failCount = 0;

        try {
            for (const project of projects) {
                setStatus(`Migrating ${project.title}...`);

                const dbProject = {
                    id: project.id,
                    title: project.title,
                    category: project.category,
                    location: project.location,
                    price: project.price,
                    image: project.image,
                    description: project.description,
                    overview: project.overview,
                    features: project.features,
                    amenities: project.amenities,
                    master_layout: project.masterLayout,
                    floor_plans: project.floorPlans,
                    gallery: project.gallery,
                    status: project.status || 'Available',
                    theme_color: project.themeColor
                };

                const { error } = await supabase
                    .from('projects')
                    .upsert(dbProject);

                if (error) {
                    console.error(`Failed to migrate ${project.id}:`, error);
                    failCount++;
                } else {
                    successCount++;
                }
            }

            setStatus(`Migration completed. Success: ${successCount}, Failed: ${failCount}`);
        } catch (error) {
            console.error('Migration error:', error);
            setStatus('Migration failed with an unexpected error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border mt-8">
            <h3 className="text-lg font-bold font-serif mb-4">Data Migration</h3>
            <p className="text-sm text-gray-600 mb-4">
                Import static data from <code>data/projects.ts</code> into the Supabase database.
                This is useful for initializing the database or resetting data.
            </p>
            <div className="flex items-center gap-4">
                <Button onClick={handleMigration} disabled={loading}>
                    {loading ? 'Migrating...' : 'Migrate Projects Data'}
                </Button>
                {status && <span className="text-sm text-gray-600">{status}</span>}
            </div>
        </div>
    );
};
