import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, Image, LogOut } from 'lucide-react';

export const AdminLayout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-primary font-serif">Life Republic Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link to="/admin/images" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Image size={20} />
                        Image Manager
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white border-b border-gray-200 p-4 md:hidden flex justify-between items-center">
                    <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
                    <button onClick={handleLogout} className="text-red-600">
                        <LogOut size={20} />
                    </button>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
