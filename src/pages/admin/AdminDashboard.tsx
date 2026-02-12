import { useEffect, useState } from 'react';
import { BannersManager } from '../../components/admin/BannersManager';
import { ProjectsManager } from '../../components/admin/ProjectsManager';
import { ImageManager } from '../../components/admin/ImageManager';
import { LeadsManager } from '../../components/admin/LeadsManager';
import { AmenitiesManager } from '../../components/admin/AmenitiesManager';
import { DataMigration } from '../../components/admin/DataMigration';
import { api } from '../../services/api';

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'banners' | 'media' | 'leads' | 'settings' | 'amenities'>('overview');
    const [stats, setStats] = useState({ leads: 0, projects: 0, banners: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [leads, projects, banners] = await Promise.all([
                    api.leads.getAll().then(d => d?.length || 0).catch(() => 0),
                    api.projects.getAll().then(d => d?.length || 0).catch(() => 0),
                    api.banners.getAll().then(d => d?.length || 0).catch(() => 0),
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
