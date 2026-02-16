import { useEffect, useState } from 'react';
import { BannersManager } from '../../components/admin/BannersManager';
import { ProjectsManager } from '../../components/admin/ProjectsManager';
import { ImageManager } from '../../components/admin/ImageManager';
import { LeadsManager } from '../../components/admin/LeadsManager';
import { AmenitiesManager } from '../../components/admin/AmenitiesManager';
import { DataMigration } from '../../components/admin/DataMigration';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { api } from '../../services/api';

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'banners' | 'media' | 'leads' | 'settings' | 'amenities'>('overview');
    const [stats, setStats] = useState({ leads: 0, projects: 0, banners: 0 });
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const handleMigrateSlugs = async () => {
        if (!window.confirm('Are you sure you want to migrate project slugs? This is a destructive operation.')) return;

        try {
            const updates = [
                { old: 'duet', new: 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi' },
                { old: 'arezo', new: 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi' },
                { old: 'canvas', new: 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi' },
                { old: 'atmos', new: 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi' },
                { old: '24k-espada', new: 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi' },
                { old: 'sound-of-soul', new: 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi' },
                { old: 'aros', new: 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi' },
                { old: 'qrious', new: 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi' }
            ];

            for (const update of updates) {
                // Fetch old project
                const { data: oldProject } = await supabase.from('projects').select('*').eq('id', update.old).single();

                if (!oldProject) {
                    console.log(`Skipping ${update.old} (not found)`);
                    continue;
                }

                // Insert new project
                const newProject = { ...oldProject, id: update.new };
                const { error: insertError } = await supabase.from('projects').insert(newProject);

                if (insertError) {
                    console.error(`Failed to create ${update.new}:`, insertError);
                    continue;
                }

                // Update leads
                await supabase.from('leads').update({ project_id: update.new }).eq('project_id', update.old);

                // Delete old project
                await supabase.from('projects').delete().eq('id', update.old);
                console.log(`Migrated ${update.old} -> ${update.new}`);
            }
            alert('Migration completed check console for details.');

        } catch (e) {
            console.error(e);
            alert('Migration failed');
        }
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [leads, projects, banners] = await Promise.all([
                    api.leads.getCount().catch(() => 0),
                    api.projects.getCount().catch(() => 0),
                    api.banners.getCount().catch(() => 0),
                ]);
                setStats({ leads, projects, banners });
            } catch (error) {
                console.error('Failed to fetch stats', error);
            }
        };

        if (activeTab === 'overview') {
            fetchStats();
        }
    }, [activeTab]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold font-serif text-secondary">Dashboard</h1>
                <div className="flex gap-2">
                    <Button onClick={handleMigrateSlugs} variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 text-xs px-2 py-1">
                        Migrate Slugs
                    </Button>
                    <Button onClick={handleLogout} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white text-xs px-2 py-1">
                        Sign Out
                    </Button>
                </div>
                <div className="flex bg-white rounded-lg p-1 shadow-sm border overflow-x-auto max-w-full">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'projects' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('leads')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'leads' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        Leads
                    </button>
                    <button
                        onClick={() => setActiveTab('banners')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'banners' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        Banners
                    </button>
                    <button
                        onClick={() => setActiveTab('amenities')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'amenities' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        Amenities
                    </button>
                    <button
                        onClick={() => setActiveTab('media')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'media' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        Media Library
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        Settings
                    </button>
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        onClick={() => setActiveTab('leads')}
                        className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                    >
                        <h3 className="text-gray-500 font-medium mb-2">Total Leads</h3>
                        <p className="text-4xl font-bold text-secondary">{stats.leads}</p>
                    </div>
                    <div
                        onClick={() => setActiveTab('projects')}
                        className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                    >
                        <h3 className="text-gray-500 font-medium mb-2">Active Projects</h3>
                        <p className="text-4xl font-bold text-secondary">{stats.projects}</p>
                    </div>
                    <div
                        onClick={() => setActiveTab('banners')}
                        className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                    >
                        <h3 className="text-gray-500 font-medium mb-2">Active Banners</h3>
                        <p className="text-4xl font-bold text-secondary">{stats.banners}</p>
                    </div>
                </div>
            )}

            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'banners' && <BannersManager />}
            {activeTab === 'amenities' && <AmenitiesManager />}
            {activeTab === 'leads' && <LeadsManager />}
            {activeTab === 'media' && <ImageManager />}
            {activeTab === 'settings' && <DataMigration />}
        </div>
    );
};
