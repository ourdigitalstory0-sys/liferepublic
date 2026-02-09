import { useState } from 'react';
import { BannersManager } from '../../components/admin/BannersManager';
import { ProjectsManager } from '../../components/admin/ProjectsManager';
import { ImageManager } from '../../components/admin/ImageManager';
import { DataMigration } from '../../components/admin/DataMigration';

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'banners' | 'media' | 'settings'>('overview');

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold font-serif text-secondary">Dashboard</h1>
                <div className="flex bg-white rounded-lg p-1 shadow-sm border overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'projects' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('banners')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'banners' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        Banners
                    </button>
                    <button
                        onClick={() => setActiveTab('media')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'media' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        Media Library
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                    >
                        Settings
                    </button>
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-gray-500 font-medium mb-2">Total Leads</h3>
                        <p className="text-4xl font-bold text-secondary">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-gray-500 font-medium mb-2">Active Projects</h3>
                        <p className="text-4xl font-bold text-secondary">--</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-gray-500 font-medium mb-2">Active Banners</h3>
                        <p className="text-4xl font-bold text-secondary">--</p>
                    </div>
                </div>
            )}

            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'banners' && <BannersManager />}
            {activeTab === 'media' && <ImageManager />}
            {activeTab === 'settings' && <DataMigration />}
        </div>
    );
};
