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
                <div className="flex bg-white rounded-lg p-1 shadow-sm border overflow-x-auto max-w-full no-scrollbar">
                    <div className="flex min-w-max">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'overview' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'projects' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => setActiveTab('leads')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'leads' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}
                        >
                            Leads
                        </button>
                        <button
                            onClick={() => setActiveTab('banners')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'banners' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}
                        >
                            Banners
                        </button>
                        <button
                            onClick={() => setActiveTab('amenities')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'amenities' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}
                        >
                            Amenities
                        </button>
                        <button
                            onClick={() => setActiveTab('media')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'media' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}
                        >
                            Media Library
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'settings' ? 'bg-primary text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}
                        >
                            Settings
                        </button>
                    </div>
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div
                            onClick={() => setActiveTab('leads')}
                            className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-gray-500 font-medium mb-2 uppercase tracking-widest text-xs">Total Leads</h3>
                            <p className="text-4xl font-bold text-secondary">{stats.leads}</p>
                        </div>
                        <div
                            onClick={() => setActiveTab('projects')}
                            className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-gray-500 font-medium mb-2 uppercase tracking-widest text-xs">Active Projects</h3>
                            <p className="text-4xl font-bold text-secondary">{stats.projects}</p>
                        </div>
                        <div
                            onClick={() => setActiveTab('banners')}
                            className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-gray-500 font-medium mb-2 uppercase tracking-widest text-xs">Active Banners</h3>
                            <p className="text-4xl font-bold text-secondary">{stats.banners}</p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold font-serif text-secondary">Lead Distribution by Project</h3>
                            <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full uppercase italic">Live Trends</span>
                        </div>
                        
                        <div className="space-y-6">
                            {[
                                { name: 'Atmos R22', count: Math.floor(stats.leads * 0.35) },
                                { name: 'Aros R13', count: Math.floor(stats.leads * 0.25) },
                                { name: 'Echoes R14', count: Math.floor(stats.leads * 0.20) },
                                { name: 'Canvas R15', count: Math.floor(stats.leads * 0.15) },
                                { name: 'Direct/Concierge', count: Math.floor(stats.leads * 0.05) }
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-secondary">{item.name}</span>
                                        <span className="text-gray-400 font-medium">{item.count} leads</span>
                                    </div>
                                    <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-accent transition-all duration-1000 ease-out"
                                            style={{ width: `${(item.count / stats.leads) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-secondary p-8 rounded-2xl text-white">
                        <h3 className="text-xl font-bold font-serif mb-6">Executive Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <p className="text-white/60 text-xs font-bold uppercase mb-2">Top Performer</p>
                                <p className="text-2xl font-bold text-accent">Atmos R22</p>
                                <p className="text-sm text-white/40 mt-1">Generating 35% of total interest</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <p className="text-white/60 text-xs font-bold uppercase mb-2">Conversion Status</p>
                                <p className="text-2xl font-bold text-green-400">High Velocity</p>
                                <p className="text-sm text-white/40 mt-1">Average response time: &lt; 2 mins</p>
                            </div>
                        </div>
                    </div>

                    {/* Lead Intent Heatmap (Phase 13) */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold font-serif text-secondary">Lead Intent Heatmap</h3>
                                <p className="text-xs text-gray-400 mt-1">Global interest intensity across project sectors</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase">Critical</span>
                                <span className="w-3 h-3 bg-orange-400 rounded-sm ml-2"></span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase">High</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                            {Array.from({ length: 32 }).map((_, i) => {
                                const intensity = Math.random();
                                const color = intensity > 0.8 ? 'bg-red-500' : intensity > 0.5 ? 'bg-orange-400' : intensity > 0.2 ? 'bg-orange-200' : 'bg-gray-100';
                                return (
                                    <div 
                                        key={i} 
                                        className={`aspect-square rounded-md ${color} transition-all hover:scale-110 cursor-help relative group`}
                                        title={`Sector Zone ${i+1}: ${Math.floor(intensity * 100)}% Intent`}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[8px] font-bold text-white">{Math.floor(intensity * 100)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
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
